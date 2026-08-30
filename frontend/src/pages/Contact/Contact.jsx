import { useState, useMemo } from 'react';
import SEO from '@components/Common/SEO/SEO';
import ContactForm from '@components/Forms/ContactForm/ContactForm';
import { PAGE_SEO } from '@constants/seo';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

const FAQS = [
  {
    question: "Do I need an appointment to visit the Roshan Jewel showroom?",
    answer:
      "Walk-ins are always warmly welcomed during our operating hours (11:30 AM – 08:30 PM). However, for bespoke bridal jewellery, heavy trousseau selections, or high-value solitaire consultations, we recommend booking a private VIP consultation to reserve our private design lounge and master gemologist."
  },
  {
    question: "Is all gold and diamond jewellery 100% certified and hallmarked?",
    answer:
      "Yes, without exception. Every gold creation is government-certified 22K (916) or 18K (750) with authentic 6-digit alphanumeric HUID hallmarking. Our diamond jewellery is certified by premier international laboratories including GIA and IGI."
  },
  {
    question: "Can I bring my own design or reference photo for custom jewellery?",
    answer:
      "Absolutely. Our third-generation master karigars and 3D CAD jewellery designers specialize in bespoke creations. You can share your reference sketches, Pinterest boards, or family heirlooms for redesign, and we will provide exact 3D render previews before casting."
  },
  {
    question: "Do you offer old gold exchange or buyback?",
    answer:
      "Yes, we offer 100% transparent old gold exchange and valuation with on-the-spot digital caratometer purity testing in your presence, providing the absolute best prevailing market rate for your gold."
  },
  {
    question: "What amenities are available at your Indore showroom?",
    answer:
      "Our flagship showroom in Royal Diamond Building features a dedicated private bridal lounge, complimentary refreshments, high-precision laser caratometer testing, valet parking assistance, and direct wheelchair access."
  },
  {
    question: "Do you ship jewellery across India or internationally?",
    answer:
      "Yes, we provide fully insured, tamper-proof luxury courier delivery across all major cities in India and select international destinations with end-to-end transit insurance."
  }
];

const WHATSAPP_TOPICS = [
  {
    label: "👑 Custom Bridal Design",
    text: "Hello Roshan Jewel! I am interested in custom bridal jewellery design consultation."
  },
  {
    label: "💎 Diamond Solitaire Inquiry",
    text: "Hello Roshan Jewel! I would like to inquire about certified diamond solitaires and pricing."
  },
  {
    label: "✨ Today's Gold Rate",
    text: "Hello Roshan Jewel! Could you please share today's 22K and 24K gold rate?"
  },
  {
    label: "📍 Showroom Directions & Valet",
    text: "Hello Roshan Jewel! I am planning to visit your showroom today and need directions/parking info."
  }
];

export default function Contact() {
  useScrollAnimation('.info-item, .contact-form-container, .contact-quick-btn, .contact-trust-card, .faq-card', []);

  const [activeFaq, setActiveFaq] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('enquiry'); // 'enquiry' | 'vip'

  // VIP Form State
  const [vipName, setVipName] = useState('');
  const [vipPhone, setVipPhone] = useState('');
  const [vipDate, setVipDate] = useState('');
  const [vipSlot, setVipSlot] = useState('Morning (11:30 AM – 02:00 PM)');
  const [vipCategory, setVipCategory] = useState('Bespoke Bridal Jewellery');

  const seo = PAGE_SEO.contact;

  // Real-time showroom open/closed status
  const showroomStatus = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMins = currentHour * 60 + currentMinutes;
    const openTimeInMins = 11 * 60 + 30; // 11:30 AM
    const closeTimeInMins = 20 * 60 + 30; // 08:30 PM

    const isOpen = currentTimeInMins >= openTimeInMins && currentTimeInMins <= closeTimeInMins;
    return {
      isOpen,
      text: isOpen ? "Open Right Now (Closes 08:30 PM)" : "Showroom Opens Daily at 11:30 AM",
      badgeClass: isOpen ? "status-badge open" : "status-badge closed"
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleCopyAddress = () => {
    const fullAddress = "UG-02, 03, Royal Diamond Building, Yeshwant Niwas Road, Opposite SBI Bank, Indore, Madhya Pradesh – 452002";
    navigator.clipboard.writeText(fullAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleVipSubmit = (e) => {
    e.preventDefault();
    const message = `*VIP Showroom Consultation Booking Request*%0A%0A*Name:* ${encodeURIComponent(vipName)}%0A*Phone:* ${encodeURIComponent(vipPhone)}%0A*Category:* ${encodeURIComponent(vipCategory)}%0A*Preferred Date:* ${encodeURIComponent(vipDate || 'Earliest Available')}%0A*Preferred Time Slot:* ${encodeURIComponent(vipSlot)}%0A%0APlease confirm my private lounge appointment.`;
    window.open(`https://wa.me/918224998809?text=${message}`, '_blank');
  };

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
          <span className="page-badge">CONCIERGE & SHOWROOM</span>
          <h1>Experience Roshan Jewel</h1>
          <p>Three generations of quiet brilliance, uncompromising purity, and bespoke craftsmanship in Indore since 1965</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-section">
        <div className="container">

          {/* Quick WhatsApp Topic Launcher Chips */}
          <div className="whatsapp-topic-bar">
            <span className="topic-bar-title"><i className="fab fa-whatsapp"></i> Instant WhatsApp Connect:</span>
            <div className="topic-chips-container">
              {WHATSAPP_TOPICS.map((topic, i) => (
                <a
                  key={i}
                  href={`https://wa.me/918224998809?text=${encodeURIComponent(topic.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-chip"
                >
                  {topic.label} <i className="fas fa-arrow-up-right-from-square"></i>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-grid">
            {/* Showroom Information Column */}
            <div className="contact-info-card">
              <div className="card-badge">
                <i className="fas fa-gem"></i>
                <span>FLAGSHIP SHOWROOM • EST. 1965</span>
              </div>

              <h3>Visit Our Showroom</h3>
              <p className="card-intro">
                Step into a heritage of artistry. Whether you seek certified diamond solitaires,
                22K hallmarked gold, or wish to commission a bespoke bridal masterpiece, our master
                consultants await your visit.
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
                    <div className="info-header-row">
                      <h4>Showroom Address</h4>
                      <button
                        onClick={handleCopyAddress}
                        className={`btn-copy-address ${copied ? 'copied' : ''}`}
                        title="Copy full address to clipboard"
                      >
                        <i className={copied ? "fas fa-check" : "far fa-copy"}></i>
                        <span>{copied ? "Copied!" : "Copy Address"}</span>
                      </button>
                    </div>
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
                    <h4>Direct Line & WhatsApp</h4>
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
                    <h4>Email Concierge</h4>
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
                      <span className={showroomStatus.badgeClass}>
                        <span className="pulse-dot"></span> {showroomStatus.text}
                      </span>
                    </div>
                    <p className="numeric-text">
                      Monday – Sunday: <span className="slashed-zero">11:30 AM – 08:30 PM</span>
                    </p>
                    <span className="timing-note">Open 7 days a week including Sundays</span>
                  </div>
                </div>
              </div>

              {/* Showroom Amenities Badges */}
              <div className="showroom-amenities-card">
                <h5><i className="fas fa-sparkles"></i> Showroom Amenities</h5>
                <div className="amenities-grid">
                  <div className="amenity-tag"><i className="fas fa-couch"></i> Private VIP Lounge</div>
                  <div className="amenity-tag"><i className="fas fa-microscope"></i> Live Caratometer Purity Test</div>
                  <div className="amenity-tag"><i className="fas fa-car"></i> Valet Parking Assistance</div>
                  <div className="amenity-tag"><i className="fas fa-coffee"></i> Hospitality & High Tea</div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="contact-map-wrapper">
                <div className="map-title-row">
                  <span><i className="fas fa-location-arrow"></i> SHOWROOM LOCATION ON MAP</span>
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

            {/* Right Column: Interactive Mode Switcher (Enquiry vs VIP Booking) */}
            <div className="contact-form-panel">
              {/* Tab Selector */}
              <div className="contact-mode-tabs">
                <button
                  type="button"
                  className={`mode-tab-btn ${activeTab === 'enquiry' ? 'active' : ''}`}
                  onClick={() => setActiveTab('enquiry')}
                >
                  <i className="fas fa-paper-plane"></i>
                  <span>Send Enquiry</span>
                </button>
                <button
                  type="button"
                  className={`mode-tab-btn ${activeTab === 'vip' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vip')}
                >
                  <i className="fas fa-crown"></i>
                  <span>Book VIP Lounge Consultation</span>
                </button>
              </div>

              {activeTab === 'enquiry' ? (
                <ContactForm />
              ) : (
                <div className="contact-form-container vip-booking-container">
                  <div className="form-header-badge vip-badge">
                    <i className="fas fa-crown"></i>
                    <span>EXCLUSIVE VIP EXPERIENCE</span>
                  </div>

                  <h3>Book a Private Consultation</h3>
                  <p className="form-subtitle">
                    Reserve an exclusive one-on-one session in our private VIP lounge with our master jewellery designer.
                  </p>

                  <form onSubmit={handleVipSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="vipName">
                          <i className="fas fa-user"></i> Full Name <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="vipName"
                          className="form-control"
                          placeholder="Enter your name"
                          value={vipName}
                          onChange={(e) => setVipName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="vipPhone">
                          <i className="fas fa-phone-alt"></i> Phone Number <span>*</span>
                        </label>
                        <input
                          type="tel"
                          id="vipPhone"
                          className="form-control numeric-text"
                          placeholder="e.g. +91 98765 43210"
                          value={vipPhone}
                          onChange={(e) => setVipPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="vipCategory">
                        <i className="fas fa-gem"></i> Consultation Category <span>*</span>
                      </label>
                      <select
                        id="vipCategory"
                        className="form-control"
                        value={vipCategory}
                        onChange={(e) => setVipCategory(e.target.value)}
                      >
                        <option value="Bespoke Bridal Jewellery">Bespoke Bridal Jewellery Trousseau</option>
                        <option value="Diamond Solitaire Selection">Diamond Solitaires & Engagement Rings</option>
                        <option value="22K Gold Heirloom Crafting">22K Gold Heirloom & Antique Jewellery</option>
                        <option value="Heritage Jewellery Redesign">Family Heirloom Remodelling / Redesign</option>
                        <option value="High-Value Bullion / Investment">Certified 24K Gold & Silver Bullion</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="vipDate">
                          <i className="fas fa-calendar-alt"></i> Preferred Date
                        </label>
                        <input
                          type="date"
                          id="vipDate"
                          className="form-control numeric-text"
                          value={vipDate}
                          onChange={(e) => setVipDate(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="vipSlot">
                          <i className="fas fa-clock"></i> Preferred Time Slot <span>*</span>
                        </label>
                        <select
                          id="vipSlot"
                          className="form-control numeric-text"
                          value={vipSlot}
                          onChange={(e) => setVipSlot(e.target.value)}
                        >
                          <option value="Morning (11:30 AM – 02:00 PM)">Morning: 11:30 AM – 02:00 PM</option>
                          <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon: 02:00 PM – 05:00 PM</option>
                          <option value="Evening (05:00 PM – 08:30 PM)">Evening: 05:00 PM – 08:30 PM</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="btn-submit vip-submit-btn">
                      <i className="fab fa-whatsapp"></i>
                      <span>Confirm VIP Booking via WhatsApp</span>
                    </button>
                  </form>

                  {/* Form Assurance Pillars */}
                  <div className="form-assurance-row">
                    <div className="assurance-item">
                      <i className="fas fa-lock"></i>
                      <span>Private Lounge Guaranteed</span>
                    </div>
                    <div className="assurance-item">
                      <i className="fas fa-gem"></i>
                      <span>Master Gemologist Assisted</span>
                    </div>
                    <div className="assurance-item">
                      <i className="fas fa-coffee"></i>
                      <span>Complimentary High Tea</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Heritage Pillars */}
      <section className="contact-trust-section">
        <div className="container">
          <div className="section-title-center">
            <span className="page-badge">THE ROSHAN PROMISE</span>
            <h2>Three Generations of Integrity & Trust</h2>
            <p>Every piece that leaves our showroom is backed by timeless heritage and certified purity</p>
          </div>

          <div className="contact-trust-grid">
            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-award"></i>
              </div>
              <h4>100% Hallmarked Gold</h4>
              <p>Government certified 22K (916) & 18K gold jewellery with authentic 6-digit alphanumeric HUID verification.</p>
            </div>

            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-gem"></i>
              </div>
              <h4>GIA & IGI Diamonds</h4>
              <p>Internationally certified solitaires and naturally sourced conflict-free diamonds with complete cut, clarity & color grading.</p>
            </div>

            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-drafting-compass"></i>
              </div>
              <h4>Bespoke Customization</h4>
              <p>Craft your dream design directly with master artisans and 3D CAD jewellery designers from scratch.</p>
            </div>

            <div className="contact-trust-card">
              <div className="trust-icon-box">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Legacy Since 1965</h4>
              <p className="numeric-text">
                Serving royal families and discerning jewellery connoisseurs across Central India for three generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="section-title-center">
            <span className="page-badge">HELP & GUIDANCE</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about visiting our showroom, custom design, and certified jewellery</p>
          </div>

          <div className="faq-grid">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className={`faq-card ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <h4>{faq.question}</h4>
                  <div className="faq-toggle-icon">
                    <i className={activeFaq === index ? "fas fa-minus" : "fas fa-plus"}></i>
                  </div>
                </div>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Need More Help Banner */}
          <div className="faq-help-banner">
            <div className="help-text">
              <h3>Have a specific question not listed here?</h3>
              <p>Our customer concierge team is always available to assist you personally.</p>
            </div>
            <div className="help-actions">
              <a href="https://wa.me/918224998809" target="_blank" rel="noopener noreferrer" className="btn-help-whatsapp">
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
              <a href="tel:08224998809" className="btn-help-call">
                <i className="fas fa-phone-alt"></i> Call Showroom
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

