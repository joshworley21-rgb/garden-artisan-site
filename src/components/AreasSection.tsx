import { useEffect, useRef, useState } from 'react';
import { Check, MapPin } from 'lucide-react';

const areas = [
  'Aylesbury',
  'Bierton',
  'Buckingham',
  'Tring',
  'Waddesdon',
  'Stone',
  'Wing',
  'Haddenham',
  'Leighton Buzzard',
  'Chesham',
  'Amersham',
  'Great Missenden',
];

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
            <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
              Service Area
            </span>
            <h2 className="font-heading heading-section text-foreground font-semibold mb-6">
              Areas We Cover
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              JW Garden Services provides garden maintenance, garden design and hard
              landscaping in Aylesbury and the surrounding villages and towns across
              Buckinghamshire, Bedfordshire and Hertfordshire — making sure every outdoor
              need is met, whatever the season.
            </p>

            <ul className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4">
              {areas.map((area) => (
                <li key={area} className="flex items-center gap-3 font-body text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-base">{area}</span>
                </li>
              ))}
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
            className="rounded-lg overflow-hidden shadow-elevated bg-muted aspect-[4/3] sm:aspect-square lg:aspect-[4/5]"
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
