import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Layers,
  Crown,
  Flame,
  Star
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    formatPrice, 
    setSelectedProduct,
    showToast
  } = useCart();

  // Derive badge config from product details or tag
  const getPillBadge = () => {
    if (product.category === 'outerwear') {
      return { label: 'COLLECTION DROP', icon: Layers };
    }
    if (product.category === 'knitwear') {
      return { label: 'LUXE FAVORITE', icon: Crown };
    }
    if (product.category === 'tailoring') {
      return { label: 'POPULAR', icon: Flame };
    }
    return { label: 'ESSENTIAL', icon: Star };
  };

  const pill = getPillBadge();
  const PillIcon = pill.icon;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast('Added to Bag', `${product.name} has been added to your shopping bag.`, 'success');
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col h-full justify-between bg-[#FFFFFF] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-[#E8DED1]"
    >
      {/* 1. Top Image Section with rounded inner container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EAE0] m-2 rounded-xl flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          decoding="async"
        />

        {/* Top-Left Discount Pill (Lavender/Periwinkle rounded pill) */}
        {product.discountPercent && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#6C5B8B] text-white text-[10px] sm:text-[11px] font-mono font-bold rounded-lg shadow-sm tracking-wide">
              -{product.discountPercent}%
            </span>
          </div>
        )}

        {/* Bottom Floating Pill Badge overlaying image */}
        <div className="absolute bottom-2.5 left-2.5 z-10 max-w-[calc(100%-1.25rem)]">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#2A2438] text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider shadow-sm border border-black/5 truncate">
            <PillIcon className="w-3 h-3 text-[#6C5B8B] flex-shrink-0" />
            <span className="truncate">{pill.label}</span>
          </div>
        </div>
      </div>

      {/* 2. Card Content Body - Flex column stretched to guarantee identical row alignment across cards */}
      <div className="p-3 sm:p-3.5 pt-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Garment Title - fixed 2-line height so titles never push rows out of alignment */}
          <h3 className="text-xs sm:text-[13px] font-bold text-[#2A2438] group-hover:text-[#6C5B8B] transition-colors line-clamp-1 h-5 font-lato">
            {product.name}
          </h3>

          {/* Subtitle / Fabric info - fixed 1-line height */}
          <p className="text-[10px] sm:text-[11px] text-[#5D5470] mt-0.5 truncate h-4 font-lato">
            {product.material}
          </p>

          {/* Available Sizes List row - fixed 1-line height & consistent baseline */}
          <div className="flex items-center gap-1.5 mt-2 h-4 text-[10px] text-[#5D5470] font-mono">
            <div className="flex items-center gap-1 text-[#2A2438]/80 font-semibold truncate">
              {product.sizes.slice(0, 4).map((s, idx) => (
                <span key={idx} className="whitespace-nowrap">{s}</span>
              ))}
            </div>
            <span className="text-[#8E83A6] flex-shrink-0">•</span>
            <span className="text-[#5D5470] font-sans text-[10px] sm:text-[11px] whitespace-nowrap flex-shrink-0">
              {product.sizes.length} sizes
            </span>
          </div>
        </div>

        {/* 3. Bottom Price Row + Shopping Bag Action Button - Anchored uniformly */}
        <div className="pt-2 sm:pt-3 mt-2 border-t border-[#F2EAE0] flex items-center justify-between">
          <div className="flex items-baseline gap-1 sm:gap-2">
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-[#9E93A6] line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-black text-[#2A2438] font-mono tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Rounded Shopping Bag Button */}
          <button
            onClick={handleQuickAdd}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#4A3B69] hover:bg-[#382C52] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 active:scale-90 flex-shrink-0"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
