import Image from 'next/image';

const testimonials = [
  {
    name: 'Jane Doe',
    text: 'George is a fantastic developer! He delivered my project on time and exceeded expectations.',
    image: '/WebPicture.png',
  },
  {
    name: 'John Smith',
    text: 'Professional, creative, and reliable. Highly recommended!',
    image: '/WebPicture.png',
  },
];

export default function TestimonialsPage() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-8 text-accent-blue text-center">Testimonials</h2>
      <div className="space-y-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-gray-100 rounded-lg p-6 shadow flex flex-col items-center">
            {t.image && (
              <Image src={t.image} alt={t.name} width={80} height={80} className="rounded-full mb-4 border-4 border-accent-purple object-cover" />
            )}
            <p className="text-lg text-gray-700 italic mb-2">&quot;{t.text}&quot;</p>
            <span className="font-semibold text-accent-blue">- {t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
