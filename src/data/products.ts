import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'asimov-atelier-trench',
    name: 'Atelier Wool-Blend Draped Overcoat',
    code: 'ASM-COAT-01',
    tagline: 'Signature architectural double-breasted coat tailored from double-faced virgin wool.',
    category: 'outerwear',
    price: 31999,
    originalPrice: 43999,
    discountPercent: 27,
    rating: 4.96,
    reviewsCount: 184,
    releaseYear: 2026,
    tags: ['NEW ARRIVAL', 'ORGANIC WOOL', 'SIGNATURE PIECE'],
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fm=webp&fit=crop&w=800&q=75',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'An architectural centerpiece designed for effortless cold-season layering. Crafted in Italy from premium virgin wool with dropped shoulders, horn buttons, and a clean storm flap silhouette.',
    features: [
      '100% Double-faced European Virgin Wool',
      'Horn button closure with hidden inner stay buttons',
      'Bespoke viscose-silk sleeve lining for fluid movement',
      'Dual welt hand pockets & interior chest passport pocket'
    ],
    specs: [
      { name: 'Fit', value: 'Relaxed Tailored' },
      { name: 'Fabric Weight', value: '620 GSM Heavyweight' },
      { name: 'Origin', value: 'Porto, Portugal' },
      { name: 'Care', value: 'Dry Clean Only' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Oatmeal Cream', 'Charcoal Slate', 'Camel'],
    material: 'Virgin Wool & Cashmere blend',
    inStock: true,
    stockLeft: 8,
    isBentoHero: true,
    badge: 'COLLECTION DROP -27%'
  },
  {
    id: 'asimov-ribbed-cashmere-knit',
    name: 'Heavyweight Ribbed Cashmere Turtleneck',
    code: 'ASM-KNIT-04',
    tagline: 'Ultra-soft 4-ply Mongolian cashmere sweater with sculpted raglan sleeves.',
    category: 'knitwear',
    price: 19999,
    originalPrice: 27999,
    discountPercent: 28,
    rating: 4.98,
    reviewsCount: 220,
    releaseYear: 2026,
    tags: ['PURE CASHMERE', 'BESTSELLER', 'LUXURY ESSENTIAL'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fm=webp&fit=crop&w=800&q=75',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'Spun from Grade-A Mongolian cashmere fibers, this ribbed turtleneck combines cloud-like softness with dense, pill-resistant durability. Finished with seamless tubular knit cuffs.',
    features: [
      '100% Grade-A Long-Staple Cashmere',
      '4-ply 7-gauge textured brioche stitch',
      'Comfort-stretch rollneck that retains structure',
      'Ethically sourced & certified OEKO-TEX standard'
    ],
    specs: [
      { name: 'Gauge', value: '7-Gauge Brioche' },
      { name: 'Fiber Fineness', value: '15.5 Micron' },
      { name: 'Origin', value: 'Biella, Italy' },
      { name: 'Care', value: 'Hand Wash Cold or Dry Clean' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Chalk Cream', 'Soft Lavender', 'Pale Periwinkle'],
    material: '100% Pure Mongolian Cashmere',
    inStock: true,
    stockLeft: 12,
    badge: 'LUXURY KNIT'
  },
  {
    id: 'asimov-relaxed-pleated-trouser',
    name: 'Relaxed Wide-Leg Pleated Wool Trouser',
    code: 'ASM-TRSR-02',
    tagline: 'High-waisted trousers with double forward pleats and fluid puddle hems.',
    category: 'tailoring',
    price: 15999,
    originalPrice: 21499,
    discountPercent: 25,
    rating: 4.89,
    reviewsCount: 142,
    releaseYear: 2026,
    tags: ['MODERN TAILORING', 'ESSENTIAL'],
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'Precision cut from high-twist tropical wool. Features an extended tab closure, side button adjusters, and deep double front pleats that drape cleanly over loafers or sneakers.',
    features: [
      '100% High-Twist Tropical Wool',
      'Double front forward pleats for room & shape',
      'Side waist cinch tabs for a belt-free tailored fit',
      'Half-lined to the knee with anti-static cupro'
    ],
    specs: [
      { name: 'Rise', value: 'High Rise (32cm)' },
      { name: 'Leg Opening', value: '25cm Wide' },
      { name: 'Closure', value: 'YKK Zip & Concealed Hook' },
      { name: 'Origin', value: 'Naples, Italy' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Sand Ecru', 'Charcoal', 'Muted Ice'],
    material: '100% Super 120s Wool',
    inStock: true,
    stockLeft: 14,
    badge: 'POPULAR'
  },
  {
    id: 'asimov-boxy-poplin-shirt',
    name: 'Minimalist Boxy Poplin Overshirt',
    code: 'ASM-SHRT-05',
    tagline: 'Crisp organic cotton shirt with structured point collar and mother-of-pearl buttons.',
    category: 'tailoring',
    price: 11499,
    originalPrice: 15499,
    discountPercent: 26,
    rating: 4.91,
    reviewsCount: 310,
    releaseYear: 2026,
    tags: ['ORGANIC COTTON', 'SUMMER ESSENTIAL'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'A modern rework of the classic tailoring staple. Tailored from high-density organic cotton poplin that holds its crisp drape through all-day wear.',
    features: [
      '100% GOTS-Certified Long-Staple Cotton',
      'Genuine Australian mother-of-pearl buttons',
      'Clean French front placket without topstitching',
      'Curved hem designed to be worn untucked'
    ],
    specs: [
      { name: 'Weave', value: '120/2 Compact Poplin' },
      { name: 'Collar', value: 'Classic 7cm Point' },
      { name: 'Fit', value: 'Structured Boxy' },
      { name: 'Origin', value: 'Izmir, Turkey' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Crisp White', 'Pale Ice Blue', 'Soft Lavender'],
    material: '100% Organic GOTS Cotton',
    inStock: true,
    stockLeft: 19,
    badge: 'ESSENTIAL'
  },
  {
    id: 'asimov-leather-minimalist-sneaker',
    name: 'Crafted Calfskin Low-Top Court Sneaker',
    code: 'ASM-SHOE-01',
    tagline: 'Monochrome full-grain Italian leather sneakers with Margom stitched rubber sole.',
    category: 'footwear',
    price: 21499,
    originalPrice: 28999,
    discountPercent: 25,
    rating: 4.95,
    reviewsCount: 265,
    releaseYear: 2026,
    tags: ['FULL GRAIN LEATHER', 'HANDMADE'],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'Handmade in the Marche region of Italy. Features ultra-supple buttery calf leather, removable vegetable-tanned leather insoles, and durable Margom vulcanized cup soles.',
    features: [
      'Full-grain Italian calf leather upper & lining',
      'Original Italian Margom rubber cup sole',
      'Waxed cotton laces with metal aglets',
      'Arch-supporting cushioned memory foam footbed'
    ],
    specs: [
      { name: 'Construction', value: 'Stitched Cupsole' },
      { name: 'Leather Type', value: 'Aniline Calfskin' },
      { name: 'Origin', value: 'Civitanova Marche, Italy' },
      { name: 'Sole', value: '100% Natural Rubber' }
    ],
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    colors: ['Off-White Cream', 'Chalk Chalk', 'Monochrome Slate'],
    material: '100% Full-Grain Calfskin Leather',
    inStock: true,
    stockLeft: 11,
    badge: 'HANDMADE'
  },
  {
    id: 'asimov-suede-bomber-jacket',
    name: 'Supple Goat-Suede Minimalist Bomber',
    code: 'ASM-JKT-09',
    tagline: 'Velvety goat suede jacket with custom matte nickel hardware and rib-knit trims.',
    category: 'outerwear',
    price: 39999,
    originalPrice: 52999,
    discountPercent: 24,
    rating: 4.97,
    reviewsCount: 118,
    releaseYear: 2026,
    tags: ['SUEDE LEATHER', 'HERITAGE'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'A timeless silhouette elevated through ultra-plush goat suede. Detailed with tonal wool-blend ribbing at the neck and cuffs, and an easy two-way Lampo front zipper.',
    features: [
      '0.8mm velvety goat suede leather',
      'Heavy-duty two-way brushed nickel zipper',
      'Interior zip pocket with genuine leather piping',
      'Breathable satin body lining'
    ],
    specs: [
      { name: 'Leather', value: 'Premium Goat Suede' },
      { name: 'Hardware', value: 'Lampo Two-Way Nickel' },
      { name: 'Origin', value: 'Florence, Italy' },
      { name: 'Care', value: 'Specialist Leather Clean' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Muted Sand', 'Espresso', 'Taupe Grey'],
    material: '100% Italian Goat Suede',
    inStock: true,
    stockLeft: 6,
    badge: 'COLLECTION DROP'
  },
  {
    id: 'asimov-heavy-cotton-hoodie',
    name: '500 GSM Structured Loopback Hoodie',
    code: 'ASM-SWT-03',
    tagline: 'Heavyweight organic French terry sweatshirt with seamless double-layered hood.',
    category: 'streetwear',
    price: 10999,
    originalPrice: 14499,
    discountPercent: 25,
    rating: 4.92,
    reviewsCount: 480,
    releaseYear: 2026,
    tags: ['HEAVYWEIGHT', '500 GSM', 'ORGANIC'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'Constructed from custom-knit 500 GSM organic French terry cotton. Custom boxy cut with zero drawstrings for a pure, clean aesthetic. Pre-shrunk for an enduring fit.',
    features: [
      '500 GSM custom-milled organic French terry',
      'Crossover neckband with clean double-layered hood',
      'Flatlock reinforced stitching across all stress seams',
      'Pre-washed & tumble-dried to prevent shrinkage'
    ],
    specs: [
      { name: 'Fabric Weight', value: '500 GSM French Terry' },
      { name: 'Fit', value: 'Boxy Dropped Shoulder' },
      { name: 'Origin', value: 'Braga, Portugal' },
      { name: 'Care', value: 'Machine Wash Cold, Hang Dry' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Alabaster Cream', 'Washed Lavender', 'Soft Periwinkle', 'Charcoal'],
    material: '100% Organic Loopback Cotton',
    inStock: true,
    stockLeft: 25,
    badge: 'BESTSELLER -25%'
  },
  {
    id: 'asimov-leather-tote',
    name: 'Structured Vegetable-Tanned Leather Shopper Tote',
    code: 'ASM-ACC-02',
    tagline: 'Minimalist carry-all tote with suede lining and detachable organizer pouch.',
    category: 'accessories',
    price: 22999,
    originalPrice: 31499,
    discountPercent: 26,
    rating: 4.94,
    reviewsCount: 160,
    releaseYear: 2026,
    tags: ['VEGETABLE TANNED', 'HANDCRAFTED'],
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fm=webp&fit=crop&w=800&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fm=webp&fit=crop&w=800&q=75'
    ],
    description: 'Cut from thick 2.2mm Tuscan vegetable-tanned bridle leather that will develop an irreplaceable rich patina over decades of use. Sized generously for a 16-inch laptop and daily essentials.',
    features: [
      'Tuscan vegetable-tanned bridle leather',
      'Reinforced rolled leather handles for shoulder carry',
      'Interior zip compartment and brass key leash',
      'Solid antiqued brass hardware'
    ],
    specs: [
      { name: 'Dimensions', value: '42cm x 36cm x 14cm' },
      { name: 'Handle Drop', value: '26 cm' },
      { name: 'Origin', value: 'Tuscany, Italy' },
      { name: 'Capacity', value: 'Fits up to 16" MacBook' }
    ],
    sizes: ['One Size'],
    colors: ['Natural Biscuit', 'Cognac Tan', 'Black Onyx'],
    material: '100% Tuscan Bridle Leather',
    inStock: true,
    stockLeft: 10,
    badge: 'PATINA LEATHER'
  }
];

export const PROMO_CODES: { [code: string]: number } = {
  'ASIMOV20': 0.20,
  'WELCOME15': 0.15,
  'SUMMER10': 0.10,
};

export const EXCHANGE_RATES: { [key in 'CRED' | 'INR' | 'USD' | 'EUR' | 'GBP']: { symbol: string; rate: number; name: string } } = {
  CRED: { symbol: '₹', rate: 1.0, name: 'Indian Rupee' },
  INR: { symbol: '₹', rate: 1.0, name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, name: 'USD Dollar' },
  EUR: { symbol: '€', rate: 0.011, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.0095, name: 'British Pound' },
};
