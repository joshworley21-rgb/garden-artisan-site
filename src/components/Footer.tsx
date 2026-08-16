import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/jw-logo.png.asset.json';
import guildLogo from '@/assets/gardeners-guild-logo.png.asset.json';

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
            <Link to="/" aria-label="JW Garden Services home" className="inline-block">
              <img
              src={logo.url}
              alt="JW Garden Services logo"
              width={255}
              height={102}
              className="block h-10 sm:h-12 lg:h-14 w-auto max-w-[240px] object-contain object-left mb-4 brightness-0 invert"
              />
            </Link>
            <p className="font-body text-background/70 leading-relaxed mb-6 max-w-md">
              Transforming gardens with passion and expertise. Based in Bierton, Aylesbury, 
              serving Bedfordshire, Buckinghamshire, and Hertfordshire.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-hero-accent transition-colors group">
                <Facebook className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-hero-accent transition-colors group">
                <Instagram className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-hero-accent transition-colors group">
                <Linkedin className="h-5 w-5 text-background group-hover:text-foreground" />
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
                src={guildLogo.url}
                alt="The Gardeners Guild logo"
                width={160}
                height={80}
                loading="lazy"
                className="h-14 w-auto object-contain object-left bg-background/90 rounded-md p-2 transition-transform group-hover:scale-105"
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
