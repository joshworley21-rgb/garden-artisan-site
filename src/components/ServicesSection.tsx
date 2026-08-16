import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import maintenance from '@/assets/jw-maintenance.jpg.asset.json';
import landscaping from '@/assets/jw-landscaping.jpg.asset.json';
import commercial from '@/assets/jw-commercial.jpg.asset.json';

const services = [
  {
    title: 'General Maintenance',
    description:
      'Let us take the stress out of gardening, working closely with you to improve and develop your garden into somewhere you can relax and enjoy with our year-round maintenance and expertise.',
    image: maintenance.url,
  },
  {
    title: 'Garden design and Hard landscaping',
    description:
      'We can create an outdoor space you can be proud of, whether you need a new outdoor entertaining space, a border redesign/ refresh, or even a whole garden makeover. We can help.',
    image: landscaping.url,
  },
  {
    title: 'Commercial grounds maintenance',
    description:
      'We offer flexible plans tailored to your specific needs and budget. Our expertise can enhance your property\u2019s appeal and keep your business premises looking professional and welcoming.',
    image: commercial.url,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground font-semibold mb-6">
            Our Services
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Complete care for your outdoor space. From weekly mowing to full landscape design. Your
            garden our expertise&ndash;professional care you can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.title}
              className="group flex flex-col bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-elevated border border-border hover:border-accent/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Leaf className="h-5 w-5 text-primary" />
                </span>
                <h3 className="font-heading text-2xl text-foreground font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  className="mt-auto inline-flex items-center gap-2 font-body text-sm uppercase tracking-widest text-primary group/link"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
              <span className="block h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
