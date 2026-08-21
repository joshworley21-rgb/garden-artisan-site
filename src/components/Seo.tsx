import { Helmet } from 'react-helmet-async';

const SITE = 'https://jw-gardenservices.co.uk';
/** Used when a page has no share image of its own, so links posted to Facebook,
 *  WhatsApp or LinkedIn always carry a picture rather than a bare headline. */
const DEFAULT_SHARE_IMAGE = '/assets/og/default.jpg';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
  /** Absolute-from-root path to a 1200x630 share image, e.g. /assets/og/foo.jpg */
  image?: string;
  imageAlt?: string;
}

const Seo = ({ title, description, path, noindex, jsonLd, image, imageAlt }: SeoProps) => {
  const url = `${SITE}${path}`;
  const imageUrl = `${SITE}${image ?? DEFAULT_SHARE_IMAGE}`;
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="JW Garden Services" />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta property="og:image:secure_url" content={imageUrl} />}
      {imageUrl && <meta property="og:image:width" content="1200" />}
      {imageUrl && <meta property="og:image:height" content="630" />}
      {imageUrl && <meta property="og:image:alt" content={imageAlt || title} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:image:alt" content={imageAlt || title} />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
