"use client";
import { useEffect, useState } from 'react';

const initialState = { name: '', email: '', message: '' };

const validateEmail = (email: string) => /.+@.+\..+/.test(email);

function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Honeypot + simple dwell time
  const [company, setCompany] = useState('');
  const [t0, setT0] = useState<number>(() => Date.now());

  useEffect(() => {
    setT0(Date.now());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitted(false);
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = 'Name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email.';
    if (!form.message) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, company, elapsed: Math.floor((Date.now() - t0) / 1000) }),
        });
        if (res.ok) {
          setSubmitted(true);
          setForm(initialState);
        } else {
          const data = await res.json().catch(() => ({}));
          setErrors({ form: (data as { error?: string }).error || 'Failed to send message.' });
        }
      } catch {
        setErrors({ form: 'Failed to send message.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Honeypot field (hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="off"
          tabIndex={-1}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="block mb-1 text-black">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white text-black border border-black hover:border-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 outline-none"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1" aria-live="polite">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 text-black">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white text-black border border-black hover:border-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 outline-none"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1" aria-live="polite">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 text-black">Message</label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white text-black border border-black hover:border-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 outline-none"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" className="text-red-500 text-sm mt-1" aria-live="polite">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-disabled={loading}
        aria-busy={loading}
        className={`block mx-auto py-2 px-5 rounded-full font-semibold text-base transition transform ${
          loading
            ? 'bg-gray-200 text-gray-500 cursor-wait'
            : 'text-black ring-1 ring-transparent hover:bg-gray-200 hover:text-gray-700 hover:scale-105 hover:shadow-[0_0_12px_rgba(75,85,99,0.55)] dark:hover:shadow-[0_0_12px_rgba(156,163,175,0.6)]'
        }`}
      >
        {loading ? 'Sending…' : 'Send Message'}
      </button>

      {errors.form && (
        <p className="text-red-600 text-sm mt-2" aria-live="polite">{errors.form}</p>
      )}
      {submitted && (
        <p className="text-green-600 text-sm mt-2" aria-live="polite">Your message has been sent!</p>
      )}
    </form>
  );
}

export default ContactForm;

