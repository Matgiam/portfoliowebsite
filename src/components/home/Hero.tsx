import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/all';
import { intro, prefersReducedMotion } from '../../lib/intro';

const LINE1 = 'MATTEO';
const LINE2 = 'GIAMBARRESI';

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const letters1 = line1Ref.current
      ? Array.from(line1Ref.current.querySelectorAll<HTMLElement>('[data-letter]'))
      : [];
    const letters2 = line2Ref.current
      ? Array.from(line2Ref.current.querySelectorAll<HTMLElement>('[data-letter]'))
      : [];

    gsap.set(glowRef.current, { opacity: 0, scale: 0.72 });
    gsap.set([...letters1, ...letters2], { yPercent: 108, opacity: 0 });
    if (metaRef.current) gsap.set(metaRef.current.children, { opacity: 0, y: 22 });

    const off = intro.onStart(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 1.8 }, 0);

      tl.to(letters1, {
        yPercent: 0,
        opacity: 1,
        duration: 1.35,
        stagger: 0.045,
      }, 0);

      tl.to(letters2, {
        yPercent: 0,
        opacity: 1,
        duration: 1.35,
        stagger: 0.045,
      }, 0.22);

      if (metaRef.current) {
        tl.to(metaRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        }, 0.65);
      }
    });

    return () => {
      off();
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        background: 'linear-gradient(180deg,#101120 0%,#161826 70%)',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'calc(var(--space-8) * 3) 20px calc(var(--space-8) * 4)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          width: 'min(1300px,140vw)',
          aspectRatio: '1',
          transform: 'translate(-50%,-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 17%, transparent) 0%, color-mix(in srgb, var(--color-accent) 6%, transparent) 44%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative' }}>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <h1
            ref={line1Ref}
            className="hero-title"
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: '23.8vw',
              lineHeight: 0.78,
              letterSpacing: '-0.035em',
              whiteSpace: 'nowrap',
              color: 'var(--color-text)',
            }}
          >
            {LINE1.split('').map((ch, i) => (
              <span key={i} data-letter style={{ display: 'inline-block' }}>{ch}</span>
            ))}
          </h1>
        </div>
        <div style={{ position: 'relative', zIndex: 3, overflow: 'hidden', marginTop: '-0.8vw', paddingBottom: '0.08em' }}>
          <div
            ref={line2Ref}
            className="hero-subtitle"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: '14.05vw',
              lineHeight: 0.88,
              letterSpacing: '-0.035em',
              whiteSpace: 'nowrap',
              color: 'var(--color-accent)',
            }}
          >
            {LINE2.split('').map((ch, i) => (
              <span key={i} data-letter style={{ display: 'inline-block' }}>{ch}</span>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={metaRef}
        style={{
          position: 'relative',
          zIndex: 4,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 'var(--space-8)',
          flexWrap: 'wrap',
          marginTop: 'calc(var(--space-8) * 2)',
          padding: '0 clamp(0px,4vw,52px)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'baseline' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
            Front-end developer
          </span>
          <span style={{ fontSize: 13, lineHeight: 1.5, maxWidth: '32ch', color: 'color-mix(in srgb, var(--color-text) 66%, transparent)' }}>
            React, GSAP, SEO optimization, performance, accessibility, and a keen eye for design. I build fast, interactive websites that are a joy to use.
          </span>
        </div>
        <button
          onClick={() => ScrollSmoother.get()?.scrollTo('#work', true, 'top top')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
            flex: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Scroll
          <span style={{ display: 'block', animation: 'bob 2s ease-in-out infinite' }}>
            <svg width="13" height="20" viewBox="0 0 13 20" fill="none">
              <path d="M6.5 1V19M6.5 19L12 13M6.5 19L1 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
