import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import type { DecoratedProject } from '../../types/project';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface Props {
  projects: DecoratedProject[];
  onOpen: (id: string) => void;
}

export default function FeaturedProjects({ projects, onOpen }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const strip = stripRef.current;
    if (!wrap || !strip || !projects.length) return;
    if (window.innerWidth < 760) return;

    let ctx: gsap.Context | null = null;

    const setup = () => {
      const dist = strip.scrollWidth - window.innerWidth + 40;
      if (dist < 60) return;

      ctx = gsap.context(() => {
        gsap.to(strip, {
          x: -dist,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: `+=${dist + window.innerHeight * 0.3}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    const timer = setTimeout(setup, 100);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      ctx?.revert();
    };
  }, [projects]);

  return (
    <section
      id="work-strip"
      ref={wrapRef}
      style={{
        background: '#0e0f1b',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        ref={stripRef}
        className="featured-strip"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 'clamp(16px,1.6vw,26px)',
          padding: '0 clamp(20px,5vw,72px)',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {projects.map((p, i) => (
          <article
            key={p.id}
            data-card
            className="featured-card"
            style={{
              width: 'clamp(290px,32vw,430px)',
              flex: 'none',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#1b1d2b' }}>
              <img data-card-img src={p.cover} alt={p.name} style={{ width: '100%', height: '112%', objectFit: 'cover', objectPosition: 'top center' }} />
              <span style={{ position: 'absolute', top: 'var(--space-4)', left: 'var(--space-4)', fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 12, letterSpacing: '0.14em', color: 'var(--color-accent-300)' }}>
                {p.index}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 20, letterSpacing: '-0.015em' }}>{p.name}</h3>
                <span style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 58%, transparent)', flex: 'none' }}>{p.year}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)', flex: 1 }}>{p.summary}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.stack.map((t) => (
                  <span key={t} className="tag tag-neutral">{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                <button className="btn btn-primary" data-magnetic onClick={() => onOpen(p.id)} style={{ fontSize: 13, padding: 'var(--space-4) var(--space-6)', minHeight: 44 }}>
                  View project
                </button>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 58%, transparent)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.dot, display: 'block' }} />
                  {p.status}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        @media (max-width: 759px) {
          .featured-strip {
            width: 100% !important;
            flex-direction: column;
            align-items: stretch;
            gap: clamp(16px, 4vw, 26px) !important;
            padding: 0 clamp(16px, 5vw, 40px) !important;
            will-change: auto !important;
            transform: none !important;
          }
          .featured-card {
            width: 100% !important;
          }
          .featured-card img[data-card-img] {
            will-change: auto !important;
            transform: none !important;
          }
          #work-strip {
            min-height: auto !important;
            padding: calc(var(--space-8) * 3) 0;
            overflow: visible !important;
          }
        }
      `}</style>
    </section>
  );
}
