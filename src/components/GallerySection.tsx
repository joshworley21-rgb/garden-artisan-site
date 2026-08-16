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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground font-semibold mb-4">
            Recent Transformations
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            See the difference professional care makes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              <img
                src={image}
                alt={`Garden transformation by JW Garden Services ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
