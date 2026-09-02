import Action from '@/components/Action';
import Plate from '@/components/Plate';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
import { allProjects } from '@/lib/projects';

/**
 * Six photographs, composed in pairs rather than tiled. Each row holds a tall
 * plate and a wide one, and only the second plate in a row drops, so the
 * rhythm never opens a hole under the shorter picture.
 */
const rows = [
  [
    { key: 'jw-work-20210721_144520', span: 'lg:col-span-5', aspect: 'aspect-[3/4]', drop: '' },
    { key: 'jw-g1', span: 'lg:col-span-7', aspect: 'aspect-[4/3]', drop: 'lg:mt-20' },
  ],
  [
    { key: 'jw-g7', span: 'lg:col-span-6', aspect: 'aspect-[16/10]', drop: '' },
    { key: 'jw-g2', span: 'lg:col-span-6', aspect: 'aspect-[16/10]', drop: 'lg:mt-16' },
  ],
  [
    { key: 'jw-work-20250507_134138', span: 'lg:col-span-5', aspect: 'aspect-[3/4]', drop: '' },
    { key: 'jw-g6', span: 'lg:col-span-7', aspect: 'aspect-[4/3]', drop: 'lg:mt-20' },
  ],
].map((row) =>
  row
    .map((slot) => ({ ...slot, project: allProjects.find((p) => p.key === slot.key) }))
    .filter((slot): slot is typeof slot & { project: NonNullable<typeof slot.project> } =>
      Boolean(slot.project),
    ),
);

const GallerySection = () => (
  <section id="work" className="section bg-chalk-wash">
    <div className="wrap">
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Tag className="text-stone">Recent work</Tag>
          <h2 className="display-2 mt-6 max-w-[16ch] text-balance">
            Photographed on the job, not staged
          </h2>
        </div>
        <p className="lead max-w-[40ch] text-pretty text-stone lg:col-span-5 lg:pb-2">
          Gardens we look after week to week, borders we have planted and structures we have built.
        </p>
      </Reveal>

      <div className="mt-14 lg:mt-20">
        {rows.map((row) => (
          <div
            key={row.map((slot) => slot.key).join('-')}
            className="grid gap-x-8 lg:grid-cols-12 lg:items-start"
          >
            {row.map(({ project, span, aspect, drop }, index) => (
              <Reveal key={project.key} className={`${span} ${drop} mb-12`} delay={index * 120}>
                <figure className="group">
                  <Plate
                    image={project.image}
                    alt={project.alt}
                    sizes="(max-width: 1024px) 92vw, 45vw"
                    aspect={aspect}
                  />
                  <figcaption className="rule-bottom mt-4 pb-3 font-display text-[1.0625rem]">
                    {project.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      <Reveal className="mt-16 lg:mt-20">
        <Action to="/our-work" tone="outline">
          The full portfolio
        </Action>
      </Reveal>
    </div>
  </section>
);

export default GallerySection;
