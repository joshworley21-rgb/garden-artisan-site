import PageLayout from '@/components/PageLayout';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

const Services = () => (
  <PageLayout
    eyebrow="What We Offer"
    title="Our Garden Services"
    intro="Year-round maintenance, bespoke garden design and hard landscaping, plus flexible commercial grounds care across Bucks, Beds and Herts."
  >
    <ServicesSection />
    <ContactSection />
  </PageLayout>
);

export default Services;