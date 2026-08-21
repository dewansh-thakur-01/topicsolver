'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/useStore';
import { Sparkles, ArrowRight, Award, Flame, Play, CheckCircle2 } from 'lucide-react';

export const WelcomeBanner: React.FC = () => {
  const { user, getSkillRank, getOverallProgress, completedLessons } = useStore();
  const overallPct = getOverallProgress();
  const skillRank = getSkillRank();
  const name = user?.name || 'Learner';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-slate-950 p-6 sm:p-8 shadow-xl shadow-indigo-950/20">
      {/* Background Subtle Mesh / Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* Left Content */}
        <div className="space-y-3 max-w-2xl">
          
          {/* Skill Rank Tag */}
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30 shadow-inner">
            <Award className="h-3.5 w-3.5 text-indigo-400" />
            <span>Skill Rank: {skillRank}</span>
            <span className="h-1 w-1 rounded-full bg-indigo-400" />
            <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span className="text-amber-300">{user?.currentStreak || 1} Day Streak</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400">{name}!</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Track your Java, SQL, and C mastery step by step on Leatcode, solve official SQL database and Java coding problems, and monitor your automatic learning progress.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/courses/java"
              className="inline-flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-[1.02]"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Continue Java Course</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>

            <Link
              href="/problems"
              className="inline-flex items-center space-x-2 rounded-lg bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Practice 785+ LeetCode Problems</span>
            </Link>
          </div>
        </div>

        {/* Right Radial Progress Card */}
        <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-800 p-5 min-w-[240px] shadow-lg">
          <div className="relative flex h-20 w-20 items-center justify-center shrink-0">
            {/* SVG Radial Bar */}
            <svg className="h-20 w-20 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${overallPct}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-bold text-white font-mono">{overallPct}%</span>
          </div>

          <div className="ml-4 space-y-1">
            <h3 className="text-xs font-semibold text-slate-300">Overall Track Completion</h3>
            <p className="text-[11px] text-slate-400 font-mono">
              {completedLessons.length} / 112 Video Lessons
            </p>
            <div className="flex items-center space-x-1 text-[11px] text-emerald-400 pt-0.5">
              <CheckCircle2 className="h-3 w-3" />
              <span>Auto-tracked via Quizzes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
