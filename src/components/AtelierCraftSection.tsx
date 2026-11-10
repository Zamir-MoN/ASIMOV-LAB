import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const AtelierCraftSection: React.FC = () => {
  return (
    <section 
      id="materials"
      className="relative py-12 sm:py-16 px-6 overflow-hidden select-none border-t border-[#D8CEBF]/40 bg-[#141218] text-white"
    >
      {/* Background Moody Tailoring Atelier Collage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src="/images/atelier-moody-collage.png" 
          alt="Moody Tailoring Atelier Collage" 
          className="w-full h-full object-cover object-center filter brightness-100 contrast-105 saturate-100"
          loading="lazy"
          decoding="async"
        />

        {/* Soft, light directional scrim behind text for readability while keeping the photo collage fully visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/20"></div>
      </div>

      {/* Compact Editorial Layout */}
      <div className="max-w-[1060px] mx-auto relative z-10">
        <div className="max-w-xl">
          
          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl font-normal font-serif text-white tracking-tight leading-[1.15]">
            Pure Fiber. <br />
            <span className="italic text-[#BDA6CE] font-serif">Quiet Architecture.</span>
          </h2>

          {/* Reduced concise text */}
          <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-lato max-w-md">
            Sourced exclusively from fourth-generation family mills in Biella and Tuscany. Pure 15.5-micron cashmere and double-faced virgin wool.
          </p>

          {/* Minimalist Editorial Metrics */}
          <div className="mt-6 pt-5 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
            <div>
              <div className="flex items-center gap-1.5 text-[#55ced4] text-xs font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>15.5 MICRON</span>
              </div>
              <div className="text-[11px] text-white/70 font-sans">
                Grade-A Cashmere
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[#BDA6CE] text-xs font-bold uppercase tracking-wider mb-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>620 GSM</span>
              </div>
              <div className="text-[11px] text-white/70 font-sans">
                European Wool
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-[#9B8EC7] text-xs font-bold uppercase tracking-wider mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B8EC7]"></span>
                <span>100% TRACEABLE</span>
              </div>
              <div className="text-[11px] text-white/70 font-sans">
                OEKO-TEX Certified
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
