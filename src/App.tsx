import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useCart } from './context/CartContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HighlightsCarousel } from './components/HighlightsCarousel';
import { BrandLogosStripe } from './components/BrandLogosStripe';
import { BentoGrid } from './components/BentoGrid';
import { ReviewsMarqueeSection } from './components/ReviewsMarqueeSection';
import { AtelierCraftSection } from './components/AtelierCraftSection';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Footer } from './components/Footer';
import { IntroLoader } from './components/IntroLoader';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ToastContainer } from './components/ToastContainer';

const MainLayout: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct,
    isCartOpen,
    isWishlistOpen,
    isCheckoutOpen
  } = useCart();
  const lenisRef = React.useRef<Lenis | null>(null);

  // Initialize Lenis luxury smooth inertia scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Freeze / Unfreeze background scrolling completely when Shopping Bag, Wishlist or Checkout is open
  useEffect(() => {
    const isModalActive = isCartOpen || isWishlistOpen || isCheckoutOpen;
    if (isModalActive) {
      lenisRef.current?.stop();
      document.body.classList.add('lenis-stopped');
      document.documentElement.classList.add('lenis-stopped');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.classList.remove('lenis-stopped');
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isCartOpen, isWishlistOpen, isCheckoutOpen]);

  const handleNavigateToSection = (sectionId: string) => {
    // If viewing a single product page, return to main collection view first
    if (selectedProduct) {
      setSelectedProduct(null);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EAE0] text-[#2A2438] selection:bg-[#9B8EC7] selection:text-white font-lato">
      {/* 1. Header & GOG Navigation Bar */}
      <Navbar onNavigateToSection={handleNavigateToSection} />

      <main className="flex-1">
        {selectedProduct ? (
          /* Dedicated Luxury Product View Page */
          <ProductDetailPage />
        ) : (
          /* Main Homepage & Curated Wardrobe Feed */
          <>
            {/* 2. Top Hero Section: Video Hero Banner */}
            <HeroBanner />

            {/* 3. Central Highlights Section (Optimized Rendering) */}
            <div className="section-optimize">
              <HighlightsCarousel />
            </div>

            {/* Brand Logos Stripe Infinite Loop (Left to Right) */}
            <div className="section-optimize">
              <BrandLogosStripe />
            </div>

            {/* 4. Curated Catalog / Portfolio Grid with Filters */}
            <div className="section-optimize">
              <BentoGrid />
            </div>

            {/* 5. Verified Client Reviews Smooth Infinite Marquee Loop */}
            <div className="section-optimize">
              <ReviewsMarqueeSection />
            </div>

            {/* 6. Asimov Atelier Craft & Fabric Covenant */}
            <div className="section-optimize">
              <AtelierCraftSection />
            </div>
          </>
        )}
      </main>

      {/* 7. Footer with dynamically matched outer background so top curves render seamlessly */}
      <Footer isDarkPreceding={!selectedProduct} />

      {/* Drawers, Modals & Toast Alerts */}
      <IntroLoader />
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}

export default App;
