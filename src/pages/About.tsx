import PageLayout from '@/components/PageLayout';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const About = () => (
  <PageLayout
    eyebrow="Who We Are"
    title="About JW Garden Services"
    intro="A fully qualified horticulturist based in Bierton, Aylesbury, caring for gardens with craftsmanship, honesty and attention to detail."
  >
    <AboutSection />
    <ContactSection />
  </PageLayout>
);

export default About;