import SEO from '@components/Common/SEO/SEO';
import { PAGE_SEO } from '@constants/seo';
import { useScrollAnimation } from '@hooks/useScrollAnimation';
import aboutImg from '@assets/images/about.webp';
import craftImg from '@assets/images/craft.jpg';

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

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Roshan Jewel</h2>
          </div>
          <div className="why-grid">
            <div className="why-item">
              <i className="fas fa-trophy"></i>
              <h3>61+ Years of Excellence</h3>
              <p>Trusted by generations of families in Indore and across MP.</p>
            </div>
            <div className="why-item">
              <i className="fas fa-pencil"></i>
              <h3>Custom Designs</h3>
              <p>
                Bring your vision to life with our custom jewellery design
                service.
              </p>
            </div>
            <div className="why-item">
              <i className="fas fa-shield-alt"></i>
              <h3>Hallmarked Gold</h3>
              <p>Every piece is BIS hallmarked for guaranteed purity.</p>
            </div>
            <div className="why-item">
              <i className="fas fa-hand-holding-heart"></i>
              <h3>Personalized Service</h3>
              <p>One-on-one consultations to help you find the perfect piece.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
