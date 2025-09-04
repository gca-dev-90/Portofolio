import Hero from '@/components/Hero';
import FloatingSkills from '@/components/FloatingSkills';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Home-only floating skill icons that scroll with the page.
          Keep under the navbar and above the footer with responsive bottom spacing. */}
      <div className="absolute left-0 right-0 top-16 bottom-32 md:bottom-36 lg:bottom-40 z-20">
        <FloatingSkills sizeMin={72} sizeMax={110} seed="home-floating-v1" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        <Hero />
      </div>
    </div>
  );
}
