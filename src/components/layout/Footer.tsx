import { Link } from 'react-router-dom';
import { ScrollSmoother } from 'gsap/all';

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      padding: 'calc(var(--space-8) * 1.6) clamp(16px,5vw,72px) calc(var(--space-8) * 1.4)',
      background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--color-text) 16%, transparent) 48px, color-mix(in srgb, var(--color-text) 16%, transparent) calc(100% - 48px), transparent) no-repeat top / 100% 1px, #22265a',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 58%, transparent)' }}>
          &copy; 2026 Matteo Giambarresi, Brussels
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <Link to="/projects" style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
            All projects
          </Link>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener" style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
            LinkedIn
          </a>
          <a href="https://github.com/MatteoGiambarresi" target="_blank" rel="noopener" style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
            GitHub
          </a>
          <button
            onClick={() => ScrollSmoother.get()?.scrollTo(0, true, 'top top')}
            style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)', background: 'none', border: 'none', cursor: 'pointer', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
