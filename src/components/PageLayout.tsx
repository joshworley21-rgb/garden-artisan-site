import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

const PageLayout = ({ eyebrow, title, intro, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground pb-8 md:pb-10 pt-[clamp(7rem,12vw,10rem)] lg:pt-[clamp(10.5rem,13vw,11.5rem)]">
          <div className="container-wide max-w-3xl">
            {eyebrow && (
              <span className="font-body text-sm uppercase tracking-widest text-primary-foreground/70 mb-4 block">
                {eyebrow}
              </span>
            )}
            <h1 className="font-heading heading-section font-semibold mb-4">
              {title}
            </h1>
            {intro && (
              <p className="font-body body-lead text-primary-foreground/80">
                {intro}
              </p>
            )}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;