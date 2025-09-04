import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  // Tailwind v4 auto-detects content via your framework.
  // Keeping only the src glob for clarity when needed by tooling.
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: {
          blue: '#3b82f6',
          purple: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        wave: {
          '0%,100%': { transform: 'translateY(0)' },
          '10%': { transform: 'translateY(-10px)' },
          '20%': { transform: 'translateY(10px)' },
          '30%': { transform: 'translateY(-20px)' },
          '40%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
  wave: 'wave 2s infinite ease-in-out',
        'fade-in': 'fadeIn 300ms ease-in forwards',
        'fade-out': 'fadeOut 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
