import { useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '@/components/Arrow';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
import { services } from '@/lib/services';

/**
 * How often each kind of work happens. The four services are not a sequence,
 * so numbering them 01–04 would be decoration; their cadence is the thing a
 * customer is actually choosing between, so that is what the label carries.
 */
const cadence: Record<string, string> = {
  'garden-maintenance': 'Weekly',
  'landscaping-and-patios': 'Project work',
  'garden-design-and-planting': 'Seasonal',
  'commercial-grounds-maintenance': 'Contract',
};

/**
 * An index rather than a row of cards: the four services listed as ruled
 * entries, with one large plate alongside that changes to whichever entry you
 * are reading. Phones get the plate inside each entry instead.
 */
const ServicesSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section">
      <div className="wrap">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Tag className="text-stone">What we do</Tag>
            <h2 className="display-2 mt-6 max-w-[16ch] text-balance">
              Four kinds of work, one gardener
            </h2>
          </div>
          <p className="lead max-w-[42ch] text-pretty text-stone lg:col-span-5 lg:pb-2">
            Maintenance, hard landscaping, planting and commercial grounds &mdash; across Aylesbury,
            Bierton and the villages around them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-16 lg:mt-20 lg:grid-cols-12">
          <ul className="rule-top lg:col-span-7">
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 90}>
                <Link
                  to={`/services/${service.slug}`}
                  className="rule-bottom group grid items-start gap-x-8 gap-y-4 py-8 md:grid-cols-[7.5rem_1fr_auto] lg:py-10"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="tag pt-2 text-ceanothus" aria-hidden="true">
                    {cadence[service.slug] ?? service.eyebrow}
                  </span>

                  <div>
                    <h3 className="display-3 transition-colors duration-500 ease-estate group-hover:text-ceanothus">
                      {service.navLabel}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-pretty text-stone">{service.intro}</p>

                    {/* Phones get the picture in the row; desktops get the
                        single large plate alongside the list. */}
                    <div className="mount mt-6 lg:hidden">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={service.image.src}
                          srcSet={service.image.srcSet}
                          sizes="(max-width: 1024px) 92vw, 1px"
                          width={service.image.width}
                          height={service.image.height}
                          alt={service.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="plate-img"
                        />
                      </div>
                    </div>
                  </div>

                  <span className="hidden pt-3 text-stone transition-colors duration-500 group-hover:text-ink md:block">
                    <Arrow className="row-arrow h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <div className="mount">
                <div className="relative aspect-[4/5] overflow-hidden bg-chalk-mount">
                  {services.map((service, index) => (
                    <img
                      key={service.slug}
                      src={service.image.src}
                      srcSet={service.image.srcSet}
                      sizes="(max-width: 1024px) 1px, 34vw"
                      width={service.image.width}
                      height={service.image.height}
                      alt={index === active ? service.imageAlt : ''}
                      aria-hidden={index !== active}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-estate ${
                        index === active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="tag mt-4 block text-stone">{services[active].navLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
