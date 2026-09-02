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
import { getArea, areas } from '@/lib/areas';
import { services } from '@/lib/services';

const SITE = 'https://jw-gardenservices.co.uk';

const AreaDetail = () => {
  const { slug } = useParams();
  const area = getArea(slug);

  if (!area) return <NotFound />;

  const url = `${SITE}/${area.slug}`;
  const shareImage = `/assets/og/${area.slug}.jpg`;
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
        image: `${SITE}${shareImage}`,
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
      <Seo
        title={area.seoTitle}
        description={area.seoDescription}
        path={`/${area.slug}`}
        image={shareImage}
        imageAlt={`Garden maintained by JW Garden Services in ${area.town}, Buckinghamshire`}
        jsonLd={jsonLd}
      />
      <PageLayout eyebrow={area.eyebrow} title={area.h1} intro={area.intro}>
        <section className="pb-4">
          <div className="wrap">
            <Reveal>
              <Plate
                image={area.image}
                alt={area.imageAlt}
                sizes="(max-width: 1024px) 92vw, 84vw"
                aspect="aspect-[16/10] md:aspect-[21/9]"
                priority
                className="group"
              />
            </Reveal>
          </div>
        </section>

        {/* The three facts that decide whether we are worth ringing. */}
        <section className="section-tight pb-0">
          <div className="wrap">
            <Reveal>
              <dl className="rule-top grid gap-x-10 gap-y-6 pt-8 sm:grid-cols-3">
                <div>
                  <dt className="tag text-ceanothus">Distance</dt>
                  <dd className="mt-2.5 font-body text-[0.9375rem] text-stone">{area.travelTime}</dd>
                </div>
                <div>
                  <dt className="tag text-ceanothus">Postcodes</dt>
                  <dd className="nums mt-2.5 font-body text-[0.9375rem] text-stone">{area.postcodes}</dd>
                </div>
                <div>
                  <dt className="tag text-ceanothus">Nearby</dt>
                  <dd className="mt-2.5 font-body text-[0.9375rem] text-stone">
                    {area.nearby.join(', ')}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <div className="max-w-measure">
                {area.body.map((block, index) => (
                  <div key={block.heading} className={index ? 'mt-12' : ''}>
                    <h2 className="display-3 max-w-[24ch] text-balance">{block.heading}</h2>
                    <div className="prose-estate mt-5 text-pretty text-[1.0625rem] text-stone">
                      {block.paragraphs.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-12">
                  <h2 className="display-3 max-w-[24ch] text-balance">
                    Searching for a &ldquo;gardener near me&rdquo; in {area.town}?
                  </h2>
                  <div className="prose-estate mt-5 text-pretty text-[1.0625rem] text-stone">
                    <p>
                      Most people find us by typing exactly that. What they usually want is simple:
                      someone genuinely close by, who turns up when they say they will, does a proper
                      job and clears up afterwards. That is the whole of our business model.
                    </p>
                    <p>
                      We are based in Bierton, Aylesbury &mdash; {area.travelTime.toLowerCase()}{' '}
                      &mdash; and we cover {area.postcodes}. Call{' '}
                      <a href="tel:+447950636954" className="link-rule nums">
                        07950 636954
                      </a>{' '}
                      and we will tell you honestly whether your {area.town} garden is on our round
                      and what a visit would cost.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={120}>
              <div className="lg:sticky lg:top-32">
                <h2 className="tag rule-bottom block pb-4 text-ceanothus">
                  Why we&rsquo;re local to {area.town}
                </h2>
                <ul>
                  {area.localNotes.map((item) => (
                    <li key={item} className="rule-bottom py-3.5 font-body text-[0.9375rem] leading-snug">
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
            <Reveal className="rule-bottom pb-5">
              <Tag className="text-stone">What we do in {area.town}</Tag>
            </Reveal>
            <ul className="mt-2">
              {services.map((s, index) => (
                <Reveal as="li" key={s.slug} delay={index * 70}>
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

        <section className="section-tight">
          <div className="wrap">
            <Reveal className="rule-bottom pb-5">
              <Tag className="text-stone">Gardens we look after near {area.town}</Tag>
            </Reveal>
            <div className="mt-10 gap-8 sm:columns-2 lg:columns-3">
              {area.gallery.map((img, i) => (
                <figure key={`${img.src}-${i}`} className="group mb-8 break-inside-avoid">
                  <div className="mount">
                    <div className="overflow-hidden">
                      <img
                        src={img.src}
                        srcSet={img.srcSet}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                        width={img.width}
                        height={img.height}
                        alt={`Garden maintained by JW Garden Services near ${area.town}, Buckinghamshire — example ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="plate-img"
                      />
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight bg-chalk-wash">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Tag className="text-stone">Common questions</Tag>
              <h2 className="display-2 mt-6 max-w-[16ch] text-balance">
                Gardening in {area.town}
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <dl className="rule-top">
                {area.faqs.map((f) => (
                  <div key={f.q} className="rule-bottom py-7">
                    <dt className="display-4 max-w-[42ch]">{f.q}</dt>
                    <dd className="mt-3 max-w-measure text-pretty text-stone">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap">
            <Reveal className="rule-bottom pb-5">
              <Tag className="text-stone">We also cover</Tag>
            </Reveal>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link to={`/${a.slug}`} className="link-rule font-display text-xl">
                    {a.town}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactSection />
      </PageLayout>
    </>
  );
};

export default AreaDetail;
