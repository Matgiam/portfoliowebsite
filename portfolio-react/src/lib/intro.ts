const listeners: Array<() => void> = [];
let played = false;

function fire() {
  played = true;
  for (const fn of listeners) fn();
  listeners.length = 0;
}

export const intro = {
  start: fire,

  onStart(fn: () => void): () => void {
    if (played) {
      fn();
      return () => {};
    }
    listeners.push(fn);
    return () => {
      const i = listeners.indexOf(fn);
      if (i !== -1) listeners.splice(i, 1);
    };
  },

  get hasPlayed() {
    return played;
  },
};

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
