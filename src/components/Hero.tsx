import Image from 'next/image';

const Hero: React.FC = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-24 text-foreground overflow-hidden">
    {/* ICONS LAYER (behind) */}
    <ul className="pointer-events-none absolute inset-0 z-0">
      {/* Hide or shrink most icons on phones */}
      <li className="hidden sm:block absolute left-[8%] top-[12%] w-14 h-14">
        <img src="/icons/html5.svg" className="w-full h-full" alt="HTML5" />
      </li>
      <li className="hidden sm:block absolute right-[14%] top-[18%] w-12 h-12">
        <img src="/icons/mysql.svg" className="w-full h-full" alt="MySQL" />
      </li>
      <li className="absolute left-[6%] bottom-[18%] w-10 h-10 sm:w-12 sm:h-12 opacity-90">
        <img src="/icons/css3.svg" className="w-full h-full" alt="CSS3" />
      </li>
      {/* Add more icons as needed, using hidden sm:block or smaller sizes for mobile */}
    </ul>

    <div className="relative z-10">
      {/* Avatar + equal-size halo */}
      <div className="relative w-[260px] h-[260px] mb-6 mx-auto">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px]"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, black 55%, transparent 75%)',
            maskImage: 'radial-gradient(circle at center, black 0%, black 55%, transparent 75%)',
          }}
        >
          <div className="w-full h-full backdrop-brightness-110 backdrop-blur-sm" />
        </div>
        {/* Single fast orb */}
        <div className="orbit-dot w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] z-0" />
        <Image
          src="/WebPicture.png"
          alt="Web Picture"
          fill
          sizes="260px"
          className="rounded-full object-cover object-center shadow-xl z-10"
          priority
        />
      </div>
      {/* Text block */}
      <div className="relative mb-2">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-accent-blue">G{'{'}dev{'}'}</h1>
        <p className="text-xl sm:text-2xl mb-6 text-black dark:text-black">Freelancer Web Developer</p>
      </div>
    </div>
  </section>
);

export default Hero;
