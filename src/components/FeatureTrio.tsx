import React from 'react';
import { Truck, RotateCcw, Feather } from 'lucide-react';

export const FeatureTrio: React.FC = () => {
  const features = [
    {
      icon: Feather,
      title: '100% Traceable Natural Fibers',
      subtitle: 'Ethical Sourcing Standard',
      description: 'Sourced directly from certified heritage mills in Biella (Italy) and Porto (Portugal). GOTS-certified organic cotton and cruelty-free Mongolian cashmere.',
      accent: 'ice',
    },
    {
      icon: RotateCcw,
      title: 'Complimentary 30-Day Returns',
      subtitle: 'Effortless Home Fitting',
      description: 'Enjoy free worldwide exchanges and doorstep returns within 30 days. All orders include pre-paid return labels and biodegradable garment bags.',
      accent: 'lavender',
    },
    {
      icon: Truck,
      title: 'Carbon-Neutral Express Shipping',
      subtitle: 'Direct From Atelier',
      description: 'Dispatched in signature FSC-certified recycled boxes with plastic-free packaging. Guaranteed express delivery worldwide within 2 to 4 business days.',
      accent: 'periwinkle',
    },
  ];

  return (
    <section id="materials" className="py-10 border-y border-[#D8CEBF] bg-[#FAF6F0]">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-[4px] bg-[#FFFFFF] border border-[#D8CEBF] hover:border-[#9B8EC7] transition-all group shadow-xs"
              >
                <div className={`p-3 rounded-[3px] bg-[#F2EAE0] border border-[#BDA6CE]/40 ${
                  f.accent === 'ice' ? 'text-[#625096]' : f.accent === 'lavender' ? 'text-[#9B8EC7]' : 'text-[#7565ab]'
                } flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#625096]">
                    {f.subtitle}
                  </div>
                  <h3 className="text-base font-bold text-[#2A2438] mt-0.5 mb-1 group-hover:text-[#9B8EC7] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#5D5470] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
