import { images } from '@/lib/images';

const sourceImages = [
  { key: 'jw-work-20210721_144520', alt: 'Colourful herbaceous border in full summer flower beside a striped, freshly mown lawn' },
  { key: 'jw-work-20210327_145115', alt: 'Large border cleared and prepared for replanting in a countryside garden' },
  { key: 'jw-work-20250507_134138', alt: 'Ceanothus in full bloom beside a stone wall with countryside views, garden maintained near Aylesbury' },
  { key: 'jw-work-20230526_090054', alt: 'Tall garden hedge freshly cut level along the top, with clippings on the lawn below' },
  { key: 'jw-work-20250529_160433', alt: 'Freshly cleaned Indian sandstone patio, wet after washing, with rattan furniture and a pot of campanula' },
  { key: 'jw-g1', alt: 'Striped lawn with clipped box, purple alliums in flower and wisteria on the trellis behind' },
  { key: 'jw-g2', alt: 'Cut flower garden of echinacea, salvia and achillea planted through gravel in front of a timber cart lodge' },
  { key: 'jw-g3', alt: 'Newly planted and staked screening trees along a new close-board fence beside a lawn' },
  { key: 'jw-g4', alt: 'Two new timber raised beds on gravel, filled with compost, with daffodils flowering behind' },
  { key: 'jw-g5', alt: 'New timber picket fence installed along a front garden boundary with the soil made good behind it' },
  { key: 'jw-g6', alt: 'New front garden planting scheme, edged with granite setts beside a gravel path, with a multi-stem birch against a new fence' },
  { key: 'jw-g7', alt: 'Timber pergola built over a sandstone paved seating area set into a lawn' },
  { key: 'jw-g8', alt: 'Border prepared with plants still in their pots, set out in position ready to be planted' },
  { key: 'jw-g9', alt: 'Four large raised beds built from railway sleepers on a lawn, filled with soil' },
].map((item) => ({ ...item, image: images[item.key] }));

// Fisher–Yates shuffle — runs once per page load so the order is random each visit.
const galleryImages = [...sourceImages];
for (let i = galleryImages.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [galleryImages[i], galleryImages[j]] = [galleryImages[j], galleryImages[i]];
}

const GallerySection = () => {
  return (
    <section id="work" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="ruled-head grid gap-6 lg:grid-cols-12 lg:gap-12 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="label label-rule text-accent mb-5 block">
              Portfolio
            </span>
            <h2 className="font-heading heading-section text-foreground">
              Our Recent Work
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground leading-relaxed lg:col-span-5 lg:pt-1">
            Take a look at some of the gardens we've transformed. Each project reflects our 
            commitment to quality and attention to detail.
          </p>
        </div>

        {/* A packed grid with a deliberate rhythm rather than fourteen
            identical squares: one plate in six runs double, one in six runs
            tall. No hover magnifier — nothing here opens. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[8.5rem] sm:auto-rows-[11rem] lg:auto-rows-[12rem] grid-flow-dense gap-3 sm:gap-4 lg:gap-6">
          {galleryImages.map((item, index) => {
            const rhythm = index % 6;
            const span =
              rhythm === 0
                ? 'col-span-2 row-span-2'
                : rhythm === 3
                  ? 'row-span-2'
                  : '';
            return (
              <figure key={item.key} className={`plate ${span}`}>
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 43vw, 28vw"
                  width={item.image.width}
                  height={item.image.height}
                  alt={item.alt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
