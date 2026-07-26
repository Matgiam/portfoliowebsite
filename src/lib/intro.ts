type Listener = () => void;

let hasPlayed = false;
let started = false;
const startListeners: Listener[] = [];

export const intro = {
  get hasPlayed() {
    return hasPlayed;
  },

  start() {
    if (started) return;
    started = true;
    hasPlayed = true;
    for (const fn of startListeners) fn();
    startListeners.length = 0;
  },

  onStart(fn: Listener): () => void {
    if (started) {
      fn();
      return () => {};
    }
    startListeners.push(fn);
    return () => {
      const i = startListeners.indexOf(fn);
      if (i !== -1) startListeners.splice(i, 1);
    };
  },
};

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
