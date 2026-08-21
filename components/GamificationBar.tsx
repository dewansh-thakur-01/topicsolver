'use client';

import React from 'react';
import { useStore } from '@/lib/useStore';
import { BookOpen, Video, HelpCircle, CheckCircle, Flame, Award, TrendingUp } from 'lucide-react';

export const GamificationBar: React.FC = () => {
  const { completedLessons, passedQuizzes, getSkillRank, getOverallProgress, user } = useStore();
  
  const totalLessons = 112; // 54 Java + 24 SQL + 34 C
  const videosWatchedCount = completedLessons.length;
  const videosPct = Math.round((videosWatchedCount / totalLessons) * 100);
  
  const quizzesSolvedCount = Object.keys(passedQuizzes).length;
  const quizzesPct = Math.round((quizzesSolvedCount / totalLessons) * 100);

  // Started courses count
  const javaStarted = completedLessons.some(id => id.startsWith('java-'));
  const sqlStarted = completedLessons.some(id => id.startsWith('sql-'));
  const cStarted = completedLessons.some(id => id.startsWith('c-'));
  const coursesStartedCount = [javaStarted, sqlStarted, cStarted].filter(Boolean).length;

  const overallPct = getOverallProgress();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      
      {/* Card 1: Total Courses Card */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0E121B] p-5 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Courses</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-2xl font-bold text-white font-mono">{coursesStartedCount} <span className="text-sm font-normal text-slate-400">/ 3</span></div>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            +1 Active
          </span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(coursesStartedCount / 3) * 100}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-slate-400">Java (54), SQL (24) & C (34)</p>
      </div>

      {/* Card 2: Videos Completed Card */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0E121B] p-5 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Videos Completed</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Video className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-2xl font-bold text-white font-mono">{videosWatchedCount} <span className="text-sm font-normal text-slate-400">/ {totalLessons}</span></div>
          <span className="text-xs font-semibold text-cyan-400 font-mono">{videosPct}%</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${videosPct}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-slate-400">Auto-marks completed at 85% view</p>
      </div>

      {/* Card 3: MCQ Quizzes Solved Card */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0E121B] p-5 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MCQ Quizzes Solved</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-2xl font-bold text-white font-mono">{quizzesSolvedCount} <span className="text-sm font-normal text-slate-400">/ {totalLessons}</span></div>
          <span className="text-xs font-semibold text-amber-400 font-mono">{quizzesPct}%</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-amber-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${quizzesPct}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-slate-400">Passing unlocks next curriculum module</p>
      </div>

      {/* Card 4: Overall Completion Metric */}
      <div className="relative overflow-hidden rounded-xl border border-indigo-500/30 bg-[#0E121B] p-5 shadow-sm hover:border-indigo-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Overall Completion</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 font-mono">
            {overallPct}%
          </div>
          <div className="flex items-center space-x-1 text-xs text-amber-400 font-semibold">
            <Flame className="h-3.5 w-3.5 fill-amber-400" />
            <span>{user?.currentStreak || 1}d Streak</span>
          </div>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${overallPct}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-slate-400 font-medium truncate">
          Rank: <span className="text-indigo-300">{getSkillRank()}</span>
        </p>
      </div>

    </div>
  );
};
