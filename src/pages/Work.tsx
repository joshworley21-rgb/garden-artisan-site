import PageLayout from '@/components/PageLayout';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';

const Work = () => (
  <PageLayout
    eyebrow="Portfolio"
    title="Our Work"
    intro="A selection of gardens we maintain, redesign and build across Buckinghamshire, Bedfordshire and Hertfordshire."
  >
    <GallerySection />
    <ContactSection />
  </PageLayout>
);

export default Work;