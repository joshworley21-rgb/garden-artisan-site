import { images } from '@/lib/images';

const sourceImages = [
  { key: 'jw-work-20210721_144520', alt: 'Colourful herbaceous border in full summer flower beside a striped, freshly mown lawn' },
  { key: 'jw-work-20210327_145115', alt: 'Large border cleared and prepared for replanting in a countryside garden' },
  { key: 'jw-work-20250507_134138', alt: 'Ceanothus in full bloom beside a stone wall with countryside views, garden maintained near Aylesbury' },
  { key: 'jw-work-20230526_090054', alt: 'Long hedge freshly trimmed to a crisp line in a Buckinghamshire garden' },
  { key: 'jw-work-20250529_160433', alt: 'Indian sandstone patio cleaned and repointed with potted campanula in flower' },
  { key: 'jw-g1', alt: 'Freshly mown lawn with shaped borders in an Aylesbury garden' },
  { key: 'jw-g2', alt: 'Neatly cut hedge and planted border after garden maintenance in Buckinghamshire' },
  { key: 'jw-g3', alt: 'New patio and paving laid as part of a hard landscaping project near Aylesbury' },
  { key: 'jw-g4', alt: 'Mixed perennial planting scheme designed for a Bierton garden' },
  { key: 'jw-g5', alt: 'Timber fencing and gravel path installed in a Buckinghamshire garden' },
  { key: 'jw-g6', alt: 'Freshly laid turf lawn after a garden renovation in Aylesbury' },
  { key: 'jw-g7', alt: 'Pruned shrubs and tidy raised beds after seasonal garden care' },
  { key: 'jw-g8', alt: 'Landscaped garden with lawn, borders and seating area in Hertfordshire' },
  { key: 'jw-g9', alt: 'Established cottage-style border maintained by JW Garden Services' },
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
            Portfolio
          </span>
          <h2 className="font-heading heading-section text-foreground font-semibold mb-6">
            Our Recent Work
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Take a look at some of the gardens we've transformed. Each project reflects our 
            commitment to quality and attention to detail.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={item.key}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              <img
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                width={item.image.width}
                height={item.image.height}
                alt={item.alt}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
