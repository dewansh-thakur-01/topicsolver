'use client';

import React, { use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SUBJECT_COURSES, TopicLesson } from '@/lib/topicSolverData';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { getTranslation } from '@/lib/translations';
import { 
  BookOpen, 
  Code2, 
  Database, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Clock, 
  Compass,
  Layers,
  Lock,
  Unlock,
  Award
} from 'lucide-react';

interface PageProps {
  params: Promise<{ subjectId: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const subjectId = resolvedParams.subjectId as 'java' | 'python' | 'sql' | 'dsa' | 'c';
  const router = useRouter();

  const course = SUBJECT_COURSES[subjectId];

  if (!course) {
    return notFound();
  }

  const { completedLessons, setActiveSubject, profile, language } = useTopicSolverStore();

  // Create a flat array of all sequential topics across all modules in this course
  const allCourseTopics: TopicLesson[] = course.modules.flatMap(m => m.topics);

  // Calculate overall course progress
  const completedInCourse = allCourseTopics.filter(t => completedLessons.includes(t.id)).length;
  const progressPercent = Math.round((completedInCourse / allCourseTopics.length) * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Card with Progress Bar */}
      <div className="relative overflow-hidden rounded-3xl border border-[#DCE5F2] bg-white p-8 shadow-xs space-y-6 dark:border-[#222B3D] dark:bg-[#121622]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{getTranslation(language, 'courseDetail.syllabus')}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
              {getTranslation(language, `subject.${course.id}`, course.title)}
            </h1>

            <p className="text-xs font-semibold text-[#687385] dark:text-[#94A3B8]">
              {course.tagline}
            </p>

            <p className="text-xs text-[#687385] leading-relaxed dark:text-[#94A3B8]">
              {course.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveSubject(course.id);
                router.push(`/assessment/${course.id}`);
              }}
              className="flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-3 text-xs font-bold text-white shadow-xs transition-all dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
            >
              <Compass className="h-4 w-4" />
              <span>{getTranslation(language, 'home.takeAssessment')}</span>
            </button>

            <Link
              href="/my-path"
              className="flex items-center justify-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] hover:border-[#2B6FF3] hover:text-[#2B6FF3] transition-colors dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white dark:hover:bg-[#1E2538]"
            >
              <span>{getTranslation(language, 'nav.myPath')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Course Completion Progress */}
        <div className="pt-4 border-t border-[#DCE5F2] space-y-2 dark:border-[#222B3D]">
          <div className="flex items-center justify-between text-xs text-[#687385] dark:text-[#94A3B8]">
            <span className="font-semibold text-[#16191D] flex items-center gap-1.5 dark:text-white">
              <Award className="h-4 w-4 text-amber-500" />
              <span>{getTranslation(language, 'analytics.masteryLevel')}</span>
            </span>
            <span className="font-mono text-[#2B6FF3] font-bold dark:text-[#60A5FA]">
              {completedInCourse} / {allCourseTopics.length} {getTranslation(language, 'courses.levels')} ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#F7F9FC] border border-[#DCE5F2] overflow-hidden dark:bg-[#0E121C] dark:border-[#222B3D]">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                progressPercent <= 0 ? 'bg-slate-300 dark:bg-slate-700' :
                progressPercent <= 30 ? 'bg-rose-500' :
                progressPercent <= 69 ? 'bg-amber-500' :
                progressPercent < 100 ? 'bg-emerald-500' :
                'bg-[#2B6FF3] dark:bg-[#3B82F6]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modules & Topics Breakdown with Level Locking */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#16191D] tracking-tight flex items-center gap-2 dark:text-white">
            <Layers className="h-4 w-4 text-[#2B6FF3]" />
            <span>{getTranslation(language, 'courseDetail.syllabus')}</span>
          </h2>
          <span className="text-xs font-mono text-[#687385] dark:text-[#94A3B8]">
            {course.modules.length} {getTranslation(language, 'courses.modules')} • {course.totalTopics} {getTranslation(language, 'courses.levels')}
          </span>
        </div>

        <div className="space-y-6">
          {course.modules.map((mod, mIdx) => {
            const prevModule = mIdx > 0 ? course.modules[mIdx - 1] : null;
            const isPrevModuleCompleted = !prevModule || prevModule.topics.every(t => completedLessons.includes(t.id));
            const isAnyTopicInModuleCompleted = mod.topics.some(t => completedLessons.includes(t.id));
            const isModuleUnlocked = mIdx === 0 || isPrevModuleCompleted || isAnyTopicInModuleCompleted;

            const completedInModule = mod.topics.filter(t => completedLessons.includes(t.id)).length;
            const isModuleFinished = completedInModule === mod.topics.length;

            return (
              <div
                key={mod.id}
                className={`rounded-3xl border transition-all overflow-hidden shadow-xs ${
                  !isModuleUnlocked 
                    ? 'border-[#DCE5F2]/70 bg-[#F7F9FC]/40 opacity-75 dark:border-[#222B3D]/70 dark:bg-[#0E121C]/40' 
                    : 'border-[#DCE5F2] bg-white dark:border-[#222B3D] dark:bg-[#121622]'
                }`}
              >
                {/* Module Header */}
                <div className={`p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                  !isModuleUnlocked
                    ? 'bg-[#F1F5F9] border-[#DCE5F2] text-slate-500 dark:bg-[#0A0D16] dark:border-[#222B3D]'
                    : 'bg-[#F7F9FC] border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D]'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isModuleUnlocked ? 'text-[#2B6FF3] dark:text-[#60A5FA]' : 'text-slate-400 dark:text-slate-600'
                      }`}>
                        {getTranslation(language, 'courses.modules')} {mIdx + 1} / {course.modules.length}
                      </span>

                      {isModuleFinished && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300">
                          {getTranslation(language, 'courseDetail.moduleMastered')}
                        </span>
                      )}

                      {!isModuleUnlocked && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300">
                          {getTranslation(language, 'courseDetail.moduleLocked')}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base font-bold ${isModuleUnlocked ? 'text-[#16191D] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                      {mod.title}
                    </h3>
                    <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
                      {mod.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                    <span className="text-[#687385] dark:text-[#94A3B8] font-bold">
                      {completedInModule} / {mod.topics.length} {getTranslation(language, 'courses.done')}
                    </span>
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="divide-y divide-[#DCE5F2] dark:divide-[#222B3D]">
                  {mod.topics.map((topic, tIdx) => {
                    const isCompleted = completedLessons.includes(topic.id);
                    const globalIdx = allCourseTopics.findIndex(t => t.id === topic.id);
                    const prevTopic = globalIdx > 0 ? allCourseTopics[globalIdx - 1] : null;

                    // Strict Sequential Locking:
                    // Topic is unlocked ONLY IF:
                    // 1. Topic is already completed (has scored >= 80% previously) OR
                    // 2. Its module is unlocked AND:
                    //    - If it's Module 1, Topic 1 (Level 1): always unlocked to start.
                    //    - If it's Topic 1 of Module K (K>1): unlocked if all topics of Module K-1 are completed.
                    //    - For any topic tIdx > 0: unlocked ONLY IF the immediate previous topic is completed.
                    const isUnlocked = isCompleted || (
                      isModuleUnlocked && (
                        (mIdx === 0 && tIdx === 0) || 
                        (prevTopic && completedLessons.includes(prevTopic.id))
                      )
                    );

                    return (
                      <div
                        key={topic.id}
                        className={`p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all ${
                          !isUnlocked 
                            ? 'bg-[#F7F9FC]/60 opacity-60 dark:bg-[#0A0D16]/50' 
                            : 'hover:bg-[#F7F9FC] dark:hover:bg-[#181F30]'
                        }`}
                      >
                        <div className="flex items-start space-x-3.5">
                          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold border transition-all ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/50'
                              : isUnlocked
                                ? 'bg-[#2B6FF3]/10 text-[#2B6FF3] border-[#2B6FF3]/30 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40'
                                : 'bg-[#F7F9FC] text-slate-400 border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                            ) : isUnlocked ? (
                              <Unlock className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
                            ) : (
                              <Lock className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                            )}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className={`text-sm font-bold ${isUnlocked ? 'text-[#16191D] dark:text-white' : 'text-[#687385] dark:text-[#64748B]'}`}>
                                {topic.title}
                              </h4>

                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                                topic.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700/40' :
                                topic.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/40' :
                                'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-700/40'
                              }`}>
                                {topic.difficulty}
                              </span>

                              {isCompleted && (
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/50">
                                  <CheckCircle2 className="h-2.5 w-2.5" />
                                  Completed (≥ 80%)
                                </span>
                              )}

                              {!isCompleted && isUnlocked && (
                                <span className="rounded-full bg-[#2B6FF3]/10 px-2 py-0.5 text-[9px] font-bold text-[#2B6FF3] border border-[#2B6FF3]/30 animate-pulse dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                                  Available Level
                                </span>
                              )}

                              {!isUnlocked && (
                                <span className="rounded-full bg-[#F7F9FC] px-2 py-0.5 text-[9px] font-medium text-[#687385] border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8]">
                                  {getTranslation(language, 'courseDetail.levelLock')}
                                </span>
                              )}
                            </div>

                            <p className={`text-xs mt-1 max-w-xl leading-relaxed ${isUnlocked ? 'text-[#687385] dark:text-[#94A3B8]' : 'text-slate-400 dark:text-slate-600'}`}>
                              {topic.description}
                            </p>

                            <div className="flex items-center space-x-3 text-[11px] text-[#687385] font-mono mt-2 dark:text-[#94A3B8]">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {topic.estimatedMinutes} min</span>
                              {topic.content.youtubeDuration && (
                                <span>• Video: {topic.content.youtubeDuration}</span>
                              )}
                              <span>• 5 Adaptive MCQs (≥ 80% to Pass)</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isUnlocked ? (
                            <Link
                              href={`/lessons/${topic.id}`}
                              className={`inline-flex items-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-bold border transition-all shadow-xs ${
                                isCompleted
                                  ? 'bg-white hover:bg-[#F7F9FC] text-[#16191D] border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white dark:hover:bg-[#1E2538]'
                                  : 'bg-[#2B6FF3] hover:bg-[#1557D6] text-white border-[#1557D6] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]'
                              }`}
                            >
                              <Play className="h-3.5 w-3.5 fill-current" />
                              <span>{isCompleted ? getTranslation(language, 'courseDetail.reviewLevel') : getTranslation(language, 'courseDetail.startLevel')}</span>
                            </Link>
                          ) : (
                            <div 
                              title="Complete previous topics with ≥ 80% to unlock this level"
                              className="inline-flex items-center space-x-1.5 rounded-xl bg-[#F7F9FC] text-slate-400 px-4 py-2 text-xs font-semibold border border-[#DCE5F2] cursor-not-allowed select-none dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-600"
                            >
                              <Lock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" />
                              <span>{getTranslation(language, 'courseDetail.locked')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
