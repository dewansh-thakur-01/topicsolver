'use client';

import React, { useEffect, useRef } from 'react';

export const BackgroundGraphics: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Floating 3D Geometric Polyhedra, Crystals, Code Runes & Spheres
    interface FloatingParticle {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      type: 'cube' | 'diamond' | 'ring' | 'code' | 'sphere' | 'prism';
      codeText?: string;
    }

    const codeTokens = ['{ }', '</>', 'fn()', 'const', '0101', 'SQL', 'C++', 'Java', 'Python', '=>', '[]', 'async', 'return'];
    const colors = ['#2B6FF3', '#8B5CF6', '#06B6D4', '#3B82F6', '#10B981', '#F59E0B'];

    const particles: FloatingParticle[] = [];
    const count = 48; // Richer density so background never looks empty

    for (let i = 0; i < count; i++) {
      const typeList: FloatingParticle['type'][] = ['cube', 'diamond', 'ring', 'code', 'sphere', 'prism'];
      const chosenType = typeList[i % typeList.length];
      const initialX = Math.random() * width;
      const initialY = Math.random() * height;

      particles.push({
        x: initialX,
        y: initialY,
        baseX: initialX,
        baseY: initialY,
        z: Math.random() * 300 + 40,
        radius: Math.random() * 24 + 14,
        color: colors[i % colors.length],
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        type: chosenType,
        codeText: codeTokens[i % codeTokens.length]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxFactorX = (mouseX - width / 2) * 0.03;
      const parallaxFactorY = (mouseY - height / 2) * 0.03;

      // Draw 3D Floating Particles
      particles.forEach((p) => {
        p.baseX += p.speedX;
        p.baseY += p.speedY;
        p.rotationX += p.rotSpeedX;
        p.rotationY += p.rotSpeedY;
        p.rotationZ += p.rotSpeedZ;

        if (p.baseX < -80) p.baseX = width + 80;
        if (p.baseX > width + 80) p.baseX = -80;
        if (p.baseY < -80) p.baseY = height + 80;
        if (p.baseY > height + 80) p.baseY = -80;

        // Apply 3D Parallax offset based on depth Z
        const depthRatio = 150 / p.z;
        p.x = p.baseX + parallaxFactorX * depthRatio;
        p.y = p.baseY + parallaxFactorY * depthRatio;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotationZ);

        ctx.globalAlpha = Math.min(0.28, Math.max(0.12, (300 - p.z) / 400));

        if (p.type === 'cube') {
          // 3D Isometric Shaded Cube
          const s = p.radius;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.4;

          // Top Face
          ctx.fillStyle = 'rgba(43, 111, 243, 0.04)';
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.7);
          ctx.lineTo(s * 0.6, -s * 0.35);
          ctx.lineTo(0, 0);
          ctx.lineTo(-s * 0.6, -s * 0.35);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Left Face
          ctx.fillStyle = 'rgba(43, 111, 243, 0.02)';
          ctx.beginPath();
          ctx.moveTo(-s * 0.6, -s * 0.35);
          ctx.lineTo(0, 0);
          ctx.lineTo(0, s * 0.7);
          ctx.lineTo(-s * 0.6, s * 0.35);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Right Face
          ctx.fillStyle = 'rgba(43, 111, 243, 0.06)';
          ctx.beginPath();
          ctx.moveTo(s * 0.6, -s * 0.35);
          ctx.lineTo(0, 0);
          ctx.lineTo(0, s * 0.7);
          ctx.lineTo(s * 0.6, s * 0.35);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

        } else if (p.type === 'prism') {
          // 3D Hexagonal Prism
          const r = p.radius;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (a * Math.PI) / 3;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r * 0.6;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();

        } else if (p.type === 'ring') {
          // Double 3D Gyroscope Ring
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius, p.radius * 0.45, p.rotationX, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 0.7, p.radius * 0.3, p.rotationY, 0, Math.PI * 2);
          ctx.stroke();

        } else if (p.type === 'diamond') {
          // 3D Diamond Octahedron
          const r = p.radius;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.4;
          ctx.fillStyle = 'rgba(139, 92, 246, 0.04)';
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.7, 0);
          ctx.lineTo(0, r);
          ctx.lineTo(-r * 0.7, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Internal facet lines
          ctx.beginPath();
          ctx.moveTo(-r * 0.7, 0);
          ctx.lineTo(r * 0.7, 0);
          ctx.stroke();

        } else if (p.type === 'code') {
          // 3D Floating Code Token Pill
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;

          const textWidth = p.radius * 2.2;
          const textHeight = 20;
          ctx.beginPath();
          ctx.roundRect(-textWidth / 2, -textHeight / 2, textWidth, textHeight, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = p.color;
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.codeText || '{ }', 0, 1);

        } else {
          // Glowing 3D Sphere Orb with highlight
          const grad = ctx.createRadialGradient(-p.radius * 0.3, -p.radius * 0.3, 1, 0, 0, p.radius);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.3, p.color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Particle & Geometric Wireframe Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top Ambient Royal Blue Glow Orb */}
      <div className="absolute -top-32 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#2B6FF3]/15 to-[#8B5CF6]/10 blur-[130px] dark:from-[#3B82F6]/20 dark:to-[#8B5CF6]/15" />

      {/* Right Tech Indigo Glow Orb */}
      <div className="absolute top-1/3 -right-28 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#2B6FF3]/12 to-transparent blur-[140px] dark:from-[#3B82F6]/15" />

      {/* Bottom Subtle Cyan Glow */}
      <div className="absolute -bottom-36 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#06B6D4]/10 to-[#2B6FF3]/8 blur-[150px] dark:from-[#06B6D4]/15" />

      {/* Modern High-Precision Micro Dot Grid Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#DCE5F2_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-80 [mask-image:radial-gradient(ellipse_65%_65%_at_50%_40%,#000_65%,transparent_100%)] dark:bg-[radial-gradient(#222B3D_1.2px,transparent_1.2px)] dark:opacity-60" />
    </div>
  );
};
