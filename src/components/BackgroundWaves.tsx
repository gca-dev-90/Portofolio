export default function BackgroundWaves() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none select-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          {/* Base vertical gray gradient */}
          <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#c7cbd1" />
          </linearGradient>
          {/* Light band */}
          <linearGradient id="lightBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf1" />
          </linearGradient>
          {/* Mid band */}
          <linearGradient id="midBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          {/* Dark band for lower area */}
          <linearGradient id="darkBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>
          <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Base */}
        <rect width="1440" height="900" fill="url(#bgGrad)" />

        {/* Top thick curve like reference */}
        <path
          className="wave-band wave-1"
          d="M0,80 C420,-10 1040,180 1440,40 L1440,0 L0,0 Z"
          fill="url(#lightBand)"
          filter="url(#soften)"
          opacity="0.9"
        />

        {/* Middle bright edge/crease */}
        <path
          className="wave-band wave-2"
          d="M0,420 C480,300 960,500 1440,360 L1440,300 C960,440 480,240 0,360 Z"
          fill="url(#lightBand)"
          filter="url(#soften)"
          opacity="0.85"
        />

        {/* Mid band under crease */}
        <path
          className="wave-band wave-3"
          d="M0,540 C420,420 980,640 1440,520 L1440,900 L0,900 Z"
          fill="url(#midBand)"
          filter="url(#soften)"
          opacity="0.85"
        />

        {/* Dark lower body */}
        <path
          d="M0,620 C360,520 960,760 1440,620 L1440,900 L0,900 Z"
          fill="url(#darkBand)"
          opacity="0.9"
        />

        {/* Fine highlight stroke along the crease */}
        <path d="M0,390 C520,260 980,520 1440,360" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
