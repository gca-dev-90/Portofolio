"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const AVATAR_SIZE_DESKTOP = 180; // px
const AVATAR_SIZE_MOBILE = 128;  // px
const ORB_SIZE_DESKTOP = 16;     // px
const ORB_SIZE_MOBILE = 10;      // px
const ORB_SPEED = 6;             // seconds for a full rotation

const Hero: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  // Determine sizes based on screen width
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const AVATAR_SIZE = isMobile ? AVATAR_SIZE_MOBILE : AVATAR_SIZE_DESKTOP;
  const ORB_SIZE = isMobile ? ORB_SIZE_MOBILE : ORB_SIZE_DESKTOP;
  const ORB_RADIUS = AVATAR_SIZE / 2 + 8; // px (just outside the avatar)

  useEffect(() => {
    let animationFrame: number;
    const animate = (start: number) => {
      const now = performance.now();
      const elapsed = ((now - start) / 1000) % ORB_SPEED;
      const angle = (elapsed / ORB_SPEED) * 2 * Math.PI;
      const x = AVATAR_SIZE / 2 + ORB_RADIUS * Math.cos(angle) - ORB_SIZE / 2;
      const y = AVATAR_SIZE / 2 + ORB_RADIUS * Math.sin(angle) - ORB_SIZE / 2;

      if (orbRef.current) {
        orbRef.current.style.left = `${x}px`;
        orbRef.current.style.top = `${y}px`;
      }
      animationFrame = requestAnimationFrame(() => animate(start));
    };
    const start = performance.now();
    animationFrame = requestAnimationFrame(() => animate(start));
    return () => cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line
  }, [AVATAR_SIZE, ORB_SIZE, ORB_RADIUS]);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 sm:py-32 text-foreground overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        {/* Avatar + animated black orb */}
        <div
          className="relative mb-4 sm:mb-6 flex items-center justify-center"
          style={{
            width: isMobile ? `${AVATAR_SIZE_MOBILE}px` : `${AVATAR_SIZE_DESKTOP}px`,
            height: isMobile ? `${AVATAR_SIZE_MOBILE}px` : `${AVATAR_SIZE_DESKTOP}px`,
          }}
        >
          {/* Animated black orb circling around the picture */}
          <div
            ref={orbRef}
            className="absolute rounded-full bg-black z-20"
            style={{
              width: isMobile ? `${ORB_SIZE_MOBILE}px` : `${ORB_SIZE_DESKTOP}px`,
              height: isMobile ? `${ORB_SIZE_MOBILE}px` : `${ORB_SIZE_DESKTOP}px`,
              left: `${(isMobile ? AVATAR_SIZE_MOBILE : AVATAR_SIZE_DESKTOP) / 2 - (isMobile ? ORB_SIZE_MOBILE : ORB_SIZE_DESKTOP) / 2}px`,
              top: `0px`,
            }}
            aria-hidden="true"
          />
          <Image
            src="/WebPicture.png"
            alt="Web Picture"
            fill
            sizes={isMobile ? `${AVATAR_SIZE_MOBILE}px` : `${AVATAR_SIZE_DESKTOP}px`}
            className="rounded-full object-cover object-center shadow-xl z-10"
            priority
          />
        </div>
        <div className="relative mb-2">
          <h1 className="text-3xl sm:text-6xl font-extrabold mb-3 sm:mb-4 text-accent-blue">G{'{'}dev{'}'}</h1>
          <p className="text-base sm:text-xl mb-4 sm:mb-6 text-black dark:text-black">Freelancer Web Developer</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;