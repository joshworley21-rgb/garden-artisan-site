import { useEffect, useRef, useState } from 'react';
import { Check, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { areas as areaPages } from '@/lib/areas';

// Sorted by driving distance from our Bierton base, capped at 12 (a tidy 6 x 2 grid).
const areas = [...areaPages]
  .sort((a, b) => a.distanceMiles - b.distanceMiles)
  .slice(0, 12);

const AreasSection = () => {
  // The Google Maps embed is heavy, so it only mounts once it scrolls into view.
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const node = mapRef.current;
    if (!node || showMap) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShowMap(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [showMap]);

  return (
    <section id="areas" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="kicker font-body mb-6">Service Area</p>
            <h2 className="font-heading heading-section text-foreground mb-6">
              Areas We Cover
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed measure mb-8">
              We cover Aylesbury and the surrounding villages and towns across
              Buckinghamshire, Bedfordshire and Hertfordshire. The nearest to our Bierton
              base are listed first.
            </p>

            <ul className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4">
              {areas.map((area) => (
                <li key={area.slug} className="font-body flex items-center gap-2.5 sm:gap-3">
                  {/* The tick is a list marker, not information — the town name
                      beside it is the whole content of the row. */}
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <Link
                    to={`/${area.slug}`}
                    className="text-sm sm:text-base text-foreground underline underline-offset-4 decoration-border hover:text-primary hover:decoration-primary/50 transition-colors"
                  >
                    {area.town}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="font-body text-sm text-muted-foreground measure mt-8 flex gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 mt-[0.2em]" strokeWidth={1.5} aria-hidden="true" />
              <span>
                Not on the list? We travel up to 25 miles from Bierton. Get in touch and
                we&rsquo;ll let you know.
              </span>
            </p>
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className="rounded-lg overflow-hidden border border-border bg-muted aspect-[4/3] sm:aspect-square lg:aspect-[4/5]"
          >
            {showMap && (
              <iframe
                title="Map showing the areas JW Garden Services covers around Aylesbury"
                src="https://www.google.com/maps?q=Bierton,+Aylesbury,+Buckinghamshire,+UK&z=10&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 h-full w-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
