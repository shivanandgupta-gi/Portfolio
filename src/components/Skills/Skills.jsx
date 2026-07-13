import { useEffect, useRef, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { skillsMarquee, skillCategories } from '../../data/skills';
import './Skills.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const Skills = memo(function Skills() {
  const barRefs = useRef([]);

  const doubledMarquee = useMemo(() => [...skillsMarquee, ...skillsMarquee], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    barRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <span className="label-line"></span>
          <span className="label-text">02 — Skills</span>
        </motion.div>
        <motion.h2
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          Technologies I work with
        </motion.h2>

        <motion.div
          className="skills-marquee"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className="marquee-track">
            <div className="marquee-content">
              {skillsMarquee.map((s, i) => (
                <div className="marquee-item" key={i}>
                  <img src={s.icon} alt={s.name} width="24" height="24" loading="lazy" />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {doubledMarquee.slice(skillsMarquee.length).map((s, i) => (
                <div className="marquee-item" key={`dup-${i}`}>
                  <img src={s.icon} alt={s.name} width="24" height="24" loading="lazy" />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <motion.div
              className="skill-card"
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="skill-card-glow"></div>
              <div className="skill-card-icon">
                <i className={`ph ${cat.icon}`}></i>
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <div className="skill-card-bar">
                <div
                  className="skill-card-fill"
                  ref={(el) => (barRefs.current[i] = el)}
                  data-width={cat.percentage}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;
