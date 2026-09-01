/**
 * Google Analytics 4 + Google Ads conversion tracking.
 *
 * The site had no measurement of any kind, so the Google Ads campaign could not
 * see which clicks turned into enquiries. The enquiry form resolves to an inline
 * toast rather than a /thank-you redirect, so there is no URL a conversion goal
 * could key on — the conversion has to be an event fired from the success branch
 * of the submit handler. Phone taps are the other half of the lead flow and are
 * tracked with one delegated listener rather than a handler on every tel: link.
 *
 * IDs come from the environment so nothing is hardcoded and the site keeps
 * working with them unset — see .env.example. Vite inlines VITE_* at BUILD time,
 * so a rebuild is required after changing them.
 */

type GtagArgs =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?]
  | ['consent', 'default' | 'update', Record<string, string>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID ?? '';
const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID ?? '';
const ENQUIRY_LABEL = import.meta.env.VITE_GOOGLE_ADS_ENQUIRY_LABEL ?? '';
const CALL_LABEL = import.meta.env.VITE_GOOGLE_ADS_CALL_LABEL ?? '';

/**
 * The prerender step (scripts/prerender.mjs) drives the real app in Playwright
 * against localhost, so without this guard every production build would fire a
 * pageview per route and pollute the account before a single visitor arrived.
 */
const isRealVisitor = () =>
  typeof window !== 'undefined' &&
  !['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

const isConfigured = () => Boolean(GA4_ID || ADS_ID);

let initialised = false;

const gtag = (...args: GtagArgs) => {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
};

/**
 * Injects gtag.js and configures whichever of GA4 / Google Ads is set.
 * Safe to call more than once; only the first call does anything.
 */
export const initAnalytics = () => {
  if (initialised || !isConfigured() || !isRealVisitor()) return;
  initialised = true;

  window.gtag = gtag;
  gtag('js', new Date());

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID || ADS_ID}`;
  document.head.appendChild(script);

  // Pageviews are sent manually on route change instead, otherwise the SPA only
  // ever reports the entry URL.
  if (GA4_ID) gtag('config', GA4_ID, { send_page_view: false });
  if (ADS_ID) gtag('config', ADS_ID);

  listenForPhoneClicks();
};

export const trackPageView = (path: string) => {
  if (!initialised || !GA4_ID) return;
  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

/**
 * Fired from the enquiry form's success branch — this is the primary lead.
 *
 * No value is sent, matching the snippet Google generated for the Submit lead
 * form action. When the tag omits a value Google falls back to the value set on
 * the conversion action itself, so the amount stays editable in the Ads UI
 * rather than being pinned here and needing a rebuild to change.
 */
export const trackEnquirySubmitted = (sourcePage: string) => {
  if (!initialised) return;
  gtag('event', 'generate_lead', { method: 'enquiry_form', source_page: sourcePage });
  if (ADS_ID && ENQUIRY_LABEL) {
    gtag('event', 'conversion', { send_to: `${ADS_ID}/${ENQUIRY_LABEL}` });
  }
};

/** One delegated listener covers every tel: link on every page. */
const listenForPhoneClicks = () => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target?.closest?.('a[href^="tel:"]')) return;

    gtag('event', 'contact', { method: 'phone' });
    if (ADS_ID && CALL_LABEL) {
      gtag('event', 'conversion', { send_to: `${ADS_ID}/${CALL_LABEL}` });
    }
  });
};
