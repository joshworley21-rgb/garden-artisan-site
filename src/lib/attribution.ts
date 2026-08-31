/**
 * Records where an enquiry came from, so a lead in the inbox can be traced back
 * to the ad, keyword or page that produced it.
 *
 * Deliberately held in memory for the life of the tab and NOWHERE else. No
 * cookie, no localStorage, no sessionStorage. Writing an identifier to a
 * visitor's device is exactly what PECR requires consent for, and the consent
 * banner would then have to block it — which would lose the attribution on
 * every visitor who declines. An ordinary variable is not device storage, needs
 * no consent, and survives client-side navigation from the ad landing page to
 * the contact page, which is the path that actually matters.
 *
 * The trade-off: a full page reload or a return visit loses it. That is the
 * right side to err on, and Google Ads still counts the conversion through its
 * own (consented) tag.
 */

/** Click identifiers Google appends to an ad's landing page URL. */
const CLICK_IDS = ['gclid', 'wbraid', 'gbraid'] as const;

/** Standard campaign tags, set on the ad final URLs in marketing/google-ads. */
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

export type AttributionKey =
  | (typeof CLICK_IDS)[number]
  | (typeof UTM_PARAMS)[number]
  | 'referrer'
  | 'landing_page';

export type Attribution = Partial<Record<AttributionKey, string>>;

/** Long values are almost certainly junk or an injection attempt. */
const MAX_VALUE_LENGTH = 300;

let captured: Attribution | null = null;

const clean = (value: string | null): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return trimmed === '' ? undefined : trimmed;
};

/**
 * Reads the campaign tags off the landing URL. Call once, as early as possible:
 * the first click into the site is the only place these appear, and any later
 * navigation has already dropped them.
 *
 * Calling it again is a no-op, so a remount cannot overwrite the original click
 * with a blank one.
 */
export const captureAttribution = (
  search: string = typeof window === 'undefined' ? '' : window.location.search,
  referrer: string = typeof document === 'undefined' ? '' : document.referrer,
  pathname: string = typeof window === 'undefined' ? '' : window.location.pathname,
): Attribution => {
  if (captured) return captured;

  const params = new URLSearchParams(search);
  const result: Attribution = {};

  for (const key of [...CLICK_IDS, ...UTM_PARAMS]) {
    const value = clean(params.get(key));
    if (value) result[key] = value;
  }

  // Only worth recording when the visit came from somewhere else; a same-site
  // referrer is just the previous page and tells you nothing about the source.
  const ref = clean(referrer);
  if (ref && typeof window !== 'undefined' && !ref.startsWith(window.location.origin)) {
    result.referrer = ref;
  }

  const landing = clean(pathname);
  if (landing) result.landing_page = landing;

  captured = result;
  return captured;
};

/** What was captured on entry, for sending along with an enquiry. */
export const getAttribution = (): Attribution => captured ?? {};

/** Whether this visit is traceable to a paid click. */
export const isPaidClick = (): boolean =>
  CLICK_IDS.some((key) => Boolean(getAttribution()[key]));

/** Test seam — production code never needs this. */
export const resetAttribution = (): void => {
  captured = null;
};
