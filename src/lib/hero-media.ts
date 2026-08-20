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
  src: '/assets/jw-hero-clip-poster-1280.webp',
  srcSet: '/assets/jw-hero-clip-poster-720.webp 720w, /assets/jw-hero-clip-poster-1280.webp 1280w',
  width: 1280,
  height: 720,
};

/** Falls back to the committed hero photo if the poster ever fails to load. */
export const heroPosterFallback = {
  src: '/assets/jw-hero-1400.webp',
  srcSet: '/assets/jw-hero-720.webp 720w, /assets/jw-hero-1400.webp 1400w',
  width: 1400,
  height: 659,
};

const sources = {
  small: { av1: '/assets/jw-hero-clip-854.webm', h264: '/assets/jw-hero-clip-854.mp4' },
  large: { av1: '/assets/jw-hero-clip-1440.webm', h264: '/assets/jw-hero-clip-1440.mp4' },
};

const AV1 = 'video/webm; codecs="av01.0.05M.08"';

/**
 * Smallest file the browser can actually play at this size. Chosen in JS rather
 * than with <source media="…"> because browser support for that attribute on
 * video sources is inconsistent, and the video is already loaded from script.
 */
export function pickHeroVideo(): string {
  if (typeof document === 'undefined') return sources.large.h264;

  const cutoff = 900; // CSS px; phones and small tablets take the 854-wide cut
  const width = window.innerWidth * (window.devicePixelRatio > 1.5 ? 1.5 : 1);
  const set = width <= cutoff ? sources.small : sources.large;

  const probe = document.createElement('video');
  return probe.canPlayType(AV1) ? set.av1 : set.h264;
}

export const heroVideoFallback = sources.large.h264;
