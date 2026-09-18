import { useEffect } from 'react';

/**
 * ProductModal — Lightbox modal for product detail view.
 * Pixel-perfect port of the modal HTML from products-renderer.js.
 * Handles prev/next navigation, close on overlay click, and WhatsApp CTA.
 *
 * Props:
 *   product   — Active product object (null = modal closed)
 *   isOpen    — Boolean
 *   onClose   — () => void
 *   onPrev    — () => void
 *   onNext    — () => void
 */
export default function ProductModal({ product, isOpen, onClose, onPrev, onNext }) {
  // Prevent scrolling behind modal
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const whatsappText = `Hello Roshan Jewel, I would like to inquire about the "${product.title}" from your ${product.category} (${product.subcategory.trim()}). Could you please share more details?`;
  const whatsappUrl  = `https://api.whatsapp.com/send?phone=918224998809&text=${encodeURIComponent(whatsappText)}`;

  return (
    <div id="product-modal" className="product-modal active">
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Prev / Next arrows — outside modal-content-wrapper (matches original HTML) */}
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
          {/* Image */}
          <div className="modal-img-container">
            <img
              id="modal-image"
              src={product.images[0]}
              alt={`${product.title} - ${product.category}`}
            />
          </div>

          {/* Details */}
          <div className="modal-details">
            <span id="modal-category" className="modal-category-badge">
              {product.subcategory.trim()}
            </span>
            <h2 id="modal-title">{product.title}</h2>
            {/* Description commented out — matching existing hidden state */}
            {/* <p id="modal-description">{product.description}</p> */}
            <div className="modal-actions">
              <a
                id="modal-whatsapp-btn"
                href={whatsappUrl}
                className="btn-gold"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp"></i> Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
