/**
 * Hero poster and video.
 *
 * The `jw-hero2` / `jw-hero-video-2` files were uploaded through Lovable and
 * only ever lived on its CDN, so a fresh checkout does not have them. Run
 * `node scripts/fetch-lovable-assets.mjs` to pull them into public/assets.
 *
 * Until then the hero falls back to the earlier media, which is committed —
 * the page is complete either way, it just shows the previous photo and clip.
 */
export const heroPoster = {
  src: '/assets/jw-hero2-1280.webp',
  srcSet: '/assets/jw-hero2-720.webp 720w, /assets/jw-hero2-1280.webp 1280w',
  width: 1280,
  height: 720,
};

export const heroPosterFallback = {
  src: '/assets/jw-hero-1400.webp',
  srcSet: '/assets/jw-hero-720.webp 720w, /assets/jw-hero-1400.webp 1400w',
  width: 1400,
  height: 659,
};

export const heroVideo = '/assets/jw-hero-video-2.mp4';
export const heroVideoFallback = '/assets/jw-hero-video.mp4';
