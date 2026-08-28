import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const SLIDES_DATA = [
  {
    image: '/HeroImage/bangle.png',
    alt: 'Diamond Necklace',
    eyebrow: 'HERITAGE CRAFTED',
    titleLine1: 'Three Generations',
    titleLine2: 'of Quiet Brilliance',
    text: 'A name born in 1965, carried forward with the quiet brilliance of three generations. What began as a humble spark has grown into a house of refined beauty.',
  },
  {
    image: '/HeroImage/earring.png',
    alt: 'Diamond Nose Pin',
    eyebrow: 'TIMELESS ELEGANCE',
    titleLine1: 'Every Piece',
    titleLine2: 'Tells a Story',
    text: "Each creation is imagined with a designer's vision, shaped with a craftsman's devotion, and perfected with a touch of modern grace.",
  },
  {
    image: '/HeroImage/Diamond_necklace.png',
    alt: 'Diamond Bangle',
    eyebrow: 'SIGNATURE CRAFTSMANSHIP',
    titleLine1: 'Handcrafted',
    titleLine2: 'to Perfection',
    text: 'Here, jewellery is poetry cast in gold… a whisper of heritage, a celebration of love, and a companion to life\'s finest moments.',
  },
  {
    image: '/HeroImage/Necklace.jpg',
    alt: 'Necklace',
    eyebrow: 'CONTEMPORARY HERITAGE',
    titleLine1: 'Where Tradition',
    titleLine2: 'Meets Contemporary',
    text: 'We don\'t just craft jewellery… we craft stories meant to shine through generations, preserving heritage with modern elegance.',
  },
  {
    image: '/HeroImage/ring.png',
    alt: 'Diamond Earrings',
    eyebrow: 'MASTERFUL DESIGNS',
    titleLine1: 'Masterpieces',
    titleLine2: 'in Miniature',
    text: 'From engagement rings to traditional designs, each piece is crafted with attention to detail that can only come from generations of expertise.',
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
    }, 5000);
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
    <section className="hero-slider" id="home">
      <div className="slider-container">
        <div
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES_DATA.map((s, idx) => (
            <div className="slider-slide" key={idx}>
              <img src={s.image} alt={s.alt} />
              <div className="slider-overlay"></div>
              <div className="slider-overlay-left"></div>
            </div>
          ))}
        </div>

        <div className="slide-content" key={currentIndex}>
          <div className="hero-eyebrow">
            <span className="eyebrow-line"></span>
            <span className="eyebrow-text">{slide.eyebrow}</span>
            <span className="eyebrow-line"></span>
          </div>

          <h2 className="hero-heading">
            <span className="hero-heading-line">{slide.titleLine1}</span>
            <span className="hero-heading-line hero-heading-accent">{slide.titleLine2}</span>
          </h2>

          <div className="hero-divider">
            <span className="hero-divider-line"></span>
            <span className="hero-divider-star">✦</span>
            <span className="hero-divider-line"></span>
          </div>

          <p className="hero-description">{slide.text}</p>

          <div className="hero-cta-row">
            <Link to="/gold" className="hero-cta">
              EXPLORE COLLECTION
            </Link>
            <Link to="/gold" className="hero-cta-circle" aria-label="Explore Collection">
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        <button
          className="slider-nav prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="slider-nav next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="slider-dots">
          {SLIDES_DATA.map((_, idx) => (
            <span
              key={idx}
              className={`slider-dot${idx === currentIndex ? ' active' : ''}`}
              onClick={() => handleDotClick(idx)}
              role="button"
              aria-label={`Go to slide ${idx + 1}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
