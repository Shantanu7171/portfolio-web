import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaFileAlt } from "react-icons/fa";

const Navbar = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "skills", "education", "projects", "certificates", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Certificates", href: "#certificates", id: "certificates" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand / Logo */}
        <a href="#home" className="navbar-logo">
          <span className="logo-symbol">&lt;/&gt;</span>
          <span className="logo-text">
            Shantanu<span className="accent">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link-item ${
                activeSection === link.id ? "active" : ""
              }`}
            >
              {link.name}
              {activeSection === link.id && <span className="active-glow" />}
            </a>
          ))}
        </nav>

        {/* CTA Button: Opens Resume Viewer Directly In Portfolio */}
        <div className="navbar-actions">
          <button
            onClick={onOpenResume}
            className="btn-resume-nav"
            title="View & Download Shantanu's Resume"
          >
            <FaFileAlt className="btn-icon" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "drawer-open" : ""}`}>
        <div className="mobile-nav-items">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-nav-link ${
                activeSection === link.id ? "active" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            className="btn-resume-mobile"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenResume) onOpenResume();
            }}
          >
            <FaFileAlt className="btn-icon" /> View Resume
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
