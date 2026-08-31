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
| `02-ad-groups.csv` | 9 ad groups with starting CPC caps |
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

- **Location targeting**: 15 mile radius around Bierton, Aylesbury HP22. Then
  open the location options and set **"Presence: People in or regularly in your
  targeted locations"**. The default is *Presence or interest*, which shows your
  ads to somebody in Newcastle reading about Aylesbury. This single setting
  wastes more local budget than any other.
- **Networks**: Google Search only. Turn off the Display Network and Search
  Partners to start.
- **Bidding**: Maximise Clicks with a £2.50 CPC cap. Switch to Maximise
  Conversions only once the account has recorded roughly 30 conversions —
  before that the algorithm has nothing to learn from.
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

The only published landscaping benchmark I could find is US — an average CPC of
$3.65 across 61 landscapers in 2024. UK CPCs outside London generally run lower,
but **treat any number here as an estimate until Keyword Planner gives you real
local figures for these exact keywords.**

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
