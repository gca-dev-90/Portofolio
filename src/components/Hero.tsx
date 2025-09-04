import Image from 'next/image';

const Hero: React.FC = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-24 text-foreground overflow-hidden">
    <div className="relative z-10">
      {/* Avatar + equal-size halo */}
      <div className="relative w-[260px] h-[260px] mb-6">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px]"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, black 55%, transparent 75%)',
            maskImage: 'radial-gradient(circle at center, black 0%, black 55%, transparent 75%)',
          }}
        >
          <div className="w-full h-full backdrop-brightness-110 backdrop-blur-sm" />
        </div>
        <Image
          src="/WebPicture.png"
          alt="Web Picture"
          fill
          sizes="260px"
          className="rounded-full object-cover shadow-xl"
          priority
        />
      </div>
      {/* Text block (no background alteration to preserve page colors) */}
      <div className="relative mb-2">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-accent-blue">G{'{'}dev{'}'}</h1>
        <p className="text-xl sm:text-2xl mb-6 text-black dark:text-black">Freelancer Web Developer</p>
      </div>
    </div>
  </section>
);

export default Hero;
