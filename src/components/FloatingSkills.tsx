"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Skill = {
  name: string;
  icon: string;
  className?: string;
};

const SKILLS: Skill[] = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
];

// Seeded RNG helpers
function xfnv1a(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSeededRand(seedNum: number) {
  const r = mulberry32(seedNum >>> 0);
  return (min: number, max: number) => r() * (max - min) + min;
}

type CSSVars = React.CSSProperties & { [key: string]: string | number };

export default function FloatingSkills({
  sizeMin = 64,
  sizeMax = 96,
  seed,
  persistKey,
}: {
  sizeMin?: number;
  sizeMax?: number;
  seed?: string | number;
  persistKey?: string;
}) {
  // Generate on client only to avoid SSR/client hydration mismatch
  const [items, setItems] = useState<Array<{ icon: Skill; style: CSSVars; tipAbove: boolean }>>([]);
  const [focused, setFocused] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolve a deterministic seed
  const resolvedSeed = useMemo(() => {
    if (typeof seed === 'number') return seed >>> 0;
    if (typeof seed === 'string') return xfnv1a(seed);
    if (typeof window !== 'undefined' && persistKey) {
      const existing = window.localStorage.getItem(persistKey);
      if (existing) return parseInt(existing, 10) >>> 0;
      const r = Math.floor(Math.random() * 0xffffffff) >>> 0;
      window.localStorage.setItem(persistKey, String(r));
      return r;
    }
    return 0xabcdef01; // default constant seed
  }, [seed, persistKey]);

  useEffect(() => {
    const rand = makeSeededRand(resolvedSeed);
    // Pick effective size range based on viewport (smaller on small screens)
    let min = sizeMin;
    let max = sizeMax;
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w < 480) {
        min = Math.min(sizeMin, 44);
        max = Math.min(sizeMax, 72);
      } else if (w < 768) {
        min = Math.min(sizeMin, 56);
        max = Math.min(sizeMax, 88);
      }
    }

    // Mirror layout: 5 icons left, 5 right (reflected). Do this early and return.
    const leftGroup = ['GitHub', 'HTML5', 'Node.js', 'CSS3', 'SQLite'];
    const mirrorMap: Record<string, string> = {
      'GitHub': 'JavaScript',
      'HTML5': 'TailwindCSS',
      'Node.js': 'PHP',
      'CSS3': 'VS Code',
      'SQLite': 'MySQL',
    };

    type P = { left: number; top: number; size: number; dx: number; dy: number; duration: string; delay: string; bobDur: string; bobDelay: string };
    const base: Record<string, P> = {};
    const placedPts: Array<{ left: number; top: number }> = [];
    const minDistPct = 18; // percent units
    const center = { x: 50, y: 45, r: 24 };
    const outsideHero = (x: number, y: number) => Math.hypot(x - center.x, y - center.y) > center.r;
    const farEnough = (x: number, y: number) => placedPts.every(p => Math.hypot(p.left - x, p.top - y) >= minDistPct);

    function sampleLeft(): { left: number; top: number } {
      let L = 0, T = 0, tries = 0;
      do {
        L = rand(10, 40);
        T = rand(16, 84);
        tries++;
      } while (!(outsideHero(L, T) && farEnough(L, T)) && tries < 150);
      return { left: L, top: T };
    }

    // Create left base positions
    for (const name of leftGroup) {
      const size = Math.round(rand(min, max));
      const { left, top } = sampleLeft();
      const dx = Math.round(rand(-50, 50));
      const dy = Math.round(rand(-50, 50));
      const duration = rand(14, 30).toFixed(1);
      const delay = (-1 * rand(0, 20)).toFixed(1);
      const bobDur = rand(2.6, 4.2).toFixed(2);
      const bobDelay = (-1 * rand(0, 2)).toFixed(2);
      base[name] = { left, top, size, dx, dy, duration, delay, bobDur, bobDelay };
      placedPts.push({ left, top });
    }

    // Mirror to right group
    Object.entries(mirrorMap).forEach(([L, R]) => {
      const b = base[L];
      if (!b) return;
      base[R] = { left: 100 - b.left, top: b.top, size: b.size, dx: -b.dx, dy: b.dy, duration: b.duration, delay: b.delay, bobDur: b.bobDur, bobDelay: b.bobDelay };
    });

    const mirroredItems: Array<{ icon: Skill; style: CSSVars; tipAbove: boolean }> = SKILLS.map(icon => {
      const p = base[icon.name];
      const L = p?.left ?? 12;
      const T = p?.top ?? 20 + Math.random() * 60;
      const size = p?.size ?? Math.round(rand(min, max));
      const style: CSSVars = {
        width: `${size}px`,
        height: `${size}px`,
        left: `${L.toFixed(2)}%`,
        top: `${T.toFixed(2)}%`,
        '--dx': `${(p?.dx ?? 0)}px`,
        '--dy': `${(p?.dy ?? 0)}px`,
        '--duration': `${p?.duration ?? '20'}s`,
        '--delay': `${p?.delay ?? '0'}s`,
        '--bob-duration': `${p?.bobDur ?? '3.5'}s`,
        '--bob-delay': `${p?.bobDelay ?? '0'}s`,
      };
      const tipAbove = T > 78;
      return { icon, style, tipAbove };
    });
    setItems(mirroredItems);
    return;
    // Sample a position in lanes around the hero to prevent overlap
    type Lane = 'left' | 'right' | 'top' | 'bottom';
    const sampleLane = (lane: Lane) => {
      switch (lane) {
        case 'left':
          return {
            left: rand(10, 32),
            top: rand(22, 88),
            dxMin: -10,
            dxMax: 30,
            dyMin: -40,
            dyMax: 40,
          };
        case 'right':
          return {
            left: rand(68, 90),
            top: rand(22, 88),
            dxMin: -30,
            dxMax: 10,
            dyMin: -40,
            dyMax: 40,
          };
        case 'top':
          return {
            left: rand(24, 76),
            top: rand(12, 26),
            dxMin: -40,
            dxMax: 40,
            dyMin: -10,
            dyMax: 30,
          };
        case 'bottom':
        default:
          return {
            left: rand(24, 76),
            top: rand(74, 90),
            dxMin: -40,
            dxMax: 40,
            dyMin: -30,
            dyMax: 10,
          };
      }
    };

    const generated: Array<{ icon: Skill; style: CSSVars; tipAbove: boolean }> = [];
    const placed: Array<{ left: number; top: number }> = [];
    const minDist = 18; // minimum distance between icons in viewport percent (more separation)

    SKILLS.forEach((icon, i) => {
      const size = Math.round(rand(min, max));
      const laneOrder: Lane[] = ['left', 'right', 'top', 'bottom'];
      let lane = laneOrder[i % laneOrder.length];
      if (icon.name === 'MySQL') lane = 'right';
      if (icon.name === 'CSS3') lane = 'left';
      if (icon.name === 'VS Code') lane = 'right';

      let s = sampleLane(lane);
      // Icon-specific nudges
      if (icon.name === 'MySQL') {
        s.left = Math.max(s.left, 78);
        s.top = s.top < 60 ? rand(64, 90) : s.top;
        s.dxMin = -20; s.dxMax = 20;
        s.dyMin = -20; s.dyMax = 20;
      }
      if (icon.name === 'CSS3') {
        s.left = Math.min(s.left, 22);
      }
      if (icon.name === 'VS Code') {
        s.left = Math.max(s.left, 80);
      }

      // Rejection sample until not too close to already placed icons
      const farEnough = (x: number, y: number) =>
        placed.every(p => Math.hypot(p.left - x, p.top - y) >= minDist);
      let attempts = 0;
      while (!farEnough(s.left, s.top) && attempts < 100) {
        s = sampleLane(lane);
        if (icon.name === 'MySQL') {
          s.left = Math.max(s.left, 78);
          s.top = s.top < 60 ? rand(64, 90) : s.top;
          s.dxMin = -20; s.dxMax = 20;
          s.dyMin = -20; s.dyMax = 20;
        }
        if (icon.name === 'CSS3') {
          s.left = Math.min(s.left, 22);
        }
        if (icon.name === 'VS Code') {
          s.left = Math.max(s.left, 80);
        }
        attempts++;
      }
      placed.push({ left: s.left, top: s.top });

      const dx = Math.round(rand(s.dxMin, s.dxMax));
      const dy = Math.round(rand(s.dyMin, s.dyMax));
      const duration = rand(14, 30).toFixed(1);
      const delay = (-1 * rand(0, 20)).toFixed(1);
      const bobDur = rand(2.6, 4.2).toFixed(2);
      const bobDelay = (-1 * rand(0, 2)).toFixed(2);

      const style: CSSVars = {
        width: `${size}px`,
        height: `${size}px`,
        left: `${s.left.toFixed(2)}%`,
        top: `${s.top.toFixed(2)}%`,
        '--dx': `${dx}px`,
        '--dy': `${dy}px`,
        '--duration': `${duration}s`,
        '--delay': `${delay}s`,
        '--bob-duration': `${bobDur}s`,
        '--bob-delay': `${bobDelay}s`,
      };
      const tipAbove = s.top > 78; // near bottom -> show tooltip above
      generated.push({ icon, style, tipAbove });
    });
    setItems(generated);
  }, [sizeMin, sizeMax, resolvedSeed]);

  // Dismiss with Escape key (outside click disabled for sticky focus)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocused(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {items.map(({ icon, style, tipAbove }, idx) => (
        <div
          key={idx}
          className={`float-skill group pointer-events-auto cursor-pointer z-10 ${focused === idx ? 'focused' : ''}`}
          style={style}
          onClick={(e) => { e.stopPropagation(); setFocused(focused === idx ? null : idx); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocused(focused === idx ? null : idx); }}}
          role="button"
          tabIndex={0}
          aria-pressed={focused === idx}
        >
          <img
            src={icon.icon}
            alt={icon.name}
            className={`skill-img select-none rounded-full bg-white p-1 ring-1 ring-black/10 shadow-sm ${icon.className ?? ''}`}
            draggable={false}
          />
          <span
            className={`skill-tip ${tipAbove ? 'tip-above' : 'tip-below'} absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-sm font-semibold text-black bg-white/90 dark:text-black dark:bg-white/90 ring-1 ring-black/10 shadow-lg backdrop-blur-sm transition-opacity duration-200 pointer-events-none z-10 ${focused === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            style={tipAbove ? { bottom: 'calc(100% + 12px)' } : { top: 'calc(100% + 12px)' }}
          >
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  );
}
