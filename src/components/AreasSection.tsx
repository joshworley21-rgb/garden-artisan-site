import { MapPin } from 'lucide-react';

const areas = [
  'Aylesbury',
  'Bierton',
  'Wendover',
  'Weston Turville',
  'Stoke Mandeville',
  'Whitchurch',
  'Waddesdon',
  'Winslow',
  'Buckingham',
  'Tring',
  'Berkhamsted',
  'Leighton Buzzard',
];

const AreasSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide max-w-4xl text-center">
        <h2 className="font-heading text-4xl md:text-5xl text-foreground font-semibold mb-4">
          Areas we cover.
        </h2>
        <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
          JW Garden Services provides comprehensive gardening and landscaping solutions in Aylesbury
          and nearby regions, ensuring all your outdoor needs are met.
        </p>
        <ul className="flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <li
              key={area}
              className="inline-flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-4 py-2 font-body text-sm text-foreground"
            >
              <MapPin className="h-4 w-4 text-primary" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AreasSection;
