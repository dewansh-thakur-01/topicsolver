'use client';

import React, { useState, useMemo } from 'react';
import { useCodeMentorStore } from '@/lib/useCodeMentorStore';
import { 
  Bot, 
  X, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Zap, 
  Terminal, 
  Code2, 
  BookOpen, 
  MessageSquare,
  HelpCircle,
  Flame,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Link from 'next/link';

export const CodeMentorWidget: React.FC = () => {
  const {
    isOpen,
    code,
    selectedLanguage,
    activeHintLevel,
    isAnalyzing,
    currentAnalysis,
    openMentor,
    closeMentor,
    setCode,
    setSelectedLanguage,
    setHintLevel,
    analyzeCode,
    clearCode
  } = useCodeMentorStore();

  const [copied, setCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Sample Buggy Snippets for instant testing
  const sampleSnippets = [
    {
      name: '🐍 Python (Missing Bracket & Colon)',
      lang: 'python',
      code: `def calculate_average(nums\n    total = sum(nums)\n    return total / len(nums)`
    },
    {
      name: '☕ Java (Type Mismatch & Missing ;)',
      lang: 'java',
      code: `public class Solution {\n    public static void main(String[] args) {\n        int count = "50"\n        System.out.println(count);\n    }\n}`
    },
    {
      name: '🗄️ SQL (Aggregate without GROUP BY)',
      lang: 'sql',
      code: `SELECT department, COUNT(employee_id), AVG(salary)\nFROM employees\nWHERE status = 'Active';`
    },
    {
      name: '⚡ DSA (Linked List Pointer Lost)',
      lang: 'dsa',
      code: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        curr.next = prev; // Lost next reference!\n        prev = curr;\n    }\n    return prev;\n}`
    }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = (sampleCode: string, sampleLang: string) => {
    setCode(sampleCode);
    setSelectedLanguage(sampleLang);
    analyzeCode(sampleCode, sampleLang);
  };

  const lineCount = useMemo(() => {
    return Math.max(8, code.split('\n').length);
  }, [code]);

  return (
    <>
      {/* Floating Bottom-Right Trigger Button */}
      <button
        onClick={openMentor}
        className={`fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 rounded-full bg-gradient-to-r from-[#2B6FF3] via-[#1557D6] to-purple-600 px-5 py-3 text-white shadow-2xl hover:shadow-[#2B6FF3]/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 font-bold text-xs ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        title="Open CodeMentor - AI Coding Error Mentor"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="h-5 w-5 animate-pulse text-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <span className="font-extrabold tracking-wide">CodeMentor AI</span>
      </button>

      {/* Slide-in / Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          
          <div 
            className={`relative flex flex-col bg-[#0B0F19] text-white border border-[#222B3D] shadow-2xl overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? 'w-full h-full sm:w-[96vw] sm:h-[92vh] sm:rounded-3xl' 
                : 'w-full h-[90vh] sm:h-[84vh] sm:w-[720px] sm:rounded-3xl'
            }`}
          >
            
            {/* Top Navigation & Controls */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#121622] border-b border-[#222B3D]">
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2B6FF3] to-purple-600 shadow-md">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-sm font-extrabold text-white tracking-tight">CodeMentor</h2>
                    <span className="rounded-full bg-[#2B6FF3]/20 px-2 py-0.5 text-[10px] font-bold text-[#60A5FA] border border-[#2B6FF3]/30">
                      AI Error Mentor
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">Guiding you to the solution without spoiling the answer</p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <Link
                  href="/mentor"
                  onClick={closeMentor}
                  className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-[#1A2030] hover:bg-[#222B3D] text-[11px] font-bold text-slate-300 hover:text-white transition-all border border-[#222B3D]"
                  title="Open Dedicated Fullscreen IDE"
                >
                  <BookOpen className="h-3.5 w-3.5 text-[#60A5FA]" />
                  <span>Full IDE</span>
                </Link>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1A2030] transition-colors"
                  title={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>

                <button
                  onClick={closeMentor}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1A2030] transition-colors"
                  title="Close CodeMentor"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Sample Buggy Snippets Bar */}
            <div className="flex items-center space-x-2 px-5 py-2 bg-[#0E121C] border-b border-[#222B3D] overflow-x-auto scrollbar-none text-[11px]">
              <span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 text-[10px]">Try Sample Error:</span>
              {sampleSnippets.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadSample(s.code, s.lang)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-[#161B26] hover:bg-[#222B3D] border border-[#222B3D] text-slate-300 hover:text-white transition-colors font-mono text-[11px]"
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Main Content Split Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              
              {/* Code Editor Studio Area */}
              <div className="space-y-3">
                
                {/* Editor Header Tools */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  
                  {/* Language Selector */}
                  <div className="flex items-center space-x-2">
                    <label className="text-[11px] font-bold text-slate-400">Language:</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="rounded-xl bg-[#161B26] border border-[#222B3D] px-3 py-1 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#2B6FF3]"
                    >
                      <option value="auto">✨ Auto-Detect Language</option>
                      <option value="python">🐍 Python</option>
                      <option value="java">☕ Java</option>
                      <option value="sql">🗄️ SQL</option>
                      <option value="dsa">⚡ Data Structures</option>
                    </select>
                  </div>

                  {/* Editor Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={clearCode}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-[#161B26] hover:bg-[#222B3D] border border-[#222B3D] text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                      title="Clear code"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Clear</span>
                    </button>

                    <button
                      onClick={handleCopyCode}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-[#161B26] hover:bg-[#222B3D] border border-[#222B3D] text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Dark Code Input Box with Line Numbers */}
                <div className="relative rounded-2xl border border-[#222B3D] bg-[#07090F] shadow-inner overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-1.5 bg-[#121622] border-b border-[#222B3D] text-[10px] text-slate-400">
                    <div className="flex items-center space-x-1.5">
                      <Terminal className="h-3 w-3 text-[#60A5FA]" />
                      <span>Student Code Editor</span>
                    </div>
                    <span>Paste your buggy or unfinished code below</span>
                  </div>

                  <div className="flex p-3 overflow-x-auto min-h-[160px] max-h-[260px]">
                    <div className="select-none pr-3 text-right text-slate-600 font-mono text-xs leading-5 border-r border-[#222B3D]">
                      {Array.from({ length: lineCount }).map((_, i) => (
                        <div key={i} className="h-5 text-[10px] leading-5">{i + 1}</div>
                      ))}
                    </div>

                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="// Paste or write your Python, Java, SQL, or DSA code here..."
                      rows={lineCount}
                      className="w-full bg-transparent text-emerald-400 font-mono text-xs leading-5 pl-3 focus:outline-none resize-none selection:bg-[#2B6FF3]/40 selection:text-white"
                      spellCheck={false}
                    />
                  </div>
                </div>

                {/* Analyze Action CTA */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 italic">
                    "I'll help you spot the bug without spoiling the answer."
                  </span>

                  <button
                    onClick={() => analyzeCode()}
                    disabled={isAnalyzing || !code.trim()}
                    className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#2B6FF3] to-[#1557D6] hover:from-[#1557D6] hover:to-[#0D44B8] text-white px-5 py-2.5 text-xs font-bold shadow-lg shadow-[#2B6FF3]/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-spin text-white" />
                        <span>Analyzing Code...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4 text-white" />
                        <span>Analyze My Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Analysis Result & Structured Mentor Guidance */}
              {currentAnalysis && (
                <div className="space-y-4 pt-2 border-t border-[#222B3D] animate-in fade-in slide-in-from-bottom-2 duration-300">
                  
                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#121622] border border-[#222B3D]">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-xl bg-[#1A2030] text-xs font-bold text-white border border-[#222B3D]">
                        {currentAnalysis.language}
                      </span>

                      <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                        currentAnalysis.isCorrect
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                          : currentAnalysis.errorType === 'Syntax Error'
                          ? 'bg-rose-950/60 text-rose-300 border-rose-700/50'
                          : currentAnalysis.errorType === 'Compilation Error'
                          ? 'bg-orange-950/60 text-orange-300 border-orange-700/50'
                          : currentAnalysis.errorType === 'Runtime Error'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-700/50'
                          : currentAnalysis.errorType === 'SQL Query Error'
                          ? 'bg-purple-950/60 text-purple-300 border-purple-700/50'
                          : 'bg-blue-950/60 text-blue-300 border-blue-700/50'
                      }`}>
                        {currentAnalysis.isCorrect ? '✓ No Error Detected' : `● ${currentAnalysis.errorType}`}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400">
                      Topic: <span className="text-white font-bold">{currentAnalysis.topic}</span>
                    </div>
                  </div>

                  {/* Encouraging Personality Quote */}
                  <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#161B26] border border-[#222B3D] text-xs text-slate-300">
                    <Bot className="h-4 w-4 text-[#60A5FA] shrink-0" />
                    <span className="font-medium italic">"{currentAnalysis.encouragement}"</span>
                  </div>

                  {/* Structured Problem Breakdown */}
                  <div className="rounded-2xl bg-[#0E121C] p-4 border border-[#222B3D] space-y-3 text-xs">
                    
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Problem Diagnosis:
                      </div>
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {currentAnalysis.problem}
                      </p>
                    </div>

                    {/* 3-Level Progressive Hint Controls */}
                    <div className="space-y-2.5 pt-2 border-t border-[#222B3D]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Progressive Hint System:
                        </span>
                        <span className="text-[10px] font-mono text-[#60A5FA]">
                          Level {activeHintLevel} of 3
                        </span>
                      </div>

                      {/* Hint Level Selector Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setHintLevel(1)}
                          className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                            activeHintLevel === 1
                              ? 'bg-[#2B6FF3] text-white border-[#2B6FF3] shadow-md'
                              : 'bg-[#161B26] text-slate-300 border-[#222B3D] hover:bg-[#1A2030]'
                          }`}
                        >
                          <Lightbulb className="h-3.5 w-3.5" />
                          <span>Hint 1 (Basic)</span>
                        </button>

                        <button
                          onClick={() => setHintLevel(2)}
                          className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                            activeHintLevel === 2
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                              : 'bg-[#161B26] text-slate-300 border-[#222B3D] hover:bg-[#1A2030]'
                          }`}
                        >
                          <HelpCircle className="h-3.5 w-3.5" />
                          <span>Hint 2 (Detailed)</span>
                        </button>

                        <button
                          onClick={() => setHintLevel(3)}
                          className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                            activeHintLevel === 3
                              ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                              : 'bg-[#161B26] text-slate-300 border-[#222B3D] hover:bg-[#1A2030]'
                          }`}
                        >
                          <Zap className="h-3.5 w-3.5" />
                          <span>Strong Hint</span>
                        </button>
                      </div>

                      {/* Active Hint Display Box */}
                      <div className={`p-4 rounded-xl border text-xs leading-relaxed transition-all ${
                        activeHintLevel === 1 
                          ? 'bg-blue-950/40 border-blue-800/40 text-blue-200' 
                          : activeHintLevel === 2 
                          ? 'bg-purple-950/40 border-purple-800/40 text-purple-200' 
                          : 'bg-amber-950/40 border-amber-800/40 text-amber-200'
                      }`}>
                        <div className="font-bold mb-1 flex items-center gap-1.5">
                          {activeHintLevel === 1 && <Lightbulb className="h-4 w-4 text-[#60A5FA]" />}
                          {activeHintLevel === 2 && <HelpCircle className="h-4 w-4 text-purple-400" />}
                          {activeHintLevel === 3 && <Zap className="h-4 w-4 text-amber-400" />}
                          <span>
                            {activeHintLevel === 1 ? '💡 Basic Direction Hint:' : activeHintLevel === 2 ? '🔍 Detailed Conceptual Hint:' : '⚡ Strong Targeted Hint:'}
                          </span>
                        </div>
                        <p className="font-medium">
                          {activeHintLevel === 1 && currentAnalysis.hint1}
                          {activeHintLevel === 2 && currentAnalysis.hint2}
                          {activeHintLevel === 3 && currentAnalysis.hint3}
                        </p>
                      </div>

                    </div>

                    {/* Next Actionable Step */}
                    <div className="pt-2 border-t border-[#222B3D] flex items-start space-x-2 text-xs">
                      <ChevronRight className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Next Step: </span>
                        <span className="text-slate-200 font-semibold">{currentAnalysis.nextStep}</span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </>
  );
};
