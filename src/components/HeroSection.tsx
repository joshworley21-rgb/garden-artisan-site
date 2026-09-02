import { useEffect, useRef, useState } from 'react';
import Action from '@/components/Action';
import Tag from '@/components/Tag';
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

/** The four things a new customer actually wants to know, in their own words. */
const record = [
  { label: 'Trained', value: 'Horticulture at BCA, then an apprenticeship' },
  { label: 'Member', value: 'The Gardeners Guild' },
  { label: 'Rounds', value: 'Weekly, March to October' },
  { label: 'Clippings', value: 'Taken away every visit' },
];

const HeroSection = () => {
  const showVideo = useHeroVideo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [poster, setPoster] = useState(heroPoster);
  const [paused, setPaused] = useState(false);
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

  const toggleVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      setPaused(false);
    } else {
      el.pause();
      setPaused(true);
    }
  };

  return (
    <section className="pb-[clamp(2.5rem,5vw,4.5rem)] pt-[clamp(7rem,13vw,11rem)]">
      <div className="wrap">
        <span className="enter block" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          <Tag className="text-stone">Bierton, Aylesbury &middot; Since 2017</Tag>
        </span>

        <div className="mt-8 grid gap-x-12 gap-y-8 lg:mt-12 lg:grid-cols-12 lg:items-end">
          <h1
            className="display-1 enter text-balance lg:col-span-7"
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
          >
            Gardeners in Aylesbury
          </h1>

          <div
            className="enter lg:col-span-5 lg:pb-2"
            style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
          >
            <p className="lead max-w-[38ch] text-pretty text-stone">
              JW Garden Services keeps gardens across Aylesbury, Bierton and the surrounding
              villages looking their best &mdash; from weekly maintenance to a full garden redesign.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Action to="/contact" size="lg">
                Ask about your garden
              </Action>
              <a href="tel:+447950636954" className="link-rule nums font-body text-[0.9375rem]">
                07950 636954
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The film, mounted. No text over the top of it: the photography is the
          argument, and covering it with a headline is what everyone else does. */}
      <div className="wrap mt-10 lg:mt-14">
        <div
          className="mount enter-rise"
          style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-ink sm:aspect-[16/10] md:aspect-auto md:h-[clamp(21rem,54vh,36rem)]">
            <picture>
              {/* Upright phones crop the landscape still to nothing but its
                  middle, so give them a frame cropped to shape instead. */}
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
                alt="A garden near Aylesbury maintained by JW Garden Services"
                fetchPriority="high"
                decoding="async"
                onError={() => setPoster(heroPosterFallback)}
                className="h-full w-full object-cover"
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
                onError={() =>
                  setVideoSrc((current) => (current === heroVideoFallback ? current : heroVideoFallback))
                }
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-estate ${
                  videoReady ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {/* The clip loops for as long as the page is open, so it needs a
                way to stop it. */}
            {showVideo && videoReady && (
              <button
                type="button"
                onClick={toggleVideo}
                className="tag absolute bottom-3 right-3 rounded-full bg-ink/70 px-4 py-2.5 text-chalk backdrop-blur-sm transition-colors duration-300 hover:bg-ink/90"
              >
                {paused ? 'Play' : 'Pause'}
                <span className="sr-only"> the garden film</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* The record bar: the credentials line, set as a ruled table rather than
          a row of badges. */}
      <div className="wrap mt-8 lg:mt-12">
        <dl className="rule-top grid grid-cols-2 gap-x-6 gap-y-7 border-rule pt-8 md:grid-cols-4 md:gap-y-0">
          {record.map((item, i) => (
            <div
              key={item.label}
              className="enter md:border-l md:border-rule md:first:border-l-0 md:pl-6 md:first:pl-0"
              style={{ '--reveal-delay': `${420 + i * 90}ms` } as React.CSSProperties}
            >
              <dt className="tag text-ceanothus">{item.label}</dt>
              <dd className="mt-2.5 max-w-[24ch] font-body text-[0.9375rem] leading-snug text-stone">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;
