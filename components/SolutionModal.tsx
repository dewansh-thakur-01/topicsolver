'use client';

import React, { useState, useEffect } from 'react';
import { Problem } from '@/lib/problemsData';
import { useStore } from '@/lib/useStore';
import { toast } from 'sonner';
import { X, ExternalLink, CheckCircle2, Copy, FileText, Save, Code2, Clock, HardDrive } from 'lucide-react';

interface SolutionModalProps {
  problem: Problem | null;
  onClose: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ problem, onClose }) => {
  const { problemStatus, saveProblemNotes, toggleProblemSolved, saveUserCode } = useStore();
  const [activeTab, setActiveTab] = useState<'solution' | 'playground' | 'notes'>('solution');

  const pStatus = problem ? problemStatus[problem.id] : undefined;
  const isSolved = pStatus?.solved || false;
  
  const [notes, setNotes] = useState<string>('');
  const [userCode, setUserCode] = useState<string>('');

  useEffect(() => {
    if (problem) {
      setNotes(pStatus?.notes || '');
      setUserCode(pStatus?.userCode || problem.sampleSolution);
    }
  }, [problem, pStatus]);

  if (!problem) return null;

  const handleSaveNotes = () => {
    saveProblemNotes(problem.id, notes);
    saveUserCode(problem.id, userCode);
    toast.success('Notes and code playground saved!');
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-[#0C0F17] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/80">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleProblemSolved(problem.id)}
              className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                isSolved ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-700 hover:border-slate-500 text-transparent'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-400">#{problem.id}</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{problem.title}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${getDifficultyBadge(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700">
                  {problem.language}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{problem.category}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={problem.leetCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-indigo-400 border border-slate-700 hover:bg-slate-700 hover:text-indigo-300"
            >
              <span>Solve on LeetCode</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center space-x-2 border-b border-slate-800 px-6 py-2 bg-[#090C13]">
          <button
            onClick={() => setActiveTab('solution')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'solution' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-indigo-400" />
            <span>Official Solution</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'playground' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive Code Scratchpad</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'notes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Save className="h-3.5 w-3.5 text-amber-400" />
            <span>My Personal Notes</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Problem Statement */}
          <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80 space-y-2">
            <h4 className="font-semibold text-slate-200">Problem Description</h4>
            <p className="text-slate-300 leading-relaxed">{problem.description}</p>
            
            {problem.examples && problem.examples.length > 0 && (
              <div className="mt-3 space-y-2 pt-2 border-t border-slate-800/80">
                <h5 className="font-semibold text-slate-400">Example Inputs & Outputs:</h5>
                {problem.examples.map((ex, idx) => (
                  <div key={idx} className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] border border-slate-800">
                    <div><span className="text-slate-500">Input:</span> <span className="text-slate-300">{ex.input}</span></div>
                    <div><span className="text-slate-500">Output:</span> <span className="text-emerald-400">{ex.output}</span></div>
                    {ex.explanation && (
                      <div className="text-slate-400 text-[10px] mt-1 font-sans"><span className="font-semibold">Explanation:</span> {ex.explanation}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {activeTab === 'solution' && (
            <div className="space-y-4">
              
              {/* Complexity Badges */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5 rounded-lg bg-indigo-500/10 px-3 py-1.5 text-indigo-300 border border-indigo-500/20 font-mono">
                  <Clock className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Time: {problem.timeComplexity}</span>
                </div>
                <div className="flex items-center space-x-1.5 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-cyan-300 border border-cyan-500/20 font-mono">
                  <HardDrive className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Space: {problem.spaceComplexity}</span>
                </div>
              </div>

              {/* Sample Code Block */}
              <div className="relative rounded-xl bg-[#07090F] p-4 border border-slate-800 font-mono">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 border-b border-slate-800 pb-2">
                  <span>{problem.language} Reference Implementation</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(problem.sampleSolution);
                      toast.success('Solution copied to clipboard!');
                    }}
                    className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="overflow-x-auto text-emerald-400 whitespace-pre">{problem.sampleSolution}</pre>
              </div>
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">Edit or Draft Your Solution Code:</span>
                <span className="text-[11px] text-slate-500 font-mono">Syntax: {problem.language}</span>
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={12}
                className="w-full rounded-xl bg-[#07090F] p-4 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Write your code here..."
              />
              <button
                onClick={handleSaveNotes}
                className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Code Draft</span>
              </button>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <span className="font-semibold text-slate-300">Personal Problem Key Takeaways & Approach Notes:</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={8}
                className="w-full rounded-xl bg-slate-900 p-4 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Write notes on edge cases, algorithmic approach, memory tricks, or complexity explanations..."
              />
              <button
                onClick={handleSaveNotes}
                className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">Status: {isSolved ? '✅ Solved' : '⏳ Todo'}</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
