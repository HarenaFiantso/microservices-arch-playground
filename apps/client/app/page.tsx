'use client';

import { useEffect, useRef, useState } from 'react';

import { Instrument_Serif } from 'next/font/google';
import Image from 'next/image';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
});

const slides = [
  { src: '/arrivals-1.png', alt: 'Sneaker 1' },
  { src: '/arrivals-2.png', alt: 'Sneaker 2' },
  { src: '/arrivals-3.png', alt: 'Sneaker 3' },
];

export default function BannerSection() {
  const [current, setCurrent] = useState(0);
  const animatingRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      setCurrent((prev) => (prev + 1) % slides.length);
      setTimeout(() => {
        animatingRef.current = false;
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function goTo(index: number) {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setCurrent(index);
    setTimeout(() => {
      animatingRef.current = false;
    }, 500);
  }

  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '3/1', minHeight: '220px' }}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="leading-none font-black tracking-tighter text-black uppercase select-none"
          style={{ fontSize: 'clamp(48px, 15vw, 180px)' }}
        >
          SNEAKERS
        </span>
      </div>
      <div className="pointer-events-none absolute top-[10%] left-1/2 z-10 w-full -translate-x-1/2 text-center">
        <span
          className={`${instrumentSerif.className} leading-none text-black`}
          style={{ fontSize: 'clamp(12px, 3vw, 40px)' }}
        >
          New arrivals
        </span>
      </div>
      <div className="absolute inset-0 z-20 translate-y-[8%]">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="scale-150 object-contain object-center"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] z-30 flex items-center justify-between px-[6%]">
        <span
          className="font-black tracking-wider text-black uppercase"
          style={{ fontSize: 'clamp(10px, 2.2vw, 28px)' }}
        >
          SHOW US
        </span>
        <span
          className="font-black tracking-wider text-black uppercase"
          style={{ fontSize: 'clamp(10px, 2.2vw, 28px)' }}
        >
          YOUR STYLE
        </span>
      </div>
      <div className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="cursor-pointer rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              background: i === current ? '#000' : '#00000030',
            }}
          />
        ))}
      </div>
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 z-30 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/10 transition-colors hover:bg-black/20"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 z-30 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/10 transition-colors hover:bg-black/20"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
