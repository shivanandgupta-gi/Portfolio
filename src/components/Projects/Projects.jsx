import { useState, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import './Projects.css';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const Projects = memo(function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(
    () => (activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );

  const handleFilter = useCallback((value) => setActiveFilter(value), []);

  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <span className="label-line"></span>
          <span className="label-text">04 — Projects</span>
        </motion.div>
        <div className="section-top-row">
          <motion.h2
            className="section-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            Featured work
          </motion.h2>
          <div className="project-filters">
            {filters.map((f) => (
              <button
                key={f.value}
                className={`filter-pill ${activeFilter === f.value ? 'active' : ''}`}
                onClick={() => handleFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          <AnimatePresence mode="wait">
            {filtered.map((project) => (
              <motion.article
                className="project-card"
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
              >
                <div className="project-visual">
                  <div className="project-icon-bg">
                    <i className={`ph ${project.icon}`}></i>
                  </div>
                  <div className="project-hover-overlay">
                    <a href={project.liveUrl} className="proj-action">
                      <i className="ph ph-arrow-square-out"></i> Live Demo
                    </a>
                    <a href={project.codeUrl} className="proj-action">
                      <i className="ph ph-github-logo"></i> Code
                    </a>
                    </div>
                </div>
                <div className="project-body">
                  <span className="project-category-tag">
                    {project.category === 'fullstack' ? 'Full Stack' : project.category}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-stack">
                    {project.tech.map((t, j) => (
                      <span key={j}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

export default Projects;
