import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Action from '@/components/Action';
import Reveal from '@/components/Reveal';
import Tag from '@/components/Tag';
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
  if (!message || message.length > 2000) errors.message = 'Please tell us about your garden';

  return errors;
};

const Spinner = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
    <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Loaded on demand so the toast library stays out of the initial bundle. */
const notify = async (kind: 'success' | 'error', message: string) => {
  const { toast } = await import('sonner');
  toast[kind](message);
};

const ContactSection = ({
  showIntro = true,
  flushTop = false,
}: {
  showIntro?: boolean;
  flushTop?: boolean;
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const location = useLocation();

  // The map embed is heavy, so it only mounts once it has scrolled into view.
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const node = mapRef.current;
    if (!node || showMap) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShowMap(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [showMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fieldErrors = validate(formData);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        // Send the keyboard where the problem is, not just a toast about it.
        const first = ['name', 'email', 'phone', 'message'].find((field) => fieldErrors[field]);
        if (first) document.getElementById(first)?.focus();
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
    <section
      id="contact"
      className={`on-ink bg-ink text-chalk ${flushTop ? 'pb-[clamp(4.5rem,9vw,10rem)] pt-12' : 'section'}`}
    >
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          {showIntro && (
            <>
              <Tag className="text-stone-light">Get in touch</Tag>
              <h2 className="display-2 mt-6 max-w-[14ch] text-balance">
                Tell us what you are dealing with
              </h2>
              <p className="lead mt-6 max-w-[40ch] text-pretty text-stone-light">
                I come and look at the garden, we talk through what you want, then I send a written
                quote with the costs broken down. No obligation.
              </p>
            </>
          )}

          <dl className={`rule-top ${showIntro ? 'mt-10' : ''}`}>
            <div className="rule-bottom py-6">
              <dt className="tag text-stone-light">Phone</dt>
              <dd className="mt-3">
                <a href="tel:+447950636954" className="nums font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none">
                  07950 636954
                </a>
                <span className="mt-3 block font-body text-sm text-stone-light">
                  Monday to Friday, 8am to 4pm
                </span>
              </dd>
            </div>

            <div className="rule-bottom grid grid-cols-[6.5rem_1fr] gap-6 py-5">
              <dt className="tag pt-1 text-stone-light">Email</dt>
              <dd>
                <a href="mailto:info@jw-gardenservices.co.uk" className="link-rule break-all text-[0.9375rem]">
                  info@jw-gardenservices.co.uk
                </a>
              </dd>
            </div>

            <div className="rule-bottom grid grid-cols-[6.5rem_1fr] gap-6 py-5">
              <dt className="tag pt-1 text-stone-light">Where</dt>
              <dd className="font-body text-[0.9375rem] text-chalk">
                Bierton, Aylesbury &mdash; covering Bucks, Beds and Herts
              </dd>
            </div>

            <div className="grid grid-cols-[6.5rem_1fr] gap-6 py-5">
              <dt className="tag pt-1 text-stone-light">Reviews</dt>
              <dd>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=JW%20Garden%20Services%20Bierton%20Aylesbury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-rule text-[0.9375rem]"
                >
                  Find us on Google
                </a>
              </dd>
            </div>
          </dl>

          <div ref={mapRef} className="mount mt-8">
            <div className="h-52 overflow-hidden bg-ink-raise">
              {showMap && (
                <iframe
                  title="JW Garden Services on Google Maps — Bierton, Aylesbury"
                  src="https://maps.google.com/maps?q=JW%20Garden%20Services%20Bierton%20Aylesbury&z=12&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale-[0.85] contrast-[0.95]"
                />
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <form onSubmit={handleSubmit} noValidate className="rule-top pt-8">
            <h2 className="display-3">Send an enquiry</h2>

            <div className="mt-8 space-y-7">
              <div>
                <label htmlFor="name" className="tag block text-stone-light">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`field mt-2 ${errors.name ? 'field-invalid' : ''}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 font-body text-sm text-[hsl(14_70%_68%)]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="tag block text-stone-light">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={255}
                    autoComplete="email"
                    spellCheck={false}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`field mt-2 ${errors.email ? 'field-invalid' : ''}`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 font-body text-sm text-[hsl(14_70%_68%)]">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="tag block text-stone-light">
                    Phone <span className="normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={40}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`field mt-2 ${errors.phone ? 'field-invalid' : ''}`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-2 font-body text-sm text-[hsl(14_70%_68%)]">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="tag block text-stone-light">
                  About your garden
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="A long back garden in Bierton, two borders and a hedge, weekly through the summer…"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`field mt-2 resize-none ${errors.message ? 'field-invalid' : ''}`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 font-body text-sm text-[hsl(14_70%_68%)]">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Action
                type="submit"
                tone="light"
                size="lg"
                disabled={isSubmitting}
                icon={isSubmitting ? <Spinner /> : undefined}
              >
                {isSubmitting ? 'Sending…' : 'Send enquiry'}
              </Action>
              <p className="max-w-[26ch] font-body text-sm text-stone-light">
                Quotes are free, and there is no obligation to book anything regular.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
