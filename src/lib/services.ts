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
      'Regular garden maintenance around Aylesbury. We keep the lawn cut, the hedges neat and the borders weeded, so you come home to a garden that is already done.',
    image: images['jw-maintenance'],
    imageAlt: 'Neatly maintained lawn and borders in an Aylesbury garden',
    body: [
      {
        heading: 'What a weekly visit looks like',
        paragraphs: [
          'Coming every week means nothing gets out of hand. The grass is cut before it starts looking long, hedges get trimmed little and often instead of one hard cut a year, and weeds come out while they are still small.',
          'Most gardens round here want us weekly from March to October. Over winter we can drop to fortnightly or monthly, or keep the same day all year if you would rather. Whatever suits you.',
          'If we spot something worth doing, we will mention it. No pressure either way.',
        ],
      },
      {
        heading: 'We are gardeners, not a mow and go',
        paragraphs: [
          'Cutting grass and looking after a garden are not the same job. I trained in horticulture at BCA and did an apprenticeship before starting JW Garden Services in 2017, so shrubs and roses get pruned at the right time of year. That means healthier plants and a lot more flower the next summer.',
          'We are members of The Gardeners Guild, and we turn up with our own tools, so there is nothing for you to dig out of the shed.',
        ],
      },
    ],
    includes: [
      'Mowing, edging and stripes',
      'Hedges trimmed and kept in shape',
      'Shrubs, roses and small trees pruned',
      'Borders weeded every visit',
      'Pots and seasonal flowers planted up',
      'Leaf clearing and winter tidies',
      'Lawn feeds to thicken the grass',
    ],
    faqs: [
      {
        q: 'How often should my garden be maintained?',
        a: 'Weekly suits most gardens. The grass never gets long and the weeds do not get a chance. March to October is the busy stretch, then fortnightly or monthly through winter. Bigger gardens usually stay weekly all year.',
      },
      {
        q: 'Why choose weekly rather than fortnightly maintenance?',
        a: 'Your garden looks right every day, not just the day after we have been. Each visit is quicker too, because there is less to catch up on.',
      },
      {
        q: 'Do I need to be home for the visit?',
        a: 'No. Most people leave a gate unlocked or a key safe and come home to a finished garden. If anything needs your say so, I will give you a ring.',
      },
      {
        q: 'Which areas do you cover for garden maintenance?',
        a: 'About 25 miles around Bierton and Aylesbury. That takes in Buckingham, Tring, Waddesdon, Stone, Wing, Haddenham, Leighton Buzzard, Chesham, Amersham and Great Missenden.',
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
    seoTitle: 'Landscaping Aylesbury | Patios, Paths & Fencing',
    seoDescription:
      'Hard landscaping in Aylesbury and Buckinghamshire: patios, paths, fencing, decking, sleeper beds and turfing. Built by a trained horticulturist. Free quotes.',
    intro:
      'Patios, paths, fencing, decking and new lawns across Aylesbury and Buckinghamshire. Built properly, so they are still right in ten years.',
    image: images['jw-landscaping'],
    imageAlt: 'New paved patio and planted borders built in a Buckinghamshire garden',
    body: [
      {
        heading: 'It is the bit underneath that matters',
        paragraphs: [
          'A patio is only as good as what sits under it. We dig out to the right depth, put in a properly compacted sub base, then bed and point every slab. That is why paving stays flat and weed free for years instead of sinking after a couple of winters.',
          'A new patio, some steps, a path down the garden, a fence line, or the whole thing at once. We do the lot, from the first dig to sweeping up at the end.',
        ],
      },
      {
        heading: 'We think about the planting too',
        paragraphs: [
          'Because we are gardeners first, the hard landscaping and the planting get planned together. Borders end up the right size for what is going in them, the drainage is sorted out, and the levels work across the whole garden rather than just the patio.',
          'Bring us your own idea, a drawing from a designer, or we can work the layout out with you stood in the garden.',
        ],
      },
    ],
    includes: [
      'Patios and paving in natural stone or porcelain',
      'Paths, steps and edging',
      'Fencing, gates and trellis',
      'Decking and raised platforms',
      'Sleeper beds and retaining walls',
      'Turfing and new lawns from seed',
      'Borders cleared and reshaped',
      'Drainage and levelling',
    ],
    faqs: [
      {
        q: 'How long does a new patio take?',
        a: 'Usually one to two weeks, depending on the size, the access and how much digging out is needed. You get a realistic timescale with your quote, before anything starts.',
      },
      {
        q: 'Can you replace a patio that has sunk or cracked?',
        a: 'Yes. Nine times out of ten it is the sub base or the drainage at fault. We lift the old surface, put right what is underneath and relay it, so it does not go the same way again.',
      },
      {
        q: 'Do you provide a written quote?',
        a: 'Always. I come and look at the garden, we talk through what you want, then I send a written quote with the costs broken down. No obligation.',
      },
      {
        q: 'Where do you carry out landscaping work?',
        a: 'Aylesbury, Bierton, Buckingham, Tring, Wing, Haddenham, Leighton Buzzard, Chesham, Amersham and the surrounding parts of Bucks, Beds and Herts.',
      },
    ],
    gallery: [images['jw-work-20250529_160433'], images['jw-g4'], images['jw-work-20230526_090054']],
  },
  {
    slug: 'garden-design-and-planting',
    navLabel: 'Garden Design & Planting',
    h1: 'Garden Design and Planting in Aylesbury',
    eyebrow: 'Design & planting',
    seoTitle: 'Garden Design & Planting Plans in Aylesbury',
    seoDescription:
      'Garden design and planting in Aylesbury and Buckinghamshire. New borders, colourful planting and full garden makeovers for homeowners, by a trained gardener.',
    intro:
      'New borders, better planting, or a whole new garden. Chosen to suit your soil, how much sun you get, and how much time you want to spend out there.',
    image: images['jw-g3'],
    imageAlt: 'Colourful planted border designed and planted by JW Garden Services',
    body: [
      {
        heading: 'Right plant, right place',
        paragraphs: [
          'A garden that still looks good in five years comes down to putting the right plant in the right spot. We look at your soil, which bits get sun and which stay shady, how exposed it is, and how much gardening you actually want to do. Then we pick plants that will be happy there.',
          'That might be low maintenance evergreens with a bit of colour through the year, a cottage border that flowers from spring to autumn, or planting to bring in the bees and butterflies. We will talk it through in normal words. No Latin names unless you are interested.',
        ],
      },
      {
        heading: 'One border or the whole garden',
        paragraphs: [
          'Plenty of people ring up about one tired border and end up redoing the lot. Either is fine by us. A border can be cleared, the soil improved, replanted and mulched in a day or two. A bigger job can be split over a season to spread the cost.',
          'We do the regular maintenance as well, so we can keep an eye on new planting through its first couple of years. That is when it needs the watering and feeding to get properly established.',
        ],
      },
    ],
    includes: [
      'Planting ideas and all the plants sourced for you',
      'Old borders cleared and the soil improved',
      'Shrubs, flowers and hedges planted',
      'Trees and bigger feature plants',
      'Spring bulbs and seasonal colour',
      'Mulching, to cut down the weeding and watering',
      'Full makeovers, in stages if you prefer',
      'Looking after the new planting while it settles in',
    ],
    faqs: [
      {
        q: 'When is the best time to plant a new border?',
        a: 'Autumn or early spring round here. The soil is damp and mild, so plants settle in without much watering from you. Pot grown plants can go in most of the year though, as long as they get watered through their first summer.',
      },
      {
        q: 'Do you supply the plants?',
        a: 'Yes. We buy from good local nurseries rather than the reduced shelf at the garden centre, and we pass on the better price we get. Your money buys healthier plants that last.',
      },
      {
        q: 'Do I need to know what I want before you visit?',
        a: 'No. Most people just know the garden is not working for them. I come and have a look, ask how you use the space, and we go from there. If you already have a plan from a designer, we are happy to plant it up.',
      },
      {
        q: 'How much does a garden makeover cost?',
        a: 'It depends on the size of the garden and whether there is any paving or fencing involved. I come and look, then send you a written quote. Bigger jobs can be done in stages if that is easier on the budget.',
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
    seoTitle: 'Commercial Grounds Maintenance | Aylesbury & Bucks',
    seoDescription:
      'Commercial grounds maintenance in Aylesbury and Buckinghamshire for offices, schools, pubs and managed properties. Flexible contracts, reliable visits.',
    intro:
      'Grounds maintenance for offices, schools, pubs, care homes and managed properties around Aylesbury and Buckinghamshire, on a plan that fits your budget.',
    image: images['jw-commercial'],
    imageAlt: 'Well-kept commercial grounds and planting outside a business premises',
    body: [
      {
        heading: 'Your grounds are the first thing people see',
        paragraphs: [
          'Clients, staff and visitors have all made their mind up before they get through the door. We keep the place looking sharp all year, on a schedule and a budget that work for you.',
          'Visits go in when they suit you. Early mornings before staff arrive, quiet periods for schools, or outside trading hours for pubs and shops.',
        ],
      },
      {
        heading: 'You deal with me',
        paragraphs: [
          'No call centre. We agree the schedule up front, the invoices are clear, and we carry public liability insurance. If something needs sorting between visits, one call does it.',
          'We can take on one off jobs alongside a contract too. A car park tidy, new planting at the entrance, a fence repaired, or a full landscaping job.',
        ],
      },
    ],
    includes: [
      'Scheduled grounds and lawn maintenance',
      'Hedges, shrubs and trees managed',
      'Weed control on car parks and hard surfaces',
      'Planting at entrances and receptions',
      'Leaf clearance and winter tidies',
      'Litter picked before every cut',
      'One off landscaping and fencing',
      'Flexible contracts, invoiced monthly',
    ],
    faqs: [
      {
        q: 'Do you offer contracts or pay-as-you-go?',
        a: 'Either. Most commercial customers want a fixed schedule and a monthly invoice so they can budget, but we are happy to work as needed.',
      },
      {
        q: 'Are you insured for commercial work?',
        a: 'Yes. We carry public liability insurance, and I can send over the details and risk assessments whenever you need them.',
      },
      {
        q: 'Can you work outside business hours?',
        a: 'Yes. Early starts and out of hours visits are normal for sites where working in the day would get in the way.',
      },
      {
        q: 'What size of site do you take on?',
        a: 'Anything from a single office frontage up to multi building grounds. If a site is too big for us to do properly, I will tell you straight rather than take it on.',
      },
    ],
    gallery: [images['jw-g6'], images['jw-g8'], images['jw-work-20250507_134138']],
  },
];

export const getService = (slug?: string) => services.find((s) => s.slug === slug);
