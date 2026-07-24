import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '@assets/logos/logo.png';

/**
 * Navbar — Pixel-perfect port of the HTML navbar.
 * Preserves: top info bar, logo, mobile hamburger, dropdowns, search.
 * Mobile behavior: accordion dropdowns via useState (replaces main.js classList toggling).
 * Desktop behavior: CSS hover dropdowns (unchanged from style.css).
 * Header scroll shadow via scroll event (replaces main.js scroll listener).
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [openDropdown, setOpenDropdown]        = useState(null); // label of open dropdown
  const [headerShadow, setHeaderShadow]        = useState(false);
  const [searchQuery, setSearchQuery]          = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    document.body.classList.remove('no-scroll');
  }, [pathname]);

  // Header scroll shadow — mirrors main.js scroll listener
  useEffect(() => {
    const handleScroll = () => setHeaderShadow(window.scrollY > 50);
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
      {/* Top Info Bar */}
      <div className="top-info">
        <div className="container top-info-container">
          <div>
            <i className="fas fa-clock"></i> Open Today: 11:30 AM - 8:30 PM
          </div>
          <div>
            <i className="fas fa-phone"></i> Call Now:{' '}
            <a href="tel:08224998809">082249 98809</a>
          </div>
          <div>
            <i className="fas fa-map-marker-alt"></i>{' '}
            <a
              href="https://maps.google.com/?q=UG+2,3+Royal+Diamond+Building+Yeshwant+Niwas+Road+Indore"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        style={{
          boxShadow: headerShadow
            ? '0 5px 20px rgba(61,37,6,0.5)'
            : '0 4px 20px rgba(61,37,6,0.4)',
        }}
      >
        <div className="container header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logo} alt="Roshan Jewel" className="logo-img" />
          </Link>

          {/* Mobile Menu Toggle */}
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

          {/* Nav */}
          <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <ul
              className={`nav-links${mobileOpen ? ' active' : ''}`}
              id="nav-links"
            >
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

              {/* Diamond Dropdown */}
              <li
                className={`dropdown${openDropdown === 'Diamond' ? ' active' : ''}`}
              >
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/diamond') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Diamond'}
                  onClick={(e) => {
                    if (window.innerWidth <= 767) {
                      e.preventDefault();
                      toggleDropdown('Diamond');
                    }
                  }}
                >
                  Diamond <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/diamond?filter=Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Ring</Link></li>
                  <li><Link to="/diamond?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earring</Link></li>
                  <li><Link to="/diamond?filter=Necklace" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Set</Link></li>
                  <li><Link to="/diamond?filter=Bangles" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles</Link></li>
                  <li><Link to="/diamond?filter=Nose Pin" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Nose Pin</Link></li>
                  <li><Link to="/diamond?filter=Bracelets" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bracelet</Link></li>
                  <li><Link to="/diamond?filter=Pendant Set" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendant Set</Link></li>
                  <li><Link to="/diamond?filter=Mangalsutra" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Mangalsutra</Link></li>
                </ul>
              </li>

              {/* Gold Dropdown */}
              <li
                className={`dropdown${openDropdown === 'Gold' ? ' active' : ''}`}
              >
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/gold') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Gold'}
                  onClick={(e) => {
                    if (window.innerWidth <= 767) {
                      e.preventDefault();
                      toggleDropdown('Gold');
                    }
                  }}
                >
                  Gold <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/gold?filter=Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Ring</Link></li>
                  <li><Link to="/gold?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earring</Link></li>
                  <li><Link to="/gold?filter=Necklace" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Necklace Set</Link></li>
                  <li><Link to="/gold?filter=Bangle" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles</Link></li>
                  <li><Link to="/gold?filter=Bracelets" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bracelet</Link></li>
                  <li><Link to="/gold?filter=Pendant" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendant</Link></li>
                  <li><Link to="/gold?filter=Chain" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Chain</Link></li>
                  <li><Link to="/gold?filter=Mangalsutra" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Mangalsutra</Link></li>
                </ul>
              </li>

              {/* Silver Dropdown */}
              <li
                className={`dropdown${openDropdown === 'Silver' ? ' active' : ''}`}
              >
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/silver') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Silver'}
                  onClick={(e) => {
                    if (window.innerWidth <= 767) {
                      e.preventDefault();
                      toggleDropdown('Silver');
                    }
                  }}
                >
                  Silver <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/silver?filter=Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Ring</Link></li>
                  <li><Link to="/silver?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earring</Link></li>
                  <li><Link to="/silver?filter=Set" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Set</Link></li>
                  <li><Link to="/silver?filter=Bangles" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles</Link></li>
                  <li><Link to="/silver?filter=Bracelet" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bracelet</Link></li>
                  <li><Link to="/silver?filter=Pendant" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendant</Link></li>
                  <li><Link to="/silver?filter=Payal" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Payal</Link></li>
                </ul>
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

            {/* Search Bar */}
            <div className="nav-search-container">
              <i className="fas fa-search"></i>
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                aria-label="Search jewellery"
              />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
