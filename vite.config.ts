import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "path";

// The hero media Lovable kept on its CDN is not in the repository. Decide at
// build time whether it is here: the page then asks only for files that exist,
// rather than requesting the newer hero, taking a 404 and falling back in the
// browser. src/lib/hero-media.ts reads these flags; the runtime fallback stays
// as a safety net.
const has = (file: string) => fs.existsSync(path.resolve(__dirname, "public/assets", file));
const hasHeroPoster2 = has("jw-hero2-720.webp") && has("jw-hero2-1280.webp");
const hasHeroVideo2 = has("jw-hero-video-2.mp4");

// The LCP preload has to name the image the hero will actually paint.
const heroPreload = (): Plugin => ({
  name: "hero-preload",
  transformIndexHtml(html) {
    if (hasHeroPoster2) return html;
    return html
      .replace('href="/assets/jw-hero2-720.webp"', 'href="/assets/jw-hero-720.webp"')
      .replace(
        'imagesrcset="/assets/jw-hero2-720.webp 720w, /assets/jw-hero2-1280.webp 1280w"',
        'imagesrcset="/assets/jw-hero-720.webp 720w, /assets/jw-hero-1400.webp 1400w"',
      );
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  build: {
    // esbuild can't down-transform destructuring to the older browserlist
    // baseline; es2022 is supported by all modern browsers and needs no
    // destructuring transform.
    target: "es2022",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
  define: {
    __HAS_HERO_POSTER_2__: JSON.stringify(hasHeroPoster2),
    __HAS_HERO_VIDEO_2__: JSON.stringify(hasHeroVideo2),
  },
  plugins: [react(), heroPreload()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
