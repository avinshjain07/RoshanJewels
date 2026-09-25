/**
 * Page context service — maps route segments to page metadata.
 * Replaces the switch/if-else block in the original products-renderer.js.
 * Each page component calls getPageContext(routeKey) to get its display data.
 */

export const PAGE_CONTEXTS = {
  diamond: {
    mode: 'collection',
    value: 'Diamond Collection',
    title: 'Diamond Collection',
    subtitle: 'Three Generations of Quiet Brilliance in Certified Diamonds',
  },
  gold: {
    mode: 'collection',
    value: 'Gold Collection',
    title: 'Gold Collection',
    subtitle: 'Poetry Cast in 22K Hallmarked Gold Since 1965',
  },
  silver: {
    mode: 'collection',
    value: 'Silver Collection',
    title: 'Silver Collection',
    subtitle: 'Contemporary and Traditional Silver Masterpieces',
  },
  kundan: {
    mode: 'collection',
    value: 'Kundan Polki',
    title: 'Kundan & Polki Collection',
    subtitle: 'Exquisite Jadau and Chased Gold Enamel Masterpieces',
  },
  beads: {
    mode: 'collection',
    value: 'Beads Collection',
    title: 'Beads',
    subtitle: 'Vibrant Hand-strung Gemstones and Italian Charms',
  },
  bullion: {
    mode: 'collection',
    value: 'Bullion',
    title: 'Bullion & Raw Materials',
    subtitle: 'Trusted Purity in Certified Gold and Silver Investment Coins',
  },
  gifts: {
    mode: 'collection',
    value: 'Gifts',
    title: 'Gifting Collection',
    subtitle: 'Timeless Gifts of Devotion and Luxury',
  },
  rings: {
    mode: 'type',
    value: 'Rings',
    title: 'Rings Collection',
    subtitle: 'Discover our exquisite range of handcrafted rings for every occasion',
  },
  earrings: {
    mode: 'type',
    value: 'Earrings',
    title: 'Earrings Collection',
    subtitle: 'Discover elegant earrings that frame your beauty, from traditional jhumkas to contemporary studs',
  },
  necklaces: {
    mode: 'type',
    value: 'Necklaces',
    title: 'Necklaces Collection',
    subtitle: 'Traditional and contemporary necklaces that add grace and elegance to your special moments',
  },
};

/**
 * Get the page context for a given route key.
 * @param {string} routeKey - e.g. 'diamond', 'rings'
 * @returns {object} pageContext
 */
export function getPageContext(routeKey) {
  return PAGE_CONTEXTS[routeKey] || {
    mode: 'collection',
    value: routeKey,
    title: 'Jewellery Collection',
    subtitle: "Explore Roshan Jewel's Full Inventory",
  };
}
