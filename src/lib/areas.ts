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
    seoTitle: 'Gardeners in Aylesbury | Weekly Garden Maintenance',
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
    seoTitle: 'Gardeners in Bierton | Village Garden Maintenance',
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
    seoTitle: 'Gardeners in Wendover | Garden Maintenance',
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
    seoTitle: 'Gardeners in Wing | Garden Maintenance & Hedges',
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
  {
    slug: 'gardeners-in-stone',
    town: 'Stone',
    h1: 'Gardeners in Stone',
    eyebrow: 'Stone, Bishopstone & Hartwell',
    seoTitle: 'Gardeners in Stone, Aylesbury | Garden Maintenance',
    seoDescription:
      'Gardener near you in Stone, Bishopstone and Hartwell: weekly garden maintenance, hedge cutting, lawn care and planting. Free quotes and all green waste removed.',
    intro:
      'Stone is only a few minutes down the A418 from our Bierton base, so it is one of the villages we visit most — weekly and fortnightly maintenance, hedges, borders and small landscaping projects.',
    image: images['jw-g5'],
    imageAlt: 'Neat village lawn and borders in Stone near Aylesbury',
    body: [
      {
        heading: 'A village round, five minutes from base',
        paragraphs: [
          'Stone, Bishopstone and Hartwell sit on our main route out of Aylesbury, which makes them easy villages for us to keep on a fixed weekly or fortnightly day. Several gardens on the Oxford Road side have been with us for years.',
          'Because we are so close, we can also fit in the small extras that make a difference — a quick cut before visitors arrive, pots watered in a heatwave, or leaves cleared after a windy week in November.',
        ],
      },
      {
        heading: 'Long plots, old hedges and open views',
        paragraphs: [
          'Plenty of Stone gardens are long rear plots backing onto fields or the old hospital grounds, with mature boundary hedges that need proper annual cutting rather than a quick trim.',
          'Soil here is heavy Vale clay, so lawns compact and sit wet in winter. Aerating in autumn and keeping the cut a little higher in summer makes far more difference than extra feed, and borders repay having grit and compost worked in before planting.',
        ],
      },
    ],
    localNotes: [
      'Around 5 minutes from our Bierton base',
      'Regular weekly and fortnightly rounds in Stone, Bishopstone and Hartwell',
      'Experienced with heavy Vale clay soil and wet winter lawns',
      'All clippings and hedge waste taken away',
    ],
    nearby: ['Aylesbury', 'Bierton', 'Haddenham', 'Waddesdon'],
    postcodes: 'HP17',
    travelTime: 'About 10 minutes from Bierton',
    distanceMiles: 5,
    faqs: [
      {
        q: 'Do you cover Bishopstone and Hartwell too?',
        a: 'Yes — they are on the same round as Stone, so there is no extra travel charge and we can usually offer the same visit day.',
      },
      {
        q: 'My lawn is waterlogged every winter. Can you help?',
        a: 'Usually, yes. Clay lawns around Stone respond well to autumn aeration, sensible mowing heights and top dressing. Where water genuinely has nowhere to go we will say so and suggest drainage or planting instead of selling you treatments that will not work.',
      },
      {
        q: 'Can you do a one-off tidy before we sell?',
        a: 'Of course. Pre-sale tidies are a big part of what we do locally, and there is no obligation to book anything regular afterwards.',
      },
    ],
    gallery: [images['jw-g1'], images['jw-maint-2'], images['jw-g9']],
  },
  {
    slug: 'gardeners-in-waddesdon',
    town: 'Waddesdon',
    h1: 'Gardeners in Waddesdon',
    eyebrow: 'Waddesdon & the Quainton side',
    seoTitle: 'Gardeners in Waddesdon | Garden Maintenance',
    seoDescription:
      'Local gardener for Waddesdon, Quainton and Whitchurch: weekly garden maintenance, hedge cutting, lawns, borders and landscaping. Free quotes, waste removed.',
    intro:
      'Waddesdon and the villages around it have some of the loveliest gardens in the Vale — bigger plots, stone walls and long hedges. We look after them on regular rounds and as one-off projects.',
    image: images['jw-g4'],
    imageAlt: 'Country garden in Waddesdon with clipped hedges and planted borders',
    body: [
      {
        heading: 'Country gardens with a bit of formality',
        paragraphs: [
          'Waddesdon gardens often have a formal element — clipped hedging, a lawn with real shape to it, roses and structured borders. That style only looks right when it is cut regularly and cut straight, which is exactly what a fixed weekly visit is for.',
          'We keep edges crisp, hedges square and borders weeded through the season, so the garden always looks intentional rather than catching up after a growth spurt.',
        ],
      },
      {
        heading: 'Walls, gravel and larger boundaries',
        paragraphs: [
          'Stone walls, gravel drives and long roadside hedges are common here, and all three need work most town gardens do not: wall borders planted to soften the stone, gravel kept weed-free, and hedges cut on a proper annual cycle.',
          'We also take on larger jobs around Waddesdon, Quainton and Whitchurch — new paths, patios, planting schemes and full clearances of gardens that have got ahead of their owners.',
        ],
      },
    ],
    localNotes: [
      'Around 10 minutes from our Bierton base',
      'Covers Waddesdon, Quainton, Whitchurch and Upper Winchendon',
      'Experienced with formal hedging, roses and structured borders',
      'Gravel, drives and long roadside hedges kept clear',
    ],
    nearby: ['Aylesbury', 'Bierton', 'Stone', 'Buckingham'],
    postcodes: 'HP18',
    travelTime: 'Around 10 minutes from Bierton',
    distanceMiles: 6,
    faqs: [
      {
        q: 'Do you cut formal hedges and topiary?',
        a: 'Yes. Box, yew, beech and hornbeam hedging are regular work for us, and we cut to a line rather than by eye so the shape stays true year to year.',
      },
      {
        q: 'Can you look after a larger country garden on your own schedule?',
        a: 'We can. For bigger Waddesdon gardens we usually agree a seasonal plan — weekly cutting through the growing season, hedge cuts in late summer, pruning and clearing in winter.',
      },
      {
        q: 'Do you charge extra to come out to the villages?',
        a: 'No. Waddesdon, Quainton and Whitchurch are part of our normal round, so prices match our Aylesbury customers.',
      },
    ],
    gallery: [images['jw-g6'], images['jw-g7'], images['jw-g2']],
  },
  {
    slug: 'gardeners-in-haddenham',
    town: 'Haddenham',
    h1: 'Gardeners in Haddenham',
    eyebrow: 'Haddenham & Cuddington',
    seoTitle: 'Gardeners in Haddenham | Weekly Garden Maintenance',
    seoDescription:
      'Gardener near you in Haddenham, Cuddington and Long Crendon: weekly garden maintenance, hedge cutting, lawn care and planting. Free quotes, all waste removed.',
    intro:
      'Haddenham is a short run from Bierton down the A418, and we work across the village and out towards Cuddington and Long Crendon — regular maintenance, hedges, borders and landscaping.',
    image: images['jw-maint-1'],
    imageAlt: 'Striped lawn and cottage borders in a Haddenham garden',
    body: [
      {
        heading: 'Wychert walls and cottage gardens',
        paragraphs: [
          'Haddenham is known for its wychert walls, and the gardens behind them are often older cottage plots: mixed borders, fruit trees, gravel paths and lawns that are rarely a simple rectangle. They need a gardener who will work around what is already there rather than tidy it into blandness.',
          'Our regular visits here are mostly cutting, edging, weeding and dead-heading through the season, with pruning and mulching in the quieter months to keep the planting healthy.',
        ],
      },
      {
        heading: 'Newer estates and bigger lawns',
        paragraphs: [
          'The newer parts of the village towards the station have larger, flatter lawns and young boundary hedges. Those benefit most from lawn treatment through the year and from getting the hedges cut properly early on so they thicken from the base.',
          'Whichever end of Haddenham you are in, everything we cut leaves with us — nothing is left bagged up for your green bin.',
        ],
      },
    ],
    localNotes: [
      'About 15 minutes from our Bierton base',
      'Covers Haddenham, Cuddington, Long Crendon and Dinton',
      'Comfortable working in older cottage gardens and mixed borders',
      'Lawn treatment programmes for the newer estates',
    ],
    nearby: ['Aylesbury', 'Stone', 'Bierton', 'Wendover'],
    postcodes: 'HP17, HP18',
    travelTime: 'Around 15 minutes from Bierton',
    distanceMiles: 8,
    faqs: [
      {
        q: 'Do you cover Cuddington and Long Crendon as well?',
        a: 'Yes — they sit on the same round as Haddenham, so you get the same fixed visit day and the same pricing.',
      },
      {
        q: 'Will you prune old fruit trees?',
        a: 'We will. Apple and pear trees in older Haddenham gardens are usually worth restoring rather than replacing, and we prune them in winter to bring the shape and cropping back gradually.',
      },
      {
        q: 'Can you keep a garden tidy while we rent the house out?',
        a: 'Yes. We look after several let and holiday properties locally, invoice monthly and can report anything that needs attention.',
      },
    ],
    gallery: [images['jw-maint-3'], images['jw-g3'], images['jw-g5']],
  },
  {
    slug: 'gardeners-in-tring',
    town: 'Tring',
    h1: 'Gardeners in Tring',
    eyebrow: 'Tring & the Herts border',
    seoTitle: 'Gardeners in Tring | Garden Maintenance',
    seoDescription:
      'Gardener near you in Tring, Wilstone and Long Marston: weekly garden maintenance, hedge cutting, patios and planting. Free quotes and all green waste removed.',
    intro:
      'Tring sits just over the county line from us and is an easy run along the A41 — we cover the town, the Tring reservoirs villages and out towards Aldbury with regular maintenance and landscaping.',
    image: images['jw-g8'],
    imageAlt: 'Landscaped garden in Tring with stone patio and clipped hedging',
    body: [
      {
        heading: 'Town gardens, and Chilterns slopes above them',
        paragraphs: [
          'Tring gardens split into two types. In the town, Victorian terraces and 1930s semis have long narrow plots with high boundary hedges and a lot of shade — the work is about keeping structure and light rather than adding more plants.',
          'Above the town, towards Aldbury and the Chilterns, gardens are bigger, chalkier and often sloping. There we do more hard landscaping: steps, retaining walls, terraced beds and level patios that make a bank usable.',
        ],
      },
      {
        heading: 'Chalk soil and what actually grows',
        paragraphs: [
          'Soil around Tring is thin and chalky, which suits lavender, box, hellebores, viburnum and ornamental grasses far better than the acid-lovers often sold as easy wins. Planting to suit the soil means fewer replacements two summers later.',
          'Lawns on chalk dry out quickly in July. We raise the cut through summer and feed in autumn rather than fighting it with water, and it comes back better each year.',
        ],
      },
    ],
    localNotes: [
      'About 20 minutes from our Bierton base along the A41',
      'Covers Tring, Wilstone, Long Marston, Aldbury and Marsworth',
      'Chalk-soil planting and terracing on sloping plots',
      'Patios, steps and retaining walls built with drainage designed in',
    ],
    nearby: ['Wendover', 'Aylesbury', 'Wing', 'Bierton'],
    postcodes: 'HP23',
    travelTime: 'About 20 minutes from Bierton',
    distanceMiles: 11,
    faqs: [
      {
        q: 'Do you actually cover Hertfordshire?',
        a: 'Yes — Tring and the surrounding villages are a regular part of our round, even though we are based in Buckinghamshire. It is a 20-minute run for us.',
      },
      {
        q: 'Can you build a patio or steps on a sloping garden?',
        a: 'That is one of our main landscaping jobs around Tring. We set levels properly, build in drainage and finish with planting so the new structure does not look raw.',
      },
      {
        q: 'What is the best planting for chalk soil?',
        a: 'Lavender, box, hellebores, geraniums, viburnum and grasses all thrive. We will avoid rhododendron, camellia and other acid-lovers that struggle here however well they are fed.',
      },
    ],
    gallery: [images['jw-g2'], images['jw-landscaping'], images['jw-g3']],
  },
  {
    slug: 'gardeners-in-leighton-buzzard',
    town: 'Leighton Buzzard',
    h1: 'Gardeners in Leighton Buzzard',
    eyebrow: 'Leighton Buzzard & Linslade',
    seoTitle: 'Gardeners in Leighton Buzzard | Garden Maintenance',
    seoDescription:
      'Local gardener for Leighton Buzzard and Linslade: weekly garden maintenance, lawn care, hedge cutting, patios and planting. Free quotes, all waste taken away.',
    intro:
      'Leighton Buzzard and Linslade are a straight run from us through Wing, so they are part of our regular round — weekly and fortnightly maintenance, hedge cutting and landscaping projects.',
    image: images['jw-maint-2'],
    imageAlt: 'Well-kept lawn and borders in a Leighton Buzzard garden',
    body: [
      {
        heading: 'A regular gardener you actually see',
        paragraphs: [
          'Most of our Leighton Buzzard customers are on a fixed weekly or fortnightly visit through the growing season, then a lighter winter schedule for pruning, leaf clearing and tidying. Same day, same van, same person.',
          'We come through Wing to get here, so we can keep visit days consistent rather than shuffling you around the round each week.',
        ],
      },
      {
        heading: 'Sandy soil, fast lawns and new-build plots',
        paragraphs: [
          'The greensand round Leighton Buzzard drains fast, which is a blessing in winter and a problem in July — lawns brown off quickly and borders need mulching to hold moisture. We feed lawns in autumn and mulch borders in spring, which does more than watering ever will.',
          'On the newer estates towards Linslade and Sandhills, gardens usually start as flat turf and a fence. We help those along with lawn treatment, soil improvement and planting that fills the borders out within a couple of seasons.',
        ],
      },
    ],
    localNotes: [
      'Around 20 minutes from our Bierton base',
      'Covers Leighton Buzzard, Linslade, Heath and Reach and Stewkley',
      'Experienced with fast-draining sandy soil and summer lawn stress',
      'Green waste removed on every visit',
    ],
    nearby: ['Wing', 'Aylesbury', 'Bierton', 'Wendover'],
    postcodes: 'LU7',
    travelTime: 'About 20 minutes from Bierton',
    distanceMiles: 11,
    faqs: [
      {
        q: 'Do you cover Bedfordshire?',
        a: 'Yes. Leighton Buzzard and Linslade are on our regular round via Wing, and there is no extra travel charge.',
      },
      {
        q: 'My lawn goes brown every summer. What helps?',
        a: 'On sandy soil the answer is usually a higher cut, autumn feeding and leaving clippings occasionally rather than constant watering. It builds a deeper-rooted lawn that copes far better the following year.',
      },
      {
        q: 'Can you plant up a bare new-build garden?',
        a: 'Yes — that is a common job here. We improve the soil first, then plant borders with a mix that gives you structure straight away and fills out over two or three seasons.',
      },
    ],
    gallery: [images['jw-maint-4'], images['jw-g1'], images['jw-g7']],
  },
  {
    slug: 'gardeners-in-great-missenden',
    town: 'Great Missenden',
    h1: 'Gardeners in Great Missenden',
    eyebrow: 'Great Missenden & the Misbourne valley',
    seoTitle: 'Gardeners in Great Missenden | Garden Maintenance',
    seoDescription:
      'Gardener near you in Great Missenden, Prestwood and Little Kingshill: weekly garden maintenance, hedge cutting, terracing and planting. Free quotes, waste removed.',
    intro:
      'Great Missenden sits in the Misbourne valley in the heart of the Chilterns — wooded, sloping and chalky. We maintain gardens here weekly and fortnightly and build the terracing that makes them usable.',
    image: images['jw-landscaping'],
    imageAlt: 'Terraced Chilterns garden near Great Missenden with stone steps and planting',
    body: [
      {
        heading: 'Woodland edges and dry shade',
        paragraphs: [
          'Almost every garden around Great Missenden and Prestwood has trees on or over a boundary. That means dry shade, root competition and a constant supply of leaves — three things that defeat a standard mow-and-go service.',
          'We work with it instead: shade-tolerant grass mixes and a higher cut where lawn matters, ground-cover planting where it never will, and proper leaf clearance in autumn so the lawn is not smothered all winter.',
        ],
      },
      {
        heading: 'Levels, steps and retaining structure',
        paragraphs: [
          'Valley-side plots need structure before they need planting. Retaining walls, timber or sleeper terracing, steps and level patio areas turn a bank you cannot use into the best part of the garden, and we build them with drainage designed in from the start.',
          'Once the structure is in, we keep it — regular visits to maintain the terraces, hedges and borders so it still looks right in five years.',
        ],
      },
    ],
    localNotes: [
      'Around 25 minutes from our Bierton base',
      'Covers Great Missenden, Prestwood, Little Kingshill and Ballinger',
      'Specialists in sloping Chilterns plots, terracing and steps',
      'Dry-shade planting and autumn leaf clearance',
    ],
    nearby: ['Wendover', 'Amersham', 'Chesham', 'Aylesbury'],
    postcodes: 'HP16',
    travelTime: 'About 25 minutes from Bierton',
    distanceMiles: 12,
    faqs: [
      {
        q: 'Can anything grow under my beech trees?',
        a: 'Yes, though not lawn. Epimedium, hellebores, ferns, geraniums and spring bulbs cope well with dry shade, and a mulched bed with a mown path through it often looks better than struggling grass.',
      },
      {
        q: 'Do you build retaining walls and steps?',
        a: 'Regularly — sloping gardens are most of our landscaping work in this area. We handle everything from a single set of steps to full terracing with planted beds.',
      },
      {
        q: 'Do you clear leaves in autumn?',
        a: 'Yes. In wooded Chilterns gardens we usually schedule extra autumn visits purely for leaf clearance, and everything is taken away.',
      },
    ],
    gallery: [images['jw-g3'], images['jw-g8'], images['jw-g2']],
  },
  {
    slug: 'gardeners-in-chesham',
    town: 'Chesham',
    h1: 'Gardeners in Chesham',
    eyebrow: 'Chesham & the Chess valley',
    seoTitle: 'Gardeners in Chesham | Garden Maintenance & Hedges',
    seoDescription:
      'Gardener near you in Chesham, Chesham Bois and Ashley Green: weekly garden maintenance, hedge cutting, patios and planting. Free quotes and all waste removed.',
    intro:
      'Chesham gardens are steep, leafy and often surprisingly large for a town. We cover Chesham, Chesham Bois and the Chess valley with regular maintenance and hard landscaping.',
    image: images['jw-g7'],
    imageAlt: 'Chesham garden with mown lawn, mature hedge and stone path',
    body: [
      {
        heading: 'Steep town gardens, properly managed',
        paragraphs: [
          'Chesham is built across a valley, so a lot of gardens rise steeply behind the house. Mowing a bank is slow and often unsafe, which is why we either terrace it or convert the steepest sections to planting and a mown path.',
          'For the flatter sections we run the same regular service as everywhere else — cutting, edging, weeding and hedge work on a fixed weekly or fortnightly day.',
        ],
      },
      {
        heading: 'Hedges, boundaries and privacy',
        paragraphs: [
          'Hedge cutting is the single most requested job here. Long laurel, conifer and beech boundaries between close-set houses are what give Chesham gardens their privacy, and they need cutting properly once or twice a year to stay dense rather than gappy and bare-legged.',
          'We cut with a straight line and take everything away, including the awkward top growth that most people cannot safely reach.',
        ],
      },
    ],
    localNotes: [
      'Around 30 minutes from our Bierton base',
      'Covers Chesham, Chesham Bois, Ashley Green and Hyde Heath',
      'Set up for steep gardens, banks and terracing',
      'Tall hedge cutting with all waste removed',
    ],
    nearby: ['Amersham', 'Great Missenden', 'Wendover', 'Tring'],
    postcodes: 'HP5',
    travelTime: 'About 30 minutes from Bierton',
    distanceMiles: 17,
    faqs: [
      {
        q: 'Will you work on a steep bank?',
        a: 'Yes, within reason. We assess it first — sometimes the right answer is terracing or planting rather than trying to mow a slope that will never be safe or look good.',
      },
      {
        q: 'Can you cut a very tall hedge?',
        a: 'We cut most domestic hedges including tall laurel and conifer boundaries, and everything is cleared away afterwards. If a hedge needs full tree work we will tell you honestly.',
      },
      {
        q: 'Is there a minimum visit for Chesham?',
        a: 'Because it is a longer run for us, we usually ask for a regular booking or a job of at least half a day here. Get in touch and we will be straight with you about what works.',
      },
    ],
    gallery: [images['jw-g9'], images['jw-g6'], images['jw-g5']],
  },
  {
    slug: 'gardeners-in-amersham',
    town: 'Amersham',
    h1: 'Gardeners in Amersham',
    eyebrow: 'Amersham & Old Amersham',
    seoTitle: 'Gardeners in Amersham | Garden Maintenance',
    seoDescription:
      'Gardener near you in Amersham, Old Amersham and Little Chalfont: weekly garden maintenance, hedge cutting, patios and planting. Free quotes, all green waste removed.',
    intro:
      'Amersham has two very different sets of gardens — the older cottage plots down in the town and the larger hillside gardens on the Hill. We look after both with regular maintenance and landscaping.',
    image: images['jw-g1'],
    imageAlt: 'Established Amersham garden with lawn, hedging and mature planting',
    body: [
      {
        heading: 'Old Amersham and Amersham on the Hill',
        paragraphs: [
          'Down in Old Amersham the gardens are older and more intricate — walled plots, mixed borders, brick paths and mature trees. The work is careful pruning, border management and keeping the structure that is already there in good order.',
          'Up on the Hill, the 1930s and post-war houses have larger, more open gardens with big lawns and substantial boundary hedges. Those suit a straightforward weekly cut-and-edge with hedge work booked in seasonally.',
        ],
      },
      {
        heading: 'Established gardens kept established',
        paragraphs: [
          'Amersham has a lot of gardens that were planted well thirty or forty years ago and have quietly outgrown themselves. Bringing them back is usually pruning, thinning and clearing rather than starting again, and it costs a fraction of a redesign.',
          'Where a garden does need reworking, we handle the landscaping too — patios, paths, new borders and planting that suits the chalky Chilterns soil.',
        ],
      },
    ],
    localNotes: [
      'Around 30 minutes from our Bierton base',
      'Covers Amersham, Old Amersham, Little Chalfont and Chesham Bois',
      'Careful pruning and restoration of mature, established gardens',
      'Patios, paths and chalk-suited planting',
    ],
    nearby: ['Chesham', 'Great Missenden', 'Wendover', 'Aylesbury'],
    postcodes: 'HP6, HP7',
    travelTime: 'About 30 minutes from Bierton',
    distanceMiles: 17,
    faqs: [
      {
        q: 'Can you restore an overgrown established garden?',
        a: 'Usually yes, and it is one of our favourite jobs. We work through it in stages — clearing, then structural pruning, then replanting the gaps — so the garden keeps its maturity instead of being flattened.',
      },
      {
        q: 'Do you take on regular weekly visits in Amersham?',
        a: 'We do, though because it is a longer run we prefer to group Amersham and Chesham customers on the same day. Ask us which day we are in the area.',
      },
      {
        q: 'Do you clear everything away?',
        a: 'Always. All clippings, prunings and hedge waste leave with us and are disposed of responsibly.',
      },
    ],
    gallery: [images['jw-g4'], images['jw-maint-1'], images['jw-g8']],
  },
];

export const getArea = (slug?: string) => areas.find((a) => a.slug === slug);
