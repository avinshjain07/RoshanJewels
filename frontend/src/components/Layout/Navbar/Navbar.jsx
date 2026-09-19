import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '@assets/logos/logo.png';
import { useAuth } from '@context/AuthContext';
import { useCart } from '@context/CartContext';
import { useWishlist } from '@context/WishlistContext';

/**
 * Navbar — Two-row luxury jewellery header matching the exact brand design.
 * Row 1: Top info bar (Showroom timings, BIS Purity, Phone, Directions).
 * Row 2: Top header with Logo, central Search bar, Wishlist, Cart, User Account, and Book VIP Visit.
 * Row 3: Bottom navigation links (Home, Gold, Diamond, Silver, Kundan, Beads, Gems Stone, Bespoke, About, Contact).
 */
export default function Navbar() {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // label of open dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
                href="https://maps.google.com/?q=UG-02,+03,+Royal+Diamond+Building,+Yeshwant+Niwas+Road,+Opposite+SBI+Bank,+Sanghi+Colony,+Yeshwant+Colony,+Indore,+Madhya+Pradesh+452002"
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

            {/* Header Right Actions: Wishlist, Cart Drawer, User Auth, and Book VIP Visit */}
            <div className="header-actions">
              {/* Wishlist Link */}
              <Link to="/wishlist" className="header-icon-action" title="My Wishlist" aria-label="Wishlist">
                <i className="far fa-heart"></i>
                {wishlistCount > 0 && <span className="header-badge-count numeric-text">{wishlistCount}</span>}
              </Link>

              {/* Shopping Bag Button */}
              <button
                type="button"
                className="header-icon-action"
                onClick={openCart}
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <i className="fas fa-shopping-bag"></i>
                {itemCount > 0 && <span className="header-badge-count numeric-text">{itemCount}</span>}
              </button>

              {/* User Account / Sign In */}
              {isAuthenticated ? (
                <div className="header-user-menu-container">
                  <button
                    type="button"
                    className="header-user-btn"
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    title="My Account"
                  >
                    <span className="user-avatar-initial">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <span className="user-name-short">{user.name.split(' ')[0]}</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>

                  {userMenuOpen && (
                    <div className="header-user-dropdown">
                      <div className="user-dropdown-header">
                        <strong>{user.name}</strong>
                        <small>{user.vipTier || 'Privilege Member'}</small>
                      </div>
                      <Link to="/account" onClick={() => setUserMenuOpen(false)}>
                        <i className="fas fa-user-circle"></i> My Account & Orders
                      </Link>
                      <Link to="/wishlist" onClick={() => setUserMenuOpen(false)}>
                        <i className="fas fa-heart"></i> My Wishlist ({wishlistCount})
                      </Link>
                      <button
                        type="button"
                        className="btn-dropdown-logout"
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                      >
                        <i className="fas fa-sign-out-alt"></i> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="btn-header-signin"
                  onClick={() => openAuthModal('login')}
                  title="Sign In"
                >
                  <i className="fas fa-user-circle"></i>
                  <span>Sign In</span>
                </button>
              )}

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
              {/* Mobile Drawer Top Bar with Brand & Close Button - only rendered when mobile drawer is open */}
              {mobileOpen && (
                <li className="mobile-drawer-top">
                  <div className="mobile-drawer-brand">
                    <img src={logo} alt="Roshan Jewel" className="drawer-logo" />
                    <button
                      type="button"
                      className="btn-drawer-close"
                      onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}
                      aria-label="Close navigation menu"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </li>
              )}

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
                    if (mobileOpen || window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Gold');
                    }
                  }}
                >
                  Gold <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/gold?filter=Ladies Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Ladies Rings</Link></li>
                  <li><Link to="/gold?filter=Gents Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Gents Rings</Link></li>
                  <li><Link to="/gold?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earrings & Jhumkas</Link></li>
                  <li><Link to="/gold?filter=Necklace" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Necklace Sets</Link></li>
                  <li><Link to="/gold?filter=Bangle" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles & Kangan</Link></li>
                  <li><Link to="/gold?filter=Ladies Bracelets" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Ladies Bracelets</Link></li>
                  <li><Link to="/gold?filter=Gents Kada & Patti" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Gents Kada & Patti</Link></li>
                  <li><Link to="/gold?filter=Pendant" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendants</Link></li>
                  <li><Link to="/gold?filter=Chain" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Chains</Link></li>
                  <li><Link to="/gold?filter=Mangalsutra" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Mangalsutra</Link></li>
                  <li><Link to="/gold?filter=Bajuband" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bajuband</Link></li>
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
                    if (mobileOpen || window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Diamond');
                    }
                  }}
                >
                  Diamond <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/diamond?filter=Ladies Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Ladies Rings</Link></li>
                  <li><Link to="/diamond?filter=Gents Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Gents Rings</Link></li>
                  <li><Link to="/diamond?filter=Solitaire Tops" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Solitaire Tops & Studs</Link></li>
                  <li><Link to="/diamond?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earrings</Link></li>
                  <li><Link to="/diamond?filter=Necklace" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Necklace Sets</Link></li>
                  <li><Link to="/diamond?filter=Bangles" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles & Eternity</Link></li>
                  <li><Link to="/diamond?filter=Ladies Bracelets" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Ladies Bracelets</Link></li>
                  <li><Link to="/diamond?filter=Gents Bracelets" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Gents Bracelets & Kadas</Link></li>
                  <li><Link to="/diamond?filter=Pendant Set" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pendant Sets</Link></li>
                  <li><Link to="/diamond?filter=Mangalsutra" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Single Naka Mangalsutra</Link></li>
                  <li><Link to="/diamond?filter=Nose Pin" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Nose Pins</Link></li>
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
                    if (mobileOpen || window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Silver');
                    }
                  }}
                >
                  Silver <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/silver?filter=Payal" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Payal (Anklets)</Link></li>
                  <li><Link to="/silver?filter=Bichiya" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bichiya (Toe Rings)</Link></li>
                  <li><Link to="/silver?filter=Gents Rings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Gents Silver Rings</Link></li>
                  <li><Link to="/silver?filter=Earrings" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Earrings & Tops</Link></li>
                  <li><Link to="/silver?filter=Necklaces" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Necklaces & Sets</Link></li>
                  <li><Link to="/silver?filter=Bangles" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bangles & Kadas</Link></li>
                  <li><Link to="/silver?filter=Bracelet" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bracelets</Link></li>
                  <li><Link to="/silver?filter=Pendant" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Silver Pendants</Link></li>
                  <li><Link to="/silver?filter=Utensils & Pooja" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Utensils & Pooja Articles</Link></li>
                </ul>
              </li>

              {/* Kundan Polki Dropdown */}
              <li className={`dropdown${openDropdown === 'Kundan' ? ' active' : ''}`}>
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/kundan') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Kundan'}
                  onClick={(e) => {
                    if (mobileOpen || window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Kundan');
                    }
                  }}
                >
                  Kundan Polki <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/kundan?filter=Bridal Chokers" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Bridal Chokers</Link></li>
                  <li><Link to="/kundan?filter=Necklace Set" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Maharani Necklace Sets</Link></li>
                  <li><Link to="/kundan?filter=Kundan Jhumkas" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Kundan Jhumkas</Link></li>
                  <li><Link to="/kundan?filter=Royal Kadas" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Royal Jadau Kadas</Link></li>
                  <li><Link to="/kundan?filter=Maang Tikka & Passa" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Maang Tikka & Passa</Link></li>
                </ul>
              </li>

              {/* Coins & Bullion Dropdown */}
              <li className={`dropdown${openDropdown === 'Coins' ? ' active' : ''}`}>
                <a
                  href="#"
                  className={`dropdown-toggle${pathname.startsWith('/bullion') ? ' active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'Coins'}
                  onClick={(e) => {
                    if (mobileOpen || window.innerWidth <= 991) {
                      e.preventDefault();
                      toggleDropdown('Coins');
                    }
                  }}
                >
                  Coins <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-coins">
                  <li className="dropdown-purity-header">
                    <span className="purity-header-badge">
                      <i className="fas fa-certificate"></i> 999 Pure 24K Gold & 999 Fine Silver • Govt. Lab Assay Certified
                    </span>
                  </li>
                  <li><Link to="/bullion?filter=Gold Coins" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>24K Gold Coins (1g, 2g, 5g, 10g, 20g, 50g, 100g)</Link></li>
                  <li><Link to="/bullion?filter=Silver Coins" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>999 Silver Coins (5g, 10g, 20g, 50g, 100g)</Link></li>
                  <li><Link to="/bullion?filter=Silver Bars" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>999 Silver Bars (100g, 500g, 1kg)</Link></li>
                  <li><Link to="/bullion?filter=Gifting Articles" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Custom Corporate Logo & Gifting Coins</Link></li>
                  <li><Link to="/silver?filter=Utensils & Pooja" onClick={() => { setMobileOpen(false); document.body.classList.remove('no-scroll'); }}>Pure Silver Utensils & Pooja Articles</Link></li>
                </ul>
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

      {/* Mobile Nav Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-backdrop active"
          onClick={() => {
            setMobileOpen(false);
            document.body.classList.remove('no-scroll');
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
