'use client';

import React from 'react';
import { ProblemTable } from '@/components/ProblemTable';
import { ALL_PROBLEMS } from '@/lib/problemsData';
import { useStore } from '@/lib/useStore';
import { Terminal, Code2, Database, Cpu, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function ProblemsPage() {
  const { problemStatus } = useStore();

  const solvedCount = Object.values(problemStatus).filter(p => p.solved).length;
  const javaCount = ALL_PROBLEMS.filter(p => p.language === 'Java').length;
  const sqlCount = ALL_PROBLEMS.filter(p => p.language === 'SQL').length;
  const cCount = ALL_PROBLEMS.filter(p => p.language === 'C').length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner - Black & Grey Theme */}
      <div className="relative overflow-hidden rounded-3xl border border-[#2D3748] bg-gradient-to-r from-[#121620] via-[#161B26] to-[#121620] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#1E293B] px-3.5 py-1 text-xs font-semibold text-[#60A5FA] border border-[#334155]">
              <Terminal className="h-3.5 w-3.5" />
              <span>LeetCode Practice Directory & Code Notes</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LeetCode Problem Sets (Java, SQL & C)
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Practice 600+ LeetCode Java problems, 125+ LeetCode Database problems, and official C programming problems with difficulty filters and automatic progress tracking.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
            <div className="rounded-xl bg-[#1A202C] p-3 border border-[#334155] text-center shadow-inner">
              <div className="text-lg font-bold text-amber-400">{javaCount}</div>
              <div className="text-[10px] text-slate-400">Java Problems</div>
            </div>

            <div className="rounded-xl bg-[#1A202C] p-3 border border-[#334155] text-center shadow-inner">
              <div className="text-lg font-bold text-cyan-400">{sqlCount}</div>
              <div className="text-[10px] text-slate-400">SQL Problems</div>
            </div>

            <div className="rounded-xl bg-[#1A202C] p-3 border border-[#334155] text-center shadow-inner">
              <div className="text-lg font-bold text-slate-200">{cCount}</div>
              <div className="text-[10px] text-slate-400">C Problems</div>
            </div>

            <div className="rounded-xl bg-[#064E3B]/40 p-3 border border-emerald-500/40 text-center shadow-inner">
              <div className="text-lg font-bold text-emerald-400">{solvedCount}</div>
              <div className="text-[10px] text-emerald-300">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Problems Table Component */}
      <ProblemTable problems={ALL_PROBLEMS} />

    </div>
  );
}
