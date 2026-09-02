import { cn } from '@/lib/utils';
import type { ResponsiveImage } from '@/lib/images';

interface PlateProps {
  image: ResponsiveImage;
  alt: string;
  /** Passed straight to the img — always set this to match the layout. */
  sizes: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  priority?: boolean;
  className?: string;
}

/**
 * A photograph presented as a mounted print: a mount with a hairline, and the
 * image square-cornered inside it. Every picture on the site is shown this way,
 * which is what ties a page of very different photographs together.
 */
const Plate = ({ image, alt, sizes, aspect = 'aspect-[4/3]', priority = false, className }: PlateProps) => (
  <div className={cn('mount', className)}>
    <div className={cn('overflow-hidden bg-ink/5', aspect)}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="plate-img"
      />
    </div>
  </div>
);

export default Plate;
