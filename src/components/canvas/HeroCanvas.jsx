import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import FallbackScene from "./FallbackScene";

export const checkWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

/**
 * Professional Executive 3D Interactive Centerpiece:
 * A liquid chrome / frosted dark-glass morphing sphere with real-time mouse distortion,
 * metallic reflection, and subtle orbital rings. (Linear & Apple Developer style)
 */
function ExecutiveMesh({ isMobile }) {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const { pointer } = state;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;

      // Smooth inertia following pointer
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        pointer.x * (isMobile ? 0.15 : 0.4),
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        pointer.y * (isMobile ? 0.15 : 0.3),
        0.05
      );
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.15;
      ringRef.current.rotation.y += delta * 0.2;
    }
  });

  const position = isMobile ? [0, -0.6, -1.8] : [2.2, 0.1, -0.8];

  return (
    <group position={position}>
      {/* Interactive Morphing Metallic Core */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={meshRef} scale={isMobile ? 1.1 : 1.45}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#141824"
            emissive="#1e293b"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.92}
            distort={0.35}
            speed={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Subtle Orbital Halo */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[isMobile ? 1.5 : 1.9, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Ambient Accent Polyhedra */}
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[1.4, 1.3, 0.2]} scale={0.25}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={0.6}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Minimalist Stardust Particles
function AmbientStardust({ count = 45 }) {
  const pointsRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#a5b4fc"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const HeroCanvas = () => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setWebglSupported(checkWebGLAvailable());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!webglSupported) {
    return <FallbackScene />;
  }

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 4]} intensity={1.8} color="#ffffff" />
        <pointLight position={[2, 3, 2]} intensity={2.2} color="#818cf8" />
        <pointLight position={[-2, -2, 2]} intensity={1.2} color="#38bdf8" />

        <Stars
          radius={40}
          depth={25}
          count={isMobile ? 500 : 1200}
          factor={3}
          saturation={0}
          fade
          speed={0.6}
        />

        <AmbientStardust count={isMobile ? 20 : 45} />
        <ExecutiveMesh isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
