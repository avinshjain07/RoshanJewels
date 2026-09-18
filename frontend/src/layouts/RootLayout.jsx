import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@components/Layout/Navbar/Navbar';
import Footer from '@components/Layout/Footer/Footer';
import WhatsAppFloat from '@components/Common/WhatsAppFloat/WhatsAppFloat';
import Loader from '@components/Common/Loader/Loader';

/**
 * RootLayout — Wraps all pages with the shared Navbar, Footer, and WhatsApp button.
 * The page-specific content renders inside <Outlet />.
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
    </>
  );
}
