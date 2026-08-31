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
      description="Meet Josh Worley, City &amp; Guilds-qualified horticulturist and founder of JW Garden Services in Bierton, Aylesbury, caring for gardens across Bucks and Herts."
      path="/about"
    />
    <PageLayout
    eyebrow="Our story"
    title="Your Garden, Our Passion"
  >
    <section className="section-padding bg-background">
      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
          <p>
            Hi, I&rsquo;m Josh, the founder of JW Garden Services. My passion for horticulture
            started at a young age and has only grown stronger over the years. After discovering my
            love for gardening in school, I pursued it professionally and qualified as a
            City &amp; Guilds horticulturist. To further develop my knowledge and skills, I
            continued my education through an apprenticeship, gaining hands-on experience and
            refining my craft.
          </p>
          <p>
            In 2017, I took the leap and founded JW Garden Services. Since then, the business has
            grown from strength to strength, built on a foundation of expertise, hard work, and a
            genuine love for creating beautiful outdoor spaces. Whether it&rsquo;s routine garden
            maintenance or specialized horticultural services, I take pride in delivering
            high-quality results tailored to each client&rsquo;s unique needs.
          </p>
          <p>
            At JW Garden Services, we believe every garden has the potential to flourish.
            We&rsquo;re here to make that happen with professional care and attention to detail,
            ensuring your outdoor space looks its best all year round.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src={about1.src}
            srcSet={about1.srcSet}
            sizes="(max-width: 1024px) 50vw, 25vw"
            width={about1.width}
            height={about1.height}
            alt="Josh working on a garden project"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-lg shadow-soft"
          />
          <img
            src={about2.src}
            srcSet={about2.srcSet}
            sizes="(max-width: 1024px) 50vw, 25vw"
            width={about2.width}
            height={about2.height}
            alt="Freshly maintained garden border"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-lg shadow-soft row-span-2"
          />
          <img
            src={about3.src}
            srcSet={about3.srcSet}
            sizes="(max-width: 1024px) 50vw, 25vw"
            width={about3.width}
            height={about3.height}
            alt="Completed landscaping project by JW Garden Services"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-lg shadow-soft"
          />
        </div>
      </div>
    </section>
    <ContactSection />
  </PageLayout>
  </>
);

export default About;