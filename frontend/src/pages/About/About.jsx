import SEO from '@components/Common/SEO/SEO';
import { PAGE_SEO } from '@constants/seo';
import { useScrollAnimation } from '@hooks/useScrollAnimation';
import aboutImg from '@assets/images/about.png';
import craftImg from '@assets/images/craft.jpg';
import shopViewImg from '@assets/images/shopview.jpeg';

export default function About() {
  useScrollAnimation('.value-card, .why-item', []);

  const seo = PAGE_SEO.about;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        keywords={seo.keywords}
      />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About Roshan Jewel</h1>
          <p>Three generations of crafting timeless elegance in Indore</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p className="story-year">Since 1965</p>
              <p>
                Roshan Jewel… a name born in 1965, carried forward with the quiet
                brilliance of three generations. What began as a humble spark has
                grown into a house of refined beauty. Here, every creation is
                imagined with a designer&apos;s vision, shaped with a craftsman&apos;s
                devotion, and perfected with a touch of modern grace.
              </p>
              <p>
                At Roshan Jewel, jewellery is poetry cast in gold… a whisper of
                heritage, a celebration of love, and a companion to life&apos;s finest
                moments. Each piece holds our family&apos;s promise—elegance that
                endures, quality that speaks softly yet confidently, and beauty
                that feels deeply personal. Because at Roshan Jewel, we don&apos;t
                just craft jewellery… we craft stories meant to shine.
              </p>
              <p>
                What started as a small workshop in Indore has blossomed into one
                of the city&apos;s most cherished jewellery destinations, trusted by
                generations of families who seek not just ornamentation, but
                heirlooms that carry meaning.
              </p>
            </div>
            <div className="story-image">
              <img
                src={aboutImg}
                alt="Roshan Jewel - Our Story and Heritage"
                className="about-image"
                style={{ objectFit: 'contain', backgroundColor: '#fbeaec' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="our-values">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-gem"></i>
              <h3>Purity</h3>
              <p>
                100% hallmarked gold with guaranteed purity. Every piece comes
                with our certificate of authenticity.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-hand-sparkles"></i>
              <h3>Craftsmanship</h3>
              <p>
                Each design is meticulously handcrafted by master artisans with
                decades of experience.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-heart"></i>
              <h3>Trust</h3>
              <p>
                Building lasting relationships through transparency, fair pricing,
                and exceptional service since 1965.
              </p>
            </div>
            <div className="value-card">
              <i className="fas fa-history"></i>
              <h3>Tradition</h3>
              <p>
                Preserving traditional Indian jewellery designs while embracing
                contemporary aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="craftsmanship">
        <div className="container">
          <div className="craft-grid">
            <div className="craft-content">
              <h2>The Art of Craftsmanship</h2>
              <p>
                At Roshan Jewel, jewellery is poetry cast in gold… a whisper of
                heritage, a celebration of love, and a companion to life&apos;s finest
                moments. Each piece holds our family&apos;s promise—elegance that
                endures, quality that speaks softly yet confidently, and beauty
                that feels deeply personal.
              </p>
              <p>
                Behind every piece at Roshan Jewel is a story of dedication,
                skill, and passion. Our master artisans bring decades of
                experience to their craft, employing techniques passed down
                through generations.
              </p>
            </div>
            <div className="craft-image">
              <img
                src={craftImg}
                alt="Roshan Jewel - Jewellery Craftsmanship"
                className="about-image"
                style={{ objectFit: 'contain', backgroundColor: '#fbeaec' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Store */}
      <section className="our-store">
        <div className="container">
          <div className="store-grid">
            <div className="store-image">
              <img
                src={shopViewImg}
                alt="Roshan Jewel - Our Showroom in Indore"
                className="about-image"
                style={{ objectFit: 'cover', backgroundColor: '#fbeaec' }}
                loading="lazy"
              />
            </div>
            <div className="store-content">
              <h2>Visit Our Showroom</h2>
              <p>
                Step into the world of Roshan Jewel and experience the warmth of our
                heritage firsthand. Our showroom in the heart of Indore welcomes you
                with an ambiance that blends old-world charm and contemporary elegance.
              </p>
              <p>
                Browse through our carefully curated collections displayed in an atmosphere of
                personalized service. Our knowledgeable consultants are always at hand to
                guide you through every piece, ensuring your jewellery buying experience is
                memorable. Whether you seek a timeless classic or a bespoke creation—our doors are
                always open.
              </p>
              <p>
                Located in the vibrant city of Indore, our store is more than a
                destination—it is where families have been coming for generations to
                celebrate life's most precious moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Roshan Jewel</h2>
            <p>Uncompromising standards of purity, master craftsmanship, and generational trust since 1965</p>
          </div>
          <div className="why-grid">
            <div className="why-item">
              <i className="fas fa-certificate"></i>
              <h3>BIS Hallmark & IGI-Certified Jewellery</h3>
              <p>
                Guaranteed 100% 22K (916) and 18K (750) BIS HUID Hallmarked Gold along with GIA & IGI Certified Natural Diamonds with authentic origin reports.
              </p>
            </div>
            <div className="why-item">
              <i className="fas fa-gem"></i>
              <h3>Global Standard of Finish</h3>
              <p>
                International luxury benchmarks in precision micro-setting, hand-engraved nakshi carvings, high-polish finishing, and flawless symmetry.
              </p>
            </div>
            <div className="why-item">
              <i className="fas fa-pencil-ruler"></i>
              <h3>Unique Custom Design</h3>
              <p>
                Bespoke high-jewellery atelier crafting custom creations from 3D CAD renders to hand-cast masterpieces tailored to your personal story.
              </p>
            </div>
            <div className="why-item">
              <i className="fas fa-hand-holding-heart"></i>
              <h3>Personal Concierge Service</h3>
              <p>
                Three generations of devoted client care, private bridal lounge consultations, video viewings, lifetime polishing, and 100% buyback transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
