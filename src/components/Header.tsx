import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import logo from '@/assets/jw-logo.png.asset.json';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/our-work', label: 'Our Work' },
    { to: '/#areas', label: 'Areas We Cover' },
    { to: '/contact', label: 'Contact' },
  ];

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
          <Button variant="elegant" size="lg" className="whitespace-nowrap" asChild>
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
