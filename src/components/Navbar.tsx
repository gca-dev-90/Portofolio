"use client";
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center px-6 bg-transparent">
      <nav className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/WebPicture.png" alt="Logo" width={40} height={40} className="rounded-full" priority />
        </Link>
        {/* Links */}
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-gray-200 hover:text-gray-700 hover:scale-105 hover:shadow-[0_0_12px_rgba(75,85,99,0.55)] dark:hover:shadow-[0_0_12px_rgba(156,163,175,0.6)]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-gray-200 hover:text-gray-700 hover:scale-105 hover:shadow-[0_0_12px_rgba(75,85,99,0.55)] dark:hover:shadow-[0_0_12px_rgba(156,163,175,0.6)]">
              About
            </Link>
          </li>
          <li>
            <Link href="/testimonials" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-gray-200 hover:text-gray-700 hover:scale-105 hover:shadow-[0_0_12px_rgba(75,85,99,0.55)] dark:hover:shadow-[0_0_12px_rgba(156,163,175,0.6)]">
              Testimonials
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-base font-medium text-black px-3 py-2 rounded-full transition hover:bg-gray-200 hover:text-gray-700 hover:scale-105 hover:shadow-[0_0_12px_rgba(75,85,99,0.55)] dark:hover:shadow-[0_0_12px_rgba(156,163,175,0.6)]">
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
