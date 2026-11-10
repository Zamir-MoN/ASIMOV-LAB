import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const displaySpanRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = columnsRef.current ? Array.from(columnsRef.current.children) : [];

      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          if (onComplete) onComplete();
        }
      });

      // The Multilingual Phrases: Japanese -> Hindi -> Final English Bold (Russian and Arabic removed)
      const phrases = [
        'アシモフ ラボ',    // Japanese
        'असिमोव लैब',      // Hindi
        'ASIMOV LAB',      // English
      ];

      // Initial State: Screen is pitch black with solid underlay
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(cols, { yPercent: 0 });
      gsap.set(textRef.current, { opacity: 1 });
      gsap.set(periodRef.current, { opacity: 0, scale: 0 });

      // Cursor blinking effect
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.38,
        ease: 'power2.inOut'
      });

      // Helper object to tween character counts
      const textTracker = { count: 0 };

      // Typewriter loop: Types letter-by-letter, pauses, deletes letter-by-letter, rewrites in next language
      phrases.forEach((phrase, phraseIdx) => {
        const isFinal = phraseIdx === phrases.length - 1;
        const charLength = Array.from(phrase).length;

        // 1. TYPE LETTER-BY-LETTER (Measured, readable luxury typewriter cadence)
        tl.to(textTracker, {
          count: charLength,
          duration: charLength * 0.065, // tuned slightly slower for perfect legibility
          ease: 'none',
          onUpdate: () => {
            if (displaySpanRef.current) {
              const currentChars = Array.from(phrase).slice(0, Math.round(textTracker.count)).join('');
              displaySpanRef.current.innerText = currentChars;
            }
          }
        });

        if (!isFinal) {
          // Pause on the fully written phrase to let user read
          tl.to({}, { duration: 0.32 }); // balanced hold

          // 2. BACKSPACE / DELETE LETTER-BY-LETTER
          tl.to(textTracker, {
            count: 0,
            duration: charLength * 0.038, // smooth backspacing
            ease: 'none',
            onUpdate: () => {
              if (displaySpanRef.current) {
                const currentChars = Array.from(phrase).slice(0, Math.round(textTracker.count)).join('');
                displaySpanRef.current.innerText = currentChars;
              }
            }
          });

          // Micro pause before next language starts typing
          tl.to({}, { duration: 0.08 });
        } else {
          // FINAL ENGLISH: Stop cursor and pop period accent
          tl.to(cursorRef.current, { opacity: 0, duration: 0.1 }, '+=0.06')
            .to(periodRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.22,
              ease: 'back.out(2.5)'
            }, '-=0.08')

            // Cinematic Hold on final bold English title
            .to({}, { duration: 0.75 })

            // Text drifts up smoothly before curtain lifts
            .to(textRef.current, {
              opacity: 0,
              y: -25,
              filter: 'blur(8px)',
              duration: 0.45,
              ease: 'power3.in'
            });
        }
      });

      // Stage 3: High-density 12 thin columns sliding up sequentially (Staircase Curtain Wipe)
      tl.to(backdropRef.current, { opacity: 0, duration: 0.05 }, '-=0.15')
        .to(cols, {
          yPercent: -100,
          duration: 0.95,
          stagger: {
            each: 0.045,
            from: 'start',
            ease: 'power4.inOut'
          },
          ease: 'power4.inOut'
        }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  const columnCount = 12;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Solid Black Underlay during typing so zero lines or background bleed through */}
      <div ref={backdropRef} className="absolute inset-0 bg-[#0E0C11]" />

      {/* 2. 12 Slender Vertical Staggered Curtains with seamless overlap */}
      <div ref={columnsRef} className="absolute inset-0 flex w-full h-full">
        {Array.from({ length: columnCount }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full bg-[#0E0C11] relative"
            style={{
              boxShadow: '0 0 0 1.5px #0E0C11',
              transform: 'scaleX(1.04)',
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>

      {/* Centered Typewriter Text with blinking cursor */}
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10 pointer-events-none">
        <div
          ref={textRef}
          className="text-center font-sans tracking-tight text-white flex items-center justify-center whitespace-nowrap"
        >
          {/* Active typed letters */}
          <span
            ref={displaySpanRef}
            className="text-[1.85rem] xs:text-[2.2rem] sm:text-5xl md:text-6xl font-black uppercase text-white font-sans drop-shadow-[0_2px_18px_rgba(255,255,255,0.3)] tracking-[0.12em] sm:tracking-[0.2em] min-h-[1.3em] inline-block"
          >
          </span>

          {/* Typewriter Terminal Cursor */}
          <span
            ref={cursorRef}
            className="inline-block w-[3.5px] sm:w-[5px] h-8 xs:h-9 sm:h-12 bg-[#B4D3D9] ml-1.5 sm:ml-2.5 shadow-[0_0_10px_#B4D3D9]"
          />

          {/* Accent dot on final English completion */}
          <span
            ref={periodRef}
            className="text-[1.85rem] xs:text-[2.2rem] sm:text-5xl md:text-6xl font-black text-[#9B8EC7] drop-shadow-[0_0_14px_rgba(155,142,199,0.9)]"
          >
            .
          </span>
        </div>
      </div>
    </div>
  );
};

