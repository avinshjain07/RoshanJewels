import { useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import SEO from '@components/Common/SEO/SEO';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = useAuth();

  const order = location.state?.order || orders.find(o => o.id === orderId) || {
    id: orderId || 'RJ-2026-8809',
    createdAt: new Date().toISOString(),
    grandTotal: 125000,
    amountPaid: 125000,
    balanceDue: 0,
    paymentMethod: 'Instant UPI',
    shippingMethod: 'Free Insured Express Courier',
    items: [],
    shippingAddress: {
      name: 'Valued Patron',
      phone: '+91 82249 98809',
      addressLine1: 'Royal Diamond Building, Yeshwant Niwas Road',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452002'
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const whatsappOrderMessage = `Hello Roshan Jewel, I have placed Order *#${order.id}* for ₹${(order.grandTotal || 0).toLocaleString('en-IN')}. Could you please share the live dispatch update and master karigari schedule?`;
  const whatsappUrl = `https://wa.me/918224998809?text=${encodeURIComponent(whatsappOrderMessage)}`;

  return (
    <>
      <SEO
        title={`Order Confirmed #${order.id} | Roshan Jewels`}
        description="Your bespoke jewellery order has been confirmed with Roshan Jewels."
      />

      <section className="order-success-section">
        <div className="container">
          {/* Success Banner */}
          <div className="success-hero-card">
            <div className="success-icon-badge">
              <i className="fas fa-check"></i>
            </div>
            <span className="success-kicker">PAYMENT & KARIGARI ALLOCATION CONFIRMED</span>
            <h2>Thank You for Your Patronage</h2>
            <p className="success-subtitle">
              Your order <strong className="order-ref numeric-text">#{order.id}</strong> has been successfully received and allocated to our master artisans.
            </p>

            <div className="success-hero-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-success-whatsapp"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp Order Concierge
              </a>
              <button
                type="button"
                className="btn-print-invoice"
                onClick={handlePrint}
              >
                <i className="fas fa-print"></i> Download / Print Tax Invoice
              </button>
            </div>
          </div>

          {/* Delivery Milestone Progress Bar */}
          <div className="milestone-card">
            <h3><i className="fas fa-route"></i> Live Order Tracking Milestones</h3>
            <div className="milestone-timeline">
              <div className="milestone-step done">
                <div className="milestone-bullet"><i className="fas fa-check"></i></div>
                <div className="milestone-text">
                  <strong>Order Confirmed</strong>
                  <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>

              <div className="milestone-step active">
                <div className="milestone-bullet"><i className="fas fa-gem"></i></div>
                <div className="milestone-text">
                  <strong>Hallmark & Quality Inspection</strong>
                  <span>In Progress</span>
                </div>
              </div>

              <div className="milestone-step">
                <div className="milestone-bullet"><i className="fas fa-truck"></i></div>
                <div className="milestone-text">
                  <strong>Insured Courier Handover</strong>
                  <span>Sequel Secure / Blue Dart</span>
                </div>
              </div>

              <div className="milestone-step">
                <div className="milestone-bullet"><i className="fas fa-home"></i></div>
                <div className="milestone-text">
                  <strong>Secure Delivery</strong>
                  <span>OTP Handover</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Printable Tax Invoice */}
          <div className="tax-invoice-container" id="tax-invoice">
            {/* Invoice Header */}
            <div className="invoice-header">
              <div className="invoice-brand">
                <h2>ROSHAN JEWELS</h2>
                <span className="invoice-tagline">Crafting Stories in Gold Since 1965</span>
                <p className="invoice-address">
                  UG-02, 03, Royal Diamond Building, Yeshwant Niwas Road, Opposite SBI Bank, Sanghi Colony, Yeshwant Colony,<br />
                  Indore, Madhya Pradesh – 452002 • Ph: +91 82249 98809 • Email: jewelroshan9@gmail.com
                </p>
                <span className="invoice-gstin">GSTIN: 23AABCR1965M1Z8 • BIS Hallmark Reg: HM-MP-IND-0916</span>
              </div>
              <div className="invoice-meta">
                <span className="invoice-type-pill">TAX INVOICE</span>
                <p><strong>Invoice No:</strong> <span className="numeric-text">INV-{order.id}</span></p>
                <p><strong>Date:</strong> <span className="numeric-text">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></p>
                <p><strong>Payment Status:</strong> <span className="status-paid">AUTHORIZED</span></p>
                <p><strong>Payment Mode:</strong> {order.paymentMethod}</p>
              </div>
            </div>

            <div className="invoice-divider"></div>

            {/* Recipient Details */}
            <div className="invoice-parties-grid">
              <div className="party-box">
                <span className="party-label">BILLED & SHIPPED TO:</span>
                <h4>{order.shippingAddress?.name || 'Valued Patron'}</h4>
                <p>
                  {order.shippingAddress?.addressLine1}
                  {order.shippingAddress?.addressLine2 && <>, {order.shippingAddress.addressLine2}</>}
                  <br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} – <span className="numeric-text">{order.shippingAddress?.pincode}</span>
                </p>
                <p className="numeric-text">Contact: {order.shippingAddress?.phone}</p>
              </div>

              <div className="party-box">
                <span className="party-label">DISPATCH & LOGISTICS:</span>
                <h4>{order.shippingMethod}</h4>
                <p>Delivery Insurance: <strong>100% Comprehensive Transit Insurance (Covered)</strong></p>
                <p>Packaging: <strong>Tamper-Evident Luxury Jewellery Vault Case</strong></p>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Description</th>
                  <th>Purity / Hallmark</th>
                  <th>Gross Wt.</th>
                  <th>Qty</th>
                  <th className="text-right">Unit Price</th>
                  <th className="text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((item, i) => (
                  <tr key={i}>
                    <td className="numeric-text">{i + 1}</td>
                    <td>
                      <strong>{item.product?.title || 'Fine Jewellery Piece'}</strong>
                      <span className="table-sku numeric-text"> ({item.product?.sku || item.product?.id})</span>
                    </td>
                    <td>{item.product?.purity || '22K (916)'}</td>
                    <td className="numeric-text">{item.product?.grossWeight || 'Standard'}</td>
                    <td className="numeric-text">{item.quantity}</td>
                    <td className="text-right numeric-text slashed-zero">₹{(item.product?.price || 0).toLocaleString('en-IN')}</td>
                    <td className="text-right numeric-text slashed-zero">₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Financial Summary */}
            <div className="invoice-totals-wrapper">
              <div className="invoice-notes">
                <strong>Terms & Authenticity Guarantee:</strong>
                <ul>
                  <li>1. All gold jewellery certified 22K (916) with 6-digit alphanumeric HUID hallmarking.</li>
                  <li>2. All diamonds certified by GIA / IGI with tamper-proof laser inscription.</li>
                  <li>3. 7-Day exchange policy upon presentation of this original tax invoice.</li>
                </ul>
              </div>

              <div className="invoice-calc-box">
                <div className="calc-row">
                  <span>Subtotal:</span>
                  <span className="numeric-text slashed-zero">₹{(order.subtotal || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="calc-row">
                  <span>CGST (1.5%):</span>
                  <span className="numeric-text slashed-zero">₹{Math.round((order.gst || 0) / 2).toLocaleString('en-IN')}</span>
                </div>
                <div className="calc-row">
                  <span>SGST (1.5%):</span>
                  <span className="numeric-text slashed-zero">₹{Math.round((order.gst || 0) / 2).toLocaleString('en-IN')}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="calc-row discount">
                    <span>Privilege Voucher:</span>
                    <span className="numeric-text slashed-zero">-₹{order.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="calc-row">
                  <span>Insured Shipping:</span>
                  <span className="free-text">FREE</span>
                </div>
                <div className="calc-divider"></div>
                <div className="calc-row grand-total">
                  <span>Grand Total:</span>
                  <span className="numeric-text slashed-zero">₹{(order.grandTotal || 0).toLocaleString('en-IN')}</span>
                </div>
                {order.balanceDue > 0 && (
                  <div className="calc-row balance-due">
                    <span>Balance Due on Delivery:</span>
                    <span className="numeric-text slashed-zero">₹{order.balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sign-off */}
            <div className="invoice-footer">
              <div className="footer-seal">
                <i className="fas fa-crown"></i>
                <span>ROSHAN JEWELS VERIFIED</span>
              </div>
              <div className="footer-signature">
                <p>For ROSHAN JEWEL (INDORE)</p>
                <span className="sig-placeholder">Authorized Signatory</span>
              </div>
            </div>
          </div>

          {/* Navigation Back */}
          <div className="success-return-row">
            <Link to="/account" className="btn-gold-primary">
              <i className="fas fa-user-circle"></i> View in My Account
            </Link>
            <Link to="/" className="btn-outline-gold">
              <i className="fas fa-home"></i> Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
