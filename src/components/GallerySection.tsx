const galleryImages = [
  'https://static.wixstatic.com/media/2bb60f_565b682ee1664f2ca49b2285fe899c4e~mv2.jpg/v1/fill/w_400,h_400,q_90,enc_avif,quality_auto/2bb60f_565b682ee1664f2ca49b2285fe899c4e~mv2.jpg',
  'https://static.wixstatic.com/media/2bb60f_b2715d0b81ec4cf99b66b5f216973919~mv2.jpg/v1/fill/w_400,h_400,q_90,enc_avif,quality_auto/2bb60f_b2715d0b81ec4cf99b66b5f216973919~mv2.jpg',
  'https://static.wixstatic.com/media/2bb60f_2ead3dd0113b4af0a38b45e30837954b~mv2.jpg/v1/fill/w_400,h_400,q_90,enc_avif,quality_auto/2bb60f_2ead3dd0113b4af0a38b45e30837954b~mv2.jpg',
  'https://static.wixstatic.com/media/2bb60f_3e332a74a9d74c5b99c869748c422344~mv2.jpg/v1/fill/w_400,h_400,q_90,enc_avif,quality_auto/2bb60f_3e332a74a9d74c5b99c869748c422344~mv2.jpg',
  'https://static.wixstatic.com/media/2bb60f_290961b5c56f4a07b580df96a48b869f~mv2.jpg/v1/fill/w_400,h_400,q_90,enc_avif,quality_auto/2bb60f_290961b5c56f4a07b580df96a48b869f~mv2.jpg',
  'https://static.wixstatic.com/media/2bb60f_3ceb276f6afb42748fb9c9bffd5095f4~mv2.jpg/v1/fill/w_400,h_400,q_90,enc_avif,quality_auto/2bb60f_3ceb276f6afb42748fb9c9bffd5095f4~mv2.jpg',
];

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
