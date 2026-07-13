import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import './Contact.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(formData);
      addToast('Message sent successfully!', { type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      addToast(err.message || 'Failed to send message.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
          <span className="label-line"></span>
          <span className="label-text">06 — Contact</span>
        </motion.div>
        <motion.h2
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
          Let&apos;s work together
        </motion.h2>

        <div className="contact-layout">
          <motion.div
            className="contact-info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
          >
            <h3 className="contact-heading">
              Let&apos;s build <span className="gradient-text">something great</span> together.
            </h3>
            <p className="contact-desc">
              Whether you have a project in mind, a job opportunity, or just want to say hello —
              I&apos;d love to hear from you. Fill out the form and I&apos;ll get back to you within 24 hours.
            </p>
            <div className="contact-details">
              <a href="mailto:shivanandgupta316@gmail.com" className="contact-detail-item">
                <div className="contact-detail-icon">
                  <i className="ph ph-envelope"></i>
                </div>
                <div>
                  <span className="contact-detail-label">Email</span>
                  <span className="contact-detail-value">shivanandgupta316@gmail.com</span>
                </div>
              </a>
              <a href="tel:+911234567890" className="contact-detail-item">
                <div className="contact-detail-icon">
                  <i className="ph ph-phone"></i>
                </div>
                <div>
                  <span className="contact-detail-label">Phone</span>
                  <span className="contact-detail-value">+91 63941 76235</span>
                </div>
              </a>
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <i className="ph ph-map-pin"></i>
                </div>
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">India</span>
                </div>
              </div>
            </div>
            <div className="contact-social-row">
              <a
                href="https://github.com/shiva"
                target="_blank"
                rel="noopener noreferrer"
                className="csocial-link"
                aria-label="GitHub"
              >
                <i className="ph ph-github-logo"></i>
              </a>
              <a
                href="https://linkedin.com/in/shiva"
                target="_blank"
                rel="noopener noreferrer"
                className="csocial-link"
                aria-label="LinkedIn"
              >
                <i className="ph ph-linkedin-logo"></i>
              </a>
              <a
                href="https://twitter.com/shiva"
                target="_blank"
                rel="noopener noreferrer"
                className="csocial-link"
                aria-label="Twitter"
              >
                <i className="ph ph-x-logo"></i>
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="shivanandgupta316@gmail.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                placeholder="How can I help you?"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell me about your project or opportunity..."
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <span className="btn-submit-loading">
                  <i className="ph ph-circle-notch spin-icon"></i> Sending...
                </span>
              ) : (
                <span className="btn-submit-text">
                  <i className="ph ph-paper-plane-tilt"></i> Send Message
                </span>
              )}
            </button>
            <p className="form-note">
              <i className="ph ph-lock-simple"></i> Your information is secure and will never be
              shared.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
