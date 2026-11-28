import React, { useState } from "react";
import projectsData from "./data/projects.json";
import ArchitectureModal from "./ArchitectureModal";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLayerGroup,
  FaNetworkWired
} from "react-icons/fa";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedArchProject, setSelectedArchProject] = useState(null);

  const categories = [
    "All",
    "Data Engineering",
    "AI & Agents",
    "Full Stack Web",
    "Frontend Development"
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) =>
          p.category?.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section className="section-wrapper projects-section" id="projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-aos="fade-up">
          <span className="section-subtitle">FEATURED PORTFOLIO WORK</span>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-desc">
            Full-stack web applications, distributed data engineering pipelines, and
            AI-driven systems engineered by Shantanu.
          </p>

          {/* Filter Pills */}
          <div className="project-filter-row" data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Project Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => {
            const tags = project.tags || [project.category || "Full Stack"];

            return (
              <div
                key={project.key || idx}
                className="project-card-3d"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                data-aos-duration="800"
              >
                <div className="card-border-glow" />
                <div className="project-card-inner">
                  {/* Image Cover Preview */}
                  <div className="project-image-box">
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80";
                      }}
                    />
                    <div className="image-overlay" />
                    <div className="image-badge">
                      <FaLayerGroup /> {project.category || "Engineering"}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="project-body">
                    {/* Tags */}
                    <div className="project-tags">
                      {tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    {/* Architecture & Data Flow Trigger Button */}
                    {project.architecture && (
                      <button
                        type="button"
                        className="btn-arch-flow"
                        onClick={() => setSelectedArchProject(project)}
                        title="View Real System Architecture & Data Flow"
                      >
                        <FaNetworkWired className="arch-btn-icon" />
                        <span>⚡ System Architecture &amp; Data Flow</span>
                      </button>
                    )}

                    {/* Action Buttons */}
                    <div className="project-actions">
                      {project.demo && project.demo === project.source ? (
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-project btn-demo"
                        >
                          <FaGithub className="action-icon" />
                          <span>Pipeline Repo &amp; Architecture</span>
                        </a>
                      ) : (
                        <>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-project btn-demo"
                            >
                              <span>Live Demo</span>
                              <FaExternalLinkAlt className="action-icon" />
                            </a>
                          )}

                          {project.source && (
                            <a
                              href={project.source}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-project btn-source"
                            >
                              <FaGithub className="action-icon" />
                              <span>Code</span>
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive System Architecture & Data Flow Modal */}
      <ArchitectureModal
        isOpen={Boolean(selectedArchProject)}
        project={selectedArchProject}
        allProjects={projectsData}
        onClose={() => setSelectedArchProject(null)}
        onSelectProject={(proj) => setSelectedArchProject(proj)}
      />
    </section>
  );
};

export default Projects;
