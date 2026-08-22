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
  BookOpen,
  Code2,
  Terminal,
  Zap,
  Check
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
      toast.error('Please select an option to check.');
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
        `⚠️ Incorrect Choice: "${selectedText}". Conceptual Clue: Review ${currentQ.conceptTested} properties.`
      );
      toast.info('Knowledge Check: Review the clue below.');
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
      // Finished all 10 diagnostic check questions
      // AI Placement Analysis (No Fail Block: Grants module skip permissions based on knowledge)
      const result = completeDiagnosticAssessment(subjectId, newAnswers);
      setAssessmentResult(result);
      setIsCompleted(true);
      
      confetti({
        particleCount: 130,
        spread: 100,
        origin: { y: 0.6 }
      });
      toast.success(`AI Diagnostic Evaluation Complete! (${result.accuracy}% achieved)`);
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
    toast.info('Fresh randomized 10Q diagnostic check generated! 🚀');
  };

  const isCurrentCorrect = selectedOption === currentQ.correctIndex;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {!isCompleted ? (
        <div className="space-y-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3.5 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40">
              <Brain className="h-3.5 w-3.5" />
              <span>Initial 10Q Knowledge Evaluation • {course.title}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
              Let's evaluate your existing knowledge.
            </h1>

            <p className="text-xs sm:text-sm text-[#687385] leading-relaxed dark:text-[#94A3B8]">
              No strict pass/fail criteria — the AI analyzes your strengths to grant permissions to skip foundational modules and personalize your curriculum.
            </p>

            <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-mono text-[#687385] dark:text-[#94A3B8]">
              <span>Question {currentIdx + 1} of {questions.length} (Theory & Code Execution Mix)</span>
              <span>•</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                currentQ.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700/40' :
                currentQ.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/40' :
                'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-700/40'
              }`}>
                {currentQ.difficulty}
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
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#2B6FF3] uppercase tracking-wider font-bold dark:text-[#60A5FA]">
                  Topic: {currentQ.topicName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F7F9FC] text-[#687385] border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8]">
                  Concept: {currentQ.conceptTested}
                </span>
              </div>

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

            {/* Clue & Concept Feedback */}
            {isSubmitted && (
              <div className={`rounded-2xl p-4 sm:p-5 border text-xs leading-relaxed space-y-2 animate-in fade-in duration-200 ${
                isCurrentCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-700/50 dark:text-emerald-200'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700/50 dark:text-amber-200'
              }`}>
                <div className="flex items-center space-x-2 font-bold font-sans">
                  {isCurrentCorrect ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Lightbulb className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                  )}
                  <span className="text-sm">
                    {isCurrentCorrect ? 'Concept Verified!' : 'Knowledge Check Clue'}
                  </span>
                </div>

                <p className="text-xs">
                  {isCurrentCorrect ? currentQ.explanation : mistakeClue}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#DCE5F2] flex items-center justify-between dark:border-[#222B3D]">
              <div className="text-xs font-mono text-[#687385] dark:text-[#94A3B8]">
                Score so far: <span className="font-bold text-[#16191D] dark:text-white">{correctCount}</span> / {currentIdx + (isSubmitted ? 1 : 0)}
              </div>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-bold text-white shadow-xs disabled:opacity-40 transition-all dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Check Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:scale-105 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View AI Placement'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* AI PLACEMENT & DIAGNOSTIC RECOMMENDATION REPORT (NO FAIL BLOCK)            */
        /* ========================================================================= */
        assessmentResult && (
          <div className="rounded-3xl border border-[#DCE5F2] bg-white p-7 sm:p-10 shadow-xs space-y-8 animate-in fade-in duration-300 dark:border-[#222B3D] dark:bg-[#121622]">
            
            {/* Header Diagnostic Badge */}
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2B6FF3]/10 text-[#2B6FF3] border border-[#2B6FF3]/30 shadow-md dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                <Brain className="h-8 w-8 text-[#2B6FF3] dark:text-[#60A5FA]" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                  <span>AI Placement Diagnosis Generated</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
                  {assessmentResult.placementTitle}
                </h2>

                <p className="text-xs sm:text-sm text-[#687385] dark:text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
                  {assessmentResult.placementMessage}
                </p>
              </div>
            </div>

            {/* Score & Skill Calibrations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] text-center dark:bg-[#0E121C] dark:border-[#222B3D]">
                <div className="text-xs font-bold text-[#687385] dark:text-[#94A3B8]">Knowledge Score</div>
                <div className="text-2xl font-extrabold text-[#2B6FF3] font-mono mt-1 dark:text-[#60A5FA]">
                  {assessmentResult.accuracy}%
                </div>
                <div className="text-[10px] text-[#687385] dark:text-[#94A3B8] mt-0.5">({correctCount} / 10 Correct)</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] text-center dark:bg-[#0E121C] dark:border-[#222B3D]">
                <div className="text-xs font-bold text-[#687385] dark:text-[#94A3B8]">Assigned Level</div>
                <div className="text-xl font-extrabold text-[#16191D] mt-1 dark:text-white">
                  {assessmentResult.level}
                </div>
                <div className="text-[10px] text-emerald-600 font-bold dark:text-emerald-400 mt-0.5">Starting Difficulty: {assessmentResult.startingDifficulty}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] text-center dark:bg-[#0E121C] dark:border-[#222B3D]">
                <div className="text-xs font-bold text-[#687385] dark:text-[#94A3B8]">Module Jump Access</div>
                <div className="text-xl font-extrabold text-purple-600 mt-1 dark:text-purple-400">
                  Module {assessmentResult.jumpedToModule}
                </div>
                <div className="text-[10px] text-purple-500 dark:text-purple-300 mt-0.5">
                  {assessmentResult.jumpedToModule > 1 ? 'Skipped Basics Granted ✓' : 'Starting Foundations'}
                </div>
              </div>
            </div>

            {/* Strengths & Focus Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2 dark:bg-emerald-950/30 dark:border-emerald-800/40">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Mastered Strengths ({assessmentResult.strengths.length})</span>
                </div>
                {assessmentResult.strengths.length > 0 ? (
                  <ul className="space-y-1 text-xs text-emerald-900 dark:text-emerald-200 list-disc list-inside">
                    {assessmentResult.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                ) : (
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 italic">Level 1 topics will build your core strength.</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2 dark:bg-amber-950/30 dark:border-amber-800/40">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span>Targeted Learning Areas ({assessmentResult.weaknesses.length})</span>
                </div>
                {assessmentResult.weaknesses.length > 0 ? (
                  <ul className="space-y-1 text-xs text-amber-900 dark:text-amber-200 list-disc list-inside">
                    {assessmentResult.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}
                  </ul>
                ) : (
                  <p className="text-xs text-amber-700 dark:text-amber-300 italic">All diagnostic areas mastered cleanly!</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/lessons/${assessmentResult.focusTopicId}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white px-8 py-3.5 text-xs font-bold shadow-md shadow-[#2B6FF3]/25 transition-all hover:scale-105 active:scale-95 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Start at Level {assessmentResult.jumpedToModule}: {assessmentResult.focusTopicTitle}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/courses/${subjectId}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-white px-5 py-3.5 text-xs font-semibold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] transition-all dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>View Full Syllabus</span>
              </Link>

              <button
                onClick={handleRetakeAssessment}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-[#F7F9FC] px-4 py-3.5 text-xs font-semibold text-[#687385] border border-[#DCE5F2] hover:text-[#16191D] transition-all dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake Check</span>
              </button>
            </div>

          </div>
        )
      )}

    </div>
  );
}
