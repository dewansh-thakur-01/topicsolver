'use client';

import React, { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DIAGNOSTIC_QUESTIONS, SUBJECT_COURSES, DiagnosticAssessmentQuestion } from '@/lib/topicSolverData';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { StudentLevel, DifficultyLevel } from '@/lib/adaptiveEngine';
import { shuffleArray } from '@/lib/quizRandomizer';
import { getTranslation } from '@/lib/translations';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Brain, 
  Award, 
  Compass, 
  Layers, 
  HelpCircle,
  TrendingUp,
  AlertCircle,
  RotateCcw,
  Lightbulb,
  Lock,
  Unlock,
  ShieldAlert,
  Play,
  BookOpen
} from 'lucide-react';

interface PageProps {
  params: Promise<{ subjectId: string }>;
}

export default function AssessmentPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const subjectId = resolvedParams.subjectId as 'java' | 'python' | 'sql' | 'dsa' | 'c';
  const router = useRouter();

  const rawQuestions = DIAGNOSTIC_QUESTIONS[subjectId];
  const course = SUBJECT_COURSES[subjectId];

  if (!rawQuestions || !course) {
    return notFound();
  }

  const { completeDiagnosticAssessment, setActiveSubject, language } = useTopicSolverStore();

  const PASSING_THRESHOLD = 80;

  // Function to prepare randomized questions with shuffled options
  const prepareRandomQuestions = () => {
    const shuffled = shuffleArray(rawQuestions);
    return shuffled.map(q => {
      const correctText = q.options[q.correctIndex];
      const shuffledOptions = shuffleArray(q.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctText);
      return {
        ...q,
        options: shuffledOptions,
        correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : q.correctIndex
      };
    });
  };

  const [questions, setQuestions] = useState<DiagnosticAssessmentQuestion[]>(prepareRandomQuestions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [mistakeClue, setMistakeClue] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<{
    level: StudentLevel;
    startingDifficulty: DifficultyLevel;
    strengths: string[];
    weaknesses: string[];
    accuracy: number;
    jumpedToModule: number;
    placementTitle: string;
    placementMessage: string;
    focusTopicId: string;
    focusTopicTitle: string;
  } | null>(null);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      toast.error('Please select an option before checking.');
      return;
    }

    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsSubmitted(true);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setMistakeClue(null);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      toast.success('Correct answer! 🌟');
    } else {
      const selectedText = currentQ.options[selectedOption];
      setMistakeClue(
        `⚠️ Incorrect Choice. Clue for Re-quiz: "${selectedText}" does not fulfill the requirement. Review ${currentQ.conceptTested} fundamentals.`
      );
      toast.error('Incorrect choice! Review the clue below for your retake.');
    }
  };

  const handleNext = () => {
    const newAnswers = { ...answers, [currentQ.id]: selectedOption ?? 0 };
    setAnswers(newAnswers);
    setSelectedOption(null);
    setIsSubmitted(false);
    setMistakeClue(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished all questions
      const result = completeDiagnosticAssessment(subjectId, newAnswers);
      setAssessmentResult(result);
      setIsCompleted(true);
      
      if (result.accuracy >= PASSING_THRESHOLD) {
        confetti({
          particleCount: 130,
          spread: 100,
          origin: { y: 0.6 }
        });
        toast.success(`Assessment Passed with ${result.accuracy}% (≥ 80%)! 🌸`);
      } else {
        toast.error(`Score: ${result.accuracy}% (< 80%). You can retake anytime with new randomized questions.`);
      }
    }
  };

  const handleRetakeAssessment = () => {
    setQuestions(prepareRandomQuestions());
    setCurrentIdx(0);
    setAnswers({});
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCompleted(false);
    setMistakeClue(null);
    setCorrectCount(0);
    setAssessmentResult(null);
    toast.info('Fresh randomized assessment generated! Good luck! 🚀');
  };

  const isCurrentCorrect = selectedOption === currentQ.correctIndex;
  const hasPassed = (assessmentResult?.accuracy ?? 0) >= PASSING_THRESHOLD;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {!isCompleted ? (
        <div className="space-y-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3.5 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40">
              <Brain className="h-3.5 w-3.5" />
              <span>Initial Adaptive Skill Assessment • {course.title}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
              Let's understand what you already know.
            </h1>

            <p className="text-xs sm:text-sm text-[#687385] leading-relaxed dark:text-[#94A3B8]">
              Answer each challenge. Score ≥ 80% to qualify for advanced module skipping.
            </p>

            <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-mono text-[#687385] dark:text-[#94A3B8]">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>•</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                currentQ.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700/40' :
                currentQ.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/40' :
                'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-700/40'
              }`}>
                {currentQ.difficulty} Challenge
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#F7F9FC] rounded-full h-2 overflow-hidden border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D]">
            <div
              className="h-2 rounded-full bg-[#2B6FF3] transition-all duration-300 dark:bg-[#3B82F6]"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="rounded-3xl border border-[#DCE5F2] bg-white p-6 sm:p-8 shadow-xs space-y-6 dark:border-[#222B3D] dark:bg-[#121622]">
            
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#2B6FF3] uppercase tracking-wider font-bold dark:text-[#60A5FA]">
                Topic: {currentQ.topicName}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#16191D] leading-relaxed dark:text-white">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                let optionStyle = 'bg-white border-[#DCE5F2] text-[#16191D] hover:bg-[#F7F9FC] hover:border-[#2B6FF3] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white dark:hover:bg-[#1E2538]';

                if (selectedOption === optIdx) {
                  optionStyle = 'bg-[#2B6FF3]/10 border-[#2B6FF3] text-[#16191D] font-bold ring-2 ring-[#2B6FF3]/30 dark:bg-[#3B82F6]/20 dark:border-[#3B82F6] dark:text-white';
                }

                if (isSubmitted && selectedOption === optIdx) {
                  if (isCurrentCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-500/30 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200';
                  } else {
                    optionStyle = 'bg-rose-50 border-rose-500 text-rose-800 font-bold ring-2 ring-rose-500/30 dark:bg-rose-950/60 dark:border-rose-500 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isSubmitted}
                    onClick={() => handleSelect(optIdx)}
                    className={`flex items-center justify-between rounded-xl p-4 text-xs text-left border transition-all ${optionStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F7F9FC] text-[11px] font-mono font-bold text-[#687385] border border-[#DCE5F2] dark:bg-[#1E2538] dark:border-[#222B3D] dark:text-[#94A3B8]">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="font-medium">{opt}</span>
                    </div>

                    {isSubmitted && selectedOption === optIdx && isCurrentCorrect && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Correct
                      </span>
                    )}
                    {isSubmitted && selectedOption === optIdx && !isCurrentCorrect && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                        <XCircle className="h-4 w-4" />
                        Incorrect
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Non-Spoiler Error Hint on Mistakes */}
            {isSubmitted && !isCurrentCorrect && (
              <div className="rounded-2xl p-4 border border-amber-300 bg-amber-50/80 text-amber-900 text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200 dark:bg-amber-950/40 dark:border-amber-700/50 dark:text-amber-200">
                <div className="flex items-center space-x-2 font-bold font-sans text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>💡 Clue for Re-quiz (Conceptual Mistake Hint)</span>
                </div>
                <p className="text-xs">
                  {mistakeClue || 'Re-examine this concept carefully for your re-quiz attempt.'}
                </p>
                <div className="text-[10px] text-amber-700 dark:text-amber-300 font-medium pt-1">
                  Note: Direct answers are withheld so you can master the concept on your retake!
                </div>
              </div>
            )}

            {/* Next / Submit Button */}
            <div className="pt-4 border-t border-[#DCE5F2] flex items-center justify-between dark:border-[#222B3D]">
              <span className="text-[11px] text-[#687385] dark:text-[#94A3B8]">
                Evaluating: {currentQ.conceptTested}
              </span>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-bold text-white shadow-xs disabled:opacity-40 transition-all hover:scale-[1.01] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Check Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:scale-105 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Finish & View 80% Assessment Result'}</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* Assessment Results & Learning Profile */
        <div className="rounded-3xl border border-[#DCE5F2] bg-white p-8 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-300 dark:border-[#222B3D] dark:bg-[#121622]">
          
          <div className="text-center space-y-3">
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-md ${
              hasPassed 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-700/50' 
                : 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950/60 dark:border-amber-700/50'
            }`}>
              {hasPassed ? <Award className="h-9 w-9 text-emerald-600 dark:text-emerald-400" /> : <ShieldAlert className="h-9 w-9 text-amber-600 dark:text-amber-400" />}
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 rounded-full px-3.5 py-1 text-xs font-bold border">
                {hasPassed ? (
                  <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    ASSESSMENT PASSED (Score: {assessmentResult?.accuracy}%)
                  </span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" />
                    FOUNDATIONAL REVIEW (Score: {assessmentResult?.accuracy}% &lt; 80%)
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
                Your AI Learning Profile
              </h1>

              <p className="text-xs sm:text-sm text-[#687385] max-w-xl mx-auto leading-relaxed dark:text-[#94A3B8]">
                {hasPassed 
                  ? `Excellent! You scored ${assessmentResult?.accuracy}% (≥ 80%). Foundational concepts have been fast-tracked in your learning path.`
                  : `You scored ${assessmentResult?.accuracy}%. Foundational modules are recommended to build mastery before advanced topics.`}
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-[#DCE5F2] text-center space-y-1 dark:bg-[#0E121C] dark:border-[#222B3D]">
              <div className="text-[11px] font-bold text-[#687385] uppercase tracking-wider dark:text-[#94A3B8]">Overall Level</div>
              <div className="text-xl font-extrabold text-[#2B6FF3] dark:text-[#60A5FA]">
                {assessmentResult?.level}
              </div>
              <p className="text-[10px] text-[#687385] dark:text-[#94A3B8]">Calibrated from diagnostic accuracy</p>
            </div>

            <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-[#DCE5F2] text-center space-y-1 dark:bg-[#0E121C] dark:border-[#222B3D]">
              <div className="text-[11px] font-bold text-[#687385] uppercase tracking-wider dark:text-[#94A3B8]">Recommended Difficulty</div>
              <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
                {assessmentResult?.startingDifficulty}
              </div>
              <p className="text-[10px] text-[#687385] dark:text-[#94A3B8]">Starting challenge calibration</p>
            </div>

            <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-[#DCE5F2] text-center space-y-1 dark:bg-[#0E121C] dark:border-[#222B3D]">
              <div className="text-[11px] font-bold text-[#687385] uppercase tracking-wider dark:text-[#94A3B8]">80% Benchmark Status</div>
              <div className={`text-xl font-extrabold ${hasPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {hasPassed ? 'Qualified' : 'Foundational'}
              </div>
              <p className="text-[10px] text-[#687385] dark:text-[#94A3B8]">Threshold: 80% passing</p>
            </div>
          </div>

          {/* Strengths & Weaknesses Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strong Areas */}
            <div className="rounded-2xl bg-emerald-50/50 p-5 border border-emerald-200 space-y-3 dark:bg-emerald-950/30 dark:border-emerald-800/40">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>Strong Areas (Skipping Basics)</span>
              </div>
              {assessmentResult?.strengths && assessmentResult.strengths.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-[#16191D] dark:text-slate-200">
                  {assessmentResult.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-emerald-700 font-bold dark:text-emerald-400">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#687385] dark:text-[#94A3B8]">Foundational review recommended across all concepts.</p>
              )}
            </div>

            {/* Needs Attention */}
            <div className="rounded-2xl bg-amber-50/50 p-5 border border-amber-200 space-y-3 dark:bg-amber-950/30 dark:border-amber-800/40">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                <span>Needs Attention (Targeted Reinforcement)</span>
              </div>
              {assessmentResult?.weaknesses && assessmentResult.weaknesses.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-[#16191D] dark:text-slate-200">
                  {assessmentResult.weaknesses.map((w, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-amber-700 font-bold dark:text-amber-400">⚠</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#687385] dark:text-[#94A3B8]">Zero major weaknesses detected! Ready for advanced topics.</p>
              )}
            </div>
          </div>

          {/* Placement Jump Card */}
          {assessmentResult && (
            <div className="rounded-2xl bg-[#2B6FF3]/10 border border-[#2B6FF3]/30 p-6 space-y-3 dark:bg-[#3B82F6]/15 dark:border-[#3B82F6]/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2B6FF3] text-white font-bold shadow-md shadow-[#2B6FF3]/25 dark:bg-[#3B82F6]">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2B6FF3] dark:text-[#93C5FD]">
                      Knowledge Check Placement
                    </span>
                    <h3 className="text-base font-extrabold text-[#16191D] dark:text-white">
                      {assessmentResult.placementTitle} • Starting at Module {assessmentResult.jumpedToModule}
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2B6FF3] border border-[#2B6FF3]/20 dark:bg-[#121622] dark:text-[#93C5FD] dark:border-[#3B82F6]/30">
                  <span>Module {assessmentResult.jumpedToModule} Unlocked</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#16191D] dark:text-slate-200 leading-relaxed">
                {assessmentResult.placementMessage}
              </p>
            </div>
          )}

          {/* CTA: Jump to Unlocked Module & Course Syllabus */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            {assessmentResult && (
              <Link
                href={`/lessons/${assessmentResult.focusTopicId}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-[#2B6FF3]/25 transition-all hover:scale-105 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Start Module {assessmentResult.jumpedToModule}: {assessmentResult.focusTopicTitle}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            )}

            <Link
              href={`/courses/${subjectId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] transition-all dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white dark:hover:bg-[#1E2538]"
            >
              <BookOpen className="h-4 w-4 text-[#2B6FF3]" />
              <span>{getTranslation(language, 'diag.viewSyllabusBtn')}</span>
            </Link>

            <button
              onClick={handleRetakeAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#687385] border border-[#DCE5F2] hover:bg-[#F7F9FC] transition-all dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:bg-[#1E2538]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{getTranslation(language, 'diag.retakeBtn')}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
