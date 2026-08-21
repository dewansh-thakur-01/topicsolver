'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCodeMentorStore } from '@/lib/useCodeMentorStore';
import { useTopicSolverStore } from '@/lib/useTopicSolverStore';
import { getTranslation } from '@/lib/translations';
import { 
  Bot, 
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
  HelpCircle, 
  ChevronRight, 
  ArrowLeft,
  Flame,
  Shield,
  Layers,
  Search
} from 'lucide-react';

export default function CodeMentorPage() {
  const { language } = useTopicSolverStore();
  const {
    code,
    selectedLanguage,
    activeHintLevel,
    isAnalyzing,
    currentAnalysis,
    setCode,
    setSelectedLanguage,
    setHintLevel,
    analyzeCode,
    clearCode
  } = useCodeMentorStore();

  const [copied, setCopied] = useState<boolean>(false);

  // Curated bug scenarios for students across the 4 areas
  const testScenarios = [
    {
      category: 'Python',
      icon: '🐍',
      title: 'Missing Parenthesis & Indentation',
      lang: 'python',
      code: `def calculate_average(nums\n    total = sum(nums)\n    return total / len(nums)`
    },
    {
      category: 'Java',
      icon: '☕',
      title: 'Type Incompatibility & Missing Semicolon',
      lang: 'java',
      code: `public class Solution {\n    public static void main(String[] args) {\n        int count = "50"\n        System.out.println(count);\n    }\n}`
    },
    {
      category: 'SQL',
      icon: '🗄️',
      title: 'Missing GROUP BY with Aggregate Functions',
      lang: 'sql',
      code: `SELECT department, COUNT(employee_id), AVG(salary)\nFROM employees\nWHERE status = 'Active';`
    },
    {
      category: 'Data Structures',
      icon: '⚡',
      title: 'Linked List Reversal Pointer Loss',
      lang: 'dsa',
      code: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        curr.next = prev; // Pointer to remainder overwritten!\n        prev = curr;\n    }\n    return prev;\n}`
    },
    {
      category: 'Python',
      icon: '🐍',
      title: 'IndexError in Forward Lookup',
      lang: 'python',
      code: `def check_adjacent(nums):\n    for i in range(len(nums)):\n        if nums[i] == nums[i + 1]:\n            return True\n    return False`
    },
    {
      category: 'Java',
      icon: '☕',
      title: 'Loop Array Index Out of Bounds',
      lang: 'java',
      code: `public class Solution {\n    public static void printArray(int[] arr) {\n        for (int i = 0; i <= arr.length; i++) {\n            System.out.println(arr[i]);\n        }\n    }\n}`
    }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadScenario = (scenarioCode: string, scenarioLang: string) => {
    setCode(scenarioCode);
    setSelectedLanguage(scenarioLang);
    analyzeCode(scenarioCode, scenarioLang);
  };

  const lineCount = useMemo(() => {
    return Math.max(16, code.split('\n').length);
  }, [code]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE5F2] pb-5 dark:border-[#222B3D]">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-[#16191D] border border-[#DCE5F2] hover:border-[#2B6FF3] hover:text-[#2B6FF3] transition-all shadow-xs dark:bg-[#121622] dark:border-[#222B3D] dark:text-slate-200 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-xs font-mono text-[#687385] dark:text-[#94A3B8]">/</span>
          <div className="flex items-center space-x-2">
            <Bot className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
            <h1 className="text-base font-extrabold text-[#16191D] dark:text-white">CodeMentor AI Studio</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-[#2B6FF3]/10 px-3 py-1 font-bold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
            <Sparkles className="h-3 w-3" />
            <span>Learning-First Mentorship Engine</span>
          </span>
        </div>
      </div>

      {/* Hero Banner with CodeMentor Introduction */}
      <div className="relative overflow-hidden rounded-3xl border border-[#2D3748] bg-gradient-to-r from-[#121620] via-[#161B26] to-[#121620] p-6 sm:p-8 shadow-2xl text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#1E293B] px-3.5 py-1 text-xs font-semibold text-[#60A5FA] border border-[#334155]">
              <Bot className="h-3.5 w-3.5" />
              <span>AI Coding Error Mentor</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Spot the Bug. Understand the Why. Fix It Yourself.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              CodeMentor guides you through <b>Python</b>, <b>Java</b>, <b>SQL</b>, and <b>Data Structures</b> errors. Instead of handing you the corrected code, it gives you progressive 3-level hints so you develop real problem-solving instincts.
            </p>
          </div>

          {/* Core Areas Pill Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono shrink-0">
            <div className="p-2.5 rounded-xl bg-[#1A202C] border border-[#334155] text-center">
              <span className="font-bold text-[#60A5FA]">🐍 Python</span>
              <div className="text-[10px] text-slate-400">Syntax & Indentation</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1A202C] border border-[#334155] text-center">
              <span className="font-bold text-amber-400">☕ Java</span>
              <div className="text-[10px] text-slate-400">Types & Compilation</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1A202C] border border-[#334155] text-center">
              <span className="font-bold text-cyan-400">🗄️ SQL</span>
              <div className="text-[10px] text-slate-400">Joins & Aggregates</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1A202C] border border-[#334155] text-center">
              <span className="font-bold text-purple-400">⚡ DSA</span>
              <div className="text-[10px] text-slate-400">Pointers & Recursion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Buggy Code Showcase */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#687385] dark:text-[#94A3B8]">
          <Terminal className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />
          <span>Click a sample buggy code to test CodeMentor live:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {testScenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadScenario(sc.code, sc.lang)}
              className="group text-left p-3.5 rounded-2xl border border-[#DCE5F2] bg-white hover:border-[#2B6FF3] hover:shadow-md transition-all dark:border-[#222B3D] dark:bg-[#121622] dark:hover:border-[#3B82F6]"
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-[#2B6FF3] dark:text-[#60A5FA]">{sc.icon} {sc.category}</span>
                <span className="text-[10px] font-mono text-[#687385] dark:text-[#94A3B8] group-hover:text-white">Load Code →</span>
              </div>
              <p className="text-xs font-semibold text-[#16191D] dark:text-slate-200">
                {sc.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Workbench: Code Studio (Left) & Mentor Diagnosis (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Code Studio Input Area */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-[#DCE5F2] bg-white shadow-xs dark:border-[#222B3D] dark:bg-[#121622]">
            
            {/* Language Selection */}
            <div className="flex items-center space-x-2">
              <label className="text-xs font-bold text-[#16191D] dark:text-slate-300">Target Area:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] px-3 py-1.5 text-xs font-bold text-[#16191D] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
              >
                <option value="auto">✨ Auto-Detect Language</option>
                <option value="python">🐍 Python</option>
                <option value="java">☕ Java</option>
                <option value="sql">🗄️ SQL</option>
                <option value="dsa">⚡ Data Structures</option>
              </select>
            </div>

            {/* Action Tools */}
            <div className="flex items-center space-x-2">
              <button
                onClick={clearCode}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#F7F9FC] hover:bg-slate-200 border border-[#DCE5F2] text-xs font-semibold text-[#687385] hover:text-[#16191D] transition-colors dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#F7F9FC] hover:bg-slate-200 border border-[#DCE5F2] text-xs font-semibold text-[#687385] hover:text-[#16191D] transition-colors dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-[#94A3B8] dark:hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => analyzeCode()}
                disabled={isAnalyzing || !code.trim()}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#2B6FF3] to-[#1557D6] hover:from-[#1557D6] hover:to-[#0D44B8] text-white px-5 py-2 text-xs font-bold shadow-lg shadow-[#2B6FF3]/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin text-white" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 text-white" />
                    <span>Analyze Code</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Code Editor Box with Line Numbers */}
          <div className="relative rounded-2xl border border-[#2D3748] bg-[#0E131F] shadow-2xl overflow-hidden font-mono text-xs text-white">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161B26] border-b border-[#2D3748] text-[11px] text-slate-400">
              <div className="flex items-center space-x-2">
                <Code2 className="h-3.5 w-3.5 text-[#60A5FA]" />
                <span className="font-semibold text-white">CodeMentor Workspace</span>
              </div>
              <span>UTF-8 • Auto Language Classifier</span>
            </div>

            <div className="flex p-3 overflow-x-auto min-h-[380px]">
              <div className="select-none pr-3 text-right text-slate-600 font-mono text-xs leading-5 border-r border-[#2D3748]">
                {Array.from({ length: lineCount }).map((_, i) => (
                  <div key={i} className="h-5 text-[11px] leading-5">{i + 1}</div>
                ))}
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Type or paste your Python, Java, SQL, or DSA code here..."
                rows={lineCount}
                className="w-full bg-transparent text-emerald-400 font-mono text-xs leading-5 pl-3 focus:outline-none resize-none selection:bg-[#2B6FF3]/40 selection:text-white"
                spellCheck={false}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Structured CodeMentor Guidance Card */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="rounded-3xl border border-[#DCE5F2] bg-white p-6 shadow-sm space-y-5 dark:border-[#222B3D] dark:bg-[#121622]">
            
            {/* Header */}
            <div className="flex items-center space-x-3 border-b border-[#DCE5F2] pb-4 dark:border-[#222B3D]">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#2B6FF3] to-purple-600 text-white shadow-md">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#16191D] dark:text-white">CodeMentor Analysis</h3>
                <p className="text-[11px] text-[#687385] dark:text-[#94A3B8]">AI-powered error explanation & progressive hints</p>
              </div>
            </div>

            {!currentAnalysis ? (
              <div className="text-center py-12 space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2B6FF3]/10 text-[#2B6FF3] mx-auto dark:bg-[#3B82F6]/20 dark:text-[#93C5FD]">
                  <Bot className="h-6 w-6 animate-pulse" />
                </div>
                <h4 className="text-sm font-bold text-[#16191D] dark:text-white">Ready to Inspect Your Code</h4>
                <p className="text-xs text-[#687385] max-w-xs mx-auto dark:text-[#94A3B8]">
                  Paste any code on the left and click <b>"Analyze Code"</b> to identify syntax, compilation, runtime, or logical bugs.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-300">
                
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D]">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-[#DCE5F2] text-xs font-bold text-[#16191D] dark:bg-[#161B26] dark:border-[#222B3D] dark:text-white">
                      {currentAnalysis.language}
                    </span>

                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                      currentAnalysis.isCorrect
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/50'
                        : currentAnalysis.errorType === 'Syntax Error'
                        ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700/50'
                        : currentAnalysis.errorType === 'Compilation Error'
                        ? 'bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-700/50'
                        : currentAnalysis.errorType === 'Runtime Error'
                        ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/50'
                        : currentAnalysis.errorType === 'SQL Query Error'
                        ? 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700/50'
                        : 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/50'
                    }`}>
                      {currentAnalysis.isCorrect ? '✓ No Error Detected' : `● ${currentAnalysis.errorType}`}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#687385] dark:text-[#94A3B8]">
                    Topic: <span className="font-bold text-[#16191D] dark:text-white">{currentAnalysis.topic}</span>
                  </div>
                </div>

                {/* Friendly Encouragement Bubble */}
                <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-[#DCE5F2] text-xs text-[#16191D] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-200">
                  <Bot className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA] shrink-0" />
                  <span className="font-medium italic">"{currentAnalysis.encouragement}"</span>
                </div>

                {/* Problem Explanation */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#687385] dark:text-[#94A3B8]">
                    Problem Diagnosis:
                  </div>
                  <p className="text-sm font-semibold text-[#16191D] leading-relaxed dark:text-white">
                    {currentAnalysis.problem}
                  </p>
                </div>

                {/* Progressive 3-Level Hint System */}
                <div className="space-y-3 pt-3 border-t border-[#DCE5F2] dark:border-[#222B3D]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#687385] dark:text-[#94A3B8]">
                      Progressive Hint System:
                    </span>
                    <span className="text-[10px] font-mono text-[#2B6FF3] dark:text-[#60A5FA]">
                      Hint Level {activeHintLevel} of 3
                    </span>
                  </div>

                  {/* Hint Level Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setHintLevel(1)}
                      className={`flex items-center justify-center space-x-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${
                        activeHintLevel === 1
                          ? 'bg-[#2B6FF3] text-white border-[#2B6FF3] shadow-md dark:bg-[#3B82F6]'
                          : 'bg-[#F7F9FC] text-[#16191D] border-[#DCE5F2] hover:bg-slate-100 dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-200'
                      }`}
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                      <span>Hint 1</span>
                    </button>

                    <button
                      onClick={() => setHintLevel(2)}
                      className={`flex items-center justify-center space-x-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${
                        activeHintLevel === 2
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                          : 'bg-[#F7F9FC] text-[#16191D] border-[#DCE5F2] hover:bg-slate-100 dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-200'
                      }`}
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>Hint 2</span>
                    </button>

                    <button
                      onClick={() => setHintLevel(3)}
                      className={`flex items-center justify-center space-x-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${
                        activeHintLevel === 3
                          ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                          : 'bg-[#F7F9FC] text-[#16191D] border-[#DCE5F2] hover:bg-slate-100 dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-slate-200'
                      }`}
                    >
                      <Zap className="h-3.5 w-3.5" />
                      <span>Strong Hint</span>
                    </button>
                  </div>

                  {/* Active Hint Output Display */}
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
                    activeHintLevel === 1 
                      ? 'bg-blue-50/80 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-800/40 dark:text-blue-200' 
                      : activeHintLevel === 2 
                      ? 'bg-purple-50/80 border-purple-200 text-purple-900 dark:bg-purple-950/40 dark:border-purple-800/40 dark:text-purple-200' 
                      : 'bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/40 dark:text-amber-200'
                  }`}>
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      {activeHintLevel === 1 && <Lightbulb className="h-4 w-4 text-[#2B6FF3] dark:text-[#60A5FA]" />}
                      {activeHintLevel === 2 && <HelpCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                      {activeHintLevel === 3 && <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
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

                {/* Next Step Guidance */}
                <div className="pt-3 border-t border-[#DCE5F2] flex items-start space-x-2 text-xs dark:border-[#222B3D]">
                  <ChevronRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Next Step: </span>
                    <span className="text-[#16191D] font-semibold dark:text-slate-200">{currentAnalysis.nextStep}</span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
