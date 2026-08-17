import { images, type ResponsiveImage } from '@/lib/images';

export interface AreaContent {
  slug: string;
  town: string;
  h1: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  image: ResponsiveImage;
  imageAlt: string;
  body: { heading: string; paragraphs: string[] }[];
  localNotes: string[];
  nearby: string[];
  faqs: { q: string; a: string }[];
  gallery: ResponsiveImage[];
  postcodes: string;
  travelTime: string;
  distanceMiles: number;
}

export const areas: AreaContent[] = [
  {
    slug: 'gardeners-in-aylesbury',
    town: 'Aylesbury',
    h1: 'Gardeners in Aylesbury',
    eyebrow: 'Local to Aylesbury',
    seoTitle: 'Gardeners in Aylesbury | Weekly Garden Maintenance | JW Garden Services',
    seoDescription:
      'Looking for a gardener near you in Aylesbury? JW Garden Services offers weekly garden maintenance, landscaping and planting across Aylesbury and HP19–HP22. Free quotes, all waste taken away.',
    intro:
      'Searching for a gardener near you in Aylesbury? We are based in Bierton, two miles from the town centre, so Aylesbury is the area we work in most — weekly garden maintenance, patios, fencing and planting, with all the clippings taken away.',
    image: images['jw-maint-1'],
    imageAlt: 'Freshly striped lawn in an Aylesbury garden maintained by JW Garden Services',
    body: [
      {
        heading: 'Your local gardener, minutes away',
        paragraphs: [
          'JW Garden Services has looked after Aylesbury gardens since 2017. Because we are based in Bierton on the edge of town, we can be with you in a few minutes — which is why so many of our regular weekly customers are in Aylesbury itself, from Fairford Leys and Watermead through to Berryfields, Quarrendon, Elmhurst, Walton Court and Stoke Mandeville.',
          'Being genuinely local matters more than it sounds. It means we can keep the same day every week, drop in for a quick extra visit before a party or a house viewing, and turn up in the same van with the same face every time rather than sending whoever is available.',
        ],
      },
      {
        heading: 'What Aylesbury gardens usually need',
        paragraphs: [
          'A lot of Aylesbury homes are newer builds on the Berryfields and Kingsbrook side of town, where gardens start as flat turf over builder-compacted clay soil. Those lawns need feeding and aerating to thicken up, and borders need soil improving before planting is worth doing. We do both.',
          'Closer to the centre, the older Victorian and 1930s streets around Walton and Bedgrove tend to have long narrow gardens with mature hedges, established shrubs and fruit trees that mostly need proper pruning at the right time of year rather than replacing.',
          'Whichever you have, the aim is the same: a garden that always looks presentable, without you having to spend your weekend on it.',
        ],
      },
    ],
    localNotes: [
      'Based in Bierton — around 5 minutes from Aylesbury town centre',
      'Regular weekly rounds in Fairford Leys, Bedgrove, Berryfields and Watermead',
      'Experienced with new-build clay soil and compacted lawns',
      'Green waste removed on every visit, so nothing fills your brown bin',
    ],
    nearby: ['Bierton', 'Stone', 'Wing', 'Haddenham'],
    postcodes: 'HP17, HP18, HP19, HP20, HP21, HP22',
    travelTime: 'About 5 minutes from our base in Bierton',
    distanceMiles: 2,
    faqs: [
      {
        q: 'Are you the closest gardener to me in Aylesbury?',
        a: 'If you are in Aylesbury or one of the surrounding estates, we are almost certainly one of the closest professional gardeners to you — our base is in Bierton, on the northern edge of the town. Give us your postcode and we will confirm straight away.',
      },
      {
        q: 'How much does a gardener cost in Aylesbury?',
        a: 'It depends on the size of the garden and how often you want us. Most regular Aylesbury customers are on a weekly or fortnightly visit during the growing season, and we quote a fixed price per visit so there are no surprises. Quotes are free and we will tell you honestly if fortnightly would do.',
      },
      {
        q: 'Do you cover the new estates like Berryfields and Kingsbrook?',
        a: 'Yes — we work on both regularly. New-build gardens usually need lawn treatments and soil improvement early on, and we are happy to explain what will make the biggest difference first.',
      },
      {
        q: 'Can you do a one-off tidy rather than a regular visit?',
        a: 'Absolutely. Plenty of Aylesbury jobs start as a one-off clearance or pre-sale tidy, and you are under no obligation to book anything regular afterwards.',
      },
    ],
    gallery: [images['jw-maint-2'], images['jw-g1'], images['jw-g5']],
  },
  {
    slug: 'gardeners-in-bierton',
    town: 'Bierton',
    h1: 'Gardeners in Bierton',
    eyebrow: 'Our home village',
    seoTitle: 'Gardeners in Bierton | Village Garden Maintenance | JW Garden Services',
    seoDescription:
      'JW Garden Services is based in Bierton — your nearest local gardener for weekly maintenance, hedge cutting, patios and planting in Bierton and Broughton. Free quotes.',
    intro:
      'Bierton is home. JW Garden Services is based in the village, so if you are looking for a gardener near you in Bierton we are quite literally round the corner — weekly maintenance, hedge cutting, borders and landscaping.',
    image: images['jw-g4'],
    imageAlt: 'Village garden in Bierton with neat lawn and planted borders',
    body: [
      {
        heading: 'The village gardener, based in the village',
        paragraphs: [
          'We run JW Garden Services from Bierton, which means no travel charges, easy scheduling and the flexibility to pop back if something needs finishing. Several of our Bierton customers have been with us since we started in 2017.',
          'Working where you live also keeps you honest. A garden we look after on Burcott Lane or off the Aylesbury Road is one we drive past every day, so standards matter to us as much as they do to you.',
        ],
      },
      {
        heading: 'Village gardens, hedges and open boundaries',
        paragraphs: [
          'Bierton gardens tend to be larger than town plots, often with long field-facing boundaries, mature native hedges and old fruit trees. Hedge work is a big part of what we do here — cutting them properly on a yearly cycle keeps them thick and stock-proof rather than gappy at the base.',
          'We also do a lot of seasonal work around the newer developments off the Aylesbury Road, where lawns need establishing and borders need filling out with planting that copes with the exposed, windy boundaries you get on the edge of the village.',
        ],
      },
    ],
    localNotes: [
      'Based in Bierton — no travel time, no travel charge',
      'Specialists in native hedge cutting and long rural boundaries',
      'Happy to hold keys and gate codes for regular village customers',
      'Local references available from neighbours in the village',
    ],
    nearby: ['Aylesbury', 'Wing', 'Stone', 'Wendover'],
    postcodes: 'HP22',
    travelTime: 'We are in the village — same-day visits possible',
    distanceMiles: 0,
    faqs: [
      {
        q: 'Are you actually based in Bierton?',
        a: 'Yes — JW Garden Services operates from Bierton, Aylesbury. It is the reason we can be so flexible with Bierton customers and often fit small extra jobs in at short notice.',
      },
      {
        q: 'Do you cut long rural hedges and field boundaries?',
        a: 'Regularly. We cut native hedges, laurel, conifer and mixed boundaries, and we time the work outside bird nesting season wherever possible. All the cuttings are taken away.',
      },
      {
        q: 'Can you look after a garden while we are away?',
        a: 'Yes. For village customers we are happy to keep an eye on things, water pots and keep the garden presentable while you are on holiday.',
      },
    ],
    gallery: [images['jw-g6'], images['jw-g7'], images['jw-g9']],
  },
  {
    slug: 'gardeners-in-wendover',
    town: 'Wendover',
    h1: 'Gardeners in Wendover',
    eyebrow: 'Wendover & the Chilterns edge',
    seoTitle: 'Gardeners in Wendover | Garden Maintenance & Landscaping | JW Garden Services',
    seoDescription:
      'Gardener near you in Wendover: weekly garden maintenance, hedge cutting, patios and planting for Wendover, Halton and the Chilterns edge. Free quotes, waste removed.',
    intro:
      'Wendover sits right on the Chilterns escarpment, and its gardens show it — sloping plots, chalky soil and plenty of shade from mature trees. We look after gardens here weekly, fortnightly and as one-off projects.',
    image: images['jw-landscaping'],
    imageAlt: 'Sloping Chilterns garden near Wendover with stone patio and planted borders',
    body: [
      {
        heading: 'Gardening on the Chilterns edge',
        paragraphs: [
          'Wendover gardens are some of the prettiest we work in and some of the most demanding. Plots often slope, soil is thin and chalky over the escarpment, and the tree cover from the surrounding beech woods means large parts of many gardens are in dry shade for most of the day.',
          'That changes what actually works. Lawns in dry shade need the right seed mix and a higher cut; borders do far better with chalk-tolerant planting than with the acid-loving shrubs the garden centre puts at the front. We choose plants that will still look good in five years rather than just on planting day.',
        ],
      },
      {
        heading: 'Terracing, steps and levels',
        paragraphs: [
          'Because so many Wendover gardens slope, a lot of our work here is hard landscaping: retaining walls, terraced beds, steps and level patios that turn an awkward bank into usable space. We build it properly, with drainage designed in, so it stays put.',
          'We also handle the ongoing maintenance afterwards — a terraced garden looks fantastic but needs regular attention to stay that way, and we can keep it on a weekly or fortnightly round with the rest of the Wendover area.',
        ],
      },
    ],
    localNotes: [
      'About 15 minutes from our Bierton base',
      'Experienced with chalk soil, dry shade and sloping plots',
      'Retaining walls, terracing and steps built to last',
      'Covers Wendover, Halton, Weston Turville and Aston Clinton',
    ],
    nearby: ['Aylesbury', 'Bierton', 'Wing', 'Tring'],
    postcodes: 'HP22',
    travelTime: 'Around 15 minutes from Bierton',
    distanceMiles: 7,
    faqs: [
      {
        q: 'Do you work on steep or terraced gardens in Wendover?',
        a: 'Yes — sloping gardens are one of the things we do most around Wendover, from routine maintenance on terraced plots to building new retaining walls, steps and level patio areas.',
      },
      {
        q: 'What plants work on Wendover chalk soil?',
        a: 'Chalk-loving plants such as lavender, hellebores, box, viburnum, geraniums and ornamental grasses do far better than acid-loving shrubs like rhododendron or camellia. We will plant to suit your soil so you are not replacing things in two years.',
      },
      {
        q: 'Can you cut grass under trees where nothing grows?',
        a: 'We can improve it — a shade-tolerant seed mix, a slightly higher cut and some feeding usually makes a big difference. Where grass will never work, ground-cover planting or a bark path often looks better anyway.',
      },
    ],
    gallery: [images['jw-g2'], images['jw-g3'], images['jw-g8']],
  },
  {
    slug: 'gardeners-in-wing',
    town: 'Wing',
    h1: 'Gardeners in Wing',
    eyebrow: 'Wing & the Leighton Buzzard side',
    seoTitle: 'Gardeners in Wing | Garden Maintenance & Hedge Cutting | JW Garden Services',
    seoDescription:
      'Local gardener for Wing, Cublington and Stewkley: weekly garden maintenance, hedge cutting, lawn care, patios and planting. Free quotes, all waste removed.',
    intro:
      'We cover Wing and the surrounding villages on the Leighton Buzzard side of Aylesbury — larger village gardens, long hedges and paddock boundaries, kept tidy on a regular round.',
    image: images['jw-maint-3'],
    imageAlt: 'Large village garden in Wing with mown lawn and mature hedge',
    body: [
      {
        heading: 'Bigger gardens, done on a proper schedule',
        paragraphs: [
          'Village gardens in Wing are generally bigger than the town average, with more lawn, longer hedges and often a bit of orchard or paddock edge. That suits a regular arrangement: we come the same day each week or fortnight and work through a set list, so nothing is ever left to get out of hand.',
          'Larger lawns are where a proper mower earns its keep. We cut, edge and stripe in one visit, and we adjust the height through the season so the grass copes with dry Julys instead of scorching.',
        ],
      },
      {
        heading: 'Hedges, trees and the wilder edges',
        paragraphs: [
          'Hedge cutting is the other big job around Wing, Cublington and Stewkley — mixed native hedges, hawthorn, laurel and conifer, plus the boundaries between gardens and open fields. We cut them on a sensible annual cycle, keeping them dense at the base.',
          'We are also happy to leave part of a bigger garden deliberately less manicured: a mown path through longer grass, bulbs left to die back and a wilder corner for wildlife looks right in a village garden and takes less work to keep.',
        ],
      },
    ],
    localNotes: [
      'Around 15 minutes from Bierton',
      'Set up for larger village lawns and long hedges',
      'Covers Wing, Cublington, Stewkley and towards Leighton Buzzard',
      'All clippings and hedge waste taken away',
    ],
    nearby: ['Aylesbury', 'Bierton', 'Leighton Buzzard', 'Wendover'],
    postcodes: 'LU7, HP22',
    travelTime: 'Around 15 minutes from Bierton',
    distanceMiles: 7,
    faqs: [
      {
        q: 'Do you take on large village gardens?',
        a: 'Yes — large lawns, long hedges and paddock edges are normal for us around Wing. We will walk the garden with you and quote a fixed price per visit based on what it actually needs.',
      },
      {
        q: 'How often do hedges need cutting?',
        a: 'Most garden hedges are fine with one good cut a year, ideally late summer; fast growers like laurel and privet look better with two. We time cuts to avoid disturbing nesting birds where we can.',
      },
      {
        q: 'Do you charge extra to travel out to the villages?',
        a: 'No. Wing and the surrounding villages are part of our normal round, so you pay the same as our Aylesbury customers.',
      },
    ],
    gallery: [images['jw-maint-4'], images['jw-g5'], images['jw-g1']],
  },
];

export const getArea = (slug?: string) => areas.find((a) => a.slug === slug);
