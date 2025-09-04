import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundWaves from '@/components/BackgroundWaves';

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: 'Your Name | Portfolio',
  description: 'Personal portfolio website for Your Name. Modern, responsive, and built with Next.js, TypeScript, and TailwindCSS.',
  openGraph: {
    title: 'Your Name | Portfolio',
    description: 'Personal portfolio website for Your Name. Modern, responsive, and built with Next.js, TypeScript, and TailwindCSS.',
    url: 'https://yourdomain.com',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: '/WebPicture.png',
        width: 800,
        height: 600,
        alt: 'Your Name Profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-foreground font-sans bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-500">
        <Navbar />
        <main className="min-h-screen pt-16 pb-16 relative z-10">
          {/* Waves that scroll with the page */}
          <BackgroundWaves />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
