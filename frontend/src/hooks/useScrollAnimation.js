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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Small delay to allow React to finish rendering new cards
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        // Only animate elements not yet visible
        if (el.style.opacity !== '1') {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observerRef.current?.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
