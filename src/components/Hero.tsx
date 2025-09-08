import Image from 'next/image';

const Hero: React.FC = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-24 text-foreground overflow-hidden">
    <div className="relative z-10">
      {/* Avatar */}
      <div className="relative w-[260px] h-[260px] mb-6 mx-auto">
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
