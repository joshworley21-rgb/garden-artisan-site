import maintenanceAsset from '@/assets/jw-maintenance.jpg.asset.json';
import landscapingAsset from '@/assets/jw-landscaping.jpg.asset.json';
import commercialAsset from '@/assets/jw-commercial.jpg.asset.json';

const services = [
  {
    title: 'Garden Maintenance',
    description: 'Let us take the stress out of gardening, working closely with you to improve and develop your garden into somewhere you can relax and enjoy with our year-round maintenance and expertise.',
    image: maintenanceAsset.url,
  },
  {
    title: 'Garden Design & Hard Landscaping',
    description: 'We can create an outdoor space you can be proud of, whether you need a new patio, a border redesign, or even a whole garden makeover.',
    image: landscapingAsset.url,
  },
  {
    title: 'Commercial Maintenance',
    description: 'We offer flexible plans tailored to your specific needs and budget. Our expertise can enhance your property\'s appeal and keep your business premises looking professional and welcoming.',
    image: commercialAsset.url,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="font-heading heading-section text-foreground font-semibold mb-6">
            Your Garden, Our Expertise
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Professional care you can trust. We create and maintain stunning outdoor spaces 
            with expert craftsmanship and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative flex flex-col bg-card rounded-lg overflow-hidden shadow-soft border border-border/60 hover:border-accent/40 hover:shadow-elevated hover:-translate-y-2 transition-all duration-500 ease-out"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Persistent subtle gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent" />
                {/* Gold accent bar that grows on hover */}
                <div className="absolute left-0 bottom-0 h-1 w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />

                {/* Index badge */}
                <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/90 backdrop-blur-sm font-heading text-sm font-semibold text-primary shadow-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-heading text-2xl leading-snug text-foreground font-semibold mb-4 transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-2 flex-1">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
