import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';
import { images } from '@/lib/images';

const about1 = images['jw-about-1'];
const about2 = images['jw-about-2'];
const about3 = images['jw-about-3'];

const About = () => (
  <>
    <Seo
      title="About Josh | JW Garden Services, Aylesbury"
      description="Meet Josh Worley, BCA-trained horticulturist and founder of JW Garden Services in Bierton, Aylesbury, caring for gardens across Bucks, Beds and Herts."
      path="/about"
    />
    <PageLayout
      eyebrow="About"
      title="A trained gardener, not a mow and go"
      intro="I'm Josh. I got into gardening at school, studied horticulture at BCA, and did an apprenticeship before starting JW Garden Services in 2017."
    >
      <section className="section-padding bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed measure">
            <p>
              Cutting grass and looking after a garden are not the same job. Anyone can take the
              top off a hedge. Knowing when it should be cut, and that the roses next to it want
              pruning at a different point in the year, is the part you train for. It shows up the
              following summer, in how much everything flowers.
            </p>
            <p>
              I work out of Bierton, so most of the gardens I look after are ones I drive past
              anyway. That keeps you honest. A garden ten minutes from your own front door is not
              one you can do a rushed job on and forget about.
            </p>
            <p>
              Most people ring because the garden has got away from them a bit. I come and look,
              ask how you actually use the space, and send a written quote with the costs broken
              down. No obligation. If a job wants a proper tree surgeon rather than me, I will say
              so.
            </p>
            <p>
              I am City &amp; Guilds qualified, a member of The Gardeners Guild, and we carry
              public liability insurance. I can send the details and risk assessments over
              whenever you need them.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src={about1.src}
              srcSet={about1.srcSet}
              sizes="(max-width: 1024px) 50vw, 25vw"
              width={about1.width}
              height={about1.height}
              alt="Stone terrace edged with lavender and clipped domes, looking out over open countryside"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-lg border border-border"
            />
            <img
              src={about2.src}
              srcSet={about2.srcSet}
              sizes="(max-width: 1024px) 50vw, 25vw"
              width={about2.width}
              height={about2.height}
              alt="Deep mixed border of salvias, lupins and irises in front of a red smoke bush"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-lg border border-border row-span-2"
            />
            <img
              src={about3.src}
              srcSet={about3.srcSet}
              sizes="(max-width: 1024px) 50vw, 25vw"
              width={about3.width}
              height={about3.height}
              alt="Josh weeding a flower border by hand beside a striped lawn"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-lg border border-border"
            />
          </div>
        </div>
      </section>
      <ContactSection />
    </PageLayout>
  </>
);

export default About;
