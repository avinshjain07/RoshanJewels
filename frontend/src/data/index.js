// Barrel export — all product collections enriched with pricing & specs
import { diamondProducts as rawDiamond } from './products/diamond';
import { goldProducts as rawGold } from './products/gold';
import { silverProducts as rawSilver } from './products/silver';
import { kundanProducts as rawKundan } from './products/kundan';
import { beadsProducts as rawBeads } from './products/beads';
import { bullionProducts as rawBullion } from './products/bullion';
import { giftsProducts as rawGifts } from './products/gifts';
import { enrichProduct } from './pricing';

export const diamondProducts = rawDiamond.map(enrichProduct);
export const goldProducts = rawGold.map(enrichProduct);
export const silverProducts = rawSilver.map(enrichProduct);
export const kundanProducts = rawKundan.map(enrichProduct);
export const beadsProducts = rawBeads.map(enrichProduct);
export const bullionProducts = rawBullion.map(enrichProduct);
export const giftsProducts = rawGifts.map(enrichProduct);

export const ALL_PRODUCTS = [
  ...diamondProducts,
  ...goldProducts,
  ...silverProducts,
  ...kundanProducts,
  ...beadsProducts,
  ...bullionProducts,
  ...giftsProducts,
];
