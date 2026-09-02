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
        {/* Section opener */}
        <div className="mb-12 lg:mb-16">
          <p className="kicker font-body mb-6">Portfolio</p>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 className="lg:col-span-7 font-heading heading-section text-foreground">
              Our Recent Work
            </h2>
            <p className="lg:col-span-5 font-body text-muted-foreground leading-relaxed">
              Some of the gardens we look after, and some of the landscaping we have built.
            </p>
          </div>
        </div>

        {/* A column wall rather than a grid of identical squares: every photo keeps
            the shape it was taken in, so tall borders stay tall and wide lawns stay
            wide. The 2px gutter is the site's own hairline; any tighter and
            adjacent photographs start reading as one picture. Square corners,
            because at this spacing a radius only shows as background slivers
            where four corners meet. */}
        <div className="columns-2 lg:columns-3 gap-0.5 [column-fill:balance]">
          {galleryImages.map((item, index) => (
            <figure
              key={item.key}
              className="mb-0.5 break-inside-avoid overflow-hidden bg-muted"
            >
              <img
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes="(max-width: 640px) 44vw, (max-width: 1024px) 43vw, 28vw"
                width={item.image.width}
                height={item.image.height}
                alt={item.alt}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-[1.02] motion-reduce:transform-none"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
