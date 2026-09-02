import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import WorkGallery from '@/components/WorkGallery';
import ContactSection from '@/components/ContactSection';
import { allProjects } from '@/lib/projects';

const SITE = 'https://jw-gardenservices.co.uk';

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
      description="Real gardens we maintain, plant and build across Bucks, Beds and Herts: borders, hedges, lawns, raised beds, fencing, pergolas and paving."
      path="/our-work"
      jsonLd={jsonLd}
    />
    <PageLayout
      eyebrow="Portfolio"
      title="Our work"
      intro="Gardens we look after week to week, borders we have planted and structures we have built — photographed on the job rather than staged."
    >
      <WorkGallery />

      <section className="section-tight rule-top">
        <div className="wrap max-w-measure">
          <h2 className="display-2 max-w-[16ch] text-balance">Thinking about your own garden?</h2>
          <div className="prose-estate mt-8 text-pretty text-[1.0625rem] text-stone">
            <p>
              Every garden on this page started with a look round and an honest conversation about
              what it needed first. Sometimes that is a full redesign; more often it is a tidy-up,
              then a regular visit to stop it getting away again.
            </p>
            <p>
              We cover Aylesbury and the villages around it, out into Buckinghamshire. Tell us what
              you are dealing with and we will tell you what we would do about it &mdash; quotes are
              free, and there is no obligation to book anything regular.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
    </PageLayout>
  </>
);

export default Work;
