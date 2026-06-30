const fs = require('fs');
const path = require('path');

// Read and evaluate products-data.js
const dataPath = path.join(__dirname, '../js/products-data.js');
const fileContent = fs.readFileSync(dataPath, 'utf8');

// Create a context to eval it safely
let PRODUCTS_DATA = [];
try {
  // Strip export code and eval
  const code = fileContent
    .replace(/const PRODUCTS_DATA =/, 'PRODUCTS_DATA =')
    .replace(/if \(typeof module !== "undefined"[\s\S]*/, '');
  eval(code);
} catch (e) {
  console.error("Failed to parse existing products data:", e);
  process.exit(1);
}

// Keep Silver, Kundan, Bullion, Gifts
const preserved = PRODUCTS_DATA.filter(p => {
  const col = p.collection.toLowerCase();
  return col.includes('silver') || col.includes('kundan') || col.includes('bullion') || col.includes('gifts');
});

console.log(`Preserved ${preserved.length} existing products.`);

const photosDir = path.join(__dirname, '../public/WEBSITE PHOTO NEW');
const newProducts = [];

const categories = [
  // Diamond
  { folder: 'DIAMOAND EARRINGS', collection: 'Diamond Collection', type: 'Earrings', subcategory: 'Diamond Earrings', prefix: 'dia-ear', title: 'Elegant Diamond Earrings', desc: 'Elegant handcrafted diamond earrings that add a touch of sparkle to any outfit.', tooltip: 'Dazzling diamond earrings set in 18K white gold, featuring brilliant round-cut diamonds with exceptional clarity and sparkle.' },
  { folder: 'DIAMOAND GENTS BRACLATE', collection: 'Diamond Collection', type: 'Bracelets', subcategory: 'Diamond Bracelets', prefix: 'dia-gentsbrac', title: 'Luxury Diamond Gents Bracelet', desc: 'A bold and sophisticated diamond bracelet designed for the modern gentleman.', tooltip: 'Premium gents bracelet in 18K yellow gold, studded with brilliant round-cut diamonds in a robust geometric pattern.' },
  { folder: 'DIAMOAND GENTS RING', collection: 'Diamond Collection', type: 'Rings', subcategory: 'Diamond Rings', prefix: 'dia-gentsring', title: 'Classic Diamond Gents Ring', desc: 'A classic and solid diamond ring crafted for men, combining strength and elegance.', tooltip: 'Heavyweight gents ring in 18K gold, featuring a central cluster of brilliant-cut diamonds with a polished and matte dual finish.' },
  { folder: 'DIAMOAND LEDIES BRACLATE', collection: 'Diamond Collection', type: 'Bracelets', subcategory: 'Diamond Bracelets', prefix: 'dia-ladiesbrac', title: 'Charming Diamond Ladies Bracelet', desc: 'An elegant and delicate diamond bracelet that wraps your wrist in brilliant luxury.', tooltip: 'Graceful ladies tennis-style bracelet crafted in 18K white gold with a seamless row of carefully matched round brilliant-cut diamonds.' },
  { folder: 'DIAMOAND LEDIES RING', collection: 'Diamond Collection', type: 'Rings', subcategory: 'Diamond Rings', prefix: 'dia-ladiesring', title: 'Graceful Diamond Ladies Ring', desc: 'A breathtaking diamond ring for ladies, perfect for engagements and special celebrations.', tooltip: 'Exquisite ladies ring in 18K gold, showcasing a stunning brilliant-cut center diamond surrounded by a micro-paved diamond halo.' },
  { folder: 'DIAMOAND NACKLESS', collection: 'Diamond Collection', type: 'Necklace', subcategory: 'Diamond Necklace', prefix: 'dia-necklace', title: 'Royal Diamond Necklace', desc: 'A magnificent diamond necklace set, designed to be the centerpiece of your collection.', tooltip: 'A royal statement necklace crafted in 18K white gold, featuring cascading floral clusters of certified brilliant-cut diamonds.' },
  { folder: 'DIAMOAND NOSE PIN', collection: 'Diamond Collection', type: 'Nose Pin', subcategory: 'Diamond Nose Pin', prefix: 'dia-nosepin', title: 'Dainty Diamond Nose Pin', desc: 'A dainty and sparkling diamond nose pin set in 18K yellow gold.', tooltip: 'Classic single-stone nose pin featuring a premium sparkling diamond. Designed for comfort and everyday luxury.' },
  { folder: 'DIAMOAND PENDENT SET', collection: 'Diamond Collection', type: 'Pendant Set', subcategory: 'Diamond Pendant Set', prefix: 'dia-pendset', title: 'Brilliant Diamond Pendant Set', desc: 'A coordinated diamond pendant and earring set, offering matching elegance.', tooltip: 'Elegant pendant set in 18K gold consisting of a stylized diamond pendant and a matching pair of brilliant stud earrings.' },
  { folder: 'DIAMOAND BANGLE', collection: 'Diamond Collection', type: 'Bangles', subcategory: 'Diamond Bangles', prefix: 'dia-bangle', title: 'Stunning Diamond Bangle', desc: 'Stunning diamond-studded bangles showcasing exquisite traditional craftsmanship.', tooltip: 'Breathtaking pair of openable diamond kadas/bangles crafted in 18K gold, studded with rows of premium brilliant diamonds.' },

  // Gold
  { folder: 'GOLD BAJUBHANDH', collection: 'Gold Collection', type: 'Bajuband', subcategory: 'Gold Bajuband', prefix: 'gld-bajuband', title: 'Traditional Gold Bajuband', desc: 'A traditional gold armlet (Bajuband) featuring intricate antique carvings.', tooltip: 'Masterfully crafted armlet in 22K hallmarked gold with temple-style nakshi work and hanging gold bead accents.' },
  { folder: 'GOLD BANGLE', collection: 'Gold Collection', type: 'Bangle', subcategory: 'Gold Bangle', prefix: 'gld-bangle', title: 'Classic Gold Bangle', desc: 'Classic gold bangles with delicate filigree and granular carvings.', tooltip: 'Elegant bangles in 22K hallmarked gold, featuring a blend of frosted and high-polish finishes for timeless beauty.' },
  { folder: 'GOLD EARRING', collection: 'Gold Collection', type: 'Earrings', subcategory: 'Gold Earring', prefix: 'gld-ear', title: 'Exquisite Gold Earrings', desc: 'Intricately designed traditional gold earrings, perfect for festive wear.', tooltip: 'Stunning Jhumki-style earrings crafted in 22K gold, featuring delicate gold filigree and polished drop accents.' },
  { folder: 'GOLD GENTS RING', collection: 'Gold Collection', type: 'Rings', subcategory: 'Gold Ring', prefix: 'gld-gentsring', title: 'Premium Gold Gents Ring', desc: 'A solid and premium signet-style gold ring for gentlemen.', tooltip: 'Broad gents ring in 22K gold, featuring a textured geometric pattern and polished edges for a strong, masculine look.' },
  { folder: 'GOLD LEDIES RING', collection: 'Gold Collection', type: 'Rings', subcategory: 'Gold Ring', prefix: 'gld-ladiesring', title: 'Charming Gold Ladies Ring', desc: 'A beautiful and delicate gold ring for women, decorated with traditional motifs.', tooltip: 'Charming ladies ring crafted in 22K gold, showcasing intricate floral filigree and a polished mirror finish.' },
  { folder: 'GOLD MANGALSUTRA', collection: 'Gold Collection', type: 'Mangalsutra', subcategory: 'Gold Mangalsutra', prefix: 'gld-mangalsutra', title: 'Sacred Gold Mangalsutra', desc: 'A sacred gold mangalsutra combining traditional black beads with a modern gold pendant.', tooltip: 'A beautiful symbol of union. Features double-strand black beads chain connected to a handcrafted 22K gold pendant.' },
  { folder: 'GOLD NEACKLESS', collection: 'Gold Collection', type: 'Necklace', subcategory: 'Gold Necklace', prefix: 'gld-necklace', title: 'Majestic Gold Necklace', desc: 'A grand and majestic gold necklace, showcasing heritage Indian craftsmanship.', tooltip: 'Royal Choker-style necklace set in 22K hallmarked gold, decorated with intricate antique Nakshi carvings and gold bead drops.' },
  { folder: 'GOLD PENDENT', collection: 'Gold Collection', type: 'Pendant', subcategory: 'Gold Pendant', prefix: 'gld-pendant', title: 'Elegant Gold Pendant', desc: 'An elegant gold pendant, suitable for pairing with simple gold chains.', tooltip: 'Lightweight and delicate pendant in 22K gold, featuring a classic tear-drop shape filled with fine gold wirework.' },
  { folder: 'CHAIN', collection: 'Gold Collection', type: 'Chain', subcategory: 'Gold Chain', prefix: 'gld-chain', title: 'Classic Gold Chain', desc: 'A strong and classic gold chain, crafted for daily durability.', tooltip: 'Timeless 18-inch curb link chain in 22K gold, machine-linked for superior strength and a smooth feel.' },

  // Beads
  { folder: 'BEADS MALA', collection: 'Beads Collection', type: 'Beads Mala', subcategory: 'Beads Mala', prefix: 'bds-mala', title: 'Natural Beads Mala', desc: 'A stunning multi-row string of natural gemstone beads.', tooltip: 'Beautiful hand-strung mala featuring natural polished beads, finished with an adjustable thread/dori back.' }
];

categories.forEach(cat => {
  const dirPath = path.join(photosDir, cat.folder);
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'))
    // Sort numerically based on design index
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    });

  files.forEach((file, idx) => {
    const designNum = idx + 1;
    newProducts.push({
      id: `${cat.prefix}-${designNum}`,
      name: `${cat.title} - Design ${designNum}`,
      collection: cat.collection,
      type: cat.type,
      subcategory: cat.subcategory,
      description: cat.desc,
      tooltip: cat.tooltip,
      image: `public/WEBSITE PHOTO NEW/${cat.folder}/${file}`,
      badge: designNum === 1 ? "NEW" : (designNum === 2 ? "BEST SELLER" : undefined)
    });
  });
});

// Combine all products
const allProducts = [...newProducts, ...preserved];

// Write back to js/products-data.js
const newContent = `/**
 * Roshan Jewel Centralized Product Database
 * Contains all categories and subcategories from the STOCK CATEGORIES Excel file.
 */

const PRODUCTS_DATA = ${JSON.stringify(allProducts, null, 2)};

// Helper to get products by collection
function getProductsByCollection(collectionName) {
  return PRODUCTS_DATA.filter(p => p.collection.toLowerCase() === collectionName.toLowerCase());
}

// Helper to get products by product type filter
function getProductsByType(typeName) {
  return PRODUCTS_DATA.filter(p => p.type.toLowerCase() === typeName.toLowerCase());
}

// Export module for browser usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS_DATA, getProductsByCollection, getProductsByType };
}
`;

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log(`Successfully generated ${allProducts.length} total products in products-data.js!`);
