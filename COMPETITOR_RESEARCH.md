# Competitor Research — Garden Maintenance & Landscaping, Aylesbury & Bierton

**Prepared:** November 2026
**Method:** Live SERP snapshot via DuckDuckGo (UK) for "garden maintenance Aylesbury" and "garden maintenance Bierton", followed by direct fetch of each competitor's ranking page. Title tags, meta descriptions, heading structures and service architecture were read from the raw HTML. Keyword counts were measured against visible main-content copy; percentages are approximate (main-copy word counts vary by page).

**Caveats**
- Search positions are a point-in-time snapshot, not a tracking history. Google personalised results will differ.
- Directory listings (Checkatrade) and the JW Garden Services pages were excluded from the competitor set.
- `welltendedgarden.co.uk` failed to load on two attempts and is not profiled.
- Keyword-density figures for Masters, TLC and Bluebells are scripted counts. Chiltern, Greenwood and Buckinghamshire Gardener are described qualitatively because full main-copy extraction was not scripted for those pages.

---

## 1. Ranking snapshot (what appeared)

**"garden maintenance Aylesbury" (organic, directories and own site removed):**
1. chilterngardenmaintenance.com/garden-maintenance-aylesbury/
2. mastersgardens.co.uk/garden-maintenance-aylesbury/
3. tlclandscapes.uk/grounds-maintenance-garden-care-in-aylesbury/
4. welltendedgarden.co.uk (could not fetch)
5. bluebellsgardens.co.uk (homepage)

**"garden maintenance Bierton" (organic):**
1. buckinghamshire-gardener.co.uk/gardener-in-bierton/ (lead-gen network)
2. whitestonegardening.co.uk/bierton/ (lead-gen network)
3. allseasonsgardenmaintenance.co.uk/bierton/ (lead-gen network)
4. gardenmaintenancecheshire.co.uk/bierton/ (lead-gen network — note the "cheshire" domain ranking in Buckinghamshire)
5. greenwoodtreeandgardening.co.uk/areas/bierton (genuine local operator)

**Key structural finding:** Bierton's SERP is dominated by templated lead-generation networks with near-identical `/bierton/` pages. Very few genuine local firms rank for Bierton specifically. That is an opening (see Opportunities).

---

## 2. Competitor profiles

### 2.1 Chiltern Garden Maintenance
- **URL:** https://www.chilterngardenmaintenance.com/garden-maintenance-aylesbury/
- **Title:** `Garden Maintenance in Aylesbury | Lawn Renovation, Clearance & Pressure Washing`
- **Meta:** `Professional garden maintenance in Aylesbury including lawn renovation, hedge cutting, pruning, pressure washing and garden clearance.`
- **Title format:** `[Primary service] in [Town] | [Sub-service], [Sub-service] & [Sub-service]` (town once, then service modifiers)
- **Heading structure:**
  - H1: Garden Maintenance in Aylesbury
  - H2: Local garden maintenance in Aylesbury
  - H2: Services available in Aylesbury
  - H2: Typical gardens and common issues in Aylesbury
  - H2: Why local clients choose us
  - H2: How we work
  - H2: Nearby areas we also cover
  - H2: Aylesbury garden maintenance FAQs
  - H2: Need garden maintenance in Aylesbury?
  - (H3s avoided — FAQ uses `<details><summary>` instead)
- **Keyword usage (qualitative):** "Aylesbury" repeated in every section heading; "garden maintenance" in H1, opener, service list and closing. High local repetition without obvious stuffing.
- **Service architecture:** central `/services/` hub plus deep sub-service pages (`/services/lawn-scarification-overseeding/`, `/services/hedge-cutting/`, `/services/small-tree-work/`, `/services/pressure-washing/`, `/services/full-garden-clearance-seasonal-recovery/`), a `/locations/` hub, `/booking/` conversion page, and a `/chiltern-garden-guidance/` content section. Clean `Location + Service` template with LocalBusiness, Service, BreadcrumbList and FAQ schema (WebSite SearchAction too).
- **Takeaway:** the strongest technical/structural competitor. Location-page template is repeatable and schema-rich.

### 2.2 Masters Gardens
- **URL:** https://www.mastersgardens.co.uk/garden-maintenance-aylesbury/
- **Title:** `Garden Maintenance Aylesbury | Grass Cutting Aylesbury | Hedge Cutting Aylesbury | Landscape Gardener Aylesbury | Masters Gardens`
- **Meta:** `Garden maintenance in Aylesbury from Masters Gardens. Grass cutting, hedge cutting, landscape gardening, pruning, weed control, pressure washing patios and decking in Aylesbury...`
- **Title format:** `[Service] Aylesbury | [Service] Aylesbury | [Service] Aylesbury | [Service] Aylesbury | [Brand]` — heavy repeated-town pattern, keyword-first, brand last.
- **Heading structure:** 7 × H1, 0 × H2, 6 × H3
  - H1s (all on one page): Garden Maintenance Aylesbury / Grass Cutting Aylesbury / Hedge Cutting Aylesbury / Garden Pruning Aylesbury / Weed Control Aylesbury / Garden Clearance Aylesbury / Pressure Washing Aylesbury
  - H3s are long descriptive sentences under each service
- **Keyword density (main copy ~248 words):** Aylesbury 8 (≈3.2%), hedge 5 (≈2.0%), garden maintenance 1 (≈0.4%), patio 1 (≈0.4%), lawn 0%, landscaping 0%.
- **Service architecture:** thin service landing (`/garden-maintenance/`), `/hard-landscaping-services/`, `/soft-landscaping-services/`, `/gallery/`, `/contact-us/`. No dedicated per-service sub-pages — the Aylesbury page folds all services into one long page.
- **Takeaway:** old-school keyword-stacked title and multiple H1s (technically a heading anti-pattern). Thin copy but ranks on brand/age/backlinks. Do not copy the multi-H1 structure.

### 2.3 TLC Landscapes
- **URL:** https://tlclandscapes.uk/grounds-maintenance-garden-care-in-aylesbury/
- **Title:** `Grounds Maintenance & Garden Care in Aylesbury | TLC Landscapes`
- **Meta:** `Commercial grounds maintenance and domestic garden maintenance across Aylesbury, Buckinghamshire. Tailored contracts and programmes for all property types. Free consultation.`
- **Title format:** `[Service] & [Service] in [Town] | [Brand]` — clean, mirrors the H1.
- **Heading structure:** 1 × H1, 8 × H2, 0 × H3
  - H1: Grounds Maintenance & Garden Care in Aylesbury
  - H2s: Professional Grounds Maintenance & Garden Care Across Aylesbury / Domestic & Commercial Services Across Aylesbury / Who We Work With in Aylesbury / Why Choose TLC Landscapes in Aylesbury? / Let's Look After Your Aylesbury Property / Trusted by Clients Across Aylesbury & Buckinghamshire / Common Questions About Our Aylesbury Services / Maintained with care. Managed with Communication.
- **Keyword density (main copy ~1,796 words):** Aylesbury 39 (≈2.2%), garden maintenance 9 (≈0.5%), lawn 9 (≈0.5%), hedge 7 (≈0.4%), landscaping 2 (≈0.1%), patio 0%.
- **Service architecture:** commercial/domestic split, then `/grounds-maintenance/`, `/planting-services/`, `/tree-and-hedge-care/`, `/lawn-and-turf-renovation/`, `/domestic-landscaping/`, plus `/faqs/`, `/blog/`, `/about-us/`, `/contact-us/`, and service+location pages (e.g. `/grounds-maintenance-tring/`). Elementor/WordPress with Rank Math schema (Place, Organization, WebSite, Service).
- **Takeaway:** longest, most thorough local copy and deepest internal service tree. The model to beat on content depth.

### 2.4 Bluebells Gardens
- **URL:** https://www.bluebellsgardens.co.uk/ (homepage ranking for the term)
- **Title:** `Home | Bluebells Gardens | Aylesbury`
- **Meta:** `Bluebells Gardens - Providing garden maintenance and grounds maintenance to the homes and businesses of Buckinghamshire and beyond. Get in touch with an experienced gardener now.`
- **Title format:** `Home | [Brand] | [Town]` — brand-led, generic; title does not lead with the service keyword.
- **Heading structure:** 2 × H1 (one empty), 7 × H2, 5 × H3
  - H1: Professional Garden Services in Aylesbury Covering Buckinghamshire, Oxfordshire & Bedfordshire (+ an empty duplicate H1)
  - H2s: Where we cover / testimonials H2s / Why choose me? / Before and Afters / Need a reliable Gardener? / Bluebells Gardens
  - H3s: Hedge / Bushes Trimming / Lawn Mowing / Turfing / Commercial Grounds Maintenance / Jet washing
- **Keyword density (main copy ~579 words):** Aylesbury 3 (≈0.5%), garden maintenance 2 (≈0.4%), hedge 2 (≈0.4%), lawn 1 (≈0.2%), landscaping 0%, patio 0%.
- **Service architecture:** flat — every service card links to one `/garden-maintenance-services` page. `/commercial-garden-services`, `/garden-maintenance-reviews`, `/gallery`, `/contact-a-gardener`. Wix site.
- **Takeaway:** weak SEO structure (Home|Brand|Town title, empty H1, flat service architecture) yet ranks on reviews (153 since 2013), brand and local signals. Proof that reviews/GBP can outweigh on-page weakness.

### 2.5 Greenwood Tree & Gardening (Bierton)
- **URL:** https://www.greenwoodtreeandgardening.co.uk/areas/bierton
- **Title:** `Tree Surgery & Garden Care in Bierton | Greenwood Tree & Gardening`
- **Meta (from page):** local tree surgery and garden care in Bierton, Buckinghamshire; free quotes.
- **Title format:** `[Lead service] & [Service] in [Village] | [Brand]` — clean and location-specific.
- **Heading structure:** 1 × H1, 4 × H2, 7 × H3
  - H1: Tree Surgery & Garden Care in Bierton
  - H2s: Why Bierton chooses Greenwood / Our services in Bierton / Nearby areas we cover / Need a gardener or tree surgeon in Bierton?
  - H3s: Tree Surgery & Removal / Lawn Care & Mowing / Hedge Trimming / Garden Maintenance / Clearance & Waste Removal / Garden Design & Landscaping / Grounds Maintenance
- **Keyword usage (qualitative):** "Bierton" in H1, intro, both service/CTA headings and the area list; strong local context (St James' Church, A418, edge of Aylesbury). Natural, not stuffed.
- **Service architecture:** `/services/{service}` for seven services (tree-surgery, lawn-care, hedge-trimming, garden-maintenance, clearance-waste-removal, garden-design-landscaping, grounds-maintenance) plus `/areas/{village}` for a large village set, plus `/blog/`, `/faqs/`, `/gallery/`, `/about`. Hub-and-spoke done properly — the closest structural match to JW's own approach.
- **Takeaway:** the genuine local competitor to watch in Bierton. Service pages + village area pages, one H1, clean hierarchy.

---

## 3. The Bierton "lead-gen network" pattern (important)

These ranked pages are near-identical templates across many domains:

- buckinghamshire-gardener.co.uk/gardener-in-bierton/
- whitestonegardening.co.uk/bierton/
- allseasonsgardenmaintenance.co.uk/bierton/
- gardenmaintenancecheshire.co.uk/bierton/ (Cheshire domain ranking for Bierton!)
- denshillgardenservices.co.uk/bierton/, peninsulagardeningservices.co.uk/bierton/, garysgardenmaintenanceuk.co.uk/bierton/

**Shared traits:**
- Title format: `Gardener in [Village] | Garden Maintenance in [County]` or `Garden Maintenance [Village] - [List]`
- H1: `Garden Maintenance in [Village]`
- Same paragraph skeletons ("Keeping on top of your garden can be heavy and hard work...", "Before you hire...", cost/tidy-up filler)
- Redirect to a marketplace quote form (Bark.com etc.) — they are lead brokers, not local operators
- Thin, paraphrased, often clumsy copy ("wrestling a wild bear", "pocket money")

**Why it matters:** Google is rewarding these because there is little genuine local competition for "[service] Bierton". A real, locally-based operator with honest, specific content (JW) can outrank them on quality once the page earns links/reviews. Do not imitate their copy — imitate their *coverage* (a dedicated, well-structured Bierton page).

---

## 4. Cross-competitor pattern analysis

### Title tag formats observed
| Site | Pattern | Town in title | Brand in title |
|---|---|---|---|
| Chiltern | `[Service] in [Town] \| [sub], [sub] & [sub]` | Once | No |
| Masters | `[Service] [Town] \| [Service] [Town] \| ... \| [Brand]` | 4× | Yes (end) |
| TLC | `[Service] & [Service] in [Town] \| [Brand]` | Once | Yes (end) |
| Bluebells | `Home \| [Brand] \| [Town]` | Once | Yes (middle) |
| Greenwood | `[Service] & [Service] in [Village] \| [Brand]` | Once | Yes (end) |

**Best practice in the set:** TLC / Greenwood — `Service + Service + in + Town | Brand`. Short, keyword-first, brand last, town once.

### Heading patterns
- Winning local pages lead with a single **H1 = "Service in Town"**.
- Strong performers (TLC, Greenwood, Chiltern) use **4–8 H2s, one per intent**: local intro → services → who it's for/typical gardens → why us → how we work → nearby areas → FAQs → CTA.
- Losers/legacy pages either stack **multiple H1s** (Masters, Bluebells) or have **no H2 structure** (Masters).
- H3s are used either for **service card titles** (Greenwood, Bluebells) or not at all (TLC, Chiltern use H2 only).

### Keyword density ranges (measured pages)
- "Aylesbury": 0.5% – 3.2% of main copy (TLC ~2.2% over long copy is the healthiest; Masters 3.2% over thin copy is borderline stuffing).
- "garden maintenance": 0.35% – 0.5%.
- Secondary services (hedge / lawn): 0.2% – 0.5% each.
- Pattern: the pages ranking well keep the primary keyword **under ~2.5%** and rely on repeated **section-heading location mentions** plus depth, not raw repetition.

### Service page architecture models
1. **Deep hub-and-spoke (TLC, Greenwood, Chiltern):** `/services` hub → dedicated service pages → `service + location` pages → FAQ/blog. Best for topical authority.
2. **Single long service page (Masters):** all sub-services crammed onto one page, no per-service URLs. Weakest.
3. **Flat single-target (Bluebells):** all service cards → one page. Weakest architecture, compensated by reviews/brand.

---

## 5. Takeaways & opportunities for JW Garden Services

JW's current build (single H1 per page, 4 service pages, 12+ bespoke area pages, FAQ + Service + Breadcrumb schema, prerendered HTML) already sits ahead of Masters and Bluebells structurally, and is close to TLC/Greenwood. Specific opportunities surfaced by this research:

1. **Own Bierton properly.** The Bierton SERP is mostly lead-gen templates. A genuinely local, detailed Bierton page (already exists) with a couple of links and fresh reviews can move to the top. Reinforce it with a strong GBP and review flow.
2. **Title format discipline.** Adopt the winning pattern consistently: `[Service] in [Town] | JW Garden Services` or `[Service] & [Service] in [Town] | JW Garden Services`. Avoid Masters-style repeated-town keyword chains and Bluebells-style `Home | Brand | Town`.
3. **Keep one H1.** Masters (7 H1s) and Bluebells (empty duplicate H1) prove ranking is possible but it's a structural weakness — JW should keep the current single-H1 discipline.
4. **Match TLC's depth, not its bloat.** TLC wins on ~1,800 words with real commercial/domestic segmentation. JW's area pages are already richer than Masters/Bluebells; the gap is per-service depth and service+location coverage (now handled via 301s to area pages).
5. **Add the missing secondary intents.** Competitors surface lawn care, hedge cutting, pressure washing, clearance, turfing and tree work as first-class terms. JW's area pages mention them; consider explicit sub-sections or service pages to capture "hedge cutting Aylesbury", "lawn care Aylesbury", "pressure washing" style queries.
6. **Reviews are the tie-breaker.** Bluebells outranks stronger sites on the back of 153 reviews. Prioritise a steady Google review cadence — it's the cheapest competitive lever available.
7. **Don't imitate lead-gen copy.** The network sites rank on coverage, not craft. Compete on specificity (soil, streets, timings) and local proof, which is JW's existing voice advantage.

---

## Appendix — raw SERP notes

**"garden maintenance Aylesbury" organic (excl. directories + own site):** Chiltern Garden Maintenance, Masters Gardens, TLC Landscapes, (Well Tended Garden — unloadable), Bluebells Gardens. Also seen: Smiths Garden Services (page: /garden-and-grounds-maintenance).

**"garden maintenance Bierton" organic:** Buckinghamshire Gardener (network), Whitestone Gardening (network), All Seasons Garden Maintenance (network), Garden Maintenance Cheshire (network), Greenwood Tree & Gardening (genuine), plus Facebook page for JW Garden Services.

**Schema observed:** Chiltern (LocalBusiness, Service, FAQPage, BreadcrumbList, WebSite+SearchAction); Masters (Yoast WebPage, BreadcrumbList, WebSite); TLC (Rank Math Place, Organization, WebSite, WebPage, Service); Greenwood/Bluebells (minimal visible schema in fetched output).
