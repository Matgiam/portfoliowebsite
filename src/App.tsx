import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import gsap from 'gsap';
import projectsData from './data/projects.json';
import type { Project, DecoratedProject } from './types/project';
import { decorateProject } from './utils/decorateProject';
import Nav from './components/layout/Nav';
import Loader from './components/layout/Loader';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectModal from './components/projects/ProjectModal';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const allProjects = (projectsData as Project[]).map((p, i) => decorateProject(p, i));

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false);
      ScrollTrigger.refresh();
    }
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true,
        // allowNestedScroll lets a touch drag inside a scrollable child (the mobile
        // work carousel) run natively instead of being swallowed by the normalizer.
        // debounce mirrors what ScrollSmoother passes when normalizeScroll is `true`.
        normalizeScroll: { debounce: true, allowNestedScroll: true },
        ignoreMobileResize: true,
      });
    });
    return () => ctx.revert();
  }, []);

  const openModal = (id: string) => {
    setOpenId(id);
    ScrollSmoother.get()?.paused(true);
  };

  const closeModal = () => {
    setOpenId(null);
    ScrollSmoother.get()?.paused(false);
    ScrollTrigger.refresh();
  };

  const openProject = openId ? allProjects.find((p) => p.id === openId) || null : null;

  return (
    <>
      {isHome && <Loader />}
      <Nav showNav={isHome} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<HomePage onOpen={openModal} />} />
            <Route path="/projects" element={<ProjectsPage onOpen={openModal} />} />
          </Routes>
        </div>
      </div>
      <ProjectModal project={openProject} onClose={closeModal} />
    </>
  );
}
