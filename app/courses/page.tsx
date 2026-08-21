'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SUBJECT_COURSES } from '@/lib/topicSolverData';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { getTranslation } from '@/lib/translations';
import { 
  Code2, 
  Database, 
  Terminal, 
  Cpu, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Brain,
  Zap,
  Play
} from 'lucide-react';

export default function CoursesPage() {
  const router = useRouter();
  const { setActiveSubject, completedLessons, language } = useTopicSolverStore();

  const courses = Object.values(SUBJECT_COURSES);

  const renderIcon = (subjectId: string) => {
    switch (subjectId) {
      case 'java':
        return <Code2 className="h-6 w-6 text-amber-500" />;
      case 'python':
        return <Terminal className="h-6 w-6 text-blue-500" />;
      case 'sql':
        return <Database className="h-6 w-6 text-cyan-500" />;
      case 'dsa':
        return <Layers className="h-6 w-6 text-purple-500" />;
      case 'c':
        return <Cpu className="h-6 w-6 text-emerald-500" />;
      default:
        return <BookOpen className="h-6 w-6 text-[#2B6FF3]" />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Persona Switcher */}
      <PersonaSwitcher />

      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3.5 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{getTranslation(language, 'nav.courses')}</span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
          {getTranslation(language, 'courses.title')}
        </h1>

        <p className="text-xs sm:text-sm text-[#687385] leading-relaxed dark:text-[#94A3B8]">
          {getTranslation(language, 'courses.subtitle')}
        </p>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => {
          const allTopics = c.modules.flatMap(m => m.topics);
          const completedCount = allTopics.filter(t => completedLessons.includes(t.id)).length;
          const progressPct = Math.round((completedCount / allTopics.length) * 100);

          return (
            <div
              key={c.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-[#DCE5F2] bg-white p-8 shadow-xs hover:border-[#2B6FF3]/50 hover:shadow-xl transition-all duration-300 dark:border-[#222B3D] dark:bg-[#121622] dark:hover:border-[#3B82F6]/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] shadow-inner dark:bg-[#0E121C] dark:border-[#222B3D]">
                    {renderIcon(c.id)}
                  </div>

                  <span className="rounded-full bg-[#2B6FF3]/10 px-3 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                    {c.totalTopics} {getTranslation(language, 'courses.levels')}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#16191D] tracking-tight group-hover:text-[#2B6FF3] transition-colors dark:text-white dark:group-hover:text-[#60A5FA]">
                  {getTranslation(language, `subject.${c.id}`, c.title)}
                </h3>

                <p className="text-xs font-semibold text-[#687385] tracking-wide mt-1 dark:text-[#94A3B8]">
                  {c.tagline}
                </p>

                <p className="mt-3 text-xs text-[#687385] leading-relaxed line-clamp-3 dark:text-[#94A3B8]">
                  {c.description}
                </p>

                {/* Modules Summary Pill */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {c.modules.map((m, idx) => (
                    <span key={idx} className="rounded-lg bg-[#F7F9FC] px-2 py-1 text-[11px] font-mono text-[#687385] border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8]">
                      {m.title.split(':')[0]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="mt-8 pt-6 border-t border-[#DCE5F2] space-y-4 dark:border-[#222B3D]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#687385] dark:text-[#94A3B8]">Progress: {completedCount} / {c.totalTopics} {getTranslation(language, 'courses.levels')}</span>
                  <span className="font-bold text-[#16191D] dark:text-white">{progressPct}%</span>
                </div>

                <div className="w-full bg-[#F7F9FC] border border-[#DCE5F2] rounded-full h-2 overflow-hidden dark:bg-[#0E121C] dark:border-[#222B3D]">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      progressPct <= 0 ? 'bg-slate-300 dark:bg-slate-700' :
                      progressPct <= 30 ? 'bg-rose-500' :
                      progressPct <= 69 ? 'bg-amber-500' :
                      progressPct < 100 ? 'bg-emerald-500' :
                      'bg-[#2B6FF3] dark:bg-[#3B82F6]'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <button
                    onClick={() => {
                      setActiveSubject(c.id);
                      router.push(`/assessment/${c.id}`);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                  >
                    <span>{getTranslation(language, 'courses.takeAssessment')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    href={`/courses/${c.id}`}
                    className="flex items-center justify-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] hover:border-[#2B6FF3] hover:text-[#2B6FF3] transition-colors dark:bg-[#121622] dark:border-[#222B3D] dark:text-slate-200 dark:hover:bg-[#1E2538] dark:hover:border-[#3B82F6] dark:hover:text-white"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-[#687385] dark:text-[#94A3B8]" />
                    <span>{getTranslation(language, 'home.viewSyllabus')}</span>
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

