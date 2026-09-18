import SEO from '@components/Common/SEO/SEO';
import Breadcrumb from '@components/Common/Breadcrumb/Breadcrumb';

export default function Kundan() {
  const pageTitle = "Kundan Polki";
  const pageRoute = "/kundan";

  return (
    <>
      <SEO
        title="Kundan Polki Collection | Roshan Jewel"
        description="Exquisite Jadau and Chased Gold Enamel Kundan Polki Masterpieces by Roshan Jewel."
      />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{pageTitle}</h1>
          <p>Royal heritage Jadau necklaces and pendant sets with fine Meenakari work</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="category-products">
        <div className="container">
          <Breadcrumb pageTitle={pageTitle} pageRoute={pageRoute} />

          {/* Placeholder for future images */}
          <div className="luxury-placeholder-grid">
            <div className="luxury-placeholder-card">
              <i className="fas fa-crown"></i>
              <h3>Kundan Necklace Sets</h3>
              <p>Image placeholder. Fit picture here later.</p>
            </div>
            <div className="luxury-placeholder-card">
              <i className="fas fa-crown"></i>
              <h3>Polki Earrings</h3>
              <p>Image placeholder. Fit picture here later.</p>
            </div>
            <div className="luxury-placeholder-card">
              <i className="fas fa-crown"></i>
              <h3>Jadau Bangles</h3>
              <p>Image placeholder. Fit picture here later.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
