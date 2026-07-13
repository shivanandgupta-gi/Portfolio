import { memo } from 'react';
import { motion } from 'framer-motion';
import Logo from '../common/Logo';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const About = memo(function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <span className="label-line"></span>
          <span className="label-text">01 — About Me</span>
        </motion.div>
        <motion.h2
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          Get to know me
        </motion.h2>
        <motion.div
          className="about-layout"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className="about-visual">
            <div className="about-avatar-frame">
              <div className="about-avatar">
                <Logo size={120} />
              </div>
              <div className="avatar-ring"></div>
            </div>
            <div className="about-quick-stats">
              <div className="quick-stat">
                <i className="ph ph-map-pin"></i>
                <span>India</span>
              </div>
              <div className="quick-stat">
                <i className="ph ph-graduation-cap"></i>
                <span>B.Tech CSE</span>
              </div>
              <div className="quick-stat">
                <i className="ph ph-globe"></i>
                <span>English, Hindi</span>
              </div>
              <div className="quick-stat">
                <i className="ph ph-code"></i>
                <span>Open Source</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <h3 className="content-heading">
              I&apos;m <span className="gradient-text">Shivanand Gupta</span>
            </h3>
            <p className="about-tagline">
              Software Engineer who turns ideas into impactful, production-ready products.
            </p>
            <div className="about-text-block">
              <p>
                Recent Computer Science graduate with deep expertise in full-stack development. My
                journey began with curiosity and evolved into a relentless drive to build software that
                makes a real difference.
              </p>
              <p>
                I specialize in crafting modern web applications using <strong>React</strong>,{' '}
                <strong>Node.js</strong>, <strong>Java Spring Boot</strong>, and{' '}
                <strong>TypeScript</strong>. I write clean, maintainable code and believe in
                engineering solutions that are both performant and beautiful.
              </p>
            </div>
            <div className="about-cta-row">
              <a href="https://drive.google.com/uc?export=download&id=1GsVOCpL7-jFMVHE10QlB408H4nKIg0cL" className="btn-primary" target="_blank" rel="noopener noreferrer">
                <i className="ph ph-download-simple"></i> Download Resume
              </a>
              <a href="#contact" className="btn-text">
                Get in touch <i className="ph ph-arrow-right"></i>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default About;
