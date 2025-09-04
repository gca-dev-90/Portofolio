import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 flex flex-col items-center bg-white text-gray-900">
      <h2 className="text-4xl font-bold mb-6 text-accent-blue">About Me</h2>
      <Image src="/WebPicture.png" alt="Profile" width={120} height={120} className="rounded-full mb-4 border-4 border-accent-purple" />
      <p className="text-lg text-gray-900 mb-8 text-center italic">
        I&apos;m a passionate and curious developer who loves building small websites and exploring new technologies. Currently studying Computer Science at Solent University, I&apos;m eager to learn, grow, and take on challenges that help me become a better developer. I enjoy discovering new tools, solving problems, and turning ideas into working projects that people can actually use.
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-accent-purple">Education</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">B.Sc. Computer Science - Solent University Southampton <span className="text-gray-500">(2023-Present)</span></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-accent-purple">Experience</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">
              Alongside my studies, I&apos;ve been working as a freelance web developer, creating small websites for local businesses and individual clients. These projects taught me how to adapt to real-world needs, communicate with clients, and deliver functional, user-friendly websites. This hands-on experience keeps me motivated to keep improving my skills and expanding my knowledge.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
