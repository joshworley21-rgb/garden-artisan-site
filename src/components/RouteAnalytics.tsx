import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '@/lib/analytics';

/**
 * Starts analytics on mount and reports a pageview per route. React Router
 * navigations never reload the document, so without this gtag would only ever
 * record the URL the visitor first landed on.
 */
const RouteAnalytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
};

export default RouteAnalytics;
