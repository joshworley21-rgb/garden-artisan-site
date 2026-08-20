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

const sources = [
  { upTo: 700, av1: '/assets/jw-hero-clip-640.webm', h264: '/assets/jw-hero-clip-640.mp4' },
  { upTo: 1100, av1: '/assets/jw-hero-clip-854.webm', h264: '/assets/jw-hero-clip-854.mp4' },
  { upTo: Infinity, av1: '/assets/jw-hero-clip-1440.webm', h264: '/assets/jw-hero-clip-1440.mp4' },
];

const AV1 = 'video/webm; codecs="av01.0.05M.08"';

/** Widest H.264 cut — used for SSR and if a chosen file fails to load. */
export const heroVideoFallback = sources[sources.length - 1].h264;

/**
 * Smallest file the browser can actually play at this size. Chosen in JS rather
 * than with <source media="…"> because browser support for that attribute on
 * video sources is inconsistent, and the video is already loaded from script.
 */
export function pickHeroVideo(): string {
  if (typeof document === 'undefined') return heroVideoFallback;

  // The clip sits behind a dark scrim, so a modest upscale is invisible — and a
  // phone on cellular should not be made to pull the desktop file.
  const width = window.innerWidth * (window.devicePixelRatio > 1.5 ? 1.5 : 1);
  const set = sources.find((s) => width <= s.upTo) ?? sources[sources.length - 1];

  const probe = document.createElement('video');
  return probe.canPlayType(AV1) ? set.av1 : set.h264;
}

