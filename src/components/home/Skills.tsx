interface SkillPillProps {
  icon: string;
  label: string;
}

function SkillPill({ icon, label }: SkillPillProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px 10px 10px', border: '1px solid color-mix(in srgb, var(--color-text) 14%, transparent)', borderRadius: 100, minHeight: 44 }}>
      <span style={{ width: 30, height: 30, flex: 'none', borderRadius: '50%', overflow: 'hidden', background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </span>
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}

interface SkillRowProps {
  title: string;
  level: string;
  children: React.ReactNode;
  last?: boolean;
}

function SkillRow({ title, level, children, last }: SkillRowProps) {
  return (
    <div
      data-skillrow
      className="skill-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,0.32fr) minmax(0,1fr)',
        gap: 'var(--space-8)',
        alignItems: 'start',
        padding: 'calc(var(--space-8) * 1.2) 0',
        borderTop: '1px solid color-mix(in srgb, var(--color-text) 16%, transparent)',
        borderBottom: last ? '1px solid color-mix(in srgb, var(--color-text) 16%, transparent)' : undefined,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(20px,2.2vw,34px)', letterSpacing: '-0.02em' }}>{title}</span>
        <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-accent-300)' }}>{level}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        {children}
      </div>
    </div>
  );
}

interface LanguageProps {
  name: string;
  level: string;
  bars: number;
}

function Language({ name, level, bars }: LanguageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 20 }}>{name}</span>
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 58%, transparent)' }}>{level}</span>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{
            flex: 1,
            height: 4,
            background: i < bars ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-text) 18%, transparent)',
            display: 'block',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        background: 'linear-gradient(180deg,#1d1f2f 0%,#12131f 30%)',
        position: 'relative',
        padding: 'calc(var(--space-8) * 4) clamp(20px,5vw,72px)',
      }}
    >
      <div style={{ overflow: 'hidden', marginBottom: 'calc(var(--space-8) * 2.4)' }}>
        <h2 data-mask className="section-title-lg" style={{
          margin: 0,
          fontFamily: 'var(--font-heading)',
          fontWeight: 500,
          fontSize: '17.2vw',
          lineHeight: 0.84,
          letterSpacing: '-0.035em',
          whiteSpace: 'nowrap',
        }}>
          TOOLKIT
        </h2>
      </div>

      <SkillRow title="Front-end" level="Daily">
        <SkillPill icon="/assets/icons/react.png" label="React" />
        <SkillPill icon="/assets/icons/gsap.png" label="GSAP" />
        <SkillPill icon="/assets/icons/motion.png" label="Motion" />
        <SkillPill icon="/assets/icons/html.png" label="HTML" />
        <SkillPill icon="/assets/icons/css.png" label="CSS" />
      </SkillRow>

      <SkillRow title="Data & tooling" level="Comfortable">
        <SkillPill icon="/assets/icons/mongodb.png" label="MongoDB" />
        <SkillPill icon="/assets/icons/vscode.png" label="VS Code" />
        <SkillPill icon="/assets/icons/figma.png" label="Figma" />
      </SkillRow>

      <SkillRow title="Design, 3D & audio" level="Alongside">
        <SkillPill icon="/assets/icons/blender.png" label="Blender" />
        <SkillPill icon="/assets/icons/ps.png" label="Photoshop" />
        <SkillPill icon="/assets/icons/ai.png" label="Illustrator" />
        <SkillPill icon="/assets/icons/pr.png" label="Premiere Pro" />
        <SkillPill icon="/assets/icons/ableton.webp" label="Ableton Live" />
      </SkillRow>

      <SkillRow title="Languages" level="Spoken" last>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 'var(--space-8)', width: '100%' }}>
          <Language name="Dutch" level="Native" bars={5} />
          <Language name="French" level="Native" bars={5} />
          <Language name="English" level="Fluent" bars={4} />
        </div>
      </SkillRow>

      <style>{`
        @media (max-width: 768px) {
          .skill-row {
            grid-template-columns: 1fr !important;
            gap: var(--space-4) !important;
          }
        }
      `}</style>
    </section>
  );
}
