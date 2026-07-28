import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@layouts/RootLayout';
import Loader from '@components/Common/Loader/Loader';
import { CartProvider } from '@context/CartContext';
import { WishlistProvider } from '@context/WishlistContext';
import { ThemeProvider } from '@context/ThemeContext';

// ── Lazy-loaded page components for code splitting ──────────────────────────
const Home      = lazy(() => import('@pages/Home/Home'));
const About     = lazy(() => import('@pages/About/About'));
const Contact   = lazy(() => import('@pages/Contact/Contact'));
const Diamond   = lazy(() => import('@pages/Diamond/Diamond'));
const Gold      = lazy(() => import('@pages/Gold/Gold'));
const Silver    = lazy(() => import('@pages/Silver/Silver'));
const Rings     = lazy(() => import('@pages/Rings/Rings'));
const Earrings  = lazy(() => import('@pages/Earrings/Earrings'));
const Necklaces = lazy(() => import('@pages/Necklaces/Necklaces'));
const Bullion   = lazy(() => import('@pages/Bullion/Bullion'));
const Beads     = lazy(() => import('@pages/Beads/Beads'));
const Kundan    = lazy(() => import('@pages/Kundan/Kundan'));
const Gifts     = lazy(() => import('@pages/Gifts/Gifts'));
const GemsStone = lazy(() => import('@pages/GemsStone/GemsStone'));

// ── Router configuration ────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,           element: <Home /> },
      { path: 'about',         element: <About /> },
      { path: 'contact',       element: <Contact /> },
      { path: 'diamond',       element: <Diamond /> },
      { path: 'gold',          element: <Gold /> },
      { path: 'silver',        element: <Silver /> },
      { path: 'rings',         element: <Rings /> },
      { path: 'earrings',      element: <Earrings /> },
      { path: 'necklaces',     element: <Necklaces /> },
      { path: 'bullion',       element: <Bullion /> },
      { path: 'beads',         element: <Beads /> },
      { path: 'kundan',        element: <Kundan /> },
      { path: 'gifts',         element: <Gifts /> },
      { path: 'gems-stone',    element: <GemsStone /> },
    ],
  },
]);

// ── App root with all providers ─────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
