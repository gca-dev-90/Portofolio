import nodemailer from 'nodemailer';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

// In-memory rate limiter (best-effort; not for serverless/distributed)
const requests = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 60_000;
const MAX_REQS = 5; // per minute per IP

// Spike detection (very simple): total requests in last minute
let recentTimestamps: number[] = [];
const SPIKE_THRESHOLD = 60; // warn if >60 requests/minute overall

const MAX_BODY_BYTES = 8 * 1024; // 8KB total body cap
const MAX_MESSAGE_CHARS = 4096; // 4KB message cap
const MAX_NAME_CHARS = 100;
const MAX_EMAIL_CHARS = 254;

function getIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsCRLF(input: string) {
  return /[\r\n]/.test(input);
}

function sanitizeHeaderValue(input: string) {
  // Remove CR/LF and trim
  return input.replace(/[\r\n]/g, '').trim();
}

function sanitizePlainText(input: string, maxLen: number) {
  // Normalize newlines, strip control chars except tab/newline, clamp length
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return cleaned.slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const ua = req.headers.get('user-agent') || 'unknown';

  // Body size guard (Content-Length heuristic + actual text length)
  const contentLength = Number(req.headers.get('content-length') || '0');
  if (contentLength && contentLength > MAX_BODY_BYTES) {
    return new Response(
      JSON.stringify({ success: false, error: 'Payload too large.' }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let raw = '';
  try {
    raw = await req.text();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Unable to read request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (raw.length > MAX_BODY_BYTES) {
    return new Response(
      JSON.stringify({ success: false, error: 'Payload too large.' }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let parsed: unknown;
  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { name, email, message, company, elapsed } = parsed as {
    name?: string;
    email?: string;
    message?: string;
    company?: string; // honeypot
    elapsed?: number; // seconds on page before submit
  };

  // Honeypot: if filled, pretend success without sending mail
  if (typeof company === 'string' && company.trim().length > 0) {
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Optional minimum dwell time: at least 2 seconds on page
  if (elapsed !== undefined && Number(elapsed) < 2) {
    return new Response(
      JSON.stringify({ success: false, error: 'Suspicious submission.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Basic validation
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ success: false, error: 'All fields are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if (containsCRLF(name) || containsCRLF(email)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid characters in input.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid email.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if (String(name).length > MAX_NAME_CHARS || String(email).length > MAX_EMAIL_CHARS) {
    return new Response(
      JSON.stringify({ success: false, error: 'Input too long.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if (String(message).length > MAX_MESSAGE_CHARS) {
    return new Response(
      JSON.stringify({ success: false, error: 'Message too long.' }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Best-effort rate limit by IP
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || now - entry.timestamp > WINDOW_MS) {
    requests.set(ip, { count: 1, timestamp: now });
  } else if (entry.count >= MAX_REQS) {
    return new Response(
      JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  } else {
    entry.count += 1;
  }

  // Spike logging (best-effort)
  recentTimestamps = recentTimestamps.filter((t) => now - t <= WINDOW_MS);
  recentTimestamps.push(now);
  if (recentTimestamps.length > SPIKE_THRESHOLD) {
    console.warn(`[contact] High volume: ${recentTimestamps.length} req/min`);
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || 'georgeangheluta1@gmail.com';
  if (!user || !pass) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Email not configured.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Prefer secure SMTP by default (465)
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user,
      pass,
    },
  });

  const safeName = sanitizeHeaderValue(String(name)).slice(0, MAX_NAME_CHARS);
  const safeEmail = sanitizeHeaderValue(String(email)).slice(0, MAX_EMAIL_CHARS);
  const safeMessage = sanitizePlainText(String(message), MAX_MESSAGE_CHARS);

  const subject = `Portfolio Contact from ${safeName || 'Unknown'}`;
  const emailText = [
  'New contact submission',
  `Name: ${safeName}`,
  `Email: ${safeEmail}`,
  'Message:',
  safeMessage,
].join('\n');

  // Log submission (best-effort)
  console.log(`[contact] ${new Date(now).toISOString()} ip=${ip} ua="${ua}" name="${safeName}"`);

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to,
      replyTo: safeEmail,
      subject,
      text: emailText,
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'X-Error': msg.slice(0, 120) } }
    );
  }
}
