import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

import { images } from '@/lib/images';

const guildLogo = images['gardeners-guild-logo'];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/our-work', label: 'Our Work' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" aria-label="JW Garden Services home" className="inline-block mb-4">
              <span className="font-heading text-2xl font-semibold text-background">JW Garden Services</span>
            </Link>
            <p className="font-body text-background/70 leading-relaxed mb-6 max-w-md">
              Transforming gardens with passion and expertise. Based in Bierton, Aylesbury, 
              serving Bedfordshire, Buckinghamshire, and Hertfordshire.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="JW Garden Services on Facebook" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-hero-accent transition-colors group">
                <Facebook aria-hidden="true" className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
              <a href="#" aria-label="JW Garden Services on Instagram" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-hero-accent transition-colors group">
                <Instagram aria-hidden="true" className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
              <a href="#" aria-label="JW Garden Services on LinkedIn" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-hero-accent transition-colors group">
                <Linkedin aria-hidden="true" className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
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
            <h4 className="font-heading text-lg font-semibold mb-4">Accreditation</h4>
            <a
              href="https://thegardenersguild.co.uk/"
              target="_blank"
              rel="noopener"
              className="inline-flex flex-col gap-3 group"
              aria-label="The Gardeners Guild — professional gardening association"
            >
              <img
                src={guildLogo.src}
                alt="The Gardeners Guild logo"
                width={guildLogo.width}
                height={guildLogo.height}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto object-contain object-left bg-background rounded-sm p-1 transition-transform group-hover:scale-105"
              />
              <span className="font-body text-sm text-background/70 group-hover:text-hero-accent transition-colors">
                Proud to follow The Gardeners Guild standards for professional gardening
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
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
