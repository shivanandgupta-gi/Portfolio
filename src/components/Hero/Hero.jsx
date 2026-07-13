import { useEffect, useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

const Hero = memo(function Hero() {
  const typedText = useTypingEffect();
  const statsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            let current = 0;
            const step = target / 50;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              entry.target.textContent = Math.floor(current);
            }, 30);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid-bg"></div>
      <div className="container hero-container">
        <div className="hero-left">
          <motion.div
            className="hero-availability"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="avail-pulse"></span>
            <span>Open to Work — Available Immediately</span>
          </motion.div>

          <div className="hero-title">
            <div className="hero-line">
              <motion.span
                className="hero-line-inner"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                Software
              </motion.span>
            </div>
            <div className="hero-line">
              <motion.span
                className="hero-line-inner"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                Engineer &amp;
              </motion.span>
            </div>
            <div className="hero-line">
              <motion.span
                className="hero-line-inner gradient-text"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                Full Stack Developer
              </motion.span>
            </div>
          </div>

          <motion.p
            className="hero-desc"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            Hi, I&apos;m <strong>Shivanand Gupta</strong> — I build performant, scalable web applications
            with modern technologies. Passionate about clean code, great UX, and turning complex
            problems into elegant solutions.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
          >
            <a href="#projects" className="btn-hero-primary" onClick={(e) => scrollTo(e, 'projects')}>
              <span>View My Work</span>
              <i className="ph ph-arrow-right"></i>
            </a>
            <a href="https://drive.google.com/uc?export=download&id=1GsVOCpL7-jFMVHE10QlB408H4nKIg0cL" className="btn-hero-secondary" target="_blank" rel="noopener noreferrer">
              <i className="ph ph-file-pdf"></i>
              <span>Download CV</span>
            </a>
            <a href="#contact" className="btn-hero-secondary" onClick={(e) => scrollTo(e, 'contact')}>
              <i className="ph ph-chat-dots"></i>
              <span>Let&apos;s Talk</span>
            </a>
          </motion.div>

          <motion.div
            className="hero-metrics"
            initial="hidden"
            animate="visible"
            custom={5}
            variants={fadeUp}
          >
            <div className="metric">
              <span
                className="metric-value"
                ref={(el) => (statsRef.current[0] = el)}
                data-count="5"
              >
                0
              </span>
              <span className="metric-plus">+</span>
              <span className="metric-label">Projects Delivered</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span
                className="metric-value"
                ref={(el) => (statsRef.current[1] = el)}
                data-count="8"
              >
                0
              </span>
              <span className="metric-plus">+</span>
              <span className="metric-label">Tech Stack</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span
                className="metric-value"
                ref={(el) => (statsRef.current[2] = el)}
                data-count="3"
              >
                0
              </span>
              <span className="metric-plus">+</span>
              <span className="metric-label">Certifications</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="hero-card-stack">
            <div className="floating-badge badge-react">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                alt="React"
                width="22"
                height="22"
              />
              React
            </div>
            <div className="floating-badge badge-node">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                alt="Node"
                width="22"
                height="22"
              />
              Node.js
            </div>
            <div className="floating-badge badge-java">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                alt="Java"
                width="22"
                height="22"
              />
              Java
            </div>

            <div className="hero-code-card">
              <div className="code-card-header">
                <div className="code-card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="code-card-title">developer.ts</span>
                <div className="code-card-actions">
                  <i className="ph ph-copy"></i>
                </div>
              </div>
              <div className="code-card-body">
                <div className="code-line">
                  <span className="ln">1</span>
                  <span className="kw">interface</span> <span className="tp">Developer</span> {'{'}
                </div>
                <div className="code-line">
                  <span className="ln">2</span> <span className="pr">name</span>:{' '}
                  <span className="st">&quot;Shivanand Gupta&quot;</span>;
                </div>
                <div className="code-line">
                  <span className="ln">3</span> <span className="pr">role</span>:{' '}
                  <span className="st">&quot;Software Engineer&quot;</span>;
                </div>
                <div className="code-line">
                  <span className="ln">4</span> <span className="pr">skills</span>:{' '}
                  <span className="tp">string</span>[];
                </div>
                <div className="code-line">
                  <span className="ln">5</span> <span className="pr">passion</span>:{' '}
                  <span className="st">&quot;Building great products&quot;</span>;
                </div>
                <div className="code-line">
                  <span className="ln">6</span>{'}'}
                </div>
                <div className="code-line">
                  <span className="ln">7</span>
                </div>
                <div className="code-line">
                  <span className="ln">8</span>
                  <span className="kw">const</span> <span className="vr">me</span>:{' '}
                  <span className="tp">Developer</span> = {'{'}
                </div>
                <div className="code-line">
                  <span className="ln">9</span> <span className="pr">name</span>:{' '}
                  <span className="st">&quot;Shivanand Gupta&quot;</span>,
                </div>
                <div className="code-line">
                  <span className="ln">10</span> <span className="pr">role</span>:{' '}
                  <span className="st">
                    &quot;{typedText}
                    <span className="cursor-blink">|</span>&quot;
                  </span>
                  ,
                </div>
                <div className="code-line">
                  <span className="ln">11</span> <span className="pr">skills</span>:[{' '}
                  <span className="st">&quot;React&quot;</span>,{' '}
                  <span className="st">&quot;Node&quot;</span>,{' '}
                  <span className="st">&quot;Java&quot;</span>],
                </div>
                <div className="code-line">
                  <span className="ln">12</span> <span className="pr">passion</span>:{' '}
                  <span className="st">&quot;Building great products&quot;</span>
                </div>
                <div className="code-line">
                  <span className="ln">13</span>{'}'};
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-cue">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
});

export default Hero;
