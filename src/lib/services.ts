import { images, type ResponsiveImage } from '@/lib/images';

export interface ServiceContent {
  slug: string;
  navLabel: string;
  h1: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  image: ResponsiveImage;
  imageAlt: string;
  body: { heading: string; paragraphs: string[] }[];
  includes: string[];
  faqs: { q: string; a: string }[];
  gallery: ResponsiveImage[];
}

export const services: ServiceContent[] = [
  {
    slug: 'garden-maintenance',
    navLabel: 'Garden Maintenance',
    h1: 'Garden Maintenance in Aylesbury',
    eyebrow: 'Weekly garden care',
    seoTitle: 'Weekly Garden Maintenance Aylesbury | JW Garden Services',
    seoDescription:
      'Weekly garden maintenance in Aylesbury and across Bucks, Beds and Herts — keeping lawns, hedges and borders immaculate all year. Trained, reliable, free quotes.',
    intro:
      'Weekly garden maintenance that keeps your Aylesbury garden looking lovely all year round — the easiest way to have a tidy lawn, neat hedges and cared-for borders every week, without picking up a spade yourself.',
    image: images['jw-maintenance'],
    imageAlt: 'Neatly maintained lawn and borders in an Aylesbury garden',
    body: [
      {
        heading: 'A weekly visit means your garden always looks its best',
        paragraphs: [
          'Coming every week means nothing ever gets away from us. The lawn is mown and edged before it looks scruffy, hedges stay in shape instead of needing one hard cut a year, and weeds are pulled while they are still tiny. You simply come home to a garden that is already done.',
          'For most gardens around Aylesbury and Bierton, weekly visits from March to October keep everything under control, and we can drop to fortnightly or monthly over winter when growth slows down. If you would rather keep the same day every week all year, that is fine too.',
          'We will happily suggest small improvements as we go, so the garden gradually becomes a place you actually want to sit in — not just something on your weekend to-do list.',
        ],
      },
      {
        heading: 'Proper gardeners, not just a mow-and-go service',
        paragraphs: [
          'There is a big difference between cutting the grass and looking after a garden. Josh trained in horticulture at BCA and completed an apprenticeship before starting JW Garden Services in 2017, so your shrubs and roses are pruned at the right time of year — which means healthier plants and far more flower the following summer.',
          'We are members of The Gardeners Guild, bring all our own tools, and take every bag of clippings away with us. You will not be left with green waste to deal with or a bin you cannot close.',
        ],
      },
    ],
    includes: [
      'Weekly lawn mowing, neat edges and stripes',
      'Hedges trimmed and kept in shape',
      'Shrubs, roses and small trees pruned properly',
      'Weeding and tidying the borders every visit',
      'Seasonal flowers and pots planted up',
      'Leaf clearing and winter tidy-ups',
      'Lawn feeding and treatments to thicken the grass',
      'All clippings and garden waste taken away',
    ],
    faqs: [
      {
        q: 'How often should my garden be maintained?',
        a: 'Weekly is our most popular choice and the easiest way to keep a garden looking good — the grass never gets long, hedges stay neat and weeds are caught early. For most Aylesbury gardens weekly visits from March to October work best, easing off to fortnightly or monthly over winter. Bigger gardens often stay weekly all year.',
      },
      {
        q: 'Why choose weekly rather than fortnightly maintenance?',
        a: 'With weekly visits your garden looks presentable every single day, not just the day after we have been. Because we do a little at a time, each visit is quicker, kinder to the plants, and the garden never has a scruffy week in between.',
      },
      {
        q: 'Do you take the garden waste away?',
        a: 'Yes, always. Everything we cut is cleared up and taken away as part of the visit, so you are not left with bags of clippings or a full green bin.',
      },
      {
        q: 'Do I need to be home for the visit?',
        a: 'No. Once we know your garden, most people just leave a gate unlocked or a key safe and come home to a finished garden. We will always let you know if anything needs your say-so.',
      },
      {
        q: 'Which areas do you cover for garden maintenance?',
        a: 'We look after gardens within about 25 miles of Bierton, Aylesbury — including Buckingham, Tring, Waddesdon, Stone, Wing, Haddenham, Leighton Buzzard, Chesham, Amersham and Great Missenden.',
      },
    ],
    gallery: [
      images['jw-maint-1'],
      images['jw-maint-2'],
      images['jw-maint-3'],
      images['jw-maint-4'],
      images['jw-g1'],
      images['jw-g5'],
    ],
  },
  {
    slug: 'landscaping-and-patios',
    navLabel: 'Landscaping & Patios',
    h1: 'Landscaping and Patios in Aylesbury',
    eyebrow: 'Hard landscaping',
    seoTitle: 'Landscaping Aylesbury | Patios, Paths & Fencing | JW Garden Services',
    seoDescription:
      'Hard landscaping in Aylesbury and Buckinghamshire: patios, paths, fencing, decking, sleeper beds and turfing. Built by a trained horticulturist. Free quotes.',
    intro:
      'Patios, paths, fencing, decking and turfing built to last — creating outdoor spaces across Aylesbury and Buckinghamshire that you can be proud of.',
    image: images['jw-landscaping'],
    imageAlt: 'New paved patio and planted borders built in a Buckinghamshire garden',
    body: [
      {
        heading: 'Built properly, from the ground down',
        paragraphs: [
          'A patio is only as good as what sits underneath it. We excavate to the right depth, lay a compacted sub-base, and bed and point every slab correctly so your paving stays level and weed-free for decades rather than settling and lifting after a couple of winters.',
          'Whether you need a new patio, a set of steps, a path through the garden, a fence line replaced or a whole garden makeover, we handle the build from first dig to final sweep.',
        ],
      },
      {
        heading: 'Landscaping designed with the planting in mind',
        paragraphs: [
          'Because we are gardeners first, the hard landscaping and the planting are planned together. Borders are sized for the plants that will fill them, drainage is thought through, and levels are set so the finished garden works as one space rather than a patio with some plants around the edge.',
          'We can work to your own design, to a designer\u2019s drawings, or develop the layout with you on site.',
        ],
      },
    ],
    includes: [
      'Patios and paving in natural stone or porcelain',
      'Garden paths, steps and edging',
      'Fencing, gates and trellis',
      'Decking and raised platforms',
      'Sleeper beds and retaining walls',
      'Turfing and new lawns from seed',
      'Border clearance and redesign',
      'Drainage and levelling works',
    ],
    faqs: [
      {
        q: 'How long does a new patio take?',
        a: 'A typical domestic patio takes around one to two weeks depending on size, access and groundworks. We give you a realistic timescale with your quote before any work starts.',
      },
      {
        q: 'Can you replace a patio that has sunk or cracked?',
        a: 'Yes. Sunken or cracked paving is almost always a sub-base or drainage problem, so we lift the existing surface, correct what is underneath and relay it so the same fault does not return.',
      },
      {
        q: 'Do you provide a written quote?',
        a: 'Always. We visit the garden, discuss what you want and send a written, itemised quote with no obligation.',
      },
      {
        q: 'Where do you carry out landscaping work?',
        a: 'Across Aylesbury, Bierton, Buckingham, Tring, Wing, Haddenham, Leighton Buzzard, Chesham, Amersham and the surrounding parts of Bucks, Beds and Herts.',
      },
    ],
    gallery: [images['jw-work-20250529_160433'], images['jw-g4'], images['jw-work-20230526_090054']],
  },
  {
    slug: 'garden-design-and-planting',
    navLabel: 'Garden Design & Planting',
    h1: 'Garden Design and Planting in Aylesbury',
    eyebrow: 'Design & planting',
    seoTitle: 'Garden Design Aylesbury | Planting Plans | JW Garden Services',
    seoDescription:
      'Garden design and planting in Aylesbury and Buckinghamshire. New borders, colourful planting and full garden makeovers for homeowners, by a trained gardener.',
    intro:
      'New borders, colourful planting and full garden makeovers — designed around your soil, how much sun your garden gets, and how you and your family actually want to use it.',
    image: images['jw-g3'],
    imageAlt: 'Colourful planted border designed and planted by JW Garden Services',
    body: [
      {
        heading: 'Plants chosen for your garden, not picked from a catalogue',
        paragraphs: [
          'The secret to a garden that looks good for years is putting the right plant in the right place. We start by looking at your soil, which parts get sun or shade, how windy it is, and honestly how much time you want to spend gardening. Then we choose plants that will be happy there rather than ones that sulk and need replacing.',
          'That might be an easy-care garden with evergreens and a bit of seasonal colour, a pretty cottage-style border that flowers from spring right through to autumn, or planting chosen to bring bees and butterflies in. We will talk you through the options in plain English — no jargon, no Latin names unless you want them.',
        ],
      },
      {
        heading: 'From one tired border to a whole new garden',
        paragraphs: [
          'Lots of people come to us with one border that has stopped looking nice, and end up reshaping the whole garden. Either is absolutely fine. We can clear a border, improve the soil, replant it and mulch it in a day or two — or spread a bigger makeover over a season so it is easier on your budget.',
          'Because we also do regular garden maintenance, we can keep an eye on your new planting through its first couple of years, which is exactly when it needs watering, feeding and a little attention to really settle in.',
        ],
      },
    ],
    includes: [
      'Planting ideas and all the plants sourced for you',
      'Old borders cleared and the soil improved',
      'Shrubs, flowers and hedges planted',
      'Trees and larger feature plants planted',
      'Spring bulbs and seasonal colour',
      'Mulching to cut down on weeding and watering',
      'Full garden makeovers, phased if you prefer',
      'Ongoing care while your new planting settles in',
    ],
    faqs: [
      {
        q: 'When is the best time to plant a new border?',
        a: 'Autumn and early spring are the best times around Buckinghamshire — the soil is damp and mild, so plants settle in with very little watering from you. That said, most pot-grown plants can go in at almost any time of year as long as they are watered well through their first summer.',
      },
      {
        q: 'Do you supply the plants?',
        a: 'Yes. We buy from good local nurseries rather than garden centre bargain shelves, and we pass on the better prices we get — so your budget buys healthier, longer-lasting plants.',
      },
      {
        q: 'Do I need to know what I want before you visit?',
        a: 'Not at all. Most people just know the garden is not working for them. We come and have a look, ask how you use the space, and suggest ideas from there. If you already have a plan from a designer, we are happy to plant it up for you.',
      },
      {
        q: 'How much does a garden makeover cost?',
        a: 'It really depends on the size of the garden and whether any paving or fencing is involved. We visit, talk it through and then send you a clear written quote with no obligation — and larger projects can be split into stages to spread the cost.',
      },
    ],
    gallery: [
      images['jw-design-1'],
      images['jw-design-2'],
      images['jw-g2'],
      images['jw-g7'],
      images['jw-work-20210721_144520'],
    ],
  },
  {
    slug: 'commercial-grounds-maintenance',
    navLabel: 'Commercial Maintenance',
    h1: 'Commercial Grounds Maintenance in Buckinghamshire',
    eyebrow: 'For businesses',
    seoTitle: 'Commercial Grounds Maintenance Aylesbury & Bucks | JW Garden Services',
    seoDescription:
      'Commercial grounds maintenance in Aylesbury and Buckinghamshire for offices, schools, pubs and managed properties. Flexible contracts, reliable visits.',
    intro:
      'Reliable grounds maintenance for offices, schools, pubs, care homes and managed properties across Aylesbury and Buckinghamshire — with flexible plans built around your budget.',
    image: images['jw-commercial'],
    imageAlt: 'Well-kept commercial grounds and planting outside a business premises',
    body: [
      {
        heading: 'First impressions, kept sharp',
        paragraphs: [
          'Your grounds are the first thing clients, staff and visitors see. We offer flexible plans tailored to your specific needs and budget, keeping your premises looking professional and welcoming all year round.',
          'Visits are scheduled to suit your operation — early mornings before staff arrive, quiet periods for schools, or outside trading hours for pubs and shops.',
        ],
      },
      {
        heading: 'One point of contact, no surprises',
        paragraphs: [
          'You deal directly with Josh, not a call centre. Schedules are agreed up front, work is invoiced clearly, and we carry public liability insurance. If something needs attention between visits, one call sorts it.',
          'We can also take on one-off works alongside a maintenance contract — a car park tidy, new planting at an entrance, fencing repairs or a full landscaping project.',
        ],
      },
    ],
    includes: [
      'Scheduled grounds and lawn maintenance',
      'Hedge, shrub and tree management',
      'Car park and hard-surface weed control',
      'Entrance and reception planting displays',
      'Leaf clearance and winter tidies',
      'Litter and green waste clearance',
      'One-off landscaping and fencing works',
      'Flexible contracts, monthly invoicing',
    ],
    faqs: [
      {
        q: 'Do you offer contracts or pay-as-you-go?',
        a: 'Both. Most commercial clients prefer a fixed schedule with monthly invoicing for predictable budgeting, but we are happy to work on an as-needed basis.',
      },
      {
        q: 'Are you insured for commercial work?',
        a: 'Yes, we carry public liability insurance and can provide details and risk assessments on request.',
      },
      {
        q: 'Can you work outside business hours?',
        a: 'Yes. Early starts and out-of-hours visits are standard for sites where daytime work would be disruptive.',
      },
      {
        q: 'What size of site do you take on?',
        a: 'Anything from a single office frontage to multi-building grounds. If a site is beyond what we can service properly, we will say so rather than overstretch.',
      },
    ],
    gallery: [images['jw-g6'], images['jw-g8'], images['jw-work-20250507_134138']],
  },
];

export const getService = (slug?: string) => services.find((s) => s.slug === slug);
