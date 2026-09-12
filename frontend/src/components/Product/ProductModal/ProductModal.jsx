import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@context/CartContext';
import { useWishlist } from '@context/WishlistContext';

/**
 * ProductModal — Lightbox modal for detailed product viewing, specifications,
 * direct e-commerce Add to Bag, 1-Click Buy Now, and WhatsApp inquiry.
 */
export default function ProductModal({ product, isOpen, onClose, onPrev, onNext }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Prevent scrolling behind modal
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const isSaved = isInWishlist(product.id);

  const handleAddBag = () => {
    addToCart(product, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    onClose();
    navigate('/checkout');
  };

  const whatsappText = `Hello Roshan Jewel, I am inquiring about the "${product.title}" (${product.sku || product.id}) priced at ₹${(product.price || 0).toLocaleString('en-IN')}. Could you please confirm current showroom availability and custom sizing?`;
  const whatsappUrl = `https://wa.me/918224998809?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div id="product-modal" className="product-modal active">
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Prev / Next navigation arrows */}
      <button className="modal-prev" aria-label="Previous product" onClick={onPrev}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="modal-next" aria-label="Next product" onClick={onNext}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Modal Content */}
      <div className="modal-content-wrapper">
        <button className="modal-close" aria-label="Close modal" onClick={onClose}>
          &times;
        </button>

        <div className="modal-body">
          {/* Image Column */}
          <div className="modal-img-container">
            <img
              id="modal-image"
              src={product.images && product.images[0] ? product.images[0] : '/placeholder.png'}
              alt={`${product.title} - ${product.category}`}
            />
            {product.purity && (
              <div className="modal-purity-stamp">
                <i className="fas fa-certificate"></i> {product.purity}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="modal-details">
            <div className="modal-category-row">
              <span id="modal-category" className="modal-category-badge">
                {product.subcategory ? product.subcategory.trim() : product.category}
              </span>
              {product.sku && (
                <span className="modal-sku-code numeric-text">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            <h2 id="modal-title">{product.title}</h2>

            {/* Price Row */}
            <div className="modal-price-container">
              <div className="modal-price-main">
                <span className="modal-price-current numeric-text slashed-zero">
                  ₹{(product.price || 0).toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="modal-price-original numeric-text slashed-zero">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="modal-discount-tag">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>
              <span className="modal-tax-note">
                <i className="fas fa-check-circle"></i> Price Inclusive of 3% GST & BIS Hallmarking
              </span>
            </div>

            {/* Specifications Grid */}
            <div className="modal-specs-grid">
              <div className="modal-spec-item">
                <span className="spec-label">Purity</span>
                <span className="spec-value">{product.purity || '22K (916) Gold'}</span>
              </div>
              <div className="modal-spec-item">
                <span className="spec-label">Gross Weight</span>
                <span className="spec-value numeric-text">{product.grossWeight || 'Standard'}</span>
              </div>
              {product.diamondWeight && (
                <div className="modal-spec-item">
                  <span className="spec-label">Diamonds</span>
                  <span className="spec-value numeric-text">{product.diamondWeight}</span>
                </div>
              )}
              {product.gemstone && (
                <div className="modal-spec-item">
                  <span className="spec-label">Gemstones</span>
                  <span className="spec-value">{product.gemstone}</span>
                </div>
              )}
              <div className="modal-spec-item">
                <span className="spec-label">Certification</span>
                <span className="spec-value">100% BIS HUID / IGI</span>
              </div>
              <div className="modal-spec-item">
                <span className="spec-label">Dispatch</span>
                <span className="spec-value">24–48 Hrs Free Insured Transit</span>
              </div>
            </div>

            {/* E-Commerce Actions */}
            <div className="modal-ecom-actions">
              <div className="primary-actions-row">
                <button
                  type="button"
                  className="btn-modal-add-bag"
                  onClick={handleAddBag}
                >
                  <i className="fas fa-shopping-bag"></i> Add to Shopping Bag
                </button>
                <button
                  type="button"
                  className="btn-modal-buy-now"
                  onClick={handleBuyNow}
                >
                  <i className="fas fa-bolt"></i> Buy Now
                </button>
              </div>

              <div className="secondary-actions-row">
                <button
                  type="button"
                  className={`btn-modal-wishlist ${isSaved ? 'saved' : ''}`}
                  onClick={() => toggleWishlist(product)}
                >
                  <i className={isSaved ? "fas fa-heart" : "far fa-heart"}></i>
                  <span>{isSaved ? "Saved to Wishlist" : "Add to Wishlist"}</span>
                </button>

                <a
                  id="modal-whatsapp-btn"
                  href={whatsappUrl}
                  className="btn-modal-whatsapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp"></i> Inquire on WhatsApp
                </a>
              </div>
            </div>

            {/* Assurances Banner */}
            <div className="modal-trust-banner">
              <div className="trust-pill">
                <i className="fas fa-shield-alt"></i> 100% Insured Delivery
              </div>
              <div className="trust-pill">
                <i className="fas fa-undo"></i> 7-Day Exchange
              </div>
              <div className="trust-pill">
                <i className="fas fa-store"></i> Indore Showroom Pickup
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
