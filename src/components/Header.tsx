import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import Action from '@/components/Action';
import { services } from '@/lib/services';

const logo = { url: '/assets/jw-logo.png' };

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/our-work', label: 'Our work' },
  // Points at a section of the home page, so it must never light up as the
  // current page: NavLink matches on pathname and ignores the hash.
  { to: '/#areas', label: 'Areas', isSection: true },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Escape closes whichever layer is open; the page underneath stops scrolling
  // while the full-screen menu is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      setServicesOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const { style } = document.body;
    const previous = style.overflow;
    if (menuOpen) style.overflow = 'hidden';
    return () => {
      style.overflow = previous;
    };
  }, [menuOpen]);

  const servicesActive = location.pathname.startsWith('/services');

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[70] focus:bg-ink focus:px-5 focus:py-3 focus:text-chalk"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,padding] duration-700 ease-estate ${
          menuOpen
            ? 'border-b border-transparent py-4'
            : isScrolled
              ? 'border-b border-rule bg-chalk/90 py-2.5 backdrop-blur-md supports-[backdrop-filter]:bg-chalk/75'
              : 'border-b border-transparent py-4'
        }`}
      >
        <div className="wrap flex items-center justify-between gap-6">
          {/* The mark is dark ink on transparent: over the open menu it needs a
              light plaque, the same trick the footer uses. */}
          <Link
            to="/"
            aria-label="JW Garden Services — home"
            className={`shrink-0 transition-[background-color,padding] duration-500 ease-estate ${
              menuOpen ? 'bg-chalk px-3 py-2' : ''
            }`}
          >
            <img
              src={logo.url}
              alt="JW Garden Services"
              width={255}
              height={102}
              fetchPriority="high"
              decoding="async"
              className={`block w-auto object-contain object-left transition-[height] duration-700 ease-estate ${
                isScrolled ? 'h-10 sm:h-11' : 'h-11 sm:h-14'
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-9 nav:flex" aria-label="Main">
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className={`flex items-center gap-2 py-2 font-body text-[0.9375rem] transition-colors duration-300 hover:text-ceanothus ${
                  servicesActive ? 'text-ceanothus' : 'text-ink'
                }`}
              >
                Services
                <svg viewBox="0 0 10 6" aria-hidden="true" className={`h-1.5 w-2.5 transition-transform duration-500 ease-estate ${servicesOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </button>

              <div
                className={`absolute left-0 top-full pt-3 transition-[opacity,transform] duration-500 ease-estate ${
                  servicesOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                }`}
              >
                <div className="w-[19rem] border border-rule bg-chalk-wash shadow-plate">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="block border-b border-rule/70 px-6 py-4 transition-colors duration-300 last:border-0 hover:bg-chalk-mount"
                    >
                      <span className="block font-display text-[1.0625rem] leading-tight">{service.navLabel}</span>
                      <span className="tag mt-2 block text-stone">{service.eyebrow}</span>
                    </Link>
                  ))}
                  <NavLink
                    to="/#services"
                    onClick={() => setServicesOpen(false)}
                    className="block bg-chalk-mount px-6 py-3.5 font-body text-sm text-stone transition-colors hover:text-ink"
                  >
                    All four, side by side
                  </NavLink>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="py-2 font-body text-[0.9375rem] text-ink transition-colors duration-300 hover:text-ceanothus"
                activeClassName={link.isSection ? undefined : 'text-ceanothus'}
              >
                {link.label}
              </NavLink>
            ))}

            <a
              href="tel:+447950636954"
              className="nums font-mono text-[0.8125rem] tracking-wide text-stone transition-colors hover:text-ink xl:block hidden"
            >
              07950 636954
            </a>

            <Action to="/contact">Get a quote</Action>
          </nav>

          {/* Hamburger — the two rules cross into an X rather than disappearing. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center nav:hidden"
          >
            <span className="relative block h-3 w-7">
              <span
                className={`absolute left-0 block h-px w-full transition-transform duration-500 ease-estate ${
                  menuOpen ? 'top-1.5 rotate-45 bg-chalk' : 'top-0 bg-ink'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full transition-transform duration-500 ease-estate ${
                  menuOpen ? 'top-1.5 -rotate-45 bg-chalk' : 'top-3 bg-ink'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen menu. Links arrive one after another rather than together. */}
      <div
        id="site-menu"
        className={`on-ink fixed inset-0 z-50 bg-ink/[0.97] backdrop-blur-xl transition-opacity duration-500 ease-estate nav:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="wrap flex h-full flex-col justify-center gap-8 overflow-y-auto overscroll-contain py-28"
          aria-label="Main"
        >
          <ul className="space-y-1">
            {[
              { to: '/', label: 'Home' },
              ...services.map((s) => ({ to: `/services/${s.slug}`, label: s.navLabel })),
              { to: '/our-work', label: 'Our work' },
              { to: '/about', label: 'About' },
              { to: '/#areas', label: 'Areas we cover' },
              { to: '/contact', label: 'Contact' },
            ].map((link, i) => (
              <li
                key={link.to}
                className={`transition-[opacity,transform] duration-700 ease-estate ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 55}ms` : '0ms' }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1.5 font-display text-[clamp(1.75rem,7vw,2.5rem)] leading-tight text-chalk"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="rule-top pt-8">
            <span className="tag text-stone-light">Bierton, Aylesbury</span>
            <a href="tel:+447950636954" className="nums mt-3 block font-display text-3xl text-chalk">
              07950 636954
            </a>
            <a href="mailto:info@jw-gardenservices.co.uk" className="link-rule mt-3 inline-block text-sm">
              info@jw-gardenservices.co.uk
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
