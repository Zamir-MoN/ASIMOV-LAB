import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  garment: string;
  quote: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Vikramaditya S.',
    location: 'Mumbai, MH',
    rating: 5,
    garment: 'Atelier Wool-Blend Draped Overcoat',
    quote: 'The shoulder drape is unlike anything off-the-rack. Heavy double-faced wool that cuts wind without feeling stiff. Pure Milanese craftsmanship.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Ananya Deshmukh',
    location: 'Bengaluru, KA',
    rating: 5,
    garment: 'Heavyweight Ribbed Cashmere Turtleneck',
    quote: '4-ply Mongolian cashmere is exceptional. Zero itchiness, beautiful structured brioche rollneck that stays standing all evening. Worth every rupee.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Rohan Mehra',
    location: 'New Delhi, DL',
    rating: 5,
    garment: 'Relaxed Wide-Leg Pleated Wool Trouser',
    quote: 'The puddle hem break over court sneakers is effortlessly architectural. Side waist tabs mean clean lines without needing a belt.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Kavita Nair',
    location: 'Chennai, TN',
    rating: 5,
    garment: 'Structured Vegetable-Tanned Shopper Tote',
    quote: 'Smelled like an artisan leather workshop right out of the box. After two weeks of daily laptop carry, the patina is starting to show beautifully.',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Arjun Kulkarni',
    location: 'Pune, MH',
    rating: 5,
    garment: 'Crafted Calfskin Low-Top Court Sneaker',
    quote: 'Margom stitched soles and buttery aniline leather lining. The memory foam insole makes them all-day wearable right from day one.',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Natasha Verma',
    location: 'Hyderabad, TS',
    rating: 5,
    garment: 'Minimalist Boxy Poplin Overshirt',
    quote: 'Crisp organic cotton that doesn’t crumple instantly. Mother-of-pearl buttons are genuine and thick. Sits in that sweet spot between casual and tailoring.',
    verified: true
  }
];

export const ReviewsMarqueeSection: React.FC = () => {
  // Duplicate array for an unbroken infinite loop
  const duplicatedReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-14 sm:py-16 bg-[#FAF6F0] overflow-hidden select-none border-t border-[#E8DED1]">
      <div className="max-w-[1060px] mx-auto px-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2A2438] font-lato tracking-tight">
            Client Impressions & Fit Reviews
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#5D5470]">
          <div className="flex text-[#9B8EC7]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-[#2A2438]">4.95 / 5.0</span>
          <span>(1,820+ verified fittings)</span>
        </div>
      </div>

      {/* Infinite Smooth Scrolling Track (Right to Left) with edge fades */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF6F0] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee gap-5 px-4">
          {duplicatedReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[320px] sm:w-[380px] flex-shrink-0 bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8DED1] shadow-sm hover:shadow-md hover:border-[#BDA6CE] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & verified tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#9B8EC7] gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#625096] bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#D8CEBF]">
                    <CheckCircle className="w-2.5 h-2.5 stroke-[2.5]" />
                    <span>VERIFIED CLIENT</span>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-5 h-5 text-[#9B8EC7]/20 absolute -top-1 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-[13px] text-[#2A2438] leading-relaxed font-lato pl-2 line-clamp-3">
                    "{rev.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Author & Garment tag */}
              <div className="pt-4 mt-3 border-t border-[#E8DED1]/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#2A2438] text-[13px] font-lato">
                    {rev.author}
                  </div>
                  <div className="text-[10px] font-mono text-[#5D5470]">
                    {rev.location}
                  </div>
                </div>

                <div className="text-right max-w-[170px]">
                  <span className="text-[10px] font-mono text-[#625096] block truncate">
                    {rev.garment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

