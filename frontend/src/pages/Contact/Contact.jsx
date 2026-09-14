import { useState, useMemo } from 'react';
import SEO from '@components/Common/SEO/SEO';
import ContactForm from '@components/Forms/ContactForm/ContactForm';
import { PAGE_SEO } from '@constants/seo';
import { useScrollAnimation } from '@hooks/useScrollAnimation';
import shopviewImg from '@assets/images/shopview.jpeg';

const FAQS = [
  {
    question: "Do I need an appointment to visit the Roshan Jewel showroom?",
    answer:
      "Walk-ins are always warmly welcomed during our operating hours (11:30 AM – 08:30 PM). However, for bespoke bridal jewellery, heavy trousseau selections, or high-value solitaire consultations, we recommend booking a private VIP consultation to reserve our private design lounge and master gemologist."
  },
  {
    question: "Can I view and purchase jewellery via live video call?",
    answer:
      "Yes! For our out-of-town, interstate, and NRI clients, we offer personal one-on-one live HD video viewing sessions via WhatsApp Video or Google Meet. Our master gemologist will showcase designs in detail with verified weights, purity certificates, and dimensions."
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
      "Our flagship showroom in Royal Diamond Building features a dedicated private bridal lounge, complimentary refreshments and high tea, high-precision laser caratometer testing, valet parking assistance, and direct elevator access."
  },
  {
    question: "Do you ship jewellery across India or internationally?",
    answer:
      "Yes, we provide fully insured, tamper-proof luxury courier delivery across all major cities in India and select international destinations with end-to-end transit insurance."
  }
];

const WHATSAPP_TOPICS = [
  {
    icon: "fas fa-coins",
    label: "Today's Gold Rate (22K / 24K)",
    text: "Hello Roshan Jewel! Could you please share today's prevailing 22K (916) and 24K gold rates in Indore?"
  },
  {
    icon: "fas fa-crown",
    label: "Bridal Trousseau Trial",
    text: "Hello Roshan Jewel! I would like to schedule a bridal jewellery trial appointment at your Indore showroom."
  },
  {
    icon: "fas fa-gem",
    label: "Diamond Solitaire Inquiry",
    text: "Hello Roshan Jewel! I would like to inquire about certified GIA/IGI diamond solitaires and engagement rings."
  },
  {
    icon: "fas fa-video",
    label: "Live Video Call Viewing",
    text: "Hello Roshan Jewel! I am an out-of-town client and would like to preview jewellery over a live WhatsApp Video Call."
  },
  {
    icon: "fas fa-pencil-ruler",
    label: "Custom 3D CAD Quote",
    text: "Hello Roshan Jewel! I have a custom jewellery design in mind and would like a 3D CAD consultation and estimate."
  },
  {
    icon: "fas fa-parking",
    label: "Valet & Showroom Directions",
    text: "Hello Roshan Jewel! I am heading to your showroom now and need valet parking / route assistance."
  }
];

export default function Contact() {
  useScrollAnimation('.info-item, .contact-form-container, .contact-quick-btn, .contact-trust-card, .faq-card, .showroom-showcase-card', []);

  const [activeFaq, setActiveFaq] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('enquiry'); // 'enquiry' | 'vip' | 'video'

  // VIP Form State
  const [vipName, setVipName] = useState('');
  const [vipPhone, setVipPhone] = useState('');
  const [vipDate, setVipDate] = useState('');
  const [vipSlot, setVipSlot] = useState('Morning (11:30 AM – 02:00 PM)');
  const [vipCategory, setVipCategory] = useState('Bespoke Bridal Jewellery');

  // Virtual Video Call State
  const [videoName, setVideoName] = useState('');
  const [videoPhone, setVideoPhone] = useState('');
  const [videoPlatform, setVideoPlatform] = useState('WhatsApp Video Call');
  const [videoCategory, setVideoCategory] = useState('Bespoke Bridal Trousseau');
  const [videoDate, setVideoDate] = useState('');
  const [videoSlot, setVideoSlot] = useState('Morning (11:30 AM – 02:00 PM)');

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
      text: isOpen ? "Showroom Open Right Now (Closes 08:30 PM)" : "Showroom Opens Daily at 11:30 AM",
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

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    const message = `*Virtual Live Video Consultation Request*%0A%0A*Name:* ${encodeURIComponent(videoName)}%0A*Phone / WhatsApp:* ${encodeURIComponent(videoPhone)}%0A*Platform:* ${encodeURIComponent(videoPlatform)}%0A*Category to Preview:* ${encodeURIComponent(videoCategory)}%0A*Preferred Date:* ${encodeURIComponent(videoDate || 'Earliest Available')}%0A*Preferred Time Slot:* ${encodeURIComponent(videoSlot)}%0A%0APlease confirm my live video preview session.`;
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

      {/* Page Header with Real-Time Status Pill */}
      <section className="page-header contact-page-header">
        <div className="container">
          <div className="contact-header-top-row">
            <span className="page-badge"><i className="fas fa-gem"></i> CONCIERGE & SHOWROOM</span>
            <span className={showroomStatus.badgeClass}>
              <span className="pulse-dot"></span> {showroomStatus.text}
            </span>
          </div>
          <h1>Experience Roshan Jewel</h1>
          <p>Three generations of quiet brilliance, uncompromising purity, and bespoke craftsmanship in Indore since 1965</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-section">
        <div className="container">

          {/* Quick WhatsApp 1-Tap Topic Launcher Bar */}
          <div className="whatsapp-topic-bar">
            <div className="topic-bar-title-row">
              <span className="topic-bar-title">
                <i className="fab fa-whatsapp"></i> 1-Tap WhatsApp Concierge:
              </span>
              <span className="topic-bar-hint">Select a topic for instant response</span>
            </div>
            <div className="topic-chips-container">
              {WHATSAPP_TOPICS.map((topic, i) => (
                <a
                  key={i}
                  href={`https://wa.me/918224998809?text=${encodeURIComponent(topic.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-chip"
                >
                  <i className={topic.icon}></i>
                  <span>{topic.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-grid">
            {/* Showroom Information Column */}
            <div className="contact-info-card">
              <div className="card-badge">
                <i className="fas fa-award"></i>
                <span>FLAGSHIP ATELIER • EST. 1965</span>
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
                  <span>WhatsApp</span>
                </a>
                <a href="tel:08224998809" className="contact-quick-btn call-btn">
                  <i className="fas fa-phone-alt"></i>
                  <span>Call Showroom</span>
                </a>
                <a href="mailto:jewelroshan9@gmail.com" className="contact-quick-btn email-btn">
                  <i className="fas fa-envelope"></i>
                  <span>Email</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Royal+Diamond+Building+Yeshwant+Niwas+Road+opposite+SBI+BANK+Indore+MP+452002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-quick-btn map-btn"
                >
                  <i className="fas fa-directions"></i>
                  <span>Directions</span>
                </a>
              </div>

              {/* Active Social Media & Location Connect Bar */}
              <div className="contact-social-bar">
                <span className="social-bar-label"><i className="fas fa-share-alt"></i> Official Connect Channels:</span>
                <div className="social-active-links">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-active-btn facebook"
                    title="Follow Roshan Jewels on Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-active-btn instagram"
                    title="Follow Roshan Jewels on Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Royal+Diamond+Building+Yeshwant+Niwas+Road+opposite+SBI+BANK+Indore+MP+452002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-active-btn location"
                    title="Google Maps Showroom Location"
                  >
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Location</span>
                  </a>
                  <a
                    href="https://wa.me/918224998809?text=Hello%20Roshan%20Jewels!%20I%20would%20like%20to%20connect%20with%20your%20concierge."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-active-btn whatsapp"
                    title="Chat on WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </a>
                </div>
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
                        className={`btn-copy-address-icon ${copied ? 'copied' : ''}`}
                        title={copied ? "Address Copied!" : "Copy Full Address"}
                        aria-label="Copy Address"
                      >
                        <i className={copied ? "fas fa-check" : "far fa-copy"}></i>
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
                    <div className="info-header-row">
                      <h4>Direct Line & WhatsApp</h4>
                    </div>
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
                    <div className="info-header-row">
                      <h4>Email Concierge</h4>
                    </div>
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

              {/* Visual Showcase Card & Visitor Landmarks Guide (Replaces Map Embed) */}
              <div className="showroom-showcase-card">
                <div className="showroom-img-frame">
                  <img
                    src={shopviewImg}
                    alt="Roshan Jewel Flagship Showroom Indore"
                    loading="lazy"
                    className="showroom-display-img"
                  />
                  <div className="showroom-img-overlay">
                    <span className="showroom-overlay-badge">
                      <i className="fas fa-building"></i> VISIT IN PERSON
                    </span>
                    <h4>Royal Diamond Building, Indore</h4>
                  </div>
                </div>

                <div className="showroom-visitor-guide">
                  <div className="guide-item">
                    <div className="guide-icon"><i className="fas fa-parking"></i></div>
                    <div className="guide-text">
                      <strong>Complimentary Valet Parking</strong>
                      <p>Dedicated valet attendants available in front of Royal Diamond Building.</p>
                    </div>
                  </div>

                  <div className="guide-item">
                    <div className="guide-icon"><i className="fas fa-landmark"></i></div>
                    <div className="guide-text">
                      <strong>Prime Central Landmark</strong>
                      <p>Directly opposite State Bank of India (SBI) main branch, Yeshwant Niwas Road.</p>
                    </div>
                  </div>

                  <div className="guide-item">
                    <div className="guide-icon"><i className="fas fa-route"></i></div>
                    <div className="guide-text">
                      <strong>Transit Convenience</strong>
                      <p>10 mins from Indore Railway Station • 25 mins from Devi Ahilyabai Airport.</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Royal+Diamond+Building+Yeshwant+Niwas+Road+opposite+SBI+BANK+Indore+MP+452002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-open-maps"
                >
                  <i className="fas fa-location-arrow"></i>
                  <span>Get Live Directions on Google Maps</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Right Column: 3-Mode Interactive Switcher (Enquiry | In-Store VIP | Virtual Video Call) */}
            <div className="contact-form-panel">
              {/* 3-Way Tab Selector */}
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
                  <span>In-Store VIP Visit</span>
                </button>
                <button
                  type="button"
                  className={`mode-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveTab('video')}
                >
                  <i className="fas fa-video"></i>
                  <span>Virtual Video Call</span>
                </button>
              </div>

              {activeTab === 'enquiry' && (
                <ContactForm />
              )}

              {activeTab === 'vip' && (
                <div className="contact-form-container vip-booking-container">
                  <div className="form-header-badge vip-badge">
                    <i className="fas fa-crown"></i>
                    <span>EXCLUSIVE IN-STORE EXPERIENCE</span>
                  </div>

                  <h3>Book a Private VIP Consultation</h3>
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

              {activeTab === 'video' && (
                <div className="contact-form-container video-booking-container">
                  <div className="form-header-badge video-badge">
                    <i className="fas fa-video"></i>
                    <span>LIVE VIRTUAL ATELIER</span>
                  </div>

                  <h3>Schedule a Live Video Consultation</h3>
                  <p className="form-subtitle">
                    Preview our private collection in high-definition from anywhere in India or internationally with a dedicated jewellery specialist.
                  </p>

                  <form onSubmit={handleVideoSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="videoName">
                          <i className="fas fa-user"></i> Full Name <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="videoName"
                          className="form-control"
                          placeholder="Enter your name"
                          value={videoName}
                          onChange={(e) => setVideoName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="videoPhone">
                          <i className="fas fa-phone-alt"></i> Phone / WhatsApp Number <span>*</span>
                        </label>
                        <input
                          type="tel"
                          id="videoPhone"
                          className="form-control numeric-text"
                          placeholder="e.g. +91 98765 43210 or +1..."
                          value={videoPhone}
                          onChange={(e) => setVideoPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="videoPlatform">
                          <i className="fas fa-camera"></i> Preferred Video Platform <span>*</span>
                        </label>
                        <select
                          id="videoPlatform"
                          className="form-control"
                          value={videoPlatform}
                          onChange={(e) => setVideoPlatform(e.target.value)}
                        >
                          <option value="WhatsApp Video Call">WhatsApp Video Call</option>
                          <option value="Google Meet">Google Meet</option>
                          <option value="Zoom Meeting">Zoom Meeting</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="videoCategory">
                          <i className="fas fa-gem"></i> Collection to Preview <span>*</span>
                        </label>
                        <select
                          id="videoCategory"
                          className="form-control"
                          value={videoCategory}
                          onChange={(e) => setVideoCategory(e.target.value)}
                        >
                          <option value="Bespoke Bridal Trousseau">Bespoke Bridal Jewellery Trousseau</option>
                          <option value="Certified Solitaire Diamond Rings">Certified Solitaire Rings & Pendants</option>
                          <option value="22K Gold Heirloom & Antique Jewellery">22K Gold Heirlooms & Temple Necklaces</option>
                          <option value="Royal Kundan & Polki Jadau">Royal Kundan & Polki Jadau</option>
                          <option value="Heirloom Redesign Consultation">Family Heirloom Redesign / Remodelling</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="videoDate">
                          <i className="fas fa-calendar-alt"></i> Preferred Date
                        </label>
                        <input
                          type="date"
                          id="videoDate"
                          className="form-control numeric-text"
                          value={videoDate}
                          onChange={(e) => setVideoDate(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="videoSlot">
                          <i className="fas fa-clock"></i> Preferred Time Slot <span>*</span>
                        </label>
                        <select
                          id="videoSlot"
                          className="form-control numeric-text"
                          value={videoSlot}
                          onChange={(e) => setVideoSlot(e.target.value)}
                        >
                          <option value="Morning (11:30 AM – 02:00 PM IST)">Morning: 11:30 AM – 02:00 PM IST</option>
                          <option value="Afternoon (02:00 PM – 05:00 PM IST)">Afternoon: 02:00 PM – 05:00 PM IST</option>
                          <option value="Evening (05:00 PM – 08:30 PM IST)">Evening: 05:00 PM – 08:30 PM IST</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="btn-submit video-submit-btn">
                      <i className="fab fa-whatsapp"></i>
                      <span>Schedule Live Video Call via WhatsApp</span>
                    </button>
                  </form>

                  {/* Form Assurance Pillars */}
                  <div className="form-assurance-row">
                    <div className="assurance-item">
                      <i className="fas fa-video"></i>
                      <span>HD Video Stream</span>
                    </div>
                    <div className="assurance-item">
                      <i className="fas fa-certificate"></i>
                      <span>Live Certificate Verification</span>
                    </div>
                    <div className="assurance-item">
                      <i className="fas fa-globe"></i>
                      <span>Worldwide NRI Service</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>




      {/* Frequently Asked Questions Section */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="section-title-center">
            <span className="page-badge"><i className="fas fa-question-circle"></i> HELP & GUIDANCE</span>
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

