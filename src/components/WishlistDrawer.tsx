import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    setSelectedProduct
  } = useCart();

  // Lock background scroll when wishlist drawer is open
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-lato">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div data-lenis-prevent className="w-screen max-w-md bg-[#FAF6F0] border-l border-[#D8CEBF] shadow-2xl flex flex-col text-[#2A2438] pt-safe pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#FFFFFF] border-b border-[#E8DED1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#9B8EC7] fill-[#9B8EC7]" />
              <h3 className="font-bold text-base tracking-wide font-lato text-[#2A2438]">Saved Wardrobe</h3>
              <span className="text-xs font-mono text-[#2A2438] bg-[#F2EAE0] px-2 py-0.5 rounded-full border border-[#D8CEBF]">
                {savedProducts.length} Pieces
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-gray-400 hover:text-[#2A2438] rounded hover:bg-[#F2EAE0] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5D5470]">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#D8CEBF] flex items-center justify-center text-[#9B8EC7] mb-4 shadow-xs">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#2A2438] mb-1 font-lato">No Garments Saved</h4>
                <p className="text-xs max-w-xs font-mono mb-6 text-[#5D5470] leading-relaxed">
                  Save pieces from our tailored collections to compare fits and craft details later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2.5 bg-[#9B8EC7] hover:bg-[#8575b6] text-white text-xs font-bold rounded-[3px] shadow-sm uppercase tracking-wider transition"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-[3px] bg-[#FFFFFF] border border-[#D8CEBF] relative group shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-16 h-20 object-cover rounded-[2px] border border-[#D8CEBF] cursor-pointer flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-[#625096] font-bold truncate">
                          {product.code}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-gray-400 hover:text-red-500 transition p-0.5"
                          title="Remove saved item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-bold text-[#2A2438] hover:text-[#9B8EC7] cursor-pointer truncate"
                      >
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-mono font-bold text-[#2A2438]">
                        {formatPrice(product.price)}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="px-2.5 py-1 bg-[#9B8EC7] hover:bg-[#8575b6] text-white text-[11px] font-bold rounded flex items-center gap-1 shadow-sm transition"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
