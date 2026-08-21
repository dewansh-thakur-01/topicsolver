'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Globe, Terminal, Share2, Shield, FileText, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#DCE5F2] bg-white text-[#687385] py-12 px-4 sm:px-6 lg:px-8 mt-20 transition-colors duration-200 dark:border-[#222B3D] dark:bg-[#090C12] dark:text-[#94A3B8]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Problem Statement */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2B6FF3] shadow-md shadow-[#2B6FF3]/25 dark:bg-[#3B82F6]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-extrabold text-[#16191D] tracking-tight dark:text-white">TOPIC <span className="text-[#2B6FF3] dark:text-[#3B82F6]">SOLVER</span></span>
            </div>
            
            <p className="text-xs text-[#16191D] font-semibold dark:text-slate-200">
              "Your personalized path to mastering any topic."
            </p>

            <p className="text-xs text-[#687385] max-w-md leading-relaxed dark:text-[#94A3B8]">
              Engineered for the <b>Remote Learning Engagement Engine</b> challenge. TOPIC SOLVER understands what students already know, identifies what they struggle with, dynamically adjusts content difficulty, and provides low-bandwidth accessibility for rural and remote areas.
            </p>

            <div className="flex items-center space-x-3 pt-2 text-[#687385] dark:text-[#94A3B8]">
              <div className="flex items-center space-x-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700/40">
                <Zap className="h-3 w-3 text-emerald-600" />
                <span>Low Data Mode Ready (&lt;50KB)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Learning Tracks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#16191D] uppercase tracking-wider dark:text-white">Learning Tracks</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/courses/java" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">Java & DSA Track</Link></li>
              <li><Link href="/courses/python" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">Python Programming</Link></li>
              <li><Link href="/courses/sql" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">MySQL & Databases</Link></li>
              <li><Link href="/courses/c" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">C Language</Link></li>
              <li><Link href="/practice" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">Adaptive Practice Hub</Link></li>
            </ul>
          </div>

          {/* Col 3: Platform & Credits */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#16191D] uppercase tracking-wider dark:text-white">Platform & Credits</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/dashboard" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">Student Dashboard</Link></li>
              <li><Link href="/my-path" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">Personalized Learning Path</Link></li>
              <li><Link href="/about" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">About & Research Foundation</Link></li>
              <li><Link href="/admin" className="text-[#687385] hover:text-[#2B6FF3] transition-colors dark:text-[#94A3B8] dark:hover:text-[#60A5FA]">Admin Hub</Link></li>
              <li className="pt-2 text-[11px] text-[#687385] dark:text-[#94A3B8]">
                Designed by <span className="font-semibold text-[#2B6FF3] dark:text-[#3B82F6]">AniNova</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-[#DCE5F2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#687385] gap-4 dark:border-[#222B3D] dark:text-[#94A3B8]">
          <p>© {new Date().getFullYear()} TOPIC SOLVER. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-[#2B6FF3] transition-colors dark:hover:text-[#60A5FA]">Privacy Policy</Link>
            <Link href="/about" className="hover:text-[#2B6FF3] transition-colors dark:hover:text-[#60A5FA]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
