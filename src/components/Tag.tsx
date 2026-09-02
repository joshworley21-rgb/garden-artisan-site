import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: ReactNode;
  /** Draw the short accent rule before the text. On by default. */
  rule?: boolean;
  className?: string;
}

/**
 * The site's label. Small, mono, letterspaced — and only ever used to carry a
 * fact: a cadence, a distance, a postcode, a month, a section name. Never
 * decoration, and never a pill badge.
 */
const Tag = ({ children, rule = true, className }: TagProps) => (
  <span className={cn('tag', rule && 'tag-rule', className)}>{children}</span>
);

export default Tag;
