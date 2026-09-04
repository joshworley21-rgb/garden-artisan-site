import { Link, useParams } from 'react-router-dom';
import { Check, Phone } from 'lucide-react';
import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';
import { Button } from '@/components/ui/button';
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
          name: `${service.navLabel}: what's included`,
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
        {/* Main copy + hero image */}
        <section className="section-padding bg-background">
          <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-10">
              {service.body.map((block) => (
                <div key={block.heading}>
                  <h2 className="font-heading heading-sub text-foreground mb-4">
                    {block.heading}
                  </h2>
                  <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                    {block.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-28 space-y-8">
              <img
                src={service.image.src}
                srcSet={service.image.srcSet}
                sizes="(max-width: 1024px) 100vw, 45vw"
                width={service.image.width}
                height={service.image.height}
                alt={service.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg shadow-elevated object-cover aspect-[4/3]"
              />
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-6 sm:p-8">
                <h2 className="font-heading heading-sub text-foreground mb-4">
                  What&rsquo;s included
                </h2>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button variant="elegant" size="lg" asChild>
                    <Link to="/contact">
                      Get a free quote
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="tel:+447950636954">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      07950 636954
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <h2 className="font-heading heading-section text-foreground mb-8 text-center">
              Recent {service.navLabel.toLowerCase()} work
            </h2>
            {/* Same wall treatment as the homepage portfolio: a 2px hairline
                gutter, no radius, no shadow. */}
            <div className="grid sm:grid-cols-3 gap-0.5">
              {service.gallery.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  width={img.width}
                  height={img.height}
                  alt={`${service.navLabel} project by JW Garden Services in the Aylesbury area, example ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover aspect-[4/3]"
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link to="/our-work">
                  See more of our work
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-background">
          <div className="container-wide max-w-3xl">
            <h2 className="font-heading heading-section text-foreground mb-8">
              {service.navLabel} FAQs
            </h2>
            <dl className="space-y-8">
              {service.faqs.map((f) => (
                <div key={f.q} className="border-b border-border/60 pb-6 last:border-0">
                  <dt className="font-heading heading-sub text-foreground mb-2">{f.q}</dt>
                  <dd className="font-body text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Other services — internal linking */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <h2 className="font-heading heading-section text-foreground mb-8 text-center">
              Our other services
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group rounded-lg border border-border/60 bg-card p-6 shadow-soft transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
                >
                  <h3 className="font-heading heading-sub text-foreground mb-2 group-hover:text-primary transition-colors">
                    {s.navLabel}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {s.intro}
                  </p>
                  <span className="cta-move font-body text-sm text-primary">
                    Find out more
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </PageLayout>
    </>
  );
};

export default ServiceDetail;
