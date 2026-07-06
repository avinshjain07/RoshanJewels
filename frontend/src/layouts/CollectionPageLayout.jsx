import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '@components/Common/SEO/SEO';
import Breadcrumb from '@components/Common/Breadcrumb/Breadcrumb';
import CategoryFilter from '@components/Filters/CategoryFilter/CategoryFilter';
import SearchBar from '@components/Filters/SearchBar/SearchBar';
import ProductGrid from '@components/Product/ProductGrid/ProductGrid';
import ProductModal from '@components/Product/ProductModal/ProductModal';
import { useProducts } from '@hooks/useProducts';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useModal } from '@hooks/useModal';
import { useDebounce } from '@hooks/useDebounce';
import { PAGE_SEO } from '@constants/seo';

/**
 * CollectionPageLayout — Shared layout for all collection and type pages.
 * Replaces the dynamic rendering logic of products-renderer.js in React form.
 *
 * Props:
 *   routeKey       — e.g. 'diamond', 'rings' (maps to SEO + context)
 *   pageContext    — From collection.service.getPageContext()
 *   filterOptions  — Array of filter button strings
 *   pageRoute      — e.g. '/diamond'
 */
export default function CollectionPageLayout({
  routeKey,
  pageContext,
  filterOptions,
  pageRoute,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filter and search from URL params (preserves shareable URLs)
  const urlFilter = searchParams.get('filter') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Update filter via URL param
  const handleFilterChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val === 'All') {
      params.delete('filter');
    } else {
      params.set('filter', val);
    }
    setSearchParams(params, { replace: true });
  };

  // Update search — local state for responsiveness, URL for shareability
  const handleSearchChange = (val) => {
    setLocalSearch(val);
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('search', val);
    } else {
      params.delete('search');
    }
    setSearchParams(params, { replace: true });
  };

  // Get filtered products
  const filteredProducts = useProducts(pageContext, urlFilter, debouncedSearch);

  // Infinite scroll batching (16 per batch)
  const { visibleItems, sentinelRef } = useInfiniteScroll(filteredProducts, 16);

  // Modal
  const { activeProduct, isOpen, openModal, closeModal, goPrev, goNext } =
    useModal(filteredProducts);

  const seo = PAGE_SEO[routeKey];

  return (
    <>
      {/* SEO */}
      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          canonical={seo.canonical}
          keywords={seo.keywords}
        />
      )}

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{pageContext.title}</h1>
          <p>{pageContext.subtitle}</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb
            pageTitle={pageContext.title}
            pageRoute={pageRoute}
            activeFilter={urlFilter}
            search={debouncedSearch}
          />

          {/* Search + Filters */}
          <div className="filter-search-section">
            <SearchBar
              value={localSearch}
              onChange={handleSearchChange}
            />
            <CategoryFilter
              options={filterOptions}
              activeFilter={urlFilter}
              onChange={handleFilterChange}
            />
          </div>

          {/* Product Grid */}
          <ProductGrid
            visibleItems={visibleItems}
            allCount={filteredProducts.length}
            sentinelRef={sentinelRef}
            onView={openModal}
          />
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className="custom-design">
        <div className="container">
          <div className="custom-content">
            <h2>Custom Jewellery Design</h2>
            <p>
              Have a unique design in mind? Our expert designers and craftsmen
              can bring your vision to life. From initial sketches to final
              creation, we work closely with you to create a masterpiece that
              is uniquely yours.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=918224998809&text=Hello%20Roshan%20Jewel%2C%20I%20would%20like%20to%20discuss%20a%20custom%20jewellery%20design.%20Could%20you%20please%20guide%20me%3F"
              className="btn-gold"
              target="_blank"
              rel="noreferrer"
            >
              Discuss Your Design
            </a>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={activeProduct}
        isOpen={isOpen}
        onClose={closeModal}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  );
}
