import { memo, useRef, useEffect, useState } from 'react';
import { useCart } from '@context/CartContext';

/**
 * ProductCard — Single luxury jewellery product card with quick add to bag,
 * wishlist toggle, and view modal trigger.
 */
const ProductCard = memo(function ProductCard({ product, onView }) {
  const imgRef = useRef(null);
  const [isAdded, setIsAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart } = useCart();

  const imageSrc = product.images && product.images[0] ? product.images[0] : '/placeholder.png';

  // Reliable lazy-load image handling
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      setImgLoaded(true);
      return;
    }

    const handleLoad = () => setImgLoaded(true);
    img.addEventListener('load', handleLoad);
    return () => img.removeEventListener('load', handleLoad);
  }, [imageSrc]);

  const handleClick = () => onView(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="product-card" id={`product-${product.id}`}>
      {/* Top Bar */}
      <div className="product-card-top-bar">
        {product.badge ? (
          <div className="seller-badge" title={product.badge}>
            {product.badge}
          </div>
        ) : null}
      </div>

      {/* Image */}
      <div className="product-img" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img
          ref={imgRef}
          src={imageSrc}
          alt={`${product.title} - ${product.category}`}
          className={`lazy-image ${imgLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Info & Actions */}
      <div className="product-info">
        <div className="product-meta-row">
          <span className="product-card-category">{product.subcategory ? product.subcategory.trim() : product.category}</span>
        </div>

        <h3 onClick={handleClick} style={{ cursor: 'pointer' }} title={product.title}>{product.title}</h3>

        {/* Action Buttons Row */}
        <div className="product-card-actions">
          <button
            type="button"
            className={`btn-add-bag ${isAdded ? 'added' : ''}`}
            onClick={handleQuickAdd}
            aria-label={`Add ${product.title} to Bag`}
          >
            {isAdded ? (
              <>
                <i className="fas fa-check"></i> Added
              </>
            ) : (
              <>
                <i className="fas fa-shopping-bag"></i> Add to Bag
              </>
            )}
          </button>
          <button
            type="button"
            className="btn-view-product"
            onClick={handleClick}
            aria-label={`View details of ${product.title}`}
          >
            <i className="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
