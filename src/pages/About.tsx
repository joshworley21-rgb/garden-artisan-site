import PageLayout from '@/components/PageLayout';
import CtaSection from '@/components/CtaSection';
import josh1 from '@/assets/jw-josh1.jpg.asset.json';
import josh2 from '@/assets/jw-josh2.jpg.asset.json';
import josh3 from '@/assets/jw-josh3.jpg.asset.json';

const About = () => (
  <PageLayout eyebrow="Our story" title="Your Garden, Our Passion">
    <section className="section-padding bg-background">
      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
          <p>
            Hi, I&rsquo;m Josh, the founder of JW Garden Services. My passion for horticulture started
            at a young age and has only grown stronger over the years. After discovering my love for
            gardening in school, I pursued it professionally by studying horticulture at BCA. To
            further develop my knowledge and skills, I continued my education through an
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
            At JW Garden Services, we believe every garden has the potential to flourish. We&rsquo;re
            here to make that happen with professional care and attention to detail, ensuring your
            outdoor space looks its best all year round.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src={josh1.url}
            alt="Josh working on a garden project"
            className="w-full h-full object-cover rounded-lg shadow-soft"
          />
          <img
            src={josh2.url}
            alt="Freshly maintained garden border"
            className="w-full h-full object-cover rounded-lg shadow-soft row-span-2"
          />
          <img
            src={josh3.url}
            alt="Completed landscaping project"
            className="w-full h-full object-cover rounded-lg shadow-soft"
          />
        </div>
      </div>
    </section>
    <CtaSection />
  </PageLayout>
);

export default About;
