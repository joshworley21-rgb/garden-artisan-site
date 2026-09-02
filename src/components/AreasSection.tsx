import { Link } from 'react-router-dom';
import Arrow from '@/components/Arrow';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
import { areas as areaPages } from '@/lib/areas';

// Nearest first: the list is a round, and a round has an order.
const areas = [...areaPages].sort((a, b) => a.distanceMiles - b.distanceMiles);

const AreasSection = () => (
  <section id="areas" className="section">
    <div className="wrap">
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Tag className="text-stone">The round</Tag>
          <h2 className="display-2 mt-6 max-w-[18ch] text-balance">
            Twenty-five miles from a village outside Aylesbury
          </h2>
        </div>
        <p className="lead max-w-[40ch] text-pretty text-stone lg:col-span-5 lg:pb-2">
          We are based in Bierton. These are the towns and villages we drive to, nearest first, with
          the postcodes we cover in each.
        </p>
      </Reveal>

      {/* A table of distances rather than a map: it answers the question a map
          only gestures at — how far away are you, and do you come to my
          postcode. */}
      <Reveal className="mt-14 lg:mt-20">
        <div className="rule-top grid grid-cols-[1fr_auto] gap-x-6 pb-3 pt-3 sm:grid-cols-[1fr_7rem_auto]">
          <span className="tag text-stone">Town or village</span>
          <span className="tag hidden text-right text-stone sm:block">From Bierton</span>
          <span className="tag text-right text-stone">Postcodes</span>
        </div>

        <ul>
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                to={`/${area.slug}`}
                className="rule-top group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-5 sm:grid-cols-[1fr_7rem_9rem]"
              >
                <span className="flex items-baseline gap-3 font-display text-[1.375rem] leading-tight transition-colors duration-500 ease-estate group-hover:text-ceanothus sm:text-[1.5rem]">
                  {area.town}
                  <Arrow className="row-arrow h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="sr-only">— gardeners in {area.town}</span>
                </span>
                <span className="tag nums hidden text-right text-stone sm:block">
                  {area.distanceMiles === 0 ? 'Our village' : `${area.distanceMiles} miles`}
                </span>
                <span className="tag nums text-right text-stone/80">{area.postcodes}</span>
                <span className="tag nums col-span-2 text-stone sm:hidden">
                  {area.distanceMiles === 0 ? 'Our village' : `${area.distanceMiles} miles from Bierton`}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="rule-top pt-6">
          <p className="max-w-[62ch] font-body text-sm text-stone">
            Not on the list? We travel up to 25 miles from Bierton &mdash; send us your postcode and
            we will tell you straight whether you are on the round.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default AreasSection;
