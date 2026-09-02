import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
import { projectGroups } from '@/lib/projects';

/**
 * The portfolio, grouped by the kind of work rather than shown as one flat
 * grid, so every photograph carries a caption saying what was actually done.
 *
 * Laid out in columns rather than a grid: the pictures keep their own shape
 * instead of being cropped to a common ratio, which is the point of showing
 * them at all.
 */
const WorkGallery = () => (
  <>
    {projectGroups.map((group, groupIndex) => (
      <section
        key={group.id}
        id={group.id}
        className={`section-tight ${groupIndex % 2 === 1 ? 'bg-chalk-wash' : ''}`}
      >
        <div className="wrap">
          <Reveal className="rule-bottom flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pb-5">
            <h2 className="display-2 max-w-[20ch]">{group.heading}</h2>
            <Tag className="text-stone">
              {group.projects.length} {group.projects.length === 1 ? 'photograph' : 'photographs'}
            </Tag>
          </Reveal>

          <div className="mt-10 gap-8 sm:columns-2 lg:columns-3">
            {group.projects.map((project, index) => (
              <figure key={project.key} className="group mb-8 break-inside-avoid">
                <div className="mount">
                  <div className="overflow-hidden">
                    <img
                      src={project.image.src}
                      srcSet={project.image.srcSet}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      width={project.image.width}
                      height={project.image.height}
                      alt={project.alt}
                      loading={groupIndex === 0 && index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="plate-img"
                    />
                  </div>
                </div>
                <figcaption className="rule-bottom mt-4 pb-3 font-display text-[1.0625rem] leading-snug">
                  {project.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    ))}
  </>
);

export default WorkGallery;
