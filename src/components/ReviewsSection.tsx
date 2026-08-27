import { Star, Quote } from 'lucide-react';
import { reviews, aggregate, LEAVE_REVIEW_URL } from '@/lib/reviews';

const Stars = ({ rating, label }: { rating: number; label: string }) => (
  <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        aria-hidden="true"
        className={
          star <= rating
            ? 'h-4 w-4 fill-primary text-primary'
            : 'h-4 w-4 text-muted-foreground/30'
        }
      />
    ))}
  </span>
);

/**
 * Renders nothing until there are real reviews in src/data/reviews.json, so the
 * site never ships an empty "what customers say" shell or a zero-star rating.
 */
const ReviewsSection = () => {
  const summary = aggregate();
  if (!summary) return null;

  return (
    <section id="reviews" className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-2xl mb-10 md:mb-14">
          <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
            Reviews
          </span>
          <h2 className="font-heading heading-section text-foreground font-semibold mb-6">
            What Our Customers Say
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Rated <strong className="text-foreground">{summary.average} out of 5</strong> from{' '}
            {summary.count} {summary.count === 1 ? 'review' : 'reviews'} left by customers across
            Aylesbury and the surrounding villages.
          </p>
          <div className="mt-4">
            <Stars
              rating={Math.round(summary.average)}
              label={`Rated ${summary.average} out of 5 from ${summary.count} reviews`}
            />
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={`${review.author}-${review.date}`}
              className="relative rounded-lg bg-card shadow-soft p-6 flex flex-col"
            >
              <Quote className="h-6 w-6 text-primary/20 shrink-0 mb-4" aria-hidden="true" />
              <Stars rating={review.rating} label={`${review.rating} out of 5`} />
              <blockquote className="font-body text-foreground leading-relaxed mt-4 mb-6 flex-1">
                {review.body}
              </blockquote>
              <footer className="font-body text-sm text-muted-foreground">
                <cite className="not-italic font-medium text-foreground">{review.author}</cite>
                {review.town && <span> · {review.town}</span>}
                <span className="block mt-1">
                  <time dateTime={review.date}>
                    {new Date(review.date).toLocaleDateString('en-GB', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  {' · '}
                  {review.source}
                </span>
              </footer>
            </li>
          ))}
        </ul>

        <p className="font-body text-muted-foreground mt-10">
          Had us in your garden?{' '}
          <a
            href={LEAVE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-primary/30 hover:text-primary transition-colors"
          >
            Leave us a review
          </a>{' '}
          — it genuinely helps other people round here find us.
        </p>
      </div>
    </section>
  );
};

export default ReviewsSection;
