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
      'Gardener near you in Aylesbury: weekly garden maintenance, landscaping and planting across Aylesbury and HP19 to HP22. Free quotes.',
    intro:
      'Looking for a gardener near you in Aylesbury? We are based in Bierton, two miles from the town centre, so Aylesbury is where we work most. Weekly maintenance, patios, fencing and planting.',
    image: images['jw-maint-1'],
    imageAlt: 'Freshly striped lawn in an Aylesbury garden maintained by JW Garden Services',
    body: [
      {
        heading: 'We are minutes away',
        paragraphs: [
          'We have looked after Aylesbury gardens since 2017. Being based in Bierton on the edge of town means we can be with you in a few minutes, which is why most of our weekly customers are in Aylesbury itself. Fairford Leys, Watermead, Berryfields, Quarrendon, Elmhurst, Walton Court and Stoke Mandeville.',
          'Being local matters more than it sounds. We can keep the same day every week, drop in for an extra visit before a party or a viewing, and turn up in the same van with the same face rather than sending whoever happens to be free.',
        ],
      },
      {
        heading: 'What Aylesbury gardens usually need',
        paragraphs: [
          'A lot of Aylesbury homes are newer builds over on Berryfields and Kingsbrook, where the garden starts as flat turf laid over clay the builders have driven all over. Those lawns need feeding and aerating to thicken up, and the borders need the soil improving before planting is worth doing. We do both.',
          'Nearer the centre, the older streets around Walton and Bedgrove have long narrow gardens with mature hedges, established shrubs and fruit trees. Most of that wants pruning at the right time of year rather than replacing.',
          'Either way the aim is the same. A garden that always looks presentable, without you spending your weekend on it.',
        ],
      },
    ],
    localNotes: [
      'Based in Bierton, about 5 minutes from the town centre',
      'Weekly rounds in Fairford Leys, Bedgrove, Berryfields and Watermead',
      'Used to new build clay soil and compacted lawns',
    ],
    nearby: ['Bierton', 'Stone', 'Wing', 'Haddenham'],
    postcodes: 'HP17, HP18, HP19, HP20, HP21, HP22',
    travelTime: 'About 5 minutes from our base in Bierton',
    distanceMiles: 2,
    faqs: [
      {
        q: 'Are you the closest gardener to me in Aylesbury?',
        a: 'If you are in Aylesbury or one of the estates around it, we are probably one of the closest gardeners to you. Our base is in Bierton, on the northern edge of town. Send us your postcode and we will confirm.',
      },
      {
        q: 'How much does a gardener cost in Aylesbury?',
        a: 'It depends on the size of the garden and how often you want us. Most regular customers here are weekly or fortnightly through the growing season, and we quote a fixed price per visit so there are no surprises. Quotes are free, and if fortnightly would do we will say so.',
      },
      {
        q: 'Do you cover the new estates like Berryfields and Kingsbrook?',
        a: 'Yes, both regularly. New build gardens usually need lawn treatment and the soil improving early on, and we will tell you what makes the biggest difference first.',
      },
      {
        q: 'Can you do a one-off tidy rather than a regular visit?',
        a: 'Yes. Plenty of jobs start as a one off clearance or a tidy before selling, and there is no obligation to book anything regular afterwards.',
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
      'Based in Bierton, so we are your nearest gardener for weekly maintenance, hedge cutting, patios and planting in Bierton and Broughton. Free quotes.',
    intro:
      'Bierton is home. We are based in the village, so if you are looking for a gardener near you in Bierton we are round the corner. Weekly maintenance, hedge cutting, borders and landscaping.',
    image: images['jw-g4'],
    imageAlt: 'Village garden in Bierton with neat lawn and planted borders',
    body: [
      {
        heading: 'The village gardener, based in the village',
        paragraphs: [
          'We run JW Garden Services from Bierton. No travel charges, easy scheduling, and we can pop back if something needs finishing. Several Bierton customers have been with us since we started in 2017.',
          'Working where you live keeps you honest. A garden on Burcott Lane or off the Aylesbury Road is one I drive past every day, so the standard matters to me as much as it does to you.',
        ],
      },
      {
        heading: 'Village gardens, hedges and open boundaries',
        paragraphs: [
          'Bierton gardens are usually bigger than town plots, often with a long boundary facing the fields, mature native hedges and old fruit trees. Hedge work is a big part of what we do here. Cut properly on a yearly cycle they stay thick at the base instead of going gappy.',
          'There is plenty of seasonal work around the newer developments off the Aylesbury Road too, where lawns need establishing and borders need filling out with planting that copes with the wind you get on the edge of the village.',
        ],
      },
    ],
    localNotes: [
      'Based in Bierton, no travel time and no travel charge',
      'Native hedge cutting and long rural boundaries',
      'Happy to hold keys and gate codes for regular village customers',
      'References available from neighbours in the village',
    ],
    nearby: ['Aylesbury', 'Wing', 'Stone', 'Wendover'],
    postcodes: 'HP22',
    travelTime: 'We are in the village, so same day visits are possible',
    distanceMiles: 0,
    faqs: [
      {
        q: 'Are you actually based in Bierton?',
        a: 'Yes. JW Garden Services runs from Bierton, Aylesbury. It is why we can be flexible with village customers and often fit small extra jobs in at short notice.',
      },
      {
        q: 'Do you cut long rural hedges and field boundaries?',
        a: 'Regularly. Native hedges, laurel, conifer and mixed boundaries. We work outside the bird nesting season wherever we can.',
      },
      {
        q: 'Can you look after a garden while we are away?',
        a: 'Yes. For village customers we are happy to keep an eye on things, water the pots and keep the garden presentable while you are on holiday.',
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
      'Gardener near you in Wendover: weekly maintenance, hedge cutting, patios and planting for Wendover, Halton and Aston Clinton. Free quotes.',
    intro:
      'Wendover sits on the Chilterns escarpment and the gardens show it. Sloping plots, chalky soil and a lot of shade from mature trees. We look after gardens here weekly, fortnightly and as one off projects.',
    image: images['jw-landscaping'],
    imageAlt: 'Sloping Chilterns garden near Wendover with stone patio and planted borders',
    body: [
      {
        heading: 'Gardening on the Chilterns edge',
        paragraphs: [
          'Wendover gardens are some of the prettiest we work in and some of the hardest. Plots slope, the soil is thin and chalky, and the beech woods around the town mean large parts of a garden sit in dry shade most of the day.',
          'That changes what works. Lawns in dry shade need the right seed mix and a higher cut. Borders do far better with chalk tolerant planting than with the acid lovers on the front row at the garden centre. We pick plants that will still look good in five years, not just on planting day.',
        ],
      },
      {
        heading: 'Terracing, steps and levels',
        paragraphs: [
          'Because so many gardens here slope, a lot of our Wendover work is hard landscaping. Retaining walls, terraced beds, steps and level patios that turn an awkward bank into somewhere you can actually sit. We build them with the drainage designed in so they stay put.',
          'We do the upkeep afterwards as well. A terraced garden looks great but needs regular attention to stay that way, and we can fit it into the weekly or fortnightly round with the rest of Wendover.',
        ],
      },
    ],
    localNotes: [
      'About 15 minutes from our Bierton base',
      'Used to chalk soil, dry shade and sloping plots',
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
        a: 'Yes. Sloping gardens are one of the things we do most here, from routine maintenance on terraced plots to building new retaining walls, steps and level patio areas.',
      },
      {
        q: 'What plants work on Wendover chalk soil?',
        a: 'Chalk lovers like lavender, hellebores, box, viburnum, geraniums and ornamental grasses do far better than rhododendron or camellia. We plant to suit your soil so you are not replacing things in two years.',
      },
      {
        q: 'Can you cut grass under trees where nothing grows?',
        a: 'We can improve it. A shade tolerant seed mix, a slightly higher cut and some feed usually makes a real difference. Where grass will never work, ground cover planting or a bark path often looks better anyway.',
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
      'Local gardener for Wing, Cublington and Stewkley: weekly garden maintenance, hedge cutting, lawn care, patios and planting. Free quotes.',
    intro:
      'We cover Wing and the villages around it on the Leighton Buzzard side of Aylesbury. Bigger village gardens, long hedges and paddock boundaries, kept tidy on a regular round.',
    image: images['jw-maint-3'],
    imageAlt: 'Large village garden in Wing with mown lawn and mature hedge',
    body: [
      {
        heading: 'Bigger gardens, on a proper schedule',
        paragraphs: [
          'Village gardens in Wing are generally bigger than the town average. More lawn, longer hedges, often a bit of orchard or paddock edge. That suits a regular arrangement. We come the same day each week or fortnight and work through a set list, so nothing gets away from us.',
          'Big lawns are where a proper mower earns its keep. We cut, edge and stripe in one visit, and we lift the height through the season so the grass copes with a dry July instead of scorching.',
        ],
      },
      {
        heading: 'Hedges, trees and the wilder edges',
        paragraphs: [
          'Hedge cutting is the other big job around Wing, Cublington and Stewkley. Mixed native hedges, hawthorn, laurel and conifer, plus the boundaries between gardens and open fields. We cut them on a sensible annual cycle and keep them dense at the base.',
          'We are also happy to leave part of a bigger garden less manicured. A mown path through longer grass, bulbs left to die back and a wilder corner for wildlife looks right in a village garden, and it is less work to keep.',
        ],
      },
    ],
    localNotes: [
      'Around 15 minutes from Bierton',
      'Set up for big village lawns and long hedges',
      'Covers Wing, Cublington, Stewkley and towards Leighton Buzzard',
    ],
    nearby: ['Aylesbury', 'Bierton', 'Leighton Buzzard', 'Wendover'],
    postcodes: 'LU7, HP22',
    travelTime: 'Around 15 minutes from Bierton',
    distanceMiles: 7,
    faqs: [
      {
        q: 'Do you take on large village gardens?',
        a: 'Yes. Large lawns, long hedges and paddock edges are normal for us round Wing. We will walk the garden with you and quote a fixed price per visit based on what it actually needs.',
      },
      {
        q: 'How often do hedges need cutting?',
        a: 'Most garden hedges are fine with one good cut a year, ideally late summer. Fast growers like laurel and privet look better with two. We time cuts to avoid nesting birds where we can.',
      },
      {
        q: 'Do you charge extra to travel out to the villages?',
        a: 'No. Wing and the villages around it are part of our normal round, so you pay the same as our Aylesbury customers.',
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
      'Gardener near you in Stone, Bishopstone and Hartwell: weekly garden maintenance, hedge cutting, lawn care and planting. Free quotes.',
    intro:
      'Stone is a few minutes down the A418 from our Bierton base, so it is one of the villages we visit most. Weekly and fortnightly maintenance, hedges, borders and small landscaping jobs.',
    image: images['jw-g5'],
    imageAlt: 'Neat village lawn and borders in Stone near Aylesbury',
    body: [
      {
        heading: 'A village round, five minutes from base',
        paragraphs: [
          'Stone, Bishopstone and Hartwell are on our main route out of Aylesbury, which makes them easy villages to keep on a fixed weekly or fortnightly day. Several gardens on the Oxford Road side have been with us for years.',
          'Being close means we can fit in the small extras too. A quick cut before visitors arrive, pots watered in a heatwave, or leaves cleared after a windy week in November.',
        ],
      },
      {
        heading: 'Long plots, old hedges and open views',
        paragraphs: [
          'Plenty of Stone gardens are long rear plots backing onto fields or the old hospital grounds, with mature boundary hedges that want a proper annual cut rather than a quick trim.',
          'The soil here is heavy Vale clay, so lawns compact and sit wet all winter. Aerating in autumn and keeping the cut a bit higher in summer does far more than extra feed, and borders repay having grit and compost worked in before you plant.',
        ],
      },
    ],
    localNotes: [
      'Around 5 minutes from our Bierton base',
      'Weekly and fortnightly rounds in Stone, Bishopstone and Hartwell',
      'Used to heavy Vale clay and wet winter lawns',
    ],
    nearby: ['Aylesbury', 'Bierton', 'Haddenham', 'Waddesdon'],
    postcodes: 'HP17',
    travelTime: 'About 10 minutes from Bierton',
    distanceMiles: 5,
    faqs: [
      {
        q: 'Do you cover Bishopstone and Hartwell too?',
        a: 'Yes. They are on the same round as Stone, so there is no extra travel charge and we can usually offer the same visit day.',
      },
      {
        q: 'My lawn is waterlogged every winter. Can you help?',
        a: 'Usually. Clay lawns round Stone respond well to autumn aeration, sensible mowing heights and top dressing. Where the water has nowhere to go we will say so and talk about drainage or planting, rather than selling you treatments that will not work.',
      },
      {
        q: 'Can you do a one-off tidy before we sell?',
        a: 'Of course. Tidies before a sale are a big part of what we do locally, and there is no obligation to book anything regular afterwards.',
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
      'Local gardener for Waddesdon, Quainton and Whitchurch: weekly garden maintenance, hedge cutting, lawns, borders and landscaping. Free quotes.',
    intro:
      'Waddesdon and the villages around it have some of the nicest gardens in the Vale. Bigger plots, stone walls and long hedges. We look after them on regular rounds and as one off projects.',
    image: images['jw-g4'],
    imageAlt: 'Country garden in Waddesdon with clipped hedges and planted borders',
    body: [
      {
        heading: 'Country gardens with a bit of formality',
        paragraphs: [
          'Waddesdon gardens often have a formal side. Clipped hedging, a lawn with real shape to it, roses and structured borders. That style only looks right when it is cut regularly and cut straight, which is what a fixed weekly visit is for.',
          'We keep the edges crisp, the hedges square and the borders weeded through the season, so the garden looks intentional rather than like it is catching up after a growth spurt.',
        ],
      },
      {
        heading: 'Walls, gravel and long boundaries',
        paragraphs: [
          'Stone walls, gravel drives and long roadside hedges are common here, and all three need work most town gardens do not. Wall borders planted to soften the stone, gravel kept clear of weeds, and hedges cut on a proper annual cycle.',
          'We take on the bigger jobs around Waddesdon, Quainton and Whitchurch as well. New paths, patios, planting schemes, and full clearances of gardens that have got ahead of their owners.',
        ],
      },
    ],
    localNotes: [
      'Around 10 minutes from our Bierton base',
      'Covers Waddesdon, Quainton, Whitchurch and Upper Winchendon',
      'Formal hedging, roses and structured borders',
      'Gravel, drives and long roadside hedges kept clear',
    ],
    nearby: ['Aylesbury', 'Bierton', 'Stone', 'Buckingham'],
    postcodes: 'HP18',
    travelTime: 'Around 10 minutes from Bierton',
    distanceMiles: 6,
    faqs: [
      {
        q: 'Do you cut formal hedges and topiary?',
        a: 'Yes. Box, yew, beech and hornbeam are regular work for us, and we cut to a line rather than by eye so the shape holds year to year.',
      },
      {
        q: 'Can you look after a larger country garden on your own schedule?',
        a: 'We can. For the bigger gardens here we usually agree a plan for the year. Weekly cutting through the growing season, hedge cuts in late summer, then pruning and clearing over winter.',
      },
      {
        q: 'Do you charge extra to come out to the villages?',
        a: 'No. Waddesdon, Quainton and Whitchurch are part of our normal round, so the prices match our Aylesbury customers.',
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
      'Gardener near you in Haddenham, Cuddington and Long Crendon: weekly garden maintenance, hedge cutting, lawn care and planting. Free quotes.',
    intro:
      'Haddenham is a short run from Bierton down the A418. We work across the village and out towards Cuddington and Long Crendon. Regular maintenance, hedges, borders and landscaping.',
    image: images['jw-maint-1'],
    imageAlt: 'Striped lawn and cottage borders in a Haddenham garden',
    body: [
      {
        heading: 'Wychert walls and cottage gardens',
        paragraphs: [
          'Haddenham is known for its wychert walls, and the gardens behind them are often older cottage plots. Mixed borders, fruit trees, gravel paths and lawns that are rarely a simple rectangle. They need someone who will work around what is already there instead of tidying it into blandness.',
          'Our regular visits here are mostly cutting, edging, weeding and dead heading through the season, then pruning and mulching in the quieter months to keep the planting healthy.',
        ],
      },
      {
        heading: 'Newer estates and bigger lawns',
        paragraphs: [
          'The newer part of the village towards the station has larger, flatter lawns and young boundary hedges. Those do best with lawn treatment through the year, and with the hedges cut properly early on so they thicken from the base.',
          'Whichever end of Haddenham you are in, the work is the same: cutting on a schedule that suits the hedge rather than whenever it has got away from you.',
        ],
      },
    ],
    localNotes: [
      'About 15 minutes from our Bierton base',
      'Covers Haddenham, Cuddington, Long Crendon and Dinton',
      'Comfortable in older cottage gardens and mixed borders',
      'Lawn treatment programmes for the newer estates',
    ],
    nearby: ['Aylesbury', 'Stone', 'Bierton', 'Wendover'],
    postcodes: 'HP17, HP18',
    travelTime: 'Around 15 minutes from Bierton',
    distanceMiles: 8,
    faqs: [
      {
        q: 'Do you cover Cuddington and Long Crendon as well?',
        a: 'Yes. They are on the same round as Haddenham, so you get the same fixed visit day and the same pricing.',
      },
      {
        q: 'Will you prune old fruit trees?',
        a: 'We will. Apple and pear trees in the older gardens here are usually worth restoring rather than replacing. We prune in winter and bring the shape and the cropping back gradually.',
      },
      {
        q: 'Can you keep a garden tidy while we rent the house out?',
        a: 'Yes. We look after several let and holiday properties locally. We invoice monthly and let you know if anything needs attention.',
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
      'Gardener near you in Tring, Wilstone and Long Marston: weekly garden maintenance, hedge cutting, patios and planting. Free quotes.',
    intro:
      'Tring is just over the county line from us and an easy run along the A41. We cover the town, the reservoir villages and out towards Aldbury, with regular maintenance and landscaping.',
    image: images['jw-g8'],
    imageAlt: 'Landscaped garden in Tring with stone patio and clipped hedging',
    body: [
      {
        heading: 'Town gardens, and the slopes above them',
        paragraphs: [
          'Tring gardens split into two types. In the town, the Victorian terraces and 1930s semis have long narrow plots with high boundary hedges and a lot of shade. The work there is about keeping the structure and the light rather than adding more plants.',
          'Above the town, towards Aldbury and the Chilterns, gardens are bigger, chalkier and often sloping. That is where we do more hard landscaping. Steps, retaining walls, terraced beds and level patios that make a bank usable.',
        ],
      },
      {
        heading: 'Chalk soil and what actually grows',
        paragraphs: [
          'The soil round Tring is thin and chalky. Lavender, box, hellebores, viburnum and ornamental grasses do far better in it than the acid lovers that get sold as easy wins. Planting to suit the soil means fewer replacements two summers later.',
          'Lawns on chalk dry out fast in July. We raise the cut through summer and feed in autumn rather than fighting it with water, and it comes back better each year.',
        ],
      },
    ],
    localNotes: [
      'About 20 minutes from our Bierton base along the A41',
      'Covers Tring, Wilstone, Long Marston, Aldbury and Marsworth',
      'Chalk soil planting and terracing on sloping plots',
      'Patios, steps and retaining walls with drainage designed in',
    ],
    nearby: ['Wendover', 'Aylesbury', 'Wing', 'Bierton'],
    postcodes: 'HP23',
    travelTime: 'About 20 minutes from Bierton',
    distanceMiles: 11,
    faqs: [
      {
        q: 'Do you actually cover Hertfordshire?',
        a: 'Yes. Tring and the villages around it are a regular part of our round, even though we are based in Buckinghamshire. It is a 20 minute run for us.',
      },
      {
        q: 'Can you build a patio or steps on a sloping garden?',
        a: 'That is one of our main landscaping jobs round Tring. We set the levels properly, build in the drainage and finish with planting so the new structure does not look raw.',
      },
      {
        q: 'What is the best planting for chalk soil?',
        a: 'Lavender, box, hellebores, geraniums, viburnum and grasses all do well. We avoid rhododendron, camellia and the other acid lovers that struggle here however much you feed them.',
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
      'Local gardener for Leighton Buzzard and Linslade: weekly garden maintenance, lawn care, hedge cutting, patios and planting. Free quotes.',
    intro:
      'Leighton Buzzard and Linslade are a straight run from us through Wing, so they are part of our regular round. Weekly and fortnightly maintenance, hedge cutting and landscaping.',
    image: images['jw-maint-2'],
    imageAlt: 'Well-kept lawn and borders in a Leighton Buzzard garden',
    body: [
      {
        heading: 'A regular gardener you actually see',
        paragraphs: [
          'Most of our Leighton Buzzard customers are on a fixed weekly or fortnightly visit through the growing season, then a lighter winter schedule for pruning, leaf clearing and tidying. Same day, same van, same person.',
          'We come through Wing to get here, so we can keep your visit day consistent instead of shuffling you round the round each week.',
        ],
      },
      {
        heading: 'Sandy soil, fast lawns and new build plots',
        paragraphs: [
          'The greensand round Leighton Buzzard drains fast. That is a blessing in winter and a problem in July, when lawns brown off quickly and borders dry out. We feed lawns in autumn and mulch borders in spring, which does more than watering ever will.',
          'On the newer estates towards Linslade and Sandhills, gardens usually start as flat turf and a fence. We help them along with lawn treatment, soil improvement and planting that fills the borders out within a couple of seasons.',
        ],
      },
    ],
    localNotes: [
      'Around 20 minutes from our Bierton base',
      'Covers Leighton Buzzard, Linslade, Heath and Reach and Stewkley',
      'Used to fast draining sandy soil and summer lawn stress',
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
        a: 'On sandy soil the answer is usually a higher cut, autumn feeding and leaving the clippings now and then, rather than constant watering. It builds a deeper rooted lawn that copes far better the next year.',
      },
      {
        q: 'Can you plant up a bare new-build garden?',
        a: 'Yes, that is a common job here. We improve the soil first, then plant the borders with a mix that gives you some structure straight away and fills out over two or three seasons.',
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
      'Gardener near you in Great Missenden, Prestwood and Little Kingshill: weekly maintenance, hedge cutting, terracing and planting. Free quotes.',
    intro:
      'Great Missenden sits in the Misbourne valley in the heart of the Chilterns. Wooded, sloping and chalky. We maintain gardens here weekly and fortnightly, and build the terracing that makes them usable.',
    image: images['jw-landscaping'],
    imageAlt: 'Terraced Chilterns garden near Great Missenden with stone steps and planting',
    body: [
      {
        heading: 'Woodland edges and dry shade',
        paragraphs: [
          'Almost every garden round Great Missenden and Prestwood has trees on or over a boundary. That gives you dry shade, roots competing for water, and a constant supply of leaves. Between them those three things defeat a standard mow and go service.',
          'We work with it instead. Shade tolerant grass mixes and a higher cut where lawn matters, ground cover planting where it never will, and proper leaf clearance in autumn so the lawn is not smothered all winter.',
        ],
      },
      {
        heading: 'Levels, steps and retaining structure',
        paragraphs: [
          'Valley side plots need structure before they need planting. Retaining walls, timber or sleeper terracing, steps and a level patio turn a bank you cannot use into the best part of the garden. We build them with the drainage designed in from the start.',
          'Once the structure is in we keep it. Regular visits to look after the terraces, hedges and borders, so it still looks right in five years.',
        ],
      },
    ],
    localNotes: [
      'Around 25 minutes from our Bierton base',
      'Covers Great Missenden, Prestwood, Little Kingshill and Ballinger',
      'Sloping Chilterns plots, terracing and steps',
      'Dry shade planting and autumn leaf clearance',
    ],
    nearby: ['Wendover', 'Amersham', 'Chesham', 'Aylesbury'],
    postcodes: 'HP16',
    travelTime: 'About 25 minutes from Bierton',
    distanceMiles: 12,
    faqs: [
      {
        q: 'Can anything grow under my beech trees?',
        a: 'Yes, though not lawn. Epimedium, hellebores, ferns, geraniums and spring bulbs all cope with dry shade. A mulched bed with a mown path through it usually looks better than struggling grass.',
      },
      {
        q: 'Do you build retaining walls and steps?',
        a: 'Regularly. Sloping gardens are most of our landscaping work in this area, from a single set of steps to full terracing with planted beds.',
      },
      {
        q: 'Do you clear leaves in autumn?',
        a: 'Yes. In the wooded gardens here we usually put in extra autumn visits just for leaf clearance, and it all goes with us.',
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
      'Gardener near you in Chesham, Chesham Bois and Ashley Green: weekly garden maintenance, hedge cutting, patios and planting. Free quotes.',
    intro:
      'Chesham gardens are steep, leafy and often surprisingly big for a town. We cover Chesham, Chesham Bois and the Chess valley with regular maintenance and hard landscaping.',
    image: images['jw-g7'],
    imageAlt: 'Chesham garden with mown lawn, mature hedge and stone path',
    body: [
      {
        heading: 'Steep town gardens, properly managed',
        paragraphs: [
          'Chesham is built across a valley, so a lot of gardens rise steeply behind the house. Mowing a bank is slow and often unsafe, so we either terrace it or turn the steepest sections over to planting with a mown path through.',
          'The flatter sections get the same regular service as anywhere else. Cutting, edging, weeding and hedge work on a fixed weekly or fortnightly day.',
        ],
      },
      {
        heading: 'Hedges, boundaries and privacy',
        paragraphs: [
          'Hedge cutting is the job we get asked for most here. The long laurel, conifer and beech boundaries between close set houses are what give Chesham gardens their privacy, and they need cutting properly once or twice a year to stay dense instead of going bare at the bottom.',
          'We cut to a straight line, including the awkward top growth most people cannot safely reach.',
        ],
      },
    ],
    localNotes: [
      'Around 30 minutes from our Bierton base',
      'Covers Chesham, Chesham Bois, Ashley Green and Hyde Heath',
      'Set up for steep gardens, banks and terracing',
      'Set up for tall hedges most ladders will not reach',
    ],
    nearby: ['Amersham', 'Great Missenden', 'Wendover', 'Tring'],
    postcodes: 'HP5',
    travelTime: 'About 30 minutes from Bierton',
    distanceMiles: 17,
    faqs: [
      {
        q: 'Will you work on a steep bank?',
        a: 'Yes, within reason. We look at it first. Sometimes the right answer is terracing or planting rather than trying to mow a slope that will never be safe or look good.',
      },
      {
        q: 'Can you cut a very tall hedge?',
        a: 'We cut most domestic hedges including tall laurel and conifer. If a hedge needs proper tree work we will tell you straight.',
      },
      {
        q: 'Is there a minimum visit for Chesham?',
        a: 'It is a longer run for us, so we usually ask for a regular booking or a job of at least half a day. Get in touch and we will be straight with you about what works.',
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
      'Gardener near you in Amersham, Old Amersham and Little Chalfont: weekly maintenance, hedge cutting, patios and planting. Free quotes.',
    intro:
      'Amersham has two very different sets of gardens. The older cottage plots down in the town, and the larger hillside gardens up on the Hill. We look after both, with regular maintenance and landscaping.',
    image: images['jw-g1'],
    imageAlt: 'Established Amersham garden with lawn, hedging and mature planting',
    body: [
      {
        heading: 'Old Amersham and Amersham on the Hill',
        paragraphs: [
          'Down in Old Amersham the gardens are older and more involved. Walled plots, mixed borders, brick paths and mature trees. The work is careful pruning, keeping the borders in order, and looking after the structure that is already there.',
          'Up on the Hill, the 1930s and post war houses have larger, more open gardens with big lawns and substantial boundary hedges. Those suit a straightforward weekly cut and edge, with the hedge work booked in seasonally.',
        ],
      },
      {
        heading: 'Established gardens kept established',
        paragraphs: [
          'Amersham has a lot of gardens that were planted well thirty or forty years ago and have quietly outgrown themselves. Bringing one back is usually pruning, thinning and clearing rather than starting again, and it costs a fraction of a redesign.',
          'Where a garden does need reworking we do the landscaping too. Patios, paths, new borders and planting that suits the chalky Chilterns soil.',
        ],
      },
    ],
    localNotes: [
      'Around 30 minutes from our Bierton base',
      'Covers Amersham, Old Amersham, Little Chalfont and Chesham Bois',
      'Careful pruning and restoration of mature gardens',
      'Patios, paths and chalk suited planting',
    ],
    nearby: ['Chesham', 'Great Missenden', 'Wendover', 'Aylesbury'],
    postcodes: 'HP6, HP7',
    travelTime: 'About 30 minutes from Bierton',
    distanceMiles: 17,
    faqs: [
      {
        q: 'Can you restore an overgrown established garden?',
        a: 'Usually yes, and it is one of my favourite jobs. We work through it in stages. Clearing first, then the structural pruning, then replanting the gaps, so the garden keeps its maturity instead of being flattened.',
      },
      {
        q: 'Do you take on regular weekly visits in Amersham?',
        a: 'We do, though because it is a longer run we prefer to group Amersham and Chesham customers on the same day. Ask us which day we are in the area.',
      },
    ],
    gallery: [images['jw-g4'], images['jw-maint-1'], images['jw-g8']],
  },
];

export const getArea = (slug?: string) => areas.find((a) => a.slug === slug);
