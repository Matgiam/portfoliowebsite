const items = ['React', 'GSAP', 'Motion', 'JavaScript', 'Blender', 'Design'];

export default function TechMarquee() {
  const content = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(28px,4vw,64px)',
      paddingRight: 'clamp(28px,4vw,64px)',
      fontFamily: 'var(--font-heading)',
      fontWeight: 500,
      fontSize: 'clamp(20px,2.6vw,40px)',
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap',
    }}>
      {items.map((item, i) => (
        <span key={i}>
          <span>{item}</span>
          {i < items.length - 1 && <span style={{ color: 'var(--color-accent)' }}>✳</span>}
        </span>
      ))}
      <span style={{ color: 'var(--color-accent)' }}>✳</span>
    </div>
  );

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'var(--space-6) 0',
      background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--color-accent) 40%, transparent) 48px, color-mix(in srgb, var(--color-accent) 40%, transparent) calc(100% - 48px), transparent) no-repeat top / 100% 1px,
        linear-gradient(to right, transparent, color-mix(in srgb, var(--color-accent) 40%, transparent) 48px, color-mix(in srgb, var(--color-accent) 40%, transparent) calc(100% - 48px), transparent) no-repeat bottom / 100% 1px`,
    }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
        {content}
        {content}
      </div>
    </div>
  );
}
