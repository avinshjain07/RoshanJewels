import { useState } from 'react';
import SEO from '@components/Common/SEO/SEO';
import Breadcrumb from '@components/Common/Breadcrumb/Breadcrumb';

const NAVRATNA_STONES = [
  {
    id: 'ruby',
    name: 'Ruby',
    hindiName: 'माणिक्य (Manik)',
    sanskritName: 'Padmaraga / Manikya',
    planet: 'Sun (Surya Bhagwan)',
    rashi: 'Leo (Simha Rashi)',
    color: 'Deep Pigeon Blood Red',
    colorHex: '#9B111E',
    origin: 'Burma (Myanmar), Mozambique & Madagascar',
    certification: '100% Natural, Unheated & Untreated with Govt. Gemological Lab Certificate',
    benefits: [
      'Bestows royal authority, leadership aura, self-confidence and magnetic charisma',
      'Accelerates career progression in administrative, governmental and executive roles',
      'Improves cardiovascular vitality, eyesight and overall physical stamina',
      'Protects from negative energies and fosters harmony with father and mentors'
    ],
    description: 'The King of Gemstones (Ratnaraj). Our certified natural rubies are chosen for deep crimson luster, exceptional transparency, and unheated astrological potency.',
    caratRange: '2.50 to 12.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-1.jpg'
  },
  {
    id: 'pearl',
    name: 'Natural Pearl',
    hindiName: 'सच्चा मोती (Moti)',
    sanskritName: 'Mukta / Shashi-Ratna',
    planet: 'Moon (Chandra Dev)',
    rashi: 'Cancer (Kark Rashi)',
    color: 'Silvery White with Iridescent Pink Sheen',
    colorHex: '#F0EAD6',
    origin: 'South Sea, Basra & Japan Cultured Natural',
    certification: '100% Natural Organic Gem with Radiance & Luster Purity Certificate',
    benefits: [
      'Calms volatile emotions, reduces anxiety, stress and brings deep mental peace',
      'Enhances intuitive wisdom, emotional intelligence, and motherly bonding',
      'Regulates hormonal balance, sleep cycles and cooling bodily energies',
      'Promotes marital warmth, artistic creativity, and soothing communication'
    ],
    description: 'Sacred stone of the Moon. Natural certified pearls chosen for rich nacre thickness, smooth spherical symmetry, and gentle lunar aura.',
    caratRange: '4.00 to 15.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-2.jpg'
  },
  {
    id: 'red-coral',
    name: 'Red Coral',
    hindiName: 'लाल मूंगा (Moonga)',
    sanskritName: 'Praval / Vidruma',
    planet: 'Mars (Mangal Dev)',
    rashi: 'Aries & Scorpio (Mesh & Vrishchik)',
    color: 'Deep Carnation Red / Oxblood',
    colorHex: '#E23D28',
    origin: 'Mediterranean Sea (Italy) & Japan',
    certification: '100% Natural Untreated Organic Marine Coral with Assay Guarantee',
    benefits: [
      'Infuses boundless courage, physical power, ambition and dynamic initiative',
      'Overcomes Manglik Dosha, delays in marriage and relationship conflicts',
      'Aids real estate, engineering, surgery, defense and sports careers',
      'Boosts immune vitality, blood circulation, and muscular endurance'
    ],
    description: 'The vitality gemstone of Mars. Premium Italian triangular and capsule corals polished to a porcelain luster without dyes or chemical fillings.',
    caratRange: '4.50 to 14.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-3.jpg'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    hindiName: 'पन्ना (Panna)',
    sanskritName: 'Marakata / Budharatna',
    planet: 'Mercury (Budh Dev)',
    rashi: 'Gemini & Virgo (Mithun & Kanya)',
    color: 'Vibrant Vivid Green (Jahan-numa)',
    colorHex: '#50C878',
    origin: 'Zambia, Colombia & Brazil',
    certification: '100% Natural Astrological Grade with Minor Natural Cedar Oil (Traditional)',
    benefits: [
      'Sharpens intellect, analytical clarity, memory recall and mathematical genius',
      'Accelerates success in business, trading, media, banking, law and commerce',
      'Enhances eloquent public speaking, negotiation charm and linguistic flair',
      'Soothes nervous tension, respiratory allergies and optical eye strain'
    ],
    description: 'The stone of merchants, scholars, and orators. Certified Zambian and Colombian emeralds with velvety green saturation and rich natural jardin.',
    caratRange: '2.00 to 10.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-4.jpg'
  },
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire',
    hindiName: 'पुखराज (Pukhraj)',
    sanskritName: 'Pushparaga / Gururatna',
    planet: 'Jupiter (Brihaspati / Guru)',
    rashi: 'Sagittarius & Pisces (Dhanu & Meen)',
    color: 'Brilliant Golden Lemon Yellow',
    colorHex: '#FFD700',
    origin: 'Ceylon (Sri Lanka) & Madagascar',
    certification: '100% Certified Unheated Natural Ceylon Sapphire with Origin Verification',
    benefits: [
      'Bestows abundant wealth, divine fortune, noble wisdom and spiritual growth',
      'Removes marital obstacles, facilitates harmonious matrimonial bliss and fertility',
      'Blesses with higher education achievements, judicial success and respected status',
      'Enhances digestive health, liver vitality and optimistic life outlook'
    ],
    description: 'The supreme benefic gemstone of Devaguru Brihaspati. Pure unheated Ceylon sapphires with golden radiance and flawless optical transparency.',
    caratRange: '3.00 to 12.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-5.jpg'
  },
  {
    id: 'diamond-white-sapphire',
    name: 'Natural Diamond & White Sapphire',
    hindiName: 'हीरा / श्वेत पुखराज (Heera)',
    sanskritName: 'Vajra / Shukraratna',
    planet: 'Venus (Shukra Dev)',
    rashi: 'Taurus & Libra (Vrishabh & Tula)',
    color: 'Colorless Ice White with Spectral Fire',
    colorHex: '#E6F0FA',
    origin: 'Certified Natural GIA / IGI Diamonds & Ceylon White Sapphires',
    certification: 'IGI & GIA Certified Natural Gemstones with 4Cs Authenticity Report',
    benefits: [
      'Attracts supreme luxury, opulent lifestyle, aesthetic elegance and social magnetism',
      'Fosters romantic intimacy, marital glamour, creative arts and cinematic brilliance',
      'Enhances skin radiance, reproductive vitality, and personal charisma',
      'Protects from marital discord and financial stagnation in luxury ventures'
    ],
    description: 'The gemstone of love, glamour, and beauty. Certified natural diamonds and untreated Ceylon white sapphires exhibiting scintillating brilliance and fire.',
    caratRange: '0.30 to 5.00+ Carats available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-6.jpg'
  },
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire',
    hindiName: 'नीलम (Neelam)',
    sanskritName: 'Indraneel / Shanimanthan',
    planet: 'Saturn (Shani Dev)',
    rashi: 'Capricorn & Aquarius (Makar & Kumbh)',
    color: 'Royal Velvet Indigo Blue (Mayurkanthi)',
    colorHex: '#0F52BA',
    origin: 'Ceylon (Sri Lanka) & Kashmir (Historical)',
    certification: '100% Natural Unheated Ceylon Blue Sapphire with Master Lab Testing',
    benefits: [
      'Fast-acting powerhouse: Can bestow instant breakthroughs, wealth and clarity',
      'Instills unshakeable discipline, laser focus, mental fortitude and patience',
      'Guards against sudden accidents, malefic evil eyes, and chronic obstacles',
      'Favors judicial leaders, industrialists, miners, tech pioneers and political visionaries'
    ],
    description: 'The most potent and rapid acting gemstone of Saturn. Certified natural unheated Ceylon blue sapphires with velvety cornflower and royal blue saturation.',
    caratRange: '2.50 to 11.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-7.jpg'
  },
  {
    id: 'hessonite',
    name: 'Hessonite Garnet',
    hindiName: 'गोमेद (Gomed)',
    sanskritName: 'Gomedaka / Rahuratna',
    planet: 'Rahu (North Lunar Node)',
    rashi: 'Astrological Planetary Antardasha / Transit',
    color: 'Cinnamon Honey / Cognac Orange-Brown',
    colorHex: '#B85D19',
    origin: 'Ceylon (Sri Lanka) & India',
    certification: '100% Natural Untreated Hessonite with High-Specific Gravity Testing',
    benefits: [
      'Shields from sudden unforeseen adversities, hidden adversaries and optical illusions',
      'Clears mental confusion, phobias, obsessive thoughts and indecision',
      'Accelerates unexpected wealth windfalls, political triumphs and international ventures',
      'Aids health recovery from skin, gastric and elusive chronic ailments'
    ],
    description: 'The shadow-dissolving stone of Rahu. Selected for rich honey-cinnamon transparent hue without black inclusions or murky cloudiness.',
    caratRange: '4.00 to 14.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-8.jpg'
  },
  {
    id: 'cats-eye',
    name: "Cat's Eye Chrysoberyl",
    hindiName: 'लहसुनिया (Lehsunia)',
    sanskritName: 'Vaidurya / Keturatna',
    planet: 'Ketu (South Lunar Node)',
    rashi: 'Astrological Planetary Antardasha / Transit',
    color: 'Greenish Golden / Honey with Sharp Chatoyant Band',
    colorHex: '#8A9A5B',
    origin: 'Ceylon (Sri Lanka), Brazil & India',
    certification: '100% Natural Chrysoberyl with Sharp Chatoyancy Ray Verification',
    benefits: [
      'Awakens deep spiritual intuition, occult wisdom, and meditative enlightenment',
      'Protects wealth from sudden bankruptcies, speculation losses and treacherous deceit',
      'Neutralizes malefic Ketu doshas and past karmic burdens',
      'Strengthens nerve vitality, physical agility and defense against unseen negative forces'
    ],
    description: 'The mystical talisman of Ketu. Features a razor-sharp, unbroken chatoyant milk-and-honey light band that opens and closes under directional light.',
    caratRange: '3.00 to 10.00+ Ratti available in stock',
    image: '/WEBSITE PHOTO NEW/BEADS MALA/beads-mala-9.jpg'
  }
];

export default function GemsStone() {
  const [selectedStone, setSelectedStone] = useState(null);
  const pageTitle = "Certified Natural Gemstones";
  const pageRoute = "/gems-stone";

  const handleInquireStone = (stone) => {
    const text = `Hello Roshan Jewels! I am interested in inquiring about certified natural *${stone.name} (${stone.hindiName})*.%0A%0A*Ruling Planet:* ${encodeURIComponent(stone.planet)}%0A*Carat Requirement:* Please share available weights, price per ratti, and custom gold/silver ring making details.`;
    window.open(`https://wa.me/918224998809?text=${text}`, '_blank');
  };

  return (
    <>
      <SEO
        title="100% Certified Natural Astrological Gemstones & Navratna | Roshan Jewel"
        description="Explore 100% authentic, unheated & untreated astrological gemstones at Roshan Jewels. Certified Manik, Panna, Pukhraj, Neelam, Moti, Moonga, Heera, Gomed & Lehsunia."
      />

      {/* Page Header */}
      <section className="page-header gemstone-page-header">
        <div className="container">
          <span className="page-badge"><i className="fas fa-gem"></i> NAVRATNA ATELIER • ESTD. 1965</span>
          <h1>Roshan Jewels Certified Natural Gemstones</h1>
          <p>Every precious gemstone available in 100% certified, unheated & untreated astrological quality with guaranteed Vedic potency</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="category-products gemstone-collection-section">
        <div className="container">
          <Breadcrumb pageTitle={pageTitle} pageRoute={pageRoute} />

          {/* Quality Assurance Banner */}
          <div className="gemstone-quality-banner">
            <div className="quality-banner-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <div className="quality-banner-content">
              <h3>Roshan Jewels Purity & Astrological Efficacy Promise</h3>
              <p>
                At Roshan Jewels, we understand that an astrological gemstone is not merely an ornament—it is a conduit of cosmic planetary energy.
                Every gemstone in our vault is <strong>100% natural, unheated, and untreated</strong>, tested and certified by premier government-recognized gemological laboratories with verified refractive index, specific gravity, and origin documentation.
              </p>
            </div>
            <div className="quality-banner-badges">
              <span className="q-badge"><i className="fas fa-check-circle"></i> Unheated & Untreated</span>
              <span className="q-badge"><i className="fas fa-shield-alt"></i> Govt. Lab Certified</span>
              <span className="q-badge"><i className="fas fa-ring"></i> Custom Vedic Rings & Pendants</span>
            </div>
          </div>

          {/* 9 Navratna Grid */}
          <div className="navratna-grid">
            {NAVRATNA_STONES.map((stone) => (
              <div key={stone.id} className="gemstone-card">
                <div className="gemstone-card-media">
                  <img src={stone.image} alt={`${stone.name} - Roshan Jewels`} className="gemstone-img" loading="lazy" />
                  <span className="gemstone-planet-tag" style={{ borderLeftColor: stone.colorHex }}>
                    <i className="fas fa-sun"></i> {stone.planet}
                  </span>
                </div>

                <div className="gemstone-card-body">
                  <div className="stone-title-row">
                    <div>
                      <h3 className="stone-name">{stone.name}</h3>
                      <span className="stone-hindi">{stone.hindiName}</span>
                    </div>
                    <span className="stone-sanskrit-tag">{stone.sanskritName}</span>
                  </div>

                  <div className="stone-meta-pills">
                    <span className="meta-pill"><i className="fas fa-star"></i> {stone.rashi}</span>
                    <span className="meta-pill"><i className="fas fa-map-marker-alt"></i> {stone.origin}</span>
                  </div>

                  <p className="stone-desc">{stone.description}</p>

                  <div className="stone-benefits-box">
                    <strong><i className="fas fa-sparkles"></i> Astrological Benefits:</strong>
                    <ul>
                      {stone.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx}><i className="fas fa-check"></i> {benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="stone-card-footer">
                    <div className="stone-stock-info">
                      <span className="stock-dot"></span>
                      <small>{stone.caratRange}</small>
                    </div>
                    <button
                      type="button"
                      className="btn-gemstone-inquire"
                      onClick={() => handleInquireStone(stone)}
                    >
                      <i className="fab fa-whatsapp"></i> Inquire & Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Astrological Ring / Pendant Consultation Callout */}
          <div className="gemstone-consultation-banner">
            <div className="consultation-banner-text">
              <h2>Need Vedic Astrological Guidance or Custom Gold / Silver Setting?</h2>
              <p>
                Our master karigars craft traditional open-back ring and pendant settings in 22K gold, 18K gold, 925 sterling silver, and Panchdhatu according to Vedic shastras so the gemstone touches your skin continuously for maximum astrological effect.
              </p>
            </div>
            <a
              href="https://wa.me/918224998809?text=Hello%20Roshan%20Jewels!%20I%20would%20like%20to%20consult%20regarding%20astrological%20gemstones%20and%20custom%20ring%20settings."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gemstone-consult"
            >
              <i className="fab fa-whatsapp"></i> Speak With Master Gemologist
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

