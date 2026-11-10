import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';

interface SlideData {
  id: string;
  badge: string;
  themeTitle: string;
  themeSubtitle: string;
  dealHeading: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  bannerBorderColor: string;
  frameBg: string;
  looks: {
    id: string;
    label: string;
    fullTitle: string;
    category: string;
    price: number;
    origPrice: number;
    discount: string;
    image: string;
    productIndex: number;
  }[];
}

const SLIDES: SlideData[] = [
  {
    id: 'autumn-essentials',
    badge: 'AUTUMN CAPSULE',
    themeTitle: 'SIGNATURE',
    themeSubtitle: 'WARDROBE',
    dealHeading: 'Autumn Essentials up to -30%',
    ctaText: 'Shop Collection',
    ctaLink: '#portfolio-grid',
    bgGradient: 'from-[#9B8EC7] via-[#a89cca] to-[#BDA6CE]',
    bannerBorderColor: '#7B6FA5',
    frameBg: '#B4D3D9',
    looks: [
      {
        id: 'look-overcoat',
        label: 'ATELIER COAT',
        fullTitle: 'Double-Breasted Wool Overcoat',
        category: 'Outerwear',
        price: 31999,
        origPrice: 43999,
        discount: '-27%',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 0
      },
      {
        id: 'look-cashmere',
        label: 'CASHMERE KNIT',
        fullTitle: 'Ribbed Cashmere Rollneck',
        category: 'Knitwear',
        price: 19999,
        origPrice: 27999,
        discount: '-28%',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 1
      },
      {
        id: 'look-trouser',
        label: 'WIDE TROUSER',
        fullTitle: 'Pleated Tropical Wool Trouser',
        category: 'Tailoring',
        price: 15999,
        origPrice: 21499,
        discount: '-25%',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 2
      },
      {
        id: 'look-suede',
        label: 'GOAT SUEDE',
        fullTitle: 'Minimalist Suede Bomber',
        category: 'Outerwear',
        price: 39999,
        origPrice: 52999,
        discount: '-24%',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 5
      }
    ]
  },
  {
    id: 'heritage-knitwear',
    badge: 'HERITAGE CRAFT',
    themeTitle: 'NATURAL',
    themeSubtitle: 'KNITWEAR',
    dealHeading: 'Pure Mongolian Cashmere & Alpaca -25%',
    ctaText: 'Explore Knits',
    ctaLink: '#portfolio-grid',
    bgGradient: 'from-[#BDA6CE] via-[#B4D3D9] to-[#9B8EC7]',
    bannerBorderColor: '#8C7BAE',
    frameBg: '#F2EAE0',
    looks: [
      {
        id: 'look-cashmere-2',
        label: 'BRIOCHE KNIT',
        fullTitle: '4-Ply Heavyweight Cashmere',
        category: 'Knitwear',
        price: 19999,
        origPrice: 27999,
        discount: '-28%',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 1
      },
      {
        id: 'look-overshirt',
        label: 'POPLIN SHIRT',
        fullTitle: 'Boxy Organic Poplin Overshirt',
        category: 'Tailoring',
        price: 11499,
        origPrice: 15499,
        discount: '-22%',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 3
      },
      {
        id: 'look-sneaker',
        label: 'COURT SNEAKER',
        fullTitle: 'Italian Calfskin Low Court Sneaker',
        category: 'Footwear',
        price: 21499,
        origPrice: 28999,
        discount: '-25%',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 4
      },
      {
        id: 'look-hoodie',
        label: 'HEAVY HOODIE',
        fullTitle: '500 GSM Structured Loopback',
        category: 'Streetwear',
        price: 10999,
        origPrice: 14499,
        discount: '-20%',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 6
      }
    ]
  },
  {
    id: 'architectural-leather',
    badge: 'LEATHER & SUEDE',
    themeTitle: 'ARTISAN',
    themeSubtitle: 'LEATHER',
    dealHeading: 'Vegetable-Tanned Leather & Suede -20%',
    ctaText: 'View Leather Goods',
    ctaLink: '#portfolio-grid',
    bgGradient: 'from-[#8A7CB5] via-[#9B8EC7] to-[#B4D3D9]',
    bannerBorderColor: '#6B5D94',
    frameBg: '#EFE7DC',
    looks: [
      {
        id: 'look-tote',
        label: 'LEATHER TOTE',
        fullTitle: 'Tuscan Leather Shopper Tote',
        category: 'Accessories',
        price: 22999,
        origPrice: 31499,
        discount: '-20%',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 7
      },
      {
        id: 'look-suede-2',
        label: 'SUEDE BOMBER',
        fullTitle: 'Supple Goat-Suede Minimalist Bomber',
        category: 'Outerwear',
        price: 39999,
        origPrice: 52999,
        discount: '-24%',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 5
      },
      {
        id: 'look-overcoat-2',
        label: 'DRAPED COAT',
        fullTitle: 'Double-Faced Wool Draped Coat',
        category: 'Outerwear',
        price: 31999,
        origPrice: 43999,
        discount: '-27%',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 0
      },
      {
        id: 'look-trouser-2',
        label: 'PLEAT TROUSER',
        fullTitle: 'Relaxed Wide-Leg Pleated Trouser',
        category: 'Tailoring',
        price: 15999,
        origPrice: 21499,
        discount: '-25%',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fm=webp&fit=crop&w=600&q=75',
        productIndex: 2
      }
    ]
  }
];

export const HighlightsCarousel: React.FC = () => {
  const { addToCart, setSelectedProduct, formatPrice } = useCart();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeSlide = SLIDES[currentSlideIndex];
  const prevSlide = SLIDES[(currentSlideIndex - 1 + SLIDES.length) % SLIDES.length];
  const nextSlide = SLIDES[(currentSlideIndex + 1) % SLIDES.length];

  const handleSlideChange = (newIndex: number, dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setCurrentSlideIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  const handlePrev = () => {
    const newIdx = (currentSlideIndex - 1 + SLIDES.length) % SLIDES.length;
    handleSlideChange(newIdx, 'prev');
  };

  const handleNext = () => {
    const newIdx = (currentSlideIndex + 1) % SLIDES.length;
    handleSlideChange(newIdx, 'next');
  };

  // Subtle auto-advance every 7 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setTimeout(() => {
      handleNext();
    }, 7000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, isHovered]);

  return (
    <section 
      id="lookbook" 
      className="bg-[#FAF6F0] text-[#2A2438] py-8 select-none relative overflow-hidden font-lato border-b border-[#E3D9CC]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container with Highlights Title & Slide Indicator Dots */}
      <div className="max-w-[1060px] mx-auto px-4 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#9B8EC7]" />
          <h2 className="text-base font-bold text-[#2A2438] tracking-tight uppercase">
            Curated Wardrobe Highlights
          </h2>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleSlideChange(idx, idx > currentSlideIndex ? 'next' : 'prev')}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentSlideIndex
                  ? 'w-6 bg-[#9B8EC7]'
                  : 'w-2 bg-[#D8CEBF] hover:bg-[#BDA6CE]'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1060px] mx-auto px-4 mb-3">
        <div className="w-full h-px bg-[#D8CEBF]"></div>
      </div>

      {/* Main Carousel Wrapper with Left & Right Peeking Cards & Smooth Centered Stage */}
      <div className="max-w-[1060px] mx-auto px-4 relative flex items-center justify-between">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="absolute left-1 z-30 w-9 h-9 rounded-full bg-[#FFFFFF] hover:bg-[#9B8EC7] hover:text-white text-[#2A2438] border border-[#BDA6CE] flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer disabled:opacity-50"
          aria-label="Previous Highlight Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-1 z-30 w-9 h-9 rounded-full bg-[#FFFFFF] hover:bg-[#9B8EC7] hover:text-white text-[#2A2438] border border-[#BDA6CE] flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer disabled:opacity-50"
          aria-label="Next Highlight Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Left Peeking Card (Showing previous capsule teaser) */}
        <div 
          onClick={handlePrev}
          className="hidden lg:flex w-36 h-[290px] bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] opacity-70 hover:opacity-100 -ml-16 overflow-hidden relative flex-shrink-0 p-3 shadow-xs flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FAF6F0]/60 pointer-events-none"></div>
          <div>
            <div className="bg-[#EBE1D5] text-[#2A2438] text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border border-[#BDA6CE]/40 inline-block">
              {prevSlide.badge}
            </div>
            <div className="text-[10px] text-[#5D5470] font-mono mt-2">
              Previous Look
            </div>
            <div className="text-xs font-bold text-[#2A2438] leading-tight line-clamp-2 mt-0.5">
              {prevSlide.dealHeading}
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-[9px] font-mono text-[#625096] font-bold group-hover:underline">
              ← View Capsule
            </span>
          </div>
        </div>

        {/* CENTER BANNER: Smoothly animated harmonized container */}
        <div 
          className={`flex-1 mx-1 sm:mx-2 relative rounded-[4px] overflow-hidden bg-gradient-to-r ${activeSlide.bgGradient} text-[#2A2438] shadow-lg min-h-[290px] flex flex-col justify-between transition-all duration-500 ease-out border border-[#BDA6CE]/40`}
        >
          {/* Subtle GOG-inspired corner pixel blocks */}
          <div className="absolute top-2.5 left-3 text-white/40 font-mono text-[9px] select-none pointer-events-none transition-opacity duration-300 hidden sm:block">
            <div className="flex gap-1 mb-1">
              <span className="w-2 h-2 bg-white/50 rounded-[1px]"></span>
              <span className="w-2 h-2 bg-white/50 rounded-[1px]"></span>
            </div>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-white/50 rounded-[1px]"></span>
              <span className="w-2 h-2 bg-white/50 rounded-[1px]"></span>
            </div>
          </div>

          <div className="absolute bottom-8 right-6 text-white/30 pointer-events-none select-none transition-opacity duration-300 hidden sm:block">
            <div className="font-mono text-xs tracking-widest leading-none">✦ ✦ ✦ ✦</div>
          </div>

          {/* Top Stage with Smooth Animated Content */}
          <div className="p-2.5 sm:p-5 relative z-10 flex-1 flex flex-col justify-center">
            
            {/* The Inset Framed Showcase */}
            <div 
              style={{ backgroundColor: activeSlide.frameBg }}
              className="p-2 sm:p-3 rounded-[3px] shadow-md border-t-4 border-[#2A2438] transition-colors duration-500"
            >
              
              {/* Header inside Frame: Category / Capsule Title + 4 Garment Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 sm:gap-2.5 items-center">
                
                {/* 1st column: Capsule Heading Callout */}
                <div 
                  className={`md:col-span-1 p-1 sm:p-2 text-[#2A2438] flex flex-row md:flex-col justify-between md:justify-center items-center text-left md:text-center transition-all duration-300 ${
                    isAnimating 
                      ? direction === 'next' ? 'opacity-0 -translate-x-3' : 'opacity-0 translate-x-3'
                      : 'opacity-100 translate-x-0'
                  }`}
                >
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#2A2438]/80 font-mono">
                      {activeSlide.themeTitle}
                    </div>
                    <div className="text-base sm:text-xl font-black tracking-tight text-[#2A2438] leading-tight uppercase font-sans">
                      {activeSlide.themeSubtitle}
                    </div>
                  </div>
                  <a
                    href={activeSlide.ctaLink}
                    className="mt-0 md:mt-2 px-3 py-1 bg-[#2A2438] text-white text-[10px] font-bold rounded-[2px] inline-flex items-center gap-1 font-mono cursor-pointer hover:bg-[#4a3d74] transition-all duration-200 shadow-xs hover:scale-105 active:scale-95"
                  >
                    explore ▸
                  </a>
                </div>

                {/* 4 Fashion Look Cards with stagger-like smooth transition (Always 4 in a row like desktop) */}
                <div className="md:col-span-4 grid grid-cols-4 gap-1.5 sm:gap-2">
                  {activeSlide.looks.map((item, itemIdx) => {
                    const productObj = PRODUCTS[item.productIndex % PRODUCTS.length];
                    return (
                      <div
                        key={`${activeSlide.id}-${item.id}`}
                        onClick={() => setSelectedProduct(productObj)}
                        style={{
                          transitionDelay: `${itemIdx * 45}ms`
                        }}
                        className={`group/card relative aspect-[3/4] bg-[#2A2438] rounded-[2px] overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.04] transition-all duration-300 border border-black/20 ${
                          isAnimating 
                            ? 'opacity-40 scale-95 translate-y-1' 
                            : 'opacity-100 scale-100 translate-y-0'
                        }`}
                      >
                        {/* Garment Image */}
                        <img
                          src={item.image}
                          alt={item.fullTitle}
                          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500 ease-out"
                          loading="lazy"
                          decoding="async"
                        />
                        
                        {/* Gradient shade at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300"></div>

                        {/* Top Discount Badge */}
                        <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 bg-[#9B8EC7] text-white text-[8px] sm:text-[9px] font-mono font-bold px-1 sm:px-1.5 py-0.5 rounded-[2px] shadow-sm">
                          {item.discount}
                        </div>

                        {/* Fashion Item Text overlay */}
                        <div className="absolute bottom-1 sm:bottom-2 inset-x-1 sm:inset-x-1.5 text-center transition-transform duration-200 group-hover/card:-translate-y-0.5">
                          <div className="text-[8px] sm:text-xs font-bold tracking-wider text-white uppercase drop-shadow font-sans leading-tight truncate">
                            {item.label}
                          </div>
                          <div className="text-[8px] sm:text-[9px] font-mono text-[#B4D3D9] mt-0.5 font-semibold">
                            {formatPrice(item.price)}
                          </div>
                        </div>

                        {/* Hover Quick Add button */}
                        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover/card:opacity-100 transition-all duration-200 translate-y-1 group-hover/card:translate-y-0 hidden sm:block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(productObj);
                            }}
                            className="p-1.5 bg-[#FFFFFF] hover:bg-[#B4D3D9] text-[#2A2438] rounded-[2px] shadow-md font-bold transition-all duration-150 hover:scale-110 active:scale-95"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Strip: Deal Heading + Shop Collection Button */}
          <div className="px-3 sm:px-5 pb-3 sm:pb-4 flex items-center justify-between relative z-10 border-t border-black/10 pt-2 sm:pt-2.5 bg-black/5">
            <div 
              className={`text-xs sm:text-xl font-black text-[#2A2438] tracking-tight truncate pr-2 transition-all duration-300 ${
                isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              {activeSlide.dealHeading}
            </div>

            <a
              href={activeSlide.ctaLink}
              className="px-3 sm:px-6 py-1.5 sm:py-2 rounded-[3px] bg-[#2A2438] hover:bg-[#4a3d74] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-1 sm:gap-1.5 flex-shrink-0"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </a>
          </div>

        </div>

        {/* Right Peeking Card (Showing next capsule teaser) */}
        <div 
          onClick={handleNext}
          className="hidden lg:flex w-36 h-[290px] bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] opacity-70 hover:opacity-100 -mr-16 overflow-hidden relative flex-shrink-0 p-3 flex-col justify-between shadow-xs cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FAF6F0]/60 pointer-events-none"></div>
          <div>
            <div className="bg-[#EBE1D5] text-[#2A2438] text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border border-[#BDA6CE]/40 inline-block">
              {nextSlide.badge}
            </div>
            <div className="text-[10px] text-[#5D5470] font-mono mt-2">
              Next Look
            </div>
            <div className="text-xs font-bold text-[#2A2438] leading-tight line-clamp-2 mt-0.5">
              {nextSlide.dealHeading}
            </div>
          </div>
          <div className="relative z-10 text-right">
            <span className="text-[9px] font-mono text-[#625096] font-bold group-hover:underline">
              View Capsule →
            </span>
          </div>
        </div>

      </div>

    </section>
  );
};
