import SEO from '@components/Common/SEO/SEO';
import ContactForm from '@components/Forms/ContactForm/ContactForm';
import { PAGE_SEO } from '@constants/seo';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

export default function Contact() {
  useScrollAnimation('.info-item, .contact-form-container, .contact-quick-btn, .contact-trust-card', []);

  const seo = PAGE_SEO.contact;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        keywords={seo.keywords}
      />

      {/* Page Header */}
      <section className="page-header contact-page-header">
        <div className="container">
          <span className="page-badge">GET IN TOUCH</span>
          <h1>Contact Roshan Jewel</h1>
          <p>We are delighted to assist you with our legacy of quiet brilliance since 1965</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Showroom Information Column */}
            <div className="contact-info-card">
              <div className="card-badge">
                <i className="fas fa-gem"></i>
                <span>FLAGSHIP SHOWROOM • EST. 1965</span>
              </div>

              <h3>Visit Our Showroom</h3>
              <p className="card-intro">
                Step into a heritage of unmatched artistry. Our jewelry specialists
                are ready to assist you in selecting certified solitaires, 22K hallmarked
                gold, or crafting a bespoke heirloom masterpiece.
              </p>

              {/* Quick Action Buttons */}
              <div className="contact-quick-actions">
                <a
                  href="https://wa.me/918224998809?text=Hello%20Roshan%20Jewel%2C%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-quick-btn whatsapp-btn"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp Us</span>
                </a>
                <a href="tel:08224998809" className="contact-quick-btn call-btn">
                  <i className="fas fa-phone-alt"></i>
                  <span>Call Showroom</span>
                </a>
                <a href="mailto:jewelroshan9@gmail.com" className="contact-quick-btn email-btn">
                  <i className="fas fa-envelope"></i>
                  <span>Email Us</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Royal+Diamond+Building+Yeshwant+Niwas+Road+opposite+SBI+BANK+Indore+MP+452002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-quick-btn map-btn"
                >
                  <i className="fas fa-directions"></i>
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Detailed Contact List */}
              <div className="contact-details-list">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marked-alt"></i>
                  </div>
                  <div className="info-item-content">
                    <h4>Showroom Address</h4>
                    <p className="numeric-text">
                      <strong>UG-02, 03</strong>, Royal Diamond Building,
                      Yeshwant Niwas Road, Opposite SBI Bank,
                      Indore, Madhya Pradesh – <span className="slashed-zero">452002</span>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone-volume"></i>
                  </div>
                  <div className="info-item-content">
                    <h4>Phone & WhatsApp</h4>
                    <p>
                      <a href="tel:08224998809" className="numeric-text">
                        +91 82249 98809 <span className="sub-phone">/ 082249 98809</span>
                      </a>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope-open-text"></i>
                  </div>
                  <div className="info-item-content">
                    <h4>Email Support</h4>
                    <p>
                      <a href="mailto:jewelroshan9@gmail.com" className="email-link">
                        jewelroshan9@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="info-item-content">
                    <div className="hours-header">
                      <h4>Showroom Timings</h4>
                      <span className="status-badge open">
                        <span className="pulse-dot"></span> Open Today
                      </span>
                    </div>
                    <p className="numeric-text">
                      Monday – Sunday: <span className="slashed-zero">11:30 AM – 08:30 PM</span>
                    </p>
                    <span className="timing-note">Open 7 days a week for your convenience</span>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="contact-map-wrapper">
                <div className="map-title-row">
                  <span><i className="fas fa-location-arrow"></i> SHOWROOM LOCATION</span>
                  <a
                    href="https://maps.google.com/?q=Royal+Diamond+Building+Yeshwant+Niwas+Road+opposite+SBI+BANK+Indore+MP+452002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-external-link"
                  >
                    Open in Google Maps <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
                <div className="contact-map-frame">
                  <iframe
                    title="Roshan Jewel Showroom Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.125134789648!2d75.8756306!3d22.7236109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd3ee087799b%3A0xc3b836480e608038!2sRoyal%20Diamond%20Building%2C%20Yeshwant%20Niwas%20Rd%2C%20opp.%20SBI%20BANK%2C%20Indore%2C%20Madhya%20Pradesh%20452002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Trust & Heritage Pillars */}
      <section className="contact-trust-section">
        <div className="container">
          <div className="contact-trust-grid">
            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-award"></i>
              </div>
              <h4>100% Hallmarked Gold</h4>
              <p>Government certified 22K (916) & 18K gold jewellery with authentic HUID verification.</p>
            </div>

            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-gem"></i>
              </div>
              <h4>GIA & IGI Diamonds</h4>
              <p>Internationally certified solitaires and naturally sourced conflict-free diamonds.</p>
            </div>

            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-drafting-compass"></i>
              </div>
              <h4>Bespoke Customization</h4>
              <p>Craft your dream design directly with master artisans and 3D CAD jewellery designers.</p>
            </div>

            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Legacy Since 1965</h4>
              <p className="numeric-text">
                Three generations of unmatched integrity, quality, and relationship in Indore.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
