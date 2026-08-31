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
| `08-structured-snippets.csv` | Services snippet |

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

- **Location targeting**: 25 mile radius around Bierton, Aylesbury HP22 — the
  same distance the business actually travels. Then
  open the location options and set **"Presence: People in or regularly in your
  targeted locations"**. The default is *Presence or interest*, which shows your
  ads to somebody in Newcastle reading about Aylesbury. This single setting
  wastes more local budget than any other. If the outer towns a 25-mile radius
  picks up (Milton Keynes, High Wycombe, Luton) cost more per enquiry than they
  are worth, tightening to 15 miles is the first lever to pull — before cutting
  the budget.
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

1. In Google Ads: **Goals → Conversions → New conversion action → Website →
   Add manually**. Create two:
   - **Enquiry form** — category *Submit lead form*, count *One*
   - **Phone click** — category *Contact*, count *One*
2. Each gives you a conversion ID (`AW-…`) and a label.
3. Put them in `.env` as `VITE_GADS_ID`, `VITE_GADS_FORM_LABEL` and
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
