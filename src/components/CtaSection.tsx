import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-wide max-w-3xl text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-4">Ready to talk?</h2>
        <p className="font-body text-lg text-primary-foreground/85 mb-8">
          If your ready to transform your garden, contact us today for a free consultation and quote.
        </p>
        <Button variant="hero" size="xl" className="group" asChild>
          <Link to="/contact">
            Get a Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
