// Filter button options per collection/type page
// Matches only categories and collections that have inventory

// Collection pages show product-type filters
export const COLLECTION_FILTERS = {
  diamond: ['All', 'Earrings', 'Rings', 'Bracelets', 'Bangles', 'Necklace', 'Nose Pin', 'Pendant Set'],
  gold:    ['All', 'Earrings', 'Rings', 'Necklace', 'Mangalsutra', 'Bangle', 'Pendant', 'Chain', 'Bajuband'],
  silver:  ['All', 'Rings', 'Earrings', 'Necklaces', 'Bangles', 'Bracelet', 'Pendant', 'Payal'],
  kundan:  ['All', 'Necklace', 'Pendant Set'],
  beads:   ['All', 'Beads Mala'],
  bullion: ['All', 'Coins'],
  gifts:   ['All', 'Gifts'],
};

// Type pages (Rings, Earrings, Necklaces) show collection filters with available products
export const TYPE_FILTERS = {
  rings:     ['All', 'Diamond Collection', 'Gold Collection', 'Silver Collection'],
  earrings:  ['All', 'Diamond Collection', 'Gold Collection', 'Silver Collection'],
  necklaces: ['All', 'Diamond Collection', 'Gold Collection', 'Silver Collection', 'Kundan Collection'],
};
