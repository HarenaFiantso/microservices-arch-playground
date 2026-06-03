'use client';

import { useEffect, useRef } from 'react';

import Link from 'next/link';

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: {
      x: number;
      y: number;
      r: number;
      opacity: number;
      rot: number;
      vx: number;
      vy: number;
      vr: number;
      shape: 'rect' | 'circle' | 'line';
    }[] = [];

    const shades = ['#000000', '#1a1a1a', '#333333', '#555555', '#888888', '#aaaaaa', '#cccccc'];

    for (let i = 0; i < 140; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        r: 4 + Math.random() * 7,
        opacity: 0.4 + Math.random() * 0.6,
        rot: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 1.8,
        vy: 1.5 + Math.random() * 2.5,
        vr: (Math.random() - 0.5) * 0.12,
        shape: (['rect', 'circle', 'line'] as const)[Math.floor(Math.random() * 3)] as any,
      });
    }

    const coloredPieces = pieces.map((p) => ({
      ...p,
      color: shades[Math.floor(Math.random() * shades.length)],
    }));

    let raf: number;
    let done = false;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allGone = true;

      for (const p of coloredPieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.vy += 0.035;

        if (p.y < canvas.height + 20) allGone = false;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity * Math.max(0, 1 - p.y / canvas.height);
        ctx.fillStyle = (p as any).color;
        ctx.strokeStyle = (p as any).color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.r, -p.r * 0.4, p.r * 2, p.r * 0.8);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-p.r, 0);
          ctx.lineTo(p.r, 0);
          ctx.stroke();
        }
        ctx.restore();
      }

      if (!allGone && !done) raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    const timeout = setTimeout(() => {
      done = true;
      cancelAnimationFrame(raf);
    }, 5000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" />;
}

interface ReturnClientProps {
  status: string;
  paymentStatus: string;
}

export function ReturnClient({ status, paymentStatus }: ReturnClientProps) {
  const success = status === 'complete' && paymentStatus === 'paid';

  return (
    <div className="relative flex min-h-[75vh] items-center justify-center">
      {success && <Confetti />}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-4 text-center">
        <div className="mb-8">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full border-2 ${success ? 'border-black' : 'border-neutral-400'}`}
          >
            {success ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#737373"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-black">
          {success ? 'Order Confirmed' : 'Payment Failed'}
        </h1>
        <span
          className={`mb-5 inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-widest uppercase ${
            success ? 'border-black text-black' : 'border-neutral-300 text-neutral-400'
          }`}
        >
          {paymentStatus}
        </span>
        <p className="mb-10 text-sm leading-relaxed font-light text-neutral-500">
          {success
            ? 'Your payment was processed successfully. You can track your order from the orders page.'
            : 'Something went wrong with your payment. Please try again or contact support.'}
        </p>
        <div className="mb-10 h-px w-8 bg-black" />
        <Link
          href="/orders"
          className="group inline-flex items-center gap-2 border-b border-black pb-0.5 text-sm font-medium text-black transition-all duration-200 hover:gap-3"
        >
          View your orders
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
