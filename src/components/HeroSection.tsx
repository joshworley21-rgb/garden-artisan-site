import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
    <section className="relative flex flex-col overflow-hidden min-h-[560px] h-[calc(100svh-var(--header-h))] max-h-[820px]">
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
        {/* Two scrims that overlap only under the text. The old pair washed the
            whole frame (0.20 even at the top), which flattened the planting;
            these clear to transparent away from the lower left so the colour
            comes back, while the corner the copy sits in stays dark enough. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      </div>

      {/* Content.

          Anchored to the lower left rather than centred. The old composition
          (pill badge, centred h1, centred subhead, centred button) is the
          stock landing-page skeleton; sitting the text in one corner lets the
          photograph behind it actually be a photograph. */}
      <div className="relative z-10 w-full mt-auto container-wide pb-14 sm:pb-20 pt-[calc(var(--header-h)+0.5rem)]">
        <div className="max-w-4xl animate-fade-up">
          <p className="font-body text-sm text-primary-foreground/75 mb-5">
            Bierton, Aylesbury &middot; Gardening here since 2017
          </p>

          <h1 className="font-heading heading-hero text-primary-foreground mb-6">
            Gardeners Across Bucks, Beds &amp; Herts
            <span className="heading-hero-sub mt-3 text-primary-foreground/70">Transforming gardens with passion &amp; expertise</span>
          </h1>

          <p className="font-body body-lead text-primary-foreground/80 max-w-2xl mb-8 sm:mb-10">
            JW Garden Services keeps gardens across Aylesbury, Bierton and the surrounding
            villages looking their best, from weekly maintenance to a full garden redesign.
            Let us develop a space you can love, all year round.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
