import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
  FaCheck
} from "react-icons/fa";

const ArchitectureModal = ({
  isOpen,
  project,
  allProjects = [],
  onClose,
  onSelectProject
}) => {
  // Lock body scroll and listen for Escape key
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

  if (!isOpen || !project) return null;

  const arch = project.architecture;
  const steps = arch?.steps || [];

  const modalContent = (
    <div className="roadmap-overlay" onClick={onClose}>
      <div
        className="roadmap-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple Top Header */}
        <div className="roadmap-header">
          <div className="roadmap-header-left">
            <span className="roadmap-badge">SYSTEM ARCHITECTURE ROADMAP</span>
            <h2 className="roadmap-title">{project.title}</h2>
          </div>

          <div className="roadmap-header-right">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="roadmap-btn roadmap-btn-live"
              >
                <span>Live Demo</span>
                <FaExternalLinkAlt />
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                className="roadmap-btn roadmap-btn-code"
              >
                <FaGithub />
                <span>Code</span>
              </a>
            )}
            <button
              className="roadmap-btn-close"
              onClick={onClose}
              aria-label="Close"
              title="Close (Esc)"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Project Switcher Bar */}
        {allProjects && allProjects.length > 0 && (
          <div className="roadmap-switcher-bar">
            <span className="roadmap-switcher-label">Select Project:</span>
            <div className="roadmap-switcher-chips">
              {allProjects.map((p) => {
                const isActive = p.key === project.key || p.title === project.title;
                return (
                  <button
                    key={p.key || p.title}
                    type="button"
                    className={`roadmap-chip ${isActive ? "active" : ""}`}
                    onClick={() => onSelectProject && onSelectProject(p)}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Roadmap Diagram Canvas (Roadmap.sh Style) */}
        <div className="roadmap-canvas">
          {/* Roadmap Spine Flow */}
          <div className="roadmap-flow-container">
            {/* Top Starting Point */}
            <div className="roadmap-start-pill">
              <span className="start-dot" />
              <span>START: {project.category?.toUpperCase() || "ENGINEERING PIPELINE"}</span>
            </div>

            {/* Connecting Vertical Line */}
            <div className="roadmap-line-v" />

            {steps.map((step, idx) => {
              const subNodes = step.subNodes || [];
              const isEven = idx % 2 === 0;

              return (
                <div key={step.step || idx} className="roadmap-milestone-wrapper">
                  {/* The Milestone Block (Main Roadmap.sh Box) */}
                  <div className={`roadmap-node-row ${isEven ? "branch-right" : "branch-left"}`}>
                    {/* Left Side Sub-nodes (when branch-left) */}
                    {!isEven && subNodes.length > 0 && (
                      <div className="roadmap-sub-branch left-sub-branch">
                        <div className="sub-nodes-grid">
                          {subNodes.map((sub, sIdx) => (
                            <div key={sIdx} className="roadmap-sub-pill">
                              <span className={`sub-check-badge ${sIdx % 2 === 0 ? "purple-badge" : "green-badge"}`}>
                                <FaCheck />
                              </span>
                              <span className="sub-pill-text">{sub}</span>
                            </div>
                          ))}
                        </div>
                        <div className="roadmap-dotted-connector right-connector" />
                      </div>
                    )}

                    {/* Main Yellow Roadmap.sh Box */}
                    <div className="roadmap-main-box">
                      <div className="main-box-header">
                        <span className="play-icon-box">
                          <FaPlay />
                        </span>
                        <span className="main-box-step-num">Stage {step.step || idx + 1}</span>
                      </div>
                      <div className="main-box-title">{step.name}</div>
                      {step.tool && <div className="main-box-tool">{step.tool}</div>}
                    </div>

                    {/* Right Side Sub-nodes (when branch-right) */}
                    {isEven && subNodes.length > 0 && (
                      <div className="roadmap-sub-branch right-sub-branch">
                        <div className="roadmap-dotted-connector left-connector" />
                        <div className="sub-nodes-grid">
                          {subNodes.map((sub, sIdx) => (
                            <div key={sIdx} className="roadmap-sub-pill">
                              <span className={`sub-check-badge ${sIdx % 2 === 0 ? "purple-badge" : "green-badge"}`}>
                                <FaCheck />
                              </span>
                              <span className="sub-pill-text">{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vertical Line to next stage */}
                  {idx < steps.length - 1 && <div className="roadmap-line-v" />}
                </div>
              );
            })}

            {/* End Point */}
            <div className="roadmap-line-v" />
            <div className="roadmap-end-pill">
              <span className="end-check">
                <FaCheck />
              </span>
              <span>COMPLETED: PRODUCTION READY ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ArchitectureModal;
