import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** A run of months, 1-indexed and inclusive. Work that crosses new year is
 *  written as two runs, because a bar cannot wrap. */
interface Band {
  from: number;
  to: number;
}

interface Task {
  name: string;
  bands: Band[];
}

/**
 * What happens when. Every row here comes from the service copy on this site —
 * weekly March to October, pruning in the dormant months, planting in autumn or
 * early spring, leaves and winter tidies at the end of the year.
 */
const tasks: Task[] = [
  { name: 'Mowing, edging and stripes', bands: [{ from: 3, to: 10 }] },
  { name: 'Hedges kept in shape', bands: [{ from: 4, to: 9 }] },
  { name: 'Borders weeded', bands: [{ from: 3, to: 10 }] },
  { name: 'Shrubs, roses and small trees pruned', bands: [{ from: 11, to: 12 }, { from: 1, to: 3 }] },
  { name: 'Mulching', bands: [{ from: 2, to: 4 }] },
  { name: 'New borders and planting', bands: [{ from: 3, to: 4 }, { from: 9, to: 11 }] },
  { name: 'Spring bulbs in the ground', bands: [{ from: 9, to: 11 }] },
  { name: 'Lawn feeds and aeration', bands: [{ from: 3, to: 5 }, { from: 9, to: 10 }] },
  { name: 'Leaf clearing and winter tidies', bands: [{ from: 10, to: 12 }, { from: 1, to: 1 }] },
  { name: 'Patios, paths and fencing', bands: [{ from: 1, to: 12 }] },
];

const describe = (bands: Band[]) => {
  if (bands.length === 1 && bands[0].from === 1 && bands[0].to === 12) return 'All year';
  return bands
    .map(({ from, to }) => (from === to ? MONTHS[from - 1] : `${MONTHS[from - 1]}–${MONTHS[to - 1]}`))
    .join(' · ');
};

const COLUMN = 100 / 12;

/**
 * The gardening year — the one thing on this site nobody else in the trade
 * shows. It is the argument for a trained gardener rather than a mowing round,
 * made as a chart instead of a claim, and the current month is marked so it
 * reads as advice about now rather than a diagram.
 */
const GardenYear = () => {
  // Resolved on the client so the prerendered HTML is not stamped with
  // whatever month the site was last built in.
  const [month, setMonth] = useState<number | null>(null);
  useEffect(() => setMonth(new Date().getMonth() + 1), []);

  const highlight = month === null ? null : { left: `${(month - 1) * COLUMN}%`, width: `${COLUMN}%` };

  return (
    <section id="the-year" className="on-ink section bg-ink text-chalk">
      <div className="wrap">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Tag className="text-stone-light">The gardening year</Tag>
            <h2 className="display-2 mt-6 max-w-[18ch] text-balance">
              Coming every week means nothing gets out of hand
            </h2>
          </div>
          <p className="lead max-w-[44ch] text-pretty text-stone-light lg:col-span-5 lg:pb-2">
            Shrubs and roses get pruned at the right time of year. That means healthier plants, and a
            lot more flower the next summer.
          </p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          {/* Month scale */}
          <div className="rule-bottom grid gap-x-8 pb-3 lg:grid-cols-[minmax(0,17rem)_1fr]">
            <span className="tag hidden text-stone-light lg:block">Work</span>
            <div className="relative">
              {highlight && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -top-1 bg-ceanothus-light/10"
                  style={highlight}
                />
              )}
              <div className="relative grid grid-cols-12">
                {MONTHS.map((label, i) => (
                  <span
                    key={label}
                    className={`tag text-center ${month === i + 1 ? 'text-ceanothus-light' : 'text-stone-light/70'}`}
                  >
                    <span className="sm:hidden">{label[0]}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ul>
            {tasks.map((task) => (
              <li
                key={task.name}
                className="grid items-center gap-x-8 gap-y-2 border-b border-rule-dark/60 py-3.5 lg:grid-cols-[minmax(0,17rem)_1fr]"
              >
                <div className="flex items-baseline justify-between gap-4 lg:block">
                  <span className="font-body text-[0.9375rem] leading-snug text-chalk">{task.name}</span>
                  <span className="tag whitespace-nowrap text-stone-light/70 lg:hidden">
                    {describe(task.bands)}
                  </span>
                </div>

                <div className="relative h-5">
                  {/* Month divisions, drawn once as a background rather than as
                      twelve empty elements per row. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(to right, hsl(var(--rule-dark)) 0 1px, transparent 1px calc(100% / 12))',
                    }}
                  />
                  {highlight && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 bg-ceanothus-light/10"
                      style={highlight}
                    />
                  )}
                  <div className="relative grid h-full grid-cols-12 items-center" aria-hidden="true">
                    {task.bands.map((band) => (
                      <span
                        key={`${band.from}-${band.to}`}
                        className="h-1.5 bg-ceanothus-light/80"
                        style={{ gridColumn: `${band.from} / ${band.to + 1}` }}
                      />
                    ))}
                  </div>
                  <span className="sr-only">{describe(task.bands)}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[60ch] font-body text-sm text-stone-light">
            {month !== null && (
              <span className="tag mr-3 text-ceanothus-light">Now &middot; {MONTHS[month - 1]}</span>
            )}
            The weeks move with the weather and with what your garden needs &mdash; this is the shape
            of a normal year, not a fixed timetable.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default GardenYear;
