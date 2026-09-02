import { Link } from 'react-router-dom';
import { services } from '@/lib/services';

// The four services do not carry equal weight — maintenance and landscaping are
// the bulk of the work — so the grid gives them the wider cells instead of
// splitting the row into four identical columns.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
const mediaHeights = ['h-64 lg:h-80', 'h-64 lg:h-80', 'h-56 lg:h-64', 'h-56 lg:h-64'];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section opener: left-aligned, sentence case, no letter-spaced eyebrow. */}
        <div className="mb-12 lg:mb-16">
          <p className="kicker font-body mb-6">What We Offer</p>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 className="lg:col-span-7 font-heading heading-section text-foreground tracking-tight text-balance">
              Garden Services in Aylesbury &amp; Buckinghamshire
            </h2>
            <p className="lg:col-span-5 font-body text-muted-foreground leading-relaxed">
              Professional garden maintenance, landscaping, planting and commercial grounds care
              across Aylesbury, Bierton and the surrounding towns and villages — delivered with
              expert craftsmanship and attention to detail.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className={`group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-primary/40 ${spans[index] ?? 'lg:col-span-6'}`}
            >
              <div className={`relative overflow-hidden ${mediaHeights[index] ?? 'h-60'}`}>
                <img
                  src={service.image.src}
                  srcSet={service.image.srcSet}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 46vw, 46vw"
                  width={service.image.width}
                  height={service.image.height}
                  alt={service.imageAlt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <h3 className="font-heading text-2xl leading-snug text-foreground font-semibold mb-3">
                  {service.navLabel}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed measure flex-1">
                  {service.intro}
                </p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center font-body text-sm text-primary"
                >
                  <span className="cta-move">Find out more</span>
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
