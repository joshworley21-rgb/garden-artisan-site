# Self-hosting this site

This site was originally built in [Lovable](https://lovable.dev) and served from
`garden-artisan-site.lovable.app`. Everything it needs now lives in this
repository: it is a plain [Vite](https://vitejs.dev) + React app that compiles to
static files, plus one small PHP script for the enquiry form.

Nothing here calls back to Lovable at runtime, so it can be hosted anywhere that
serves static files (Hostinger, any Apache/nginx box, Netlify, Vercel,
Cloudflare Pages, S3 + CloudFront…).

---

## 1. One-time migration step: pull the remaining Lovable-hosted media

Lovable kept uploaded images and videos on its own CDN rather than in git. Each
one left a stub behind in `src/assets/<name>.asset.json` pointing at a
`/__l5e/assets-v1/...` URL that **only resolves while the site is served by
Lovable**.

Most of the site was already migrated — `public/assets/` holds the real files and
the code references them by path. Three hero files are the exception:

| File | Used by |
| --- | --- |
| `jw-hero2-720.webp` | hero poster (mobile), LCP preload in `index.html` |
| `jw-hero2-1280.webp` | hero poster (desktop) |
| `jw-hero-video-2.mp4` | hero background video |

Fetch them once, from a machine that can reach the Lovable app:

```sh
node scripts/fetch-lovable-assets.mjs
# or, to also archive every other original Lovable still holds:
node scripts/fetch-lovable-assets.mjs --all
```

Then commit what lands in `public/assets/`. After that the `src/assets/*.asset.json`
stubs are only a record of what was stored where — the site no longer reads them.

`npm run build` refuses to run until those files are present (`npm run check:assets`
does the same check on its own), so a broken hero can't reach production by accident.

**If the Lovable project is already gone** and the files are unrecoverable, point
the hero at the older images that are already in this repo — edit
`src/components/HeroSection.tsx` and `index.html` to use `jw-hero-720.webp` /
`jw-hero-1400.webp` / `jw-hero-video.mp4`.

## 2. Dependencies must come from the public npm registry

Lovable built this project inside a sandbox that proxied npm through its own
mirror, and that leaked into the lockfiles: 197 of the entries in the old
`package-lock.json` — including `vite` itself — resolved to
`https://europe-west1-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache/…`, which
answers **403** to anyone outside Lovable. `npm ci` therefore failed on any other
machine.

`package-lock.json` has been regenerated against `https://registry.npmjs.org`
(465 packages, no mirror URLs left) and the stale `bun.lockb`, which pointed at
the same mirror, has been deleted. `npm install` / `npm ci` now work anywhere. If
you prefer bun, run `bun install` once to generate a fresh `bun.lock` from the
public registry.

Two dependency notes while you are in there:

- `lovable-tagger` (Lovable's editor instrumentation, dev-only) has been removed
  from `package.json` and `vite.config.ts`.
- The `brace-expansion` override now pins the patched `^2.1.4` instead of `^5`.
  Version 5 dropped the CommonJS default export that `minimatch@3` (pulled in by
  ESLint) calls, so `npm run lint` crashed outright; 2.1.4 carries the same ReDoS
  fix with the old API.

## 3. Build

```sh
npm install
npm run build     # runs the asset check, then writes dist/
npm run preview   # serve dist/ locally on http://localhost:4173
```

`dist/` is the whole site: hashed JS/CSS, everything from `public/` (images,
`enquiry.php`, `.htaccess`, `robots.txt`, `sitemap.xml`, `favicon.png`).

Environment variables are read at **build time** (Vite inlines anything prefixed
`VITE_`), not at runtime — see `.env` / `.env.example`. Rebuild after changing them.

## 4. Deploy

### Apache / cPanel shared hosting (Hostinger — current target)

1. `npm run build`
2. Upload the **contents** of `dist/` into `public_html/` (not the folder itself).
3. Confirm `public_html/.htaccess` arrived — it is a dotfile and some FTP clients
   hide it. Without it, every URL except `/` returns 404, because this is a
   single-page app and Apache has to rewrite unknown paths to `index.html`.
4. Set up the enquiry form (section 5).

### nginx / VPS

Serve `dist/` and add the same SPA fallback:

```nginx
server {
    listen 443 ssl;
    server_name www.jw-gardening.com;
    root /var/www/jw-gardening/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|webp|jpe?g|png|svg|mp4|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /index.html {
        add_header Cache-Control "no-cache, must-revalidate";
    }
}
```

PHP is only needed for the enquiry form; on nginx you either run php-fpm for
`/enquiry.php` or swap the form to a hosted form endpoint (section 5).

### Netlify / Vercel / Cloudflare Pages

Build command `npm run build`, publish directory `dist`. These hosts do not run
PHP, so the enquiry form needs a different backend — see section 5.

## 5. The enquiry form

`src/components/ContactSection.tsx` POSTs JSON to `/enquiry.php`. That script
(`public/enquiry.php`) validates the fields and emails them to the business
address, over authenticated SMTP when configured and via PHP `mail()` otherwise.

On the live host:

1. Create a real mailbox on the domain (e.g. `website@jw-gardening.com`).
2. Copy `public/enquiry-config.sample.php` to `enquiry-config.php` **next to
   `enquiry.php` on the server** and fill in the SMTP host, user and password.
   Do not commit the filled-in file — it holds a password.
3. Make sure DNS has SPF, DKIM and DMARC records for the domain, or enquiries
   land in spam.

Without a PHP host, replace the `fetch('/enquiry.php', …)` call with a hosted
form endpoint (Formspree, Netlify Forms, Web3Forms) or with the CRM's
`/api/public/enquiry` endpoint, which writes the enquiry straight into the CRM
database.

## 6. Supabase

`src/integrations/supabase/client.ts` and `supabase/migrations/` are left over
from when the enquiry form wrote to a Supabase table. **No page imports that
client any more** — the form goes through `enquiry.php` — so the site builds and
runs with the Supabase project switched off or deleted.

Supabase itself is not Lovable: the project (`cxbywsdmxkebecizxtya`) is a normal
Supabase project and can be claimed, kept or dropped independently of the move.
If it is dropped, `.env`, `src/integrations/supabase/*` and `supabase/` can go
with it.

## 7. Domain, DNS and SEO

Canonical URLs, `og:url`, `robots.txt` and `sitemap.xml` all point at
`https://www.jw-gardening.com/`. If the site moves to a different domain, update:

- `index.html` — `<link rel="canonical">`, `og:url`, the JSON-LD `@id`/`url` fields
- `src/components/Seo.tsx`
- `public/robots.txt`, `public/sitemap.xml`

Point the domain's A/CNAME record at the new host and issue a certificate
(Let's Encrypt, or the host's one-click SSL). If the Lovable URL was ever
indexed, keep it redirecting to the new domain for as long as the platform allows.

## 8. What is no longer here

- `lovable-tagger` (dev-only editor instrumentation) — removed from
  `package.json` and `vite.config.ts`.
- `bun.lockb` — deleted; it resolved packages through Lovable's private mirror.
- Runtime calls to Lovable — there were none in the page itself; `index.html`
  carries no Lovable script tag.
- `hero_av1.webm` in the repository root is an orphaned upload: nothing
  references it and it is not inside `public/`, so it never ships. Delete it
  unless you want it as a source file for a future hero encode.
