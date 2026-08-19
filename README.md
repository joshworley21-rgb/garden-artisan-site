# JW Garden Services — website

Marketing site for JW Garden Services (garden maintenance, design and hard
landscaping in Aylesbury and the surrounding Buckinghamshire, Bedfordshire and
Hertfordshire villages).

**Live**: https://www.jw-gardening.com/

Built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui. It compiles to
static files plus one PHP script for the enquiry form, and is self-hosted — see
**[docs/SELF-HOSTING.md](docs/SELF-HOSTING.md)** for the build, deploy, mail and
DNS steps.

## Development

Requires Node.js 20+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
and the public npm registry — the old Lovable lockfiles pointed at a private
mirror, see [docs/SELF-HOSTING.md](docs/SELF-HOSTING.md) §2.

```sh
npm install
npm run dev        # http://localhost:8080
```

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` (checks assets first) |
| `npm run preview` | Serve the production build locally |
| `npm run check:assets` | Verify every referenced image/video exists in `public/assets` |
| `node scripts/fetch-lovable-assets.mjs` | One-off: pull the hero media Lovable kept on its CDN |
| `npm run lint` | ESLint |
| `npm test` | Vitest |

## Layout

```
index.html              page shell, meta tags, JSON-LD business schema
src/pages/              routed pages (home, about, work, contact, services, areas)
src/components/         sections and shared UI (src/components/ui = shadcn)
src/lib/images.ts       responsive image manifest (points at /assets/…)
public/assets/          all images and video shipped with the site
public/enquiry.php      contact form handler (SMTP → business inbox)
public/.htaccess        SPA fallback, caching and security headers for Apache
scripts/                asset migration + build-time asset check
```

## Origins

This project started on the Lovable platform. It no longer depends on it: the
build, the assets and the contact form all run on your own hosting.
`src/assets/*.asset.json` are inert stubs recording where Lovable stored the
original uploads — `scripts/fetch-lovable-assets.mjs` uses them to pull the newer
hero media, which is the only thing not already in `public/assets/`. The hero
falls back to committed media until then, so the site builds and looks right
without it.
