import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowUp, FaHeart, FaPhoneAlt } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <span className="logo-symbol">&lt;/&gt;</span>
              <span className="logo-text">
                Shantanu<span className="accent">.dev</span>
              </span>
            </a>
            <p className="footer-tagline">
              B.E. Information Technology student &amp; Full Stack / Data Engineer
              crafting scalable backend architectures, real-time pipelines, and intelligent web applications.
            </p>
          </div>

          <div className="footer-nav">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#certificates">Certificates</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-social-icons">
              <a
                href="https://www.linkedin.com/in/shantanu-dhabale1717/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="f-icon"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Shantanu7171"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="f-icon"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://leetcode.com/u/Shantanu77/"
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode"
                className="f-icon f-icon-leetcode"
                title="LeetCode Profile"
              >
                <SiLeetcode />
              </a>
              <a
                href="https://www.geeksforgeeks.org/profile/shantanu77"
                target="_blank"
                rel="noreferrer"
                aria-label="GeeksforGeeks"
                className="f-icon f-icon-gfg"
                title="GeeksforGeeks Profile"
              >
                <SiGeeksforgeeks />
              </a>
              <a
                href="mailto:shantanudhabale777@gmail.com"
                aria-label="Email"
                className="f-icon"
                title="Email"
              >
                <FaEnvelope />
              </a>
              <a
                href="tel:+919561044278"
                aria-label="Phone"
                className="f-icon"
                title="Phone / WhatsApp: +91 9561044278"
              >
                <FaPhoneAlt />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="btn-back-to-top"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <FaArrowUp />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Shantanu Dhabale. All rights reserved.
          </p>
          <p className="footer-credit">
            Engineered with React Three Fiber, GSAP &amp; Express <FaHeart className="heart-icon" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
