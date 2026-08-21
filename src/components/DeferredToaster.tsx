import { lazy, Suspense, useEffect, useState } from 'react';

const Toaster = lazy(() =>
  import('@/components/ui/sonner').then((m) => ({ default: m.Toaster })),
);

/**
 * Toasts only ever appear after someone submits the contact form, so the toast
 * library has no business in the first load. Mount it once the page is idle.
 */
const DeferredToaster = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const start = () => setReady(true);
    const id = idle ? idle(start) : window.setTimeout(start, 1200);
    return () => {
      if (!idle) window.clearTimeout(id as number);
    };
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <Toaster />
    </Suspense>
  );
};

export default DeferredToaster;
