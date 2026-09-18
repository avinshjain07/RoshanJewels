import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const SLIDES_DATA = [
  {
    image: '/HeroImage/earring.png',
    alt: 'Diamond Peacock Pendant & Earrings',
    eyebrow: 'HERITAGE MEETS MODERNITY | Crafted for Generations',
    headingLine1: 'Handcrafted to',
    headingAccent: 'Golden',
    headingLine2Suffix: 'Perfection',
    text: 'Here, jewellery is poetry cast in gold... a whisper of heritage, a celebration of eternal love, and a companion to life\'s finest moments.',
    ctaPrimaryText: 'Discover Diamond Solitaires',
    ctaPrimaryLink: '/diamond',
    ctaSecondaryText: 'Book In-Store Viewing',
    ctaSecondaryLink: '/contact',
    stat1Val: '1955',
    stat1Label: 'LEGACY & TRUST',
    stat2Val: '100%',
    stat2Label: 'BIS HALLMARKED',
    stat3Val: '500+',
    stat3Label: 'CRAFTED DESIGNS',
    badgeTag: 'AUTHENTICITY',
    badgeTitle: 'Triple + certified',
  },
  {
    image: '/HeroImage/bangle.png',
    alt: 'Handcrafted 22K Gold Bangles',
    eyebrow: 'TIMELESS ELEGANCE | Pure 22K Hallmarked Gold',
    headingLine1: 'Three Generations of',
    headingAccent: 'Quiet',
    headingLine2Suffix: 'Brilliance',
    text: 'A name born in 1965, carried forward with the quiet brilliance of three generations. What began as a humble spark has grown into a house of refined beauty.',
    ctaPrimaryText: 'Explore Gold Collection',
    ctaPrimaryLink: '/gold',
    ctaSecondaryText: 'Book In-Store Viewing',
    ctaSecondaryLink: '/contact',
    stat1Val: '1965',
    stat1Label: 'LEGACY & TRUST',
    stat2Val: '22K',
    stat2Label: 'HUID HALLMARKED',
    stat3Val: '1000+',
    stat3Label: 'ANTIQUE CREATIONS',
    badgeTag: 'PURITY GUARANTEED',
    badgeTitle: '100% Hallmarked 916',
  },
  {
    image: '/HeroImage/Diamond_necklace.png',
    alt: 'Signature Diamond Solitaire Necklace',
    eyebrow: 'SIGNATURE CRAFTSMANSHIP | Certified Solitaires',
    headingLine1: 'Brilliance Cast in',
    headingAccent: 'Every',
    headingLine2Suffix: 'Facet',
    text: 'Each creation is imagined with a designer\'s vision, shaped with a craftsman\'s devotion, and perfected with a touch of modern grace.',
    ctaPrimaryText: 'Explore Diamond Sets',
    ctaPrimaryLink: '/diamond',
    ctaSecondaryText: 'Book In-Store Viewing',
    ctaSecondaryLink: '/contact',
    stat1Val: 'GIA',
    stat1Label: '& IGI CERTIFIED',
    stat2Val: '100%',
    stat2Label: 'CONFLICT FREE',
    stat3Val: '3D',
    stat3Label: 'CAD BESPOKE',
    badgeTag: 'AUTHENTICITY',
    badgeTitle: 'Triple + certified',
  },
  {
    image: '/HeroImage/Necklace.jpg',
    alt: 'Royal Kundan Jadau Necklace Set',
    eyebrow: 'CONTEMPORARY HERITAGE | Royal Kundan & Polki',
    headingLine1: 'Where Tradition Meets',
    headingAccent: 'Modern',
    headingLine2Suffix: 'Grace',
    text: 'We don\'t just craft jewellery... we craft stories meant to shine through generations, preserving heritage with modern elegance.',
    ctaPrimaryText: 'Explore Kundan Polki',
    ctaPrimaryLink: '/kundan',
    ctaSecondaryText: 'Book In-Store Viewing',
    ctaSecondaryLink: '/contact',
    stat1Val: '1965',
    stat1Label: 'HERITAGE KARIGARI',
    stat2Val: 'JADAU',
    stat2Label: 'MEENAKARI WORK',
    stat3Val: '100%',
    stat3Label: 'BESPOKE BRIDAL',
    badgeTag: 'ROYAL HERITAGE',
    badgeTitle: 'Master Karigari',
  },
  {
    image: '/HeroImage/ring.png',
    alt: 'Certified Solitaire Engagement Rings',
    eyebrow: 'MASTERFUL DESIGNS | Engagement Solitaires',
    headingLine1: 'Masterpieces in',
    headingAccent: 'Miniature',
    headingLine2Suffix: 'Artistry',
    text: 'From engagement rings to bespoke heirlooms, each piece is crafted with attention to detail that can only come from generations of expertise.',
    ctaPrimaryText: 'Explore Solitaire Rings',
    ctaPrimaryLink: '/rings',
    ctaSecondaryText: 'Book In-Store Viewing',
    ctaSecondaryLink: '/contact',
    stat1Val: 'VVS/EF',
    stat1Label: 'DIAMOND CLARITY',
    stat2Val: '100%',
    stat2Label: 'CERTIFIED SOLITAIRES',
    stat3Val: '500+',
    stat3Label: 'RING DESIGNS',
    badgeTag: 'AUTHENTICITY',
    badgeTitle: 'Triple + certified',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = SLIDES_DATA.length;
  const timerRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
  }, [totalSlides]);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    startAutoPlay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    startAutoPlay();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    startAutoPlay();
  };

  const slide = SLIDES_DATA[currentIndex];

  return (
    <section className="hero-circular-section" id="home">
      <div className="container hero-circular-container">
        {/* Left Column: Editorial Typography, CTAs, Stats & Dots */}
        <div className="hero-content-col" key={currentIndex}>
          {/* Eyebrow */}
          <div className="hero-eyebrow-badge">
            <span>{slide.eyebrow}</span>
          </div>

          {/* Heading with Serif & Italic Rose Accent — Structured in exact 2 lines */}
          <h1 className="hero-main-title">
            <span className="hero-title-line hero-title-line-1">{slide.headingLine1}</span>
            <span className="hero-title-line hero-title-line-2">
              <span className="hero-accent-italic">{slide.headingAccent}</span>{' '}
              {slide.headingLine2Suffix}
            </span>
          </h1>

          {/* Poetic Description */}
          <p className="hero-lead-text">{slide.text}</p>

          {/* Dual Action CTAs */}
          <div className="hero-buttons-group">
            <Link to={slide.ctaPrimaryLink} className="hero-btn-primary">
              <span>{slide.ctaPrimaryText}</span>
              <i className="fas fa-arrow-right"></i>
            </Link>

            <Link to={slide.ctaSecondaryLink} className="hero-btn-secondary">
              <i className="fas fa-book-open"></i>
              <span>{slide.ctaSecondaryText}</span>
            </Link>
          </div>

          {/* Trust Stats Counter Row */}
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <strong className="stat-number numeric-text">{slide.stat1Val}</strong>
              <span className="stat-label">{slide.stat1Label}</span>
            </div>

            <div className="hero-stat-divider"></div>

            <div className="hero-stat-item">
              <strong className="stat-number numeric-text">{slide.stat2Val}</strong>
              <span className="stat-label">{slide.stat2Label}</span>
            </div>

            <div className="hero-stat-divider"></div>

            <div className="hero-stat-item">
              <strong className="stat-number numeric-text">{slide.stat3Val}</strong>
              <span className="stat-label">{slide.stat3Label}</span>
            </div>
          </div>

          {/* Slider Pagination Dots (Bottom Left) */}
          <div className="hero-pagination-dots">
            {SLIDES_DATA.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-dot${idx === currentIndex ? ' active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Right Column: Circular Display with Decorative Sparkles & Authenticity Badge */}
        <div className="hero-visual-col">
          <div className="hero-circular-frame-wrapper">
            {/* Floating Decorative Geometry & Sparkles */}
            <div className="hero-decorations" aria-hidden="true">
              <span className="decor-sparkle sparkle-top-right">✦</span>
              <span className="decor-sparkle sparkle-left">✦</span>
              <span className="decor-sparkle sparkle-bottom">✦</span>
              <div className="decor-diamond-outline diamond-top-left">
                <i className="far fa-gem"></i>
              </div>
              <div className="decor-diamond-outline diamond-bottom-right">
                <i className="far fa-gem"></i>
              </div>
              <div className="decor-dotted-orbit"></div>
            </div>

            {/* Circular Image Frame */}
            <div className="hero-circle-mask">
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-circle-img"
                key={slide.image}
              />
            </div>

            {/* Floating Authenticity Badge */}
            <div className="hero-auth-badge">
              <div className="auth-icon-circle">
                <i className="fas fa-check"></i>
              </div>
              <div className="auth-text-box">
                <span className="auth-tag">{slide.badgeTag}</span>
                <strong className="auth-status">{slide.badgeTitle}</strong>
              </div>
            </div>
          </div>

          {/* Slider Arrow Navigation Controls (Bottom Right) */}
          <div className="hero-nav-controls">
            <button
              type="button"
              className="hero-nav-btn prev-btn"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              type="button"
              className="hero-nav-btn next-btn"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
