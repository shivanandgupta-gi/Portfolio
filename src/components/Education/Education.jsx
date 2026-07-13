import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { education, certifications } from '../../data/education';
import './Education.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const Education = memo(function Education() {
  const eduData = useMemo(() => education, []);
  const certData = useMemo(() => certifications, []);

  return (
    <section className="section" id="education">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <span className="label-line"></span>
          <span className="label-text">05 — Education &amp; Certifications</span>
        </motion.div>
        <motion.h2
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          Academic background
        </motion.h2>

        <div className="edu-cert-grid">
          <motion.div
            className="edu-column"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <h3 className="block-title">
              <i className="ph ph-graduation-cap"></i> Education
            </h3>
            {eduData.map((edu) => (
              <div className="edu-card" key={edu.id}>
                <div className="edu-card-accent"></div>
                <div className="edu-card-body">
                  <h4>{edu.degree}</h4>
                  <p className="edu-field">{edu.field}</p>
                  <p className="edu-school">
                    <i className="ph ph-buildings"></i> {edu.school}
                  </p>
                  <p className="edu-year">
                    <i className="ph ph-calendar-blank"></i> {edu.period}
                  </p>
                  <div className="edu-score">
                    <span className="score-label">{edu.scoreLabel}</span>
                    <span className="score-value">{edu.scoreValue}</span>
                  </div>
                  {edu.coursework.length > 0 && (
                    <div className="edu-coursework">
                      {edu.coursework.map((c, i) => (
                        <span key={i}>{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="cert-column"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <h3 className="block-title">
              <i className="ph ph-certificate"></i> Certifications
            </h3>
            {certData.map((cert) => (
              <div className="cert-card" key={cert.id}>
                <div className="cert-card-icon">
                  <i className="ph ph-trophy"></i>
                </div>
                <div className="cert-card-info">
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                  <span className="cert-year">{cert.year}</span>
                </div>
                <a
                  href={cert.url}
                  className="cert-view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ph ph-arrow-square-out"></i>
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Education;
