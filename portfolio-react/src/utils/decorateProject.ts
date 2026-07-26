import type { Project, DecoratedProject } from '../types/project';

export function decorateProject(p: Project, i: number): DecoratedProject {
  const live = !!p.live && !!p.link;
  return {
    ...p,
    cover: p.images[0] || '',
    index: String(i + 1).padStart(2, '0'),
    live,
    offline: !live,
    status: live ? 'Live' : 'Offline',
    dot: live ? 'var(--color-accent)' : 'var(--color-neutral-500)',
  };
}
