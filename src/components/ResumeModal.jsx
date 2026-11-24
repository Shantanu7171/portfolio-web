import React, { useEffect } from "react";
import { FaDownload, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const ResumeModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div
        className="resume-modal-dialog"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="resume-modal-title-group">
            <span className="pdf-tag">PDF</span>
            <h3 className="resume-modal-title">Shantanu_Dhabale_Resume.pdf</h3>
          </div>

          <div className="resume-modal-actions">
            {/* Download Button */}
            <a
              href="/resume.pdf"
              download="Shantanu_Dhabale_Resume.pdf"
              className="btn-modal-action btn-modal-download"
              title="Download Resume PDF"
            >
              <FaDownload />
              <span>Download</span>
            </a>

            {/* Open in New Tab */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-modal-action btn-modal-external"
              title="Open PDF in full new tab"
            >
              <FaExternalLinkAlt />
              <span className="desktop-only">Full View</span>
            </a>

            {/* Close Button */}
            <button
              className="btn-modal-close"
              onClick={onClose}
              aria-label="Close Resume Viewer"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Iframe */}
        <div className="resume-modal-body">
          <iframe
            src="/resume.pdf#toolbar=1&navpanes=0"
            title="Shantanu Dhabale Resume"
            className="resume-pdf-frame"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
