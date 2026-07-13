import { memo } from 'react';
import Logo from '../common/Logo';
import './Footer.css';

const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo">
              <Logo size={36} className="logo-icon" />
              <span className="logo-text">
                shivanand<span className="logo-accent">.dev</span>
              </span>
            </a>
            <p>
              Building digital experiences that make an impact. Always open to new opportunities and
              collaborations.
            </p>
          </div>
          <div className="footer-links-col">
            <h4>Navigation</h4>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </div>
          <div className="footer-links-col">
            <h4>Connect</h4>
            <a href="https://github.com/shiva" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/shiva" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://twitter.com/shiva" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="mailto:shivanandgupta316@gmail.com">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Shivanand Gupta. Designed &amp; built with passion.</p>
          <p className="footer-tech">Built with React, Vite &amp; Express</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
