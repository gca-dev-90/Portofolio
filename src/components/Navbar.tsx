"use client";
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <header className="w-full bg-background h-16 flex items-center px-6 relative z-50">
      <nav className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/WebPicture.png" alt="Logo" width={40} height={40} className="rounded-full" priority />
        </Link>
        {/* Links */}
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-sky-100 hover:text-sky-500 hover:scale-105 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_12px_rgba(96,165,250,0.7)]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-sky-100 hover:text-sky-500 hover:scale-105 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_12px_rgba(96,165,250,0.7)]">
              About
            </Link>
          </li>
          <li>
            <Link href="/testimonials" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-sky-100 hover:text-sky-500 hover:scale-105 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_12px_rgba(96,165,250,0.7)]">
              Testimonials
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-sky-100 hover:text-sky-500 hover:scale-105 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_12px_rgba(96,165,250,0.7)]">
              Contact
            </Link>
          </li>
        </ul>
        {/* CTA removed to avoid 404 until /public/cv.pdf exists */}
      </nav>
    </header>
  );
}

export default Navbar;
