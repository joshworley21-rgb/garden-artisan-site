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
    <section id="about" className="section-padding bg-secondary/60">
      <div className="container-wide">
        <div className="ruled-head grid lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="lg:col-span-7">
            <span className="label label-rule text-accent mb-5 block">
              About Us
            </span>
            <h2 className="font-heading heading-section text-foreground mb-6">
              Passionate About Helping
              <span className="block font-body italic font-normal text-accent tracking-normal mt-1 text-[0.72em] leading-[1.2]">Outdoor Spaces Flourish</span>
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

          {/* Credentials — a ruled ledger, the way a certificate list would be
              typed up, rather than four boxes on a grid. */}
          <div className="lg:col-span-5 lg:pt-2">
            {credentials.map((credential) => (
              <div
                key={credential.title}
                className="row-ruled flex items-start gap-4 py-5 first:pt-0"
              >
                <credential.icon
                  className="h-5 w-5 shrink-0 text-accent mt-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-heading text-base text-foreground mb-1">
                    {credential.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {credential.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
