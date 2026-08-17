import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// Form submissions are sent to a self-hosted PHP handler (public/enquiry.php)
// which emails the enquiry to Jw_gardenservices@yahoo.com. No backend database
// is required — works on any shared hosting (Hostinger, Fasthosts, etc.).
const validate = (formData: { name: string; email: string; phone: string; message: string }) => {
  const errors: Record<string, string> = {};
  const name = formData.name.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();
  const message = formData.message.trim();

  if (!name || name.length > 100) errors.name = 'Please enter your name';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
    errors.email = 'Please enter a valid email address';
  if (phone && phone.length > 40) errors.phone = 'Phone number must be less than 40 characters';
  if (!message || message.length > 2000) errors.message = 'Please tell us about your project';

  return errors;
};

const ContactSection = ({ showIntro = true, flushTop = false }: { showIntro?: boolean; flushTop?: boolean }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fieldErrors = validate(formData);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        toast.error('Please check the highlighted fields');
        return;
      }

      setErrors({});
      const res = await fetch('/enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          source_page: location.pathname,
        }),
      });

      if (res.ok) {
        toast.success("Thank you — we've received your enquiry and will be in touch shortly.");
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('submission failed');
      }
    } catch {
      toast.error('Sorry, something went wrong. Please call us or try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className={`section-padding bg-primary text-primary-foreground ${flushTop ? '!pt-8 md:!pt-10' : ''}`}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            {showIntro && (
              <>
                <span className="text-hero-accent font-body text-sm uppercase tracking-widest mb-4 block">
                  Contact Us
                </span>
                <h2 className="font-heading heading-section font-semibold mb-6">
                  Let's Transform
                  <span className="block italic font-normal">Your Garden</span>
                </h2>
                <p className="font-body text-lg text-primary-foreground/80 leading-relaxed mb-6">
                  Ready to create the outdoor space you've always dreamed of? Get in touch today 
                  for a free consultation. We'd love to hear about your project.
                </p>
              </>
            )}

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-hero-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Location</h3>
                  <p className="font-body text-primary-foreground/70">
                    Based in Bierton, Aylesbury<br />
                    Covering Beds, Bucks & Herts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-hero-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Phone</h3>
                  <p className="font-body text-primary-foreground/70">
                    <a href="tel:07950636954" className="hover:text-hero-accent transition-colors">07950 636954</a><br />
                    Call us for a free quote
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-hero-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Email</h3>
                  <p className="font-body text-primary-foreground/70">
                    <a href="mailto:Jw_gardenservices@yahoo.com" className="hover:text-hero-accent transition-colors break-all">Jw_gardenservices@yahoo.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-hero-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Hours</h3>
                  <p className="font-body text-primary-foreground/70">
                    Monday - Friday: 8am - 4pm<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg p-8 md:p-10 border border-primary-foreground/10">
            <h3 className="font-heading text-2xl font-semibold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-body text-sm mb-2 text-primary-foreground/80">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-hero-accent transition-colors"
                  placeholder="John Smith"
                  maxLength={100}
                />
                {errors.name && <p className="mt-1 font-body text-sm text-hero-accent">{errors.name}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block font-body text-sm mb-2 text-primary-foreground/80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-hero-accent transition-colors"
                    placeholder="john@example.com"
                    maxLength={255}
                  />
                  {errors.email && <p className="mt-1 font-body text-sm text-hero-accent">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block font-body text-sm mb-2 text-primary-foreground/80">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-hero-accent transition-colors"
                    placeholder="01234 567890"
                    maxLength={40}
                  />
                  {errors.phone && <p className="mt-1 font-body text-sm text-hero-accent">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block font-body text-sm mb-2 text-primary-foreground/80">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-hero-accent transition-colors resize-none"
                  placeholder="Tell us about your garden project..."
                  maxLength={2000}
                />
                {errors.message && <p className="mt-1 font-body text-sm text-hero-accent">{errors.message}</p>}
              </div>
              <Button type="submit" variant="accent" size="xl" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send Message'}
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
