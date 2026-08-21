'use client';

import React from 'react';
import Link from 'next/link';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { SUBJECT_COURSES } from '@/lib/topicSolverData';
import { getOkrProgressColor } from '@/lib/adaptiveEngine';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { MasteryBar } from '@/components/MasteryBar';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Compass, 
  Zap, 
  BookOpen, 
  Terminal, 
  Layers, 
  Clock,
  Play,
  Info
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, activeSubject, lowBandwidthMode, toggleLowBandwidthMode } = useTopicSolverStore();
  const course = SUBJECT_COURSES[activeSubject] || SUBJECT_COURSES.java;

  const masteriesList = Object.values(profile.topicMasteries);
  const masteredCount = masteriesList.filter(m => m.tier === 'MASTERED').length;
  const averageMastery = masteriesList.length > 0
    ? Math.round(masteriesList.reduce((acc, curr) => acc + curr.score, 0) / masteriesList.length)
    : 50;

  const averageOkr = getOkrProgressColor(averageMastery);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Persona Switcher Bar */}
      <PersonaSwitcher />

      {/* 2. Welcome Back Banner with Kailash & One Obvious Next Action */}
      <div className="relative overflow-hidden rounded-3xl border border-[#2D3748] bg-gradient-to-r from-[#121620] via-[#161B26] to-[#121620] p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="flex items-start gap-4">
            {/* Kailash Male Avatar */}
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-2 border-[#2B6FF3] object-cover shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#121620]" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#1E293B] px-3 py-1 text-xs font-semibold text-[#60A5FA] border border-[#334155] flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-[#60A5FA]" />
                  <span>Level: <b className="text-white">{profile.level}</b></span>
                </span>

                <span className="rounded-full bg-[#78350F]/40 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span><b>{profile.streakDays} Day</b> Learning Streak</span>
                </span>

                <span className="rounded-full bg-[#164E63]/40 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Pace: <b className="text-white">{profile.learningPace}</b></span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, <span className="text-[#60A5FA]">{profile.name}</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                TOPIC SOLVER is continuously adapting your learning path in <span className="font-semibold text-white">{course.title}</span>. Your current calibrated difficulty is <span className="font-bold text-amber-300">{profile.currentDifficulty}</span>.
              </p>
            </div>
          </div>

          {/* Primary Next Action Card */}
          <div className="rounded-2xl bg-[#1A202C] border border-[#2D3748] p-5 min-w-[280px] shadow-lg space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#60A5FA] uppercase font-bold tracking-wider">
                Recommended Next Action
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400">Current Focus:</div>
              <div className="text-sm font-bold text-white tracking-tight">{profile.currentFocusTopicName}</div>
            </div>

            <Link
              href={`/lessons/${profile.currentFocusTopicId}`}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#2B6FF3]/30 transition-all hover:scale-[1.02] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Continue Learning</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* 3. OKR Progress Scale & Methodology Legend Card */}
      <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 shadow-xs space-y-3 dark:border-[#222B3D] dark:bg-[#121622]">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#16191D] dark:text-white">
          <Info className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
          <span>OKR Progress Tracking Logic & Scale:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1 dark:border-[#222B3D] dark:bg-[#0E121C]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Gray (0.0)</span>
              <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
            </div>
            <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">Unallocated / Not started</p>
          </div>

          <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 space-y-1 dark:border-rose-900/40 dark:bg-rose-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400">Red (0.0 - 0.3)</span>
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            </div>
            <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">Low progress / Critical risk</p>
          </div>

          <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 space-y-1 dark:border-amber-900/40 dark:bg-amber-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Amber (0.4 - 0.6)</span>
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            </div>
            <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">Medium progress / Caution</p>
          </div>

          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 space-y-1 dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Green (0.7 - 0.99)</span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">High progress / On track</p>
          </div>

          <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 space-y-1 dark:border-blue-900/40 dark:bg-blue-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2B6FF3] dark:text-[#60A5FA]">Blue (1.0)</span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#2B6FF3] dark:bg-[#3B82F6]" />
            </div>
            <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">Completed milestone (100%)</p>
          </div>
        </div>
      </div>

      {/* 4. Engagement & Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 space-y-2 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <div className="flex items-center justify-between text-[#687385] text-xs dark:text-[#94A3B8]">
            <span className="font-semibold uppercase tracking-wider">Average Mastery</span>
            <Award className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold text-[#16191D] font-mono dark:text-white">{averageMastery}%</div>
            <span className={`text-[10px] font-semibold ${averageOkr.textColor}`}>
              ({(averageMastery / 100).toFixed(2)} OKR)
            </span>
          </div>
          
          {/* Average OKR progress bar */}
          <div className="w-full bg-[#F7F9FC] border border-[#DCE5F2] rounded-full h-2 overflow-hidden dark:bg-[#0E121C] dark:border-[#222B3D]">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${averageOkr.barBg}`}
              style={{ width: `${averageMastery}%` }}
            />
          </div>

          <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">{masteredCount} topics fully mastered</p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 space-y-2 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <div className="flex items-center justify-between text-[#687385] text-xs dark:text-[#94A3B8]">
            <span className="font-semibold uppercase tracking-wider">Weekly Activity</span>
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 font-mono dark:text-emerald-400">
            {profile.topicsImprovedThisWeek} Topics
          </div>
          <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">Improved in the last 7 days</p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 space-y-2 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <div className="flex items-center justify-between text-[#687385] text-xs dark:text-[#94A3B8]">
            <span className="font-semibold uppercase tracking-wider">Practice Solved</span>
            <Terminal className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-600 font-mono dark:text-cyan-400">
            {profile.problemsCompleted} Problems
          </div>
          <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">Across test cases & challenges</p>
        </div>

        <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 space-y-2 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
          <div className="flex items-center justify-between text-[#687385] text-xs dark:text-[#94A3B8]">
            <span className="font-semibold uppercase tracking-wider">Low Data Mode</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#16191D] font-mono dark:text-white">
              {lowBandwidthMode ? '⚡ Active (<50KB)' : 'Standard Stream'}
            </span>
            <button
              onClick={toggleLowBandwidthMode}
              className="text-[10px] text-[#2B6FF3] hover:text-[#1557D6] font-semibold underline dark:text-[#60A5FA]"
            >
              Toggle
            </button>
          </div>
          <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">Optimized for rural connections</p>
        </div>

      </div>

      {/* 5. Concept Mastery Breakdown with OKR Progress Bars */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#16191D] tracking-tight flex items-center gap-2 dark:text-white">
              <Award className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
              <span>Concept Mastery Breakdown ({course.title})</span>
            </h2>
            <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
              Progress bars automatically colored via OKR standard logic (Red: 0.0–0.3, Amber: 0.4–0.6, Green: 0.7–0.99, Blue: 1.0).
            </p>
          </div>

          <Link
            href="/my-path"
            className="text-xs font-semibold text-[#2B6FF3] hover:text-[#1557D6] flex items-center gap-1 dark:text-[#60A5FA]"
          >
            <span>View Full Roadmap</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {masteriesList.map((m) => (
            <MasteryBar
              key={m.topicId}
              topicName={m.topicName}
              score={m.score}
              tier={m.tier}
              attempts={m.attempts}
              isDarkTheme={false}
            />
          ))}
        </div>
      </section>

      {/* 6. Strengths vs Needs Attention Split & AI Resource Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Strengths & Weaknesses */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Strengths */}
          <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 space-y-3 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Mastered Strengths</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#16191D] dark:text-slate-200">
              {profile.strengths.map((s, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800/40">
                  <span className="font-semibold">{s}</span>
                  <span className="text-emerald-700 text-[10px] font-bold dark:text-emerald-400">Mastered ✓</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Needs Attention */}
          <div className="rounded-2xl border border-[#DCE5F2] bg-white p-5 space-y-3 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <span>Needs Attention</span>
            </div>
            {profile.weakTopics.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-[#16191D] dark:text-slate-200">
                {profile.weakTopics.map((w, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800/40">
                    <span className="font-semibold">{w}</span>
                    <span className="text-amber-700 text-[10px] font-bold dark:text-amber-400">Reinforce ⚠</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#687385] dark:text-[#94A3B8]">Zero major weak points detected!</p>
            )}
          </div>

        </div>

        {/* Right Column: AI Personalized Resource Recommendations */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-4 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
            
            <div className="flex items-center justify-between border-b border-[#DCE5F2] pb-3 dark:border-[#222B3D]">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
                <h3 className="text-sm font-bold text-[#16191D] tracking-tight dark:text-white">
                  Recommended For Kailash by AI
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#2B6FF3] font-bold dark:text-[#60A5FA]">
                Adaptive Recommendation Engine
              </span>
            </div>

            <div className="space-y-3">
              {profile.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-xl border border-[#DCE5F2] bg-[#F7F9FC] p-4 space-y-2 hover:border-[#2B6FF3] transition-colors dark:border-[#222B3D] dark:bg-[#0E121C] dark:hover:border-[#3B82F6]"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#2B6FF3]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                      {rec.type} • {rec.estimatedTime}
                    </span>
                    <Link
                      href={rec.actionLink}
                      className="text-xs font-bold text-[#2B6FF3] hover:text-[#1557D6] flex items-center gap-1 dark:text-[#60A5FA]"
                    >
                      <span>Start Activity</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <h4 className="text-xs font-bold text-[#16191D] dark:text-white">{rec.title}</h4>
                  
                  <p className="text-[11px] text-[#687385] leading-relaxed font-sans dark:text-[#94A3B8]">
                    <span className="text-[#16191D] font-bold dark:text-white">Why this resource? </span>
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* 7. Achievements Wall */}
      <section className="rounded-2xl border border-[#DCE5F2] bg-white p-6 space-y-4 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-bold text-[#16191D] tracking-tight dark:text-white">Unlocked Learning Achievements</h3>
          </div>
          <span className="text-xs font-mono text-[#687385] dark:text-[#94A3B8]">{profile.achievements.length} Badges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {profile.achievements.map((ach) => (
            <div key={ach.id} className="flex items-center space-x-3 rounded-xl bg-[#F7F9FC] p-3.5 border border-[#DCE5F2] dark:border-[#222B3D] dark:bg-[#0E121C]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200 font-bold dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40">
                🏆
              </div>
              <div>
                <div className="text-xs font-bold text-[#16191D] dark:text-white">{ach.title}</div>
                <div className="text-[10px] text-[#687385] dark:text-[#94A3B8]">{ach.description}</div>
                <div className="text-[9px] font-mono text-[#687385] mt-0.5 dark:text-[#94A3B8]">{ach.unlockedAt}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
