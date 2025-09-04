import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <body className="min-h-screen text-foreground font-sans bg-[conic-gradient(from_210deg_at_50%_50%,_#f8fafc_0deg,_#e5e7eb_28deg,_#cbd5e1_95deg,_#9ca3af_150deg,_#6b7280_210deg,_#52525b_265deg,_#a1a1aa_320deg,_#f8fafc_360deg)] bg-fixed">
        <Navbar />
        <main className="min-h-screen pt-16 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
