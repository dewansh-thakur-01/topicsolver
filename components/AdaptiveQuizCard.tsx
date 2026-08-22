'use client';

import React, { useState, useEffect } from 'react';
import { AdaptiveQuestion } from '@/lib/topicSolverData';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { DifficultyDecision } from '@/lib/adaptiveEngine';
import { prepareRandomizedQuiz, getReplacementQuestion, generateMistakeClue } from '@/lib/quizRandomizer';
import { getTranslation } from '@/lib/translations';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Brain, 
  Award, 
  Lock, 
  Unlock, 
  RotateCcw, 
  AlertTriangle, 
  Lightbulb, 
  HelpCircle, 
  TrendingUp, 
  ShieldAlert,
  RefreshCw
} from 'lucide-react';

interface AdaptiveQuizCardProps {
  topicId: string;
  topicName: string;
  questions: AdaptiveQuestion[];
  onComplete?: (score: { correct: number; total: number; passed: boolean }) => void;
  nextTopicId?: string;
  nextTopicTitle?: string;
}

export const AdaptiveQuizCard: React.FC<AdaptiveQuizCardProps> = ({
  topicId,
  topicName,
  questions: rawQuestions,
  onComplete,
  nextTopicId,
  nextTopicTitle
}) => {
  const { recordQuizResult, markLessonComplete, profile, language } = useTopicSolverStore();

  // Passing criteria is strictly 80% (4 out of 5)
  const PASSING_THRESHOLD = 80;
  const QUIZ_QUESTION_COUNT = 5;

  const [attemptCount, setAttemptCount] = useState(1);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<AdaptiveQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastDecision, setLastDecision] = useState<DifficultyDecision | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [mistakeClue, setMistakeClue] = useState<string | null>(null);
  const [failedQuestionIds, setFailedQuestionIds] = useState<string[]>([]);

  // Initialize randomized quiz batch of 5 questions
  const initializeQuizBatch = (attempt: number, excludeIds: string[] = []) => {
    const randomized = prepareRandomizedQuiz(rawQuestions, topicName, QUIZ_QUESTION_COUNT, excludeIds);
    setActiveQuizQuestions(randomized.length > 0 ? randomized : rawQuestions.slice(0, QUIZ_QUESTION_COUNT));
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setLastDecision(null);
    setCorrectCount(0);
    setQuizFinished(false);
    setMistakeClue(null);
  };

  useEffect(() => {
    initializeQuizBatch(attemptCount, failedQuestionIds);
  }, [topicId, rawQuestions]);

  const question = activeQuizQuestions[currentQIndex] || activeQuizQuestions[0];

  if (!question || activeQuizQuestions.length === 0) return null;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      toast.error(getTranslation(language, 'quiz.selectOption'));
      return;
    }

    const isCorrect = selectedOption === question.correctOptionIndex;
    setIsSubmitted(true);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setMistakeClue(null);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      toast.success(getTranslation(language, 'quiz.correctChoice'));
    } else {
      // Record failed question ID so subsequent retakes or replacements avoid it
      setFailedQuestionIds(prev => Array.from(new Set([...prev, question.id])));
      
      // Generate non-spoiler mistake clue
      const clue = generateMistakeClue(question, selectedOption);
      setMistakeClue(clue);
      toast.error(getTranslation(language, 'quiz.retakePrompt'));
    }

    const decision = recordQuizResult(topicId, topicName, isCorrect, question.difficulty);
    setLastDecision(decision);
  };

  // Dynamically swap the failed question with a fresh question from the same topic
  const handleSwapFailedQuestion = () => {
    const currentBatchIds = activeQuizQuestions.map(q => q.id);
    const replacement = getReplacementQuestion(rawQuestions, currentBatchIds, question.id);

    if (replacement) {
      const updatedQuestions = [...activeQuizQuestions];
      updatedQuestions[currentQIndex] = replacement;
      setActiveQuizQuestions(updatedQuestions);
      setSelectedOption(null);
      setIsSubmitted(false);
      setLastDecision(null);
      setMistakeClue(null);
      toast.info(getTranslation(language, 'quiz.swappedNotice'));
    } else {
      toast.info('No additional question variations available for this topic.');
    }
  };

  const handleNext = () => {
    const isLastQuestion = currentQIndex >= activeQuizQuestions.length - 1;
    
    if (!isLastQuestion) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setLastDecision(null);
      setMistakeClue(null);
    } else {
      // Quiz Finished: Evaluate 80% passing criteria (4 out of 5)
      const total = activeQuizQuestions.length;
      const finalAccuracy = Math.round((correctCount / total) * 100);
      const passed = finalAccuracy >= PASSING_THRESHOLD;

      setQuizFinished(true);

      if (passed) {
        // Passed: Unlock next level & complete lesson
        markLessonComplete(topicId);
        confetti({
          particleCount: 130,
          spread: 100,
          origin: { y: 0.6 }
        });
        toast.success(getTranslation(language, 'quiz.congratsPassed'));
      } else {
        // Failed: Next topic remains locked
        toast.error(getTranslation(language, 'quiz.needsPractice'));
      }

      if (onComplete) {
        onComplete({ correct: correctCount, total, passed });
      }
    }
  };

  const handleRetakeQuiz = () => {
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);
    // Exclude previously failed questions to guarantee a fresh set of changed questions from the topic
    initializeQuizBatch(nextAttempt, failedQuestionIds);
    toast.info('New randomized question set generated for this topic! 🚀');
  };

  const isCorrect = selectedOption === question.correctOptionIndex;
  const progressPercent = Math.round(((currentQIndex + 1) / activeQuizQuestions.length) * 100);
  const finalAccuracy = Math.round((correctCount / activeQuizQuestions.length) * 100);
  const hasPassed = finalAccuracy >= PASSING_THRESHOLD;

  // ==========================================
  // VIEW: QUIZ COMPLETED SUMMARY & PASS/FAIL GATE
  // ==========================================
  if (quizFinished) {
    return (
      <div className="rounded-3xl border border-[#DCE5F2] bg-white p-7 sm:p-9 shadow-xs space-y-6 animate-in fade-in duration-300 dark:border-[#222B3D] dark:bg-[#121622]">
        
        {/* Header Status */}
        <div className="text-center space-y-3">
          <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-md ${
            hasPassed 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-700/50' 
              : 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:border-rose-700/50'
          }`}>
            {hasPassed ? <Award className="h-9 w-9 text-emerald-600 dark:text-emerald-400" /> : <Lock className="h-9 w-9 text-rose-600 dark:text-rose-400" />}
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-bold border">
              {hasPassed ? (
                <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {getTranslation(language, 'quiz.congratsPassed')}
                </span>
              ) : (
                <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {getTranslation(language, 'quiz.needsPractice')}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
              {hasPassed ? getTranslation(language, 'quiz.unlockedNext') : getTranslation(language, 'quiz.needsPractice')}
            </h3>

            <p className="text-xs text-[#687385] dark:text-[#94A3B8] max-w-md mx-auto">
              {hasPassed
                ? `You answered ${correctCount} out of ${activeQuizQuestions.length} questions correctly (${finalAccuracy}%).`
                : `${getTranslation(language, 'quiz.retakePrompt')} (${finalAccuracy}% achieved, need ≥ 80%).`}
            </p>
          </div>
        </div>

        {/* Score & Passing Gauge */}
        <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] space-y-3 dark:bg-[#0E121C] dark:border-[#222B3D]">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#16191D] dark:text-white flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-[#2B6FF3]" />
              <span>{getTranslation(language, 'analytics.accuracy')}</span>
            </span>
            <span className={`font-mono text-sm ${hasPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {finalAccuracy}% ({getTranslation(language, 'quiz.passingBadge')})
            </span>
          </div>

          {/* Progress Bar with Passing Threshold Marker */}
          <div className="relative h-3 w-full rounded-full bg-slate-200 overflow-hidden dark:bg-slate-700">
            <div 
              className={`h-full transition-all duration-700 ${
                finalAccuracy < 40 ? 'bg-rose-500' :
                finalAccuracy < 80 ? 'bg-amber-500' :
                'bg-emerald-500'
              }`}
              style={{ width: `${finalAccuracy}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#687385] dark:text-[#94A3B8] font-mono">
            <span>0%</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">80% Passing Threshold (4/5)</span>
            <span>100%</span>
          </div>
        </div>

        {/* Action Controls based on Pass / Fail */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {!hasPassed ? (
            <button
              onClick={handleRetakeQuiz}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white px-7 py-3 text-xs font-bold shadow-md shadow-[#2B6FF3]/25 transition-all hover:scale-105 active:scale-95 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{getTranslation(language, 'quiz.retakeBtn')}</span>
            </button>
          ) : (
            <>
              {nextTopicId && (
                <a
                  href={`/lessons/${nextTopicId}`}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white px-7 py-3 text-xs font-bold shadow-md shadow-[#2B6FF3]/25 transition-all hover:scale-105 active:scale-95 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                >
                  <Unlock className="h-4 w-4" />
                  <span>{getTranslation(language, 'quiz.nextLevelBtn')}: {nextTopicTitle || 'Next Topic'}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              <button
                onClick={handleRetakeQuiz}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-[#16191D] border border-[#DCE5F2] hover:bg-[#F7F9FC] transition-all dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{getTranslation(language, 'quiz.retakeBtn')}</span>
              </button>
            </>
          )}
        </div>

      </div>
    );
  }

  // ==========================================
  // VIEW: ACTIVE QUIZ QUESTIONS
  // ==========================================
  return (
    <div className="rounded-3xl border border-[#DCE5F2] bg-white p-6 sm:p-8 shadow-xs space-y-6 dark:border-[#222B3D] dark:bg-[#121622]">
      
      {/* Header with Progress Bar */}
      <div className="space-y-4 border-b border-[#DCE5F2] pb-5 dark:border-[#222B3D]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40">
              <Brain className="h-3.5 w-3.5" />
              <span>{getTranslation(language, 'quiz.passingCriteria')}</span>
            </div>
            <h3 className="mt-2 text-xl font-extrabold text-[#16191D] tracking-tight dark:text-white">
              {getTranslation(language, 'quiz.question')} {currentQIndex + 1} {getTranslation(language, 'quiz.of')} {activeQuizQuestions.length} • {topicName}
            </h3>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="rounded-full bg-[#F7F9FC] px-2.5 py-1 text-[#687385] border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8]">
              Attempt #{attemptCount}
            </span>
            <span className={`rounded-full px-2.5 py-1 font-semibold border ${
              question.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700/40' :
              question.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/40' :
              'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-700/40'
            }`}>
              {question.difficulty}
            </span>
          </div>
        </div>

        {/* Multi-step progress track */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-[#687385] font-mono dark:text-[#94A3B8]">
            <span>{getTranslation(language, 'quiz.question')} {currentQIndex + 1}/{activeQuizQuestions.length} (5 MCQs Required)</span>
            <span className="text-[#16191D] font-bold dark:text-white">{getTranslation(language, 'quiz.score')}: {correctCount}/5 (Need ≥ 4/5)</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#F7F9FC] border border-[#DCE5F2] overflow-hidden dark:bg-[#0E121C] dark:border-[#222B3D]">
            <div 
              className="h-full bg-[#2B6FF3] transition-all duration-300 dark:bg-[#3B82F6]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-[#16191D] leading-relaxed dark:text-white">
          {question.question}
        </h4>

        {/* Optional Code Context */}
        {question.codeContext && (
          <div className="rounded-xl bg-[#0B0F19] p-4 border border-[#2D3748] font-mono text-xs text-emerald-400 overflow-x-auto">
            <pre className="whitespace-pre">{question.codeContext}</pre>
          </div>
        )}

        {/* Options List */}
        {question.options && (
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {question.options.map((opt, idx) => {
              let optionStyle = 'bg-white border-[#DCE5F2] text-[#687385] hover:bg-[#F7F9FC] hover:border-[#2B6FF3] hover:text-[#16191D] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:bg-[#1E2538] dark:hover:text-white';

              if (selectedOption === idx) {
                optionStyle = 'bg-[#2B6FF3]/10 border-[#2B6FF3] text-[#16191D] font-semibold ring-1 ring-[#2B6FF3] dark:bg-[#3B82F6]/20 dark:border-[#3B82F6] dark:text-white';
              }

              if (isSubmitted) {
                if (selectedOption === idx) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold ring-1 ring-emerald-500 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200';
                  } else {
                    optionStyle = 'bg-rose-50 border-rose-500 text-rose-800 font-semibold ring-1 ring-rose-500 dark:bg-rose-950/60 dark:border-rose-500 dark:text-rose-200';
                  }
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex items-center justify-between rounded-xl p-3.5 text-xs text-left border transition-all ${optionStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F7F9FC] text-[10px] font-mono font-bold text-[#687385] border border-[#DCE5F2] dark:bg-[#1E2538] dark:border-[#222B3D] dark:text-[#94A3B8]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isSubmitted && selectedOption === idx && isCorrect && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      {getTranslation(language, 'quiz.correctChoice')}
                    </span>
                  )}
                  {isSubmitted && selectedOption === idx && !isCorrect && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                      <XCircle className="h-4 w-4" />
                      Incorrect
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Non-Spoiler Mistake Clue & Remediation */}
      {isSubmitted && (
        <div className={`rounded-2xl p-4 sm:p-5 border text-xs leading-relaxed space-y-3 animate-in fade-in duration-200 ${
          isCorrect 
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-700/50 dark:text-emerald-200' 
            : 'bg-amber-50/80 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700/50 dark:text-amber-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold font-sans">
            {isCorrect ? (
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Lightbulb className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
            )}
            <span className="text-sm">
              {isCorrect ? getTranslation(language, 'quiz.correctChoice') : getTranslation(language, 'quiz.clueTitle')}
            </span>
          </div>

          <p className="text-xs">
            {isCorrect 
              ? question.explanation 
              : (mistakeClue || 'Think carefully about the core properties of this concept for your re-quiz attempt.')}
          </p>

          {!isCorrect && (
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-amber-800 dark:text-amber-300">
              <span className="font-medium">Direct answer concealed. Want to try a different question on this topic?</span>
              <button
                onClick={handleSwapFailedQuestion}
                className="inline-flex items-center space-x-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 font-bold shadow-xs transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{getTranslation(language, 'quiz.swapQuestion')}</span>
              </button>
            </div>
          )}

          {lastDecision && (
            <div className="pt-2 border-t border-emerald-200/50 flex items-center space-x-2 text-[11px] text-[#2B6FF3] font-mono font-semibold dark:text-[#60A5FA]">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Adaptive Engine: {lastDecision.reason}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#DCE5F2] flex flex-col sm:flex-row items-center justify-between gap-3 dark:border-[#222B3D]">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-semibold text-white shadow-xs disabled:opacity-40 transition-all hover:scale-[1.01] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
          >
            <Sparkles className="h-4 w-4" />
            <span>{getTranslation(language, 'quiz.submitAnswer')}</span>
          </button>
        ) : (
          <div className="w-full sm:w-auto flex items-center gap-2.5">
            {!isCorrect && (
              <button
                onClick={handleSwapFailedQuestion}
                className="flex items-center space-x-1.5 rounded-xl bg-white border border-[#DCE5F2] hover:bg-[#F7F9FC] text-[#16191D] px-4 py-2.5 text-xs font-semibold transition-all dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
                <span>{getTranslation(language, 'quiz.swapQuestion')}</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:scale-105 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
            >
              <span>{currentQIndex < activeQuizQuestions.length - 1 ? `${getTranslation(language, 'quiz.nextQuestion')} (Q${currentQIndex + 2}/5)` : getTranslation(language, 'quiz.viewResults')}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        <div className="text-[11px] font-mono text-[#687385] dark:text-[#94A3B8]">
          Target Subject: <span className="text-[#16191D] font-bold uppercase dark:text-white">{profile.activeSubject}</span>
        </div>
      </div>

    </div>
  );
};
