/**
 * Hero poster and video.
 *
 * Encoded from a 2560x1440 master, denoised and lightly sharpened, then cut
 * three ways: 854 for narrow low-DPR phones, 1440 for a standard desktop
 * window, and 1920 for wide or high-DPR (retina) desktops, where a 1440px
 * file was visibly upscaled and soft. AV1 where the browser takes it, H.264
 * everywhere else.
 *
 *   desktop 1920  AV1 ~4.6 MB · H.264 ~5.1 MB
 *   desktop 1440  AV1 ~5.0 MB · H.264 ~4.5 MB
 *   phone   854   AV1 ~2.3 MB · H.264 ~1.8 MB
 *
 * The poster is the video's own first frame, so the swap from image to video
 * is invisible.
 */
export const heroPoster = {
  src: '/assets/jw-hero-clip-poster-1024.webp',
  // Five steps rather than three: a 412px phone at DPR 1.75 asks for 721px,
  // which with only a 720/1280 pair jumps to the largest file for one pixel.
  // 1920 covers the same retina-desktop case the 1920 video tier exists for.
  srcSet:
    '/assets/jw-hero-clip-poster-480.webp 480w, /assets/jw-hero-clip-poster-768.webp 768w, ' +
    '/assets/jw-hero-clip-poster-1024.webp 1024w, /assets/jw-hero-clip-poster-1440.webp 1440w, ' +
    '/assets/jw-hero-clip-poster-1920.webp 1920w',
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
  av1: '/assets/jw-hero-clip-portrait.webm',
  h264: '/assets/jw-hero-clip-portrait.mp4',
};

const landscape = [
  { upTo: 700, av1: '/assets/jw-hero-clip-854.webm', h264: '/assets/jw-hero-clip-854.mp4' },
  { upTo: 1440, av1: '/assets/jw-hero-clip-1440.webm', h264: '/assets/jw-hero-clip-1440.mp4' },
  { upTo: Infinity, av1: '/assets/jw-hero-clip-1920.webm', h264: '/assets/jw-hero-clip-1920.mp4' },
];

/** Poster for an upright phone, cropped to match the portrait clip. */
export const heroPosterPortrait = {
  srcSet:
    '/assets/jw-hero-clip-portrait-456.webp 456w, /assets/jw-hero-clip-portrait-608.webp 608w',
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

