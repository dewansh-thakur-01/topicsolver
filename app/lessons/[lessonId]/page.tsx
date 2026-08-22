'use client';

import React, { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SUBJECT_COURSES, TopicLesson } from '@/lib/topicSolverData';
import { AdaptiveQuizCard } from '@/components/AdaptiveQuizCard';
import { FlowerFlowCelebration } from '@/components/FlowerFlowCelebration';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { getTranslation } from '@/lib/translations';
import { toast } from 'sonner';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Video, 
  Code2, 
  FileText, 
  Copy, 
  Sparkles,
  Compass,
  Lock,
  Unlock,
  Award,
  Brain,
  Clock,
  Terminal
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export default function LessonPlayerPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.lessonId;
  const router = useRouter();

  const { 
    lowBandwidthMode, 
    toggleLowBandwidthMode, 
    markLessonComplete, 
    completedLessons, 
    profile, 
    language 
  } = useTopicSolverStore();

  // Locate topic & subject across all courses
  let foundTopic: TopicLesson | null = null;
  let foundSubjectTitle = '';
  let allSubjectTopics: TopicLesson[] = [];

  for (const course of Object.values(SUBJECT_COURSES)) {
    const courseTopics = course.modules.flatMap(m => m.topics);
    const match = courseTopics.find(t => t.id === lessonId);
    if (match) {
      foundTopic = match;
      foundSubjectTitle = course.title;
      allSubjectTopics = courseTopics;
      break;
    }
  }

  if (!foundTopic) {
    return notFound();
  }

  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationScore, setCelebrationScore] = useState<{ correct: number; total: number } | undefined>(undefined);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Determine sequential module & level locking
  const currentCourse = Object.values(SUBJECT_COURSES).find(c => c.id === foundTopic?.subjectId);
  const currentModule = currentCourse?.modules.find(m => m.topics.some(t => t.id === foundTopic?.id));
  const currentModuleIndex = currentCourse?.modules.findIndex(m => m.id === currentModule?.id) ?? 0;
  const prevModule = currentModuleIndex > 0 && currentCourse ? currentCourse.modules[currentModuleIndex - 1] : null;

  const isPrevModuleCompleted = !prevModule || prevModule.topics.every(t => completedLessons.includes(t.id));
  const isAnyTopicInModuleCompleted = currentModule ? currentModule.topics.some(t => completedLessons.includes(t.id)) : false;
  const isModuleUnlocked = currentModuleIndex === 0 || isPrevModuleCompleted || isAnyTopicInModuleCompleted;

  const currentGlobalIndex = allSubjectTopics.findIndex(t => t.id === foundTopic.id);
  const isFirstTopic = currentGlobalIndex === 0;
  const prevTopic = currentGlobalIndex > 0 ? allSubjectTopics[currentGlobalIndex - 1] : null;
  const nextTopic = currentGlobalIndex < allSubjectTopics.length - 1 ? allSubjectTopics[currentGlobalIndex + 1] : null;

  const isCompleted = completedLessons.includes(foundTopic.id);
  const isUnlocked = isCompleted || (isModuleUnlocked && (isFirstTopic || (prevTopic && completedLessons.includes(prevTopic.id))));

  // Passing criteria is strictly 80%
  const handleQuizComplete = (score: { correct: number; total: number; passed: boolean }) => {
    if (score.passed) {
      markLessonComplete(foundTopic.id);
      setCelebrationScore({ correct: score.correct, total: score.total });
      setShowCelebration(true);
    }
  };

  // If level is locked, show Level Locked Gate
  if (!isUnlocked && prevTopic) {
    const isLockedByModule = !isModuleUnlocked && prevModule;
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center space-y-6 animate-in fade-in duration-300">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white border border-[#DCE5F2] text-[#687385] shadow-md dark:bg-[#121622] dark:border-[#222B3D]">
          <Lock className="h-10 w-10 text-amber-500" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/40">
            <span>🔒 {isLockedByModule ? `MODULE ${currentModuleIndex + 1} LOCKED` : `LEVEL ${currentGlobalIndex + 1} LOCKED`}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] dark:text-white">
            {foundTopic.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#687385] max-w-md mx-auto dark:text-[#94A3B8]">
            {isLockedByModule 
              ? `You must complete all topics in "${prevModule?.title}" with ≥ 80% score to unlock this module.`
              : `You must pass the 5-question assessment for "${prevTopic.title}" with at least 80% to unlock this level.`}
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/lessons/${prevTopic.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#2B6FF3]/25 transition-all dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Go to Required Level: {prevTopic.title}</span>
          </Link>

          <Link
            href={`/courses/${foundTopic.subjectId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] hover:border-[#2B6FF3] hover:text-[#2B6FF3] dark:bg-[#121622] dark:border-[#222B3D] dark:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{getTranslation(language, 'courseDetail.syllabus')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Flower Flow Celebration Modal */}
      <FlowerFlowCelebration
        show={showCelebration}
        onClose={() => setShowCelebration(false)}
        completedTopicTitle={foundTopic.title}
        nextTopicId={nextTopic?.id}
        nextTopicTitle={nextTopic?.title}
        score={celebrationScore}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-medium text-[#687385] dark:text-[#94A3B8]">
        <div className="flex items-center space-x-2 flex-wrap">
          <Link href="/courses" className="hover:text-[#2B6FF3] transition-colors">
            {getTranslation(language, 'nav.courses')}
          </Link>
          <span>/</span>
          <Link href={`/courses/${foundTopic.subjectId}`} className="hover:text-[#2B6FF3] transition-colors">
            {foundSubjectTitle}
          </Link>
          <span>/</span>
          <span className="text-[#16191D] font-bold dark:text-white">{foundTopic.title}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleLowBandwidthMode}
            className={`flex items-center space-x-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border transition-all ${
              lowBandwidthMode
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/50'
                : 'bg-white text-[#687385] border-[#DCE5F2] hover:border-[#2B6FF3] hover:text-[#16191D] dark:bg-[#121622] dark:border-[#222B3D] dark:text-[#94A3B8]'
            }`}
          >
            <Zap className="h-3 w-3" />
            <span>{lowBandwidthMode ? '⚡ Low Data Active' : 'Low Data'}</span>
          </button>

          {isCompleted ? (
            <div className="flex items-center space-x-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/50">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Level Passed (≥ 80%) ✓</span>
            </div>
          ) : (
            <a
              href="#assessment-quiz"
              className="flex items-center space-x-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold bg-[#2B6FF3] hover:bg-[#1557D6] text-white border border-[#1557D6] shadow-xs dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
            >
              <Brain className="h-3.5 w-3.5" />
              <span>Pass 80% Quiz to Unlock Next Level</span>
            </a>
          )}
        </div>
      </div>

      {/* Level Header & Progress Indicator */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#2B6FF3]/10 px-3 py-1 font-mono text-xs font-bold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40">
            {getTranslation(language, 'courses.levels')} {currentGlobalIndex + 1} / {allSubjectTopics.length}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
            foundTopic.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700/40' :
            foundTopic.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/40' :
            'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-700/40'
          }`}>
            {foundTopic.difficulty} Level
          </span>
          <span className="text-xs font-mono text-[#687385] dark:text-[#94A3B8]">
            Est. Time: {foundTopic.estimatedMinutes} min
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
          {foundTopic.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#687385] leading-relaxed max-w-3xl dark:text-[#94A3B8]">
          {foundTopic.content.summary}
        </p>
      </div>

      {/* Low-Bandwidth Mode Notice if Active */}
      {lowBandwidthMode && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center justify-between text-xs text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700/40 dark:text-emerald-300">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              <b>⚡ Low Data Mode Active:</b> Video disabled (&lt;35KB text & code payload for fast low-bandwidth loading).
            </span>
          </div>
          <button
            onClick={toggleLowBandwidthMode}
            className="text-xs font-bold underline hover:text-emerald-950 shrink-0 ml-2 dark:hover:text-white"
          >
            Switch to Video
          </button>
        </div>
      )}

      {/* Main Lesson Content Card */}
      <div className="rounded-3xl border border-[#DCE5F2] bg-white p-6 sm:p-8 space-y-6 shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
        
        {/* Concept Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#16191D] uppercase tracking-wider flex items-center gap-2 dark:text-white">
            <BookOpen className="h-4 w-4 text-[#2B6FF3]" />
            <span>Concept Explanation</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#687385] leading-relaxed font-sans dark:text-slate-300">
            {foundTopic.content.conceptExplanation}
          </p>
        </div>

        {/* Code Snippet Reference */}
        {foundTopic.content.codeSnippet && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#16191D] flex items-center gap-1.5 dark:text-white">
                <Code2 className="h-4 w-4 text-[#2B6FF3]" />
                <span>Interactive Code Syntax</span>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(foundTopic.content.codeSnippet);
                  toast.success('Code copied to clipboard!');
                }}
                className="text-[11px] text-[#2B6FF3] hover:text-[#1557D6] flex items-center gap-1 font-mono font-semibold dark:text-[#60A5FA]"
              >
                <Copy className="h-3 w-3" />
                <span>Copy Code</span>
              </button>
            </div>

            <div className="rounded-2xl bg-[#0B0F19] p-4 border border-[#2D3748] font-mono text-xs text-emerald-400 overflow-x-auto">
              <pre className="whitespace-pre">{foundTopic.content.codeSnippet}</pre>
            </div>

            {/* Expected Output */}
            {foundTopic.content.expectedOutput && (
              <div className="rounded-xl bg-[#F7F9FC] p-3 border border-[#DCE5F2] font-mono text-[11px] text-[#16191D] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-200">
                <span className="text-[#687385] font-bold uppercase mr-2 dark:text-[#94A3B8]">// Output:</span>
                <span>{foundTopic.content.expectedOutput}</span>
              </div>
            )}
          </div>
        )}

        {/* Key Takeaways */}
        {foundTopic.content.keyTakeaways && foundTopic.content.keyTakeaways.length > 0 && (
          <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-[#DCE5F2] space-y-2 dark:bg-[#0E121C] dark:border-[#222B3D]">
            <h4 className="text-xs font-bold text-[#16191D] uppercase tracking-wider flex items-center gap-1.5 dark:text-white">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Key Takeaways</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#687385] dark:text-[#94A3B8]">
              {foundTopic.content.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#2B6FF3] font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* YouTube Video Tutorial - Interactive Video Player & Thumbnail */}
        {!lowBandwidthMode && (foundTopic.content.youtubeVideoId || foundTopic.content.youtubeUrl) && (
          <div className="space-y-3 pt-4 border-t border-[#DCE5F2] dark:border-[#222B3D]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16191D] flex items-center gap-1.5 dark:text-white">
                <Video className="h-4 w-4 text-rose-600" />
                <span>Supplementary Video Tutorial</span>
              </span>
              <div className="flex items-center space-x-3">
                {foundTopic.content.youtubeDuration && (
                  <span className="text-xs font-mono text-[#687385] dark:text-[#94A3B8]">
                    Duration: ~{foundTopic.content.youtubeDuration}
                  </span>
                )}
                {isPlayingVideo && (
                  <button
                    onClick={() => setIsPlayingVideo(false)}
                    className="text-xs text-[#687385] hover:text-[#16191D] font-semibold underline dark:text-[#94A3B8] dark:hover:text-white cursor-pointer"
                  >
                    Show Thumbnail Preview
                  </button>
                )}
              </div>
            </div>

            {(() => {
              const videoId = foundTopic.content.youtubeVideoId || 'IT2durkDCXM';
              const targetUrl = foundTopic.content.youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`;

              if (isPlayingVideo) {
                // Interactive In-Website Video Player Mode (Plays directly inside website on click)
                return (
                  <div className="space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-[#DCE5F2] shadow-2xl dark:border-[#222B3D]">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title={foundTopic.title}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex items-center justify-between px-1 text-xs">
                      <button
                        onClick={() => setIsPlayingVideo(false)}
                        className="text-[#687385] hover:text-[#16191D] font-medium transition-colors dark:text-[#94A3B8] dark:hover:text-white cursor-pointer"
                      >
                        ✕ Close In-App Player
                      </button>
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-rose-600 hover:text-rose-700 font-semibold transition-colors dark:text-rose-400 dark:hover:text-rose-300"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>Watch on YouTube ↗</span>
                      </a>
                    </div>
                  </div>
                );
              }

              // High-Resolution YouTuber Teaching Thumbnail Card Mode (Click to play inside website)
              return (
                <div
                  onClick={() => setIsPlayingVideo(true)}
                  className="group relative block aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-[#DCE5F2] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] dark:border-[#222B3D] cursor-pointer"
                  title={`Click to play "${foundTopic.title}" directly inside website`}
                >
                  {/* YouTube High-Res YouTuber Teaching Thumbnail Image */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                    alt={foundTopic.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 transition-opacity group-hover:opacity-75" />

                  {/* Center YouTube Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-22 sm:h-18 sm:w-26 items-center justify-center rounded-2xl bg-rose-600/95 text-white shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:bg-rose-600 group-hover:shadow-rose-600/60 ring-4 ring-white/20">
                      <Play className="h-8 w-8 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Top Header Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-600 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
                      <Play className="h-3 w-3 fill-white" />
                      <span>Click to Play in Website</span>
                    </span>
                    {foundTopic.content.youtubeDuration && (
                      <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20">
                        {foundTopic.content.youtubeDuration}
                      </span>
                    )}
                  </div>

                  {/* Bottom Bar with Video Title & Direct Action Prompt */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between text-white bg-gradient-to-t from-black/95 to-transparent">
                    <div className="space-y-1 max-w-[70%]">
                      <p className="text-[11px] text-slate-300 font-mono">
                        Topic Tutorial • Error Makes Clever
                      </p>
                      <h4 className="text-sm sm:text-base font-bold line-clamp-1 drop-shadow-md text-white">
                        {foundTopic.title}
                      </h4>
                    </div>

                    <span className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white text-[#16191D] hover:bg-slate-100 text-xs font-bold shadow-md transition-all group-hover:bg-rose-600 group-hover:text-white shrink-0">
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Play Video</span>
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>

      {/* Post-Lesson Adaptive Comprehension Quiz (5 MCQs with 80% Passing Criteria) */}
      {foundTopic.adaptiveQuestions.length > 0 && (
        <section id="assessment-quiz" className="space-y-4">
          <AdaptiveQuizCard
            topicId={foundTopic.id}
            topicName={foundTopic.title}
            questions={foundTopic.adaptiveQuestions}
            onComplete={handleQuizComplete}
            nextTopicId={nextTopic?.id}
            nextTopicTitle={nextTopic?.title}
          />
        </section>
      )}

      {/* Level Navigation Footer */}
      <div className="pt-6 border-t border-[#DCE5F2] flex flex-col sm:flex-row items-center justify-between gap-4 dark:border-[#222B3D]">
        <Link
          href={`/courses/${foundTopic.subjectId}`}
          className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] hover:border-[#2B6FF3] hover:text-[#2B6FF3] dark:bg-[#121622] dark:border-[#222B3D] dark:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{getTranslation(language, 'courseDetail.syllabus')}</span>
        </Link>

        {/* 
          CRITICAL FIX: 
          The button to go to next topic is ONLY shown when the user has secured criteria pass (>= 80%) (isCompleted === true). 
          Until criteria pass is secured, no next topic button is displayed.
        */}
        {isCompleted && nextTopic && (
          <Link
            href={`/lessons/${nextTopic.id}`}
            className="inline-flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#2B6FF3]/25 transition-all hover:scale-105 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
          >
            <span>{getTranslation(language, 'quiz.nextLevelBtn')}: {nextTopic.title}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}

        {isCompleted && !nextTopic && (
          <Link
            href="/my-path"
            className="inline-flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#2B6FF3]/25 transition-all dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
          >
            <Compass className="h-4 w-4" />
            <span>{getTranslation(language, 'nav.myPath')}</span>
          </Link>
        )}
      </div>

    </div>
  );
}
