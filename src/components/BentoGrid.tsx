import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Grid, 
  SlidersHorizontal,
  ChevronDown,
  Check
} from 'lucide-react';

const SORT_OPTIONS: { value: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'; label: string }[] = [
  { value: 'featured', label: 'Curated Picks' },
  { value: 'rating', label: 'Highest Client Rating' },
  { value: 'discount', label: 'Biggest Savings %' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export const BentoGrid: React.FC = () => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterDiscounted, setFilterDiscounted] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSortOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

          {/* Bespoke Luxury Sort Dropdown Menu */}
          <div ref={sortRef} className="relative z-30">
            <div className="flex items-center gap-2">
              <span className="text-[#5D5470] font-mono text-[11px] uppercase tracking-wider hidden sm:inline">Sort By:</span>
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                className="inline-flex items-center justify-between gap-2.5 bg-[#FAF6F0] hover:bg-[#F2EAE0] border border-[#D8CEBF] hover:border-[#9B8EC7] text-[#2A2438] rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-all shadow-2xs focus:outline-none min-w-[160px]"
              >
                <span>{SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#625096] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Floating Luxury Menu Popover - Aligns left on mobile to prevent left-side cut off, right on desktop */}
            {isSortOpen && (
              <div 
                role="listbox"
                className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1.5 w-56 max-w-[calc(100vw-2.5rem)] bg-[#FFFFFF] border border-[#D8CEBF] rounded-xl shadow-xl py-1.5 z-40 overflow-hidden"
              >
                <div className="px-3.5 py-1 text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#7E7494] border-b border-[#F2EAE0] mb-1 font-bold">
                  Order Collection
                </div>
                {SORT_OPTIONS.map((option) => {
                  const isSelected = sortBy === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-mono flex items-center justify-between transition-colors ${
                        isSelected 
                          ? 'bg-[#F2EAE0] text-[#625096] font-bold' 
                          : 'text-[#2A2438] hover:bg-[#FAF6F0] hover:text-[#625096]'
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#625096] stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
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
