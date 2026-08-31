import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeferredToaster from "./components/DeferredToaster";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import ConsentBanner from "./components/ConsentBanner";
import { captureAttribution } from "./lib/attribution";

// Secondary routes are code-split so the mobile landing page ships less JS.
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const AreaDetail = lazy(() => import("./pages/AreaDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  // Read the campaign tags off the landing URL before any navigation drops them.
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
  <>
    <DeferredToaster />
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/our-work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* Local town landing pages, e.g. /gardeners-in-aylesbury */}
          <Route path="/:slug" element={<AreaDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* Inside the router: the banner links to the privacy page. */}
      <ConsentBanner />
    </BrowserRouter>
  </>
  );
};

export default App;
