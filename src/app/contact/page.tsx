import ContactForm from '@/components/ContactForm';
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/gca-dev-90' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/george-angheluta-42a6981a3' },
];

export default function ContactPage() {
  return (
    <section className="max-w-2xl mx-auto py-16 px-4 bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-8 text-accent-blue text-center">Contact</h2>
      <ContactForm />
      <div className="flex justify-center gap-6 mt-8">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-accent-purple transition-colors text-2xl">
            {/* Replace with icon components or SVGs */}
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
}
