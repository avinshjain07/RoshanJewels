import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    gst,
    grandTotal,
    advanceTokenAmount
  } = useCart();

  const navigate = useNavigate();

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const whatsappInquiryText = `Hello Roshan Jewel, I am reviewing my shopping bag with ${itemCount} piece(s) totaling ₹${grandTotal.toLocaleString('en-IN')}. Could you please assist me with custom sizing and priority dispatch?`;
  const whatsappUrl = `https://wa.me/918224998809?text=${encodeURIComponent(whatsappInquiryText)}`;

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <i className="fas fa-shopping-bag"></i>
            <h3>Shopping Bag</h3>
            <span className="cart-item-count-badge">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={closeCart}
            aria-label="Close bag"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Insured Free Delivery Banner */}
        <div className="cart-transit-banner">
          <i className="fas fa-shield-alt"></i>
          <span>100% Insured Doorstep Transit • Free All Over India</span>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h4>Your Shopping Bag is Empty</h4>
              <p>
                Discover our signature diamond solitaires, pure 22K hallmarked gold, and royal bridal heirlooms.
              </p>
              <div className="empty-cart-actions">
                <Link to="/gold" className="btn-explore-cart" onClick={closeCart}>
                  Explore 22K Gold
                </Link>
                <Link to="/diamond" className="btn-explore-cart outline" onClick={closeCart}>
                  Explore Solitaires
                </Link>
              </div>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-card">
                  <div className="cart-item-thumb">
                    <img
                      src={product.images && product.images[0] ? product.images[0] : '/placeholder.png'}
                      alt={product.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <span className="cart-item-cat">{product.subcategory || product.category}</span>
                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => removeFromCart(product.id)}
                        title="Remove piece"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>

                    <h4 className="cart-item-title">{product.title}</h4>

                    <div className="cart-item-specs">
                      {product.purity && (
                        <span className="spec-pill purity">{product.purity}</span>
                      )}
                      {product.grossWeight && (
                        <span className="spec-pill weight">{product.grossWeight}</span>
                      )}
                      {product.diamondWeight && (
                        <span className="spec-pill diamond">{product.diamondWeight}</span>
                      )}
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-qty-controller">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="qty-number numeric-text">{quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      <div className="cart-item-price numeric-text slashed-zero">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Only when items exist) */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-bill-breakdown">
              <div className="bill-row">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span className="numeric-text slashed-zero">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="bill-row">
                <span>Applicable GST (3% Fine Jewellery)</span>
                <span className="numeric-text slashed-zero">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="bill-row">
                <span>Insured Doorstep Shipping</span>
                <span className="free-shipping-tag">FREE (Complimentary)</span>
              </div>
              <div className="bill-divider"></div>
              <div className="bill-row total-row">
                <span>Estimated Total</span>
                <span className="total-amount numeric-text slashed-zero">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Advance Token Notice */}
            <div className="advance-token-pill">
              <i className="fas fa-coins"></i>
              <span>
                Booking Token Option: Pay only <strong>₹{advanceTokenAmount.toLocaleString('en-IN')} (10%)</strong> now, balance on hallmarked delivery!
              </span>
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              className="btn-drawer-checkout"
              onClick={handleCheckout}
            >
              <i className="fas fa-lock"></i>
              <span>Proceed to Secure Checkout</span>
              <i className="fas fa-arrow-right"></i>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-drawer-whatsapp"
            >
              <i className="fab fa-whatsapp"></i>
              <span>Order via Master Jewellery Concierge</span>
            </a>

            {/* Trust Footer Badges */}
            <div className="drawer-trust-icons">
              <div className="trust-icon-item">
                <i className="fas fa-certificate"></i>
                <span>100% BIS Hallmarked</span>
              </div>
              <div className="trust-icon-item">
                <i className="fas fa-gem"></i>
                <span>Certified Gems</span>
              </div>
              <div className="trust-icon-item">
                <i className="fas fa-exchange-alt"></i>
                <span>Lifetime Exchange</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
