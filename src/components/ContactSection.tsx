import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEnquirySubmitted } from '@/lib/analytics';

// Form submissions are sent to a self-hosted PHP handler (public/enquiry.php)
// which emails the enquiry to both info@jw-gardenservices.co.uk and the Yahoo
// address. No backend database is required, so it works on any shared hosting.
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

/** Loaded on demand so the toast library stays out of the initial bundle. */
const notify = async (kind: 'success' | 'error', message: string) => {
  const { toast } = await import('sonner');
  toast[kind](message);
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
        void notify('error', 'Please check the highlighted fields');
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
        trackEnquirySubmitted(location.pathname);
        void notify('success', "Thank you — we've received your enquiry and will be in touch shortly.");
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('submission failed');
      }
    } catch {
      void notify('error', 'Sorry, something went wrong. Please call us or try again in a moment.');
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
                <h2 className="font-heading heading-section font-semibold tracking-tight text-balance mb-6">
                  Tell us about the garden
                </h2>
                <p className="font-body text-lg text-primary-foreground/80 leading-relaxed measure mb-6">
                  Quotes are free and we come out to look before we price anything. Say
                  roughly what you need and where you are, and we&rsquo;ll come back to you.
                </p>
              </>
            )}

            {/* Contact Details */}
            <dl className="border-t border-primary-foreground/15">
              <div className="flex flex-col sm:flex-row sm:gap-8 border-b border-primary-foreground/15 py-4">
                <dt className="font-body text-sm text-primary-foreground/60 sm:w-28 shrink-0">Phone</dt>
                <dd className="font-body">
                  <a href="tel:07950636954" className="underline underline-offset-4 decoration-primary-foreground/30 hover:decoration-primary-foreground transition-colors">
                    07950 636954
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-8 border-b border-primary-foreground/15 py-4">
                <dt className="font-body text-sm text-primary-foreground/60 sm:w-28 shrink-0">Email</dt>
                <dd className="font-body">
                  <a href="mailto:info@jw-gardenservices.co.uk" className="underline underline-offset-4 decoration-primary-foreground/30 hover:decoration-primary-foreground transition-colors break-all">
                    info@jw-gardenservices.co.uk
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-8 border-b border-primary-foreground/15 py-4">
                <dt className="font-body text-sm text-primary-foreground/60 sm:w-28 shrink-0">Based</dt>
                <dd className="font-body text-primary-foreground/85">
                  Bierton, Aylesbury &mdash; covering Bucks, Beds &amp; Herts
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-8 border-b border-primary-foreground/15 py-4">
                <dt className="font-body text-sm text-primary-foreground/60 sm:w-28 shrink-0">Hours</dt>
                <dd className="font-body text-primary-foreground/85">
                  Monday to Friday, 8am &ndash; 4pm
                </dd>
              </div>
            </dl>

            {/* Google Business Profile + map */}
            <div className="space-y-4 pt-8">
              <div className="overflow-hidden rounded-lg border border-primary-foreground/10">
                  <iframe
                    title="JW Garden Services on Google Maps — Bierton, Aylesbury"
                    src="https://maps.google.com/maps?q=JW%20Garden%20Services%20Bierton%20Aylesbury&z=12&output=embed"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=JW%20Garden%20Services%20Bierton%20Aylesbury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-hero-accent hover:underline"
                >
                  <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.92c-.52 2.81-2.1 5.19-4.48 6.79v5.66h7.24c4.24-3.91 6.44-9.66 6.44-16.46z"/>
                    <path fill="#34A853" d="M24 46c6.48 0 11.93-2.15 15.9-5.81l-7.24-5.66c-2.01 1.35-4.58 2.15-8.66 2.15-6.66 0-12.31-4.5-14.33-10.55H2.23v5.83C6.18 41.07 14.46 46 24 46z"/>
                    <path fill="#FBBC05" d="M9.67 26.13c-.51-1.56-.8-3.23-.8-4.93s.29-3.37.8-4.93V10.44H2.23A21.94 21.94 0 0 0 0 24.5c0 3.55.85 6.91 2.23 9.81l7.44-5.83z"/>
                    <path fill="#EA4335" d="M24 9.75c3.94 0 7.48 1.36 10.27 4.02l7.69-7.69C35.93 2.18 30.48 0 24 0 14.46 0 6.18 4.93 2.23 12.19l7.44 5.83C11.69 9.75 17.34 9.75 24 9.75z"/>
                  </svg>
                  Find us on Google and read our reviews
                </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-primary-foreground/5 rounded-lg p-8 md:p-10 border border-primary-foreground/10">
            <h3 className="font-heading text-2xl font-semibold mb-6">Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-body text-sm mb-2 text-primary-foreground/80">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-hero-accent transition-colors"
                  placeholder="Your name"
                  maxLength={100}
                />
                {errors.name && <p className="mt-1 font-body text-sm text-hero-accent">{errors.name}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block font-body text-sm mb-2 text-primary-foreground/80">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-hero-accent transition-colors"
                    placeholder="you@example.com"
                    maxLength={255}
                  />
                  {errors.email && <p className="mt-1 font-body text-sm text-hero-accent">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block font-body text-sm mb-2 text-primary-foreground/80">
                    Phone
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
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-hero-accent transition-colors resize-none"
                  placeholder="Roughly what you need, and which village you are in"
                  maxLength={2000}
                />
                {errors.message && <p className="mt-1 font-body text-sm text-hero-accent">{errors.message}</p>}
              </div>
              <Button type="submit" variant="accent" size="xl" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send message'}
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
