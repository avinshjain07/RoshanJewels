import { ALL_PRODUCTS } from '@data';

/**
 * Get all products belonging to a specific collection.
 * @param {string} collection - e.g. 'Diamond Collection'
 */
export function getProductsByCollection(collection) {
  const col = (collection || '').toLowerCase();
  return ALL_PRODUCTS.filter((p) => {
    const cat = (p.category || '').toLowerCase();
    return cat === col || (col.includes('kundan') && cat.includes('kundan'));
  });
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
    const normalizedFilter = filter.toLowerCase().trim();

    if (mode === 'collection') {
      // On collection pages, filter buttons target product type or subcategory
      result = result.filter((p) => {
        const pType = (p.type || '').toLowerCase().trim();
        const pSub = (p.subcategory || '').toLowerCase().trim();
        const pTitle = (p.title || '').toLowerCase().trim();

        // Exact match on type or subcategory
        if (pType === normalizedFilter || pSub === normalizedFilter) return true;

        // Plural / singular matches
        if (pType + 's' === normalizedFilter || pSub + 's' === normalizedFilter) return true;
        if (normalizedFilter + 's' === pType || normalizedFilter + 's' === pSub) return true;

        // Specialized subcategory & gender mappings
        if (normalizedFilter === 'ladies rings') {
          return (pSub.includes('ladies') || pType.includes('ladies')) && (pSub.includes('ring') || pType.includes('ring'));
        }
        if (normalizedFilter === 'gents rings') {
          return (pSub.includes('gents') || pType.includes('gents')) && (pSub.includes('ring') || pType.includes('ring'));
        }
        if (normalizedFilter === 'ladies bracelets') {
          return (pSub.includes('ladies') || pType.includes('ladies')) && (pSub.includes('brac') || pType.includes('brac'));
        }
        if (normalizedFilter === 'gents bracelets') {
          return (pSub.includes('gents') || pType.includes('gents')) && (pSub.includes('brac') || pType.includes('brac'));
        }
        if (normalizedFilter === 'solitaire tops') {
          return pSub.includes('solitaire') || pType.includes('solitaire') || pTitle.includes('solitaire') || pTitle.includes('tops');
        }
        if (normalizedFilter === 'earrings') {
          return pType.includes('earring') || pSub.includes('earring') || pTitle.includes('jhumka') || pTitle.includes('chandbali') || pTitle.includes('stud') || pTitle.includes('tops');
        }
        if (normalizedFilter === 'gents kada & patti') {
          return pSub.includes('kada') || pType.includes('kada') || pSub.includes('patti') || pType.includes('patti') || pTitle.includes('kada') || pTitle.includes('patti');
        }
        if (normalizedFilter === 'utensils & pooja' || normalizedFilter === 'pooja articles') {
          return pSub.includes('pooja') || pSub.includes('utensil') || pType.includes('pooja') || pType.includes('utensil') || pTitle.includes('pooja') || pTitle.includes('kalash') || pTitle.includes('thali') || pTitle.includes('diya') || pTitle.includes('ghanti');
        }
        if (normalizedFilter === 'bichiya') {
          return pSub.includes('bichiya') || pType.includes('bichiya') || pTitle.includes('bichiya');
        }
        if (normalizedFilter === 'payal') {
          return pSub.includes('payal') || pType.includes('payal') || pType === 'anklets' || pTitle.includes('payal');
        }
        if (normalizedFilter === 'gold coins') {
          return pSub.includes('gold coin') || (p.category.toLowerCase().includes('bullion') && (pTitle.includes('gold coin') || pTitle.includes('24k')));
        }
        if (normalizedFilter === 'silver coins') {
          return pSub.includes('silver coin') || (p.category.toLowerCase().includes('bullion') && (pTitle.includes('silver coin') || pTitle.includes('999 silver')));
        }
        if (normalizedFilter === 'silver bars') {
          return pSub.includes('silver bar') || pTitle.includes('bar');
        }
        if (normalizedFilter === 'gifting' || normalizedFilter === 'gifting articles') {
          return pSub.includes('gift') || pTitle.includes('gift') || pTitle.includes('corporate') || pTitle.includes('logo');
        }
        if (normalizedFilter === 'bridal chokers') {
          return pSub.includes('choker') || pTitle.includes('choker') || pTitle.includes('bridal');
        }
        if (normalizedFilter === 'necklace set') {
          return pSub.includes('set') || pSub.includes('necklace') || pTitle.includes('set') || pTitle.includes('haar');
        }
        if (normalizedFilter === 'kundan jhumkas') {
          return pSub.includes('jhumka') || pTitle.includes('jhumka') || pTitle.includes('earring') || pType.includes('earring');
        }
        if (normalizedFilter === 'royal kadas') {
          return pSub.includes('kada') || pTitle.includes('kada') || pTitle.includes('bangle');
        }
        if (normalizedFilter === 'maang tikka & passa') {
          return pSub.includes('tikka') || pSub.includes('passa') || pTitle.includes('tikka') || pTitle.includes('passa');
        }
        if (normalizedFilter === 'mangalsutra') {
          return pSub.includes('mangalsutra') || pType.includes('mangalsutra') || pTitle.includes('mangalsutra');
        }
        if (normalizedFilter === 'pendant set') {
          return pSub.includes('pendant set') || (pType.includes('pendant') && pTitle.includes('set'));
        }

        // Subcategory containment
        if (pSub.includes(normalizedFilter) || normalizedFilter.includes(pSub)) return true;

        // Synonyms / Navbar mappings
        if (normalizedFilter === 'anklets' && pType === 'payal') return true;
        if (normalizedFilter === 'bracelet' && (pType === 'bracelets' || pType === 'bracelet')) return true;
        if (normalizedFilter === 'bracelets' && (pType === 'bracelet' || pType === 'bracelets')) return true;
        if (normalizedFilter === 'pendant' && (pType === 'pendants' || pType === 'pendant')) return true;
        if (normalizedFilter === 'pendants' && (pType === 'pendant' || pType === 'pendants')) return true;
        if (normalizedFilter === 'necklace' && (pType === 'necklaces' || pType === 'necklace')) return true;
        if (normalizedFilter === 'necklaces' && (pType === 'necklace' || pType === 'necklaces')) return true;
        if (normalizedFilter === 'bangle' && (pType === 'bangles' || pType === 'bangle')) return true;
        if (normalizedFilter === 'bangles' && (pType === 'bangle' || pType === 'bangles')) return true;
        if (normalizedFilter === 'kada' && (pType === 'bangles' || pType === 'kada')) return true;
        if (normalizedFilter === 'silver product' && (pType === 'gifts' || pType === 'silver product')) return true;

        return false;
      });
    } else {
      // On type pages (Rings, Earrings, Necklaces), filter buttons target collection OR sub-type
      result = result.filter((p) => {
        const pCat = p.category.toLowerCase();
        const pSub = (p.subcategory || '').toLowerCase();
        const pType = (p.type || '').toLowerCase();
        const pTitle = (p.title || '').toLowerCase();

        if (pCat === normalizedFilter) return true;
        if (normalizedFilter === 'ladies rings' && (pSub.includes('ladies') || pType.includes('ladies'))) return true;
        if (normalizedFilter === 'gents rings' && (pSub.includes('gents') || pType.includes('gents'))) return true;
        if (normalizedFilter === 'solitaire tops' && (pSub.includes('solitaire') || pTitle.includes('solitaire') || pTitle.includes('tops'))) return true;
        if (normalizedFilter === 'jhumkas' && (pSub.includes('jhumka') || pTitle.includes('jhumka'))) return true;
        return false;
      });
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
