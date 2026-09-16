import { Link } from 'react-router-dom';
import { useWishlist } from '@context/WishlistContext';
import { useCart } from '@context/CartContext';
import SEO from '@components/Common/SEO/SEO';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
  const { openCart, addToCart } = useCart();

  const handleMoveAll = () => {
    wishlist.forEach(item => {
      addToCart(item, 1);
    });
    openCart();
  };

  const whatsappInquiry = () => {
    const listText = wishlist.map((p, i) => `${i + 1}. ${p.title} (${p.purity || 'Jewellery'}) - ₹${(p.price || 0).toLocaleString('en-IN')}`).join('%0A');
    const message = `*Roshan Jewels Wishlist Inquiry*%0A%0AHello! I have curated the following pieces in my wishlist and would like more details and trial availability:%0A%0A${listText}`;
    window.open(`https://wa.me/918224998809?text=${message}`, '_blank');
  };

  return (
    <>
      <SEO
        title="My Curated Wishlist | Roshan Jewels"
        description="Review your curated collection of handcrafted 22K gold, certified diamond solitaires, and royal bridal heirlooms."
      />

      <section className="page-header wishlist-page-header">
        <div className="container">
          <span className="page-badge"><i className="fas fa-heart"></i> CURATED HEIRLOOMS</span>
          <h1>My Wishlist</h1>
          <p>Your personal collection of handcrafted jewellery pieces and diamond solitaires.</p>
        </div>
      </section>

      <section className="wishlist-page-section">
        <div className="container">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty-card">
              <div className="empty-icon">
                <i className="far fa-heart"></i>
              </div>
              <h2>Your Wishlist is Empty</h2>
              <p>Explore our timeless collections to save pieces you love for personal viewing or purchase.</p>
              <div className="empty-actions">
                <Link to="/gold" className="btn-gold-primary">
                  Explore 22K Gold
                </Link>
                <Link to="/diamond" className="btn-outline-gold">
                  Explore Diamonds
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Action Toolbar */}
              <div className="wishlist-toolbar">
                <span className="wishlist-count-text">
                  Showing <strong>{wishlist.length}</strong> saved {wishlist.length === 1 ? 'piece' : 'pieces'}
                </span>
                <div className="wishlist-toolbar-actions">
                  <button
                    type="button"
                    className="btn-toolbar-move-all"
                    onClick={handleMoveAll}
                  >
                    <i className="fas fa-shopping-bag"></i> Move All to Shopping Bag
                  </button>
                  <button
                    type="button"
                    className="btn-toolbar-whatsapp"
                    onClick={whatsappInquiry}
                  >
                    <i className="fab fa-whatsapp"></i> Inquire Wishlist on WhatsApp
                  </button>
                </div>
              </div>

              {/* Wishlist Grid */}
              <div className="wishlist-items-grid">
                {wishlist.map((product) => (
                  <div key={product.id} className="wishlist-card">
                    <button
                      type="button"
                      className="btn-card-remove"
                      onClick={() => removeFromWishlist(product.id)}
                      title="Remove from Wishlist"
                      aria-label="Remove item"
                    >
                      <i className="fas fa-times"></i>
                    </button>

                    <div className="wishlist-img-frame">
                      <img
                        src={product.images && product.images[0] ? product.images[0] : '/placeholder.png'}
                        alt={product.title}
                        loading="lazy"
                      />
                      {product.purity && (
                        <span className="purity-badge">{product.purity.split(' ')[0]}</span>
                      )}
                    </div>

                    <div className="wishlist-content">
                      <span className="wishlist-card-cat">{product.subcategory || product.category}</span>
                      <h3>{product.title}</h3>

                      <div className="wishlist-card-pricing">
                        <span className="wishlist-price-current numeric-text slashed-zero">
                          ₹{(product.price || 0).toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="wishlist-price-original numeric-text slashed-zero">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div className="wishlist-card-specs">
                        {product.grossWeight && (
                          <span><i className="fas fa-weight-hanging"></i> {product.grossWeight}</span>
                        )}
                        {product.diamondWeight && (
                          <span><i className="fas fa-gem"></i> {product.diamondWeight}</span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="btn-wishlist-add-bag"
                        onClick={() => { moveToCart(product); openCart(); }}
                      >
                        <i className="fas fa-shopping-bag"></i> Move to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
