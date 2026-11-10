import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    total,
    formatPrice,
    appliedPromo,
    promoDiscountPercent,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    setSelectedProduct
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  // Lock background scroll when shopping bag drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-lato">
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div data-lenis-prevent className="w-screen max-w-md bg-[#FAF6F0] border-l border-[#D8CEBF] shadow-2xl flex flex-col text-[#2A2438] pt-safe">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#FFFFFF] border-b border-[#E8DED1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9B8EC7]" />
              <h3 className="font-bold text-base tracking-wide font-lato text-[#2A2438]">Shopping Bag</h3>
              <span className="text-xs font-mono text-[#2A2438] bg-[#F2EAE0] px-2 py-0.5 rounded-full border border-[#D8CEBF]">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-[#2A2438] rounded hover:bg-[#F2EAE0] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5D5470]">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#D8CEBF] flex items-center justify-center text-[#9B8EC7] mb-4 shadow-xs">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#2A2438] mb-1 font-lato">Your Bag is Empty</h4>
                <p className="text-xs max-w-xs font-mono mb-6 text-[#5D5470] leading-relaxed">
                  You haven't selected any garments or footwear from our collection yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-[#9B8EC7] hover:bg-[#8575b6] text-white text-xs font-bold rounded-[3px] shadow-sm uppercase tracking-wider transition"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || 'default'}-${item.selectedColor || 'default'}`}
                  className="flex gap-3.5 p-3 rounded-[3px] bg-[#FFFFFF] border border-[#D8CEBF] relative group shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setIsCartOpen(false);
                    }}
                    className="w-16 h-20 object-cover rounded-[2px] border border-[#D8CEBF] cursor-pointer flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-[#625096] font-bold truncate">
                          {item.product.code}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 transition p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setSelectedProduct(item.product);
                          setIsCartOpen(false);
                        }}
                        className="text-xs font-bold text-[#2A2438] hover:text-[#9B8EC7] cursor-pointer truncate"
                      >
                        {item.product.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#5D5470]">
                        {item.selectedSize && (
                          <span className="bg-[#FAF6F0] px-1.5 py-0.5 rounded border border-[#D8CEBF] font-mono font-semibold">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="text-gray-500">
                            {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D8CEBF] rounded bg-[#FAF6F0]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#5D5470] hover:text-[#2A2438]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-[#2A2438]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#5D5470] hover:text-[#2A2438]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-[#2A2438]">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] bg-[#FFFFFF] border-t border-[#E8DED1] space-y-4">
              
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded bg-[#FAF6F0] border border-[#9B8EC7] text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[#625096] font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedPromo} (-{Math.round(promoDiscountPercent * 100)}%)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[#5D5470] hover:text-[#2A2438] text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Access Code (e.g. ZEROTH_LAW)"
                      className="flex-1 bg-[#FAF6F0] border border-[#D8CEBF] rounded-[3px] px-3 py-1.5 text-xs text-[#2A2438] placeholder-[#5D5470]/60 uppercase font-mono focus:outline-none focus:border-[#9B8EC7]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#9B8EC7] hover:bg-[#8575b6] text-white text-xs font-bold rounded-[3px] transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono text-[#5D5470] pt-2 border-t border-[#E8DED1]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-[#2A2438]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#625096]">
                    <span>Seasonal Discount:</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier:</span>
                  <span className="text-[#625096] font-bold">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2A2438] pt-2 border-t border-[#E8DED1]">
                  <span className="font-lato">Total:</span>
                  <span className="text-[#2A2438] font-mono text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 bg-[#9B8EC7] hover:bg-[#8575b6] text-white rounded-[3px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#5D5470]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#625096]" />
                <span>30-Day Atelier Guarantee & Complimentary Returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
