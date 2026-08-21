'use client';

import React, { useState } from 'react';
import { Quiz } from '@/lib/coursesData';
import { useStore } from '@/lib/useStore';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Award, RefreshCw, Sparkles } from 'lucide-react';

interface QuizAssessmentProps {
  lessonId: string;
  quizzes: Quiz[];
  onQuizPassed?: () => void;
}

export const QuizAssessment: React.FC<QuizAssessmentProps> = ({ lessonId, quizzes, onQuizPassed }) => {
  const { markQuizPassed, passedQuizzes } = useStore();
  const alreadyPassed = !!passedQuizzes[lessonId];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(alreadyPassed);
  const [score, setScore] = useState<number | null>(alreadyPassed ? (passedQuizzes[lessonId] || 100) : null);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < quizzes.length) {
      toast.error('Please answer all quiz questions before submitting.');
      return;
    }

    let correctCount = 0;
    quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIdx) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / quizzes.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    if (calculatedScore >= 66) {
      // Pass condition
      markQuizPassed(lessonId, calculatedScore);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success(`Assessment Passed! Score: ${calculatedScore}%. Progress updated.`);
      if (onQuizPassed) onQuizPassed();
    } else {
      toast.error(`Score: ${calculatedScore}%. Review the explanations and retry!`);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-[#0A0D14] p-6 sm:p-8 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Interactive Lesson MCQ Assessment</span>
          </div>
          <h3 className="mt-2 text-xl font-bold text-white tracking-tight">
            Test Your Comprehension
          </h3>
          <p className="text-xs text-slate-400">
            Answer the conceptual and code-output questions below to unlock the next module.
          </p>
        </div>

        {submitted && score !== null && (
          <div className={`flex items-center space-x-2 rounded-xl p-3 border ${
            score >= 66 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            <Award className="h-5 w-5" />
            <div>
              <div className="text-xs font-semibold">Quiz Status</div>
              <div className="text-sm font-bold font-mono">
                {score >= 66 ? `Passed (${score}%)` : `Failed (${score}%)`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Questions List */}
      <div className="mt-6 space-y-6">
        {quizzes.map((quiz, qIdx) => {
          const isSelected = selectedAnswers[qIdx] !== undefined;
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === quiz.correctIdx;

          return (
            <div key={quiz.id} className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-4">
              
              <div className="flex items-start space-x-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400 font-mono">
                  Q{qIdx + 1}
                </span>
                <h4 className="text-sm font-semibold text-slate-200 leading-snug">
                  {quiz.question}
                </h4>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {quiz.options.map((opt, optIdx) => {
                  let optionStyle = 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600';

                  if (selectedAnswers[qIdx] === optIdx) {
                    optionStyle = 'bg-indigo-600/20 border-indigo-500 text-white font-medium ring-1 ring-indigo-500';
                  }

                  if (submitted) {
                    if (optIdx === quiz.correctIdx) {
                      optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold ring-1 ring-emerald-500';
                    } else if (userChoice === optIdx && !isCorrect) {
                      optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`flex items-center justify-between rounded-lg p-3 text-xs text-left border transition-all ${optionStyle}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] opacity-60 uppercase font-semibold">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{opt}</span>
                      </div>

                      {submitted && optIdx === quiz.correctIdx && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && userChoice === optIdx && !isCorrect && (
                        <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {submitted && (
                <div className={`mt-3 rounded-lg p-3 text-xs leading-relaxed border ${
                  isCorrect ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                }`}>
                  <span className="font-bold">Explanation: </span>
                  {quiz.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={handleSubmitQuiz}
            className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Submit Quiz & Validate Progress</span>
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRetake}
              className="flex items-center space-x-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retake Quiz</span>
            </button>
            {score !== null && score >= 66 && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Module Unlocked!
              </span>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
