import { images, type ResponsiveImage } from '@/lib/images';

export interface Project {
  key: string;
  title: string;
  alt: string;
  image: ResponsiveImage;
}

export interface ProjectGroup {
  id: string;
  heading: string;
  projects: Project[];
}

type ProjectSeed = Omit<Project, 'image'>;
type GroupSeed = Omit<ProjectGroup, 'projects'> & { projects: ProjectSeed[] };

const groups: GroupSeed[] = [
  {
    id: 'maintenance',
    heading: 'Gardens we look after',
    projects: [
      {
        key: 'jw-work-20210721_144520',
        title: 'A border at its July peak',
        alt: 'Deep herbaceous border in full July flower beside a striped lawn with a brick edge',
      },
      {
        key: 'jw-work-20230526_090054',
        title: 'A long hedge neatened up',
        alt: 'Tall garden hedge freshly cut level along the top, with clippings on the lawn below',
      },
      {
        key: 'jw-g1',
        title: 'Alliums showing off in May',
        alt: 'Striped lawn with clipped box, purple alliums in flower and wisteria on the trellis behind',
      },
      {
        key: 'jw-work-20250507_134138',
        title: 'Ceanothus in full blue',
        alt: 'Ceanothus covered in blue flower above a stone wall, with grasses in a gravel-mulched border and open countryside behind',
      },
      {
        key: 'jw-work-20250529_160433',
        title: 'Patio washed down',
        alt: 'Freshly cleaned Indian sandstone patio, wet after washing, with rattan furniture and a pot of campanula',
      },
    ],
  },
  {
    id: 'planting',
    heading: 'Borders and planting',
    projects: [
      {
        key: 'jw-work-20210327_145115',
        title: 'A new wildflower area, using wildflower turf',
        alt: 'Large curved area cut into a lawn and prepared for wildflower turf, with open countryside beyond',
      },
      {
        key: 'jw-g8',
        title: 'Setting the plants out first',
        alt: 'Border prepared with plants still in their pots, set out in position ready to be planted',
      },
      {
        key: 'jw-g6',
        title: 'New planting scheme for a front garden',
        alt: 'New front garden planting scheme, edged with granite setts beside a gravel path, with a multi-stem birch against a new fence',
      },
      {
        key: 'jw-g2',
        title: 'Cottage planting in a cut flower garden',
        alt: 'Cut flower garden of echinacea, salvia and achillea planted through gravel in front of a timber cart lodge',
      },
    ],
  },
  {
    id: 'landscaping',
    heading: 'Structures and hard landscaping',
    projects: [
      {
        key: 'jw-g7',
        title: 'Pergola over a paved seating area',
        alt: 'Timber pergola built over a sandstone paved seating area set into a lawn',
      },
      {
        key: 'jw-g9',
        title: 'Sleeper beds for a kitchen garden',
        alt: 'Four large raised beds built from railway sleepers on a lawn, filled with soil',
      },
      {
        key: 'jw-g4',
        title: 'Raised beds ready for spring',
        alt: 'Two new timber raised beds on gravel, filled with compost, with daffodils flowering behind',
      },
      {
        key: 'jw-g5',
        title: 'New picket fence along the front',
        alt: 'New timber picket fence installed along a front garden boundary with the soil made good behind it',
      },
      {
        key: 'jw-g3',
        title: 'Screening trees along a new fence',
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
