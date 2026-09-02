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
.claude/skills/         design skills Claude Code loads for UI work (see below)
```

## Design skills

`.claude/skills/` holds two sets of design skills Claude Code picks up
automatically when it works on the interface.

**[frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)**
(Anthropic, Apache 2.0) is the art-direction half: a single `SKILL.md` on
brief-first visual decisions, typography pairing, restraint and self-critique,
and interface copy. It has no data or scripts — it shapes how the design gets
chosen before any of it gets written.

**[UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)**
(MIT) is the reference half: a local design-intelligence database of UI styles,
product colour palettes, font pairings, chart types, accessibility and UX
rules, and per-stack guidance for React, Tailwind and shadcn/ui. It is plain
CSV and Markdown searched by Python scripts — no network calls, no API keys,
and nothing that ships in the site build.

Query it directly with Python 3:

```sh
# Full design system for a brief
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "garden maintenance local service" \
  --design-system -p "JW Garden Services"

# One domain: product, style, color, typography, landing, chart, ux, icons,
# react, web, google-fonts, gsap
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hero section" --domain ux

# Stack-specific guidance
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
```

UI/UX Pro Max was installed with `npx ui-ux-pro-max-cli init --ai claude`;
re-run it with `--force` to update. Its sibling skills (`brand`, `design`,
`design-system`, `banner-design`, `slides`, `ui-styling`) come with it and
cover brand kits, logos and marketing collateral. `frontend-design` is a copy
of that folder from `anthropics/skills` — update it by copying the folder
again.

## Origins

This project started on the Lovable platform. It no longer depends on it: the
build, the assets and the contact form all run on your own hosting.
`src/assets/*.asset.json` are inert stubs recording where Lovable stored the
original uploads — `scripts/fetch-lovable-assets.mjs` uses them to pull the newer
hero media, which is the only thing not already in `public/assets/`. The hero
falls back to committed media until then, so the site builds and looks right
without it.
