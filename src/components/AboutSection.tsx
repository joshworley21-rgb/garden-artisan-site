import Action from '@/components/Action';
import Plate from '@/components/Plate';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
import { images } from '@/lib/images';

/** The credentials, as a record rather than a row of icon tiles. */
const record = [
  { term: 'Trained', detail: 'Horticulture at BCA, then an apprenticeship' },
  { term: 'Founded', detail: 'JW Garden Services, 2017' },
  { term: 'Member', detail: 'The Gardeners Guild' },
  { term: 'Insured', detail: 'Public liability, details on request' },
  { term: 'Based', detail: 'Bierton, two miles from Aylesbury town centre' },
];

const AboutSection = () => (
  <section id="about" className="section">
    <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <div className="relative">
          <Plate
            image={images['jw-about-3']}
            alt="Josh Worley weeding a border in a JW Garden Services polo shirt, beside a striped lawn"
            sizes="(max-width: 1024px) 92vw, 36vw"
            aspect="aspect-square"
            className="group"
          />
          {/* A second, smaller plate laid over the first — the only place on
              the site where two things overlap. */}
          <div className="mount absolute -bottom-10 -right-5 hidden w-[52%] shadow-plate md:block">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={images['jw-about-main'].src}
                srcSet={images['jw-about-main'].srcSet}
                sizes="19vw"
                width={images['jw-about-main'].width}
                height={images['jw-about-main'].height}
                alt="Alliums in flower beside a striped lawn, with wisteria on the wall behind"
                loading="lazy"
                decoding="async"
                className="plate-img"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-7 lg:pl-8" delay={120}>
        <Tag className="text-stone">The gardener</Tag>
        <h2 className="display-2 mt-6 max-w-[17ch] text-balance">We are gardeners, not a mow and go</h2>

        <div className="prose-estate mt-8 max-w-measure text-pretty text-stone">
          <p>
            I&rsquo;m Josh. My passion for horticulture started at a young age and has only grown
            stronger. After discovering my love for gardening at school I studied horticulture at
            BCA, then carried on through an apprenticeship, gaining hands-on experience and refining
            my craft.
          </p>
          <p>
            In 2017 I took the leap and founded JW Garden Services. Cutting grass and looking after a
            garden are not the same job &mdash; shrubs and roses get pruned at the right time of
            year, and we bring our own tools and take every bag of clippings away with us.
          </p>
        </div>

        <dl className="rule-top mt-10">
          {record.map((item) => (
            <div key={item.term} className="rule-bottom grid grid-cols-[7rem_1fr] gap-6 py-4 sm:grid-cols-[9rem_1fr]">
              <dt className="tag pt-1 text-ceanothus">{item.term}</dt>
              <dd className="font-body text-[0.9375rem] text-ink">{item.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <Action to="/about" tone="outline">
            More about Josh
          </Action>
        </div>
      </Reveal>
    </div>
  </section>
);

export default AboutSection;
