import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { DecoratedProject } from '../../types/project';

interface Props {
  project: DecoratedProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const g = gsap;
    const back = backdropRef.current;
    const panel = panelRef.current;
    if (!back || !panel) return;

    g.from(back, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    g.from(panel, { opacity: 0, y: 48, duration: 0.75, ease: 'expo.out' });
    g.from(panel.querySelectorAll('h2, .tag, p, [data-magnetic], img'), {
      opacity: 0, y: 24, duration: 0.7, stagger: 0.035, ease: 'expo.out', delay: 0.1,
    });
  }, [project]);

  if (!project) return null;

  const p = project;

  return (
    <div
      ref={backdropRef}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        overflowY: 'auto',
        background: 'color-mix(in srgb, #0c0d16 62%, transparent)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        padding: 'clamp(16px,5vh,72px) clamp(16px,5vw,40px)',
      }}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(900px,100%)',
          margin: '0 auto',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'clamp(24px,3.4vw,58px)',
        }}
      >
        <button
          className="btn btn-icon btn-secondary"
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'fixed', top: 'var(--space-6)', right: 'var(--space-6)', background: 'var(--color-bg)', zIndex: 310 }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M1 1L15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M1 15L15 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <h2 style={{ margin: '0 0 var(--space-6)', fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(32px,5.4vw,74px)', lineHeight: 0.94, letterSpacing: '-0.03em', maxWidth: '20ch' }}>
          {p.name}
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'calc(var(--space-8) * 1.2)' }}>
          {p.stack.map((t) => (
            <span key={t} className="tag tag-accent">{t}</span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 'var(--space-6)', marginBottom: 'calc(var(--space-8) * 1.4)' }}>
          {[
            { label: 'Year', value: p.year },
            { label: 'Role', value: p.role },
          ].map((item) => (
            <div key={item.label} style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid color-mix(in srgb, var(--color-text) 16%, transparent)' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 58%, transparent)', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 14 }}>{item.value}</div>
            </div>
          ))}
          <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid color-mix(in srgb, var(--color-text) 16%, transparent)' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 58%, transparent)', marginBottom: 3 }}>Status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.dot, display: 'block' }} />
              {p.status}
            </div>
          </div>
        </div>

        <p style={{ margin: '0 0 calc(var(--space-8) * 1.4)', fontSize: 'clamp(15px,1.2vw,17px)', lineHeight: 1.7, maxWidth: '58ch', color: 'color-mix(in srgb, var(--color-text) 82%, transparent)' }}>
          {p.content}
        </p>

        {p.live ? (
          <a className="btn btn-primary" data-magnetic href={p.link} target="_blank" rel="noopener" style={{ fontSize: 14, padding: 'var(--space-4) var(--space-8)', minHeight: 44 }}>
            Visit website
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 3 }}>
              <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" disabled style={{ fontSize: 14, padding: 'var(--space-4) var(--space-8)' }}>Site offline</button>
            <span style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 58%, transparent)' }}>Not hosted any more. Screenshots below.</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'calc(var(--space-8) * 1.8)' }}>
          {p.images.map((src, i) => (
            <img key={i} src={src} alt={p.name} style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', display: 'block' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
