import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { intro, prefersReducedMotion } from '../../lib/intro';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(intro.hasPlayed);

  useEffect(() => {
    if (intro.hasPlayed || prefersReducedMotion()) {
      setHidden(true);
      if (!intro.hasPlayed) intro.start();
      return;
    }

    const el = loaderRef.current;
    if (!el) return;

    document.body.style.overflow = 'hidden';
    ScrollSmoother.get()?.paused(true);

    const proxy = { progress: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        ScrollSmoother.get()?.paused(false);
        setHidden(true);
        requestAnimationFrame(() => {
          ScrollSmoother.get()?.refresh();
          ScrollTrigger.refresh();
        });
      },
    });

    tl.to(proxy, {
      progress: 100,
      duration: 1.7,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(proxy.progress);
        if (countRef.current) countRef.current.textContent = String(v).padStart(2, '0');
        if (barRef.current) barRef.current.style.width = v + '%';
      },
    }, 0);

    tl.call(() => intro.start(), null, 0.544);

    tl.to(el, {
      clipPath: 'inset(0 0 100% 0)',
      yPercent: -6,
      duration: 1.05,
      ease: 'power3.inOut',
    }, '+=0.2');

    return () => {
      tl.kill();
      document.body.style.overflow = '';
      ScrollSmoother.get()?.paused(false);
    };
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
