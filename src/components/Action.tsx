import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Arrow from '@/components/Arrow';

type Tone = 'ink' | 'light' | 'outline';

interface ActionProps {
  children: ReactNode;
  /** Internal route. Use `href` instead for tel:, mailto: and external links. */
  to?: string;
  href?: string;
  tone?: Tone;
  size?: 'md' | 'lg';
  type?: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  /** Replaces the arrow inside the trailing disc. */
  icon?: ReactNode;
}

const tones: Record<Tone, { shell: string; disc: string }> = {
  ink: {
    shell: 'bg-ink text-chalk hover:bg-ink-raise',
    disc: 'bg-chalk/15 group-hover:bg-chalk/25',
  },
  light: {
    shell: 'bg-chalk text-ink hover:bg-chalk-wash',
    disc: 'bg-ink/10 group-hover:bg-ink/20',
  },
  outline: {
    shell: 'border border-ink/25 text-ink hover:bg-ink hover:text-chalk',
    disc: 'bg-ink/10 group-hover:bg-chalk/20',
  },
};

/**
 * The site's one call to action: a pill with the label set in the body face,
 * and the arrow held in its own disc flush with the right edge rather than
 * floating next to the words. On hover the disc lifts diagonally, which is the
 * only place on the site anything moves on two axes.
 */
const Action = ({
  children,
  to,
  href,
  tone = 'ink',
  size = 'md',
  type = 'button',
  disabled,
  className,
  icon,
}: ActionProps) => {
  const { shell, disc } = tones[tone];

  const classes = cn(
    'group inline-flex items-center justify-between gap-5 rounded-full font-body font-medium',
    'transition-[background-color,color,transform] duration-500 ease-estate',
    'active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50',
    size === 'lg' ? 'py-2.5 pl-8 pr-2.5 text-base' : 'py-2 pl-7 pr-2 text-[0.9375rem]',
    shell,
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'grid place-items-center rounded-full transition-transform duration-500 ease-estate',
          'group-hover:translate-x-0.5 group-hover:-translate-y-px motion-reduce:transform-none',
          size === 'lg' ? 'h-10 w-10' : 'h-9 w-9',
          disc,
        )}
      >
        {icon ?? <Arrow />}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {inner}
    </button>
  );
};

export default Action;
