'use client';

import React from 'react';
import Link from 'next/link';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { SUBJECT_COURSES } from '@/lib/topicSolverData';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  AlertCircle,
  Play,
  Award,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';

export default function MyPathPage() {
  const { profile, activeSubject, completedLessons, setActiveSubject } = useTopicSolverStore();
  const course = SUBJECT_COURSES[activeSubject] || SUBJECT_COURSES.java;

  const allTopics = course.modules.flatMap(m => m.topics);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Persona Switcher for Instant Judge Demo */}
      <PersonaSwitcher />

      {/* Header Banner - Black & Grey Theme */}
      <div className="relative overflow-hidden rounded-3xl border border-[#2D3748] bg-gradient-to-r from-[#121620] via-[#161B26] to-[#121620] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#1E293B] px-3.5 py-1 text-xs font-semibold text-[#60A5FA] border border-[#334155]">
              <Compass className="h-3.5 w-3.5 text-[#60A5FA]" />
              <span>Personalized Dynamic Roadmap • {course.title}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized Learning Route
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This path has been tailored specifically for <span className="font-bold text-white">{profile.name}</span> ({profile.level} Level). Complete each level sequentially to unlock the next milestone!
            </p>
          </div>

          {/* Subject Switcher Pill */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#121620] p-1.5 rounded-2xl border border-[#2D3748] shrink-0">
            {(['java', 'python', 'sql', 'dsa', 'c'] as const).map(subj => (
              <button
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                  activeSubject === subj
                    ? 'bg-[#2B6FF3] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E293B]'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Roadmap Node List - Black & Grey Combination Boxes for all stages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#16191D] tracking-tight flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#2B6FF3]" />
            <span>Step-by-Step Level Progression</span>
          </h2>
          <span className="text-xs font-mono text-[#687385]">
            {allTopics.filter(t => completedLessons.includes(t.id)).length} / {allTopics.length} Levels Cleared
          </span>
        </div>

        <div className="space-y-4 relative">
          
          {/* Vertical Metallic Connecting Line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#2D3748] hidden sm:block" />

          {allTopics.map((topic, idx) => {
            const isCompleted = completedLessons.includes(topic.id);
            const isFirst = idx === 0;
            const prevTopic = idx > 0 ? allTopics[idx - 1] : null;
            const isUnlocked = isFirst || (prevTopic && completedLessons.includes(prevTopic.id)) || isCompleted;

            const isFocus = profile.currentFocusTopicId === topic.id;
            const mastery = profile.topicMasteries[topic.id];
            const isWeakness = profile.weakTopics.includes(topic.title);

            let statusLabel = 'Locked 🔒';
            let statusColor = 'text-slate-400 bg-[#1A202C] border-[#2D3748]';

            if (isCompleted) {
              statusLabel = 'Completed ✓';
              statusColor = 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40';
            } else if (isFocus) {
              statusLabel = 'Current Focus Stage ←';
              statusColor = 'text-[#60A5FA] bg-[#1E293B] border-[#2B6FF3] animate-pulse';
            } else if (isUnlocked) {
              statusLabel = 'Unlocked Level';
              statusColor = 'text-slate-200 bg-[#1E293B] border-[#334155]';
            }

            return (
              <div
                key={topic.id}
                className={`relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border p-5 transition-all duration-300 shadow-xl ${
                  isFocus
                    ? 'border-[#2B6FF3] bg-[#161B26] ring-2 ring-[#2B6FF3]/30 hover:bg-[#1A202C]'
                    : isCompleted
                      ? 'border-[#2D3748] bg-[#121620] hover:bg-[#161B26]'
                      : isUnlocked
                        ? 'border-[#2D3748] bg-[#121620] hover:bg-[#161B26]'
                        : 'border-[#1E2533] bg-[#0E121A]/70 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Step Number / Icon */}
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold border ${
                    isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                      : isFocus
                        ? 'bg-[#2B6FF3] text-white border-[#60A5FA] shadow-md shadow-[#2B6FF3]/40'
                        : isUnlocked
                          ? 'bg-[#1E293B] text-slate-200 border-[#334155]'
                          : 'bg-[#121620] text-slate-500 border-[#2D3748]'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : isUnlocked ? idx + 1 : <Lock className="h-4 w-4 text-slate-500" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-sm font-bold tracking-tight ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                        {topic.title}
                      </h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <p className={`text-xs max-w-xl leading-relaxed ${isUnlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                      {topic.description}
                    </p>

                    {/* AI Explainable Why Badge */}
                    {isFocus && (
                      <div className="rounded-lg bg-[#1E293B] p-2.5 border border-[#2B6FF3]/40 text-[11px] text-[#93C5FD] font-sans mt-2">
                        <span className="font-bold text-white">Why this level? </span>
                        {isWeakness 
                          ? `Your mastery in ${topic.title} is at ${mastery?.score || 48}%. Targeted reinforcement will solidify this level.`
                          : `Prerequisite fundamentals validated. You are ready to master ${topic.title}!`}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Button & Mastery Score */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2D3748]">
                  {mastery && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase">Mastery: </span>
                      <span className="font-mono text-xs font-bold text-white">{mastery.score}%</span>
                    </div>
                  )}

                  {isUnlocked ? (
                    <Link
                      href={`/lessons/${topic.id}`}
                      className={`inline-flex items-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md ${
                        isFocus
                          ? 'bg-[#2B6FF3] hover:bg-[#1557D6] text-white shadow-[#2B6FF3]/30'
                          : isCompleted
                            ? 'bg-[#1E293B] hover:bg-[#2D3748] text-white border border-[#334155]'
                            : 'bg-[#2B6FF3] hover:bg-[#1557D6] text-white shadow-[#2B6FF3]/25'
                      }`}
                    >
                      <span>{isCompleted ? 'Review Level' : isFocus ? 'Start Level' : 'Open Level'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center space-x-1.5 rounded-xl bg-[#1A202C] px-3.5 py-1.5 text-xs font-semibold text-slate-500 border border-[#2D3748] cursor-not-allowed">
                      <Lock className="h-3 w-3 text-slate-500" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
