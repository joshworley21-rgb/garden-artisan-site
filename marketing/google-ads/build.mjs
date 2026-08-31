/**
 * Validates campaign-plan.mjs against Google's limits and writes the CSVs that
 * Google Ads Editor imports.
 *
 *   node marketing/google-ads/build.mjs        (or: npm run ads:build)
 *
 * Exits non-zero on any violation, so a headline that is one character too long
 * is caught here rather than by a rejected import.
 */

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  SITE,
  campaigns,
  negativeKeywords,
  assets,
} from './campaign-plan.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..');

/** Google's published limits for responsive search ads and assets. */
const LIMITS = {
  headline: 30,
  description: 90,
  path: 15,
  sitelinkText: 25,
  sitelinkDescription: 35,
  callout: 25,
  snippetValue: 25,
};

const problems = [];

const check = (label, value, limit) => {
  if (value.length > limit) {
    problems.push(`${label}: ${value.length}/${limit} chars — "${value}"`);
  }
};

// --- Validate ads -----------------------------------------------------------

/** An ad group may carry its own ads; otherwise it uses the campaign's. */
const adsFor = (campaign, group) => group.ads ?? campaign.ads;

for (const campaign of campaigns) {
  for (const ad of campaign.adGroups.flatMap((g) => adsFor(campaign, g))) {
    // Google serves at most 3 headlines and 2 descriptions at once, but wants
    // plenty to choose from. Fewer than 8 headlines limits the combinations it
    // can test and caps Ad Strength at "Average".
    if (ad.headlines.length < 8) {
      problems.push(
        `${campaign.name}: only ${ad.headlines.length} headlines — supply at least 8`,
      );
    }
    if (ad.descriptions.length < 2) {
      problems.push(`${campaign.name}: needs at least 2 descriptions`);
    }
    ad.headlines.forEach((h) => check(`${campaign.name} headline`, h, LIMITS.headline));
    ad.descriptions.forEach((d) =>
      check(`${campaign.name} description`, d, LIMITS.description),
    );
  }

  for (const group of campaign.adGroups) {
    check(`${campaign.name} / ${group.name} path1`, group.path1, LIMITS.path);
    check(`${campaign.name} / ${group.name} path2`, group.path2, LIMITS.path);
  }
}

assets.sitelinks.forEach((s) => {
  check('Sitelink text', s.text, LIMITS.sitelinkText);
  check('Sitelink description', s.description1, LIMITS.sitelinkDescription);
  check('Sitelink description', s.description2, LIMITS.sitelinkDescription);
});
assets.callouts.forEach((c) => check('Callout', c, LIMITS.callout));

// Structured snippet headers are a closed list. Anything else is rejected on
// import and by the API, which is easy to miss because the value reads fine.
const SNIPPET_HEADERS = [
  'Amenities', 'Brands', 'Courses', 'Degree programs', 'Destinations',
  'Featured hotels', 'Insurance coverage', 'Models', 'Neighborhoods',
  'Service catalog', 'Shows', 'Styles', 'Types',
];
if (!SNIPPET_HEADERS.includes(assets.structuredSnippet.header)) {
  problems.push(
    `Structured snippet header "${assets.structuredSnippet.header}" is not one ` +
      `of Google's accepted headers: ${SNIPPET_HEADERS.join(', ')}`,
  );
}
if (assets.structuredSnippet.values.length < 3) {
  problems.push('Structured snippet needs at least 3 values');
}
assets.structuredSnippet.values.forEach((v) =>
  check('Structured snippet value', v, LIMITS.snippetValue),
);

// --- Validate landing pages exist ------------------------------------------

const sitemap = readFileSync(join(repoRoot, 'public', 'sitemap.xml'), 'utf8');
const liveUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

const landingPages = new Set();
for (const campaign of campaigns) {
  for (const group of campaign.adGroups) landingPages.add(group.finalUrl);
}
assets.sitelinks.forEach((s) => landingPages.add(s.finalUrl));

for (const finalUrl of landingPages) {
  const bare = finalUrl.split('?')[0];
  // The sitemap lists the home page with a trailing slash; everything else without.
  const candidates = [bare, bare.endsWith('/') ? bare.slice(0, -1) : `${bare}/`];
  if (!candidates.some((c) => liveUrls.has(c))) {
    problems.push(`Landing page is not in sitemap.xml: ${bare}`);
  }
}

// --- Validate duplicate keywords -------------------------------------------

const seen = new Map();
for (const campaign of campaigns) {
  for (const group of campaign.adGroups) {
    for (const [keyword, matchType] of group.keywords) {
      const key = `${keyword}|${matchType}`;
      if (seen.has(key)) {
        // Two ad groups bidding on the same keyword compete with each other and
        // split the data that decides which ad wins.
        problems.push(
          `Duplicate keyword "${keyword}" (${matchType}) in both ` +
            `"${seen.get(key)}" and "${campaign.name} / ${group.name}"`,
        );
      }
      seen.set(key, `${campaign.name} / ${group.name}`);
    }
  }
}

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} problem(s) found:\n`);
  problems.forEach((p) => console.error(`  · ${p}`));
  console.error('');
  process.exit(1);
}

// --- Write CSVs -------------------------------------------------------------

/** RFC 4180 quoting: wrap in quotes and double any embedded quote. */
const cell = (value) => {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const toCsv = (rows) => rows.map((r) => r.map(cell).join(',')).join('\n') + '\n';

const write = (name, rows) => {
  // BOM so Excel reads the UTF-8 correctly if these are opened before import.
  writeFileSync(join(here, name), '\uFEFF' + toCsv(rows));
  console.log(`  ✓ ${name.padEnd(28)} ${rows.length - 1} rows`);
};

console.log('\nGoogle Ads Editor import files:\n');

// Campaigns
write('01-campaigns.csv', [
  ['Campaign', 'Campaign Type', 'Campaign Daily Budget', 'Status', 'Networks', 'Languages'],
  ...campaigns.map((c) => [
    c.name,
    'Search',
    c.dailyBudget.toFixed(2),
    c.status,
    'Google search',
    'English',
  ]),
]);

// Ad groups
write('02-ad-groups.csv', [
  ['Campaign', 'Ad Group', 'Max CPC', 'Status'],
  ...campaigns.flatMap((c) =>
    c.adGroups.map((g) => [c.name, g.name, g.maxCpc.toFixed(2), c.status]),
  ),
]);

// Keywords
write('03-keywords.csv', [
  ['Campaign', 'Ad Group', 'Keyword', 'Criterion Type', 'Max CPC', 'Final URL', 'Status'],
  ...campaigns.flatMap((c) =>
    c.adGroups.flatMap((g) =>
      g.keywords.map(([keyword, matchType]) => [
        c.name,
        g.name,
        keyword,
        matchType,
        g.maxCpc.toFixed(2),
        g.finalUrl,
        c.status,
      ]),
    ),
  ),
]);

// Negative keywords, applied at campaign level to every campaign
write('04-negative-keywords.csv', [
  ['Campaign', 'Keyword', 'Criterion Type'],
  ...campaigns.flatMap((c) =>
    Object.values(negativeKeywords)
      .flat()
      .map((keyword) => [c.name, keyword, 'Campaign Negative Phrase']),
  ),
]);

// Responsive search ads
const maxHeadlines = 15;
const maxDescriptions = 4;
write('05-responsive-search-ads.csv', [
  [
    'Campaign',
    'Ad Group',
    'Ad Type',
    ...Array.from({ length: maxHeadlines }, (_, i) => `Headline ${i + 1}`),
    ...Array.from({ length: maxDescriptions }, (_, i) => `Description ${i + 1}`),
    'Path 1',
    'Path 2',
    'Final URL',
    'Status',
  ],
  ...campaigns.flatMap((c) =>
    c.adGroups.flatMap((g) =>
      adsFor(c, g).map((ad) => [
        c.name,
        g.name,
        'Responsive search ad',
        ...Array.from({ length: maxHeadlines }, (_, i) => ad.headlines[i] ?? ''),
        ...Array.from({ length: maxDescriptions }, (_, i) => ad.descriptions[i] ?? ''),
        g.path1,
        g.path2,
        g.finalUrl,
        c.status,
      ]),
    ),
  ),
]);

// Sitelinks
write('06-sitelinks.csv', [
  ['Link Text', 'Description Line 1', 'Description Line 2', 'Final URL'],
  ...assets.sitelinks.map((s) => [s.text, s.description1, s.description2, s.finalUrl]),
]);

// Callouts
write('07-callouts.csv', [
  ['Callout text'],
  ...assets.callouts.map((c) => [c]),
]);

// Structured snippets
write('08-structured-snippets.csv', [
  ['Header', 'Values'],
  [assets.structuredSnippet.header, assets.structuredSnippet.values.join(';')],
]);

const totalKeywords = campaigns.reduce(
  (n, c) => n + c.adGroups.reduce((m, g) => m + g.keywords.length, 0),
  0,
);
const totalNegatives = Object.values(negativeKeywords).flat().length;
const liveBudget = campaigns
  .filter((c) => c.status === 'Enabled')
  .reduce((sum, c) => sum + c.dailyBudget, 0);

console.log(
  `\n${campaigns.length} campaigns · ${totalKeywords} keywords · ` +
    `${totalNegatives} negatives · £${liveBudget.toFixed(2)}/day live ` +
    `(~£${Math.round(liveBudget * 30.4)}/month)\n`,
);
console.log(`Site: ${SITE}\n`);
