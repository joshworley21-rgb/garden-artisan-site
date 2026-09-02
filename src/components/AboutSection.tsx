import { images } from '@/lib/images';

const josh = images['jw-josh3'];
const guildLogo = images['gardeners-guild-logo'];

// The same four credentials the section has always listed, but set as a
// definition list on hairline rules rather than four Lucide glyphs in tinted
// rounded squares — a shield next to "insured" was decoration, not information.
const credentials = [
  { term: 'Fully Qualified Horticulturist', detail: 'City & Guilds certified expertise' },
  { term: 'Professional & Insured', detail: 'Public liability cover, details on request' },
  { term: 'Tailored Solutions', detail: 'Weekly in summer, less often over winter' },
  { term: 'Gardeners Guild Member', detail: 'Qualified, accredited professional' },
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
            <p className="kicker font-body mb-6">About Us</p>
            {/* Same words as before; the second line now separates by tone and weight
                instead of a one-line italic serif in accent green. */}
            <h2 className="font-heading heading-section text-foreground tracking-tight text-balance mb-6">
              Passionate About Helping
              <span className="block font-normal text-muted-foreground">Outdoor Spaces Flourish</span>
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed measure">
              <p>
                Josh trained in horticulture at BCA and finished an apprenticeship before
                starting JW Garden Services in 2017. That training is the difference between
                cutting grass and looking after a garden: prune shrubs and roses in the right
                month and they come back stronger the next summer.
              </p>
              <p>
                We bring our own tools and take every bag of clippings away, so you are not left
                with a green bin you cannot shut. If we spot something worth doing, we will
                mention it. No pressure either way.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
