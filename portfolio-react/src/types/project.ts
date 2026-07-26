export interface Project {
  id: string;
  name: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  content: string;
  link: string;
  live: boolean;
  images: string[];
}

export interface DecoratedProject extends Project {
  cover: string;
  index: string;
  live: boolean;
  offline: boolean;
  status: 'Live' | 'Offline';
  dot: string;
}
