import { useState, useCallback, useEffect } from 'react';

/**
 * useModal — Manages product lightbox modal state.
 * Replaces showProductModal / hideModal / showPrevProduct / showNextProduct in products-renderer.js.
 *
 * @param {Array} filteredProducts - The currently visible product list (for prev/next navigation)
 * @returns {{ activeProduct, activeIndex, openModal, closeModal, goPrev, goNext }}
 */
export function useModal(filteredProducts = []) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const activeProduct = activeIndex >= 0 ? filteredProducts[activeIndex] : null;
  const isOpen = activeIndex >= 0;

  const openModal = useCallback(
    (productId) => {
      const idx = filteredProducts.findIndex((p) => p.id === productId);
      if (idx !== -1) {
        setActiveIndex(idx);
        document.body.style.overflow = 'hidden';
      }
    },
    [filteredProducts]
  );

  const closeModal = useCallback(() => {
    setActiveIndex(-1);
    document.body.style.overflow = '';
  }, []);

  const goPrev = useCallback(() => {
    if (filteredProducts.length <= 1) return;
    setActiveIndex((prev) =>
      (prev - 1 + filteredProducts.length) % filteredProducts.length
    );
  }, [filteredProducts.length]);

  const goNext = useCallback(() => {
    if (filteredProducts.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredProducts.length);
  }, [filteredProducts.length]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape')      closeModal();
      if (e.key === 'ArrowLeft')   goPrev();
      if (e.key === 'ArrowRight')  goNext();
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeModal, goPrev, goNext]);

  // Reset when filteredProducts list changes (filter/search update)
  useEffect(() => {
    setActiveIndex(-1);
    document.body.style.overflow = '';
  }, [filteredProducts]);

  return { activeProduct, activeIndex, isOpen, openModal, closeModal, goPrev, goNext };
}
