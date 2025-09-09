"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import HeroStage from './HeroStage';

const AVATAR_SIZE = 180; // px
const ORB_SIZE = 16;     // px
const ORB_RADIUS = AVATAR_SIZE / 2 + 8; // px
const ORB_SPEED = 6;     // seconds

const Hero: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <HeroStage>
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div
            className="relative mb-6 flex items-center justify-center"
            style={{
              width: `${AVATAR_SIZE}px`,
              height: `${AVATAR_SIZE}px`,
            }}
          >
            {/* Animated black orb circling around the picture */}
            <div
              ref={orbRef}
              className="absolute rounded-full bg-black z-20"
              style={{
                width: `${ORB_SIZE}px`,
                height: `${ORB_SIZE}px`,
                left: `${AVATAR_SIZE / 2 - ORB_SIZE / 2}px`,
                top: `0px`,
              }}
              aria-hidden="true"
            />
            <Image
              src="/WebPicture.png"
              alt="Web Picture"
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              className="rounded-full object-cover object-center shadow-xl z-10"
              priority
            />
          </div>
          <div className="relative mb-2 text-center">
            <h1 className="text-3xl sm:text-6xl font-extrabold mb-3 sm:mb-4 text-accent-blue">G{'{'}dev{'}'}</h1>
            <p className="text-base sm:text-xl mb-4 sm:mb-6 text-black dark:text-black">Freelancer Web Developer</p>
          </div>
        </div>
      </HeroStage>
    </section>
  );
};

export default Hero;