import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "path";

// The LCP preload has to name the image the hero will actually paint. src/lib/
// hero-media.ts falls back to the committed hero when the newer files Lovable
// kept on its CDN are absent, so point the preload at whichever pair is there.
const heroPreload = (): Plugin => ({
  name: "hero-preload",
  transformIndexHtml(html) {
    const has = (file: string) =>
      fs.existsSync(path.resolve(__dirname, "public/assets", file));
    if (has("jw-hero2-720.webp") && has("jw-hero2-1280.webp")) return html;
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
  plugins: [react(), heroPreload()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
