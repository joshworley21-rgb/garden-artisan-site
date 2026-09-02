import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';
import Plate from '@/components/Plate';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
import { images } from '@/lib/images';

const record = [
  { term: 'Trained', detail: 'Horticulture at BCA, then an apprenticeship' },
  { term: 'Founded', detail: 'JW Garden Services, 2017' },
  { term: 'Member', detail: 'The Gardeners Guild' },
  { term: 'Insured', detail: 'Public liability, details and risk assessments on request' },
  { term: 'Based', detail: 'Bierton, two miles from Aylesbury town centre' },
  { term: 'Round', detail: 'Up to 25 miles — Bucks, Beds and Herts' },
];

const strip = [
  {
    image: images['jw-about-main'],
    alt: 'Alliums in flower beside a striped lawn, with wisteria on the wall behind',
  },
  {
    image: images['jw-about-2'],
    alt: 'A border of salvia, lupins and iris in front of a red-leaved smoke bush',
  },
  {
    image: images['jw-about-1'],
    alt: 'Clipped bay domes and lavender beside an old stone terrace, with countryside beyond',
  },
];

const About = () => (
  <>
    <Seo
      title="About Josh | JW Garden Services, Aylesbury"
      description="Meet Josh Worley, BCA-trained horticulturist and founder of JW Garden Services in Bierton, Aylesbury, caring for gardens across Bucks, Beds and Herts."
      path="/about"
    />
    <PageLayout
      eyebrow="The gardener"
      title="Josh Worley"
      intro="Trained in horticulture at BCA, working on gardens around Aylesbury since 2017."
    >
      <section className="section-tight">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="prose-estate max-w-measure text-pretty text-[1.0625rem] text-stone">
              <p>
                Hi, I&rsquo;m Josh, the founder of JW Garden Services. My passion for horticulture
                started at a young age and has only grown stronger over the years. After discovering
                my love for gardening in school, I pursued it professionally by studying horticulture
                at BCA. To further develop my knowledge and skills, I continued my education through
                an apprenticeship, gaining hands-on experience and refining my craft.
              </p>
              <p>
                In 2017, I took the leap and founded JW Garden Services. Since then, the business has
                grown from strength to strength, built on a foundation of expertise, hard work, and a
                genuine love for creating beautiful outdoor spaces. Whether it&rsquo;s routine garden
                maintenance or specialised horticultural services, I take pride in delivering
                high-quality results tailored to each client&rsquo;s unique needs.
              </p>
              <p>
                At JW Garden Services, we believe every garden has the potential to flourish.
                We&rsquo;re here to make that happen with professional care and attention to detail,
                ensuring your outdoor space looks its best all year round.
              </p>
            </div>

            <dl className="rule-top mt-12">
              {record.map((item) => (
                <div
                  key={item.term}
                  className="rule-bottom grid grid-cols-[7rem_1fr] gap-6 py-4 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="tag pt-1 text-ceanothus">{item.term}</dt>
                  <dd className="font-body text-[0.9375rem]">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="lg:sticky lg:top-32">
              <Plate
                image={images['jw-about-3']}
                alt="Josh Worley weeding a border in a JW Garden Services polo shirt, beside a striped lawn"
                sizes="(max-width: 1024px) 92vw, 36vw"
                aspect="aspect-square"
                className="group"
              />
              <p className="tag mt-4 block text-stone">Bierton, Aylesbury</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-chalk-wash">
        <div className="wrap">
          <Reveal className="rule-bottom pb-5">
            <Tag className="text-stone">On the job</Tag>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {strip.map((item, index) => (
              <Reveal key={item.image.src} delay={index * 100}>
                <figure className="group">
                  <Plate
                    image={item.image}
                    alt={item.alt}
                    sizes="(max-width: 640px) 92vw, 30vw"
                    aspect="aspect-[4/5]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </PageLayout>
  </>
);

export default About;
