import { useState, useEffect, useRef, useCallback } from 'react';

const SLIDES_DATA = [
  {
    image: '/WEBSITE PHOTO NEW/DIAMOAND NACKLESS/diamond-necklace-8.jpeg',
    alt: 'Diamond Necklace',
    title: 'Three Generations of Quiet Brilliance',
    text: 'A name born in 1965, carried forward with the quiet brilliance of three generations. What began as a humble spark has grown into a house of refined beauty.',
  },
  {
    image: '/WEBSITE PHOTO NEW/DIAMOAND NOSE PIN/diamond-nose-pin-8.jpeg',
    alt: 'Diamond Nose Pin',
    title: 'Every Piece Tells a Story',
    text: "Each creation is imagined with a designer's vision, shaped with a craftsman's devotion, and perfected with a touch of modern grace.",
  },
  {
    image: '/WEBSITE PHOTO NEW/DIAMOAND BANGLE/diamond-bangle-2.jpeg',
    alt: 'Diamond Bangle',
    title: 'Handcrafted to Perfection',
    text: 'Here, jewellery is poetry cast in gold… a whisper of heritage, a celebration of love, and a companion to life\'s finest moments.',
  },
  {
    image: '/necklace/necklace3.png',
    alt: 'Necklace',
    title: 'Where Tradition Meets Contemporary',
    text: 'We don\'t just craft jewellery… we craft stories meant to shine through generations, preserving heritage with modern elegance.',
  },
  {
    image: '/WEBSITE PHOTO NEW/DIAMOAND EARRINGS/diamond-earrings-5.jpeg',
    alt: 'Diamond Earrings',
    title: 'Masterpieces in Miniature',
    text: 'From engagement rings to traditional designs, each piece is crafted with attention to detail that can only come from generations of expertise.',
  },
];

/**
 * HeroSlider — Pixel-perfect slide banner.
 * Toggles translateX of slides wrapper, manages dots, handles 5s auto-play.
 */
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

  return (
    <section className="hero-slider" id="home">
      <div className="slider-container">
        {/* Slides Wrapper */}
        <div
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES_DATA.map((slide, idx) => (
            <div className="slider-slide" key={idx}>
              <img src={slide.image} alt={slide.alt} />
              <div className="slider-overlay"></div>
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="slider-nav prev" onClick={handlePrev}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="slider-nav next" onClick={handleNext}>
          <i className="fas fa-chevron-right"></i>
        </div>

        {/* Dots Navigation */}
        <div className="slider-dots">
          {SLIDES_DATA.map((_, idx) => (
            <span
              key={idx}
              className={`slider-dot${idx === currentIndex ? ' active' : ''}`}
              onClick={() => handleDotClick(idx)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
