import { cn } from '@/lib/utils';

/**
 * The one arrow used across the site: a hairline stroke rather than the heavy
 * default icon weight, so it sits at the same visual weight as the rules.
 */
const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={cn('h-3.5 w-3.5', className)}>
    <path
      d="M3 8h10M9 4l4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Arrow;
