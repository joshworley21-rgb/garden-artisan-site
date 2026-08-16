import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';

const Contact = () => (
  <PageLayout
    eyebrow="Get in Touch"
    title="Contact Us"
    intro="Tell us about your garden and we'll get back to you with friendly, practical advice and a clear quote."
  >
    <ContactSection />
  </PageLayout>
);

export default Contact;