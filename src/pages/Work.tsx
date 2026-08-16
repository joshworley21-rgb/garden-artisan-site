import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';

const Work = () => (
  <>
    <Seo
      title="Garden Projects & Gallery | JW Garden Services"
      description="See gardens we maintain, redesign and build across Buckinghamshire, Bedfordshire and Hertfordshire — planting, patios, fencing and lawn care."
      path="/our-work"
    />
    <PageLayout
    eyebrow="Portfolio"
    title="Our Work"
    intro="A selection of gardens we maintain, redesign and build across Buckinghamshire, Bedfordshire and Hertfordshire."
  >
    <GallerySection />
    <ContactSection />
  </PageLayout>
  </>
);

export default Work;