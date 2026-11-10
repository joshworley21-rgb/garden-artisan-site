export interface Review {
  author: string;
  rating: number; // 1–5
  date: string; // ISO 8601, e.g. '2025-06-14'
  body: string;
  source: 'Google' | 'Facebook';
}

// Used by the "Read all reviews" link. Swap for your Google Business Profile
// review URL if you want to point straight at it.
export const reviewProfileUrl =
  'https://www.google.com/maps/search/?api=1&query=JW%20Garden%20Services%20Bierton%20Aylesbury';

// Paste real reviews below — name, star rating, date (YYYY-MM-DD) and the text.
// Leave the array empty and the testimonials section simply won't render.
export const reviews: Review[] = [
  // { author: 'Jane D.', rating: 5, date: '2025-05-10', body: '...', source: 'Google' },
];
