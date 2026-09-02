import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/services';

const [lead, ...rest] = services;

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section head — the label sits on the rule, the heading hangs from
            it, and the standfirst runs in a second column. */}
        <div className="ruled-head grid gap-6 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <span className="label label-rule text-accent mb-5 block">What We Offer</span>
            <h2 className="font-heading heading-section text-foreground">
              Garden Services in Aylesbury &amp; Buckinghamshire
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground leading-relaxed lg:col-span-5 lg:pt-1">
            Professional garden maintenance, landscaping, planting and commercial grounds care
            across Aylesbury, Bierton and the surrounding towns and villages — delivered with
            expert craftsmanship and attention to detail.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The work most people come here for, given the space to show it. */}
          <article className="group relative lg:col-span-6">
            <div className="plate relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[5/6]">
              <img
                src={lead.image.src}
                srcSet={lead.image.srcSet}
                sizes="(max-width: 1024px) 92vw, 46vw"
                width={lead.image.width}
                height={lead.image.height}
                alt={lead.imageAlt}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="font-heading text-3xl lg:text-4xl text-foreground mt-7 mb-4 transition-colors duration-200 group-hover:text-accent">
              {lead.navLabel}
            </h3>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-xl">
              {lead.intro}
            </p>
            <Link
              to={`/services/${lead.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-accent"
            >
              <span className="cta-move inline-flex items-center gap-2">
                Find out more
                <ArrowRight className="cta-arrow h-4 w-4" />
              </span>
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="sr-only"> about {lead.navLabel.toLowerCase()}</span>
            </Link>
          </article>

          {/* The rest read as an index: a ruled row each, no card chrome. */}
          <div className="lg:col-span-6 lg:pt-2">
            {rest.map((service) => (
              <article
                key={service.slug}
                className="group relative row-ruled grid grid-cols-[5.5rem_1fr] sm:grid-cols-[9rem_1fr] gap-5 sm:gap-8 py-8 first:pt-0 lg:first:pt-0"
              >
                <div className="plate relative aspect-square self-start">
                  <img
                    src={service.image.src}
                    srcSet={service.image.srcSet}
                    sizes="(max-width: 640px) 88px, 144px"
                    width={service.image.width}
                    height={service.image.height}
                    alt={service.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div>
                  <h3 className="font-heading text-xl sm:text-2xl leading-snug text-foreground mb-3 transition-colors duration-200 group-hover:text-accent">
                    {service.navLabel}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {service.intro}
                  </p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-accent"
                  >
                    <span className="cta-move inline-flex items-center gap-2">
                      Find out more
                      <ArrowRight className="cta-arrow h-4 w-4" />
                    </span>
                    <span className="absolute inset-0" aria-hidden="true" />
                    <span className="sr-only"> about {service.navLabel.toLowerCase()}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
