import { useEffect, useCallback } from 'react';
import gsap from 'gsap';

export function useMagnetic() {
  const bind = useCallback((el: HTMLElement) => {
    if (el.dataset.magBound) return;
    el.dataset.magBound = '1';

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.26,
        y: (e.clientY - (r.top + r.height / 2)) * 0.34,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-magnetic]');
    const cleanups = Array.from(elements).map((el) => bind(el));
    return () => cleanups.forEach((fn) => fn?.());
  }, [bind]);
}
