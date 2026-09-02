import { Link } from 'react-router-dom';

import { images } from '@/lib/images';
import { services } from '@/lib/services';
import { areas } from '@/lib/areas';

const guildLogo = images['gardeners-guild-logo'];
const logo = { url: '/assets/jw-logo.png' };

const pages = [
  { to: '/about', label: 'About' },
  { to: '/our-work', label: 'Our work' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const areaLinks = [...areas].sort((a, b) => a.distanceMiles - b.distanceMiles);

  return (
    <footer className="on-ink bg-ink text-chalk">
      <div className="wrap py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            {/* The mark is dark ink on transparent, so on this ground it needs
                a light plaque to stay legible. */}
            <Link to="/" aria-label="JW Garden Services — home" className="inline-block bg-chalk px-5 py-4">
              <img
                src={logo.url}
                alt="JW Garden Services"
                width={255}
                height={102}
                loading="lazy"
                decoding="async"
                className="block h-12 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-[34ch] text-pretty font-body text-[0.9375rem] text-stone-light">
              Garden maintenance, planting and hard landscaping from Bierton, Aylesbury — across
              Buckinghamshire, Bedfordshire and Hertfordshire.
            </p>
            <a href="tel:+447950636954" className="nums mt-6 block font-display text-2xl text-chalk">
              07950 636954
            </a>
          </div>

          <nav className="lg:col-span-3" aria-label="Services">
            <h2 className="tag text-stone-light">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="font-body text-[0.9375rem] text-chalk/85 transition-colors duration-300 hover:text-ceanothus-light"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Pages">
            <h2 className="tag text-stone-light">Pages</h2>
            <ul className="mt-5 space-y-3">
              {pages.map((page) => (
                <li key={page.to}>
                  <Link
                    to={page.to}
                    className="font-body text-[0.9375rem] text-chalk/85 transition-colors duration-300 hover:text-ceanothus-light"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="tag text-stone-light">Accredited</h2>
            <a
              href="https://thegardenersguild.co.uk/"
              target="_blank"
              rel="noopener"
              className="group mt-5 block"
            >
              <img
                src={guildLogo.src}
                alt="The Gardeners Guild"
                width={guildLogo.width}
                height={guildLogo.height}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto bg-chalk p-1.5"
              />
              <span className="mt-4 block max-w-[28ch] font-body text-sm text-stone-light transition-colors duration-300 group-hover:text-chalk">
                We work to The Gardeners Guild standards for professional gardening.
              </span>
            </a>
          </div>
        </div>

        <nav className="rule-top mt-14 pt-8" aria-label="Areas we cover">
          <h2 className="tag text-stone-light">Gardeners near you</h2>
          <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            {areaLinks.map((area) => (
              <li key={area.slug}>
                <Link
                  to={`/${area.slug}`}
                  className="font-body text-sm text-chalk/70 transition-colors duration-300 hover:text-ceanothus-light"
                >
                  {area.town}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rule-top mt-10 flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="tag text-stone-light/70">© {year} JW Garden Services</p>
          <p className="tag text-stone-light/70">Bierton · Aylesbury · Buckinghamshire</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
