import React, { useEffect, useRef } from "react";
import heroData from "./data/hero.json";
import Typed from "typed.js";
import HeroCanvas from "./canvas/HeroCanvas";
import {
  FaFileAlt,
  FaArrowRight,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaGraduationCap,
  FaCode,
  FaLayerGroup,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const Home = ({ onOpenResume }) => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Python Full Stack Developer",
        "Django & REST API Engineer",
        "Data Engineer (Kafka, Airflow, Snowflake)",
        "DSA & Competitive Programmer",
        "B.E. IT @ SSGMCE (8.47 CGPA)",
      ],
      typeSpeed: 40,
      backSpeed: 25,
      backDelay: 2000,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="hero-section" id="home">
      {/* 3D Ambient Minimalist Experience */}
      <HeroCanvas />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Executive Typography */}
          <div className="hero-text-col" data-aos="fade-right" data-aos-duration="800">
            {/* Status Indicator */}
            <div className="status-pill">
              <span className="status-dot" />
              <span>Available for Software Engineering Opportunities</span>
            </div>

            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">
              Shantanu <span className="text-gradient">Dhabale</span>
            </h1>

            {/* Dynamic Role Subheading */}
            <div className="hero-role-wrapper">
              <span className="role-prefix">&gt; </span>
              <span ref={typedRef} className="role-text" />
            </div>

            <p className="hero-bio">
              Third-year <strong>B.E. Information Technology</strong> student at{" "}
              <strong>SSGMCE Shegaon</strong>. I specialize in building scalable web architectures,
              data-driven systems, and clean user interfaces using <strong>Python, Django, React</strong>,
              and PostgreSQL. Active problem solver on LeetCode &amp; GeeksforGeeks.
            </p>

            {/* Call to Actions */}
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary-hero">
                <span>View Projects</span>
                <FaArrowRight className="btn-icon" />
              </a>

              {/* View & Download Resume Button */}
              <button
                type="button"
                onClick={onOpenResume}
                className="btn btn-outline-hero"
                title="View & Download Resume"
              >
                <FaFileAlt className="btn-icon" />
                <span>Resume</span>
              </button>

              <a href="#contact" className="btn btn-ghost-hero">
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Clean Professional Socials */}
            <div className="hero-socials">
              <span className="socials-label">Connect:</span>
              <a
                href="https://www.linkedin.com/in/shantanu-dhabale1717/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hero-social-link"
                title="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Shantanu7171"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hero-social-link"
                title="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://leetcode.com/u/Shantanu77/"
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode"
                className="hero-social-link"
                title="LeetCode Profile"
              >
                <SiLeetcode />
              </a>
              <a
                href="https://www.geeksforgeeks.org/profile/shantanu77"
                target="_blank"
                rel="noreferrer"
                aria-label="GeeksforGeeks"
                className="hero-social-link"
                title="GeeksforGeeks Profile"
              >
                <SiGeeksforgeeks />
              </a>
              <a
                href="mailto:shantanudhabale777@gmail.com"
                aria-label="Email"
                className="hero-social-link"
                title="Email Shantanu"
              >
                <FaEnvelope />
              </a>
              <a
                href="tel:+919561044278"
                aria-label="Call or WhatsApp"
                className="hero-social-link"
                title="Call / WhatsApp: +91 9561044278"
              >
                <FaPhoneAlt />
              </a>
            </div>
          </div>

          {/* Right Column: Sleek Executive Developer Showcase */}
          <div className="hero-visual-col" data-aos="fade-left" data-aos-duration="800">
            <div className="executive-card">
              {/* Card Header Bar */}
              <div className="card-top-bar">
                <div className="window-dots">
                  <span className="w-dot red" />
                  <span className="w-dot yellow" />
                  <span className="w-dot green" />
                </div>
                <span className="card-filename">shantanu.py</span>
                <span className="card-badge-status">online</span>
              </div>

              {/* Photo Area */}
              <div className="executive-photo-box">
                <div className="photo-ambient-halo" />
                <img
                  src={`/assets/${heroData.imgSrc}`}
                  alt="Shantanu Dhabale"
                  className="executive-photo"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>

              {/* Profile Details */}
              <div className="executive-card-body">
                <h3 className="executive-name">Shantanu Dhabale</h3>
                <p className="executive-title">Full Stack &amp; Python Engineer</p>

                {/* Core Stack Pills */}
                <div className="card-tech-chips">
                  <span className="tech-chip">Python</span>
                  <span className="tech-chip">Django</span>
                  <span className="tech-chip">React.js</span>
                  <span className="tech-chip">PostgreSQL</span>
                </div>

                {/* Metrics */}
                <div className="card-metrics">
                  <div className="metric-box">
                    <FaGraduationCap className="metric-icon" />
                    <div>
                      <strong>8.47</strong>
                      <span>CGPA</span>
                    </div>
                  </div>
                  <div className="metric-box">
                    <FaCode className="metric-icon" />
                    <div>
                      <strong>8+</strong>
                      <span>Projects</span>
                    </div>
                  </div>
                  <div className="metric-box">
                    <FaLayerGroup className="metric-icon" />
                    <div>
                      <strong>B.E. IT</strong>
                      <span>2027</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist Scroll Cue */}
      <a href="#skills" className="scroll-cue" aria-label="Scroll to Skills">
        <span className="scroll-cue-mouse" />
        <span className="scroll-cue-text">Scroll</span>
      </a>
    </section>
  );
};

export default Home;
