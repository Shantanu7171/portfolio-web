import React from "react";
import educationData from "./data/experience.json";
import {
  FaGraduationCap,
  FaSchool,
  FaAward,
  FaLaptopCode,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const Experience = () => {
  const getIconForType = (type) => {
    switch (type) {
      case "college":
        return <FaGraduationCap className="marker-icon college-icon" />;
      case "school12":
        return <FaSchool className="marker-icon school12-icon" />;
      case "school10":
        return <FaAward className="marker-icon school10-icon" />;
      case "training":
        return <FaLaptopCode className="marker-icon training-icon" />;
      default:
        return <FaGraduationCap className="marker-icon" />;
    }
  };

  return (
    <section className="section-wrapper education-section" id="education">
      {/* Anchor for backward compatibility with #experience */}
      <div id="experience" style={{ position: "relative", top: "-100px" }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-aos="fade-up">
          <span className="section-subtitle">ACADEMIC &amp; LEARNING JOURNEY</span>
          <h2 className="section-title">
            Education &amp; <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="section-desc">
            My educational background, academic achievements from 10th and 12th grades,
            and current engineering degree at SSGMCE Shegaon.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container">
          <div className="timeline-line" />

          {Array.isArray(educationData) &&
            educationData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id || idx}
                  className={`timeline-item ${
                    isEven ? "timeline-left" : "timeline-right"
                  }`}
                  data-aos={isEven ? "fade-right" : "fade-left"}
                  data-aos-duration="850"
                >
                  {/* Glowing Node on Timeline */}
                  <div className="timeline-marker">
                    {getIconForType(item.type)}
                    <span className="marker-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className="timeline-card edu-card">
                    <div className="timeline-header">
                      <div className="timeline-meta">
                        <span className="meta-badge date-badge">
                          <FaCalendarAlt className="meta-icon" />
                          {item.duration}
                        </span>
                        {item.location && (
                          <span className="meta-badge loc-badge">
                            <FaMapMarkerAlt className="meta-icon" />
                            {item.location}
                          </span>
                        )}
                        {item.grade && (
                          <span className="meta-badge grade-badge">
                            <FaStar className="meta-icon" />
                            {item.grade}
                          </span>
                        )}
                      </div>

                      <h3 className="timeline-role">{item.degree}</h3>
                      <h4 className="timeline-org">{item.institution}</h4>
                    </div>

                    <div className="timeline-body">
                      {item.description && (
                        <p className="edu-description">{item.description}</p>
                      )}

                      {Array.isArray(item.highlights) && (
                        <ul className="timeline-points">
                          {item.highlights.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </ul>
                      )}

                      {/* Associated Skill Badges */}
                      {Array.isArray(item.tags) && (
                        <div className="timeline-skills">
                          {item.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="timeline-skill-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
