import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import heroAsset from '@/assets/jw-hero.jpg.asset.json';
import heroVideo from '@/assets/jw-hero-video.mp4.asset.json';

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[560px] h-[calc(100svh-5rem)] max-h-[820px]">
      {/* Background Video with image poster fallback */}
      <div className="absolute inset-0">
        <img
          src={heroAsset.url}
          alt="Beautiful English garden landscape"
          className="w-full h-full object-cover"
        />
        <video
          src={heroVideo.url}
          poster={heroAsset.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <MapPin className="h-4 w-4 text-hero-accent" />
            <span className="text-primary-foreground/90 text-sm font-body tracking-wide">
              Based in Bierton, Aylesbury • Covering Beds, Bucks & Herts
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading heading-hero text-primary-foreground font-semibold mb-6 animate-fade-up animation-delay-200">
            Transforming Gardens
            <span className="block italic font-normal text-hero-accent">with Passion & Expertise</span>
          </h1>

          {/* Subheading */}
          <p className="font-body body-lead text-primary-foreground/80 max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-up animation-delay-400">
            At JW Garden Services, we create vibrant landscapes with precision and passion. 
            Your garden should be a space you love—we make that possible.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
