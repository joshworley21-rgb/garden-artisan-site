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
src/data/reviews.json   customer reviews (see Reviews below)
marketing/google-ads/    Google Ads campaign definition and import files
src/lib/images.ts       responsive image manifest (points at /assets/…)
public/assets/          all images and video shipped with the site
public/enquiry.php      contact form handler (SMTP → business inbox)
public/.htaccess        SPA fallback, caching and security headers for Apache
scripts/                asset migration, prerendering, sitemap dates, publishing
```

## Reviews

Customer reviews live in `src/data/reviews.json` and drive both the "What Our
Customers Say" section on the home page and the `AggregateRating` / `Review`
schema that produces star ratings in Google results. `src/lib/reviews.ts`
documents the shape of an entry.

Two rules:

- **Only real reviews.** Copy them verbatim from the Google Business Profile or
  FreeIndex. Inventing reviews, or rounding the count up, breaks Google's review
  snippet policy and puts both the rich result and the Business Profile at risk.
- **An empty file publishes nothing.** With no reviews the section does not
  render and no rating markup is emitted, so the site never shows an empty shell
  or a zero-star business.

Set `LEAVE_REVIEW_URL` in `src/lib/reviews.ts` to the direct
`https://search.google.com/local/writereview?placeid=…` link once you have the
Place ID; it currently falls back to a Google search for the business.

## Google Ads

The campaign definition and the CSVs Google Ads Editor imports live in
`marketing/google-ads/` — see the README there for the import steps and the
settings that have to be set by hand. `npm run ads:build` regenerates the CSVs
and fails if any ad copy breaks Google's character limits.

### Conversion tracking

The site reports two conversions to Google Ads — a completed enquiry form and a
tap on a phone number — but **only when it is configured**. With
`VITE_GADS_ID` unset it loads no Google tag, sets no cookies and shows no
consent banner, so the site ships inert. Set these in `.env` and rebuild:

```sh
VITE_GADS_ID="AW-000000000"        # conversion ID
VITE_GADS_FORM_LABEL="..."         # label for the Enquiry form action
VITE_GADS_CALL_LABEL="..."         # label for the Phone click action
```

Vite inlines `VITE_*` at build time, so a change needs `npm run build:deploy`
and a redeploy, not just a restart.

Consent is handled with Google Consent Mode v2: the tag loads with all storage
**denied** and is only granted if the visitor accepts, which is what UK PECR
requires — permission before the cookie, not after. Declining still lets Google
model conversions without storing anything on the device.

### Where a lead came from

`src/lib/attribution.ts` reads the Google click ID and any `utm_*` tags off the
landing URL and sends them with the enquiry, so the email and the CRM record
say which ad produced the lead. A click from a paid ad is labelled
`GOOGLE ADS CLICK` in the enquiry email.

This is held **in memory only** — no cookie, no localStorage. Writing an
identifier to a visitor's device is what needs consent, and gating it behind the
banner would lose the attribution for everyone who declines. The trade-off is
that a full page reload loses it; client-side navigation from the ad landing
page to the contact form keeps it, which is the path that matters.

## Origins

This project started on the Lovable platform. It no longer depends on it: the
build, the assets and the contact form all run on your own hosting.
`src/assets/*.asset.json` are inert stubs recording where Lovable stored the
original uploads — `scripts/fetch-lovable-assets.mjs` uses them to pull the newer
hero media, which is the only thing not already in `public/assets/`. The hero
falls back to committed media until then, so the site builds and looks right
without it.
