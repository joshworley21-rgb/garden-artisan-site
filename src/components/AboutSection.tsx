import aboutImage from '@/assets/jw-about-main.jpg.asset.json';

const points = [
  'Professional and Insured Service.',
  'Tailored Solutions for Every Garden.',
  'Passionate About Helping Outdoor Spaces Flourish.',
  'Fully qualified Horticulturist.',
  'Proud members of the Chartered Institute of Horticulture and Gardeners Guild.',
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground font-semibold mb-4">
              About us
            </h2>
            <p className="font-body text-lg text-primary font-medium mb-6">
              Your garden, our expertise. Professional care you can trust.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              At JW Garden Services, we create and maintain stunning outdoor spaces with expert
              craftsmanship and attention to detail. Whether you need routine garden maintenance,
              bespoke landscaping, or specialist horticultural care, we&rsquo;re here to bring your
              vision to life.
            </p>

            <ul className="space-y-3 mb-8">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 font-body text-foreground">
                  <span className="text-primary font-semibold leading-6">&#10004;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="font-body text-lg text-foreground font-medium">
              Let&rsquo;s transform your garden &ndash; Get in touch today!
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-elevated">
            <img
              src={aboutImage.url}
              alt="Landscaped garden with lawn and planted borders"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
