'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRACTICE_PROBLEMS, PracticeProblem } from '@/lib/topicSolverData';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { getTranslation } from '@/lib/translations';
import { 
  Terminal, 
  Search, 
  CheckCircle2, 
  Circle, 
  Code2, 
  Database, 
  Cpu, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Filter,
  Flame,
  Zap
} from 'lucide-react';

export default function PracticeDirectoryPage() {
  const { practiceStatus, language } = useTopicSolverStore();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProblems = useMemo(() => {
    return PRACTICE_PROBLEMS.filter(p => {
      if (selectedSubject !== 'All' && p.subjectId !== selectedSubject.toLowerCase()) return false;
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.topicName.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedSubject, selectedDifficulty, searchQuery]);

  const solvedCount = Object.values(practiceStatus).filter(p => p.solved).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner - Black & Grey Theme */}
      <div className="relative overflow-hidden rounded-3xl border border-[#2D3748] bg-gradient-to-r from-[#121620] via-[#161B26] to-[#121620] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#1E293B] px-3.5 py-1 text-xs font-semibold text-[#60A5FA] border border-[#334155]">
              <Terminal className="h-3.5 w-3.5" />
              <span>{getTranslation(language, 'nav.practice')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {getTranslation(language, 'practice.title')}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {getTranslation(language, 'practice.subtitle')}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
            <div className="rounded-2xl bg-[#1A202C] p-4 border border-[#334155] text-center shadow-inner">
              <div className="text-xl font-extrabold text-white">{PRACTICE_PROBLEMS.length}</div>
              <div className="text-[10px] text-slate-400">Total Problems</div>
            </div>

            <div className="rounded-2xl bg-[#064E3B]/40 p-4 border border-emerald-500/40 text-center shadow-inner">
              <div className="text-xl font-extrabold text-emerald-400">{solvedCount}</div>
              <div className="text-[10px] text-emerald-300">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar - Black & Grey Theme */}
      <div className="rounded-2xl border border-[#2D3748] bg-[#161B26] p-5 shadow-xl space-y-4">
        
        {/* Subject Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2D3748] pb-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-[#121620] p-1.5 rounded-2xl border border-[#2D3748]">
            {['All', 'Java', 'Python', 'SQL', 'DSA'].map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedSubject === subj
                    ? 'bg-[#2B6FF3] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E293B]'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing <span className="font-bold text-white">{filteredProblems.length}</span> Challenges
          </span>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-[#121620] pl-10 pr-4 py-2.5 text-xs text-white border border-[#2D3748] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:border-transparent"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-xl bg-[#121620] px-3.5 py-2.5 text-xs text-slate-200 border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3]"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy (Green)</option>
            <option value="Medium">Medium (Yellow)</option>
            <option value="Hard">Hard (Red)</option>
          </select>
        </div>

      </div>

      {/* Problems List Grid - Black & Grey Combination Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProblems.map((prob) => {
          const isSolved = practiceStatus[prob.id]?.solved || false;

          return (
            <div
              key={prob.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#2D3748] bg-[#121620] hover:bg-[#161B26] p-6 shadow-xl hover:border-[#60A5FA] transition-all duration-300 hover:-translate-y-1 transform-gpu"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="rounded-md bg-[#1E293B] px-2.5 py-1 text-[10px] font-mono font-bold text-slate-300 border border-[#334155] uppercase">
                      {prob.subjectId}
                    </span>
                    <span className="rounded-md bg-[#1E293B]/80 px-2.5 py-1 text-[10px] font-semibold text-[#60A5FA] border border-[#2B6FF3]/30">
                      {prob.topicName}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    prob.difficulty === 'Easy' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' :
                    prob.difficulty === 'Medium' ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' :
                    'bg-rose-950/80 text-rose-300 border-rose-500/40'
                  }`}>
                    {prob.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight mt-3 group-hover:text-[#60A5FA] transition-colors">
                  {prob.title}
                </h3>

                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                  {prob.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2D3748] flex items-center justify-between">
                <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {prob.estimatedTime}</span>
                  <span>• {prob.acceptancePercentage}% Acceptance</span>
                </div>

                <Link
                  href={`/practice/${prob.id}`}
                  className="inline-flex items-center space-x-1.5 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white px-4 py-2 text-xs font-bold shadow-md shadow-[#2B6FF3]/30 transition-all hover:scale-105"
                >
                  <span>{isSolved ? 'Solve Again' : 'Start Problem'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
