import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    document.body.style.overflow = 'hidden';

    const dur = 1700;
    const t0 = performance.now();
    let done = false;

    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 2);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(eased * 100)).padStart(2, '0');
      }
      if (barRef.current) {
        barRef.current.style.width = (eased * 100).toFixed(1) + '%';
      }
      if (p < 1) requestAnimationFrame(step);
      else hide();
    };
    requestAnimationFrame(step);

    const timer = setTimeout(() => hide(), 4500);

    function hide() {
      if (done || !el) return;
      done = true;
      clearTimeout(timer);
      document.body.style.overflow = '';
      el.style.transition = 'clip-path 1.05s cubic-bezier(0.76,0,0.24,1), transform 1.05s cubic-bezier(0.76,0,0.24,1)';
      el.style.clipPath = 'inset(0 0 100% 0)';
      el.style.transform = 'translateY(-6%)';
      setTimeout(() => {
        setHidden(true);
        ScrollSmoother.get()?.refresh();
        ScrollTrigger.refresh();
      }, 1100);
    }
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'calc(var(--space-8) * 1.6) clamp(16px,5vw,72px)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>
          Portfolio 2026
        </span>
        <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>
          Brussels, BE
        </span>
      </div>
      <div
        ref={countRef}
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 500,
          fontSize: 'clamp(64px,30vw,460px)',
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          color: 'var(--color-accent)',
          fontVariantNumeric: 'tabular-nums',
          textAlign: 'center',
        }}
      >
        00
      </div>
      <div>
        <div style={{ position: 'relative', height: 2, background: 'color-mix(in srgb, var(--color-text) 12%, transparent)', marginBottom: 'var(--space-6)' }}>
          <div
            ref={barRef}
            style={{ position: 'absolute', left: 0, top: 0, height: 2, width: '0%', background: 'var(--color-accent)', boxShadow: '0 0 16px var(--color-accent)' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(16px,2.6vw,38px)', letterSpacing: '-0.02em' }}>
            Matteo Giambarresi
          </span>
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>
            Front-end developer
          </span>
        </div>
      </div>
    </div>
  );
}
