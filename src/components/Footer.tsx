import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

import { images } from '@/lib/images';
import { services } from '@/lib/services';
import { areas } from '@/lib/areas';

const guildLogo = images['gardeners-guild-logo'];
const logo = { url: '/assets/jw-logo.png' };

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/our-work', label: 'Our Work' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy Policy' },
  ];

  const serviceLinks = services.map((s) => ({
    to: `/services/${s.slug}`,
    label: s.navLabel,
  }));

  const areaLinks = [...areas].sort((a, b) => a.distanceMiles - b.distanceMiles).map((a) => ({ to: `/${a.slug}`, label: a.town }));

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* The logo's ink is almost entirely dark, so it needs a light plaque
                to stay legible against the near-black footer. */}
            <Link
              to="/"
              aria-label="JW Garden Services home"
              className="inline-block mb-4 rounded-lg bg-background px-4 py-3"
            >
              <img
                src={logo.url}
                alt="JW Garden Services"
                width={255}
                height={102}
                loading="lazy"
                decoding="async"
                className="block h-14 w-auto"
              />
            </Link>
            <p className="font-body text-background/70 leading-relaxed mb-6 max-w-md">
              Garden maintenance, landscaping and planting since 2017. Based in Bierton,
              Aylesbury, serving Bedfordshire, Buckinghamshire and Hertfordshire.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=JW%20Garden%20Services%20Bierton%20Aylesbury"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JW Garden Services on Google Business Profile"
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-hero-accent transition-colors group"
              >
                <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.92c-.52 2.81-2.1 5.19-4.48 6.79v5.66h7.24c4.24-3.91 6.44-9.66 6.44-16.46z"/>
                  <path fill="#34A853" d="M24 46c6.48 0 11.93-2.15 15.9-5.81l-7.24-5.66c-2.01 1.35-4.58 2.15-8.66 2.15-6.66 0-12.31-4.5-14.33-10.55H2.23v5.83C6.18 41.07 14.46 46 24 46z"/>
                  <path fill="#FBBC05" d="M9.67 26.13c-.51-1.56-.8-3.23-.8-4.93s.29-3.37.8-4.93V10.44H2.23A21.94 21.94 0 0 0 0 24.5c0 3.55.85 6.91 2.23 9.81l7.44-5.83z"/>
                  <path fill="#EA4335" d="M24 9.75c3.94 0 7.48 1.36 10.27 4.02l7.69-7.69C35.93 2.18 30.48 0 24 0 14.46 0 6.18 4.93 2.23 12.19l7.44 5.83C11.69 9.75 17.34 9.75 24 9.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading heading-sub mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-background/70 hover:text-hero-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading heading-sub mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-background/70 hover:text-hero-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accreditation */}
          <div>
            <h4 className="font-heading heading-sub mb-4">Accreditation</h4>
            <a
              href="https://thegardenersguild.co.uk/"
              target="_blank"
              rel="noopener"
              className="inline-flex flex-col gap-3 group"
              aria-label="The Gardeners Guild, a professional gardening association"
            >
              <img
                src={guildLogo.src}
                alt="The Gardeners Guild logo"
                width={guildLogo.width}
                height={guildLogo.height}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto self-start object-contain bg-background rounded-sm p-1 transition-transform group-hover:scale-[1.03] motion-reduce:transform-none"
              />
              <span className="font-body text-sm text-background/70 group-hover:text-hero-accent transition-colors">
                Proud to follow The Gardeners Guild standards for professional gardening
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pb-8 border-t border-background/10 pt-8">
          <h4 className="font-heading heading-sub mb-4">Gardeners near you</h4>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {areaLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="font-body text-sm text-background/70 hover:text-hero-accent transition-colors">
                  Gardeners in {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-background/50">
            © {currentYear} JW Garden Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
