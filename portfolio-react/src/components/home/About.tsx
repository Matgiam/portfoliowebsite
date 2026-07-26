export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      style={{
        background: '#1d1f2f',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)',
        alignItems: 'stretch',
        minHeight: '100vh',
      }}
    >
      <div className="about-image" style={{ position: 'relative', overflow: 'hidden', background: '#101120' }}>
        <img data-parallax src="/assets/about-warm.JPG" alt="Matteo Giambarresi" style={{ position: 'absolute', inset: 0, width: '100%', height: '114%', objectFit: 'cover', objectPosition: 'center 24%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 55%, color-mix(in srgb, var(--color-bg) 92%, transparent) 100%)' }} />
        <div style={{ position: 'absolute', left: 'clamp(20px,3vw,44px)', bottom: 'clamp(20px,3vw,44px)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>Matteo Giambarresi</span>
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent-300)' }}>Brussels 2026</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'calc(var(--space-8) * 1.4)', padding: 'calc(var(--space-8) * 4) clamp(20px,5vw,72px)' }}>
        <div style={{ overflow: 'hidden' }}>
          <h2 data-mask style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(38px,7.4vw,116px)', lineHeight: 0.88, letterSpacing: '-0.035em' }}>
            About<br />me
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '46ch' }}>
          <p data-reveal style={{ margin: 0, fontSize: 'clamp(16px,1.35vw,20px)', lineHeight: 1.6, color: 'var(--color-text)' }}>
            Twenty-one, Brussels. Last year of Multimedia &amp; Creative Technology at Erasmushogeschool Brussel.
          </p>
          <p data-reveal style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)' }}>
            I started with school briefs and kept going after the deadlines: rebuilding the same page three times until the motion felt right. That&apos;s the part I chase: a build that responds the instant you touch it.
          </p>
          <p data-reveal style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)' }}>
            Piano, guitar, drums since I was small. Timing is timing, whether it&apos;s a fill or an ease curve.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { label: 'Studying', value: 'Multimedia & Creative Technology' },
            { label: 'Based in', value: 'Brussels, Belgium' },
            { label: 'Looking for', value: 'A junior front-end role', accent: true },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              data-reveal
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 'var(--space-6)',
                padding: 'var(--space-4) 0',
                borderTop: '1px solid color-mix(in srgb, var(--color-text) 16%, transparent)',
                borderBottom: i === arr.length - 1 ? '1px solid color-mix(in srgb, var(--color-text) 16%, transparent)' : undefined,
              }}
            >
              <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 58%, transparent)', flexShrink: 0 }}>{row.label}</span>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: 'clamp(16px,1.5vw,22px)',
                letterSpacing: '-0.015em',
                textAlign: 'right',
                color: row.accent ? 'var(--color-accent-300)' : undefined,
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-section {
            grid-template-columns: 1fr !important;
          }
          .about-image {
            min-height: 50vh;
          }
        }
      `}</style>
    </section>
  );
}
