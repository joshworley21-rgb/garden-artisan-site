import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const isInitialLoad = !hasNavigated.current;
    hasNavigated.current = true;

    // Back/forward *after* the app has already loaded: the browser already
    // restores scroll position for the history entry being returned to, so
    // forcing it here would fight that. The very first render also reports
    // as POP — that's just where browser history starts, not a real
    // back-navigation — so it still goes through the normal handling below
    // (a page loaded directly at, say, /#services should still scroll to it).
    if (navigationType === 'POP' && !isInitialLoad) return;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo(0, 0);

    // React Router never reloads the document, so nothing else tells a
    // screen reader a new page has loaded. Move focus to the main region on
    // every real navigation so it gets announced — but not on the first
    // render, where focus is already correctly at the top of the document.
    if (isInitialLoad) return;

    // Every route but "/" is lazy-loaded, and the Suspense boundary that
    // covers it can mount its resolved tree more than once before settling
    // (the fallback isn't a reveal of a pre-built tree — the real page gets
    // its own fresh mount, sometimes more than one). A reference captured
    // early can be disconnected by the time a delayed focus() call runs, and
    // focusing a disconnected node is a silent no-op. So this re-queries the
    // live element on every attempt instead of trusting a cached one, and
    // keeps retrying for a few frames until the focus actually lands.
    let attempts = 0;
    let raf = 0;
    const tryFocus = () => {
      const main = document.getElementById('main-content');
      if (main) main.focus({ preventScroll: true });
      if (main && document.activeElement === main) return;
      attempts += 1;
      if (attempts < 30) raf = requestAnimationFrame(tryFocus);
    };
    raf = requestAnimationFrame(tryFocus);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
