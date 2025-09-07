import { CenteredCarousel } from '@/components/CenteredCarousel';

const testimonials = [
  {
    image: '',
    title: 'Jane Doe',
    description: 'George is a fantastic developer! He delivered my project on time and exceeded expectations.'
  },
  {
    image: '',
    title: 'John Smith',
    description: 'Professional, creative, and reliable. Highly recommended!'
  },
  {
    image: '',
    title: 'Emily Chen',
    description: 'Working with George was an outstanding experience. His expertise made the process seamless.'
  },
  {
    image: '',
    title: 'Carlos Vega',
    description: 'Great communicator and problem solver. The software worked perfectly from day one.'
  },
  {
    image: '',
    title: 'Sofia Rossi',
    description: 'I appreciated the attention to detail and passion for quality. Would absolutely hire again.'
  },
  {
    image: '',
    title: 'Liam O’Brien',
    description: 'Exceeded expectations with every milestone. Truly professional work.'
  },
];

export default function TestimonialsPage() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-8 text-accent-blue text-center">Testimonials</h2>
      <div className="h-96">
        <CenteredCarousel
          items={testimonials}
          cardWidth={320}
          gap={16}
          autoPlay={false}
          autoPlayInterval={5000}
          infinite={true}
          showArrows={true}
          showDots={true}
        />
      </div>
    </section>
  );
}
