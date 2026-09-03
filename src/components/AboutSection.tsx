import { Award, Leaf, Shield, Users } from 'lucide-react';
import { images } from '@/lib/images';

const aboutImage = images['jw-maint-3'];

// The four credentials, each with the mark it has always carried. The glyphs
// sit in tinted squares at the site's own 2px radius rather than the rounded
// ones they had before, and the rules underneath stay. The Guild's photographic
// mark is separate — it lives in the footer, on every page.
const credentials = [
  { icon: Award, term: 'Fully Qualified Horticulturist', detail: 'City & Guilds certified expertise' },
  { icon: Shield, term: 'Professional & Insured', detail: 'Public liability cover, details on request' },
  { icon: Leaf, term: 'Tailored Solutions', detail: 'Weekly in summer, less often over winter' },
  { icon: Users, term: 'Gardeners Guild Member', detail: 'Qualified, accredited professional' },
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
                Some gardens want a regular weekly visit and nothing more. Some want
                redesigning from the ground up. Most sit somewhere between the two, and we
                will happily offer our advice as needed to make your garden come to life!
              </p>
            </div>

            <dl className="mt-8 sm:mt-10 grid sm:grid-cols-2 border-t border-border">
              {credentials.map((credential, index) => (
                <div key={credential.term} className={cell(index)}>
                  <dt className="font-body font-medium text-foreground text-[0.9375rem] sm:text-base">
                    <span className="mb-3 sm:mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-secondary">
                      <credential.icon
                        className="h-5 w-5 text-primary"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
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
