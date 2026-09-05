/**
 * Hero poster and video.
 *
 * Encoded from a 3840x2160 master, cut three ways: 854 for narrow low-DPR
 * phones, 1440 for a standard desktop window, and 1920 for wide or high-DPR
 * (retina) desktops, where a 1440px file was visibly upscaled and soft. AV1
 * where the browser takes it, H.264 everywhere else.
 *
 * The poster is the video's own first frame, so the swap from image to video
 * is invisible.
 *
 * Every filename here is static - unlike the JS/CSS bundle, nothing under
 * public/assets goes through Vite's content-hashing, but .htaccess still
 * caches them for a year as "immutable" (correct for the hashed bundle,
 * wrong for these). Re-encoding one of these files and redeploying under the
 * same name does NOT reach anyone who already loaded the page: their browser
 * keeps serving the byte-identical stale copy from cache for the full year.
 * HERO_ASSET_VERSION is the substitute for a content hash - bump it any time
 * one of these files' bytes change, so the querystring makes it a new URL
 * the cache has never seen.
 */
const HERO_ASSET_VERSION = 'v3';
const v = (path: string) => `${path}?v=${HERO_ASSET_VERSION}`;

export const heroPoster = {
  src: v('/assets/jw-hero-clip-poster-1024.webp'),
  // Five steps rather than three: a 412px phone at DPR 1.75 asks for 721px,
  // which with only a 720/1280 pair jumps to the largest file for one pixel.
  // 1920 covers the same retina-desktop case the 1920 video tier exists for.
  srcSet:
    `${v('/assets/jw-hero-clip-poster-480.webp')} 480w, ${v('/assets/jw-hero-clip-poster-768.webp')} 768w, ` +
    `${v('/assets/jw-hero-clip-poster-1024.webp')} 1024w, ${v('/assets/jw-hero-clip-poster-1440.webp')} 1440w, ` +
    `${v('/assets/jw-hero-clip-poster-1920.webp')} 1920w`,
  width: 1440,
  height: 810,
};

/** Falls back to the committed hero photo if the poster ever fails to load. */
export const heroPosterFallback = {
  src: '/assets/jw-hero-1400.webp',
  srcSet: '/assets/jw-hero-720.webp 720w, /assets/jw-hero-1400.webp 1400w',
  width: 1400,
  height: 659,
};

const portrait = {
  av1: v('/assets/jw-hero-clip-portrait.webm'),
  h264: v('/assets/jw-hero-clip-portrait.mp4'),
};

const landscape = [
  { upTo: 700, av1: v('/assets/jw-hero-clip-854.webm'), h264: v('/assets/jw-hero-clip-854.mp4') },
  { upTo: 1440, av1: v('/assets/jw-hero-clip-1440.webm'), h264: v('/assets/jw-hero-clip-1440.mp4') },
  { upTo: Infinity, av1: v('/assets/jw-hero-clip-1920.webm'), h264: v('/assets/jw-hero-clip-1920.mp4') },
];

/** Poster for an upright phone, cropped to match the portrait clip. */
export const heroPosterPortrait = {
  srcSet:
    `${v('/assets/jw-hero-clip-portrait-456.webp')} 456w, ${v('/assets/jw-hero-clip-portrait-608.webp')} 608w`,
  media: '(orientation: portrait) and (max-width: 700px)',
};

const AV1 = 'video/webm; codecs="av01.0.05M.08"';

/** Widest H.264 cut — used for SSR and if a chosen file fails to load. */
export const heroVideoFallback = landscape[landscape.length - 1].h264;

/**
 * Smallest file the browser can actually play at this size. Chosen in JS rather
 * than with <source media="…"> because browser support for that attribute on
 * video sources is inconsistent, and the video is already loaded from script.
 *
 * Picks by physical pixels (CSS width * devicePixelRatio), not CSS width
 * alone: a retina laptop at 1440 CSS px still needs 2880 physical px, and a
 * tier chosen only from CSS width upscaled visibly on any DPR >= 2 screen -
 * effectively most modern laptops and every phone.
 */
export function pickHeroVideo(): string {
  if (typeof document === 'undefined') return heroVideoFallback;

  const probe = document.createElement('video');
  const pick = (set: { av1: string; h264: string }) =>
    probe.canPlayType(AV1) ? set.av1 : set.h264;

  // Upright and phone-narrow: the portrait crop wins. A tablet is wide enough
  // that the landscape file, cropped, still resolves better than the
  // 810-wide portrait one stretched across it.
  if (window.innerHeight > window.innerWidth && window.innerWidth <= 700) {
    return pick(portrait);
  }

  const dpr = window.devicePixelRatio || 1;
  const physicalWidth = window.innerWidth * dpr;
  const set = landscape.find((s) => physicalWidth <= s.upTo) ?? landscape[landscape.length - 1];
  return pick(set);
}

/**
 * A single poster URL for the <video poster> attribute, chosen the same way
 * as pickHeroVideo. This is deliberately not the responsive <picture> element
 * (no srcset here) — it only has to be close enough that swapping to it from
 * whichever <picture> candidate the browser chose is visually unnoticeable,
 * since the video immediately covers it with real frames.
 */
export function pickHeroPosterSrc(): string {
  if (typeof window === 'undefined') return heroPoster.src;

  if (window.innerHeight > window.innerWidth && window.innerWidth <= 700) {
    return v('/assets/jw-hero-clip-portrait-608.webp');
  }

  const dpr = window.devicePixelRatio || 1;
  const physicalWidth = window.innerWidth * dpr;
  if (physicalWidth <= 768) return v('/assets/jw-hero-clip-poster-768.webp');
  if (physicalWidth <= 1440) return v('/assets/jw-hero-clip-poster-1440.webp');
  return v('/assets/jw-hero-clip-poster-1920.webp');
}

