import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '@assets/logos/logo.png';

/**
 * Navbar — Two-row luxury jewellery header matching the exact brand design.
 * Row 1: Top info bar (Showroom timings, BIS Purity, Phone, Directions).
 * Row 2: Top header with Logo, central Search bar, Wishlist, and Book VIP Visit button.
 * Row 3: Bottom navigation links (Home, Gold, Diamond, Silver, Kundan, Beads, Gems Stone, Bespoke, About, Contact).
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // label of open dropdown
  const [headerShadow, setHeaderShadow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    document.body.classList.remove('no-scroll');
  }, [pathname]);

  // Header scroll shadow
  useEffect(() => {
    const handleScroll = () => setHeaderShadow(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle('no-scroll', next);
      return next;
    });
    setOpenDropdown(null);
  }, []);

  // Toggle dropdown accordion on mobile
  const toggleDropdown = useCallback((label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }, []);

  // Search submission — navigates to /rings with ?search= param
  const handleSearch = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const q = searchQuery.trim();
        if (q) {
          navigate(`/rings?search=${encodeURIComponent(q)}`);
          setSearchQuery('');
          setMobileOpen(false);
          document.body.classList.remove('no-scroll');
        }
      }
    },
    [searchQuery, navigate]
  );

  return (
    <>
      {/* Top Info Banner */}
      <div className="top-info">
        <div className="container top-info-container">
          <div className="top-info-left">
            <span>
              <i className="far fa-clock"></i> Open Today: Monday – Sunday: 11:30 AM – 8:30 PM
            </span>
            <span className="top-info-sep">•</span>
            <span>
              <span className="purity-badge-dot">●</span> 100% BIS Hallmarked Purity
            </span>
          </div>

          <div className="top-info-right">
            <span>
              <i className="fas fa-phone-alt"></i> Call Now:{' '}
              <a href="tel:08224998809" className="numeric-text">+91 8224998809</a>
            </span>
            <span className="top-info-sep">•</span>
            <span>
              <i className="fas fa-map-marker-alt"></i>{' '}
              <a
                href="https://maps.google.com/?q=Royal+Diamond+Building+Yeshwant+Niwas+Road+opposite+SBI+BANK+Indore+MP+452002"
                target="_blank"
                rel="noreferrer"
              >
                Get Direction
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`site-header ${headerShadow ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Header Row 1: Logo, Search Box, Wishlist & Book VIP Visit */}
          <div className="header-main-row">
            {/* Logo */}
            <Link to="/" className="header-brand-logo">
              <img src={logo} alt="Roshan Jewel" className="logo-img" />
            </Link>

            {/* Central Search Bar */}
            <div className="header-search-wrapper">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="header-search-input"
                placeholder="Search jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                aria-label="Search jewellery"
              />
            </div>

            {/* Header Right Actions: Wishlist & Book VIP Visit */}
            <div className="header-actions">
              <Link to="/contact" className="header-wishlist-btn" title="Wishlist" aria-label="Wishlist">
                <i className="fas fa-heart"></i>
              </Link>

              <Link to="/contact" className="btn-book-vip">
                <i className="fas fa-book-open"></i>
                <span>Book VIP Visit</span>
              </Link>

              {/* Mobile Menu Toggle Hamburger */}
              <div
                className={`mobile-menu-toggle${mobileOpen ? ' active' : ''}`}
                id="mobile-menu-toggle"
                onClick={toggleMobile}
                role="button"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          {/* Header Row 2: Bottom Navigation Links */}
          <nav className="header-nav-row">
            <ul className={`nav-links${mobileOpen ? ' active' : ''}`} id="nav-links">
              {/* Home */}
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                >
                  Home
                </NavLink>
              </li>

              {/* Gold Dropdown */}
              <li className={`dropdown${openDropdown === 'Gold' ? ' active' : ''}`}>
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/gold') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Gold'}
                  onClick={(e) => {
                    if (window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Gold');
                    }
                  }}
                >
                  Gold <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/gold?filter=Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Rings</Link></li>
                  <li><Link to="/gold?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earrings</Link></li>
                  <li><Link to="/gold?filter=Necklace" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Necklace Set</Link></li>
                  <li><Link to="/gold?filter=Bangle" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles</Link></li>
                  <li><Link to="/gold?filter=Bracelets" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bracelet</Link></li>
                  <li><Link to="/gold?filter=Pendant" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendant</Link></li>
                  <li><Link to="/gold?filter=Chain" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Chain</Link></li>
                  <li><Link to="/gold?filter=Mangalsutra" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Mangalsutra</Link></li>
                </ul>
              </li>

              {/* Diamond Dropdown */}
              <li className={`dropdown${openDropdown === 'Diamond' ? ' active' : ''}`}>
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/diamond') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Diamond'}
                  onClick={(e) => {
                    if (window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Diamond');
                    }
                  }}
                >
                  Diamond <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/diamond?filter=Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Rings</Link></li>
                  <li><Link to="/diamond?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earrings</Link></li>
                  <li><Link to="/diamond?filter=Necklace" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Sets</Link></li>
                  <li><Link to="/diamond?filter=Bangles" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles</Link></li>
                  <li><Link to="/diamond?filter=Nose Pin" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Nose Pins</Link></li>
                  <li><Link to="/diamond?filter=Bracelets" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bracelets</Link></li>
                  <li><Link to="/diamond?filter=Pendant Set" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendant Sets</Link></li>
                  <li><Link to="/diamond?filter=Mangalsutra" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Mangalsutra</Link></li>
                </ul>
              </li>

              {/* Silver Dropdown */}
              <li className={`dropdown${openDropdown === 'Silver' ? ' active' : ''}`}>
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/silver') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Silver'}
                  onClick={(e) => {
                    if (window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Silver');
                    }
                  }}
                >
                  Silver <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/silver?filter=Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Rings</Link></li>
                  <li><Link to="/silver?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earrings</Link></li>
                  <li><Link to="/silver?filter=Set" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Sets</Link></li>
                  <li><Link to="/silver?filter=Bangles" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles</Link></li>
                  <li><Link to="/silver?filter=Bracelet" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bracelets</Link></li>
                  <li><Link to="/silver?filter=Pendant" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendants</Link></li>
                  <li><Link to="/silver?filter=Payal" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Payal</Link></li>
                </ul>
              </li>

              {/* Kundan Polki */}
              <li>
                <NavLink
                  to="/kundan"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                >
                  Kundan Polki
                </NavLink>
              </li>

              {/* Beads */}
              <li>
                <NavLink
                  to="/beads"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                >
                  Beads
                </NavLink>
              </li>

              {/* Gems Stone */}
              <li>
                <NavLink
                  to="/gems-stone"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                >
                  Gems Stone
                </NavLink>
              </li>

              {/* Bespoke Design */}
              <li>
                <NavLink
                  to="/bespoke"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                >
                  Bespoke Design
                </NavLink>
              </li>

              {/* About Us */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                >
                  About Us
                </NavLink>
              </li>

              {/* Contact Us */}
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
