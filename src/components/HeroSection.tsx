import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroAsset from '@/assets/jw-hero.jpg.asset.json';

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroAsset.url}
          alt="Beautifully maintained garden in Aylesbury by JW Garden Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      <div className="relative z-10 container-wide text-center px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-semibold leading-tight mb-4 animate-fade-up">
            Transforming gardens with passion and expertise across
          </h1>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-hero-accent tracking-wide mb-8 animate-fade-up animation-delay-200">
            BUCKS, BEDS AND HERTS.
          </p>

          <p className="font-body text-base md:text-lg text-primary-foreground/90 font-medium max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-400">
            At JW Garden Services, we create vibrant landscapes with precision and knowledge. Your
            garden should be a space you love—we make that possible. Let's bring your outdoor vision
            to life! We are your local Gardening experts.
          </p>

          <div className="flex justify-center animate-fade-up animation-delay-600">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/contact">
                Get a Quote
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
