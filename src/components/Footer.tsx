import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl font-semibold mb-4">
              JW Garden Services
            </h3>
            <p className="font-body text-background/70 leading-relaxed mb-6 max-w-md">
              Transforming gardens with passion and expertise. Based in Bierton, Aylesbury, 
              serving Bedfordshire, Buckinghamshire, and Hertfordshire.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors group">
                <Facebook className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors group">
                <Instagram className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors group">
                <Linkedin className="h-5 w-5 text-background group-hover:text-foreground" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="font-body text-background/70 hover:text-accent transition-colors">
                  Garden Maintenance
                </a>
              </li>
              <li>
                <a href="#services" className="font-body text-background/70 hover:text-accent transition-colors">
                  Garden Design
                </a>
              </li>
              <li>
                <a href="#services" className="font-body text-background/70 hover:text-accent transition-colors">
                  Hard Landscaping
                </a>
              </li>
              <li>
                <a href="#services" className="font-body text-background/70 hover:text-accent transition-colors">
                  Commercial Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="font-body text-background/70 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#work" className="font-body text-background/70 hover:text-accent transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#contact" className="font-body text-background/70 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-background/70 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-background/50">
            © {currentYear} JW Garden Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-body text-sm text-background/50">
              Member of the Chartered Institute of Horticulture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
