import { createContext, useContext, useState } from 'react';

/**
 * WishlistContext — Placeholder for future wishlist feature.
 * Future: add toggleWishlist, isWishlisted, clearWishlist logic here.
 */
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // ── Future methods ──
  // const toggleWishlist = (product) => { ... };
  // const isWishlisted   = (id) => wishlistItems.some(p => p.id === id);
  // const clearWishlist  = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, setWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within <WishlistProvider>');
  return ctx;
}
