/**
 * Hero poster and video.
 *
 * The `jw-hero2` / `jw-hero-video-2` files were uploaded through Lovable and only
 * ever lived on its CDN, so a fresh checkout does not have them. Run
 * `node scripts/fetch-lovable-assets.mjs` to pull them into public/assets.
 *
 * Which pair the page asks for is decided at build time by vite.config.ts, so a
 * build without them never requests them. The earlier hero, which is committed,
 * stands in — the page is complete either way, it just shows the previous photo
 * and clip. The `onError` fallbacks in HeroSection cover the remaining case of a
 * file that is present at build time but missing on the server.
 */
declare const __HAS_HERO_POSTER_2__: boolean;
declare const __HAS_HERO_VIDEO_2__: boolean;

const poster2 = {
  src: '/assets/jw-hero2-1280.webp',
  srcSet: '/assets/jw-hero2-720.webp 720w, /assets/jw-hero2-1280.webp 1280w',
  width: 1280,
  height: 720,
};

const poster1 = {
  src: '/assets/jw-hero-1400.webp',
  srcSet: '/assets/jw-hero-720.webp 720w, /assets/jw-hero-1400.webp 1400w',
  width: 1400,
  height: 659,
};

export const heroPoster = __HAS_HERO_POSTER_2__ ? poster2 : poster1;
export const heroPosterFallback = poster1;

export const heroVideo = __HAS_HERO_VIDEO_2__ ? '/assets/jw-hero-video-2.mp4' : '/assets/jw-hero-video.mp4';
export const heroVideoFallback = '/assets/jw-hero-video.mp4';
