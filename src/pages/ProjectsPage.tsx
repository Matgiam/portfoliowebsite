import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import type { Project } from '../types/project';
import { decorateProject } from '../utils/decorateProject';
import { useMagnetic } from '../hooks/useMagnetic';
import FilterBar from '../components/projects/FilterBar';
import ProjectCard from '../components/projects/ProjectCard';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const allProjects = (projectsData as Project[]).map((p, i) => decorateProject(p, i));

interface Props {
  onOpen: (id: string) => void;
}

export default function ProjectsPage({ onOpen }: Props) {
  const [filter, setFilter] = useState('All');
  useMagnetic();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-card]').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: 'expo.out',
          delay: 0.1 + (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });
    });

    return () => ctx.revert();
  }, [filter]);

  const tags = ['All'];
  allProjects.forEach((p) =>
    p.stack.forEach((t) => {
      if (!tags.includes(t)) tags.push(t);
    }),
  );

  const visible =
    filter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.stack.includes(filter));

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        background: 'var(--color-bg)',
        minHeight: '100vh',
      }}
    >
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-6)',
        padding: 'var(--space-4) clamp(16px,5vw,72px)',
        background: 'color-mix(in srgb, var(--color-bg) 78%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: 'color-mix(in srgb, var(--color-text) 72%, transparent)',
            marginRight: 'auto',
            minHeight: 44,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hide-mobile">Matteo Giambarresi</span>
          <span className="show-mobile">MG</span>
        </Link>
        <Link
          to="/#contact"
          style={{
            fontSize: 13,
            color: 'color-mix(in srgb, var(--color-text) 68%, transparent)',
            minHeight: 44,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Contact
        </Link>
      </nav>

      <header
        style={{
          position: 'relative',
          padding: 'calc(var(--space-8) * 3) clamp(16px,5vw,72px) calc(var(--space-8) * 1.6)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          left: '-8%',
          top: '-40%',
          width: 'min(820px,90vw)',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 20%, transparent) 0%, transparent 62%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: 'var(--space-6)' }}>
          <h1 className="section-title-xl" style={{
            margin: 0,
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: '19.6vw',
            lineHeight: 0.84,
            letterSpacing: '-0.04em',
            whiteSpace: 'nowrap',
          }}>
            ARCHIVE
          </h1>
        </div>
        <p style={{
          position: 'relative',
          margin: 0,
          fontSize: 15,
          lineHeight: 1.7,
          maxWidth: '48ch',
          color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
        }}>
          School briefs, client work and things I built to learn something. Open one for the detail.
        </p>
      </header>

      <FilterBar tags={tags} active={filter} onFilter={setFilter} />

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))',
          gap: 'clamp(16px,1.8vw,26px)',
          padding: '0 clamp(16px,5vw,72px) calc(var(--space-8) * 3)',
        }}
      >
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </main>

      <footer
        style={{
          padding: 'calc(var(--space-8) * 1.6) clamp(16px,5vw,72px)',
          background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--color-text) 14%, transparent) 48px, color-mix(in srgb, var(--color-text) 14%, transparent) calc(100% - 48px), transparent) no-repeat top / 100% 1px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 58%, transparent)' }}>
            &copy; 2026 Matteo Giambarresi, Brussels
          </span>
          <Link to="/" style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
            Back to the portfolio &uarr;
          </Link>
        </div>
      </footer>

      <style>{`
        .hide-mobile { display: inline; }
        .show-mobile { display: none; }
        @media (max-width: 520px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: inline !important; }
        }
      `}</style>
    </div>
  );
}
