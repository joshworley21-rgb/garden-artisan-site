import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealElement = 'div' | 'section' | 'article' | 'figure' | 'li' | 'header' | 'aside';

interface RevealProps {
  /** Element to render. Defaults to a div. */
  as?: RevealElement;
  /** Stagger, in ms, applied as a CSS transition delay. */
  delay?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}

/**
 * Fades and lifts its children in as they scroll into view, once.
 *
 * The hidden state lives in CSS behind the `reveal-on` class (see index.css),
 * which means a page rendered without JavaScript — the prerendered HTML, or a
 * crawler that does not run scripts — shows everything immediately instead of
 * a column of invisible sections.
 */
const Reveal = ({ as: Element = 'div', delay = 0, className, id, children }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Fire a little before the element is fully on screen, so the movement
      // has finished by the time it is properly in view.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Element
      // @ts-expect-error — one ref type for every element this renders.
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      data-shown={shown ? 'true' : 'false'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Element>
  );
};

export default Reveal;
