/**
 * Product Pricing & Specification Engine for Roshan Jewels
 * Calculates realistic luxury jewellery prices, purity, gross weight, and SKU codes.
 */

// Base deterministic hash for consistent realistic pricing per product ID
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Enriches a raw product with realistic price, discount, purity, weight, and SKU.
 * @param {object} product - Raw product from data files
 * @returns {object} - Enriched product with e-commerce pricing attributes
 */
export function enrichProduct(product) {
  const hash = hashCode(product.id || product.title);
  const cat = (product.category || '').toLowerCase();
  const type = (product.type || '').toLowerCase();
  const sub = (product.subcategory || '').toLowerCase();

  let basePrice = 25000;
  let purity = '22K (916) Hallmarked';
  let grossWeight = '12.50g';
  let diamondWeight = null;
  let gemstone = null;

  if (cat.includes('diamond')) {
    purity = '18K (750) Hallmarked Gold';
    if (type.includes('necklace') || sub.includes('necklace') || sub.includes('set')) {
      basePrice = 145000 + (hash % 180000);
      grossWeight = (24 + (hash % 20) * 0.85).toFixed(2) + 'g';
      diamondWeight = (1.8 + (hash % 35) * 0.12).toFixed(2) + ' ct VVS/EF';
    } else if (type.includes('bangle') || sub.includes('bangle') || sub.includes('bracelet')) {
      basePrice = 85000 + (hash % 95000);
      grossWeight = (18 + (hash % 15) * 0.65).toFixed(2) + 'g';
      diamondWeight = (1.1 + (hash % 20) * 0.08).toFixed(2) + ' ct VVS/EF';
    } else if (type.includes('ring') || sub.includes('ring')) {
      basePrice = 38000 + (hash % 55000);
      grossWeight = (4.5 + (hash % 6) * 0.45).toFixed(2) + 'g';
      diamondWeight = (0.35 + (hash % 15) * 0.06).toFixed(2) + ' ct VVS/EF';
    } else if (type.includes('earring') || sub.includes('earring')) {
      basePrice = 45000 + (hash % 65000);
      grossWeight = (6.8 + (hash % 8) * 0.55).toFixed(2) + 'g';
      diamondWeight = (0.55 + (hash % 18) * 0.08).toFixed(2) + ' ct VVS/EF';
    } else if (type.includes('nose') || sub.includes('nose')) {
      basePrice = 9500 + (hash % 8500);
      grossWeight = (0.8 + (hash % 5) * 0.15).toFixed(2) + 'g';
      diamondWeight = '0.08 ct VVS/EF';
    } else {
      basePrice = 52000 + (hash % 70000);
      grossWeight = (8.2 + (hash % 10) * 0.5).toFixed(2) + 'g';
      diamondWeight = (0.65 + (hash % 12) * 0.09).toFixed(2) + ' ct VVS/EF';
    }
  } else if (cat.includes('gold')) {
    purity = '22K (916) HUID Hallmarked';
    if (type.includes('necklace') || sub.includes('necklace') || sub.includes('mangalsutra')) {
      basePrice = 85000 + (hash % 140000);
      grossWeight = (16 + (hash % 28) * 0.95).toFixed(2) + 'g';
    } else if (type.includes('bangle') || sub.includes('bangle') || type.includes('bracelet')) {
      basePrice = 65000 + (hash % 80000);
      grossWeight = (14 + (hash % 16) * 0.8).toFixed(2) + 'g';
    } else if (type.includes('chain') || sub.includes('chain')) {
      basePrice = 42000 + (hash % 58000);
      grossWeight = (8.5 + (hash % 14) * 0.65).toFixed(2) + 'g';
    } else if (type.includes('ring') || sub.includes('ring')) {
      basePrice = 24000 + (hash % 32000);
      grossWeight = (4.8 + (hash % 8) * 0.4).toFixed(2) + 'g';
    } else if (type.includes('earring') || sub.includes('earring')) {
      basePrice = 28000 + (hash % 38000);
      grossWeight = (5.5 + (hash % 9) * 0.45).toFixed(2) + 'g';
    } else {
      basePrice = 35000 + (hash % 45000);
      grossWeight = (7.2 + (hash % 10) * 0.5).toFixed(2) + 'g';
    }
  } else if (cat.includes('kundan')) {
    purity = '22K Gold & Royal Jadau';
    gemstone = 'Precious Uncut Polki & Meenakari';
    basePrice = 110000 + (hash % 190000);
    grossWeight = (32 + (hash % 30) * 1.1).toFixed(2) + 'g';
  } else if (cat.includes('silver')) {
    purity = '925 Sterling Silver';
    if (type.includes('payal') || sub.includes('payal') || sub.includes('anklet')) {
      basePrice = 3800 + (hash % 4500);
      grossWeight = (35 + (hash % 40) * 1.2).toFixed(2) + 'g';
    } else if (type.includes('necklace') || sub.includes('necklace') || sub.includes('set')) {
      basePrice = 6500 + (hash % 8500);
      grossWeight = (42 + (hash % 35) * 1.1).toFixed(2) + 'g';
    } else if (type.includes('bangle') || sub.includes('bangle') || sub.includes('bracelet')) {
      basePrice = 3200 + (hash % 3800);
      grossWeight = (22 + (hash % 25) * 0.9).toFixed(2) + 'g';
    } else if (type.includes('ring') || sub.includes('ring') || type.includes('earring')) {
      basePrice = 1499 + (hash % 2200);
      grossWeight = (6.5 + (hash % 8) * 0.4).toFixed(2) + 'g';
    } else {
      basePrice = 2499 + (hash % 3500);
      grossWeight = (15 + (hash % 20) * 0.7).toFixed(2) + 'g';
    }
  } else if (cat.includes('bullion')) {
    purity = sub.includes('silver') ? '999 Fine Silver' : '24K (999.0) Pure Gold';
    if (product.id.includes('100g') && sub.includes('gold')) {
      basePrice = 775000;
      grossWeight = '100.00g';
    } else if (product.id.includes('50g') && sub.includes('gold')) {
      basePrice = 388000;
      grossWeight = '50.00g';
    } else if (product.id.includes('20g') && sub.includes('gold')) {
      basePrice = 155000;
      grossWeight = '20.00g';
    } else if (product.id.includes('10g') && sub.includes('gold')) {
      basePrice = 77500;
      grossWeight = '10.00g';
    } else if (product.id.includes('5g') && sub.includes('gold')) {
      basePrice = 39000;
      grossWeight = '5.00g';
    } else if (product.id.includes('2g') && sub.includes('gold')) {
      basePrice = 15600;
      grossWeight = '2.00g';
    } else if (product.id.includes('1g') && sub.includes('gold')) {
      basePrice = 7800;
      grossWeight = '1.00g';
    } else if (product.id.includes('1kg')) {
      basePrice = 108000;
      grossWeight = '1000.00g';
    } else if (product.id.includes('500g')) {
      basePrice = 54000;
      grossWeight = '500.00g';
    } else if (product.id.includes('100g') && sub.includes('silver')) {
      basePrice = 10800;
      grossWeight = '100.00g';
    } else if (product.id.includes('50g') && sub.includes('silver')) {
      basePrice = 5400;
      grossWeight = '50.00g';
    } else if (product.id.includes('20g') && sub.includes('silver')) {
      basePrice = 2200;
      grossWeight = '20.00g';
    } else if (product.id.includes('10g') && sub.includes('silver')) {
      basePrice = 1100;
      grossWeight = '10.00g';
    } else if (product.id.includes('5g') && sub.includes('silver')) {
      basePrice = 550;
      grossWeight = '5.00g';
    } else if (sub.includes('utensil') || sub.includes('pooja')) {
      basePrice = 6500 + (hash % 18000);
      grossWeight = (45 + (hash % 80) * 1.5).toFixed(2) + 'g';
    } else {
      basePrice = 2400 + (hash % 4500);
      grossWeight = (20 + (hash % 30) * 0.8).toFixed(2) + 'g';
    }
  } else if (cat.includes('beads')) {
    purity = 'Natural Gemstone Beads & 22K Accents';
    gemstone = 'Natural Pearls, Emeralds & Spinels';
    basePrice = 8500 + (hash % 16500);
    grossWeight = (28 + (hash % 20) * 0.8).toFixed(2) + 'g';
  } else {
    // Gifts & Artefacts
    purity = '925 Silver / Gold Foil Artefact';
    basePrice = 2200 + (hash % 7800);
    grossWeight = (18 + (hash % 20) * 0.9).toFixed(2) + 'g';
  }

  // Round base price to clean luxury pricing (e.g. ₹48,500 or ₹2,499)
  const price = basePrice > 5000 ? Math.round(basePrice / 100) * 100 : Math.round(basePrice / 10) * 10 - 1;
  const discountRate = (hash % 3 === 0) ? (5 + (hash % 8)) / 100 : 0;
  const originalPrice = discountRate > 0 ? Math.round((price * (1 + discountRate)) / 100) * 100 : price;

  const sku = `RJ-${cat.slice(0, 3).toUpperCase()}-${product.id.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(-5)}`;

  return {
    ...product,
    price,
    originalPrice,
    discountPercent: discountRate > 0 ? Math.round(discountRate * 100) : 0,
    purity: product.futurePurity || purity,
    grossWeight: product.futureWeight || grossWeight,
    diamondWeight: product.futureGemstone || diamondWeight,
    gemstone: gemstone,
    sku: product.futureSKU || sku,
    inStock: true,
    rating: (4.7 + ((hash % 4) * 0.1)).toFixed(1),
    reviewCount: 8 + (hash % 42),
  };
}
