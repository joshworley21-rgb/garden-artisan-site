# JW Garden Services — website

Marketing site for JW Garden Services (garden maintenance, design and hard
landscaping in Aylesbury and the surrounding Buckinghamshire, Bedfordshire and
Hertfordshire villages).

**Live**: https://jw-gardenservices.co.uk/

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
| `npm run build:deploy` | The full publish build: sitemap dates, build, prerender, prune |
| `npm run prerender` | Render every route to static HTML (run after `build`) |
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
scripts/                asset migration, prerendering, sitemap dates, publishing
```

## Design

The site runs on one small design system, "Estate Record", defined in
`src/index.css` (tokens, type scale, plate/label/rule components) and
`tailwind.config.ts` (colour and font names). The short version:

| Piece | What it is |
| --- | --- |
| Ground | `chalk` limestone paper, with `ink` — a near-black bottle green — for the gardening-year, contact and footer bands |
| Accent | `ceanothus` blue, taken from the flowers that recur in the photographs, not from "garden = green" |
| Type | Fraunces for display, Karla for reading, IBM Plex Mono for labels and figures |
| Photographs | Every picture is a `Plate` — a mount with a hairline and a square-cornered image inside it |
| Labels | `Tag` / `.tag` is only ever used to carry a fact: a cadence, a distance, a postcode, a month |
| Motion | `Reveal` fades sections up on scroll; hidden state is gated on the `reveal-on` class so the page still reads without JavaScript |

Section rhythm comes from `.section` / `.section-tight` and the `.wrap`
container — do not add ad-hoc padding to sections. The one call to action is
`src/components/Action.tsx`; `src/components/ui/button.tsx` is only there for
the shadcn components that import `buttonVariants`.

`src/components/GardenYear.tsx` is the home page's centrepiece: a twelve-month
chart of what happens when, with the current month marked on the client so the
prerendered HTML is not stamped with the build month.

## Origins

This project started on the Lovable platform. It no longer depends on it: the
build, the assets and the contact form all run on your own hosting.
`src/assets/*.asset.json` are inert stubs recording where Lovable stored the
original uploads — `scripts/fetch-lovable-assets.mjs` uses them to pull the newer
hero media, which is the only thing not already in `public/assets/`. The hero
falls back to committed media until then, so the site builds and looks right
without it.
