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
        <section className="bg-primary text-primary-foreground pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-wide max-w-3xl">
            {eyebrow && (
              <span className="font-body text-sm uppercase tracking-widest text-primary-foreground/70 mb-4 block">
                {eyebrow}
              </span>
            )}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              {title}
            </h1>
            {intro && (
              <p className="font-body text-lg text-primary-foreground/80 leading-relaxed">
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