import Seo from '@/components/Seo';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import GardenYear from '@/components/GardenYear';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import AreasSection from '@/components/AreasSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <Seo
      title="Gardeners in Aylesbury | Garden Maintenance & Landscaping"
      description="Trusted gardeners in Aylesbury since 2017. Garden maintenance, landscaping, patios and planting across Bucks, Beds and Herts. Free quotes, waste taken away."
      path="/"
    />
    <Header />
    <main id="main" className="flex-1">
      <HeroSection />
      <ServicesSection />
      <GardenYear />
      <AboutSection />
      <GallerySection />
      <AreasSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
