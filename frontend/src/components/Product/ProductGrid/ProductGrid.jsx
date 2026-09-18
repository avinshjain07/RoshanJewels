import ProductCard from '@components/Product/ProductCard/ProductCard';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

/**
 * ProductGrid — Renders visible product cards + infinite scroll sentinel.
 *
 * Props:
 *   visibleItems  — Array of products to render (from useInfiniteScroll)
 *   allCount      — Total filtered product count (for "showing X of Y")
 *   sentinelRef   — Ref to attach to sentinel div (from useInfiniteScroll)
 *   onView        — Callback to open modal: (productId) => void
 */
export default function ProductGrid({ visibleItems, allCount, sentinelRef, onView }) {
  // Trigger scroll reveal animation whenever new cards are added
  useScrollAnimation('.product-card', [visibleItems.length]);

  if (allCount === 0) {
    return (
      <div className="no-products">
        <i className="fas fa-search-minus"></i>
        <h3>No matching jewellery found</h3>
        <p>Try adjusting your search queries or category filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="products-grid" id="products-grid">
        {visibleItems.map((product) => (
          <ProductCard key={product.id} product={product} onView={onView} />
        ))}
      </div>

      {/* Sentinel for infinite scroll — observed by useInfiniteScroll hook */}
      {visibleItems.length < allCount && (
        <div
          ref={sentinelRef}
          style={{ height: '30px', width: '100%' }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
