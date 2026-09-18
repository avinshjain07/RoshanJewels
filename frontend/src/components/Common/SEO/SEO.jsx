import { Helmet } from 'react-helmet-async';

/**
 * SEO — Per-page meta tags via react-helmet-async.
 * Manages: title, description, canonical, Open Graph, Twitter Cards.
 * Usage: <SEO title="..." description="..." canonical="..." />
 */
export default function SEO({
  title = 'Roshan Jewel | Crafting Stories in Gold Since 1965 | Indore',
  description = 'Roshan Jewel - A name born in 1965, carried forward with the quiet brilliance of three generations. Discover poetry cast in gold at our Indore showroom.',
  canonical = 'https://roshanjewels.com',
  ogImage = 'https://roshanjewels.com/logo%20(2).png',
  keywords = 'roshan jewel, roshan jewel indore, gold jewellery Indore, jewellery shop Indore',
  structuredData = null,
}) {
  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Roshan Jewel" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#d44c66" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Roshan Jewel" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured data (JSON-LD) if provided */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
