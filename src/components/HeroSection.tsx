import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import {
  heroPoster,
  heroPosterFallback,
  heroPosterPortrait,
  heroVideoFallback,
  pickHeroVideo,
} from '@/lib/hero-media';

/**
 * The poster paints first (LCP), then the video loads on all screen sizes.
 * Only data-saver, very slow connections and reduced-motion users stay on
 * the lightweight WebP poster.
 */
const useHeroVideo = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    const allowed =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !conn?.saveData &&
      !/^(2g|slow-2g)$/.test(conn?.effectiveType ?? '');

    if (!allowed) return;

    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const start = () => setEnabled(true);
    const id = idle ? idle(start) : window.setTimeout(start, 600);
    return () => {
      if (!idle) window.clearTimeout(id as number);
    };
  }, []);

  return enabled;
};

const HeroSection = () => {
  const showVideo = useHeroVideo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [poster, setPoster] = useState(heroPoster);
  // Resolved on the client: the file depends on screen size and codec support.
  const [videoSrc, setVideoSrc] = useState(pickHeroVideo);

  useEffect(() => {
    if (!showVideo) return;
    const el = videoRef.current;
    if (!el) return;
    const attempt = () => {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    attempt();
    document.addEventListener('touchstart', attempt, { once: true, passive: true });
    return () => document.removeEventListener('touchstart', attempt);
  }, [showVideo]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[560px] h-[calc(100svh-5rem)] max-h-[820px]">
      {/* Background Video with image poster fallback */}
      <div className="absolute inset-0">
        <picture>
          {/* Upright phones crop the landscape still to nothing but its middle,
              so give them a frame cropped to shape instead. */}
          {poster === heroPoster && (
            <source
              media={heroPosterPortrait.media}
              srcSet={heroPosterPortrait.srcSet}
              sizes="100vw"
            />
          )}
          <img
            src={poster.src}
            srcSet={poster.srcSet}
            sizes="100vw"
            width={poster.width}
            height={poster.height}
            alt="Beautiful English garden landscape maintained by JW Garden Services"
            fetchPriority="high"
            decoding="async"
            onError={() => setPoster(heroPosterFallback)}
            className="w-full h-full object-cover"
          />
        </picture>
        {showVideo && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoSrc((current) =>
              current === heroVideoFallback ? current : heroVideoFallback,
            )}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
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
            <span className="block italic font-normal text-hero-accent">Transforming gardens with passion & expertise</span>
          </h1>

          {/* Subheading */}
          <p className="font-body body-lead text-primary-foreground/80 max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-up animation-delay-400">
            JW Garden Services keeps gardens across Aylesbury, Bierton and the surrounding
            villages looking their best — from weekly maintenance to a full garden redesign.
            Let us develop a space you can love, all year round.
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
