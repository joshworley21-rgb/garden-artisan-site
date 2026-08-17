import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/services';

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="font-heading heading-section text-foreground font-semibold mb-6">
            Garden Services in Aylesbury &amp; Buckinghamshire
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Professional garden maintenance, landscaping, planting and commercial grounds care
            across Aylesbury, Bierton and the surrounding towns and villages — delivered with
            expert craftsmanship and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className="group relative flex flex-col bg-card rounded-lg overflow-hidden shadow-soft border border-border/60 hover:border-accent/40 hover:shadow-elevated hover:-translate-y-2 transition-all duration-500 ease-out"
            >
              {/* Image */}
              <div className="relative h-52 sm:h-60 lg:h-64 overflow-hidden">
                <img
                  src={service.image.src}
                  srcSet={service.image.srcSet}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  width={service.image.width}
                  height={service.image.height}
                  alt={service.imageAlt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Persistent subtle gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent" />
                {/* Gold accent bar that grows on hover */}
                <div className="absolute left-0 bottom-0 h-1 w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />

                {/* Index badge */}
                <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/90 backdrop-blur-sm font-heading text-sm font-semibold text-primary shadow-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-heading text-2xl leading-snug text-foreground font-semibold mb-4 transition-colors duration-300 group-hover:text-primary">
                  {service.navLabel}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-2 flex-1">
                  {service.intro}
                </p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-body text-sm uppercase tracking-widest text-primary"
                >
                  Find out more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="absolute inset-0" aria-hidden="true" />
                  <span className="sr-only"> about {service.navLabel.toLowerCase()}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
