/**
 * JW Garden Services — Google Ads campaign definition.
 *
 * This is the single source of truth for the account. `build.mjs` validates it
 * against Google's character limits and writes the CSVs that Google Ads Editor
 * imports. Edit here, run `npm run ads:build`, re-import.
 *
 * Landing pages must already exist in public/sitemap.xml — the build checks.
 */

export const SITE = 'https://jw-gardenservices.co.uk';

/**
 * Every ad and keyword lands on a page that already ranks and reads well.
 * Sending paid traffic to the home page instead costs you the match between
 * what someone searched and what they read first, which is most of Quality
 * Score and most of the conversion rate.
 */
const url = (path, campaign) =>
  `${SITE}${path}?utm_source=google&utm_medium=cpc&utm_campaign=${campaign}`;

/**
 * Phase 1 runs the two campaigns that pay for themselves fastest: the
 * recurring maintenance round, and the high-ticket landscaping work.
 *
 * Phase 2 (design, commercial) ships PAUSED. Both are lower-volume, and
 * splitting a small budget four ways means none of the four gathers enough
 * conversions to learn from. Turn them on once phase 1 has a cost per enquiry
 * you trust.
 */
export const campaigns = [
  {
    name: 'Search - Garden Maintenance',
    status: 'Enabled',
    dailyBudget: 9.0,
    phase: 1,
    adGroups: [
      {
        name: 'Gardener - Generic',
        maxCpc: 1.6,
        finalUrl: url('/services/garden-maintenance', 'maintenance'),
        path1: 'Gardeners',
        path2: 'Aylesbury',
        keywords: [
          ['gardener aylesbury', 'Exact'],
          ['gardeners aylesbury', 'Exact'],
          ['gardener near me', 'Phrase'],
          ['local gardener aylesbury', 'Exact'],
          ['garden services aylesbury', 'Exact'],
          ['gardening services near me', 'Phrase'],
        ],
      },
      {
        name: 'Garden Maintenance',
        maxCpc: 1.6,
        finalUrl: url('/services/garden-maintenance', 'maintenance'),
        path1: 'Garden',
        path2: 'Maintenance',
        keywords: [
          ['garden maintenance aylesbury', 'Exact'],
          ['garden maintenance services', 'Phrase'],
          ['weekly garden maintenance', 'Phrase'],
          ['regular garden maintenance', 'Phrase'],
          ['garden tidy up service', 'Phrase'],
          ['garden clearance aylesbury', 'Exact'],
        ],
      },
      {
        name: 'Lawn & Grass Cutting',
        maxCpc: 1.4,
        finalUrl: url('/services/garden-maintenance', 'maintenance'),
        path1: 'Lawn-Care',
        path2: 'Aylesbury',
        keywords: [
          ['grass cutting service aylesbury', 'Exact'],
          ['lawn mowing service aylesbury', 'Exact'],
          ['grass cutting service near me', 'Phrase'],
          ['lawn mowing service', 'Phrase'],
          ['lawn care service aylesbury', 'Exact'],
        ],
      },
      {
        name: 'Hedge Cutting',
        maxCpc: 1.4,
        finalUrl: url('/services/garden-maintenance', 'maintenance'),
        path1: 'Hedge-Cutting',
        path2: 'Aylesbury',
        keywords: [
          ['hedge cutting aylesbury', 'Exact'],
          ['hedge trimming aylesbury', 'Exact'],
          ['hedge cutting service near me', 'Phrase'],
          ['hedge cutting service', 'Phrase'],
        ],
      },
    ],
    ads: [
      {
        headlines: [
          'Gardeners in Aylesbury',
          'Weekly Garden Maintenance',
          'Gardeners, Not Mow & Go',
          'Free Quote, No Obligation',
          'All Waste Taken Away',
          'Local to Aylesbury Since 2017',
          'Same Day, Every Week',
          'Gardeners Guild Members',
          'Lawns, Hedges & Borders',
          'City & Guilds Qualified',
          'Book Your Free Quote',
          'Reliable Weekly Gardeners',
        ],
        descriptions: [
          'Weekly garden maintenance across Aylesbury and the villages. Free quotes, waste removed.',
          'City & Guilds qualified, trading since 2017. Lawns, hedges and borders kept immaculate.',
          'We bring our own tools and take every bag of clippings with us. Same day each week.',
          'Covering Aylesbury, Wendover, Wing, Stone, Haddenham and Tring. Call for a free quote.',
        ],
      },
    ],
  },

  {
    name: 'Search - Landscaping & Patios',
    status: 'Enabled',
    dailyBudget: 6.0,
    phase: 1,
    adGroups: [
      {
        name: 'Patios',
        maxCpc: 2.0,
        finalUrl: url('/services/landscaping-and-patios', 'landscaping'),
        path1: 'Patios',
        path2: 'Aylesbury',
        keywords: [
          ['patio installers aylesbury', 'Exact'],
          ['patio laying aylesbury', 'Exact'],
          ['patio company near me', 'Phrase'],
          ['patio installers near me', 'Phrase'],
          ['new patio cost', 'Phrase'],
        ],
      },
      {
        name: 'Fencing',
        maxCpc: 1.8,
        finalUrl: url('/services/landscaping-and-patios', 'landscaping'),
        path1: 'Fencing',
        path2: 'Aylesbury',
        keywords: [
          ['garden fencing aylesbury', 'Exact'],
          ['fence installers aylesbury', 'Exact'],
          ['garden fencing near me', 'Phrase'],
          ['fence fitters near me', 'Phrase'],
        ],
      },
      {
        name: 'Turfing & New Lawns',
        maxCpc: 1.7,
        finalUrl: url('/services/landscaping-and-patios', 'landscaping'),
        path1: 'Turfing',
        path2: 'New-Lawns',
        keywords: [
          ['turfing aylesbury', 'Exact'],
          ['turf laying service aylesbury', 'Exact'],
          ['new lawn laid near me', 'Phrase'],
          ['turfing service near me', 'Phrase'],
        ],
      },
      {
        name: 'Landscaping - Generic',
        maxCpc: 2.0,
        finalUrl: url('/services/landscaping-and-patios', 'landscaping'),
        path1: 'Landscaping',
        path2: 'Aylesbury',
        keywords: [
          ['landscaping aylesbury', 'Exact'],
          ['landscapers aylesbury', 'Exact'],
          ['landscape gardeners aylesbury', 'Exact'],
          ['landscape gardeners near me', 'Phrase'],
          ['garden landscaping near me', 'Phrase'],
        ],
      },
    ],
    ads: [
      {
        headlines: [
          'Landscapers in Aylesbury',
          'Patios, Paths & Fencing',
          'Hard Landscaping, Done Well',
          'Free On-Site Quote',
          'Turfing & New Lawns',
          'Local Landscapers, Est 2017',
          'See Our Recent Projects',
          'Decking, Fencing & Patios',
          'Qualified & Insured',
          'Aylesbury & Surrounding Area',
          'Book a Free Site Visit',
          'Built to Last, Not to Rush',
        ],
        descriptions: [
          'Patios, paths, fencing, decking and turfing across Aylesbury and Bucks. Free quotes.',
          'Landscaping by trained gardeners, not a general builder. Trading locally since 2017.',
          'See photos of recent patios and fencing on our site, then book a free site visit.',
          'Covering Aylesbury, Tring, Wendover, Haddenham and the surrounding villages.',
        ],
      },
    ],
  },

  {
    name: 'Search - Garden Design & Planting',
    status: 'Paused',
    dailyBudget: 4.0,
    phase: 2,
    adGroups: [
      {
        name: 'Garden Design',
        maxCpc: 1.8,
        finalUrl: url('/services/garden-design-and-planting', 'design'),
        path1: 'Garden-Design',
        path2: 'Aylesbury',
        keywords: [
          ['garden design aylesbury', 'Exact'],
          ['garden designer aylesbury', 'Exact'],
          ['garden design near me', 'Phrase'],
          ['planting plan garden', 'Phrase'],
          ['garden redesign service', 'Phrase'],
        ],
      },
    ],
    ads: [
      {
        headlines: [
          'Garden Design in Aylesbury',
          'Planting Plans That Work',
          'Designed by a Horticulturist',
          'Free Design Consultation',
          'Borders, Beds & Planting',
          'Local Garden Designers',
          'City & Guilds Qual, Est 2017',
          'Book Your Free Quote',
        ],
        descriptions: [
          'Garden design and planting plans tailored to your space, soil and how you use it.',
          'Designed and planted by trained gardeners who will maintain it afterwards too.',
          'Covering Aylesbury and the surrounding Bucks, Beds and Herts villages.',
        ],
      },
    ],
  },

  {
    name: 'Search - Commercial Grounds',
    status: 'Paused',
    dailyBudget: 4.0,
    phase: 2,
    adGroups: [
      {
        name: 'Commercial Grounds',
        maxCpc: 2.0,
        finalUrl: url('/services/commercial-grounds-maintenance', 'commercial'),
        path1: 'Commercial',
        path2: 'Grounds',
        keywords: [
          ['commercial grounds maintenance aylesbury', 'Exact'],
          ['grounds maintenance aylesbury', 'Exact'],
          ['commercial gardening services', 'Phrase'],
          ['grounds maintenance contractors near me', 'Phrase'],
          ['office grounds maintenance', 'Phrase'],
        ],
      },
    ],
    ads: [
      {
        headlines: [
          'Commercial Grounds Care',
          'Grounds Maintenance, Bucks',
          'Offices, Schools & Estates',
          'Scheduled Site Visits',
          'Fully Insured, Est 2017',
          'Request a Site Quote',
          'Local Grounds Contractor',
          'Reliable, Same Team Weekly',
        ],
        descriptions: [
          'Scheduled grounds maintenance for offices, schools and managed sites across Bucks.',
          'The same team every visit, fully insured, with all green waste removed.',
          'Based in Aylesbury, covering Buckinghamshire, Bedfordshire and Hertfordshire.',
        ],
      },
    ],
  },
];

/**
 * Account-level negatives. This list is where the budget is saved: without it a
 * meaningful share of clicks on a local trade account go to people looking for
 * a job, a course, a garden centre or a DIY guide.
 *
 * Applied as a shared list to every campaign.
 */
export const negativeKeywords = {
  'Jobs & training': [
    'jobs', 'job', 'vacancy', 'vacancies', 'career', 'careers', 'salary',
    'wages', 'apprenticeship', 'apprentice', 'recruitment', 'cv', 'hiring',
    'training', 'course', 'courses', 'college', 'qualification', 'rhs course',
    'gardening leave',
  ],
  'DIY & information': [
    'diy', 'how to', 'how do i', 'guide', 'tutorial', 'youtube', 'tips',
    'yourself', 'what is', 'when to', 'calendar', 'wikipedia',
  ],
  'Free & bargain hunters': [
    'free', 'cheap', 'cheapest', 'budget', 'volunteer', 'voluntary', 'grant',
    'council', 'charity',
  ],
  'Retail & products': [
    'garden centre', 'garden centres', 'nursery', 'plants for sale', 'seeds',
    'bulbs', 'compost', 'topsoil delivery', 'b&q', 'homebase', 'wickes',
    'screwfix', 'amazon', 'ebay', 'for sale', 'buy', 'shop', 'garden furniture',
    'shed', 'sheds', 'greenhouse', 'summer house', 'log cabin', 'hot tub',
    'bbq', 'planters',
  ],
  'Equipment': [
    'mower', 'mowers', 'lawnmower', 'strimmer', 'hedge trimmer', 'machinery',
    'tool hire', 'equipment hire', 'repair', 'spares', 'parts', 'servicing',
  ],
  'Services we do not offer': [
    'tree surgeon', 'tree surgery', 'tree felling', 'stump grinding',
    'artificial grass', 'astro turf', 'fake grass', 'japanese knotweed',
    'pest control', 'window cleaning', 'gutter', 'driveway', 'driveways',
    'block paving', 'tarmac', 'resin drive', 'swimming pool', 'pond',
    'irrigation', 'tree removal', 'conservatory', 'extension', 'roofing',
  ],
  'Wrong location': [
    'london', 'birmingham', 'manchester', 'leeds', 'bristol', 'glasgow',
    'liverpool', 'sheffield', 'nottingham', 'cardiff', 'edinburgh',
  ],
  'Property & other intent': [
    'allotment', 'rent', 'rental', 'for hire', 'insurance', 'planning permission',
    'boundary dispute', 'landlord', 'estate agent', 'house for sale',
  ],
};

/**
 * Extensions ("assets"). Sitelinks and callouts lift click-through rate more
 * reliably than any rewrite of the ad text, and cost nothing to add.
 */
export const assets = {
  sitelinks: [
    {
      text: 'Weekly Maintenance',
      description1: 'Lawns, hedges and borders',
      description2: 'Same day every week',
      finalUrl: url('/services/garden-maintenance', 'sitelink'),
    },
    {
      text: 'Patios & Landscaping',
      description1: 'Patios, paths and fencing',
      description2: 'Free on-site quote',
      finalUrl: url('/services/landscaping-and-patios', 'sitelink'),
    },
    {
      text: 'See Our Work',
      description1: 'Photos of recent projects',
      description2: 'Gardens across Bucks',
      finalUrl: url('/our-work', 'sitelink'),
    },
    {
      text: 'Get a Free Quote',
      description1: 'Tell us about your garden',
      description2: 'We reply the same day',
      finalUrl: url('/contact', 'sitelink'),
    },
    {
      text: 'Areas We Cover',
      description1: '25 miles around Aylesbury',
      description2: 'Bucks, Beds and Herts',
      finalUrl: url('/gardeners-in-aylesbury', 'sitelink'),
    },
  ],
  callouts: [
    'Free Quotes',
    'All Waste Taken Away',
    'City & Guilds Qualified',
    'Gardeners Guild Member',
    'Same Day Each Week',
    'Established 2017',
    'Fully Insured',
    'Own Tools Brought',
  ],
  structuredSnippet: {
    header: 'Services',
    values: [
      'Garden maintenance',
      'Hedge cutting',
      'Lawn care',
      'Patios and paths',
      'Fencing',
      'Turfing',
      'Garden design',
      'Planting',
    ],
  },
  call: {
    phone: '07950 636954',
    country: 'GB',
  },
};

/**
 * Settings Google Ads Editor cannot take from a CSV. These go in the web UI
 * once, and getting them wrong is the most common way a local account wastes
 * its budget — location targeting especially.
 */
export const manualSettings = {
  locations: [
    '25 mile radius around Bierton, Aylesbury HP22',
  ],
  locationNote:
    'Matches the service area: 25 miles is how far the business actually ' +
    'travels. If the outer towns (Milton Keynes, High Wycombe, Luton) turn ' +
    'out to cost more per enquiry than they are worth, tightening to 15 ' +
    'miles is the first lever to pull — not a smaller budget.',
  locationOptionCritical:
    'Set "Presence: People in or regularly in your targeted locations". The ' +
    'default is "Presence or interest", which shows your ads to somebody in ' +
    'Newcastle reading about Aylesbury. This single setting wastes more local ' +
    'budget than any other.',
  languages: ['English'],
  networks: 'Google Search only. Turn OFF the Display Network and Search Partners to start.',
  bidStrategy:
    'Start on Maximise Clicks with a £1.50 CPC cap — this account has ' +
    'historically paid about £0.77 a click, so a higher cap only invites ' +
    'drift. Switch to Maximise ' +
    'Conversions only after the account has recorded ~30 conversions, or ' +
    'the algorithm has nothing to learn from.',
  adSchedule:
    'Monday to Saturday, 07:00–20:00. You answer the phone 08:00–16:00, so ' +
    'record a voicemail greeting that points people at the website form.',
  devices:
    'No adjustment to start. Expect 70%+ of local trade traffic on mobile — ' +
    'check after a month and bid up if mobile converts better.',
  conversions:
    'Import the two conversion actions created by the site tracking: ' +
    '"Enquiry form" (primary) and "Phone click" (primary). Nothing else ' +
    'should be marked primary, or bidding optimises toward the wrong thing.',
};

export const budgetTiers = [
  {
    label: 'Toe in the water',
    monthly: 300,
    daily: 10,
    split: 'Maintenance £6/day · Landscaping £4/day',
    note: 'Enough to learn which keywords convert. Too thin to fill a round quickly.',
  },
  {
    label: 'Recommended start',
    monthly: 450,
    daily: 15,
    split: 'Maintenance £9/day · Landscaping £6/day',
    note: 'Gathers conversion data fast enough to switch to smart bidding inside two months.',
  },
  {
    label: 'Push for the spring rush',
    monthly: 900,
    daily: 30,
    split: 'Maintenance £18/day · Landscaping £12/day',
    note: 'For February and March, when people book the whole season. Not before.',
  },
];
