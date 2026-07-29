import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import projectsData from '../data/projects.json';
import type { Project, DecoratedProject } from '../types/project';
import { decorateProject } from '../utils/decorateProject';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { useMagnetic } from '../hooks/useMagnetic';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import TechMarquee from '../components/home/TechMarquee';
import WorkTitle from '../components/home/WorkTitle';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Manifesto from '../components/home/Manifesto';
import About from '../components/home/About';
import AvailabilityMarquee from '../components/home/AvailabilityMarquee';
import Skills from '../components/home/Skills';
import Contact from '../components/home/Contact';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const allProjects = (projectsData as Project[]).map((p, i) => decorateProject(p, i));

interface Props {
  onOpen: (id: string) => void;
}

export default function HomePage({ onOpen }: Props) {
  useScrollAnimations();
  useMagnetic();

  return (
    <div style={{ position: 'relative', width: '100%', background: 'var(--color-bg)' }}>
      <Hero />
      <TechMarquee />
      <WorkTitle />
      <FeaturedProjects projects={allProjects.slice(0, 8)} onOpen={onOpen} />
      <Manifesto />
      <About />
      <AvailabilityMarquee />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
