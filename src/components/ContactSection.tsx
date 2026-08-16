import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const services = [
  'General Maintenance',
  'Garden design and Hard landscaping',
  'Commercial grounds maintenance',
  'Other / not sure',
];

const enquirySchema = z.object({
  name: z.string().trim().min(1, { message: 'Please enter your name' }).max(100, { message: 'Name must be less than 100 characters' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }).max(255, { message: 'Email must be less than 255 characters' }),
  phone: z.string().trim().max(40, { message: 'Phone number must be less than 40 characters' }).optional().or(z.literal('')),
  service: z.string().trim().min(1, { message: 'Please select a service' }),
  message: z.string().trim().min(1, { message: 'Please tell us about your project' }).max(1800, { message: 'Message must be less than 1800 characters' }),
});

const inputClass =
  'w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = enquirySchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error('Please check the highlighted fields');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('enquiries').insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: `Service: ${parsed.data.service}\n\n${parsed.data.message}`,
        source_page: location.pathname,
      });
      if (error) throw error;
      toast.success("Thank you! We'll be in touch as soon as possible.");
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      toast.error('Something went wrong. Please call us on 07950 636954 instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg p-8 md:p-10 border border-primary-foreground/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-body text-sm mb-2 text-primary-foreground/80">
                  Full Name*
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required maxLength={100} className={inputClass} placeholder="Full name" />
                {errors.name && <p className="mt-1 font-body text-sm text-accent">{errors.name}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block font-body text-sm mb-2 text-primary-foreground/80">
                    Phone
                  </label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} maxLength={40} className={inputClass} placeholder="07000 000000" />
                  {errors.phone && <p className="mt-1 font-body text-sm text-accent">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm mb-2 text-primary-foreground/80">
                    Email*
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required maxLength={255} className={inputClass} placeholder="you@example.com" />
                  {errors.email && <p className="mt-1 font-body text-sm text-accent">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block font-body text-sm mb-2 text-primary-foreground/80">
                  Select a Service*
                </label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required className={inputClass}>
                  <option value="" className="text-foreground">Please select…</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="text-foreground">
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 font-body text-sm text-accent">{errors.service}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-sm mb-2 text-primary-foreground/80">
                  Message*
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} maxLength={1800} className={`${inputClass} resize-none`} placeholder="Tell us about your garden project..." />
                {errors.message && <p className="mt-1 font-body text-sm text-accent">{errors.message}</p>}
              </div>

              <Button type="submit" variant="accent" size="xl" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Submit'}
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-4">Contact Us</h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-10">
              We are here to help with any questions.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Phone</h3>
                  <a href="tel:07950636954" className="font-body text-primary-foreground/80 hover:text-accent transition-colors">
                    07950636954
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Email</h3>
                  <a href="mailto:JW_gardenservices@yahoo.com" className="font-body text-primary-foreground/80 hover:text-accent transition-colors break-all">
                    JW_gardenservices@yahoo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Address</h3>
                  <p className="font-body text-primary-foreground/80">
                    Portland close,<br />Aylesbury, Bucks,<br />HP22 7DG
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">Business Hours</h3>
                  <p className="font-body text-primary-foreground/80">
                    Mon - Fri: 8:00 AM - 5:00 PM<br />Saturday: Closed<br />Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <p className="font-heading text-2xl font-semibold">
              Don&rsquo;t wait! Our spring schedule fills up fast.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
