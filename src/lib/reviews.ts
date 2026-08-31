import rawReviews from '@/data/reviews.json';

/**
 * Customer reviews shown on the site and published as schema.org markup.
 *
 * The data lives in src/data/reviews.json so it can be edited without touching
 * code. Every entry must be a REAL review a customer actually left. Inventing
 * them, or padding the count, breaks Google's review snippet policy and risks
 * the rich result — and the Business Profile — being penalised.
 *
 * To add one, copy it verbatim from the Google Business Profile (or FreeIndex)
 * and append an object of this shape:
 *
 *   {
 *     "author": "Sarah T.",
 *     "rating": 5,
 *     "date": "2026-06-14",
 *     "source": "Google",
 *     "town": "Bedgrove",
 *     "body": "The exact words the customer wrote."
 *   }
 *
 * `town` is optional and only used as a caption. Trim nothing else: the text
 * must match what the customer published.
 */
export interface Review {
  author: string;
  /** Whole stars, 1-5. */
  rating: number;
  /** ISO date (YYYY-MM-DD) the review was left. */
  date: string;
  /** Where the customer left it, e.g. "Google", "FreeIndex". */
  source: string;
  /** Optional town or village, shown under the name. */
  town?: string;
  body: string;
}

export const BUSINESS_ID = 'https://jw-gardenservices.co.uk/#business';

/**
 * Where customers are sent to leave a review. This is the direct write-review
 * link for the Business Profile (Place ID ChIJycyvDxxhdkgRKTDKpm5GS9A), read
 * from the profile itself — it opens the review box straight away rather than
 * dropping people on a search results page to find it themselves.
 */
export const LEAVE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJycyvDxxhdkgRKTDKpm5GS9A';

/** Newest first, so the freshest review leads. */
export const reviews: Review[] = [...(rawReviews as Review[])].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export interface ReviewAggregate {
  /** Mean rating, rounded to one decimal place. */
  average: number;
  count: number;
}

export const aggregate = (list: Review[] = reviews): ReviewAggregate | null => {
  if (list.length === 0) return null;
  const total = list.reduce((sum, review) => sum + review.rating, 0);
  return {
    average: Math.round((total / list.length) * 10) / 10,
    count: list.length,
  };
};

/**
 * AggregateRating and Review nodes for the home page, attached to the
 * LocalBusiness declared in index.html by sharing its @id. Returns undefined
 * when there are no reviews — publishing an empty or zero rating is worse than
 * publishing none at all.
 */
export const reviewsJsonLd = (list: Review[] = reviews): Record<string, unknown> | undefined => {
  const summary = aggregate(list);
  if (!summary) return undefined;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'LandscapingBusiness'],
        '@id': BUSINESS_ID,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: summary.average,
          reviewCount: summary.count,
          bestRating: 5,
          worstRating: 1,
        },
      },
      ...list.map((review) => ({
        '@type': 'Review',
        itemReviewed: { '@id': BUSINESS_ID },
        author: { '@type': 'Person', name: review.author },
        datePublished: review.date,
        reviewBody: review.body,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    ],
  };
};
