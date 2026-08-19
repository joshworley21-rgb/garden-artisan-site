# Self-hosting this site

This site was originally built in [Lovable](https://lovable.dev) and served from
`garden-artisan-site.lovable.app`. Everything it needs now lives in this
repository: it is a plain [Vite](https://vitejs.dev) + React app that compiles to
static files, plus one small PHP script for the enquiry form.

Nothing here calls back to Lovable at runtime, so it can be hosted anywhere that
serves static files (Hostinger, any Apache/nginx box, Netlify, Vercel,
Cloudflare Pages, S3 + CloudFront…).

---

## 1. Optional: pull the last Lovable-hosted media

Lovable kept uploaded images and videos on its own CDN rather than in git, leaving
a stub in `src/assets/<name>.asset.json` pointing at a `/__l5e/assets-v1/...` URL
that **only resolves while the site is served by Lovable**.

Everything the site needs is in `public/assets/` except the newer hero media:

| File | Used by |
| --- | --- |
| `jw-hero2-720.webp` | hero poster (mobile) |
| `jw-hero2-1280.webp` | hero poster (desktop) |
| `jw-hero-video-2.mp4` | hero background video |

**The site does not need them to work.** `vite.config.ts` checks at build time
whether they are in `public/assets/` and points the hero — image, video and LCP
preload — at whichever set is there, so the deployed page only ever requests files
that exist. Without them it uses the earlier hero photo and clip, which are
committed; `npm run build` prints a notice and succeeds. (`HeroSection` also has
runtime `onError` fallbacks, covering a file that was present at build time but
missing on the server.)

To use the newer hero, run this from a machine that can reach the Lovable app and
commit what lands in `public/assets/`:

```sh
node scripts/fetch-lovable-assets.mjs
# or, to archive every original Lovable still holds:
node scripts/fetch-lovable-assets.mjs --all
```

After that the `src/assets/*.asset.json` stubs are only a record of what was
stored where — the site does not read them.

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

## 4. How the pages are rendered

The app is client-rendered, so on its own every URL would return the same HTML
shell — and, before this was fixed, the same homepage title and a canonical tag
pointing at the homepage on all 21 URLs. Google runs JavaScript and got there in
the end; Facebook, WhatsApp and LinkedIn never do, so a shared link to a service
or town page showed the homepage's title and no image.

`npm run build:deploy` therefore runs four steps:

1. `scripts/update-sitemap.mjs` — stamps each sitemap URL with a `<lastmod>` taken
   from the last commit touching the file behind that page.
2. `vite build` — the app bundle into `dist/`.
3. `scripts/prerender.mjs` — loads every route in headless Chromium and writes the
   fully rendered HTML to `dist/<route>.html`. It fails the build if any page ends
   up with a missing or duplicated canonical, description, `og:url` or `h1`.
4. `scripts/prune-unused-assets.mjs` — drops the original uploads nothing requests.

`.htaccess` serves those files directly (`RewriteCond %{REQUEST_FILENAME}.html -f`),
so `/gardeners-in-tring` returns its own HTML with no redirect and no wait for
JavaScript. Unknown URLs still fall through to `index.html` and the app's 404 page.

Two things to keep in mind when editing:

- **Never put page-level meta tags in `index.html`.** react-helmet-async appends
  rather than replaces, so anything there (title excepted) shows up as a second,
  wrong tag on every other page. `src/components/Seo.tsx` owns them.
- Prerendering needs a Chromium build. `scripts/prerender.mjs` uses Playwright's
  own browser if installed, otherwise any Chromium under `PLAYWRIGHT_BROWSERS_PATH`
  or `CHROMIUM_EXECUTABLE`. It never downloads one.

## 5. Deploy

### Hostinger (or any Apache / cPanel shared host)

Nothing is built on the server — you build locally and upload the result.

1. **Build**

   ```sh
   npm install
   npm run build
   ```

2. **Upload the *contents* of `dist/`** into `public_html/` (the files, not the
   folder). hPanel → File Manager, or SFTP.

3. **Check `public_html/.htaccess` actually arrived.** It is a dotfile and many
   FTP clients hide it; in hPanel's File Manager turn on "Show hidden files".
   Without it every URL except `/` returns 404 — this is a single-page app and
   Apache has to rewrite unknown paths to `index.html`. Test after uploading:
   open `https://your-domain/our-work` directly (not by clicking a link).

4. **Set up the contact form** — see section 6. Until `enquiry-config.php` exists
   on the server, submissions fall back to PHP `mail()`, which often lands in
   spam or fails silently.

5. **Point the domain and issue SSL**: hPanel → Domains for the A record,
   SSL → install the free certificate, and force HTTPS. The site's canonical
   URLs are all `https://www.jw-gardening.com/`, so serve it on that host and
   redirect the apex (or bare) form to it.

6. **Re-uploading later**: replace everything in `public_html/`, keeping your own
   `enquiry-config.php`. Asset filenames are content-hashed, so stale copies of
   old JS/CSS do no harm, but `index.html` must be the new one — it is served
   `no-cache` by the shipped `.htaccess`.

What is *not* possible on this plan: running the CRM. That one needs a Node
process, so it belongs on a VPS or a platform like Vercel/Netlify, not on shared
PHP hosting.

### Hostinger automatic deployment (hPanel → Advanced → Git)

The `deploy` branch holds the built site at its root — no source, no build step.
Hostinger clones that branch straight into `public_html`, so nothing is compiled
on the server and there is no framework for it to auto-detect.

**One-time setup**: hPanel → Advanced → Git → connect the repository, branch
`deploy`, directory `public_html`, then Deploy. Copy the webhook URL it shows
into the repository's GitHub Settings → Webhooks (push events) and every push to
`deploy` publishes itself.

**Publishing a change**:

```sh
npm run build:deploy          # build, then drop unreferenced originals
node scripts/publish-deploy.mjs   # commit dist/ to the deploy branch and push
```

The deploy branch is generated output — never edit it by hand, and never merge it
into `main`. Its history is intentionally shallow; each publish replaces the tree.

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
`/enquiry.php` or swap the form to a hosted form endpoint (section 6).

### Netlify / Vercel / Cloudflare Pages

Build command `npm run build`, publish directory `dist`. These hosts do not run
PHP, so the enquiry form needs a different backend — see section 6.

## 6. The enquiry form

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

## 7. Supabase

`src/integrations/supabase/client.ts` and `supabase/migrations/` are left over
from when the enquiry form wrote to a Supabase table. **No page imports that
client any more** — the form goes through `enquiry.php` — so the site builds and
runs with the Supabase project switched off or deleted.

Supabase itself is not Lovable: the project (`cxbywsdmxkebecizxtya`) is a normal
Supabase project and can be claimed, kept or dropped independently of the move.
If it is dropped, `.env`, `src/integrations/supabase/*` and `supabase/` can go
with it.

## 8. Domain, DNS and SEO

Canonical URLs, `og:url`, `robots.txt` and `sitemap.xml` all point at
`https://www.jw-gardening.com/`. If the site moves to a different domain, update:

- `index.html` — `<link rel="canonical">`, `og:url`, the JSON-LD `@id`/`url` fields
- `src/components/Seo.tsx`
- `public/robots.txt`, `public/sitemap.xml`

Point the domain's A/CNAME record at the new host and issue a certificate
(Let's Encrypt, or the host's one-click SSL). If the Lovable URL was ever
indexed, keep it redirecting to the new domain for as long as the platform allows.

## 9. What is no longer here

- `lovable-tagger` (dev-only editor instrumentation) — removed from
  `package.json` and `vite.config.ts`.
- `bun.lockb` — deleted; it resolved packages through Lovable's private mirror.
- Runtime calls to Lovable — there were none in the page itself; `index.html`
  carries no Lovable script tag.
- `hero_av1.webm` in the repository root is an orphaned upload: nothing
  references it and it is not inside `public/`, so it never ships. Delete it
  unless you want it as a source file for a future hero encode.
