import Seo from '@/components/Seo';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import AreasSection from '@/components/AreasSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Gardeners in Aylesbury | Garden Maintenance & Landscaping"
        description="Trusted gardeners in Aylesbury since 2017. Garden maintenance, landscaping, patios and planting across Bierton, Tring, Wing, Haddenham, Leighton Buzzard and Amersham. Free quotes."
        path="/"
      />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <AreasSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
