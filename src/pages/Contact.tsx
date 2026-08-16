import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import ContactSection from '@/components/ContactSection';

const Contact = () => (
  <>
    <Seo
      title="Contact JW Garden Services | Free Garden Quote"
      description="Get a free, no-obligation quote for garden maintenance or landscaping in Aylesbury and surrounding villages. Send an enquiry and we will reply quickly."
      path="/contact"
    />
    <PageLayout
    eyebrow="Get in Touch"
    title="Contact Us"
    intro="Tell us about your garden and we'll get back to you with friendly, practical advice and a clear quote."
  >
    <ContactSection showIntro={false} flushTop />
  </PageLayout>
  </>
);

export default Contact;