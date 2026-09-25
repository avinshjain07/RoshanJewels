import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@context/CartContext';
import { useAuth } from '@context/AuthContext';
import SEO from '@components/Common/SEO/SEO';

export default function Checkout() {
  const { items, itemCount, subtotal, gst, grandTotal, advanceTokenAmount, clearCart } = useCart();
  const { user, isAuthenticated, addOrder, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // Step 1: Address State
  const defaultAddr = user?.addresses?.find(a => a.isDefault) || user?.addresses?.[0];
  const [selectedAddrId, setSelectedAddrId] = useState(defaultAddr?.id || 'new');
  const [name, setName] = useState(user?.name || defaultAddr?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || defaultAddr?.phone || '');
  const [addressLine1, setAddressLine1] = useState(defaultAddr?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(defaultAddr?.addressLine2 || '');
  const [city, setCity] = useState(defaultAddr?.city || 'Indore');
  const [state, setState] = useState(defaultAddr?.state || 'Madhya Pradesh');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '452001');

  // Gift packing
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Step 2: Shipping Method
  const [shippingMethod, setShippingMethod] = useState('insured_courier'); // 'insured_courier' | 'showroom_pickup'

  // Step 3: Payment Method
  const [paymentMode, setPaymentMode] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'advance_token' | 'cod'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bank, setBank] = useState('HDFC Bank');

  // Coupon / Voucher
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedAddrId !== 'new' && user?.addresses) {
      const addr = user.addresses.find(a => a.id === selectedAddrId);
      if (addr) {
        setName(addr.name);
        setPhone(addr.phone);
        setAddressLine1(addr.addressLine1);
        setAddressLine2(addr.addressLine2 || '');
        setCity(addr.city);
        setState(addr.state);
        setPincode(addr.pincode);
      }
    }
  }, [selectedAddrId, user]);

  if (items.length === 0) {
    return (
      <>
        <SEO title="Checkout | Roshan Jewels" description="Secure luxury checkout for Roshan Jewels." />
        <section className="checkout-empty-section">
          <div className="container">
            <div className="checkout-empty-card">
              <div className="empty-icon"><i className="fas fa-shopping-bag"></i></div>
              <h2>Your Shopping Bag is Empty</h2>
              <p>Please select your desired jewellery pieces before proceeding to checkout.</p>
              <Link to="/gold" className="btn-gold-primary">
                Explore 22K Gold
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ROSHAN1965') {
      const discount = Math.min(2500, Math.round(subtotal * 0.05));
      setDiscountAmount(discount);
      setCouponApplied(true);
      setError('');
    } else {
      setError('Invalid coupon code. Try ROSHAN1965 for privilege discount.');
    }
  };

  const effectiveGrandTotal = Math.max(0, grandTotal - discountAmount);
  const effectiveAdvanceAmount = Math.round(effectiveGrandTotal * 0.10);
  const amountToPayNow = paymentMode === 'advance_token' ? effectiveAdvanceAmount : effectiveGrandTotal;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !phone || !email) {
      setError('Please provide your full contact details.');
      return;
    }

    if (shippingMethod === 'insured_courier' && (!addressLine1 || !city || !pincode)) {
      setError('Please provide a complete shipping address.');
      return;
    }

    setIsProcessing(true);

    // Simulate luxury payment processing gateway
    setTimeout(() => {
      const orderId = `RJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderData = {
        id: orderId,
        items,
        itemCount,
        subtotal,
        gst,
        discountAmount,
        grandTotal: effectiveGrandTotal,
        amountPaid: amountToPayNow,
        balanceDue: paymentMode === 'advance_token' ? effectiveGrandTotal - effectiveAdvanceAmount : (paymentMode === 'cod' ? effectiveGrandTotal : 0),
        shippingMethod: shippingMethod === 'insured_courier' ? 'Free Insured Express Courier' : 'Showroom In-Store Collection (Indore)',
        paymentMethod: paymentMode === 'upi' ? 'Instant UPI'
          : paymentMode === 'card' ? 'Credit / Debit Card'
          : paymentMode === 'netbanking' ? `Net Banking (${bank})`
          : paymentMode === 'advance_token' ? '10% Advance Token Booking'
          : 'Pay on Delivery / In-Store Handover',
        shippingAddress: {
          name,
          phone,
          email,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode
        },
        isGift,
        giftNote: isGift ? giftNote : null,
      };

      addOrder(orderData);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${orderId}`, { state: { order: orderData } });
    }, 1800);
  };

  return (
    <>
      <SEO
        title="Secure Luxury Checkout | Roshan Jewels"
        description="Complete your order with 100% insured delivery, BIS hallmarking certificate, and multiple secure Indian payment options."
      />

      <section className="checkout-page-section">
        <div className="container">
          {/* Header */}
          <div className="checkout-header-row">
            <div className="checkout-title-group">
              <span className="page-badge"><i className="fas fa-lock"></i> 256-BIT ENCRYPTED CHECKOUT</span>
              <h1>Secure Luxury Checkout</h1>
            </div>
            {!isAuthenticated && (
              <div className="checkout-login-prompt">
                <span>Already have a Privilege account?</span>
                <button
                  type="button"
                  className="btn-link-signin"
                  onClick={() => openAuthModal('login')}
                >
                  Sign In for 1-Click Addresses
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="auth-alert error checkout-alert">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <div className="checkout-layout-grid">
            {/* Left Column: Multi-Step Forms */}
            <div className="checkout-forms-col">
              <form onSubmit={handlePlaceOrder} id="checkout-form">
                {/* STEP 1: CONTACT & SHIPPING ADDRESS */}
                <div className="checkout-step-card">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <div className="step-title-text">
                      <h3>Shipping & Delivery Address</h3>
                      <p>Enter where your hallmarked jewellery should be securely dispatched.</p>
                    </div>
                  </div>

                  {/* Saved Address Selector for Logged-in Users */}
                  {isAuthenticated && user?.addresses?.length > 0 && (
                    <div className="saved-addresses-selector">
                      <label className="selector-label">Choose Saved Address:</label>
                      <div className="saved-addresses-options">
                        {user.addresses.map((addr) => (
                          <label
                            key={addr.id}
                            className={`address-option-card ${selectedAddrId === addr.id ? 'active' : ''}`}
                          >
                            <input
                              type="radio"
                              name="selectedAddress"
                              value={addr.id}
                              checked={selectedAddrId === addr.id}
                              onChange={() => setSelectedAddrId(addr.id)}
                            />
                            <div className="addr-card-body">
                              <strong>{addr.name} ({addr.tag || 'Address'})</strong>
                              <p>{addr.addressLine1}, {addr.city} – {addr.pincode}</p>
                              <span className="addr-phone numeric-text">{addr.phone}</span>
                            </div>
                          </label>
                        ))}
                        <label className={`address-option-card ${selectedAddrId === 'new' ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="selectedAddress"
                            value="new"
                            checked={selectedAddrId === 'new'}
                            onChange={() => setSelectedAddrId('new')}
                          />
                          <div className="addr-card-body">
                            <strong>+ Enter New Address</strong>
                            <p>Ship to a different location or gift address</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Address Inputs (Shown for guests or if 'new' is selected) */}
                  {(!isAuthenticated || selectedAddrId === 'new' || user?.addresses?.length === 0) && (
                    <div className="address-inputs-grid">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Full Name <span>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Sanya Mehta"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Mobile Number <span>*</span></label>
                          <input
                            type="tel"
                            className="form-control numeric-text"
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Email Address for Tax Invoice & Tracking <span>*</span></label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="name@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>House / Flat No., Apartment / Building Name <span>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Flat 402, Royal Palms"
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Street Address, Area & Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Near Yeshwant Club, Race Course Road"
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>City <span>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Indore"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>State <span>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Madhya Pradesh"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>PIN Code <span>*</span></label>
                          <input
                            type="text"
                            className="form-control numeric-text"
                            placeholder="452001"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gift Wrap Checkbox */}
                  <div className="gift-option-wrap">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={isGift}
                        onChange={(e) => setIsGift(e.target.checked)}
                      />
                      <span>
                        <i className="fas fa-gift"></i> This order is a special gift — Include luxury gift wrapping & sealed message card
                      </span>
                    </label>

                    {isGift && (
                      <div className="gift-message-box">
                        <label>Personalized Gift Message:</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Write your heartfelt message here..."
                          value={giftNote}
                          onChange={(e) => setGiftNote(e.target.value)}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>

                {/* STEP 2: SHIPPING METHOD */}
                <div className="checkout-step-card">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <div className="step-title-text">
                      <h3>Delivery & Handover Preference</h3>
                      <p>Select your preferred receiving method.</p>
                    </div>
                  </div>

                  <div className="shipping-options-grid">
                    <label className={`shipping-method-box ${shippingMethod === 'insured_courier' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="insured_courier"
                        checked={shippingMethod === 'insured_courier'}
                        onChange={() => setShippingMethod('insured_courier')}
                      />
                      <div className="shipping-method-content">
                        <div className="shipping-method-top">
                          <span className="method-name"><i className="fas fa-shield-alt"></i> Insured Doorstep Courier</span>
                          <span className="method-price">FREE</span>
                        </div>
                        <p>Fully insured transit via Sequel Secure / Blue Dart. Tamper-evident luxury packaging with OTP handover.</p>
                      </div>
                    </label>

                    <label className={`shipping-method-box ${shippingMethod === 'showroom_pickup' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="showroom_pickup"
                        checked={shippingMethod === 'showroom_pickup'}
                        onChange={() => setShippingMethod('showroom_pickup')}
                      />
                      <div className="shipping-method-content">
                        <div className="shipping-method-top">
                          <span className="method-name"><i className="fas fa-store"></i> In-Store Showroom Collection</span>
                          <span className="method-price">FREE</span>
                        </div>
                        <p>Collect in person at Royal Diamond Building, Indore with private trial in our VIP lounge & live purity testing.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* STEP 3: PAYMENT GATEWAY */}
                <div className="checkout-step-card">
                  <div className="step-header">
                    <div className="step-number">3</div>
                    <div className="step-title-text">
                      <h3>Payment Mode</h3>
                      <p>All transactions are 100% encrypted and backed by Roshan Jewels authenticity guarantee.</p>
                    </div>
                  </div>

                  {/* Payment Tabs */}
                  <div className="payment-tabs-bar">
                    <button
                      type="button"
                      className={`pay-tab ${paymentMode === 'upi' ? 'active' : ''}`}
                      onClick={() => setPaymentMode('upi')}
                    >
                      <i className="fas fa-mobile-alt"></i> UPI (Instant)
                    </button>
                    <button
                      type="button"
                      className={`pay-tab ${paymentMode === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMode('card')}
                    >
                      <i className="far fa-credit-card"></i> Cards
                    </button>
                    <button
                      type="button"
                      className={`pay-tab ${paymentMode === 'netbanking' ? 'active' : ''}`}
                      onClick={() => setPaymentMode('netbanking')}
                    >
                      <i className="fas fa-university"></i> Net Banking
                    </button>
                    <button
                      type="button"
                      className={`pay-tab ${paymentMode === 'advance_token' ? 'active' : ''}`}
                      onClick={() => setPaymentMode('advance_token')}
                    >
                      <i className="fas fa-coins"></i> 10% Advance Token
                    </button>
                    <button
                      type="button"
                      className={`pay-tab ${paymentMode === 'cod' ? 'active' : ''}`}
                      onClick={() => setPaymentMode('cod')}
                    >
                      <i className="fas fa-hand-holding-usd"></i> COD / Showroom
                    </button>
                  </div>

                  {/* Payment Tab 1: UPI */}
                  {paymentMode === 'upi' && (
                    <div className="payment-body-box">
                      <div className="upi-payment-panel">
                        <div className="upi-qr-column">
                          <div className="qr-box">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=jewelroshan9@okhdfcbank&pn=Roshan%20Jewel&am=${amountToPayNow}&cu=INR`}
                              alt="Scan & Pay UPI QR"
                              className="upi-qr-image"
                            />
                          </div>
                          <span className="qr-hint">Scan with Google Pay, PhonePe, Paytm or BHIM</span>
                        </div>

                          <div className="upi-id-column">
                          <label>Or Pay with UPI ID / VPA:</label>
                          <div className="upi-input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. mobile@okhdfcbank"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                            <span className="upi-verified-tag"><i className="fas fa-shield-alt"></i> Instant Verification</span>
                          </div>
                          <p className="upi-desc">Payment authorization is coming soon.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Tab 2: Credit / Debit Card */}
                  {paymentMode === 'card' && (
                    <div className="payment-body-box">
                      <div className="card-payment-panel">
                        <div className="form-group">
                          <label>Card Number <span>*</span></label>
                          <div className="card-input-wrapper">
                            <input
                              type="text"
                              className="form-control numeric-text"
                              placeholder="4111 2222 3333 4444"
                              maxLength="19"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <div className="card-brands-icons">
                              <i className="fab fa-cc-visa"></i>
                              <i className="fab fa-cc-mastercard"></i>
                              <i className="fab fa-cc-amex"></i>
                            </div>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Name on Card <span>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label>Expiry (MM/YY) <span>*</span></label>
                            <input
                              type="text"
                              className="form-control numeric-text"
                              placeholder="MM/YY"
                              maxLength="5"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label>CVV / CVC <span>*</span></label>
                            <input
                              type="password"
                              className="form-control numeric-text"
                              placeholder="•••"
                              maxLength="4"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Tab 3: Net Banking */}
                  {paymentMode === 'netbanking' && (
                    <div className="payment-body-box">
                      <label>Select Your Bank:</label>
                      <select
                        className="form-control"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        <option value="Punjab National Bank">Punjab National Bank</option>
                      </select>
                      <p className="bank-note">Net banking payment is coming soon.</p>
                    </div>
                  )}

                  {/* Payment Tab 4: 10% Advance Token */}
                  {paymentMode === 'advance_token' && (
                    <div className="payment-body-box advance-token-box">
                      <div className="advance-token-highlight">
                        <i className="fas fa-coins token-large-icon"></i>
                        <div className="token-text">
                          <h4>Luxury Jewellery Booking Token</h4>
                          <p>Advance token payments are coming soon.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Tab 5: COD / Showroom */}
                  {paymentMode === 'cod' && (
                    <div className="payment-body-box">
                      <div className="cod-notice">
                        <i className="fas fa-info-circle"></i>
                        <div>
                          <h4>Pay on Delivery / In-Store Collection</h4>
                          <p>COD and showroom payments are coming soon.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="btn-complete-order"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span><i className="fas fa-spinner fa-spin"></i> Processing Secure Payment...</span>
                  ) : (
                    <span>
                      <i className="fas fa-lock"></i> Authorize & Place Order
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="checkout-summary-col">
              <div className="order-summary-card">
                <h3>Order Summary</h3>
                <span className="summary-item-count">{itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'} Selected</span>

                {/* Items Mini List */}
                <div className="summary-items-list">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="summary-item-row">
                      <img
                        src={product.images?.[0] || '/placeholder.png'}
                        alt={product.title}
                        className="summary-thumb"
                      />
                      <div className="summary-item-details">
                        <h4>{product.title}</h4>
                        <span className="summary-meta">
                          {product.purity ? `${product.purity.split(' ')[0]} • ` : ''}
                          Qty: {quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Box */}
                <form onSubmit={handleApplyCoupon} className="summary-coupon-form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Privilege Voucher (ROSHAN1965)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button
                    type="submit"
                    className="btn-apply-coupon"
                    disabled={couponApplied || !couponCode}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </form>

                {couponApplied && (
                  <div className="coupon-success-tag">
                    <i className="fas fa-check"></i> Privilege Voucher ROSHAN1965 Applied
                  </div>
                )}

                <div className="summary-bill-rows coming-soon-summary">
                  <strong>Order totals are coming soon.</strong>
                </div>

                {/* Security Reassurances */}
                <div className="summary-trust-footer">
                  <div className="trust-item">
                    <i className="fas fa-certificate"></i>
                    <span>100% BIS Hallmarked (916/750)</span>
                  </div>
                  <div className="trust-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>100% Transit Insured Doorstep Courier</span>
                  </div>
                  <div className="trust-item">
                    <i className="fas fa-undo"></i>
                    <span>7-Day Hassle-Free Exchange Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
