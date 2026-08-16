import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';
import about1 from '@/assets/jw-about-1.jpg.asset.json';
import about2 from '@/assets/jw-about-2.jpg.asset.json';
import about3 from '@/assets/jw-about-3.png.asset.json';

const About = () => (
  <>
    <Seo
      title="About Josh | JW Garden Services, Aylesbury"
      description="Meet Josh Worley, BCA-trained horticulturist and founder of JW Garden Services in Bierton, Aylesbury, caring for gardens across Bucks, Beds and Herts."
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
            love for gardening in school, I pursued it professionally by studying horticulture at
            BCA. To further develop my knowledge and skills, I continued my education through an
            apprenticeship, gaining hands-on experience and refining my craft.
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
            src={about1.url}
            alt="Josh working on a garden project"
            loading="lazy"
            className="w-full h-full object-cover rounded-lg shadow-soft"
          />
          <img
            src={about2.url}
            alt="Freshly maintained garden border"
            loading="lazy"
            className="w-full h-full object-cover rounded-lg shadow-soft row-span-2"
          />
          <img
            src={about3.url}
            alt="Completed landscaping project by JW Garden Services"
            loading="lazy"
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