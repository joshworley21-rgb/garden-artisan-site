import { images, type ResponsiveImage } from '@/lib/images';

export interface Project {
  key: string;
  title: string;
  caption: string;
  alt: string;
  image: ResponsiveImage;
}

export interface ProjectGroup {
  id: string;
  heading: string;
  blurb: string;
  projects: Project[];
}

type ProjectSeed = Omit<Project, 'image'>;
type GroupSeed = Omit<ProjectGroup, 'projects'> & { projects: ProjectSeed[] };

const groups: GroupSeed[] = [
  {
    id: 'maintenance',
    heading: 'Gardens we look after',
    blurb:
      'Most of our week is regular maintenance — the same gardens, the same day, through the season. Mowing and edges, hedges kept to a line, borders weeded, fed and deadheaded, and every clipping taken away with us.',
    projects: [
      {
        key: 'jw-work-20210721_144520',
        title: 'A border at its July peak',
        caption:
          'Phlox, roses, crocosmia and hardy geranium packed in tight, with the lawn striped up to a clean brick edge. Borders like this look effortless in photographs because someone has been staking, deadheading and weeding them since March.',
        alt: 'Deep herbaceous border in full July flower beside a striped lawn with a brick edge',
      },
      {
        key: 'jw-work-20230526_090054',
        title: 'A long hedge back to a straight line',
        caption:
          'Cut level along the top and faced up on both sides, working off a tripod ladder. The clippings on the grass were cleared before we left — hedge cutting is half cutting, half clearing up.',
        alt: 'Tall garden hedge freshly cut level along the top, with clippings on the lawn below',
      },
      {
        key: 'jw-g1',
        title: 'Lawn, box and alliums in May',
        caption:
          'Clipped box, alliums coming through and wisteria over the trellis behind. The stripes come from mowing the same lawn in alternating directions week after week, not from anything clever.',
        alt: 'Striped lawn with clipped box, purple alliums in flower and wisteria on the trellis behind',
      },
      {
        key: 'jw-work-20250507_134138',
        title: 'Ceanothus in full blue',
        caption:
          'A ceanothus given its head against a stone wall, with grasses and low shrubs settling into the gravel-mulched border below. It flowers like this because it gets pruned after flowering rather than in winter.',
        alt: 'Ceanothus covered in blue flower above a stone wall, with grasses in a gravel-mulched border and open countryside behind',
      },
      {
        key: 'jw-work-20250529_160433',
        title: 'Patio washed down',
        caption:
          'Indian sandstone brought back after a winter of green film and rain marks. Worth doing once a year — the colour in the stone is usually still there under the grime.',
        alt: 'Freshly cleaned Indian sandstone patio, wet after washing, with rattan furniture and a pot of campanula',
      },
    ],
  },
  {
    id: 'planting',
    heading: 'Borders and planting',
    blurb:
      'New borders start with the shape and the soil, not the plants. We cut the bed, clear and improve what is underneath, then set everything out in its pot first so heights and spacing can be moved around before a single hole is dug.',
    projects: [
      {
        key: 'jw-work-20210327_145115',
        title: 'A new bed cut into the lawn',
        caption:
          'Marked out, turf lifted and the whole bed dug over in early spring, ready for planting. Getting the curve right at this stage matters — it is the line you will see from the house for years.',
        alt: 'Large curved border newly cut into a lawn and dug over ready for planting, with open countryside beyond',
      },
      {
        key: 'jw-g8',
        title: 'Setting the plants out first',
        caption:
          'Everything positioned in its pot and walked around before planting: tall at the back, grasses to catch the light, evergreens to hold the border together in winter. Cheaper to change your mind now than in July.',
        alt: 'Border prepared with plants still in their pots, set out in position ready to be planted',
      },
      {
        key: 'jw-g6',
        title: 'Planted up against a new fence',
        caption:
          'A fresh border edged in granite setts against a gravel path, planted with lavender, hardy geranium and a multi-stem birch for height. Small now — this is what a border looks like the day it goes in.',
        alt: 'Newly planted border edged with granite setts beside a gravel path, with a multi-stem birch against a new fence',
      },
      {
        key: 'jw-g2',
        title: 'Cottage planting in gravel',
        caption:
          'Echinacea, salvia and achillea running through a gravel garden in front of an old cart lodge. Gravel keeps the roots cool and the weeding down, and lets things seed about where they are happy.',
        alt: 'Cottage-style border of echinacea, salvia and achillea in a gravel garden in front of a timber cart lodge',
      },
    ],
  },
  {
    id: 'landscaping',
    heading: 'Structures and hard landscaping',
    blurb:
      'Fencing, raised beds, pergolas, paths and paving — the bones of a garden. All built to last outside for years, with the posts, footings and drainage sorted properly before anything visible goes on top.',
    projects: [
      {
        key: 'jw-g7',
        title: 'Pergola over a paved seating area',
        caption:
          'A timber pergola set on its own sandstone base, cut into the lawn away from the house so the garden gets a second place to sit. Rafters shaped at the ends rather than left square.',
        alt: 'Timber pergola built over a sandstone paved seating area set into a lawn',
      },
      {
        key: 'jw-g9',
        title: 'Sleeper beds for a kitchen garden',
        caption:
          'Four large beds built from railway sleepers, filled and left to settle over winter. Raised beds warm up earlier in spring and save a lot of bending, which is usually the real reason people want them.',
        alt: 'Four large raised beds built from railway sleepers on a lawn, filled with soil',
      },
      {
        key: 'jw-g4',
        title: 'Raised beds ready for spring',
        caption:
          'Two new timber beds on a gravel base, filled with a compost and topsoil mix and ready to plant as the daffodils go over behind them.',
        alt: 'Two new timber raised beds on gravel, filled with compost, with daffodils flowering behind',
      },
      {
        key: 'jw-g5',
        title: 'New picket fence along the front',
        caption:
          'Posts set in line and the picket run levelled along a front boundary, with the ground made good behind it. A low fence marks the garden without closing it in.',
        alt: 'New timber picket fence installed along a front garden boundary with the soil made good behind it',
      },
      {
        key: 'jw-g3',
        title: 'Screening trees along a new fence',
        caption:
          'Standards planted, staked and tied along a newly built close-board fence to lift the screening above the panels. Staked low so the stems still flex and thicken.',
        alt: 'Newly planted and staked screening trees along a new close-board fence beside a lawn',
      },
    ],
  },
];

/** Attach the responsive image manifest entry to each project. */
export const projectGroups: ProjectGroup[] = groups.map((group) => ({
  ...group,
  projects: group.projects.map((project) => ({ ...project, image: images[project.key] })),
}));

export const allProjects = projectGroups.flatMap((group) => group.projects);
