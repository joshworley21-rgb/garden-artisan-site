/**
 * Google Ads conversion tracking.
 *
 * Nothing here loads or fires unless VITE_GADS_ID is set at build time, so the
 * site ships inert: no tag, no cookies, no banner. Set the IDs in .env and
 * rebuild to turn it on. See README.md § Conversion tracking.
 *
 * Consent: the Google tag sets cookies, which under UK PECR needs consent
 * before it happens — not after. So the tag is loaded with Consent Mode v2
 * defaulting to DENIED, and only updated to granted if the visitor accepts.
 * Loading the tag denied still lets Google model conversions without storing
 * anything on the device.
 */

const GADS_ID = import.meta.env.VITE_GADS_ID as string | undefined;
const FORM_LABEL = import.meta.env.VITE_GADS_FORM_LABEL as string | undefined;
const CALL_LABEL = import.meta.env.VITE_GADS_CALL_LABEL as string | undefined;

/** Tracking is off entirely until an Ads conversion ID is configured. */
export const isAnalyticsConfigured = (): boolean => Boolean(GADS_ID);

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

const gtag = (...args: GtagArgs): void => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
};

let loaded = false;

/**
 * Injects the Google tag with consent denied by default.
 *
 * Safe to call more than once. Does nothing during prerendering, where there is
 * no real visitor and a tag in the static HTML would fire for everyone.
 */
export const initAnalytics = (): void => {
  if (loaded || !GADS_ID || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  loaded = true;

  // Must be queued BEFORE the tag script runs, or the first page view is
  // recorded with default (granted) consent.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: '500',
  });
  gtag('js', new Date());
  gtag('config', GADS_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GADS_ID)}`;
  document.head.appendChild(script);
};

/** Called when the visitor accepts cookies. */
export const grantConsent = (): void => {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });
};

/** Called when the visitor declines. Conversions are still modelled, not stored. */
export const denyConsent = (): void => {
  gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
};

const sendConversion = (label: string | undefined, fallbackEvent: string): void => {
  if (!GADS_ID) return;
  if (label) {
    gtag('event', 'conversion', { send_to: `${GADS_ID}/${label}` });
    return;
  }
  // No label configured yet: still record a plain event so the action shows up
  // in the account and can be promoted to a conversion, rather than vanishing.
  gtag('event', fallbackEvent);
};

/**
 * A completed enquiry form. This is the primary conversion — it is the one that
 * lands a lead in the inbox, and the one bidding should optimise toward.
 */
export const trackEnquiryConversion = (): void => {
  sendConversion(FORM_LABEL, 'generate_lead');
};

/**
 * A tap on a phone number. Counts as a conversion because for a local trade
 * most enquiries are calls, and a campaign blind to calls optimises for the
 * minority of people who fill in forms.
 */
export const trackPhoneClick = (): void => {
  sendConversion(CALL_LABEL, 'phone_click');
};
