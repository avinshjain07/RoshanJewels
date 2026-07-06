import { createContext, useContext, useState } from 'react';

/**
 * CartContext — Placeholder for future shopping cart feature.
 * Currently provides an empty cart state.
 * Future: add addToCart, removeFromCart, clearCart, cartTotal logic here.
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ── Future methods (implement when ecommerce is ready) ──
  // const addToCart    = (product) => { ... };
  // const removeFromCart = (id) => { ... };
  // const clearCart    = () => setCartItems([]);
  // const cartTotal    = cartItems.reduce((sum, item) => sum + item.futurePrice * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
