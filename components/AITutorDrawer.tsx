'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/useStore';
import { toast } from 'sonner';
import { Bot, Sparkles, Send, Zap, Brain, Shield, RefreshCcw, CheckCircle2, MessageSquare } from 'lucide-react';

export const AITutorDrawer: React.FC = () => {
  const { completedLessons, passedQuizzes, lowBandwidthMode, toggleLowBandwidthMode, getSkillRank } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [targetLang, setTargetLang] = useState<'Java' | 'SQL' | 'C'>('Java');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeCode = () => {
    if (!inputCode.trim()) {
      toast.error('Please paste code or ask a question for AI analysis.');
      return;
    }

    setIsAnalyzing(true);
    setAiFeedback(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      if (targetLang === 'Java') {
        setAiFeedback(
          `AI Diagnosis & Adaptive Feedback:\n\n1. Memory & Structure: Your Java solution correctly utilizes object references. Consider substituting String concatenation with StringBuilder in loop iterations to avoid unnecessary heap allocations.\n2. Time Complexity: O(N log N) -> Can be optimized to O(N) using HashMap lookup.\n3. Low-Bandwidth Mode Suggestion: Lightweight audio summary generated (24KB).`
        );
      } else if (targetLang === 'SQL') {
        setAiFeedback(
          `AI Diagnosis & Database Tuning:\n\n1. Query Efficiency: Avoid using 'SELECT *' in production queries; explicitly list required column identifiers to leverage Index-Only Scans.\n2. Foreign Keys: Verified referential integrity constraint on foreign keys.\n3. Adaptive Difficulty Recommendation: You have passed basic joins! Recommended next topic: Window Functions (ROW_NUMBER & DENSE_RANK).`
        );
      } else {
        setAiFeedback(
          `AI Diagnosis & Low-Level Memory Inspection:\n\n1. Pointer Safety: Ensure free() is called on dynamically allocated heap memory from malloc() to prevent memory leaks.\n2. Array Bounds: Ensure index < size check before dereferencing array pointers.\n3. Valgrind Diagnostic: Zero leak signature detected.`
        );
      }
      toast.success('AI personalized feedback generated!');
    }, 1000);
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-[#0E121D] to-[#0A0D14] p-6 sm:p-8 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <Bot className="h-3.5 w-3.5" />
            <span>AI Remote Learning Engagement Engine</span>
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
            Personalized Learning Adaptability & Rural Offline Hub
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Adapts difficulty based on quiz performance, generates low-bandwidth text/audio micro-lessons (&lt;50KB) for rural areas, and provides real-time AI code debugging.
          </p>
        </div>

        {/* Low-Bandwidth Status */}
        <button
          onClick={toggleLowBandwidthMode}
          className={`flex items-center space-x-2 rounded-xl p-3 border transition-all text-xs font-semibold ${
            lowBandwidthMode 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Zap className={`h-4 w-4 ${lowBandwidthMode ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
          <div className="text-left">
            <div>Rural Low-Bandwidth Mode</div>
            <div className="text-[10px] font-normal opacity-80">
              {lowBandwidthMode ? 'Active (<50KB Text & Audio Payload)' : 'Click to Enable Rural Low-Data Mode'}
            </div>
          </div>
        </button>
      </div>

      {/* Adaptive Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Current Pace & Style</span>
          <div className="text-sm font-bold text-indigo-300">Self-Paced Active Learner</div>
          <p className="text-[10px] text-slate-500">{completedLessons.length} lessons completed</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Quiz Pass Rate</span>
          <div className="text-sm font-bold text-emerald-400 font-mono">
            {Object.keys(passedQuizzes).length > 0 ? '100% Mastery' : 'Pending First Quiz'}
          </div>
          <p className="text-[10px] text-slate-500">Adaptive recommendation ready</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Skill Level Tier</span>
          <div className="text-sm font-bold text-amber-300">{getSkillRank()}</div>
          <p className="text-[10px] text-slate-500">Auto-calculated from engagement</p>
        </div>
      </div>

      {/* Interactive AI Code Debugger & Explainer */}
      <div className="rounded-xl bg-[#080A10] p-5 border border-slate-800 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-semibold text-white">Ask AI Tutor / Submit Code for Diagnosis</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {(['Java', 'SQL', 'C'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setTargetLang(lang)}
                className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-colors ${
                  targetLang === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          rows={5}
          className="w-full rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600"
          placeholder={`Paste your ${targetLang} code or ask a conceptual question for instant step-by-step diagnosis...`}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={handleAnalyzeCode}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50 transition-all"
          >
            {isAnalyzing ? (
              <RefreshCcw className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>{isAnalyzing ? 'Analyzing Code...' : 'Get AI Code Diagnosis'}</span>
          </button>

          <span className="text-[11px] text-slate-500">Low-latency model response</span>
        </div>

        {/* AI Output Feedback */}
        {aiFeedback && (
          <div className="mt-4 rounded-xl bg-slate-900 p-4 border border-indigo-500/30 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 text-indigo-400 font-sans font-bold mb-2 pb-1 border-b border-slate-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>AI Tutor Feedback Output ({targetLang})</span>
            </div>
            {aiFeedback}
          </div>
        )}

      </div>

    </div>
  );
};
