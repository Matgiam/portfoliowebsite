interface Props {
  tags: string[];
  active: string;
  onFilter: (tag: string) => void;
}

export default function FilterBar({ tags, active, onFilter }: Props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)', padding: '0 clamp(16px,5vw,72px) calc(var(--space-8) * 1.4)' }}>
      <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 58%, transparent)', marginRight: 'var(--space-3)' }}>
        Filter
      </span>
      {tags.map((tag) => (
        <button
          key={tag}
          className="btn"
          onClick={() => onFilter(tag)}
          style={{
            fontSize: 12,
            padding: 'var(--space-4) var(--space-6)',
            minHeight: 44,
            borderColor: tag === active ? 'var(--color-accent)' : 'var(--color-divider)',
            color: tag === active ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-text) 70%, transparent)',
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
