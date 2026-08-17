import { Link, useParams } from 'react-router-dom';
import { Check, ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';
import { Button } from '@/components/ui/button';
import NotFound from '@/pages/NotFound';
import { getArea, areas } from '@/lib/areas';
import { services } from '@/lib/services';

const SITE = 'https://www.jw-gardening.com';

const AreaDetail = () => {
  const { slug } = useParams();
  const area = getArea(slug);

  if (!area) return <NotFound />;

  const url = `${SITE}/${area.slug}`;
  const others = areas.filter((a) => a.slug !== area.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Garden maintenance and landscaping in ${area.town}`,
        description: area.seoDescription,
        serviceType: 'Garden maintenance',
        url,
        provider: { '@id': `${SITE}/#business` },
        areaServed: {
          '@type': 'City',
          name: area.town,
          address: {
            '@type': 'PostalAddress',
            addressLocality: area.town,
            addressRegion: 'Buckinghamshire',
            addressCountry: 'GB',
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: area.faqs.map((f) => ({
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
          { '@type': 'ListItem', position: 2, name: `Gardeners in ${area.town}`, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Seo title={area.seoTitle} description={area.seoDescription} path={`/${area.slug}`} jsonLd={jsonLd} />
      <PageLayout eyebrow={area.eyebrow} title={area.h1} intro={area.intro}>
        {/* Copy + local facts */}
        <section className="section-padding bg-background">
          <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-10">
              {area.body.map((block) => (
                <div key={block.heading}>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    {block.heading}
                  </h2>
                  <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                    {block.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Searching for a &ldquo;gardener near me&rdquo; in {area.town}?
                </h2>
                <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Most people find us by typing exactly that. What they usually want is simple: someone
                    genuinely close by, who turns up when they say they will, does a proper job and clears up
                    afterwards. That is the whole of our business model.
                  </p>
                  <p>
                    We are based in Bierton, Aylesbury &mdash; {area.travelTime.toLowerCase()} &mdash; and we
                    cover {area.postcodes}. Call{' '}
                    <a href="tel:+447950636954" className="text-primary underline underline-offset-4">
                      07950 636954
                    </a>{' '}
                    and we will tell you honestly whether your {area.town} garden is on our round and what a
                    visit would cost.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28 space-y-8">
              <img
                src={area.image.src}
                srcSet={area.image.srcSet}
                sizes="(max-width: 1024px) 100vw, 45vw"
                width={area.image.width}
                height={area.image.height}
                alt={area.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg shadow-elevated object-cover aspect-[4/3]"
              />
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-6 sm:p-8">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Why we&rsquo;re local to {area.town}
                </h2>
                <ul className="space-y-3">
                  {area.localNotes.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                      </span>
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 space-y-3 border-t border-border/60 pt-6 font-body text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>
                      <dt className="inline font-medium text-foreground">Postcodes covered: </dt>
                      <dd className="inline">{area.postcodes}</dd>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>
                      <dt className="inline font-medium text-foreground">Distance from us: </dt>
                      <dd className="inline">{area.travelTime}</dd>
                    </span>
                  </div>
                </dl>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button variant="elegant" size="lg" asChild>
                    <Link to="/contact">
                      Get a free quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="tel:+447950636954">
                      <Phone className="h-4 w-4" />
                      07950 636954
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services in this town */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <h2 className="font-heading heading-section text-foreground font-semibold mb-8 text-center">
              What we do in {area.town}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group rounded-lg border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
                >
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {s.navLabel}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{s.intro}</p>
                  <span className="font-body text-sm text-primary inline-flex items-center gap-2">
                    Find out more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <h2 className="font-heading heading-section text-foreground font-semibold mb-8 text-center">
              Gardens we look after near {area.town}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              {area.gallery.map((img, i) => (
                <img
                  key={`${img.src}-${i}`}
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  width={img.width}
                  height={img.height}
                  alt={`Garden maintained by JW Garden Services near ${area.town}, Buckinghamshire — example ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-lg shadow-soft object-cover aspect-[4/3]"
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide max-w-3xl">
            <h2 className="font-heading heading-section text-foreground font-semibold mb-8">
              Gardening in {area.town} — common questions
            </h2>
            <dl className="space-y-8">
              {area.faqs.map((f) => (
                <div key={f.q} className="border-b border-border/60 pb-6 last:border-0">
                  <dt className="font-heading text-xl font-semibold text-foreground mb-2">{f.q}</dt>
                  <dd className="font-body text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Nearby areas */}
        <section className="section-padding bg-background">
          <div className="container-wide text-center">
            <h2 className="font-heading heading-section text-foreground font-semibold mb-8">
              We also cover nearby
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {others.map((a) => (
                <Link
                  key={a.slug}
                  to={`/${a.slug}`}
                  className="font-body text-sm rounded-full border border-border/60 bg-card px-5 py-2.5 text-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Gardeners in {a.town}
                </Link>
              ))}
              <Link
                to="/#areas"
                className="font-body text-sm rounded-full border border-border/60 bg-card px-5 py-2.5 text-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-primary"
              >
                All areas we cover
              </Link>
            </div>
          </div>
        </section>

        <ContactSection />
      </PageLayout>
    </>
  );
};

export default AreaDetail;
