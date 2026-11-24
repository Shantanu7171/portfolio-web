import React from "react";
import certificatesData from "./data/certificates.json";
import { FaAward, FaExternalLinkAlt, FaCheckCircle, FaCalendarAlt, FaFilePdf } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const Certificates = () => {
  return (
    <section className="section-wrapper certificates-section" id="certificates">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-aos="fade-up">
          <span className="section-subtitle">ACHIEVEMENTS &amp; RECOGNITION</span>
          <h2 className="section-title">
            Certifications &amp; <span className="text-gradient">Credentials</span>
          </h2>
          <p className="section-desc">
            Industry-recognized certifications, competitive programming milestones, and
            specialized technology coursework.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {certificatesData.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="cert-card-3d"
              data-aos="fade-up"
              data-aos-delay={idx * 120}
              data-aos-duration="850"
            >
              <div className="cert-card-glow" />
              <div className="cert-card-inner">
                {/* Top Row: Icon + Status */}
                <div className="cert-header-row">
                  <div className="cert-icon-box">
                    <FaAward />
                  </div>
                  <div className="cert-meta-badges">
                    <span className="cert-badge-date">
                      <FaCalendarAlt className="meta-icon" />
                      {cert.date}
                    </span>
                    <span className="cert-badge-verified">
                      <FaCheckCircle className="meta-icon" />
                      {cert.status || "Verified"}
                    </span>
                  </div>
                </div>

                {/* Title & Issuer */}
                <h3 className="cert-title">{cert.title}</h3>
                <h4 className="cert-issuer">{cert.issuer}</h4>

                {/* Description */}
                <p className="cert-description">{cert.description}</p>

                {/* Skills Verified */}
                {Array.isArray(cert.skills) && (
                  <div className="cert-skills-wrap">
                    {cert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="cert-skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                <div className="cert-footer">
                  {cert.gfgUrl ? (
                    <div className="cert-dual-actions">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-cert-link btn-cert-leetcode"
                        title="View Shantanu's LeetCode Profile"
                      >
                        <SiLeetcode className="cert-link-icon" />
                        <span>LeetCode</span>
                      </a>
                      <a
                        href={cert.gfgUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-cert-link btn-cert-gfg"
                        title="View Shantanu's GeeksforGeeks Profile"
                      >
                        <SiGeeksforgeeks className="cert-link-icon" />
                        <span>GeeksforGeeks</span>
                      </a>
                    </div>
                  ) : cert.credentialUrl ? (
                    <div className="cert-dual-actions">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-cert-link"
                      >
                        <FaCheckCircle className="cert-link-icon" />
                        <span>Verify Credential</span>
                        <FaExternalLinkAlt className="cert-link-icon-sub" />
                      </a>
                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-cert-pdf"
                          title="View Official Certificate PDF"
                        >
                          <FaFilePdf />
                          <span>PDF</span>
                        </a>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
