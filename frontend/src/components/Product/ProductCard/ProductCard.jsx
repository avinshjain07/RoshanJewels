import { memo, useRef, useEffect } from 'react';

/**
 * ProductCard — Single product card with lazy image loading.
 * Pixel-perfect port of the .product-card HTML generated in products-renderer.js.
 *
 * Props:
 *   product  — product data object
 *   onView   — callback(productId) when "View Product" or image is clicked
 */
const ProductCard = memo(function ProductCard({ product, onView }) {
  const imgRef = useRef(null);

  // Lazy-load image via IntersectionObserver (mirrors data-src pattern in products-renderer.js)
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          img.src = product.images[0];
          img.onload = () => img.classList.add('loaded');
          obs.unobserve(img);
        }
      },
      { rootMargin: '150px 0px' }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [product.images]);

  const handleClick = () => onView(product.id);

  return (
    <div className="product-card" id={`product-${product.id}`}>
      {/* Badge */}
      {product.badge && (
        <div className="seller-badge">{product.badge}</div>
      )}

      {/* Image */}
      <div className="product-img" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img
          ref={imgRef}
          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' fill='%23fbeaec'></svg>"
          alt={`${product.title} - ${product.category}`}
          className="lazy-image"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="product-info">
        <span className="product-card-category">{product.subcategory.trim()}</span>
        <h3>{product.title}</h3>
        <button
          className="btn-view-product"
          onClick={handleClick}
          aria-label={`View ${product.title}`}
        >
          View Product
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
