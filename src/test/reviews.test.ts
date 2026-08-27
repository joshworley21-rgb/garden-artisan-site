import { describe, it, expect } from 'vitest';
import { aggregate, reviewsJsonLd, BUSINESS_ID, type Review } from '@/lib/reviews';

const sample: Review[] = [
  {
    author: 'A. Customer',
    rating: 5,
    date: '2026-05-01',
    source: 'Google',
    body: 'Lawn has never looked better.',
  },
  {
    author: 'B. Customer',
    rating: 4,
    date: '2026-06-01',
    source: 'Google',
    town: 'Wendover',
    body: 'Tidy job on the hedges.',
  },
];

describe('aggregate', () => {
  it('returns null with no reviews, so nothing empty is published', () => {
    expect(aggregate([])).toBeNull();
  });

  it('averages the ratings to one decimal place', () => {
    expect(aggregate(sample)).toEqual({ average: 4.5, count: 2 });
  });
});

describe('reviewsJsonLd', () => {
  it('emits nothing when there are no reviews', () => {
    expect(reviewsJsonLd([])).toBeUndefined();
  });

  it('attaches the rating to the business declared in index.html', () => {
    const graph = reviewsJsonLd(sample)!['@graph'] as Record<string, unknown>[];
    const business = graph[0];

    expect(business['@id']).toBe(BUSINESS_ID);
    expect(business.aggregateRating).toMatchObject({
      '@type': 'AggregateRating',
      ratingValue: 4.5,
      reviewCount: 2,
    });
  });

  it('publishes one Review node per review, pointing back at the business', () => {
    const graph = reviewsJsonLd(sample)!['@graph'] as Record<string, unknown>[];
    const reviewNodes = graph.slice(1);

    expect(reviewNodes).toHaveLength(2);
    expect(reviewNodes[0]).toMatchObject({
      '@type': 'Review',
      itemReviewed: { '@id': BUSINESS_ID },
      reviewBody: 'Lawn has never looked better.',
    });
  });
});
