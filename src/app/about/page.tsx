"use client";
import Image from 'next/image';
import Typewriter from '@/components/Typewriter';
import Reveal from '@/components/Reveal';
import { useState } from 'react';

export default function AboutPage() {
  const [stage, setStage] = useState(0); // 0 -> about, 1 -> education, 2 -> experience
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 text-gray-900 italic">
      <h2 className="text-4xl font-bold mb-10 text-center text-accent-blue not-italic">About</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* About Me card */}
        <div className="tilt-left">
        <Reveal className="rounded-2xl shadow-md bg-white/[0.03] dark:bg-black/[0.03] backdrop-blur-xl border border-white/10 dark:border-white/10 ring-1 ring-white/10 p-6 glass-card" delayMs={0}>
          <div className="flex items-center gap-4 mb-4">
            <Image src="/WebPicture.png" alt="Profile" width={64} height={64} className="rounded-full border-2 border-accent-purple" />
            <h3 className="text-2xl font-semibold not-italic">About Me</h3>
          </div>
          <Typewriter
            text={"I'm a passionate and curious developer who loves building small websites and exploring new technologies. Currently studying Computer Science at Solent University, I'm eager to learn, grow, and take on challenges that help me become a better developer. I enjoy discovering new tools, solving problems, and turning ideas into working projects that people can actually use."}
            className="text-gray-800 leading-relaxed"
            speed={18}
            startDelay={150}
            start={stage === 0}
            onDone={() => setStage(1)}
          />
        </Reveal>
        </div>

        {/* Education card */}
        <Reveal className="rounded-2xl shadow-md bg-white/[0.03] dark:bg-black/[0.03] backdrop-blur-xl border border-white/10 dark:border-white/10 ring-1 ring-white/10 p-6 glass-card no-tilt" delayMs={120}>
          <h3 className="text-2xl font-semibold mb-3 text-accent-purple not-italic">Education</h3>
          <Typewriter
            text={"B.Sc. Computer Science — Solent University Southampton (2023–Present)"}
            className="text-gray-700 font-bold"
            speed={18}
            startDelay={150}
            start={stage >= 1}
            onDone={() => setStage(2)}
          />
        </Reveal>

        {/* Experience card */}
        <div className="tilt-right">
        <Reveal className="rounded-2xl shadow-md bg-white/[0.03] dark:bg-black/[0.03] backdrop-blur-xl border border-white/10 dark:border-white/10 ring-1 ring-white/10 p-6 glass-card" delayMs={240}>
          <h3 className="text-2xl font-semibold mb-3 text-accent-purple not-italic">Experience</h3>
          <Typewriter
            text={"Alongside my studies, I've been working as a freelance web developer, creating small websites for local businesses and individual clients. These projects taught me how to adapt to real-world needs, communicate with clients, and deliver functional, user-friendly websites. This hands-on experience keeps me motivated to keep improving my skills and expanding my knowledge."}
            className="text-gray-800 leading-relaxed"
            speed={18}
            startDelay={150}
            start={stage >= 2}
          />
        </Reveal>
        </div>
      </div>
    </section>
  );
}
