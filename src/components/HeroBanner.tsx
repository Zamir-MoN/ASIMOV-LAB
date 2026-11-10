import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden select-none border-b border-[#E3D9CC] bg-[#1a1720]">
      {/* Video Container matching UHD Aspect Ratio */}
      <div className="relative w-full flex justify-center items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-auto max-h-[85vh] object-cover block"
          style={{
            aspectRatio: '4096 / 2160'
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Top Wire-Mesh Sky Area: Bold Glitch Overlay */}
        <div className="absolute top-[8%] sm:top-[12%] inset-x-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
          <div className="relative">
            {/* Subtle glow backdrop */}
            <div className="absolute inset-0 blur-2xl bg-[#9B8EC7]/30 rounded-full scale-125"></div>

            <div className="glitch-wrapper">
              <h1 
                data-text="ASIMOV LAB"
                className="glitch-main text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase font-sans select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
              >
                ASIMOV LAB
                <span aria-hidden="true" className="glitch-copy-1" data-text="ASIMOV LAB">ASIMOV LAB</span>
                <span aria-hidden="true" className="glitch-copy-2" data-text="ASIMOV LAB">ASIMOV LAB</span>
              </h1>
            </div>
          </div>

          {/* Futuristic Micro Sub-badge */}
          <div className="mt-2 sm:mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#55ced4] animate-ping"></span>
            <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              ATELIER RUNWAY // 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
