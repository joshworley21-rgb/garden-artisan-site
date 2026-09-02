# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: homeowners within roughly 25 miles of Bierton/Aylesbury — Aylesbury
itself first, then Bierton, Wendover, Wing, Stone, Waddesdon, Haddenham, Tring,
Leighton Buzzard, Great Missenden, Chesham and Amersham. They arrive from a
local search ("gardener near me", "gardeners in Aylesbury"), usually on a phone,
already wanting the job done rather than wanting to read about gardening. Two
distinct jobs bring them:

- **Hand it over.** The garden has got away from them, or they have no time for
  it. They want a reliable person to come every week and keep it right without
  being managed.
- **Change it.** They have a specific project in mind — a patio, fencing,
  turfing, a border replanted — and want to know whether this business does that
  work and does it well.

Secondary: commercial site owners and managers — offices, schools, pubs, shops,
multi-building grounds — buying a scheduled contract with a monthly invoice.
They need visits timed around their operation (before staff arrive, school quiet
periods, outside trading hours) and evidence of insurance and risk assessments.

## Product Purpose

The public website for JW Garden Services, a garden maintenance, garden design
and hard landscaping business founded by Josh Worley in 2017 and based in
Bierton, Aylesbury. It exists to turn local search into a direct enquiry — a
call, an email, or the enquiry form — and to give a stranger enough grounds to
trust the business before they make contact.

Success is a qualified local enquiry. Weekly maintenance contracts and
one-off landscaping/design projects count equally; the site should not steer
visitors toward one at the other's expense.

## Positioning

A trained horticulturist doing the work, not a mowing round. Josh studied
horticulture at BCA and completed an apprenticeship before founding the
business; it is a member of The Gardeners Guild. The practical consequence is
the claim a neighbouring lawn-cutting service could not truthfully make: shrubs,
roses and small trees are pruned at the right time of year, so plants are
healthier and flower more the following summer.

Two supporting positions, both factual: the business is genuinely local
(Bierton is two miles from Aylesbury town centre, so most weekly customers are
minutes away), and the customer deals with Josh directly rather than a call
centre.

## Operating Context

- Coverage is a radius, roughly 25 miles around Bierton and Aylesbury, spanning
  Buckinghamshire, Bedfordshire and Hertfordshire. Twelve town landing pages
  carry the local search load.
- Four services: garden maintenance, landscaping and patios, garden design and
  planting, commercial grounds maintenance.
- Maintenance is normally weekly from March to October, dropping to fortnightly
  or monthly over winter; larger gardens stay weekly year-round.
- Customers usually are not home for visits — a gate left unlocked or a key
  safe is the norm. Josh phones when something needs a decision.
- All clippings and green waste are taken away every visit; tools are the
  business's own.
- Working hours are Monday to Friday, 08:00–16:00. Commercial work can be done
  outside these hours by arrangement.
- Enquiries land three ways: phone 07950 636954, email
  info@jw-gardenservices.co.uk, or the site's enquiry form (name, email, phone
  optional, message).

## Capabilities and Constraints

- Live at https://jw-gardenservices.co.uk/, self-hosted on shared hosting.
- The site builds to static files plus a single PHP script
  (`public/enquiry.php`) that mails the enquiry form to the business inbox over
  SMTP. There is no application database and no server-side rendering at
  request time; every route is prerendered at build.
- No online booking, no scheduling system, no customer accounts.
- No prices are published. Quotes are free and given per garden.
- Local SEO is a load-bearing function, not decoration: per-page titles,
  descriptions, canonicals and Open Graph tags come from `src/components/Seo.tsx`,
  and `index.html` carries the LocalBusiness/LandscapingBusiness JSON-LD. Work
  that changes routes, headings or copy has to keep these correct.
- Every referenced image and video must exist in `public/assets` — the build
  fails the asset check otherwise.
- Terminology: "maintenance" means the recurring visit; "landscaping" means hard
  landscaping (patios, paths, fencing, decking, turfing); "design and planting"
  is the soft-landscaping and planting-plan service. "Mow and go" is the thing
  the business explicitly is not.

## Brand Commitments

- Name: JW Garden Services. Founder: Josh Worley. Logo and Gardeners Guild
  logo are committed in `public/assets`.
- The business is Josh plus a small team. "We" is factually accurate; "I" is
  Josh speaking personally, as the current service and about copy does. Copy
  must not imply a larger organisation than this — no call centre, no branches.
- Voice is plain, local and unhurried: short declarative sentences, British
  English, no salesmanship, no exclamation. Existing copy sets the standard
  ("If we spot something worth doing, we will mention it. No pressure either
  way." / "If a site is too big for us to do properly, I will tell you straight
  rather than take it on."). Some legacy sections written before this voice was
  settled are markedly more florid than the service and area pages.
- Claims already standing on the site and confirmed true: BCA horticulture
  training, apprenticeship, City & Guilds certification, The Gardeners Guild
  membership, public liability insurance, founded 2017, all waste taken away.

## Evidence on Hand

- **Real customer reviews exist** but are not in this repository and appear
  nowhere on the site. Google Business and FreeIndex listings are referenced in
  the JSON-LD `sameAs`. Any review, rating or testimonial used in future work
  must be supplied by Josh and quoted as given. Do not write, paraphrase into
  existence, or estimate a rating or review count.
- **Public liability insurance** — certificate available on request; already
  cited in the commercial service copy and in its FAQ.
- **Qualifications and memberships** — BCA horticulture study, apprenticeship,
  City & Guilds, The Gardeners Guild. Already cited on the about and
  maintenance pages.
- **Photography of real jobs** — the site ships genuine work photos in
  `public/assets` (maintenance, landscaping, design, commercial, gallery and
  about sets, plus hero stills and a hero video clip), and further before/after
  job photos exist beyond what is committed. All imagery is the business's own
  work; do not substitute stock garden photography for it.
- Not on hand, and not to be invented: prices, customer names, case-study
  outcomes, job counts, years-of-experience figures beyond "founded 2017",
  awards, accreditations other than those listed above, and response-time or
  guarantee promises.

## Product Principles

1. **Enquiry over impression.** Every surface answers "does this business do my
   job, near me, and can I trust them?" and makes contacting Josh the obvious
   next step. Phone, email and form all stay first-class; not everyone fills in
   a form.
2. **Local is the offer.** Proximity to Aylesbury is a real advantage, so place
   is stated concretely — towns, postcodes, travel — never as generic "serving
   the local area".
3. **Horticulture, not grass-cutting.** Where a choice exists between
   demonstrating competence and demonstrating scale, show competence. The
   trained-gardener distinction is the business's whole position.
4. **Only what is true.** No invented proof, prices, guarantees or claims. When
   evidence for something desirable is missing, ask Josh for it rather than
   writing around it.
5. **Maintenance and projects carry equal weight.** Recurring work and one-off
   landscaping are both wins; neither gets buried to promote the other.
