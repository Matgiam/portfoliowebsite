const items = ['Open to work', 'Junior front-end', 'Brussels & remote', 'Available now'];

export default function AvailabilityMarquee() {
  const content = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(24px,3vw,52px)',
      paddingRight: 'clamp(24px,3vw,52px)',
      fontSize: 11,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
    }}>
      {items.map((item, i) => (
        <span key={i}>
          <span>{item}</span>
          {i < items.length - 1 && <span style={{ color: 'var(--color-accent)' }}>/</span>}
        </span>
      ))}
      <span style={{ color: 'var(--color-accent)' }}>/</span>
    </div>
  );

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'var(--space-4) 0',
      backgroundColor: '#1d1f2f',
      backgroundImage: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--color-text) 16%, transparent) 48px, color-mix(in srgb, var(--color-text) 16%, transparent) calc(100% - 48px), transparent) no-repeat bottom / 100% 1px',
    }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee-reverse 34s linear infinite' }}>
        {content}
        {content}
      </div>
    </div>
  );
}
