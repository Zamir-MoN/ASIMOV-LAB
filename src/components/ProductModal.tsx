import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  Check, 
  ShieldCheck,
  Ruler,
  Truck
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    formatPrice, 
    isInWishlist, 
    toggleWishlist,
    cart
  } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');

  // Lock background scroll when product quickview modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const currentSize = selectedSize || selectedProduct.sizes[0] || 'M';
  const currentColor = selectedColor || selectedProduct.colors[0] || '';
  const inCart = cart.find(i => i.product.id === selectedProduct.id);
  const isFavorited = isInWishlist(selectedProduct.id);
  const gallery = selectedProduct.gallery && selectedProduct.gallery.length > 0 
    ? selectedProduct.gallery 
    : [selectedProduct.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto font-lato">
      <div 
        className="fixed inset-0" 
        onClick={() => setSelectedProduct(null)} 
      />

      <div className="relative w-full max-w-3xl bg-[#FAF6F0] border border-[#D8CEBF] rounded-[4px] shadow-2xl overflow-hidden z-10 text-[#2A2438] my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#FFFFFF] border-b border-[#E8DED1]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5D5470]">
            <span className="text-[#625096] font-bold">{selectedProduct.code}</span>
            <span>•</span>
            <span className="uppercase text-[#2A2438]/70">{selectedProduct.category} COLLECTION</span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 text-gray-400 hover:text-[#2A2438] rounded-gog hover:bg-[#F2EAE0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Gallery & Images */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] rounded-[3px] overflow-hidden border border-[#D8CEBF] bg-[#FFFFFF]">
                <img
                  src={gallery[activeImageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover filter saturate-105"
                />
                {selectedProduct.discountPercent && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#9B8EC7] text-white font-mono font-bold text-xs rounded shadow-xs">
                    -{selectedProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="flex items-center gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-16 h-20 rounded overflow-hidden border transition ${
                        activeImageIndex === i ? 'border-[#9B8EC7] ring-1 ring-[#9B8EC7]' : 'border-[#D8CEBF] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-3 rounded-[3px] bg-[#FFFFFF] border border-[#D8CEBF] space-y-1.5 text-xs font-mono text-[#2A2438]/80">
                <div className="flex items-center gap-2 text-[#625096]">
                  <Truck className="w-4 h-4 text-[#9B8EC7] flex-shrink-0" />
                  <span>Complimentary Carbon-Neutral Express Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-[#5D5470]">
                  <ShieldCheck className="w-4 h-4 text-[#9B8EC7] flex-shrink-0" />
                  <span>30-Day Doorstep Returns & Exchanges</span>
                </div>
              </div>
            </div>

            {/* Right: Info, Size Selector, Colors, Add to Bag */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1 text-[#625096] text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-[#9B8EC7] text-[#9B8EC7]" />
                    <span>{selectedProduct.rating.toFixed(2)}</span>
                  </div>
                  <span className="text-xs text-[#5D5470]">
                    ({selectedProduct.reviewsCount} customer reviews)
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#2A2438] leading-tight font-lato">
                  {selectedProduct.name}
                </h2>

                <p className="text-xs text-[#5D5470] font-mono mt-1 mb-3">
                  {selectedProduct.material}
                </p>

                {/* Price block */}
                <div className="flex items-baseline gap-3 p-3 rounded-[3px] bg-[#FFFFFF] border border-[#D8CEBF] mb-4">
                  <span className="text-2xl font-black font-mono text-[#2A2438]">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm font-mono text-gray-400 line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                  {selectedProduct.discountPercent && (
                    <span className="ml-auto text-xs font-bold text-[#625096] font-mono">
                      SAVE {formatPrice(selectedProduct.originalPrice! - selectedProduct.price)}
                    </span>
                  )}
                </div>

                {/* Color Selector */}
                {selectedProduct.colors.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#5D5470] mb-2">
                      <span className="font-bold text-[#2A2438]">Color:</span>
                      <span>{currentColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 text-xs rounded border transition ${
                            currentColor === color
                              ? 'bg-[#2A2438] text-white border-[#2A2438] font-bold'
                              : 'bg-white text-[#2A2438] border-[#D8CEBF] hover:border-[#9B8EC7]'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#5D5470] mb-2">
                    <span className="font-bold text-[#2A2438]">Select Size:</span>
                    <button className="text-[#625096] underline flex items-center gap-1">
                      <Ruler className="w-3 h-3" /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-12 h-9 text-xs rounded border font-mono transition flex items-center justify-center ${
                          currentSize === sz
                            ? 'bg-[#9B8EC7] text-white border-[#9B8EC7] font-bold shadow-xs'
                            : 'bg-white text-[#2A2438] border-[#D8CEBF] hover:border-[#9B8EC7]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bullet Features */}
                <div className="space-y-1 mb-4">
                  {selectedProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#5D5470]">
                      <Check className="w-3.5 h-3.5 text-[#9B8EC7] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#E8DED1]">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 py-3 px-4 bg-[#9B8EC7] hover:bg-[#8575b6] text-white rounded-[3px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{inCart ? `In Bag (${inCart.quantity}) • Add Another` : `Add to Bag • Size ${currentSize}`}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3 rounded-[3px] border transition ${
                    isFavorited
                      ? 'bg-[#9B8EC7] text-white border-[#9B8EC7]'
                      : 'bg-[#FFFFFF] border-[#D8CEBF] text-[#2A2438] hover:text-[#9B8EC7]'
                  }`}
                  title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>

          </div>

          {/* Deep Tabs */}
          <div className="border-t border-[#E8DED1] pt-4">
            <div className="flex items-center gap-4 border-b border-[#E8DED1] pb-2 mb-3 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1 transition ${activeTab === 'details' ? 'text-[#2A2438] border-b-2 border-[#9B8EC7] font-bold' : 'text-[#5D5470] hover:text-[#2A2438]'}`}
              >
                Design & Silhouette
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-1 transition ${activeTab === 'specs' ? 'text-[#2A2438] border-b-2 border-[#9B8EC7] font-bold' : 'text-[#5D5470] hover:text-[#2A2438]'}`}
              >
                Fit & Dimensions
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-1 transition ${activeTab === 'care' ? 'text-[#2A2438] border-b-2 border-[#9B8EC7] font-bold' : 'text-[#5D5470] hover:text-[#2A2438]'}`}
              >
                Garment Care
              </button>
            </div>

            {activeTab === 'details' && (
              <p className="text-xs text-[#5D5470] leading-relaxed">
                {selectedProduct.description}
              </p>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {selectedProduct.specs.map((sp, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#FFFFFF] border border-[#D8CEBF] flex justify-between">
                    <span className="text-[#5D5470]">{sp.name}:</span>
                    <span className="text-[#2A2438] font-bold">{sp.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'care' && (
              <div className="p-3 bg-[#FFFFFF] border border-[#BDA6CE] rounded text-xs space-y-2">
                <div className="text-[#625096] font-bold">Recommended Garment Care:</div>
                <p className="text-[#5D5470] text-xs">
                  Spot clean or professionally dry clean to preserve fabric fiber integrity. Store on shaped wooden hangers with breathable canvas dust covers.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
