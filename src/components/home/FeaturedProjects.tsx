import { useEffect, useRef, useState } from 'react';
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
  const [active, setActive] = useState(0);

  // Mobile only: the strip is a native snap carousel, so track which card is centred.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const onScroll = () => {
      const centre = strip.scrollLeft + strip.clientWidth / 2;
      let closest = 0;
      let smallest = Infinity;
      Array.from(strip.children).forEach((child, i) => {
        const card = child as HTMLElement;
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
        if (distance < smallest) {
          smallest = distance;
          closest = i;
        }
      });
      setActive(closest);
    };

    strip.addEventListener('scroll', onScroll, { passive: true });
    return () => strip.removeEventListener('scroll', onScroll);
  }, [projects.length]);

  // Native smooth scrollTo gets cancelled by `scroll-snap-type: mandatory`, so drive
  // scrollLeft frame by frame instead and let the snap settle on the exact target.
  const goTo = (i: number) => {
    const strip = stripRef.current;
    const card = strip?.children[i] as HTMLElement | undefined;
    if (!strip || !card) return;

    const to = card.offsetLeft - (strip.clientWidth - card.offsetWidth) / 2;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      strip.scrollLeft = to;
      return;
    }

    // Mandatory snapping yanks every intermediate frame back to the nearest snap
    // point, so suspend it while the tween runs and let it re-engage on the target.
    const restore = () => {
      strip.style.scrollSnapType = '';
    };
    strip.style.scrollSnapType = 'none';

    const proxy = { x: strip.scrollLeft };
    gsap.to(proxy, {
      x: to,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => {
        strip.scrollLeft = proxy.x;
      },
      onComplete: restore,
      onInterrupt: restore,
    });
  };

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
            key={`${p.id}-${i}`}
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
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#1b1d2b' }}>
              <img src={p.cover} alt={p.name} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
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

      <div className="featured-pager">
        <span className="featured-count" aria-hidden="true">
          {String(active + 1).padStart(2, '0')}
          <i>/</i>
          {String(projects.length).padStart(2, '0')}
        </span>
        <span className="featured-dots">
          {projects.map((p, i) => (
            <button
              key={`dot-${p.id}-${i}`}
              type="button"
              className={i === active ? 'is-active' : undefined}
              onClick={() => goTo(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === active}
            />
          ))}
        </span>
      </div>

      <style>{`
        .featured-pager { display: none; }

        @media (max-width: 759px) {
          #work-strip {
            min-height: auto !important;
            padding: calc(var(--space-8) * 2.4) 0;
            overflow: visible !important;
          }
          /* One card centred per screen, neighbours peeking in: 78 + 2*11 = 100vw. */
          .featured-strip {
            width: 100% !important;
            gap: 4vw !important;
            padding: 4px 11vw !important;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            overscroll-behavior-x: contain;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            will-change: auto !important;
            transform: none !important;
          }
          .featured-strip::-webkit-scrollbar { display: none; }
          .featured-card {
            width: 78vw !important;
            scroll-snap-align: center;
          }
          .featured-pager {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-6);
            padding: var(--space-6) clamp(16px, 5vw, 40px) 0;
          }
          .featured-count {
            font-family: var(--font-heading);
            font-size: 11px;
            letter-spacing: 0.14em;
            color: color-mix(in srgb, var(--color-text) 58%, transparent);
          }
          .featured-count i {
            font-style: normal;
            margin: 0 4px;
            opacity: 0.5;
          }
          .featured-dots {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .featured-dots button {
            position: relative;
            width: 6px;
            height: 6px;
            padding: 0;
            border: 0;
            border-radius: 99px;
            background: color-mix(in srgb, var(--color-text) 24%, transparent);
            transition: width 0.3s ease, background 0.3s ease;
          }
          /* Keep the dot 6px but give it a 44px-tall touch target. */
          .featured-dots button::after {
            content: '';
            position: absolute;
            inset: -19px -3px;
          }
          .featured-dots button.is-active {
            width: 20px;
            background: var(--color-accent);
          }
        }

        @media (max-width: 759px) and (prefers-reduced-motion: reduce) {
          .featured-dots button { transition: none; }
        }
      `}</style>
    </section>
  );
}
