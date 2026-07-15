import SEO from '@components/Common/SEO/SEO';
import ContactForm from '@components/Forms/ContactForm/ContactForm';
import { PAGE_SEO } from '@constants/seo';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

export default function Contact() {
  useScrollAnimation('.info-item, .contact-form-container', []);

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
      <section className="page-header">
        <div className="container">
          <h1>Contact Roshan Jewel</h1>
          <p>We are delighted to assist you with our legacy of quiet brilliance</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Column */}
            <div className="contact-info-card">
              <h3>Visit Our Showroom</h3>
              <p>
                Step into a legacy of craftsmanship. Our customer representatives
                are ready to assist you in finding or designing your perfect
                jewellery masterpiece.
              </p>

              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div className="info-item-content">
                  <h4>Showroom Address</h4>
                  <p>
                    UG 2,3, Royal Diamond Building, Yeshwant Niwas Road, opposite
                    SBI BANK, Indore, MP 452002
                  </p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div className="info-item-content">
                  <h4>Phone Call / WhatsApp</h4>
                  <p>
                    <a href="tel:08224998809">082249 98809</a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div className="info-item-content">
                  <h4>Email Support</h4>
                  <p>
                    <a href="mailto:jewelroshan9@gmail.com">
                      jewelroshan9@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div className="info-item-content">
                  <h4>Business Hours</h4>
                  <p>Monday - Sunday: 11:30 AM - 8:30 PM</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
