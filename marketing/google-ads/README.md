# Google Ads — JW Garden Services

The account definition lives in `campaign-plan.mjs`. `build.mjs` validates it
against Google's character limits and writes the CSVs in this folder, which
Google Ads Editor imports.

```sh
npm run ads:build
```

The build fails rather than writing files if a headline is over 30 characters,
a description over 90, a landing page is missing from `public/sitemap.xml`, or
the same keyword appears in two ad groups.

## Already built in the account

The two phase-1 campaigns were created directly in account **234-303-0207**
(JW Gardening) via the API, not imported. **Everything is PAUSED** — campaigns,
ad groups and ads — so nothing can spend until it is switched on.

| | Campaign | Ad groups | Keywords | Negatives |
| --- | --- | --- | --- | --- |
| `24201757678` | Search - JW Garden Services | 8 | 39 | 123 |

It started as two campaigns and was merged into one. Locations, budget,
schedule, bidding and negatives are all campaign-level settings, so two
campaigns meant configuring each of them twice for no gain — at £15/day the
9/6 budget split was a guess, and one pooled budget lets the spend follow
whichever demand shows up. The ad groups stayed separate, because that is what
decides which ad a searcher sees and which page they land on.

`24190973895` still exists, emptied and renamed **"ZZ - Landscaping & Patios
(merged, do not use)"**. It is paused and can be removed whenever convenient;
the API has no delete, so it was renamed to make it obviously dead.

Also set: £15/day budget, £1.50 CPC ceiling, Maximise Clicks (target spend),
English only, Mon–Fri 07:00–20:00 and Sat 08:00–14:00, a call asset, sitelinks,
callouts and a Service catalog snippet.

**Before enabling, two things must be done by hand in the web UI** — neither has
an API:

1. **Location targeting.** The campaigns currently have none, which means they
   would serve nationally. Set the 25-mile radius and the presence option
   described below *before* enabling anything.
2. **Conversion tracking.** See below.

The CSVs in this folder remain the source of truth and the way to rebuild or to
import phase 2 (Garden Design, Commercial Grounds), which was deliberately not
created in the account.

## What ships

| File | Contents |
| --- | --- |
| `01-campaigns.csv` | 4 campaigns, 2 enabled and 2 paused |
| `02-ad-groups.csv` | 10 ad groups with starting CPC caps |
| `03-keywords.csv` | 49 keywords, exact and phrase only |
| `04-negative-keywords.csv` | 123 negatives applied to every campaign |
| `05-responsive-search-ads.csv` | One responsive search ad per ad group |
| `06-sitelinks.csv` | 5 sitelinks |
| `07-callouts.csv` | 8 callouts |
| `08-structured-snippets.csv` | Service catalog snippet |

**Two campaigns are deliberately paused.** Garden Design and Commercial Grounds
are lower-volume, and a small budget split four ways means none of the four
gathers enough conversions to learn from. Enable them once the two live
campaigns have a cost per enquiry you trust.

Nothing spends until you enable the campaigns in the account, so importing is
safe to do before you have decided on a budget.

## Importing

1. Install [Google Ads Editor](https://ads.google.com/home/tools/ads-editor/)
   and sign in to the account.
2. **Account → Import → From file**, then import the CSVs **in numerical
   order**. Campaigns must exist before ad groups, ad groups before keywords
   and ads.
3. Review the proposed changes in the left panel. Nothing reaches the live
   account until you press **Post**.
4. Post.

Sitelinks, callouts and snippets (files 06–08) are usually quicker to paste
into the web UI under **Campaigns → Assets** than to import.

## Settings the CSVs cannot carry

Set these once in the web UI. The first one matters more than everything else
on this page.

- **Location targeting — do this before enabling.** The live campaigns have no
  location targeting at all, so switching them on as they stand would serve the
  ads nationally and burn the budget in a day. Target the **twelve named towns**,
  not a radius: Aylesbury, Bierton, Wendover, Wing, Stone, Waddesdon, Haddenham,
  Tring, Leighton Buzzard, Great Missenden, Chesham, Amersham — or the
  equivalent postcode districts, which is how they were entered in practice:
  HP17-HP23 and HP5, plus HP16, HP6, HP7 and LU7 for Great Missenden, Amersham
  and Leighton Buzzard. **HP20 is central Aylesbury and must not be missed.**
  A 25 mile circle
  from Bierton sweeps in Milton Keynes, High Wycombe and Luton — none of them
  worked, all of them expensive. Villages Google has no entry for (Bierton,
  Stone and Wing may not resolve) are covered by adding postcode districts
  **HP17-HP22** instead. Then open **Location options** and set **"Presence:
  People in or regularly in your targeted locations"**. The default is *Presence
  or interest*, which shows your ads to somebody in Newcastle reading about
  Aylesbury — that single setting wastes more local budget than any other.
- **Networks**: Google Search only. Turn off the Display Network and Search
  Partners to start.
- **Bidding**: Maximise Clicks with a £1.50 CPC cap. The account has
  historically paid about £0.77 a click, so a higher cap only invites drift.
  Switch to Maximise Conversions only once it has recorded roughly 30
  conversions — before that the algorithm has nothing to learn from.
- **Ad schedule**: Monday to Saturday, 07:00–20:00. You answer the phone
  08:00–16:00, so record a voicemail greeting pointing people at the website
  form.
- **Conversions**: import the two actions below and mark both as primary.
  Nothing else should be primary, or bidding optimises toward the wrong thing.

## Conversion tracking

The site reports two conversions, but only once it is configured — see the
Google Ads section of the root `README.md`. In short:

**The account's website tracking points at the wrong domain.** Goals → the
"Conversions on a website" data source reads `https://www.jw-gardening.com/`,
with a Google tag and GA4 property 340239237 attached to it. That domain appears
nowhere in this repository. It is the real reason conversions stopped, and the
reason every historic conversion in this account was recorded against a site
that is not the one these campaigns advertise.

The account's existing conversion actions cannot be reused. "Clicks to call"
and the three "Local actions" are `GOOGLE_HOSTED` — Google tracks those itself
and there is nothing to install. "Contact Us", which carries 99 of the account's
108 recorded conversions, is `GOOGLE_ANALYTICS_4_CUSTOM`: a GA4 import, not a
Google Ads tag. That is why tracking stopped when the site left Lovable, and why
none of them offer a Tag setup screen.

1. In Google Ads: **Goals → Conversions → New conversion action → Website**,
   then choose **"Add a conversion action manually instead"** rather than
   letting it scan the site. Create two:
   - **Enquiry form** — category *Submit lead form*, count *One*
   - **Phone click** — category *Contact*, count *One*
2. The account's conversion ID is **`AW-409710547`** — that is
   `VITE_GADS_ID`, and it is the same for every conversion action in the
   account. Each individual action then has its own **event snippet**
   (`Tag setup` → `Install the tag yourself`) reading
   `send_to: 'AW-409710547/<label>'`; the part after the slash is the label,
   and it differs per action.

   Do not paste the account-level Google tag into the site. `src/lib/analytics.ts`
   already loads it, and a second copy on the page double-counts.
3. Set both new actions to **Primary**, and demote every existing one to
   **Secondary action (observe only)**. As of this writing three are wrongly
   primary — "Contact Us", "JW Gardening Services - GA4 (web) call" and
   "JW Gardening Services - GA4 (web) ua_email" — and all three are GA4 imports
   from `jw-gardening.com`, a domain this site has nothing to do with. They can
   never fire again, so leaving them primary points Smart Bidding at conversions
   that will not happen. ("Email" and "Call (All Web Site Data)" are Universal
   Analytics, retired by Google in 2023; they are already secondary.)
4. Put the new values in `.env` as `VITE_GADS_ID`, `VITE_GADS_FORM_LABEL` and
   `VITE_GADS_CALL_LABEL`, then run `npm run build:deploy` and deploy.

This is the highest-priority item in this folder. The account spent ~£246 in
March and April 2026 and recorded **zero** conversions, because the site has
carried no tag since it moved off Lovable. Every pound spent before this is
fixed buys traffic you cannot measure.

Until those are set the site loads no Google tag, sets no cookies and shows no
consent banner.

## Budget

| | Monthly | Daily | Split |
| --- | --- | --- | --- |
| Toe in the water | £300 | £10 | Maintenance £6 · Landscaping £4 |
| **Recommended start** | **£450** | **£15** | **Maintenance £9 · Landscaping £6** |
| Spring rush | £900 | £30 | Maintenance £18 · Landscaping £12 |

`campaign-plan.mjs` currently ships the recommended start. Change
`dailyBudget` there and re-run `npm run ads:build` to switch tier.

These tiers are grounded in the account's own history rather than a benchmark.
Across £1,975 of past spend it has averaged **£0.77 a click** and **£18.20 a
conversion** — far cheaper than the US landscaping benchmark of $3.65 a click,
which is why the CPC caps here sit at £1.40–£2.00 rather than the £2.50–£3.20
a benchmark would suggest.

At £0.77 a click, £15/day buys roughly 19 clicks a day — about 580 a month.

### What the account has already spent

| Campaign | Spend | Clicks | CPC | Conv. | Cost/conv. |
| --- | --- | --- | --- | --- | --- |
| Search-6 | £930.27 | 1,388 | £0.67 | 76.5 | **£12.16** |
| Performance Max-1 | £480.73 | 534 | £0.90 | 15 | £32.05 |
| JW garden services | £346.10 | 439 | £0.79 | 13 | £26.62 |
| March 2025 | £80.76 | 136 | £0.59 | 4 | £20.19 |
| Garden Services - Apr 24 | £80.85 | 38 | £2.13 | 0 | — |
| Leads-Search Feb 2024 | £31.07 | 31 | £1.00 | 0 | — |
| March 2026 | £24.96 | 15 | £1.66 | 0 | — |
| **Total** | **£1,974.73** | **2,581** | **£0.77** | **108.5** | **£18.20** |

**Treat that conversion column with suspicion.** "Contact Us", which is 99 of
those 108, is defined in GA4 as `Page load: /contact` counted on **every**
conversion, not one per person. So it counted anybody who so much as landed on
the contact page, repeatedly, on a domain that is not this site. It is a
page-view metric wearing a conversion's clothing. The true cost per *enquiry*
over that period is unknown and certainly higher than £18.20. The click and
cost figures are sound; the conversion and cost-per-conversion figures are not,
which is the strongest argument for the tracking work below. Its last recorded
conversion was 23 November 2025.

Two things fall straight out of that table:

- **Search beat Performance Max by 2.6×** on cost per conversion (£12.16 against
  £32.05). That is the evidence for building this account as plain search
  campaigns and leaving PMax off.
- **The Mar–Apr 2026 spend of ~£246 recorded zero conversions.** Almost
  certainly because there is no conversion tracking on the site — see the
  Conversion tracking section above. Do not read it as the traffic being
  worthless; read it as the account having been flying blind.

## First month

Week 1 is the only week with real work in it.

- **Day 1** — import, set the manual settings above, enable.
- **Every 2–3 days for the first two weeks** — open **Insights → Search terms**
  and add anything irrelevant as a negative. The supplied list covers the
  predictable waste; the search terms report catches the rest. This is the
  single highest-return habit in a new account.
- **Week 2** — pause any keyword with 50+ clicks and no enquiry.
- **Week 4** — compare cost per enquiry between the two campaigns and move
  budget toward the better one.
- **Month 2** — with ~30 conversions recorded, switch to Maximise Conversions.

## Editing

Change `campaign-plan.mjs`, run `npm run ads:build`, re-import the affected
file. Editor updates what already exists rather than duplicating it, as long as
campaign and ad group names have not changed.
