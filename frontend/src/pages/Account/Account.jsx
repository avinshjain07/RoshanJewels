import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { useWishlist } from '@context/WishlistContext';
import { useCart } from '@context/CartContext';
import SEO from '@components/Common/SEO/SEO';

export default function Account() {
  const { user, isAuthenticated, logout, orders, openAuthModal, addAddress, removeAddress, setDefaultAddress, updateProfile } = useAuth();
  const { wishlist, moveToCart, removeFromWishlist } = useWishlist();
  const { openCart } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'wishlist' | 'profile'

  // New Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrTag, setAddrTag] = useState('Home');

  // Edit Profile Form State
  const [profName, setProfName] = useState(user?.name || '');
  const [profPhone, setProfPhone] = useState(user?.phone || '');
  const [profileSaved, setProfileSaved] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <>
        <SEO
          title="Account Login | Roshan Jewels"
          description="Sign in to your Roshan Jewels account."
        />
        <section className="account-unauth-section">
          <div className="container">
            <div className="unauth-box">
              <div className="unauth-icon">
                <i className="fas fa-user-lock"></i>
              </div>
              <h2>Please Sign In to Access Your Account</h2>
              <p>Sign in to view your orders, delivery addresses, and VIP concierge privileges.</p>
              <button
                type="button"
                className="btn-gold-primary"
                onClick={() => openAuthModal('login')}
              >
                <i className="fas fa-sign-in-alt"></i> Sign In to Roshan Jewels
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addrName || !addrPhone || !addrLine1 || !addrCity || !addrPincode) {
      alert('Please fill in all required address fields.');
      return;
    }

    addAddress({
      name: addrName,
      phone: addrPhone,
      addressLine1: addrLine1,
      addressLine2: addrLine2,
      city: addrCity,
      state: addrState || 'Madhya Pradesh',
      pincode: addrPincode,
      tag: addrTag,
      isDefault: (user.addresses || []).length === 0
    });

    setAddrName('');
    setAddrPhone('');
    setAddrLine1('');
    setAddrLine2('');
    setAddrCity('');
    setAddrState('');
    setAddrPincode('');
    setShowAddressForm(false);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profName,
      phone: profPhone
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <SEO
        title="My Account & Orders | Roshan Jewels Privilege"
        description="Manage your Roshan Jewels orders, delivery addresses, and bespoke jewellery concierge."
      />

      <section className="account-dashboard-section">
        <div className="container">
          {/* Account Profile Header */}
          <div className="account-profile-header">
            <div className="profile-identity">
              <div className="profile-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'R'}
              </div>
              <div className="profile-info">
                <div className="profile-badge-row">
                  <span className="vip-tier-badge">
                    <i className="fas fa-crown"></i> {user.vipTier || 'Heritage Privilege Patron'}
                  </span>
                  <span className="membership-id-badge numeric-text">
                    ID: {user.membershipId || 'RJ-VIP-1965'}
                  </span>
                </div>
                <h2>{user.name}</h2>
                <p className="profile-contact">
                  <span><i className="fas fa-envelope"></i> {user.email}</span>
                  {user.phone && <span><i className="fas fa-phone-alt"></i> {user.phone}</span>}
                </p>
              </div>
            </div>

            <div className="profile-header-actions">
              <button
                type="button"
                className="btn-logout"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </div>
          </div>

          {/* Dashboard Navigation Tabs */}
          <div className="account-tabs-bar">
            <button
              type="button"
              className={`acc-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="fas fa-box"></i>
              <span>My Orders ({orders.length})</span>
            </button>
            <button
              type="button"
              className={`acc-tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <i className="fas fa-map-marker-alt"></i>
              <span>Saved Addresses ({(user.addresses || []).length})</span>
            </button>
            <button
              type="button"
              className={`acc-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <i className="fas fa-heart"></i>
              <span>My Wishlist ({wishlist.length})</span>
            </button>
            <button
              type="button"
              className={`acc-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user-cog"></i>
              <span>Profile Settings</span>
            </button>
          </div>

          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="account-tab-content">
              {orders.length === 0 ? (
                <div className="account-empty-state">
                  <div className="empty-state-icon">
                    <i className="fas fa-box-open"></i>
                  </div>
                  <h3>No Orders Placed Yet</h3>
                  <p>Explore our exquisite 22K gold and certified diamond collections to place your first bespoke order.</p>
                  <Link to="/gold" className="btn-gold-primary">
                    Explore Collections
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <div className="order-header-left">
                          <span className="order-id-label">ORDER ID:</span>
                          <span className="order-id-value numeric-text">{order.id}</span>
                          <span className="order-date numeric-text">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="order-header-right">
                          <span className="order-status-badge">
                            <i className="fas fa-check-circle"></i> {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Timeline Progress */}
                      <div className="order-timeline-track">
                        <div className="timeline-step done">
                          <div className="step-circle"><i className="fas fa-check"></i></div>
                          <span>Order Placed</span>
                        </div>
                        <div className="timeline-step active">
                          <div className="step-circle"><i className="fas fa-gem"></i></div>
                          <span>Hallmark Testing</span>
                        </div>
                        <div className="timeline-step">
                          <div className="step-circle"><i className="fas fa-truck"></i></div>
                          <span>Insured Dispatch</span>
                        </div>
                        <div className="timeline-step">
                          <div className="step-circle"><i className="fas fa-home"></i></div>
                          <span>Delivered</span>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="order-items-grid">
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} className="order-item-row">
                            <img
                              src={item.product?.images?.[0] || '/placeholder.png'}
                              alt={item.product?.title || 'Jewellery'}
                              className="order-item-img"
                            />
                            <div className="order-item-info">
                              <h4>{item.product?.title}</h4>
                              <p className="order-item-meta">
                                {item.product?.purity && <span>{item.product.purity} • </span>}
                                <span>Qty: {item.quantity}</span>
                              </p>
                            </div>
                            <div className="order-item-price numeric-text slashed-zero">
                              ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer Summary */}
                      <div className="order-card-footer">
                        <div className="order-payment-info">
                          <span>Payment Mode: <strong>{order.paymentMethod || 'Prepaid'}</strong></span>
                          <span>Delivery: <strong>{order.shippingMethod || 'Free Insured Courier'}</strong></span>
                        </div>
                        <div className="order-total-amount">
                          <span>Total Paid:</span>
                          <strong className="numeric-text slashed-zero">₹{(order.grandTotal || 0).toLocaleString('en-IN')}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="account-tab-content">
              <div className="addresses-header-row">
                <h3>Delivery Addresses</h3>
                {!showAddressForm && (
                  <button
                    type="button"
                    className="btn-add-address"
                    onClick={() => setShowAddressForm(true)}
                  >
                    <i className="fas fa-plus"></i> Add New Address
                  </button>
                )}
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <div className="add-address-card">
                  <h4><i className="fas fa-map-marker-alt"></i> Add New Delivery Address</h4>
                  <form onSubmit={handleSaveAddress}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Recipient Name <span>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          value={addrName}
                          onChange={(e) => setAddrName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Mobile Number <span>*</span></label>
                        <input
                          type="tel"
                          className="form-control numeric-text"
                          placeholder="+91 98765 43210"
                          value={addrPhone}
                          onChange={(e) => setAddrPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Address Line 1 (Flat, House No., Building) <span>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Flat 402, Royal Palms"
                        value={addrLine1}
                        onChange={(e) => setAddrLine1(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Address Line 2 (Street, Landmark, Area)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Near Yeshwant Club, Race Course Road"
                        value={addrLine2}
                        onChange={(e) => setAddrLine2(e.target.value)}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>City <span>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Indore"
                          value={addrCity}
                          onChange={(e) => setAddrCity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>PIN Code <span>*</span></label>
                        <input
                          type="text"
                          className="form-control numeric-text"
                          placeholder="452001"
                          value={addrPincode}
                          onChange={(e) => setAddrPincode(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Address Type</label>
                        <select
                          className="form-control"
                          value={addrTag}
                          onChange={(e) => setAddrTag(e.target.value)}
                        >
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                          <option value="Gift">Gift Delivery</option>
                        </select>
                      </div>
                    </div>

                    <div className="address-form-actions">
                      <button type="submit" className="btn-gold-primary">
                        Save Address
                      </button>
                      <button
                        type="button"
                        className="btn-outline-cancel"
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Address Cards List */}
              <div className="addresses-grid">
                {(user.addresses || []).map((addr) => (
                  <div key={addr.id} className={`address-box ${addr.isDefault ? 'default' : ''}`}>
                    <div className="address-box-top">
                      <span className="address-tag">{addr.tag || 'Home'}</span>
                      {addr.isDefault && <span className="default-badge">DEFAULT</span>}
                    </div>

                    <h4>{addr.name}</h4>
                    <p className="address-text">
                      {addr.addressLine1}
                      {addr.addressLine2 && <><br />{addr.addressLine2}</>}
                      <br />
                      {addr.city}, {addr.state} – <span className="numeric-text">{addr.pincode}</span>
                    </p>
                    <p className="address-phone numeric-text">
                      <i className="fas fa-phone-alt"></i> {addr.phone}
                    </p>

                    <div className="address-box-actions">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          className="btn-set-default"
                          onClick={() => setDefaultAddress(addr.id)}
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn-delete-addr"
                        onClick={() => removeAddress(addr.id)}
                      >
                        <i className="far fa-trash-alt"></i> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MY WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="account-tab-content">
              {wishlist.length === 0 ? (
                <div className="account-empty-state">
                  <div className="empty-state-icon">
                    <i className="far fa-heart"></i>
                  </div>
                  <h3>Your Wishlist is Empty</h3>
                  <p>Save pieces you adore while browsing our catalogue and review them anytime.</p>
                  <Link to="/diamond" className="btn-gold-primary">
                    Browse Solitaires
                  </Link>
                </div>
              ) : (
                <div className="account-wishlist-grid">
                  {wishlist.map((product) => (
                    <div key={product.id} className="acc-wishlist-card">
                      <img
                        src={product.images?.[0] || '/placeholder.png'}
                        alt={product.title}
                        className="wishlist-img"
                      />
                      <div className="wishlist-info">
                        <span className="wishlist-cat">{product.subcategory || product.category}</span>
                        <h4>{product.title}</h4>
                        <div className="wishlist-price numeric-text slashed-zero">
                          ₹{(product.price || 0).toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="wishlist-actions">
                        <button
                          type="button"
                          className="btn-wishlist-cart"
                          onClick={() => { moveToCart(product); openCart(); }}
                        >
                          <i className="fas fa-shopping-bag"></i> Move to Bag
                        </button>
                        <button
                          type="button"
                          className="btn-wishlist-del"
                          onClick={() => removeFromWishlist(product.id)}
                          title="Remove"
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="account-tab-content">
              <div className="profile-edit-card">
                <h3>Personal Information</h3>
                <p className="profile-edit-desc">Update your name and primary contact details for priority concierge communications.</p>

                {profileSaved && (
                  <div className="auth-alert success">
                    <i className="fas fa-check-circle"></i> Profile updated successfully!
                  </div>
                )}

                <form onSubmit={handleUpdateProfile}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user.email}
                      disabled
                    />
                    <small className="form-hint">Email address is linked to your membership and cannot be changed.</small>
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control numeric-text"
                      value={profPhone}
                      onChange={(e) => setProfPhone(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-gold-primary">
                    Save Profile Changes
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
