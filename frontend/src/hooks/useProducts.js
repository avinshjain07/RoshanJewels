import { useMemo } from 'react';
import { getProductsByCollection, getProductsByType, filterProducts } from '@services/product.service';

/**
 * useProducts — Returns a filtered + searched array of products for a given page context.
 * Wraps the product service so components never import data arrays directly.
 *
 * @param {object} pageContext - From collection.service.js: { mode, value, ... }
 * @param {string} filter     - Active filter button value (e.g. 'Earrings' or 'All')
 * @param {string} search     - Text search query
 * @returns {Array} Filtered product array (memoized)
 */
export function useProducts(pageContext, filter = 'All', search = '') {
  return useMemo(() => {
    if (!pageContext) return [];

    // Step 1: Get base product list from the service
    let base = [];
    if (pageContext.mode === 'collection') {
      base = getProductsByCollection(pageContext.value);
    } else if (pageContext.mode === 'type') {
      base = getProductsByType(pageContext.value);
    }

    // Step 2: Apply filter + search via service
    return filterProducts(base, {
      filter,
      search,
      mode: pageContext.mode,
    });
  }, [pageContext, filter, search]);
}
