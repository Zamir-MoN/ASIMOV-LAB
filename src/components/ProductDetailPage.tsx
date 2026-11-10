import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Ruler, 
  ChevronRight,
  Share2,
  Clock
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    formatPrice, 
    showToast 
  } = useCart();

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'provenance' | 'tailoring' | 'care'>('provenance');

  // Scroll to top upon product selection and initialize defaults
  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveImage(selectedProduct.image);
      setSelectedSize(selectedProduct.sizes[0] || 'M');
      setSelectedColor(selectedProduct.colors[0] || '');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const gallery = selectedProduct.gallery && selectedProduct.gallery.length > 0 
    ? [selectedProduct.image, ...selectedProduct.gallery.filter(img => img !== selectedProduct.image)]
    : [selectedProduct.image];

  const relatedProducts: Product[] = PRODUCTS
    .filter(p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.material === selectedProduct.material))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(selectedProduct, 1);
    showToast(
      'Added to Shopping Bag', 
      `${selectedProduct.name} (${selectedSize || 'Standard'} / ${selectedColor || 'Signature'}) has been added.`, 
      'success'
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EAE0] text-[#2A2438] font-lato select-none pt-2 sm:pt-4 pb-[calc(3rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        
        {/* Top Breadcrumb & Return Action */}
        <div className="flex items-center justify-between py-2 sm:py-2.5 mb-3 text-xs font-mono border-b border-[#D8CEBF]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProduct(null)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#D8CEBF] text-[#2A2438] hover:bg-[#E8DED1] transition shadow-2xs font-bold text-[11px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Wardrobe</span>
            </button>
            <span className="text-[#8E83A6] hidden sm:inline">/</span>
            <span className="uppercase text-[#5D5470] text-[11px] hidden sm:inline">{selectedProduct.category}</span>
            <span className="text-[#8E83A6] hidden sm:inline">/</span>
            <span className="text-[#2A2438] font-semibold truncate max-w-[220px] text-[11px] hidden sm:inline">
              {selectedProduct.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#D8CEBF] rounded-full text-[9px] font-mono text-[#625096] font-bold">
              {selectedProduct.code}
            </span>
            <button
              onClick={handleShare}
              className="p-1 rounded-lg bg-[#FFFFFF] border border-[#D8CEBF] text-[#5D5470] hover:text-[#2A2438] transition shadow-2xs"
              title="Share Design"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main 2-Column Product Studio Layout - Balanced & Compact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-start">
          
          {/* LEFT: Compact Studio Gallery (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            
            {/* Main Stage Image - Max height constrained for standard laptop/mobile screens */}
            <div className="relative aspect-[4/5] max-h-[500px] w-full mx-auto rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#D8CEBF] shadow-md group">
              <img
                src={activeImage || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                fetchPriority="high"
                decoding="async"
              />

              {/* Discount Tag */}
              {selectedProduct.discountPercent && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 bg-[#6C5B8B] text-white text-[10px] font-mono font-bold rounded-md shadow-sm">
                    -{selectedProduct.discountPercent}% ATELIER DROP
                  </span>
                </div>
              )}

              {/* Natural Fiber Certified Tag */}
              <div className="absolute bottom-3 left-3 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#2A2438] text-[9px] font-mono font-bold uppercase tracking-wider shadow-sm border border-black/5">
                  <Sparkles className="w-3 h-3 text-[#6C5B8B]" />
                  <span>100% Traceable Natural Fiber</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 shadow-2xs ${
                      activeImage === img ? 'border-[#6C5B8B] ring-2 ring-[#6C5B8B]/30' : 'border-[#D8CEBF] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Studio view ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Covenant Banner under gallery - Compact */}
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8DED1] shadow-2xs flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FAF6F0] border border-[#D8CEBF] flex items-center justify-center text-[#6C5B8B] flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-[#2A2438] block text-[11px]">Certificate of Fiber Origin</span>
                  <span className="text-[#5D5470] font-sans text-[10px]">Certified GOTS organic yarns & ethical shearing.</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#EFE6D9] text-[#625096] font-mono text-[9px] font-bold flex-shrink-0">
                VERIFIED MILL
              </span>
            </div>

          </div>

          {/* RIGHT: Product Intelligence & Purchasing Console (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Header info */}
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-normal text-[#2A2438] tracking-tight leading-snug">
                {selectedProduct.name}
              </h1>

              <p className="mt-1 text-xs text-[#5D5470] leading-relaxed">
                {selectedProduct.tagline}
              </p>
            </div>

            {/* Price Box - Compact */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E8DED1] shadow-2xs flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-[#5D5470] font-mono uppercase block mb-0.5">Price (Taxes Incl.)</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-xl sm:text-2xl font-black text-[#2A2438] font-mono tracking-tight">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-xs text-[#9E93A6] line-through font-mono">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-2.5 h-2.5" /> In Stock ({selectedProduct.stockLeft || 5} units)
                </span>
                <span className="block text-[9px] font-mono text-[#5D5470] mt-0.5">Ready for Express Dispatch</span>
              </div>
            </div>

            {/* Color Palette Selector */}
            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#2A2438] font-bold text-[11px] uppercase tracking-wider">Shade Palette:</span>
                  <span className="text-[#625096] text-[11px] font-semibold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                        selectedColor === c
                          ? 'border-[#2A2438] bg-[#2A2438] text-white shadow-xs font-bold'
                          : 'border-[#D8CEBF] bg-[#FFFFFF] text-[#2A2438] hover:border-[#6C5B8B]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizing Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#2A2438] font-bold text-[11px] uppercase tracking-wider">Atelier Size:</span>
                <button 
                  onClick={() => setActiveTab('tailoring')}
                  className="inline-flex items-center gap-1 text-[#625096] text-[10px] hover:underline"
                >
                  <Ruler className="w-3 h-3" /> Size & Fit Guide
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 sm:py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                      selectedSize === s
                        ? 'border-[#2A2438] bg-[#2A2438] text-white shadow-xs'
                        : 'border-[#D8CEBF] bg-[#FFFFFF] text-[#2A2438] hover:border-[#6C5B8B]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 sm:py-3.5 px-5 rounded-xl bg-[#2A2438] hover:bg-[#3E3452] active:scale-[0.99] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#BDA6CE]" />
                <span>Add to Shopping Bag • {formatPrice(selectedProduct.price)}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#5D5470]">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FFFFFF] border border-[#E8DED1]">
                  <Truck className="w-3 h-3 text-[#6C5B8B] flex-shrink-0" />
                  <span className="truncate">Complimentary Express</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FFFFFF] border border-[#E8DED1]">
                  <RotateCcw className="w-3 h-3 text-[#6C5B8B] flex-shrink-0" />
                  <span className="truncate">30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Detailed Tabs: Provenance, Tailoring, Care - Compact */}
            <div className="pt-2 border-t border-[#D8CEBF]">
              <div className="flex border-b border-[#D8CEBF] text-[11px] font-mono uppercase font-bold">
                <button
                  onClick={() => setActiveTab('provenance')}
                  className={`pb-1.5 mr-5 transition-all ${
                    activeTab === 'provenance'
                      ? 'border-b-2 border-[#2A2438] text-[#2A2438]'
                      : 'text-[#8E83A6] hover:text-[#2A2438]'
                  }`}
                >
                  Fiber & Provenance
                </button>
                <button
                  onClick={() => setActiveTab('tailoring')}
                  className={`pb-1.5 mr-5 transition-all ${
                    activeTab === 'tailoring'
                      ? 'border-b-2 border-[#2A2438] text-[#2A2438]'
                      : 'text-[#8E83A6] hover:text-[#2A2438]'
                  }`}
                >
                  Tailoring & Specs
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1.5 transition-all ${
                    activeTab === 'care'
                      ? 'border-b-2 border-[#2A2438] text-[#2A2438]'
                      : 'text-[#8E83A6] hover:text-[#2A2438]'
                  }`}
                >
                  Care
                </button>
              </div>

              <div className="pt-2.5 text-xs text-[#5D5470] leading-relaxed">
                {activeTab === 'provenance' && (
                  <div className="space-y-2">
                    <p className="text-[11px] leading-relaxed">{selectedProduct.description}</p>
                    <div className="p-2.5 bg-[#FFFFFF] rounded-lg border border-[#E8DED1] space-y-1 font-mono text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-[#8E83A6]">Primary Material:</span>
                        <span className="text-[#2A2438] font-bold">{selectedProduct.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8E83A6]">Weaving Location:</span>
                        <span className="text-[#2A2438]">Biella, Italy & Porto, Portugal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8E83A6]">Organic Certification:</span>
                        <span className="text-[#625096] font-bold">GOTS 100% Traceable</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tailoring' && (
                  <div className="space-y-1.5">
                    {selectedProduct.specs ? (
                      <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                        {selectedProduct.specs.map((sp, idx) => (
                          <div key={idx} className="p-2 bg-[#FFFFFF] rounded-lg border border-[#E8DED1]">
                            <span className="text-[#8E83A6] block text-[9px]">{sp.name}</span>
                            <span className="text-[#2A2438] font-bold mt-0.5 block truncate">{sp.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                        {selectedProduct.features.map((f, idx) => (
                          <li key={idx}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="p-2.5 bg-[#FFFFFF] rounded-lg border border-[#E8DED1] space-y-1.5 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#2A2438] font-bold">
                      <Clock className="w-3 h-3 text-[#6C5B8B]" />
                      <span>Care Recommendations</span>
                    </div>
                    <p className="text-[#5D5470] font-sans text-[11px] leading-relaxed">
                      Steam gently to reshape between wears. Store on wide cedar hangers to maintain shoulder geometry. Dry clean only with eco-friendly solvents once per season.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* RELATED DESIGNS SECTION - Compact */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#D8CEBF]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-serif text-[#2A2438]">
                  Complete The Wardrobe
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#625096] hover:underline"
              >
                <span>View Full Collection</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
