export type ProductCategory = 
  | 'all'
  | 'outerwear'
  | 'knitwear'
  | 'tailoring'
  | 'streetwear'
  | 'footwear'
  | 'accessories';

export type Currency = 'CRED' | 'INR' | 'USD' | 'EUR' | 'GBP';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  tagline: string;
  category: 'outerwear' | 'knitwear' | 'tailoring' | 'streetwear' | 'footwear' | 'accessories';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  releaseYear: number;
  tags: string[];
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: ProductSpec[];
  sizes: string[];
  colors: string[];
  material: string;
  inStock: boolean;
  stockLeft: number;
  isBentoHero?: boolean;
  isStaffPick?: boolean;
  isFlashDeal?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  shippingAddress: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: Currency;
  date: string;
}
