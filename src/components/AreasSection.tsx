import { useEffect, useRef, useState } from 'react';
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
            <h2 className="font-heading heading-section text-foreground tracking-tight text-balance mb-6">
              Areas We Cover
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed measure mb-8">
              JW Garden Services provides garden maintenance, garden design and hard
              landscaping in Aylesbury and the surrounding villages and towns across
              Buckinghamshire, Bedfordshire and Hertfordshire — making sure every outdoor
              need is met, whatever the season.
            </p>

            {/* Distances, not tick marks. The mileage is already in the data and it
                answers the question a customer actually has. */}
            <ul className="grid sm:grid-cols-2 gap-x-10">
              {areas.map((area) => (
                <li key={area.slug} className="border-t border-border">
                  <Link
                    to={`/${area.slug}`}
                    className="flex items-baseline justify-between gap-4 py-3 font-body group"
                  >
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {area.town}
                    </span>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {area.distanceMiles} mi
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="font-body text-sm text-muted-foreground measure mt-8">
              Not on the list? We travel up to 25 miles from Bierton, Aylesbury — get in
              touch and we&rsquo;ll let you know.
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
