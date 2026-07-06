// Filter button options per collection/type page
// Mirrors the filter logic in the original products-renderer.js

// Collection pages show product-type filters
export const COLLECTION_FILTERS = {
  diamond: ['All', 'Earrings', 'Rings', 'Bracelets', 'Bangles', 'Necklace', 'Nose Pin', 'Pendant Set'],
  gold:    ['All', 'Earrings', 'Rings', 'Necklace', 'Mangalsutra', 'Bangle', 'Pendant', 'Chain', 'Bajuband'],
  silver:  ['All', 'Rings', 'Earrings', 'Necklaces', 'Bangles', 'Anklets', 'Gifts'],
  kundan:  ['All', 'Necklace', 'Earrings', 'Bangles', 'Rings', 'Pendant Set'],
  beads:   ['All', 'Beads Mala'],
  bullion: ['All', 'Coins'],
  gifts:   ['All', 'Gifts'],
};

// Type pages (Rings, Earrings, Necklaces) show collection filters
export const TYPE_FILTERS = [
  'All',
  'Diamond Collection',
  'Gold Collection',
  'Silver Collection',
  'Kundan Collection',
  'Beads Collection',
  'Bullion',
  'Gifts',
];
