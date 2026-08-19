import { projectGroups } from '@/lib/projects';

/**
 * The portfolio, grouped by the kind of work rather than shown as one flat grid,
 * so each photo carries a caption explaining what was actually done.
 */
const WorkGallery = () => (
  <>
    {projectGroups.map((group, groupIndex) => (
      <section
        key={group.id}
        id={group.id}
        className={`section-padding ${groupIndex % 2 === 1 ? 'bg-secondary/30' : 'bg-background'}`}
      >
        <div className="container-wide">
          <div className="max-w-3xl mb-10 md:mb-14">
            <h2 className="font-heading heading-section text-foreground font-semibold mb-5">
              {group.heading}
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">{group.blurb}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {group.projects.map((project, index) => (
              <figure key={project.key} className="flex flex-col">
                <div className="overflow-hidden rounded-lg shadow-soft mb-4">
                  <img
                    src={project.image.src}
                    srcSet={project.image.srcSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    width={project.image.width}
                    height={project.image.height}
                    alt={project.alt}
                    loading={groupIndex === 0 && index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <figcaption>
                  <h3 className="font-heading text-xl text-foreground font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {project.caption}
                  </p>
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
