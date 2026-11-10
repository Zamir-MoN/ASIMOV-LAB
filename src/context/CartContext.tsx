import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Currency } from '../types';
import { PROMO_CODES, EXCHANGE_RATES } from '../data/products';
import { sound } from '../utils/audio';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInCredits: number) => string;

  promoCode: string;
  appliedPromo: string | null;
  promoDiscountPercent: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Sound
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;

  // Toast
  toasts: Toast[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asimov_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('asimov_wishlist');
      return saved ? JSON.parse(saved) : ['asimov-daneel-mk7'];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState<Currency>('INR');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);

  // Modern View Transitions API for seamless crossfades between Home & Product Pages
  const setSelectedProduct = (p: Product | null) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setSelectedProductState(p);
      });
    } else {
      setSelectedProductState(p);
    }
  };

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('asimov_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('asimov_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const setSoundEnabled = (v: boolean) => {
    setSoundEnabledState(v);
    sound.enabled = v;
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    sound.playAddToCart();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('Artifact Allocated', `${product.name} added to your procurement queue.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    sound.playClick();
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    sound.playClick();
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    sound.playClick();
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Telemetry Removed', 'Item de-listed from saved archives.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Item Bookmarked', 'Positronic schematic added to your private registry.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      const pct = PROMO_CODES[clean];
      setAppliedPromo(clean);
      setPromoDiscountPercent(pct);
      sound.playSuccess();
      showToast('Law Override Authorized', `${clean} applied! You received ${Math.round(pct * 100)}% off.`, 'success');
      return true;
    } else {
      showToast('Invalid Access Key', 'Decryption failed: Key is unrecognized or expired.', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoDiscountPercent(0);
    setPromoCode('');
  };

  const formatPrice = (amountInCredits: number) => {
    const info = EXCHANGE_RATES[currency] || EXCHANGE_RATES['INR'];
    const converted = amountInCredits * info.rate;
    return `${info.symbol}${converted.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * promoDiscountPercent;
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        total,

        wishlist,
        toggleWishlist,
        isInWishlist,

        currency,
        setCurrency,
        formatPrice,

        promoCode,
        appliedPromo,
        promoDiscountPercent,
        applyPromoCode,
        removePromoCode,

        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,

        soundEnabled,
        setSoundEnabled,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

