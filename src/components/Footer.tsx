import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Layers, 
  ShieldCheck, 
  Shirt, 
  Tag, 
  ArrowRight,
  Check
} from 'lucide-react';

interface FooterProps {
  isDarkPreceding?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkPreceding = true }) => {
  const { setSelectedProduct } = useCart();
  return (
    /* Outer container dynamic background matching the section directly above it */
    <div className={`w-full relative select-none ${isDarkPreceding ? 'bg-[#141218]' : 'bg-[#F2EAE0]'}`}>
      <footer className="bg-[#FAF6F0] rounded-t-[2.5rem] sm:rounded-t-[3.5rem] border-t border-[#D8CEBF]/60 text-[#5D5470] font-lato relative z-10 shadow-2xl overflow-hidden">
        {/* Main Content Area - Streamlined and compact */}
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-7 sm:pt-10 pb-5 sm:pb-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Heading, description & covenant badge */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-3.5">
                <div 
                  onClick={() => {
                    setSelectedProduct(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer group py-0.5"
                  title="Return to Home / Collection"
                >
                  <img 
                    src="/images/logo.png" 
                    alt="ASIMOV LAB" 
                    className="h-8 sm:h-10 w-auto object-contain opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#9B8EC7] uppercase font-bold border-l border-[#D8CEBF] pl-3">
                  AUTUMN/WINTER 2026
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-normal text-[#2A2438] font-serif leading-snug tracking-tight">
                Quiet Luxury, <span className="italic text-[#584B79] font-serif">Engineered to Last.</span>
              </h2>

              <p className="text-xs text-[#5D5470] leading-relaxed max-w-sm">
                Architectural silhouettes, pure natural yarns, and uncompromised tailoring standards.
              </p>

              {/* Traceable natural fiber covenant pill */}
              <div className="pt-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#D8CEBF] bg-[#FFFFFF] shadow-2xs text-[#2A2438]">
                  <div className="w-3 h-3 rounded-full border border-[#9B8EC7] flex items-center justify-center text-[#9B8EC7]">
                    <Check className="w-2 h-2 stroke-[2.5]" />
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-[#2A2438]">
                    100% TRACEABLE NATURAL FIBERS
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Compact Feature Cards & Promo Codes Strip */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              
              {/* 3 Compact Interactive Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* Card 1: Collections */}
                <a
                  href="#portfolio-grid"
                  className="group p-3 sm:p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E8DED1] shadow-2xs hover:shadow-md hover:border-[#BDA6CE] transition-all duration-200 flex flex-row sm:flex-col justify-between items-center sm:items-start"
                >
                  <div className="flex items-center sm:block gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#FAF6F0] flex items-center justify-center text-[#2A2438] sm:mb-2 flex-shrink-0">
                      <Layers className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2A2438] font-mono">
                        COLLECTIONS
                      </h3>
                      <p className="hidden sm:block text-[10px] text-[#5D5470] mt-0.5 leading-tight">
                        Outerwear & knitwear.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2A2438] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </a>

                {/* Card 2: Atelier Standards */}
                <a
                  href="#materials"
                  className="group p-3 sm:p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E8DED1] shadow-2xs hover:shadow-md hover:border-[#BDA6CE] transition-all duration-200 flex flex-row sm:flex-col justify-between items-center sm:items-start"
                >
                  <div className="flex items-center sm:block gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#FAF6F0] flex items-center justify-center text-[#2A2438] sm:mb-2 flex-shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2A2438] font-mono">
                        STANDARDS
                      </h3>
                      <p className="hidden sm:block text-[10px] text-[#5D5470] mt-0.5 leading-tight">
                        Traceability & care.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2A2438] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </a>

                {/* Card 3: Atelier Concierge */}
                <div 
                  className="group p-3 sm:p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E8DED1] shadow-2xs hover:shadow-md hover:border-[#BDA6CE] transition-all duration-200 flex flex-row sm:flex-col justify-between items-center sm:items-start"
                >
                  <div className="flex items-center sm:block gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#FAF6F0] flex items-center justify-center text-[#2A2438] sm:mb-2 flex-shrink-0">
                      <Shirt className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2A2438] font-mono">
                        CONCIERGE
                      </h3>
                      <p className="hidden sm:block text-[10px] text-[#5D5470] mt-0.5 leading-tight">
                        Personal fitting relay.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2A2438] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>

              </div>

              {/* Exclusive Promo Codes Strip */}
              <div className="px-3 py-2 bg-[#EFE7DC]/70 border border-[#E0D5C7] rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#5D5470] -rotate-45" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#2A2438]">
                    PROMO CODES
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="px-2 py-0.5 bg-[#FFFFFF] border border-[#D8CEBF] rounded-full text-[9px] font-mono font-bold text-[#2A2438] shadow-2xs flex items-center gap-1">
                    <span>ATELIER15</span>
                    <span className="text-[#625096] font-semibold">-15%</span>
                  </div>

                  <div className="px-2 py-0.5 bg-[#FFFFFF] border border-[#D8CEBF] rounded-full text-[9px] font-mono font-bold text-[#2A2438] shadow-2xs flex items-center gap-1">
                    <span>CASHMERE20</span>
                    <span className="text-[#625096] font-semibold">-20%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="border-t border-[#E8DED1]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10px] sm:text-[11px] text-[#5D5470] font-mono text-center sm:text-left">
            
            {/* Copyright notice requested by user */}
            <div>
              © 2026 <strong className="font-bold text-[#2A2438]">DELTA X</strong>. All rights reserved.
            </div>

            {/* Legal / Policy Links */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[#2A2438]">
              <a href="#materials" className="hover:text-[#625096] transition">
                Fiber Provenance
              </a>
              <a href="#lookbook" className="hover:text-[#625096] transition">
                Care & Longevity
              </a>
              <a href="#" className="hover:text-[#625096] transition">
                Terms & Conditions
              </a>
            </div>

          </div>
        </div>

      </footer>
    </div>
  );
};
