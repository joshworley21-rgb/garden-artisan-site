import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Action from '@/components/Action';
import Tag from '@/components/Tag';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Seo
        title="Page not found | JW Garden Services"
        description="The page you were looking for could not be found."
        path="/404"
        noindex
      />
      <Header />
      <main id="main" className="flex flex-1 items-center">
        <div className="wrap py-32">
          <Tag className="text-stone">404</Tag>
          <h1 className="display-1 mt-6 max-w-[14ch] text-balance">This path has grown over</h1>
          <p className="lead mt-6 max-w-[42ch] text-pretty text-stone">
            The page you were looking for is not here. The services, the portfolio and the areas we
            cover are all a click away.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Action to="/">Back to the start</Action>
            <a href="tel:+447950636954" className="link-rule nums font-body text-[0.9375rem]">
              07950 636954
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
