import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-mask]').forEach((el) => {
        gsap.from(el, {
          yPercent: 106,
          duration: 1.25,
          ease: 'expo.out',
          scrollTrigger: { trigger: el.parentElement, start: 'top 88%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 30, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });

      gsap.utils.toArray<HTMLElement>('[data-skillrow]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });

      const words = gsap.utils.toArray<HTMLElement>('[data-word]');
      const man = document.querySelector<HTMLElement>('[data-manifesto]');
      if (words.length && man) {
        gsap.to(words, {
          color: '#e9e9ed',
          stagger: 1,
          ease: 'none',
          scrollTrigger: { trigger: man, start: 'top 72%', end: 'bottom 72%', scrub: 0.4 },
        });
      }

      const par = document.querySelector<HTMLElement>('[data-parallax]');
      if (par) {
        gsap.fromTo(par, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: par.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      }

      if (window.innerWidth > 759) {
        gsap.utils.toArray<HTMLElement>('[data-card-img]').forEach((img) => {
          gsap.fromTo(img, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.closest('[data-card]'), start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      }
    });

    return () => ctx.revert();
  }, []);
}
