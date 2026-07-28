import SEO from '@components/Common/SEO/SEO';
import Breadcrumb from '@components/Common/Breadcrumb/Breadcrumb';

export default function GemsStone() {
  const pageTitle = "Gems Stone";
  const pageRoute = "/gems-stone";

  return (
    <>
      <SEO
        title="Gems Stone Collection | Roshan Jewel"
        description="Explore the precious and semi-precious Gems Stone Collection by Roshan Jewel."
      />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{pageTitle}</h1>
          <p>Precious and Semi-Precious Natural Gemstone Collection</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="category-products">
        <div className="container">
          <Breadcrumb pageTitle={pageTitle} pageRoute={pageRoute} />

          {/* Placeholder for future images */}
          <div className="luxury-placeholder-grid">
            <div className="luxury-placeholder-card">
              <i className="fas fa-gem"></i>
              <h3>Ruby (Manik)</h3>
              <p>Image placeholder. Fit picture here later.</p>
            </div>
            <div className="luxury-placeholder-card">
              <i className="fas fa-gem"></i>
              <h3>Emerald (Panna)</h3>
              <p>Image placeholder. Fit picture here later.</p>
            </div>
            <div className="luxury-placeholder-card">
              <i className="fas fa-gem"></i>
              <h3>Blue Sapphire (Neelam)</h3>
              <p>Image placeholder. Fit picture here later.</p>
            </div>
            <div className="luxury-placeholder-card">
              <i className="fas fa-gem"></i>
              <h3>Yellow Sapphire (Pukhraj)</h3>
              <p>Image placeholder. Fit picture here later.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
