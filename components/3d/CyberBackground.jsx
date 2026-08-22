'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Glowing Central TorusKnot
function GlowingTorusKnot({ mouse }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.35;
      
      // Smooth mouse reaction
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        mouse.current[0] * 1.5,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        mouse.current[1] * 1.5,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, -2]} scale={1.2}>
        <torusKnotGeometry args={[1.5, 0.45, 128, 32]} />
        <MeshWobbleMaterial
          factor={0.3}
          speed={1.5}
          color="#00e5ff"
          emissive="#0055ff"
          emissiveIntensity={0.9}
          wireframe={true}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Floating Small Geometric Polyhedrons
function FloatingPolyhedron({ position, color, geometry, scale = 0.5, mouse }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.6;
      
      // Parallax effect
      ref.current.position.x = position[0] + mouse.current[0] * 0.8;
      ref.current.position.y = position[1] + mouse.current[1] * 0.8;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        wireframe={true}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Mouse-reactive Glowing Cyber Particle Cloud
function ParticleCloud({ mouse }) {
  const pointsRef = useRef();

  const count = 1800;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorChoices = [
      new THREE.Color('#00e5ff'), // Neon Cyan
      new THREE.Color('#0070f3'), // Electric Blue
      new THREE.Color('#38bdf8'), // Sky Cyber Blue
      new THREE.Color('#2563eb'), // Security Cobalt Blue
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const randomColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = randomColor.r;
      col[i * 3 + 1] = randomColor.g;
      col[i * 3 + 2] = randomColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;

      // Smooth mouse tracking
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        mouse.current[0] * 2,
        0.03
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        mouse.current[1] * 2,
        0.03
      );
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Cyber Perspective Grid Plane
function CyberGrid() {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = (gridRef.current.position.z + delta * 0.8) % 1;
    }
  });

  return (
    <group position={[0, -4.5, -2]} rotation={[-Math.PI / 2.3, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[40, 40, '#00f3ff', '#3b0066']}
        position={[0, 0, 0]}
      />
    </group>
  );
}

export default function CyberBackground() {
  const mouse = useRef([0, 0]);

  const handleMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current = [x, y];
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05050b]"
      onMouseMove={handleMouseMove}
    >
      {/* Background Gradient Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00f3ff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#ff007f" />

        <GlowingTorusKnot mouse={mouse} />
        
        <FloatingPolyhedron position={[-4, 2.5, -3]} color="#00f3ff" geometry="icosahedron" scale={0.7} mouse={mouse} />
        <FloatingPolyhedron position={[4.5, 2, -2]} color="#ff007f" geometry="octahedron" scale={0.6} mouse={mouse} />
        <FloatingPolyhedron position={[-3.5, -2, -4]} color="#9d4edd" geometry="tetrahedron" scale={0.8} mouse={mouse} />
        <FloatingPolyhedron position={[4, -2.5, -3]} color="#39ff14" geometry="icosahedron" scale={0.5} mouse={mouse} />

        <ParticleCloud mouse={mouse} />
        <CyberGrid />
      </Canvas>

      {/* Futuristic Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] opacity-30 pointer-events-none" />
    </div>
  );
}
