'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Database, 
  Cpu, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Zap, 
  Brain, 
  Flame,
  Shield,
  Layers,
  Compass
} from 'lucide-react';

export const Hero3DVisual: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Interactive 3D Gyroscopic Mouse Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  const nodes = [
    {
      id: 'java',
      title: 'Java & DSA',
      icon: '☕',
      badge: '54 Topics • 162 MCQs',
      color: 'from-amber-500 to-orange-500',
      glow: 'rgba(245, 158, 11, 0.25)',
      href: '/courses/java',
      delay: '0s',
      top: '8%',
      left: '12%'
    },
    {
      id: 'python',
      title: 'Python Core',
      icon: '🐍',
      badge: '48 Topics • 144 MCQs',
      color: 'from-[#2B6FF3] to-[#1557D6]',
      glow: 'rgba(43, 111, 243, 0.25)',
      href: '/courses/python',
      delay: '0.6s',
      top: '6%',
      right: '12%'
    },
    {
      id: 'sql',
      title: 'MySQL DBMS',
      icon: '🗄️',
      badge: '10 Modules • 30 MCQs',
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.25)',
      href: '/courses/sql',
      delay: '1.2s',
      bottom: '12%',
      left: '8%'
    },
    {
      id: 'c',
      title: 'C Programming',
      icon: '⚡',
      badge: '36 Lessons • 108 MCQs',
      color: 'from-purple-500 to-indigo-600',
      glow: 'rgba(168, 85, 247, 0.25)',
      href: '/courses/c',
      delay: '1.8s',
      bottom: '8%',
      right: '8%'
    }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto py-6 select-none card-3d-perspective"
    >
      
      {/* 3D Perspective Stage */}
      <div 
        className="relative mx-auto h-[420px] sm:h-[480px] w-full max-w-4xl flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ 
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* 3D Rotating Laser Grid Base */}
        <div 
          className="absolute inset-0 m-auto w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full border border-[#2B6FF3]/30 bg-gradient-to-tr from-[#2B6FF3]/10 via-white/50 to-purple-500/10 shadow-2xl backdrop-blur-md dark:border-[#3B82F6]/30 dark:bg-gradient-to-tr dark:from-[#3B82F6]/10 dark:via-[#090C12]/80 dark:to-purple-900/20"
          style={{
            transform: 'rotateX(68deg) rotateZ(0deg)',
            boxShadow: '0 30px 70px -15px rgba(43, 111, 243, 0.25)'
          }}
        >
          {/* Concentric 3D Holographic Orbit Rings */}
          <div className="absolute inset-6 rounded-full border border-[#2B6FF3]/30 border-dashed animate-spin [animation-duration:40s]" />
          <div className="absolute inset-16 rounded-full border border-purple-400/40 animate-spin [animation-duration:25s] [animation-direction:reverse]" />
          <div className="absolute inset-28 rounded-full border border-[#DCE5F2] border-dotted dark:border-slate-700" />
          <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#2B6FF3]/20 blur-xl animate-pulse" />
        </div>

        {/* Central 3D Floating Holographic Core */}
        <div 
          className="relative z-20 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE5F2] shadow-2xl transition-all duration-500 hover:scale-105 dark:bg-[#121622] dark:border-[#222B3D]"
          style={{
            transform: 'translateZ(80px)',
            boxShadow: '0 25px 50px -12px rgba(43, 111, 243, 0.2), 0 0 0 1px #DCE5F2'
          }}
        >
          {/* 3D Glowing Quantum Icon */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#2B6FF3] via-[#1557D6] to-purple-600 text-white shadow-xl shadow-[#2B6FF3]/40 mb-3 animate-float-3d">
            <Brain className="h-8 w-8 animate-pulse text-white" />
            <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#121622] shadow-sm animate-ping" />
            <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#121622]" />
          </div>

          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2B6FF3]/10 px-3 py-0.5 text-[10px] font-extrabold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
              <Sparkles className="h-3 w-3" />
              <span>3D ADAPTIVE AI ENGINE</span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-extrabold text-[#16191D] tracking-tight font-3d-sub dark:text-white">
              TOPIC <span className="text-[#2B6FF3] dark:text-[#60A5FA]">SOLVER</span>
            </h3>
            <p className="text-xs text-[#687385] font-semibold dark:text-[#94A3B8]">
              Continuous Knowledge Calibration
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#DCE5F2] text-[11px] font-mono text-[#687385] dark:border-[#222B3D] dark:text-[#94A3B8]">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" /> 444 MCQs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#2B6FF3] dark:text-[#60A5FA] font-bold">
              <Zap className="h-3.5 w-3.5" /> Live Mastery Lock
            </span>
          </div>
        </div>

        {/* 4 Floating 3D Satellite Nodes (Courses) with 3D Depth Elevation */}
        {nodes.map((node, index) => {
          return (
            <Link
              key={node.id}
              href={node.href}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`absolute z-30 group flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#DCE5F2] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer card-3d-tilt dark:bg-[#121622] dark:border-[#222B3D] ${
                hoveredNode && hoveredNode !== node.id ? 'opacity-60 scale-95' : 'opacity-100'
              }`}
              style={{
                top: node.top,
                bottom: node.bottom,
                left: node.left,
                right: node.right,
                transform: `translateZ(${hoveredNode === node.id ? '110px' : '50px'})`,
                animation: `float3d 4s ease-in-out infinite alternate`,
                animationDelay: node.delay,
                boxShadow: `0 15px 35px -8px ${node.glow}, 0 0 0 1px #DCE5F2`
              }}
            >
              {/* 3D Crystal Icon Block */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] text-2xl shadow-inner group-hover:bg-[#2B6FF3] group-hover:text-white transition-all transform group-hover:rotate-6 dark:bg-[#0E121C] dark:border-[#222B3D]">
                <span>{node.icon}</span>
              </div>

              {/* Info Column */}
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-extrabold text-[#16191D] group-hover:text-[#2B6FF3] transition-colors dark:text-white dark:group-hover:text-[#60A5FA]">
                    {node.title}
                  </span>
                </div>
                <span className="inline-block text-[10px] font-bold text-[#2B6FF3] bg-[#2B6FF3]/10 px-2.5 py-0.5 rounded-full border border-[#2B6FF3]/20 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                  {node.badge}
                </span>
              </div>
            </Link>
          );
        })}

        {/* 3D Floating Holographic Badges & Code Shards */}
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/95 px-4 py-2 rounded-full border border-[#DCE5F2] shadow-md text-xs font-extrabold text-[#16191D] dark:bg-[#121622]/95 dark:border-[#222B3D] dark:text-white"
          style={{ transform: 'translateZ(90px)' }}
        >
          <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="font-3d-badge">3D Holographic Skill Network</span>
        </div>

        {/* Floating Mini Code Shards */}
        <div 
          className="absolute -bottom-2 left-1/4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 text-emerald-400 text-[10px] font-mono border border-slate-700 shadow-lg"
          style={{ transform: 'translateZ(40px)', animation: 'float3d 6s ease-in-out infinite alternate' }}
        >
          <Terminal className="h-3 w-3 text-[#60A5FA]" />
          <span>O(log N) BinarySearch()</span>
        </div>

        <div 
          className="absolute -top-2 right-1/4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 text-cyan-400 text-[10px] font-mono border border-slate-700 shadow-lg"
          style={{ transform: 'translateZ(45px)', animation: 'float3d 5.5s ease-in-out infinite alternate', animationDelay: '1s' }}
        >
          <Code2 className="h-3 w-3 text-purple-400" />
          <span>void swap(int *a, int *b)</span>
        </div>

      </div>

    </div>
  );
};
