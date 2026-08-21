'use client';

import React from 'react';
import Link from 'next/link';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { SUBJECT_COURSES } from '@/lib/topicSolverData';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { Map, Layers, CheckCircle2, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export default function RoadmapPage() {
  const { activeSubject, setActiveSubject, profile, completedLessons } = useTopicSolverStore();

  const subjects: Array<'java' | 'python' | 'sql' | 'dsa' | 'c'> = ['java', 'python', 'sql', 'dsa', 'c'];
  const currentCourse = SUBJECT_COURSES[activeSubject] || SUBJECT_COURSES.java;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Persona Switcher */}
      <PersonaSwitcher />

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3.5 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25">
          <Map className="h-3.5 w-3.5" />
          <span>Curriculum Subject Trees</span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#16191D] tracking-tight">
          Comprehensive Subject Roadmaps
        </h1>

        <p className="text-xs sm:text-sm text-[#687385] max-w-2xl leading-relaxed">
          Explore the full modular curriculum across all core domains. Your current personalized path is highlighted within each subject tree.
        </p>
      </div>

      {/* Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#DCE5F2] pb-4">
        {subjects.map(subj => {
          const course = SUBJECT_COURSES[subj];
          const isSelected = activeSubject === subj;
          return (
            <button
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[#2B6FF3] text-white shadow-md shadow-[#2B6FF3]/25'
                  : 'bg-white text-[#687385] border border-[#DCE5F2] hover:text-[#16191D] hover:bg-[#F7F9FC]'
              }`}
            >
              <span>{course.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F7F9FC] text-[#687385] border border-[#DCE5F2]'}`}>
                {course.totalTopics}
              </span>
            </button>
          );
        })}
      </div>

      {/* Modules Roadmap Visual - Black & Grey Combination Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentCourse.modules.map((mod, mIdx) => (
          <div
            key={mod.id}
            className="rounded-2xl border border-[#2D3748] bg-[#121620] p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#2D3748] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#60A5FA] uppercase font-bold">
                  Stage {mIdx + 1}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">{mod.title}</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{mod.topics.length} Topics</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{mod.description}</p>

            <div className="space-y-2.5 pt-2">
              {mod.topics.map((t) => {
                const isCompleted = completedLessons.includes(t.id);
                const isFocus = profile.currentFocusTopicId === t.id;
                const mastery = profile.topicMasteries[t.id];

                return (
                  <Link
                    key={t.id}
                    href={`/lessons/${t.id}`}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                      isFocus
                        ? 'border-[#2B6FF3] bg-[#1E293B] text-white font-semibold ring-2 ring-[#2B6FF3]/40'
                        : isCompleted
                          ? 'border-emerald-500/40 bg-emerald-950/30 text-slate-200'
                          : 'border-[#2D3748] bg-[#161B26] text-slate-300 hover:bg-[#1A202C] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <div className={`h-2 w-2 rounded-full ${isFocus ? 'bg-[#60A5FA] animate-pulse' : 'bg-slate-500'}`} />
                      )}
                      <span>{t.title}</span>
                    </div>

                    <div className="flex items-center space-x-2 font-mono text-[11px]">
                      {mastery && (
                        <span className="text-[#60A5FA] font-bold">{mastery.score}%</span>
                      )}
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
