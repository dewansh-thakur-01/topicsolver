'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  ArrowLeft, 
  Compass, 
  BookOpen, 
  Terminal, 
  Bot, 
  LayoutDashboard 
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in duration-300">
      
      {/* Official Fox Sticker with Glowing Aura */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 -m-3 rounded-full bg-radial from-[#2B6FF3]/35 via-cyan-400/20 to-transparent blur-xl pointer-events-none" />
        <div className="relative w-52 sm:w-64 h-16 sm:h-20">
          <Image
            src="/images/topic_solver_logo.png"
            alt="TOPIC SOLVER Sticker"
            fill
            className="object-contain"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(43, 111, 243, 0.85)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.6))'
            }}
          />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <div className="text-6xl font-black text-[#2B6FF3] font-3d-hero dark:text-[#60A5FA]">
          404
        </div>
        <h1 className="text-2xl font-extrabold text-[#16191D] dark:text-white font-3d-sub">
          Topic or Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#687385] dark:text-[#94A3B8] leading-relaxed">
          The requested path doesn't exist or may have moved. Use any of the links below to return to your learning track.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-[#2B6FF3]/25 transition-all hover:scale-105 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/courses"
          className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] transition-all dark:bg-[#121622] dark:border-[#222B3D] dark:text-white"
        >
          <BookOpen className="h-3.5 w-3.5 text-[#2B6FF3]" />
          <span>Courses</span>
        </Link>

        <Link
          href="/practice"
          className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] transition-all dark:bg-[#121622] dark:border-[#222B3D] dark:text-white"
        >
          <Terminal className="h-3.5 w-3.5 text-emerald-600" />
          <span>Practice</span>
        </Link>

        <Link
          href="/mentor"
          className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] transition-all dark:bg-[#121622] dark:border-[#222B3D] dark:text-white"
        >
          <Bot className="h-3.5 w-3.5 text-purple-600" />
          <span>CodeMentor AI</span>
        </Link>
      </div>

    </div>
  );
}
