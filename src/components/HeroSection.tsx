import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { images } from '@/lib/images';
const heroVideo = { url: '/assets/jw-hero-video.mp4' };

const hero = images['jw-hero'];

/**
 * Mobile-first: phones and data-saving / slow connections never download the
 * 5.5 MB hero video — they get the lightweight WebP poster only. Larger screens
 * load the video after first paint so it never competes with the LCP image.
 */
const useHeroVideo = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    const allowed =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !conn?.saveData &&
      !/2g|slow-2g|3g/.test(conn?.effectiveType ?? '');

    if (!allowed) return;

    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const start = () => setEnabled(true);
    const id = idle ? idle(start) : window.setTimeout(start, 1200);
    return () => {
      if (!idle) window.clearTimeout(id as number);
    };
  }, []);

  return enabled;
};

const HeroSection = () => {
  const showVideo = useHeroVideo();

  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[560px] h-[calc(100svh-5rem)] max-h-[820px]">
      {/* Background Video with image poster fallback */}
      <div className="absolute inset-0">
        <img
          src={hero.src}
          srcSet={hero.srcSet}
          sizes="100vw"
          width={hero.width}
          height={hero.height}
          alt="Beautiful English garden landscape maintained by JW Garden Services"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        {showVideo && (
          <video
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-3 py-2 sm:px-4 mb-6 sm:mb-8 animate-fade-up">
            <MapPin className="h-4 w-4 shrink-0 text-hero-accent" />
            <span className="text-primary-foreground/90 text-xs sm:text-sm font-body tracking-wide">
              Based in Bierton, Aylesbury • Covering Beds, Bucks & Herts
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading heading-hero text-primary-foreground font-semibold mb-6 animate-fade-up animation-delay-200">
            Gardeners in Aylesbury
            <span className="block italic font-normal text-hero-accent">Transforming gardens with passion &amp; expertise</span>
          </h1>

          {/* Subheading */}
          <p className="font-body body-lead text-primary-foreground/80 max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-up animation-delay-400">
            JW Garden Services provides garden maintenance, landscaping and planting across
            Aylesbury, Bierton and the surrounding villages. Your garden should be a space you
            love — we make that possible.
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
