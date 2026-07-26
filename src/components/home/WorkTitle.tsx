import { Link } from 'react-router-dom';

export default function WorkTitle() {
  return (
    <section
      id="work"
      style={{
        background: '#0e0f1b',
        position: 'relative',
        minHeight: '78vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 'calc(var(--space-8) * 1.6)',
        padding: 'calc(var(--space-8) * 4) clamp(20px,5vw,72px) calc(var(--space-8) * 2)',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <h2 data-mask className="section-title-lg" style={{
          margin: 0,
          fontFamily: 'var(--font-heading)',
          fontWeight: 500,
          fontSize: '17.2vw',
          lineHeight: 0.84,
          letterSpacing: '-0.035em',
          whiteSpace: 'nowrap',
        }}>
          SELECTED
        </h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
        <div style={{ overflow: 'hidden' }}>
          <h2 data-mask className="section-title-lg" style={{
            margin: 0,
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: '17.2vw',
            lineHeight: 0.84,
            letterSpacing: '-0.035em',
            whiteSpace: 'nowrap',
            color: 'var(--color-accent-400)',
          }}>
            WORK
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'flex-start', maxWidth: '34ch', paddingBottom: '1vw' }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>
            School briefs, client work and things I built to learn something new. Drag through, open one for the detail.
          </p>
          <Link
            data-magnetic
            className="btn btn-primary"
            to="/projects"
            style={{ fontSize: 13, padding: 'var(--space-4) var(--space-6)', minHeight: 44 }}
          >
            All projects
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 2 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
