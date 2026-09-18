import { Link } from 'react-router-dom';
import logo from '@assets/logos/logo.png';

/**
 * Footer — Pixel-perfect port of the existing footer HTML.
 * Uses React Router <Link> for internal navigation.
 */
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          {/* Brand + Social */}
          <div className="footer-about">
            <div className="footer-logo">
              <img
                src={logo}
                alt="Roshan Jewel"
                className="footer-logo-img"
              />
            </div>
            <p>
              A name born in 1965, carried forward with the quiet brilliance of
              three generations. Here, jewellery is poetry cast in gold… a
              whisper of heritage, a celebration of love, and a companion to
              life&apos;s finest moments.
            </p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/roshan_jewel/"
                target="_blank"
                rel="noreferrer"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/people/Roshan-Jewels/61578381874625/"
                target="_blank"
                rel="noreferrer"
                title="Visit our Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=918224998809&text=Hello%20Roshan%20Jewels%2C%20I%20would%20like%20to%20know%20more%20about%20your%20jewellery%20collection"
                target="_blank"
                rel="noreferrer"
                title="Message us on WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="https://maps.google.com/?q=UG-02,+03,+Royal+Diamond+Building,+Yeshwant+Niwas+Road,+Opposite+SBI+Bank,+Sanghi+Colony,+Yeshwant+Colony,+Indore,+Madhya+Pradesh+452002"
                target="_blank"
                rel="noreferrer"
                title="Find Roshan Jewel on Google Maps"
              >
                <i className="fas fa-map-marker-alt"></i>
              </a>
            </div>
          </div>

          {/* Collections Links */}
          <div className="footer-links">
            <h4>Collections</h4>
            <ul>
              <li><Link to="/diamond">Diamond</Link></li>
              <li><Link to="/gold">Gold</Link></li>
              <li><Link to="/silver">Silver</Link></li>
              <li><Link to="/kundan">Kundan &amp; Polki</Link></li>
              <li><Link to="/beads">Beads Collection</Link></li>
              <li><Link to="/bullion">Bullion &amp; Coins</Link></li>
              <li><Link to="/gifts">Gifts &amp; Articles</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <a
                href="https://maps.google.com/?q=UG-02,+03,+Royal+Diamond+Building,+Yeshwant+Niwas+Road,+Opposite+SBI+Bank,+Sanghi+Colony,+Yeshwant+Colony,+Indore,+Madhya+Pradesh+452002"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-address-link"
              >
                UG-02, 03, Royal Diamond Building, Yeshwant Niwas Road, Opposite SBI Bank, Sanghi Colony, Yeshwant Colony, Indore, Madhya Pradesh – 452002
              </a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-phone"></i>
              <a href="tel:08224998809" className="numeric-text">+91 82249 98809</a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:jewelroshan9@gmail.com">jewelroshan9@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-clock"></i>
              <span className="numeric-text">Monday – Sunday: 11:30 AM – 08:30 PM</span>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Open 7 days a week</span>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>
            &copy; 2026 Roshan Jewel - Crafting Stories in Gold Since 1965. All
            rights reserved. | A legacy of three generations of quiet
            brilliance.
          </p>
        </div>
      </div>
    </footer>
  );
}
