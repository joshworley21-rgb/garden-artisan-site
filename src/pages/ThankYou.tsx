import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';

/**
 * Where the enquiry form lands after a successful submission.
 *
 * The form used to resolve to an inline toast, which left Google Ads with no
 * URL to key a conversion goal on — the only signal was the gtag event fired
 * from the submit handler, and if that tag ever breaks the conversion is lost
 * silently. A real URL gives the account a second, independent way to count the
 * same lead: a "page visited /thank-you" goal.
 *
 * noindex because this page is meaningless out of context, and an organic
 * landing on it would count as a conversion it never earned.
 */
const ThankYou = () => (
  <>
    <Seo
      title="Thank you | JW Garden Services"
      description="Your enquiry has been sent to JW Garden Services. We will be in touch shortly."
      path="/thank-you"
      noindex
    />
    <PageLayout
      eyebrow="Enquiry sent"
      title="Thank you, we have your enquiry"
      intro="It has landed in our inbox and Josh will get back to you shortly, usually the same working day."
    >
      <section className="section-padding bg-background">
        <div className="container-wide max-w-3xl font-body text-muted-foreground leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading heading-sub text-foreground mb-3">What happens next</h2>
            <p>
              We read every enquiry properly rather than sending an automated reply. Josh will
              call or email to talk through what you are after, and to arrange a time to come
              and look at the garden if that would help.
            </p>
          </div>

          <div>
            <h2 className="font-heading heading-sub text-foreground mb-3">
              If it is urgent
            </h2>
            <p>
              Give us a ring on{' '}
              <a
                href="tel:07950636954"
                className="text-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
              >
                07950 636954
              </a>{' '}
              — we are on the phone Monday to Friday, 8am to 4pm. You can also email{' '}
              <a
                href="mailto:info@jw-gardenservices.co.uk"
                className="text-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground transition-colors break-all"
              >
                info@jw-gardenservices.co.uk
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">Back to the homepage</Link>
            </Button>
            <Link to="/our-work" className="text-sm text-primary underline underline-offset-4">
              Have a look at our recent work
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  </>
);

export default ThankYou;
