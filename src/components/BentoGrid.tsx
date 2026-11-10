import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Grid, 
  SlidersHorizontal 
} from 'lucide-react';

export const BentoGrid: React.FC = () => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterDiscounted, setFilterDiscounted] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item: Product) => {
      if (filterOrganic && !item.tags.some(t => t.includes('ORGANIC') || t.includes('WOOL') || t.includes('CASHMERE'))) return false;
      if (filterDiscounted && (!item.discountPercent || item.discountPercent <= 0)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0;
    });
  }, [sortBy, filterOrganic, filterDiscounted]);

  return (
    <section id="portfolio-grid" className="py-10 bg-[#F2EAE0] text-[#2A2438]">
      <div className="max-w-[1060px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 pb-3 border-b border-[#D8CEBF]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2A2438] tracking-tight font-lato">
              Curated Garments & Footwear
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#5D5470]">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] text-[#2A2438] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#9B8EC7]"></span>
              {filteredProducts.length} DESIGNS AVAILABLE
            </span>
          </div>
        </div>

        {/* Controls: Filter & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] mb-5 text-xs shadow-xs">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[#5D5470] font-mono text-[11px] uppercase flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#9B8EC7]" /> Filter:
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer text-[#2A2438] hover:text-[#9B8EC7] select-none">
              <input
                type="checkbox"
                checked={filterOrganic}
                onChange={(e) => setFilterOrganic(e.target.checked)}
                className="rounded border-[#BDA6CE] text-[#9B8EC7] focus:ring-0 bg-transparent"
              />
              <span className="font-mono text-[11px]">Natural Fibers Only</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#2A2438] hover:text-[#9B8EC7] select-none">
              <input
                type="checkbox"
                checked={filterDiscounted}
                onChange={(e) => setFilterDiscounted(e.target.checked)}
                className="rounded border-[#BDA6CE] text-[#9B8EC7] focus:ring-0 bg-transparent"
              />
              <span className="font-mono text-[11px] text-[#625096] font-semibold">Seasonal Sale %</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#5D5470] font-mono text-[11px] uppercase">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF6F0] border border-[#D8CEBF] text-[#2A2438] rounded-[3px] px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-[#9B8EC7]"
            >
              <option value="featured">Curated Picks</option>
              <option value="rating">Highest Client Rating</option>
              <option value="discount">Biggest Savings %</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Garment Grid Layout */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] my-6 shadow-xs">
            <Grid className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#2A2438] mb-1">No Garments Matched</h3>
            <p className="text-xs text-[#5D5470] max-w-md mx-auto mb-4 font-mono">
              Adjust your active filters or view our full wardrobe collection.
            </p>
            <button
              onClick={() => {
                setFilterOrganic(false);
                setFilterDiscounted(false);
              }}
              className="px-4 py-2 bg-[#9B8EC7] hover:bg-[#8575b6] text-white text-xs font-bold rounded-[3px]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
