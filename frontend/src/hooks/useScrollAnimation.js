import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation — Attaches IntersectionObserver to card elements for scroll reveal animations.
 * Replaces window.initCardAnimations() from main.js.
 *
 * @param {string|string[]} selectors - CSS selector(s) for elements to animate
 * @param {object} deps              - Dependencies that trigger re-observation (e.g., visible items count)
 *
 * Usage: useScrollAnimation('.product-card, .seller-card', [visibleItems.length]);
 */
export function useScrollAnimation(selectors, deps = []) {
  const observerRef = useRef(null);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) observerRef.current.disconnect();

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
    );

    // Small delay to allow React to finish rendering new cards
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        } else if (el.style.opacity !== '1') {
          el.style.opacity = '0';
          el.style.transform = 'translateY(15px)';
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          observerRef.current?.observe(el);
        }
      });
    }, 50);

    // Safety fallback: ensure everything is visible after 500ms
    const safetyTimer = setTimeout(() => {
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        if (el.style.opacity !== '1') {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
      observerRef.current?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
