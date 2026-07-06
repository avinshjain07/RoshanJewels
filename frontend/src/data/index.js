// Barrel export — all product collections
// Import individual arrays or ALL_PRODUCTS

import { diamondProducts } from './products/diamond';
import { goldProducts }    from './products/gold';
import { silverProducts }  from './products/silver';
import { kundanProducts }  from './products/kundan';
import { beadsProducts }   from './products/beads';
import { bullionProducts } from './products/bullion';
import { giftsProducts }   from './products/gifts';

export {
  diamondProducts,
  goldProducts,
  silverProducts,
  kundanProducts,
  beadsProducts,
  bullionProducts,
  giftsProducts,
};

export const ALL_PRODUCTS = [
  ...diamondProducts,
  ...goldProducts,
  ...silverProducts,
  ...kundanProducts,
  ...beadsProducts,
  ...bullionProducts,
  ...giftsProducts,
];
