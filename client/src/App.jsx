import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ChatBot from './components/common/ChatBot';
import WhatsAppButton from './components/common/WhatsAppButton';
import CartDrawer from './components/common/CartDrawer';
import AuthModal from './components/common/AuthModal';
import PaymentModal from './components/common/PaymentModal';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import TherapyWellnessPage from './pages/TherapyWellnessPage';
import AboutUsPage from './pages/AboutUsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState(null);

  const handleOpenCheckout = (details) => {
    setCheckoutDetails(details);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-parlour-lightBg text-slate-800 dark:bg-parlour-darkBg dark:text-slate-100 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage onCheckoutTrigger={handleOpenCheckout} />} />
          <Route path="/booking" element={<AppointmentBookingPage />} />
          <Route path="/wellness" element={<TherapyWellnessPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Interactive Elements */}
      <ChatBot />
      <WhatsAppButton />
      <CartDrawer onProceedToPayment={handleOpenCheckout} />
      <AuthModal />
      <PaymentModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        details={checkoutDetails}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
