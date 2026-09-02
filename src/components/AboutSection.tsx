import { images } from '@/lib/images';

const aboutImage = images['jw-maint-3'];
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
              src={aboutImage.src}
              srcSet={aboutImage.srcSet}
              sizes="(max-width: 1024px) 90vw, 40vw"
              width={aboutImage.width}
              height={aboutImage.height}
              alt="Wisteria in full flower trained across the front of a brick house"
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg object-cover aspect-[3/4] border border-border"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="kicker font-body mb-6">About Us</p>
            {/* Same words as before; the second line now separates by tone and weight
                instead of a one-line italic serif in accent green. */}
            <h2 className="font-heading heading-section text-foreground mb-6">
              Passionate About Helping
              <span className="block font-normal text-muted-foreground">Outdoor Spaces Flourish</span>
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed measure">
              <p>
                Your garden should be somewhere you want to sit and eat outside, not another
                job on the list. We have been looking after gardens around Aylesbury since
                2017, and the horticulture is the part we care about most.
              </p>
              <p>
                Some gardens want a weekly visit and nothing more. Some want redesigning from
                the fence in. Most sit somewhere between the two, and we will tell you straight
                which one yours is.
              </p>
            </div>

            <dl className="mt-10 grid sm:grid-cols-2 border-t border-border">
              {credentials.map((credential, index) => (
                <div
                  key={credential.term}
                  className={`border-b border-border py-5 sm:py-6 ${
                    index % 2 === 0 ? 'sm:pr-10' : 'sm:border-l sm:border-border sm:pl-10'
                  }`}
                >
                  <dt className="font-body font-medium text-foreground">{credential.term}</dt>
                  <dd className="font-body text-sm text-muted-foreground mt-1.5">
                    {credential.detail}
                  </dd>
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
