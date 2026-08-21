import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { services } from '@/lib/services';
const logo = { url: '/assets/jw-logo.png' };

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/our-work', label: 'Our Work' },
    { to: '/#areas', label: 'Areas We Cover' },
  ];

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-soft transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center shrink-0 overflow-hidden"
          aria-label="JW Garden Services home"
        >
          <img
            src={logo.url}
            alt="JW Garden Services logo"
            width={255}
            height={102}
            fetchPriority="high"
            decoding="async"
            className="block object-contain object-left transition-all duration-300 h-12 sm:h-14 md:h-16 lg:h-[68px] xl:h-20 w-auto max-w-[58vw] sm:max-w-[280px] lg:max-w-[300px] xl:max-w-[400px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsServicesOpen((v) => !v)}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              className={`font-body text-[0.8rem] xl:text-sm uppercase tracking-[0.12em] xl:tracking-widest whitespace-nowrap flex items-center gap-1 transition-colors duration-300 hover:text-primary ${
                isServicesActive ? 'text-primary font-semibold' : 'text-foreground'
              }`}
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
              }`}
            >
              <div className="min-w-[260px] rounded-lg border border-border/60 bg-background shadow-elevated overflow-hidden">
                <NavLink
                  to="/#services"
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-5 py-3 font-body text-sm text-foreground hover:bg-secondary/40 hover:text-primary transition-colors border-b border-border/40"
                >
                  All Services
                </NavLink>
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onClick={() => setIsServicesOpen(false)}
                    className="block px-5 py-3 font-body text-sm text-foreground hover:bg-secondary/40 hover:text-primary transition-colors border-b border-border/40 last:border-0"
                  >
                    {service.navLabel}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="font-body text-[0.8rem] xl:text-sm uppercase tracking-[0.12em] xl:tracking-widest whitespace-nowrap text-foreground transition-colors duration-300 hover:text-primary"
              activeClassName="text-primary font-semibold"
            >
              {link.label}
            </NavLink>
          ))}
          <Button variant="hero" size="lg" className="whitespace-nowrap" asChild>
            <Link to="/contact">
              <Phone className="h-4 w-4" />
              Get in Touch
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          className="lg:hidden -mr-2 p-2 text-foreground transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 bg-background shadow-elevated transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container-wide py-6 flex flex-col gap-4">
          {/* Services expandable */}
          <div className="border-b border-border">
            <button
              type="button"
              onClick={() => setIsServicesOpen((v) => !v)}
              aria-expanded={isServicesOpen}
              className="font-body text-base text-foreground py-2 w-full flex items-center justify-between hover:text-primary transition-colors"
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <NavLink
                to="/#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-body text-sm text-muted-foreground py-2 pl-4 hover:text-primary transition-colors"
              >
                All Services
              </NavLink>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-body text-sm text-muted-foreground py-2 pl-4 hover:text-primary transition-colors"
                >
                  {service.navLabel}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body text-base text-foreground py-2 border-b border-border hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              {link.label}
            </NavLink>
          ))}
          <Button variant="hero" size="lg" className="mt-4" asChild>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Phone className="h-4 w-4" />
              Get in Touch
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
