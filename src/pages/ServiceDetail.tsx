import { Link, useParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';
import Action from '@/components/Action';
import Arrow from '@/components/Arrow';
import Plate from '@/components/Plate';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
import NotFound from '@/pages/NotFound';
import { getService, services } from '@/lib/services';

const SITE = 'https://jw-gardenservices.co.uk';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const url = `${SITE}/services/${service.slug}`;
  const shareImage = `/assets/og/services-${service.slug}.jpg`;
  const others = services.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.h1,
        description: service.seoDescription,
        serviceType: service.navLabel,
        url,
        image: `${SITE}${shareImage}`,
        provider: { '@id': `${SITE}/#business` },
        areaServed: [
          'Aylesbury',
          'Bierton',
          'Buckingham',
          'Tring',
          'Waddesdon',
          'Stone',
          'Wing',
          'Haddenham',
          'Leighton Buzzard',
          'Chesham',
          'Amersham',
          'Great Missenden',
        ].map((name) => ({ '@type': 'City', name })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.navLabel} — what's included`,
          itemListElement: service.includes.map((item) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: item },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: service.navLabel, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        path={`/services/${service.slug}`}
        image={shareImage}
        imageAlt={`${service.navLabel} by JW Garden Services in the Aylesbury area`}
        jsonLd={jsonLd}
      />
      <PageLayout eyebrow={service.eyebrow} title={service.h1} intro={service.intro}>
        {/* The lead photograph, full width, before a word of body copy. */}
        <section className="pb-4">
          <div className="wrap">
            <Reveal>
              <Plate
                image={service.image}
                alt={service.imageAlt}
                sizes="(max-width: 1024px) 92vw, 84vw"
                aspect="aspect-[16/10] md:aspect-[21/9]"
                priority
                className="group"
              />
            </Reveal>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <div className="max-w-measure">
                {service.body.map((block, index) => (
                  <div key={block.heading} className={index ? 'mt-12' : ''}>
                    <h2 className="display-3 max-w-[22ch] text-balance">{block.heading}</h2>
                    <div className="prose-estate mt-5 text-pretty text-[1.0625rem] text-stone">
                      {block.paragraphs.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={120}>
              <div className="lg:sticky lg:top-32">
                <h2 className="tag rule-bottom block pb-4 text-ceanothus">What&rsquo;s included</h2>
                <ul>
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="rule-bottom py-3.5 font-body text-[0.9375rem] leading-snug"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Action to="/contact">Get a free quote</Action>
                  <a href="tel:+447950636954" className="link-rule nums font-body text-[0.9375rem]">
                    07950 636954
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-tight bg-chalk-wash">
          <div className="wrap">
            <Reveal className="rule-bottom flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pb-5">
              <h2 className="display-2 max-w-[20ch]">
                Recent {service.navLabel.toLowerCase()} work
              </h2>
              <Tag className="text-stone">{service.gallery.length} photographs</Tag>
            </Reveal>

            <div className="mt-10 gap-8 sm:columns-2 lg:columns-3">
              {service.gallery.map((img, i) => (
                <figure key={`${img.src}-${i}`} className="group mb-8 break-inside-avoid">
                  <div className="mount">
                    <div className="overflow-hidden">
                      <img
                        src={img.src}
                        srcSet={img.srcSet}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                        width={img.width}
                        height={img.height}
                        alt={`${service.navLabel} by JW Garden Services in the Aylesbury area — example ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="plate-img"
                      />
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            <Reveal className="mt-6">
              <Action to="/our-work" tone="outline">
                See more of our work
              </Action>
            </Reveal>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Tag className="text-stone">Common questions</Tag>
              <h2 className="display-2 mt-6 max-w-[14ch] text-balance">
                {service.navLabel}, answered
              </h2>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={100}>
              <dl className="rule-top">
                {service.faqs.map((f) => (
                  <div key={f.q} className="rule-bottom py-7">
                    <dt className="display-4 max-w-[42ch]">{f.q}</dt>
                    <dd className="mt-3 max-w-measure text-pretty text-stone">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="section-tight bg-chalk-wash">
          <div className="wrap">
            <Reveal className="rule-bottom pb-5">
              <Tag className="text-stone">Also on the round</Tag>
            </Reveal>
            <ul className="mt-2">
              {others.map((s, index) => (
                <Reveal as="li" key={s.slug} delay={index * 80}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="rule-bottom group grid items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <h3 className="display-3 transition-colors duration-500 ease-estate group-hover:text-ceanothus">
                        {s.navLabel}
                      </h3>
                      <p className="mt-2 max-w-[54ch] text-pretty text-stone">{s.intro}</p>
                    </div>
                    <Arrow className="row-arrow hidden h-4 w-4 text-stone md:block" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <ContactSection />
      </PageLayout>
    </>
  );
};

export default ServiceDetail;
