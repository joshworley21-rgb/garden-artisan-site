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
      description="Meet Josh Worley, BCA-trained horticulturist based in Bierton, Aylesbury. I look after gardens across Bucks, Beds and Herts—properly, not just a mow and go."
      path="/about"
    />
    <PageLayout
      eyebrow="About"
      title="Trained gardener, not a mow and go"
      intro="I'm Josh. I got into gardening at school, trained at Bicton College, and did an apprenticeship with a landscaping firm before going self-employed in 2017."
    >
      <section className="section-padding bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed measure">
            <p>
              Cutting grass and looking after a garden aren't the same job. Anyone can take the
              top off a hedge. Knowing when it should be cut, and that the roses next to it want
              pruning in late February—that's what you train for. It shows up the following summer,
              in how much everything flowers.
            </p>
            <p>
              I work out of Bierton, so most of the gardens I look after are within ten minutes of
              home. That keeps you honest. You can't do a rushed job on a garden you drive past
              every day.
            </p>
            <p>
              Most people ring because the garden's got away from them a bit. I'll come round, have
              a look, ask how you actually use the space, and send over a written quote with the
              costs broken down. No obligation. If a job needs a proper tree surgeon or a
              landscaper rather than me, I'll say so.
            </p>
            <p>
              I'm City &amp; Guilds Level 2 qualified in horticulture, a member of The Gardeners
              Guild, and we carry £5 million public liability insurance. I can send the
              certificates and risk assessments over whenever you need them.
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
