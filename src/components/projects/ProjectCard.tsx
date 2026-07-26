import type { DecoratedProject } from '../../types/project';

interface Props {
  project: DecoratedProject;
  onOpen: (id: string) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  const p = project;
  return (
    <article
      data-card
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#1b1d2b' }}>
        <img src={p.cover} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 20, letterSpacing: '-0.015em' }}>{p.name}</h3>
          <span style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 58%, transparent)', flex: 'none' }}>{p.year}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'color-mix(in srgb, var(--color-text) 66%, transparent)', flex: 1 }}>{p.summary}</p>
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
  );
}
