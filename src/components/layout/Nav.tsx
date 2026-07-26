import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/all';
import { intro } from '../../lib/intro';

gsap.registerPlugin(ScrollSmoother);

interface Props {
  showNav?: boolean;
}

export default function Nav({ showNav = true }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!showNav) return;
    let ctx: gsap.Context | null = null;
    const off = intro.onStart(() => {
      ctx = gsap.context(() => {
        gsap.from(navRef.current!.children, {
          opacity: 0,
          y: -14,
          duration: 0.9,
          stagger: 0.06,
          ease: 'expo.out',
        });
      });
    });
    return () => { off(); ctx?.revert(); };
  }, [showNav]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (target: string) => {
    setMenuOpen(false);
    ScrollSmoother.get()?.scrollTo(target, true, 'top top');
  };

  if (!showNav) return null;

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 120,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)',
          padding: 'var(--space-4) clamp(16px,5vw,72px)',
          background: 'color-mix(in srgb, var(--color-bg) 70%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <button
          onClick={() => scrollTo('#home')}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            marginRight: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          MG
        </button>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          {['work', 'about', 'skills', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(`#${id}`)}
              style={{
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--color-text) 70%, transparent)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 14px 6px 12px',
              border: '1px solid color-mix(in srgb, var(--color-accent) 45%, transparent)',
              borderRadius: 100,
              minHeight: 44,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                animation: 'pulse 2.4s ease-in-out infinite',
              }}
            />
            <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--color-accent-300)' }}>
              Open to work
            </span>
          </div>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: 44,
            height: 44,
            padding: 0,
            position: 'relative',
            zIndex: 130,
          }}
        >
          <span style={{
            display: 'block',
            width: 20,
            height: 2,
            background: 'var(--color-text)',
            borderRadius: 2,
            position: 'absolute',
            left: 12,
            top: menuOpen ? 21 : 14,
            transform: menuOpen ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.3s, top 0.3s',
          }} />
          <span style={{
            display: 'block',
            width: 20,
            height: 2,
            background: 'var(--color-text)',
            borderRadius: 2,
            position: 'absolute',
            left: 12,
            top: 21,
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.2s',
          }} />
          <span style={{
            display: 'block',
            width: 20,
            height: 2,
            background: 'var(--color-text)',
            borderRadius: 2,
            position: 'absolute',
            left: 12,
            top: menuOpen ? 21 : 28,
            transform: menuOpen ? 'rotate(-45deg)' : 'none',
            transition: 'transform 0.3s, top 0.3s',
          }} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'color-mix(in srgb, var(--color-bg) 96%, transparent)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-8)',
          }}
        >
          {['work', 'about', 'skills', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(`#${id}`)}
              style={{
                fontSize: 24,
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--color-text)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
