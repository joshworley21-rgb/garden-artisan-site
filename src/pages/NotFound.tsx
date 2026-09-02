import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/services';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout
      eyebrow="404"
      title="That page has moved or never existed"
      intro="The link you followed does not go anywhere on this site. Everything we do is one of the pages below."
    >
      <Seo
        title="Page not found | JW Garden Services"
        description="The page you were looking for could not be found."
        path="/404"
        noindex
      />
      <section className="section-padding bg-background">
        <div className="container-reading">
          <ul className="grid sm:grid-cols-2 gap-x-10">
            {services.map((service) => (
              <li key={service.slug} className="border-t border-border">
                <Link
                  to={`/services/${service.slug}`}
                  className="block py-4 font-body text-foreground hover:text-primary transition-colors"
                >
                  {service.navLabel}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">Back to the homepage</Link>
            </Button>
            <Link
              to="/contact"
              className="font-body text-sm text-primary underline underline-offset-4"
            >
              Or get in touch
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
