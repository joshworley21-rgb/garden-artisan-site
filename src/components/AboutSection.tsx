import { Award, Shield, Leaf, Users } from 'lucide-react';

const credentials = [
  {
    icon: Award,
    title: 'Fully Qualified Horticulturist',
    description: 'City & Guilds certified expertise',
  },
  {
    icon: Shield,
    title: 'Professional & Insured',
    description: 'Complete peace of mind',
  },
  {
    icon: Leaf,
    title: 'Tailored Solutions',
    description: 'Bespoke care for every garden',
  },
  {
    icon: Users,
    title: 'Gardeners Guild Member',
    description: 'Qualified, accredited professional',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
              About Us
            </span>
            <h2 className="font-heading heading-section text-foreground font-semibold mb-6">
              Passionate About Helping
              <span className="block text-primary italic">Outdoor Spaces Flourish</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              At JW Garden Services, we believe your garden should be a sanctuary—a place where 
              you can relax, entertain, and connect with nature. With years of experience and a 
              genuine passion for horticulture, we bring expertise and dedication to every project.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Whether you need routine maintenance, specialist horticultural care, or a complete 
              garden transformation, we're here to bring your vision to life with attention to 
              detail and professional craftsmanship.
            </p>

          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {credentials.map((credential, index) => (
              <div
                key={credential.title}
                className="bg-background p-6 rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <credential.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg text-foreground font-semibold mb-2">
                  {credential.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {credential.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
