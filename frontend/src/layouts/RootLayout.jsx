import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@components/Layout/Navbar/Navbar';
import Footer from '@components/Layout/Footer/Footer';
import WhatsAppFloat from '@components/Common/WhatsAppFloat/WhatsAppFloat';
import Loader from '@components/Common/Loader/Loader';
import CartDrawer from '@components/Cart/CartDrawer';
import AuthModal from '@components/Auth/AuthModal';

/**
 * RootLayout — Wraps all pages with the shared Navbar, Footer,
 * WhatsApp Concierge, global CartDrawer, and AuthModal.
 */
export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      {/* Top Info Bar + Navbar */}
      <Navbar />

      {/* Page Content with lazy loading suspense */}
      <main key={pathname}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Sitewide Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* Global Slide-out Shopping Cart Drawer */}
      <CartDrawer />

      {/* Global Authentication Modal */}
      <AuthModal />
    </>
  );
}
