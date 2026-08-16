import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import heroAsset from '@/assets/jw-hero.jpg.asset.json';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroAsset.url}
          alt="Beautiful English garden landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center px-6 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <MapPin className="h-4 w-4 text-hero-accent" />
            <span className="text-primary-foreground/90 text-sm font-body tracking-wide">
              Based in Bierton, Aylesbury • Covering Beds, Bucks & Herts
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-semibold leading-tight mb-6 animate-fade-up animation-delay-200">
            Transforming Gardens
            <span className="block italic font-normal text-hero-accent">with Passion & Expertise</span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-400">
            At JW Garden Services, we create vibrant landscapes with precision and passion. 
            Your garden should be a space you love—we make that possible.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#services">View Our Services</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
