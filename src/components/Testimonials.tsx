import { Star } from 'lucide-react';
import { reviews, reviewProfileUrl } from '@/lib/reviews';

const SITE = 'https://jw-gardenservices.co.uk';

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={
          i < rating
            ? 'h-4 w-4 fill-current text-primary'
            : 'h-4 w-4 text-muted-foreground/40'
        }
        aria-hidden="true"
      />
    ))}
  </div>
);

const Testimonials = () => {
  if (reviews.length === 0) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#business`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average.toFixed(1),
      reviewCount: String(reviews.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: r.body,
    })),
  };

  return (
    <section id="reviews" className="section-padding bg-secondary/30 border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-wide">
        <div className="mb-12 lg:mb-16">
          <p className="kicker font-body mb-6">Reviews</p>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 className="lg:col-span-7 font-heading heading-section text-foreground">
              What customers say
            </h2>
            <p className="lg:col-span-5 font-body text-muted-foreground leading-relaxed">
              Rated {average.toFixed(1)} out of 5 from {reviews.length} reviews.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={`${r.author}-${r.date}`}
              className="flex flex-col rounded-lg border border-border/60 bg-card p-6 shadow-soft"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-4 flex-1 font-body text-muted-foreground leading-relaxed">
                &ldquo;{r.body}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-body text-sm text-foreground">
                {r.author}
                <span className="text-muted-foreground"> &middot; {r.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={reviewProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-move font-body text-primary underline underline-offset-4"
          >
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
