import { images } from '@/lib/images';

const aboutImage = images['jw-maint-3'];

// The same four credentials the section has always listed, set as a definition
// list on hairline rules rather than four Lucide glyphs in tinted rounded
// squares — a shield next to "insured" was decoration, not information. The
// Guild's own mark stays in the footer, where it appears on every page.
const credentials = [
  { term: 'Fully Qualified Horticulturist', detail: 'City & Guilds certified expertise' },
  { term: 'Professional & Insured', detail: 'Public liability cover, details on request' },
  { term: 'Tailored Solutions', detail: 'Weekly in summer, less often over winter' },
  { term: 'Gardeners Guild Member', detail: 'Qualified, accredited professional' },
];

// Every cell sits on the same rules; odd ones pick up the vertical divider once
// the grid goes to two columns.
const cell = (index: number) =>
  `border-b border-border py-3.5 sm:py-6 ${
    index % 2 === 0 ? 'sm:pr-10' : 'sm:border-l sm:border-border sm:pl-10'
  }`;

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-x-10 lg:gap-x-16 gap-y-8 lg:gap-y-6 items-start">
          {/* Heading first on a phone: the reader should know what the section
              is before they meet the photograph. At lg it moves back to the
              top of the right-hand column. */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <p className="kicker font-body mb-6">About Us</p>
            {/* Keeps the original heading's shape and most of its words. Only the
                two tells go: "Passionate About" as an opener, and "Flourish",
                which sits in the same family as "thriving". */}
            <h2 className="font-heading heading-section text-foreground">
              Helping Outdoor Spaces
              <span className="block font-normal text-muted-foreground">Come Into Their Own</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <img
              src={aboutImage.src}
              srcSet={aboutImage.srcSet}
              sizes="(max-width: 1024px) 90vw, 40vw"
              width={aboutImage.width}
              height={aboutImage.height}
              alt="Wisteria in full flower trained across the front of a brick house"
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg object-cover aspect-[4/3] md:aspect-[16/9] lg:aspect-[3/4] border border-border"
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-2">
            <div className="space-y-4 sm:space-y-5 font-body text-base sm:text-lg text-muted-foreground leading-relaxed measure">
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

            <dl className="mt-8 sm:mt-10 grid sm:grid-cols-2 border-t border-border">
              {credentials.map((credential, index) => (
                <div key={credential.term} className={cell(index)}>
                  <dt className="font-body font-medium text-foreground text-[0.9375rem] sm:text-base">
                    {credential.term}
                  </dt>
                  <dd className="font-body text-[0.8125rem] sm:text-sm text-muted-foreground mt-1 sm:mt-1.5">
                    {credential.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
