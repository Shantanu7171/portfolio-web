import React, { useState } from "react";
import skillsData from "./data/skills.json";
import {
  SiApachekafka,
  SiApacheairflow,
  SiSnowflake,
  SiPostgresql,
  SiDocker,
  SiPandas,
  SiDbt,
  SiPython,
  SiDjango,
  SiReact,
  SiJavascript,
  SiHtml5,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Data Engineering", "Backend & Core", "Frontend Framework"];

  const renderIcon = (skill) => {
    // If it has an iconType from react-icons
    switch (skill.iconType) {
      case "kafka":
        return <SiApachekafka className="skill-react-icon icon-kafka" />;
      case "airflow":
        return <SiApacheairflow className="skill-react-icon icon-airflow" />;
      case "snowflake":
        return <SiSnowflake className="skill-react-icon icon-snowflake" />;
      case "postgresql":
        return <SiPostgresql className="skill-react-icon icon-postgres" />;
      case "docker":
        return <SiDocker className="skill-react-icon icon-docker" />;
      case "pandas":
        return <SiPandas className="skill-react-icon icon-pandas" />;
      case "dbt":
        return <SiDbt className="skill-react-icon icon-dbt" />;
      default:
        break;
    }

    // Otherwise render imageSrc with fallback to tech icon
    if (skill.imageSrc) {
      return (
        <img
          src={`/assets/${skill.imageSrc}`}
          alt={skill.title}
          className="skill-icon"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      );
    }

    return <FaDatabase className="skill-react-icon" />;
  };

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) =>
          s.category?.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <section className="section-wrapper skills-section" id="skills">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header text-center" data-aos="fade-up">
          <span className="section-subtitle">MY TECH ARSENAL</span>
          <h2 className="section-title">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section-desc">
            Distributed data engineering pipelines, backend web frameworks, analytics
            engines, and modern frontend architectures.
          </p>

          {/* Category Filter Pills */}
          <div className="skill-filter-row" data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((data, idx) => (
            <div
              className="skill-card-3d"
              key={data.id || data.title || idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 80}
              data-aos-duration="750"
            >
              <div className="card-glass-glow" />
              <div className="card-inner">
                {/* Icon Wrapper */}
                <div className="skill-icon-wrap">
                  {renderIcon(data)}
                  <div className="icon-halo" />
                </div>

                <div className="skill-info">
                  <span className="skill-badge">{data.category}</span>
                  <h3 className="skill-name">{data.title}</h3>
                  {data.description && (
                    <p className="skill-desc-text">{data.description}</p>
                  )}
                  <div className="skill-level-row">
                    <span className="level-label">Proficiency</span>
                    <span className="level-value">{data.level}</span>
                  </div>
                </div>

                <div className="skill-progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${data.proficiency || 88}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
