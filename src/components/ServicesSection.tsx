import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import maintenanceImg from '@/assets/maintenance-service.jpg';
import landscapingImg from '@/assets/landscaping-service.jpg';
import commercialImg from '@/assets/commercial-service.jpg';

const services = [
  {
    title: 'Garden Maintenance',
    description: 'Let us take the stress out of gardening, working closely with you to improve and develop your garden into somewhere you can relax and enjoy with our year-round maintenance and expertise.',
    image: maintenanceImg,
  },
  {
    title: 'Garden Design & Hard Landscaping',
    description: 'We can create an outdoor space you can be proud of, whether you need a new patio, a border redesign, or even a whole garden makeover.',
    image: landscapingImg,
  },
  {
    title: 'Commercial Maintenance',
    description: 'We offer flexible plans tailored to your specific needs and budget. Our expertise can enhance your property\'s appeal and keep your business premises looking professional and welcoming.',
    image: commercialImg,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-body text-sm uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold mb-6">
            Your Garden, Our Expertise
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Professional care you can trust. We create and maintain stunning outdoor spaces 
            with expert craftsmanship and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-heading text-2xl text-foreground font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <Button variant="elegant" size="sm" className="group/btn">
                  Find Out More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
