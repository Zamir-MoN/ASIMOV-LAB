import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { 
  ShoppingBag, 
  Search, 
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Scissors
} from 'lucide-react';

interface NavbarProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToSection }) => {
  const { 
    totalItems, 
    setIsCartOpen, 
    formatPrice, 
    total,
    setSelectedProduct
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const searchResults: Product[] = searchQuery.trim() 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 select-none font-lato pt-safe">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#EBE1D5] py-1.5 px-4 border-b border-[#D8CEBF] text-[#2A2438]">
        <div className="max-w-[1060px] mx-auto w-full flex items-center justify-between text-[10px] sm:text-[11px] font-sans tracking-wide">
          <div className="flex items-center gap-2 truncate">
            <span className="w-3.5 h-3.5 rounded-full bg-[#9B8EC7] text-white flex items-center justify-center font-bold text-[8px] shadow-sm flex-shrink-0">★</span>
            <span className="truncate">COMPLIMENTARY EXPRESS SHIPPING ACROSS INDIA</span>
          </div>
          <span className="text-[#625096] font-bold text-[10px] sm:text-[11px] font-mono tracking-wider flex-shrink-0 ml-3">
            CODE: ASIMOV20 (-20%)
          </span>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER */}
      <div className="bg-[#FAF6F0] border-b border-[#E3D9CC] text-[#2A2438] h-16 shadow-sm backdrop-blur-md">
        <div className="max-w-[1060px] mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Left: Boxed Logo & Navigation */}
          <div className="flex items-center gap-8">
            
            {/* Brand Logo: Geometric Wordmark */}
            <div 
              onClick={() => {
                setSelectedProduct(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer flex items-center group py-0.5"
              title="Return to Home / Collection"
            >
              <img 
                src="/images/logo.webp" 
                alt="ASIMOV LAB" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Clothing Category Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase text-[#2A2438]/85">
              
              <div 
                className="relative cursor-pointer py-4 hover:text-[#9B8EC7] flex items-center gap-1 transition"
                onMouseEnter={() => setActiveDropdown('collection')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span onClick={() => onNavigateToSection('portfolio-grid')}>COLLECTION</span>
                <ChevronDown className="w-3 h-3 text-[#7E7494]" />
                {activeDropdown === 'collection' && (
                  <div className="absolute top-full left-0 w-48 bg-[#FFFFFF] border border-[#BDA6CE]/40 shadow-xl py-2 rounded-[3px] text-xs normal-case z-50">
                    <button onClick={() => onNavigateToSection('portfolio-grid')} className="w-full text-left px-4 py-2 hover:bg-[#F2EAE0] text-[#2A2438] hover:text-[#9B8EC7]">Outerwear & Coats</button>
                    <button onClick={() => onNavigateToSection('portfolio-grid')} className="w-full text-left px-4 py-2 hover:bg-[#F2EAE0] text-[#2A2438] hover:text-[#9B8EC7]">Knitwear & Sweaters</button>
                    <button onClick={() => onNavigateToSection('portfolio-grid')} className="w-full text-left px-4 py-2 hover:bg-[#F2EAE0] text-[#2A2438] hover:text-[#9B8EC7]">Tailored Trousers</button>
                    <button onClick={() => onNavigateToSection('portfolio-grid')} className="w-full text-left px-4 py-2 hover:bg-[#F2EAE0] text-[#2A2438] hover:text-[#9B8EC7]">Footwear & Loafers</button>
                    <button onClick={() => onNavigateToSection('portfolio-grid')} className="w-full text-left px-4 py-2 hover:bg-[#F2EAE0] text-[#9B8EC7] font-bold">Seasonal Sale %</button>
                  </div>
                )}
              </div>

              <span 
                onClick={() => onNavigateToSection('portfolio-grid')}
                className="cursor-pointer hover:text-[#9B8EC7] transition"
              >
                NEW ARRIVALS
              </span>

              <span 
                onClick={() => onNavigateToSection('lookbook')}
                className="cursor-pointer hover:text-[#9B8EC7] transition"
              >
                LOOKBOOK
              </span>
            </nav>
          </div>

          {/* Right: Cart, Wishlist, Search */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Bag / Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#2A2438] hover:text-[#9B8EC7] transition flex items-center gap-1.5"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#9B8EC7]" />
              <span className="text-xs font-mono font-bold text-[#2A2438] bg-[#E8DED1] px-1.5 py-0.2 rounded-full">{totalItems}</span>
              {totalItems > 0 && (
                <span className="hidden sm:inline text-xs font-mono text-[#625096] font-bold">
                  ({formatPrice(total)})
                </span>
              )}
            </button>

            {/* Search Icon & Popover */}
            <div ref={searchRef} className="relative">
              <button 
                onClick={() => setIsSearchFocused(!isSearchFocused)}
                className="p-2 text-[#2A2438] hover:text-[#9B8EC7] transition"
              >
                <Search className="w-4 h-4" />
              </button>

              {isSearchFocused && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#FFFFFF] border border-[#BDA6CE] shadow-2xl p-2.5 rounded-[3px] z-50">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search coats, cashmere, trousers..."
                      autoFocus
                      className="w-full bg-[#FAF6F0] border border-[#BDA6CE]/50 rounded-[2px] px-3 py-1.5 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7]"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-2 text-gray-400 hover:text-black text-xs">×</button>
                    )}
                  </div>
                  {searchQuery && (
                    <div className="mt-2 space-y-1">
                      {searchResults.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => {
                            setSelectedProduct(p);
                            setIsSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-2.5 p-2 hover:bg-[#F2EAE0] cursor-pointer rounded text-xs"
                        >
                          <img src={p.image} alt={p.name} className="w-8 h-10 object-cover rounded-[2px]" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[#2A2438] truncate font-medium">{p.name}</div>
                            <div className="text-[10px] text-[#5D5470]">{p.material}</div>
                          </div>
                          <span className="text-[#625096] font-mono font-bold">{formatPrice(p.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button (Smooth Animated) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#2A2438] hover:text-[#9B8EC7] transition rounded-lg hover:bg-[#E8DED1]/50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#2A2438]" />
              ) : (
                <Menu className="w-5 h-5 text-[#2A2438]" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OUT MENU DRAWER (Smooth Transition) */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop Scrim */}
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-[#18161D]/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer Content Panel (Slides down smoothly from top) */}
        <div 
          data-lenis-prevent
          className={`absolute top-0 inset-x-0 bg-[#FAF6F0] border-b border-[#D8CEBF] shadow-2xl transition-transform duration-300 ease-out flex flex-col max-h-[85vh] overflow-y-auto pt-safe pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Header of Drawer */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DED1]">
            <div 
              onClick={() => {
                setSelectedProduct(null);
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer"
            >
              <img 
                src="/images/logo.webp" 
                alt="ASIMOV LAB" 
                className="h-7 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#E8DED1] text-[#2A2438] transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-5 space-y-4">
            
            {/* Main Links */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  onNavigateToSection('portfolio-grid');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#EFE6D9] text-left text-sm font-bold tracking-wider uppercase text-[#2A2438] transition group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#9B8EC7]"></span>
                  COLLECTION
                </span>
                <ArrowRight className="w-4 h-4 text-[#7E7494] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Sub-categories */}
              <div className="pl-7 pr-3 py-1 space-y-2 border-l-2 border-[#9B8EC7]/20 ml-4 text-xs text-[#5D5470]">
                <button
                  onClick={() => {
                    onNavigateToSection('portfolio-grid');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1 hover:text-[#9B8EC7] transition"
                >
                  Outerwear & Overcoats
                </button>
                <button
                  onClick={() => {
                    onNavigateToSection('portfolio-grid');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1 hover:text-[#9B8EC7] transition"
                >
                  Pure Cashmere Knitwear
                </button>
                <button
                  onClick={() => {
                    onNavigateToSection('portfolio-grid');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1 hover:text-[#9B8EC7] transition"
                >
                  Pleated & Wool Trousers
                </button>
                <button
                  onClick={() => {
                    onNavigateToSection('portfolio-grid');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1 hover:text-[#9B8EC7] transition"
                >
                  Calfskin Atelier Loafers
                </button>
              </div>

              <button
                onClick={() => {
                  onNavigateToSection('portfolio-grid');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#EFE6D9] text-left text-sm font-bold tracking-wider uppercase text-[#2A2438] transition group"
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9B8EC7]" />
                  NEW ARRIVALS
                </span>
                <ArrowRight className="w-4 h-4 text-[#7E7494] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onNavigateToSection('lookbook');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#EFE6D9] text-left text-sm font-bold tracking-wider uppercase text-[#2A2438] transition group"
              >
                <span className="flex items-center gap-2.5">
                  <Scissors className="w-4 h-4 text-[#9B8EC7]" />
                  LOOKBOOK & CRAFT
                </span>
                <ArrowRight className="w-4 h-4 text-[#7E7494] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Promo Card in Drawer */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#18161D] to-[#2A2438] text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#B4D3D9] animate-pulse"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#B4D3D9] uppercase">SEASON PROMO</span>
              </div>
              <p className="text-xs text-white/90 font-medium">Use code <span className="font-mono font-bold text-[#BDA6CE]">ASIMOV20</span> for 20% off your atelier order.</p>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#2A2438] text-white flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#625096] transition shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#BDA6CE]" />
              <span>Open Shopping Bag ({totalItems})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
