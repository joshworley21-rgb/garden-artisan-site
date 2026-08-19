import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import WorkGallery from '@/components/WorkGallery';
import ContactSection from '@/components/ContactSection';
import { allProjects } from '@/lib/projects';

const SITE = 'https://www.jw-gardening.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${SITE}/our-work#gallery`,
  name: 'Garden projects by JW Garden Services',
  description:
    'Garden maintenance, planting and hard landscaping carried out by JW Garden Services across Buckinghamshire, Bedfordshire and Hertfordshire.',
  url: `${SITE}/our-work`,
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#business` },
  image: allProjects.map((project) => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE}${project.image.src}`,
    name: project.title,
    description: project.alt,
  })),
};

const Work = () => (
  <>
    <Seo
      title="Our Work | Garden Projects in Aylesbury & Bucks"
      description="Real gardens we maintain, plant and build across Bucks, Beds and Herts — borders, hedges, lawns, raised beds, fencing, pergolas and paving, with what each job involved."
      path="/our-work"
      jsonLd={jsonLd}
    />
    <PageLayout
      eyebrow="Portfolio"
      title="Our Work"
      intro="Gardens we look after week to week, borders we have planted and structures we have built — photographed on the job rather than staged, with a note on what each one involved."
    >
      <WorkGallery />

      <section className="section-padding bg-background border-t border-border">
        <div className="container-wide max-w-3xl">
          <h2 className="font-heading heading-section text-foreground font-semibold mb-5">
            Thinking about your own garden?
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-4">
            Every garden on this page started with a look round and an honest conversation about
            what it needed first. Sometimes that is a full redesign; more often it is a tidy-up,
            then a regular visit to stop it getting away again.
          </p>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            We cover Aylesbury and the villages around it, out into Bedfordshire and
            Hertfordshire. Tell us what you are dealing with and we will tell you what we would do
            about it — quotes are free, and there is no obligation to book anything regular.
          </p>
        </div>
      </section>

      <ContactSection />
    </PageLayout>
  </>
);

export default Work;
