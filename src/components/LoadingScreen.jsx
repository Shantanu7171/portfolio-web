import React, { useState, useEffect } from "react";

const LoadingScreen = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (onLoaded) onLoaded();
            }, 600);
          }, 300);
          return 100;
        }
        // Realistic easing progress
        const diff = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="loader-cube-wrap">
          <div className="loader-ring loader-ring-1" />
          <div className="loader-ring loader-ring-2" />
          <div className="loader-ring loader-ring-3" />
          <div className="loader-core" />
        </div>
        <h2 className="loader-title">
          Shantanu<span className="accent">.dev</span>
        </h2>
        <div className="loader-bar-bg">
          <div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loader-meta">
          <span className="loader-status">Initializing 3D Universe...</span>
          <span className="loader-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
