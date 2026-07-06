import { useState, useEffect, useRef, useCallback } from 'react';
import a1 from '@assets/images/slider/a1.jpg';
import a2 from '@assets/images/slider/a2.avif';
import a3 from '@assets/images/slider/a3.jpg';
import a4 from '@assets/images/slider/a4.webp';
import a5 from '@assets/images/slider/a5.webp';

const SLIDES_DATA = [
  {
    image: a1,
    alt: 'Necklace',
    title: 'Three Generations of Quiet Brilliance',
    text: 'A name born in 1965, carried forward with the quiet brilliance of three generations. What began as a humble spark has grown into a house of refined beauty.',
  },
  {
    image: a2,
    alt: 'Necklace - Gold',
    title: 'Every Piece Tells a Story',
    text: "Each creation is imagined with a designer's vision, shaped with a craftsman's devotion, and perfected with a touch of modern grace.",
  },
  {
    image: a3,
    alt: 'Gold Bangles Set',
    title: 'Handcrafted to Perfection',
    text: 'Here, jewellery is poetry cast in gold… a whisper of heritage, a celebration of love, and a companion to life\'s finest moments.',
  },
  {
    image: a4,
    alt: 'Rings',
    title: 'Where Tradition Meets Contemporary',
    text: 'We don\'t just craft jewellery… we craft stories meant to shine through generations, preserving heritage with modern elegance.',
  },
  {
    image: a5,
    alt: 'Pendant',
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
