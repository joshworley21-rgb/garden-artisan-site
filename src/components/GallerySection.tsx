import g1 from '@/assets/jw-g1.jpg.asset.json';
import g2 from '@/assets/jw-g2.jpg.asset.json';
import g3 from '@/assets/jw-g3.jpg.asset.json';
import g4 from '@/assets/jw-g4.jpg.asset.json';
import g5 from '@/assets/jw-g5.jpg.asset.json';
import g6 from '@/assets/jw-g6.jpg.asset.json';
import g7 from '@/assets/jw-g7.jpg.asset.json';
import g8 from '@/assets/jw-g8.jpg.asset.json';
import g9 from '@/assets/jw-g9.jpg.asset.json';

const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9].map((a) => a.url);

const GallerySection = () => {
  return (
    <section id="work" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-body text-sm uppercase tracking-widest mb-4 block">
            Portfolio
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold mb-6">
            Our Recent Work
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Take a look at some of the gardens we've transformed. Each project reflects our 
            commitment to quality and attention to detail.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              <img
                src={image}
                alt={`Garden project ${index + 1}`}
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
