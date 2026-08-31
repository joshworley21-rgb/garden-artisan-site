import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  initAnalytics,
  grantConsent,
  denyConsent,
  isAnalyticsConfigured,
} from '@/lib/analytics';

/**
 * Cookie consent for the Google Ads tag.
 *
 * Only appears when tracking is actually configured — with no VITE_GADS_ID the
 * site sets no cookies at all, and a banner asking permission for nothing is
 * just an obstacle between a visitor and a quote.
 *
 * The choice is remembered in localStorage. That one entry is exempt from the
 * consent requirement: storage strictly necessary to provide a service the user
 * asked for covers remembering that they answered.
 */

const STORAGE_KEY = 'jw-cookie-consent';
type Choice = 'granted' | 'denied';

/** localStorage throws in some privacy modes, so every access is guarded. */
const readChoice = (): Choice | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
};

const writeChoice = (choice: Choice): void => {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // A visitor blocking storage still gets their choice honoured for this
    // visit; they will simply be asked again next time.
  }
};

const ConsentBanner = () => {
  // Starts hidden and is only shown from an effect, so the prerendered HTML
  // never contains a banner that flashes up before the choice is read.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;

    initAnalytics();

    const choice = readChoice();
    if (choice === 'granted') {
      grantConsent();
    } else if (choice === 'denied') {
      denyConsent();
    } else {
      setVisible(true);
    }
  }, []);

  const decide = (choice: Choice) => {
    writeChoice(choice);
    if (choice === 'granted') grantConsent();
    else denyConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      className="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border shadow-elevated"
    >
      <div className="container-wide py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="font-body text-sm text-muted-foreground flex-1">
          We use cookies to measure how well our advertising works. Nothing is stored
          unless you agree, and it makes no difference to how the site works.{' '}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="font-body text-sm px-4 py-2 rounded-md border border-border hover:bg-secondary transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="font-body text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
