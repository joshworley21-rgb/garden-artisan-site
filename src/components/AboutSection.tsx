import { Link } from 'react-router-dom';
import { images } from '@/lib/images';

const josh = images['jw-josh3'];
const guildLogo = images['gardeners-guild-logo'];

// Plain facts rather than four Lucide icons in tinted rounded squares. A trade
// customer wants to know who turns up and what they trained in; an abstract
// shield glyph next to the word "insured" tells them nothing.
const credentials = [
  { term: 'Trained', detail: 'Horticulture at BCA, then an apprenticeship' },
  { term: 'Qualified', detail: 'City & Guilds certified' },
  { term: 'Trading since', detail: '2017, from Bierton' },
  { term: 'Insured', detail: 'Public liability, details on request' },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Portrait — a real photograph of the person who does the work. */}
          <div className="lg:col-span-5">
            <img
              src={josh.src}
              srcSet={josh.srcSet}
              sizes="(max-width: 1024px) 90vw, 40vw"
              width={josh.width}
              height={josh.height}
              alt="Josh weeding a flower border, in a JW Garden Services polo shirt"
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg object-cover aspect-[3/2] shadow-soft"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="kicker font-body mb-6">Who you get</p>
            <h2 className="font-heading heading-section text-foreground font-semibold tracking-tight text-balance mb-6">
              The gardener you are hiring
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed measure">
              <p>
                I studied horticulture at BCA and did an apprenticeship before starting
                JW Garden Services in 2017. That is the difference between cutting grass
                and looking after a garden — shrubs and roses get pruned at the right time
                of year, so they come back healthier and flower harder the next summer.
              </p>
              <p>
                We bring our own tools and take every bag of clippings away with us. If we
                spot something in the garden worth doing, we will mention it. No pressure
                either way.
              </p>
            </div>

            {/* Credentials as a definition list on hairline rules. */}
            <dl className="mt-10 grid sm:grid-cols-2 gap-x-10">
              {credentials.map((credential) => (
                <div
                  key={credential.term}
                  className="border-t border-border py-4 flex flex-col gap-1"
                >
                  <dt className="font-body text-sm text-muted-foreground">{credential.term}</dt>
                  <dd className="font-body text-foreground">{credential.detail}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="https://thegardenersguild.co.uk/"
                target="_blank"
                rel="noopener"
                aria-label="The Gardeners Guild — professional gardening association"
              >
                <img
                  src={guildLogo.src}
                  alt="The Gardeners Guild logo"
                  width={guildLogo.width}
                  height={guildLogo.height}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto object-contain"
                />
              </a>
              <p className="font-body text-sm text-muted-foreground measure">
                Member of The Gardeners Guild.{' '}
                <Link to="/about" className="text-primary underline underline-offset-4">
                  More about us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
