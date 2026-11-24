import React from "react";

/**
 * Fallback scene rendered when WebGL is unavailable or fails to initialize.
 * Ensures that the portfolio looks stunning even on devices without hardware acceleration.
 */
const FallbackScene = () => {
  return (
    <div className="canvas-fallback" aria-hidden="true">
      <div className="fallback-nebula fallback-nebula-1" />
      <div className="fallback-nebula fallback-nebula-2" />
      <div className="fallback-nebula fallback-nebula-3" />
      <div className="fallback-grid" />
      <div className="fallback-core">
        <div className="core-circle core-ring-1" />
        <div className="core-circle core-ring-2" />
        <div className="core-circle core-ring-3" />
      </div>
    </div>
  );
};

export default FallbackScene;
