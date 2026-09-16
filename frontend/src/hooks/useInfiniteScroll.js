import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useInfiniteScroll — Progressively renders items in batches using IntersectionObserver.
 * Replaces the sentinel-based batch loading in products-renderer.js.
 *
 * @param {Array}  allItems   - The complete filtered product array
 * @param {number} batchSize  - Items to load per batch (default: 16)
 * @returns {{ visibleItems: Array, sentinelRef: Ref }}
 *
 * Usage:
 *   const { visibleItems, sentinelRef } = useInfiniteScroll(filteredProducts, 16);
 *   // Render visibleItems, place <div ref={sentinelRef} /> at the bottom
 */
export function useInfiniteScroll(allItems, batchSize = 16) {
  const [count, setCount]   = useState(batchSize);
  const sentinelRef         = useRef(null);
  const observerRef         = useRef(null);

  // Reset count when the source array changes (filter/search update)
  useEffect(() => {
    setCount(batchSize);
  }, [allItems, batchSize]);

  // Set up IntersectionObserver on sentinel
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((prev) => Math.min(prev + batchSize, allItems.length));
        }
      },
      { rootMargin: '200px' }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [allItems.length, batchSize]);

  const visibleItems = allItems.slice(0, count);

  return { visibleItems, sentinelRef };
}
