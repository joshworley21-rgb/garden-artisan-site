/**
 * Hero poster and video.
 *
 * Encoded from a 1080p source, denoised and lightly sharpened, then cut two
 * ways: 1440 wide for desktops (1:1 on a common laptop, and far past the old
 * 720p on anything bigger) and 854 for phones, where the data actually costs
 * something. AV1 where the browser takes it, H.264 everywhere else.
 *
 *   desktop  AV1 4.8 MB · H.264 5.4 MB
 *   phone    AV1 2.2 MB · H.264 2.2 MB
 *
 * The poster is the video's own first frame, so the swap from image to video
 * is invisible.
 */
export const heroPoster = {
  src: '/assets/jw-hero-clip-poster-1024.webp',
  // Four steps rather than two: a 412px phone at DPR 1.75 asks for 721px, which
  // with only a 720/1280 pair jumps to the largest file for one pixel.
  srcSet:
    '/assets/jw-hero-clip-poster-480.webp 480w, /assets/jw-hero-clip-poster-768.webp 768w, ' +
    '/assets/jw-hero-clip-poster-1024.webp 1024w, /assets/jw-hero-clip-poster-1440.webp 1440w',
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
  { upTo: Infinity, av1: '/assets/jw-hero-clip-1440.webm', h264: '/assets/jw-hero-clip-1440.mp4' },
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
 */
export function pickHeroVideo(): string {
  if (typeof document === 'undefined') return heroVideoFallback;

  const probe = document.createElement('video');
  const pick = (set: { av1: string; h264: string }) =>
    probe.canPlayType(AV1) ? set.av1 : set.h264;

  // Upright and phone-narrow: the portrait crop wins. A tablet is wide enough
  // that the landscape file, cropped, still resolves better than the 608-wide
  // portrait one stretched across it.
  if (window.innerHeight > window.innerWidth && window.innerWidth <= 700) {
    return pick(portrait);
  }

  const set = landscape.find((s) => window.innerWidth <= s.upTo) ?? landscape[landscape.length - 1];
  return pick(set);
}

