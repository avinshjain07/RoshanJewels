import { useState } from 'react';
import SEO from '@components/Common/SEO/SEO';
import Breadcrumb from '@components/Common/Breadcrumb/Breadcrumb';
import craftImg from '@assets/images/craft.jpg';

const BESPOKE_STEPS = [
  {
    step: '01',
    icon: 'fas fa-pencil-ruler',
    title: 'Consultation & Design Ideation',
    description:
      'Begin your journey with our master jewellery designers. Share your ideas, sketches, Pinterest inspirations, or family heirlooms to define your unique aesthetic and budget.',
  },
  {
    step: '02',
    icon: 'fas fa-cube',
    title: '3D CAD Modeling & Photorealistic Render',
    description:
      'We translate your vision into millimeter-precise 3D digital models and wax prototypes, allowing you to preview proportions and details from every angle before casting.',
  },
  {
    step: '03',
    icon: 'fas fa-gem',
    title: 'Certified Gemstone & Gold Selection',
    description:
      'Hand-select your diamonds (GIA/IGI certified) and natural precious gems. Choose your metal—100% BIS Hallmarked 22K yellow gold, 18K rose gold, white gold, or platinum.',
  },
  {
    step: '04',
    icon: 'fas fa-crown',
    title: 'Master Karigari & Handcrafting',
    description:
      'Our third-generation master artisans hand-set every stone, apply intricate hand-engraving, meenakari, or micro-pavé, finishing your heirloom to perfection.',
  },
];

const BESPOKE_CATEGORIES = [
  {
    title: 'Bespoke Bridal Trousseau',
    tag: 'ROYAL HEIRLOOMS',
    description: 'Custom-crafted necklaces, earrings, maang tikka, and haathphool tailored precisely to complement your bridal couture.',
    icon: 'fas fa-award',
  },
  {
    title: 'Solitaire Engagement Rings',
    tag: 'ETERNAL LOVE',
    description: 'One-of-a-kind engagement rings and wedding bands sculpted around your hand-selected certified diamond.',
    icon: 'far fa-gem',
  },
  {
    title: 'Royal Kundan & Polki Jadau',
    tag: 'CENTURY CRAFTSMANSHIP',
    description: 'Regal uncut diamond and antique Jadau sets crafted using age-old Rajasthani and Mughal heritage techniques.',
    icon: 'fas fa-crown',
  },
  {
    title: 'Family Heirloom Redesign',
    tag: 'REPURPOSE & MODERNIZE',
    description: 'Give new life to cherished vintage gold and diamonds, reimagining timeless family heirlooms for contemporary wear.',
    icon: 'fas fa-sync-alt',
  },
];

export default function Bespoke() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Bridal Trousseau');
  const [metal, setMetal] = useState('22K Yellow Gold (916)');
  const [budget, setBudget] = useState('Under ₹2,00,000');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppConsultation = (e) => {
    e.preventDefault();
    const text = `*New Bespoke Jewellery Consultation Request*%0A%0A` +
      `*Name:* ${name || 'N/A'}%0A` +
      `*Phone:* ${phone || 'N/A'}%0A` +
      `*Email:* ${email || 'N/A'}%0A` +
      `*Category:* ${category}%0A` +
      `*Preferred Metal:* ${metal}%0A` +
      `*Budget Range:* ${budget}%0A` +
      `*Design Ideas:* ${notes || 'Looking for custom consultation'}`;

    window.open(`https://wa.me/918224998809?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Bespoke Jewellery Design | Roshan Jewel Indore"
        description="Craft your one-of-a-kind bespoke jewellery with Roshan Jewel. Master karigars, 3D CAD modeling, GIA/IGI certified diamonds, and BIS Hallmarked gold in Indore since 1965."
        keywords="bespoke jewellery indore, custom jewellery design indore, custom engagement rings indore, 3D CAD jewellery, bridal trousseau design"
        canonical="/bespoke"
      />

      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Bespoke Design' }]} />

      {/* Page Header */}
      <section className="bespoke-hero-header">
        <div className="container">
          <div className="bespoke-hero-badge">
            <i className="fas fa-drafting-compass"></i>
            <span>CUSTOM DESIGN ATELIER</span>
          </div>
          <h1>Bespoke Jewellery Design</h1>
          <p>
            Where your imagination meets three generations of master karigari and state-of-the-art 3D CAD precision.
            Every piece is imagined with your vision, shaped with artisanal devotion, and crafted for eternity.
          </p>
        </div>
      </section>

      {/* Atelier Overview Banner */}
      <section className="bespoke-overview-section">
        <div className="container bespoke-overview-grid">
          <div className="bespoke-overview-image">
            <img
              src={craftImg}
              alt="Roshan Jewel Master Karigar Handcrafting Bespoke Jewellery"
              loading="lazy"
            />
            <div className="bespoke-image-badge">
              <i className="fas fa-certificate"></i>
              <div>
                <strong>100% BIS Hallmarked</strong>
                <span>Certified Purity & Diamonds</span>
              </div>
            </div>
          </div>

          <div className="bespoke-overview-content">
            <span className="page-badge"><i className="fas fa-gem"></i> THE ART OF CREATION</span>
            <h2>Crafting Jewellery as Unique as Your Story</h2>
            <p>
              At Roshan Jewel, bespoke jewellery is not merely manufactured—it is sculpted as a timeless testament
              to life's finest milestones. Whether you seek an exquisite bridal masterpiece tailored to your wedding couture,
              a custom solitaire engagement ring, or the rejuvenation of a cherished family heirloom, our private atelier
              provides an intimate, collaborative experience from initial concept to the final polish.
            </p>
            <div className="bespoke-highlights-list">
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>Direct collaboration with 3rd-generation master karigars & 3D CAD designers</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>Interactive 3D digital renders & wax model previews before gold casting</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>Conflict-free GIA & IGI certified solitaires with full gemological reports</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>Old gold exchange & heirloom remodelling with live Caratometer purity analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Creation Process */}
      <section className="bespoke-process-section">
        <div className="container">
          <div className="section-title-center">
            <span className="page-badge"><i className="fas fa-cogs"></i> OUR ATELIER PROCESS</span>
            <h2>The 4-Step Bespoke Journey</h2>
            <p>From an initial spark of inspiration to a masterfully finished heirloom in gold and diamonds</p>
          </div>

          <div className="bespoke-steps-grid">
            {BESPOKE_STEPS.map((item, idx) => (
              <div className="bespoke-step-card" key={idx}>
                <div className="step-number">{item.step}</div>
                <div className="step-icon-box">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Specialties Grid */}
      <section className="bespoke-categories-section">
        <div className="container">
          <div className="section-title-center">
            <span className="page-badge"><i className="fas fa-crown"></i> OUR SPECIALTIES</span>
            <h2>Custom Creation Categories</h2>
            <p>Tailored craftsmanship across bridal, solitaires, antique heritage, and heirloom redesign</p>
          </div>

          <div className="bespoke-categories-grid">
            {BESPOKE_CATEGORIES.map((cat, idx) => (
              <div className="bespoke-cat-card" key={idx}>
                <div className="cat-header-row">
                  <span className="cat-tag">{cat.tag}</span>
                  <div className="cat-icon"><i className={cat.icon}></i></div>
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Request Form */}
      <section className="bespoke-consultation-section" id="book-consultation">
        <div className="container">
          <div className="bespoke-form-card">
            <div className="form-title-center">
              <span className="page-badge"><i className="fas fa-calendar-check"></i> START YOUR DESIGN</span>
              <h2>Request a Bespoke Consultation</h2>
              <p>Connect directly with our master design team in our private Indore VIP lounge or via WhatsApp</p>
            </div>

            {submitted && (
              <div className="alert-box success">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Consultation Request Initiated!</strong>
                  <p>Your request details have been prepared for WhatsApp chat with our master designer.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleWhatsAppConsultation} className="bespoke-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bespokeName">
                    <i className="fas fa-user"></i> Full Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="bespokeName"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bespokePhone">
                    <i className="fas fa-phone-alt"></i> Phone / WhatsApp Number <span>*</span>
                  </label>
                  <input
                    type="tel"
                    id="bespokePhone"
                    className="form-control numeric-text"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bespokeCategory">
                    <i className="fas fa-tags"></i> Jewellery Category <span>*</span>
                  </label>
                  <select
                    id="bespokeCategory"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Bridal Trousseau">Bespoke Bridal Trousseau & Necklace</option>
                    <option value="Solitaire Engagement Ring">Solitaire Engagement Ring / Band</option>
                    <option value="Royal Kundan & Polki">Royal Kundan & Polki Jadau</option>
                    <option value="Heirloom Redesign">Family Heirloom Remodelling</option>
                    <option value="Gold Bangles & Bracelets">Custom 22K Gold Bangles / Kada</option>
                    <option value="Bespoke Pendant / Earrings">Custom Solitaire Pendant & Earrings</option>
                    <option value="Other Custom Piece">Other Custom Creation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="bespokeMetal">
                    <i className="fas fa-coins"></i> Precious Metal <span>*</span>
                  </label>
                  <select
                    id="bespokeMetal"
                    className="form-control"
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                  >
                    <option value="22K Yellow Gold (916)">22K Yellow Gold (916 BIS Hallmarked)</option>
                    <option value="18K Rose Gold">18K Rose Gold</option>
                    <option value="18K White Gold">18K White Gold</option>
                    <option value="Platinum (950)">Platinum (950)</option>
                    <option value="925 Sterling Silver">925 Sterling Silver</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bespokeBudget">
                    <i className="fas fa-wallet"></i> Estimated Budget Range
                  </label>
                  <select
                    id="bespokeBudget"
                    className="form-control"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="Under ₹1,00,000">Under ₹1,00,000</option>
                    <option value="₹1,00,000 – ₹2,50,000">₹1,00,000 – ₹2,50,000</option>
                    <option value="₹2,50,000 – ₹5,00,000">₹2,50,000 – ₹5,00,000</option>
                    <option value="₹5,00,000 – ₹10,00,000">₹5,00,000 – ₹10,00,000</option>
                    <option value="₹10,00,000+">₹10,00,000+ (High Bridal / Solitaire)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="bespokeEmail">
                    <i className="fas fa-envelope"></i> Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="bespokeEmail"
                    className="form-control"
                    placeholder="e.g. rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bespokeNotes">
                  <i className="fas fa-edit"></i> Tell Us About Your Vision
                </label>
                <textarea
                  id="bespokeNotes"
                  className="form-control"
                  placeholder="Describe your design inspirations, gemstone preferences, target completion date, or any family gold/diamonds you would like to incorporate..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit bespoke-submit-btn">
                <i className="fab fa-whatsapp"></i>
                <span>Connect with Master Designer on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
