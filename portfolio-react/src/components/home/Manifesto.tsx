const words = [
  'I', 'design', 'and', 'build', 'front-ends', 'React', 'for', 'structure,',
  'GSAP', 'for', 'the', 'feel,', 'and', 'a', 'stubborn', 'refusal', 'to',
  'ship', 'anything', 'that', 'stutters.',
];

export default function Manifesto() {
  return (
    <section
      data-manifesto
      style={{
        background: 'linear-gradient(180deg,#0e0f1b 0%,#161826 40%)',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'calc(var(--space-8) * 4) clamp(20px,5vw,72px)',
      }}
    >
      <p style={{
        margin: 0,
        fontFamily: 'var(--font-heading)',
        fontWeight: 500,
        fontSize: 'clamp(30px,6.6vw,110px)',
        lineHeight: 1.02,
        letterSpacing: '-0.03em',
        textWrap: 'pretty',
      }}>
        {words.map((w, i) => (
          <span key={i} data-word style={{ color: '#575b78' }}>
            {w}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}
