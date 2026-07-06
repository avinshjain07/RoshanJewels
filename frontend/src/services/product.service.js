import { ALL_PRODUCTS } from '@data';

/**
 * Get all products belonging to a specific collection.
 * @param {string} collection - e.g. 'Diamond Collection'
 */
export function getProductsByCollection(collection) {
  return ALL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === collection.toLowerCase()
  );
}

/**
 * Get all products of a specific jewellery type.
 * @param {string} type - e.g. 'Earrings', 'Rings', 'Necklaces'
 */
export function getProductsByType(type) {
  return ALL_PRODUCTS.filter(
    (p) => p.type.toLowerCase() === type.toLowerCase()
  );
}

/**
 * Apply filter + search to an existing product array.
 * @param {Array}  products - Pre-filtered base array
 * @param {object} options
 * @param {string} options.filter - Subcategory/type filter ('All' skips filtering)
 * @param {string} options.search - Free-text search query
 * @param {string} options.mode   - 'collection' or 'type' (determines which field filter targets)
 */
export function filterProducts(products, { filter = 'All', search = '', mode = 'collection' }) {
  let result = products;

  // Apply type/subcategory filter
  if (filter && filter !== 'All') {
    if (mode === 'collection') {
      // On collection pages, filter buttons target product type
      result = result.filter(
        (p) => p.type.toLowerCase() === filter.toLowerCase()
      );
    } else {
      // On type pages (Rings, Earrings, Necklaces), filter buttons target collection
      result = result.filter(
        (p) => p.category.toLowerCase() === filter.toLowerCase()
      );
    }
  }

  // Apply text search (matches title, description, subcategory, category)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }

  return result;
}

/**
 * Get a single product by its id.
 * @param {string} id
 */
export function getProductById(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) || null;
}

/**
 * Get a single product by its slug.
 * @param {string} slug
 */
export function getProductBySlug(slug) {
  return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
}

/**
 * Get featured products across all collections.
 */
export function getFeaturedProducts() {
  return ALL_PRODUCTS.filter((p) => p.featured);
}

/**
 * Get best seller products across all collections.
 */
export function getBestSellers() {
  return ALL_PRODUCTS.filter((p) => p.bestSeller);
}
