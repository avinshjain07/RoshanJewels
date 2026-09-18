import { Link } from 'react-router-dom';
import SEO from '@components/Common/SEO/SEO';
import HeroSlider from '@components/Hero/HeroSlider';
import { PAGE_SEO } from '@constants/seo';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

export default function Home() {
  useScrollAnimation('.seller-card, .category-card, .promise-item', []);

  const seo = PAGE_SEO.home;

  // JSON-LD local business schema matching the original index.html exactly
  const localStoreSchema = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'Roshan Jewel',
    image: 'https://roshanjewels.com/logo.jpg',
    description:
      'Excellence in Jewellery store in Indore offering handcrafted jewellery since 1965',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'UG 2,3, Royal Diamond Building, Yeshwant Niwas Road, opposite SBI BANK, Sanghi Colony',
      addressLocality: 'Yeshwant Colony',
      addressRegion: 'Indore',
      postalCode: '452002',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.7269',
      longitude: '75.8782',
    },
    url: 'https://roshanjewels.com',
    telephone: '+918224998809',
    openingHours: 'Mo-Su 11:30-20:30',
    priceRange: '₹₹₹',
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        keywords={seo.keywords}
        structuredData={localStoreSchema}
      />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Best Sellers Section */}
      <section className="best-sellers" id="best-sellers">
        <div className="container">
          <div className="section-title">
            <h2>Best Sellers</h2>
          </div>
          <div className="sellers-grid">
            <div className="seller-card">
              <div className="seller-badge">BEST SELLER</div>
              <div className="seller-img">
                <img
                  src="/best-seller/gold necklace.jpg"
                  alt="Traditional Gold Necklace - 22K Gold"
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="seller-info">
                <h3>Traditional Gold Necklace</h3>
                <p>
                  Exquisite 22K gold necklace with traditional Indian design,
                  perfect for weddings and special occasions.
                </p>
                <Link to="/necklaces" className="btn-small">
                  View Collection
                </Link>
              </div>
            </div>

            <div className="seller-card">
              <div className="seller-badge">POPULAR</div>
              <div className="seller-img">
                <img
                  src="/best-seller/diamond-earrnigs.webp"
                  alt="Gold Diamond Earrings - 22K Gold"
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="seller-info">
                <h3>Gold Diamond Earrings</h3>
                <p>
                  Luxurious gold earrings with brilliant diamonds, crafted for
                  elegance and sophistication.
                </p>
                <Link to="/earrings" className="btn-small">
                  View Collection
                </Link>
              </div>
            </div>

            <div className="seller-card">
              <div className="seller-badge">TRENDING</div>
              <div className="seller-img">
                <img
                  src="/best-seller/bangles.jpg"
                  alt="Gold Bangles Set - 22K Gold"
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="seller-info">
                <h3>Gold Bangles Set</h3>
                <p>
                  Set of four handcrafted gold bangles with intricate traditional
                  motifs and modern finish.
                </p>
                <Link to="/gold?filter=Bangle" className="btn-small">
                  View Collection
                </Link>
              </div>
            </div>

            <div className="seller-card">
              <div className="seller-badge">NEW</div>
              <div className="seller-img">
                <img
                  src="/best-seller/pendant.jpg"
                  alt="Gold Pendant Set - 22K Gold"
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="seller-info">
                <h3>Gold Pendant Set</h3>
                <p>
                  Elegant gold pendant set with matching chain, featuring
                  contemporary design with traditional elements.
                </p>
                <Link to="/gold?filter=Pendant" className="btn-small">
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="brand-promise">
        <div className="promise-content">
          <div className="mfr-tag">MANUFACTURING TO RETAILER</div>

          <div className="catch-lines">
            <div className="catch-line">Jewels as beautiful as you</div>
            <div className="catch-line">Crafted with Passion, Worn with Pride</div>
          </div>

          <div className="promise-grid">
            <div className="promise-item">
              <i className="fas fa-file-invoice"></i>
              <h4>Transparent Billing</h4>
              <p>
                100% transparent billing with detailed breakdown of gold rate,
                making charges, and taxes. No hidden costs, complete clarity in
                every purchase.
              </p>
            </div>

            <div className="promise-item">
              <i className="fas fa-hand-holding-heart"></i>
              <h4>Guaranteed Buyback</h4>
              <p>
                Assured buyback guarantee on all our jewellery. Exchange your old
                jewellery or sell it back to us at transparent rates with zero
                hassle.
              </p>
            </div>

            <div className="promise-item">
              <i className="fas fa-tools"></i>
              <h4>Assured Maintenance</h4>
              <p>
                Free lifetime maintenance including cleaning, polishing, and stone
                checking. We ensure your jewellery stays as beautiful as the day
                you bought it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Collection Section */}
      <section className="categories" id="collections" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Shop by Collection</h2>
          </div>
          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="category-card">
              <div className="category-icon" style={{ marginBottom: '1rem' }}>
                <i className="fas fa-gem" style={{ fontSize: '2.5rem', color: 'var(--love-red)' }}></i>
              </div>
              <h3>Diamond Collection</h3>
              <p>Certified solitaires, elegant wedding sets, and daily wear diamond luxury.</p>
              <Link to="/diamond" className="btn-small">
                Explore Diamond
              </Link>
            </div>

            <div className="category-card">
              <div className="category-icon" style={{ marginBottom: '1rem' }}>
                <i className="fas fa-coins" style={{ fontSize: '2.5rem', color: 'var(--gold)' }}></i>
              </div>
              <h3>Gold Collection</h3>
              <p>Poetry cast in 22K hallmarked gold: antique sets, chains, and kadas.</p>
              <Link to="/gold" className="btn-small">
                Explore Gold
              </Link>
            </div>

            <div className="category-card">
              <div className="category-icon" style={{ marginBottom: '1rem' }}>
                <i className="fas fa-ring" style={{ fontSize: '2.5rem', color: '#a6a6a6' }}></i>
              </div>
              <h3>Silver Collection</h3>
              <p>Stunning sterling silver jewelry and pure 99.9% fine silver thali & articles.</p>
              <Link to="/silver" className="btn-small">
                Explore Silver
              </Link>
            </div>

            <div className="category-card">
              <div className="category-icon" style={{ marginBottom: '1rem' }}>
                <i className="fas fa-crown" style={{ fontSize: '2.5rem', color: 'var(--deep-rose)' }}></i>
              </div>
              <h3>Kundan & Polki</h3>
              <p>Royal heritage Jadau necklaces and pendant sets with fine Meenakari work.</p>
              <Link to="/kundan" className="btn-small">
                Explore Kundan
              </Link>
            </div>

            <div className="category-card">
              <div className="category-icon" style={{ marginBottom: '1rem' }}>
                <i className="fas fa-ellipsis-h" style={{ fontSize: '2.5rem', color: '#d98880' }}></i>
              </div>
              <h3>Beads Collection</h3>
              <p>Vibrant emerald malas, Italian charm sets, and beautiful gemstone bracelets.</p>
              <Link to="/beads" className="btn-small">
                Explore Beads
              </Link>
            </div>

            <div className="category-card">
              <div className="category-icon" style={{ marginBottom: '1rem' }}>
                <i className="fas fa-bars" style={{ fontSize: '2.5rem', color: 'var(--gold)' }}></i>
              </div>
              <h3>Bullion</h3>
              <p>Certified investment gold and silver coins, bars, and raw materials.</p>
              <Link to="/bullion" className="btn-small">
                Explore Bullion
              </Link>
            </div>

            <div className="category-card">
              <div className="category-icon" style={{ marginBottom: '1rem' }}>
                <i className="fas fa-gift" style={{ fontSize: '2.5rem', color: 'var(--love-red)' }}></i>
              </div>
              <h3>Gifting Collection</h3>
              <p>Gold and silver plated photo frames and fine articles for divine occasions.</p>
              <Link to="/gifts" className="btn-small">
                Explore Gifts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="categories" id="categories" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--blush)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
          </div>
          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="category-card">
              <h3>Rings</h3>
              <p>Traditional, engagement, daily wear, and solitaire rings.</p>
              <Link to="/rings" className="btn-small">
                Explore Rings
              </Link>
            </div>

            <div className="category-card">
              <h3>Earrings</h3>
              <p>Studs, tops, latkans, balis, and traditional jhumkas.</p>
              <Link to="/earrings" className="btn-small">
                Explore Earrings
              </Link>
            </div>

            <div className="category-card">
              <h3>Necklaces</h3>
              <p>Chokers, rani hars, antique sets, chains, and mangalsutras.</p>
              <Link to="/necklaces" className="btn-small">
                Explore Necklaces
              </Link>
            </div>

            <div className="category-card">
              <h3>Bangles</h3>
              <p>Handcrafted patlis, kadas, and traditional gajres.</p>
              <Link to="/rings?filter=Bangles" className="btn-small">
                Explore Bangles
              </Link>
            </div>

            <div className="category-card">
              <h3>Bracelets</h3>
              <p>Tennis bracelets, charm sets, and lightweight daily designs.</p>
              <Link to="/rings?filter=Bracelets" className="btn-small">
                Explore Bracelets
              </Link>
            </div>

            <div className="category-card">
              <h3>Pendants</h3>
              <p>Elegant diamond, gold, silver, and kundan pendant sets.</p>
              <Link to="/rings?filter=Pendants" className="btn-small">
                Explore Pendants
              </Link>
            </div>

            <div className="category-card">
              <h3>Coins & Bullion</h3>
              <p>Lakshmi coins, Ganesha coins, and pure raw materials.</p>
              <Link to="/bullion" className="btn-small">
                Explore Coins
              </Link>
            </div>

            <div className="category-card">
              <h3>Gifts & Articles</h3>
              <p>Photo frames, silver bowls, puja glasses, and diyas.</p>
              <Link to="/gifts" className="btn-small">
                Explore Gifts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
