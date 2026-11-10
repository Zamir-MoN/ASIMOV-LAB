import React from 'react';

interface Brand {
  name: string;
  code: string;
  country: string;
}

const BRANDS: Brand[] = [
  { name: 'BALENCIAGA', code: 'fr', country: 'France' },
  { name: 'MAISON MARGIELA', code: 'fr', country: 'France' },
  { name: 'ACNE STUDIOS', code: 'se', country: 'Sweden' },
  { name: 'JIL SANDER', code: 'it', country: 'Italy' },
  { name: 'BOTTEGA VENETA', code: 'it', country: 'Italy' },
  { name: 'RICK OWENS', code: 'fr', country: 'France' },
  { name: 'THE ROW', code: 'us', country: 'United States' },
  { name: 'LEMAIRE', code: 'fr', country: 'France' },
  { name: 'AMI PARIS', code: 'fr', country: 'France' },
  { name: 'PRADA', code: 'it', country: 'Italy' },
  { name: 'LOEWE', code: 'es', country: 'Spain' },
  { name: 'DRIES VAN NOTEN', code: 'be', country: 'Belgium' }
];

export const BrandLogosStripe: React.FC = () => {
  // Duplicated for an unbroken, seamless continuous loop
  const duplicatedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full bg-[#18161D] py-4 border-t border-b border-[#2A2438] overflow-hidden select-none relative shadow-md">
      {/* Dark gradient edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#18161D] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#18161D] to-transparent z-10 pointer-events-none"></div>

      {/* Infinite Marquee Track moving Left to Right (Slow & Elegant 55s) */}
      <div className="animate-marquee-reverse gap-8 sm:gap-14 items-center">
        {duplicatedBrands.map((brand, idx) => (
          <div 
            key={`${brand.name}-${idx}`} 
            className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-200 cursor-default group"
          >
            <span className="text-[13px] sm:text-base font-black tracking-[0.24em] text-white uppercase font-sans group-hover:text-[#BDA6CE] transition-colors">
              {brand.name}
            </span>
            
            {/* Crisp SVG Country Flag using FlagCDN */}
            <div className="inline-flex items-center shadow-xs overflow-hidden rounded-[2px] border border-white/20">
              <img
                src={`https://flagcdn.com/w40/${brand.code}.png`}
                srcSet={`https://flagcdn.com/w80/${brand.code}.png 2x`}
                width="20"
                height="14"
                alt={`${brand.country} flag`}
                className="w-5 h-3.5 object-cover block group-hover:scale-110 transition-transform duration-200"
                loading="lazy"
                decoding="async"
              />
            </div>

            <span className="w-1.5 h-1.5 rounded-full bg-[#9B8EC7] ml-3 sm:ml-6"></span>
          </div>
        ))}
      </div>
    </div>
  );
};
