import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Excellent job replacing fence panels and posts damaged in the recent storms. Josh worked hard and cleared away afterwards. Highly recommended',
    author: 'L Morris',
  },
  {
    quote:
      'Done a super job trimming a very overgrown hedge. Just how I wanted it 100% recommend Josh.',
    author: 'J Gates',
  },
  {
    quote:
      'Josh is a very friendly guy and has done an amazing job in clearing our garden ready for winter. I would highly recommend him',
    author: 'Z Penney',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <h2 className="font-heading text-4xl md:text-5xl text-foreground font-semibold text-center mb-16">
          Happy Customers
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="bg-card p-8 rounded-lg shadow-soft border border-border flex flex-col"
            >
              <Quote className="h-8 w-8 text-accent mb-4" />
              <blockquote className="font-body text-muted-foreground leading-relaxed mb-6">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto font-heading text-lg text-foreground font-semibold">
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
