import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@layouts/RootLayout';
import { AuthProvider } from '@context/AuthContext';
import { CartProvider } from '@context/CartContext';
import { WishlistProvider } from '@context/WishlistContext';
import { ThemeProvider } from '@context/ThemeContext';

// ── Lazy-loaded page components for code splitting ──────────────────────────
const Home         = lazy(() => import('@pages/Home/Home'));
const About        = lazy(() => import('@pages/About/About'));
const Contact      = lazy(() => import('@pages/Contact/Contact'));
const Diamond      = lazy(() => import('@pages/Diamond/Diamond'));
const Gold         = lazy(() => import('@pages/Gold/Gold'));
const Silver       = lazy(() => import('@pages/Silver/Silver'));
const Rings        = lazy(() => import('@pages/Rings/Rings'));
const Earrings     = lazy(() => import('@pages/Earrings/Earrings'));
const Necklaces    = lazy(() => import('@pages/Necklaces/Necklaces'));
const Bullion      = lazy(() => import('@pages/Bullion/Bullion'));
const Beads        = lazy(() => import('@pages/Beads/Beads'));
const Kundan       = lazy(() => import('@pages/Kundan/Kundan'));
const Gifts        = lazy(() => import('@pages/Gifts/Gifts'));
const GemsStone    = lazy(() => import('@pages/GemsStone/GemsStone'));
const Bespoke      = lazy(() => import('@pages/Bespoke/Bespoke'));
const Login        = lazy(() => import('@pages/Auth/Login'));
const Register     = lazy(() => import('@pages/Auth/Register'));
const Account      = lazy(() => import('@pages/Account/Account'));
const Wishlist     = lazy(() => import('@pages/Wishlist/Wishlist'));
const Checkout     = lazy(() => import('@pages/Checkout/Checkout'));
const OrderSuccess = lazy(() => import('@pages/Checkout/OrderSuccess'));

// ── Router configuration ────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,                      element: <Home /> },
      { path: 'about',                    element: <About /> },
      { path: 'contact',                  element: <Contact /> },
      { path: 'diamond',                  element: <Diamond /> },
      { path: 'gold',                     element: <Gold /> },
      { path: 'silver',                   element: <Silver /> },
      { path: 'rings',                    element: <Rings /> },
      { path: 'earrings',                 element: <Earrings /> },
      { path: 'necklaces',                element: <Necklaces /> },
      { path: 'bullion',                  element: <Bullion /> },
      { path: 'beads',                    element: <Beads /> },
      { path: 'kundan',                   element: <Kundan /> },
      { path: 'gifts',                    element: <Gifts /> },
      { path: 'gems-stone',               element: <GemsStone /> },
      { path: 'bespoke',                  element: <Bespoke /> },
      { path: 'login',                    element: <Login /> },
      { path: 'register',                 element: <Register /> },
      { path: 'account',                  element: <Account /> },
      { path: 'wishlist',                 element: <Wishlist /> },
      { path: 'checkout',                 element: <Checkout /> },
      { path: 'order-success/:orderId',   element: <OrderSuccess /> },
    ],
  },
]);

// ── App root with all luxury e-commerce providers ───────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider
              router={router}
              future={{ v7_startTransition: true }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
