import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tag from '@/components/Tag';

interface PageLayoutProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/**
 * The masthead every page other than the home page opens with: label, title,
 * standfirst, then a rule. Same chalk ground as the rest of the page, so the
 * top of the site is quiet and the photographs do the work.
 */
const PageLayout = ({ eyebrow, title, intro, children }: PageLayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main id="main" className="flex-1">
      <section className="pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(7rem,13vw,10.5rem)]">
        <div className="wrap">
          {eyebrow && (
            <span className="enter block">
              <Tag className="text-stone">{eyebrow}</Tag>
            </span>
          )}
          <div className="mt-7 grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
            <h1
              className="display-1 enter text-balance lg:col-span-7"
              style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
            >
              {title}
            </h1>
            {intro && (
              <p
                className="lead enter max-w-[44ch] text-pretty text-stone lg:col-span-5 lg:pb-2"
                style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
              >
                {intro}
              </p>
            )}
          </div>
          <div className="rule-top mt-10 lg:mt-14" />
        </div>
      </section>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageLayout;
