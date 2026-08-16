import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import CredentialsSection from '@/components/CredentialsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AreasSection from '@/components/AreasSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <CredentialsSection />
        <TestimonialsSection />
        <AreasSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
