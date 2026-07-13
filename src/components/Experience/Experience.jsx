import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';
import './Experience.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

function HighlightText({ html }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

const Experience = memo(function Experience() {
  const sorted = useMemo(() => experiences, []);

  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <span className="label-line"></span>
          <span className="label-text">03 — Experience</span>
        </motion.div>
        <motion.h2
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          Where I&apos;ve worked
        </motion.h2>

        <div className="exp-timeline">
          {sorted.map((exp, i) => (
            <motion.div
              className="exp-item"
              key={exp.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="exp-marker">
                <div className="exp-dot"></div>
                {i < sorted.length - 1 && <div className="exp-line-v"></div>}
              </div>
              <div className="exp-card">
                <div className="exp-card-top">
                  <div>
                    <span className={`exp-badge ${exp.badgeClass}`}>{exp.type}</span>
                    <h3>{exp.role}</h3>
                    <h4>
                      <i className={`ph ${exp.companyIcon}`}></i> {exp.company}
                    </h4>
                  </div>
                  <span className="exp-date">
                    <i className="ph ph-calendar-blank"></i> {exp.period}
                  </span>
                </div>
                <ul className="exp-list">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>
                      <HighlightText html={h} />
                    </li>
                  ))}
                </ul>
                <div className="exp-tags">
                  {exp.tech.map((t, j) => (
                    <span key={j}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;
