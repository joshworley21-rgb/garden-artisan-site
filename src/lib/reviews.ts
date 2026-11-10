export interface Review {
  author: string;
  rating: number; // 1–5
  date?: string; // ISO 8601, e.g. '2025-06-14' — optional
  body: string;
  source: 'Google' | 'Facebook';
}

// Used by the "Read all reviews" link. Swap for your Google Business Profile
// review URL if you want to point straight at it.
export const reviewProfileUrl =
  'https://www.google.com/maps/search/?api=1&query=JW%20Garden%20Services%20Bierton%20Aylesbury';

// Real customer reviews. Add more as they come in — name, star rating,
// optional date (YYYY-MM-DD), source and the text. Leave the array empty and
// the testimonials section simply won't render.
export const reviews: Review[] = [
  {
    author: 'Zoe',
    rating: 5,
    source: 'Google',
    body: 'Josh is friendly, hardworking and trustworthy. He always turns up on time and carries out his duties to the highest of standards. We would highly recommend his services.',
  },
];
