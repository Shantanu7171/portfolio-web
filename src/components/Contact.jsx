import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honeypot: "", // Bot trap
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#a855f7", "#3b82f6", "#10b981"],
      });
    } catch (e) {
      // Ignore if confetti blocked
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter your name (at least 2 characters).",
        message: "",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter a valid email address.",
        message: "",
      });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter a message of at least 5 characters.",
        message: "",
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: null, message: "" });

    try {
      let sentSuccessfully = false;
      let responseMessage = "";

      // 1. If custom backend URL is configured, try it first
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        try {
          const response = await fetch(`${apiUrl}/contact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          if (response.ok && data.success) {
            sentSuccessfully = true;
            responseMessage = data.message || "Thank you! Your message has been received.";
          }
        } catch (backendErr) {
          console.warn("Custom backend not reached, trying direct email delivery:", backendErr);
        }
      }

      // 2. Direct FormSubmit AJAX delivery (Zero server needed, sends directly to shantanudhabale777@gmail.com)
      if (!sentSuccessfully) {
        const formSubmitRes = await fetch("https://formsubmit.co/ajax/shantanudhabale777@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: formData.subject ? `[Portfolio] ${formData.subject}` : `New message from ${formData.name}`,
            message: formData.message,
            _template: "table",
            _captcha: "false",
          }),
        });

        const fsData = await formSubmitRes.json();
        if (formSubmitRes.ok && (fsData.success === "true" || fsData.success === true)) {
          sentSuccessfully = true;
          responseMessage = "Thank you! Your message has been sent directly to Shantanu's inbox.";
        } else if (fsData.message && fsData.message.includes("Activation")) {
          // If first-time activation confirmation is dispatched
          sentSuccessfully = true;
          responseMessage = "Thank you! Your message was dispatched. (Form confirmation sent to Shantanu's inbox).";
        } else {
          throw new Error(fsData.message || "Direct gateway delivery failed.");
        }
      }

      if (sentSuccessfully) {
        setStatus({
          submitting: false,
          success: true,
          error: null,
          message: responseMessage,
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _honeypot: "",
        });
        triggerConfetti();
      }
    } catch (err) {
      console.warn("Contact delivery error:", err);
      setStatus({
        submitting: false,
        success: false,
        error:
          "Could not deliver automatically. You can email directly to shantanudhabale777@gmail.com or click below:",
        message: "",
      });
    }
  };

  return (
    <section className="section-wrapper contact-section" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-aos="fade-up">
          <span className="section-subtitle">LET'S CONNECT</span>
          <h2 className="section-title">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-desc">
            Have a project in mind, an opportunity, or just want to chat? Send me a
            message and I'll get back to you promptly!
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Social Channels & Quick Info */}
          <div
            className="contact-info-panel"
            data-aos="fade-right"
            data-aos-duration="900"
          >
            <h3 className="panel-title">Let's build something extraordinary</h3>
            <p className="panel-text">
              I am currently open to full-time roles, freelance collaborations, and
              innovative software projects. Feel free to connect via any of the
              channels below:
            </p>

            {/* Preserving All Original Social Links */}
            <div className="social-links-grid">
              <a
                href="https://www.linkedin.com/in/shantanu-dhabale1717/"
                target="_blank"
                rel="noreferrer"
                className="social-card social-linkedin"
              >
                <div className="social-icon-box">
                  <FaLinkedin />
                </div>
                <div className="social-meta">
                  <span className="social-label">LinkedIn</span>
                  <span className="social-value">shantanu-dhabale1717</span>
                </div>
              </a>

              <a
                href="https://github.com/Shantanu7171"
                target="_blank"
                rel="noreferrer"
                className="social-card social-github"
              >
                <div className="social-icon-box">
                  <FaGithub />
                </div>
                <div className="social-meta">
                  <span className="social-label">GitHub</span>
                  <span className="social-value">@Shantanu7171</span>
                </div>
              </a>

              <a
                href="https://leetcode.com/u/Shantanu77/"
                target="_blank"
                rel="noreferrer"
                className="social-card social-leetcode"
              >
                <div className="social-icon-box">
                  <SiLeetcode />
                </div>
                <div className="social-meta">
                  <span className="social-label">LeetCode</span>
                  <span className="social-value">@Shantanu77</span>
                </div>
              </a>

              <a
                href="https://www.geeksforgeeks.org/profile/shantanu77"
                target="_blank"
                rel="noreferrer"
                className="social-card social-gfg"
              >
                <div className="social-icon-box">
                  <SiGeeksforgeeks />
                </div>
                <div className="social-meta">
                  <span className="social-label">GeeksforGeeks</span>
                  <span className="social-value">@shantanu77</span>
                </div>
              </a>

              <a
                href="mailto:shantanudhabale777@gmail.com"
                className="social-card social-email"
              >
                <div className="social-icon-box">
                  <FaEnvelope />
                </div>
                <div className="social-meta">
                  <span className="social-label">Email</span>
                  <span className="social-value">shantanudhabale777@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:+919561044278"
                className="social-card social-phone"
              >
                <div className="social-icon-box">
                  <FaPhoneAlt />
                </div>
                <div className="social-meta">
                  <span className="social-label">Phone / WhatsApp</span>
                  <span className="social-value">+91 9561044278</span>
                </div>
              </a>
            </div>

            <div className="contact-status-card">
              <span className="status-ping" />
              <div>
                <strong>Quick Response Guaranteed</strong>
                <p>Typically replies within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form with Validation & Honeypot */}
          <div
            className="contact-form-panel"
            data-aos="fade-left"
            data-aos-duration="900"
          >
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Spam Honeypot Field (Hidden from real users) */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <label htmlFor="_honeypot">Leave this blank</label>
                <input
                  type="text"
                  id="_honeypot"
                  name="_honeypot"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData._honeypot}
                  onChange={handleChange}
                />
              </div>

              {/* Status Alert Messages */}
              {status.success && (
                <div className="alert alert-success-custom">
                  <FaCheckCircle className="alert-icon" />
                  <div>
                    <strong>Message Delivered!</strong>
                    <p>{status.message}</p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="alert alert-error-custom">
                  <FaExclamationCircle className="alert-icon" />
                  <div>
                    <strong>Note:</strong>
                    <p>{status.error}</p>
                    <a
                      href={`mailto:shantanudhabale777@gmail.com?subject=${encodeURIComponent(
                        formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`
                      )}&body=${encodeURIComponent(
                        `Hi Shantanu,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
                      )}`}
                      className="btn-mailto-fallback"
                    >
                      ✉️ Open in Gmail / Email App
                    </a>
                  </div>
                </div>
              )}

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="e.g. Project Inquiry or Hello"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span className="req">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="form-textarea"
                  placeholder="Hi Shantanu, I would like to discuss..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={status.submitting}
              >
                {status.submitting ? (
                  <>
                    <FaSpinner className="spin-icon" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="btn-icon" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
