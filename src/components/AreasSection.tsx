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
    <section id="areas" className="section-padding bg-secondary/60">
      <div className="container-wide">
        <div className="ruled-head grid lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div className="lg:col-span-7">
            <span className="label label-rule text-accent mb-5 block">
              Service Area
            </span>
            <h2 className="font-heading heading-section text-foreground mb-6">
              Areas We Cover
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              JW Garden Services provides garden maintenance, garden design and hard
              landscaping in Aylesbury and the surrounding villages and towns across
              Buckinghamshire, Bedfordshire and Hertfordshire — making sure every outdoor
              need is met, whatever the season.
            </p>

            {/* Read as an index of the round, not as a checklist of features. */}
            <ul className="grid grid-cols-2 gap-x-6 sm:gap-x-10 border-t border-border">
              {areas.map((area) => {
                return (
                  <li key={area.slug} className="border-b border-border">
                    <Link
                      to={`/${area.slug}`}
                      className="group flex items-center justify-between gap-3 py-3 font-ui text-sm font-medium tracking-wide text-foreground transition-colors hover:text-accent"
                    >
                      {area.town}
                      <Check
                        className="h-3.5 w-3.5 shrink-0 text-accent/60 transition-colors group-hover:text-accent"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="font-body text-sm text-muted-foreground mt-8 flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              Not on the list? We travel up to 25 miles from Bierton, Aylesbury — get in
              touch and we'll let you know.
            </p>
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className="lg:col-span-5 rounded-sm overflow-hidden border border-border bg-muted aspect-[4/3] sm:aspect-square lg:aspect-[4/5]"
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
