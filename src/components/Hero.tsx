import Image from 'next/image';

const Hero: React.FC = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-16 sm:py-24 text-foreground overflow-hidden">
    <div className="relative z-10">
      {/* Glowing pulsing ring behind the avatar */}
      <div className="relative w-40 h-40 sm:w-64 sm:h-64 mb-6 mx-auto flex items-center justify-center">
        <span className="absolute inline-block w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-black opacity-30 animate-pulse ring-8 ring-black/40 z-0" />
        <Image
          src="/WebPicture.png"
          alt="Web Picture"
          fill
          sizes="160px"
          className="rounded-full object-cover object-center shadow-xl z-10"
          priority
        />
      </div>
      <div className="relative mb-2">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-accent-blue">G{'{'}dev{'}'}</h1>
        <p className="text-base sm:text-xl mb-6 text-black dark:text-black">Freelancer Web Developer</p>
      </div>
    </div>
  </section>
);

export default Hero;
