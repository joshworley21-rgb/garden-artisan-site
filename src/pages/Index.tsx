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
        title="Garden Maintenance & Landscaping | Bucks, Beds & Herts"
        description="Garden maintenance, landscaping and planting across Buckinghamshire, Bedfordshire and Hertfordshire. Based in Aylesbury, trusted since 2017. Free quotes."
        path="/"
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
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
