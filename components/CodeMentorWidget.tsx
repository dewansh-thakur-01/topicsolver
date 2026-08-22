'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  Minimize2,
  Send,
  Trash2,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import Link from 'next/link';

export const CodeMentorWidget: React.FC = () => {
  const {
    isOpen,
    activeTab,
    code,
    selectedLanguage,
    activeHintLevel,
    isAnalyzing,
    currentAnalysis,
    messages,
    openMentor,
    closeMentor,
    setActiveTab,
    setCode,
    setSelectedLanguage,
    setHintLevel,
    analyzeCode,
    sendMessage,
    clearCode,
    clearChat
  } = useCodeMentorStore();

  const [copied, setCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [inputChat, setInputChat] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (activeTab === 'chat' && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  // Sample Snippets for Instant Testing
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
    setActiveTab('inspector');
    analyzeCode(sampleCode, sampleLang);
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputChat.trim()) return;
    const msg = inputChat;
    setInputChat('');
    sendMessage(msg);
  };

  const handleQuickCommand = (cmd: string) => {
    sendMessage(cmd);
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
        </div>
        <span>CodeMentor AI</span>
      </button>

      {/* Floating CodeMentor Assistant Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ease-out ${
            isExpanded
              ? 'inset-4 sm:inset-8 w-auto h-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[500px] h-[85vh] sm:h-[620px]'
          }`}
        >
          <div className="relative flex flex-col h-full w-full rounded-3xl border border-[#2D3748] bg-[#0A0D14]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-slate-100 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E2538] bg-[#0F1422]/90">
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#2B6FF3] to-purple-600 text-white shadow-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-extrabold text-white tracking-tight">CodeMentor AI</h3>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Agent
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Interactive Coding & Clue Assistant</p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center space-x-1.5 text-slate-400">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-xl hover:bg-[#1E2538] hover:text-white transition-colors"
                  title={isExpanded ? 'Restore window size' : 'Expand window'}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={closeMentor}
                  className="p-1.5 rounded-xl hover:bg-[#1E2538] hover:text-white transition-colors"
                  title="Close mentor"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs (Chat vs Code Inspector) */}
            <div className="grid grid-cols-2 p-1.5 bg-[#07090F] border-b border-[#1E2538]">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'chat'
                    ? 'bg-[#2B6FF3] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#121622]'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>AI Chat & Commands</span>
              </button>
              <button
                onClick={() => setActiveTab('inspector')}
                className={`flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'inspector'
                    ? 'bg-[#2B6FF3] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#121622]'
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Code Inspector</span>
              </button>
            </div>

            {/* ================= TAB 1: AI CHAT & COMMANDS ================= */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0A0D14]">
                
                {/* Slash Command Bar */}
                <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0E121C] border-b border-[#1E2538] overflow-x-auto text-[11px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Commands:</span>
                  {[
                    { label: '/hint', desc: 'Get Clue' },
                    { label: '/explain', desc: 'Concept' },
                    { label: '/debug', desc: 'Find Bug' },
                    { label: '/complexity', desc: 'Big-O' },
                    { label: '/test', desc: 'Dry Run' },
                    { label: '/cheer', desc: 'Motivate' },
                  ].map(cmd => (
                    <button
                      key={cmd.label}
                      onClick={() => handleQuickCommand(cmd.label)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#2B6FF3] text-slate-300 hover:text-white border border-[#222B3D] transition-all shrink-0 font-mono text-[10px] font-bold"
                    >
                      <span>{cmd.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={clearChat}
                    className="ml-auto p-1 text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                    title="Clear chat history"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col space-y-1.5 ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-[#2B6FF3] to-[#1557D6] text-white rounded-br-none shadow-md'
                            : 'bg-[#121622] border border-[#222B3D] text-slate-200 rounded-bl-none shadow-sm'
                        }`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#60A5FA] mb-1">
                            <Bot className="h-3 w-3" />
                            <span>CodeMentor</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap font-sans text-xs space-y-1.5">
                          {msg.content}
                        </div>
                      </div>

                      {/* Quick Action Suggestion Chips */}
                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1 pl-1">
                          {msg.quickActions.map(action => (
                            <button
                              key={action}
                              onClick={() => handleQuickCommand(action)}
                              className="px-2.5 py-0.5 rounded-full bg-[#161B26] hover:bg-[#2B6FF3] border border-[#222B3D] text-[10px] text-cyan-300 hover:text-white transition-all font-mono"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input Box */}
                <form onSubmit={handleSendChat} className="p-3 bg-[#0E121C] border-t border-[#1E2538] flex items-center gap-2">
                  <input
                    type="text"
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    placeholder="Ask CodeMentor or type /hint, /debug, /explain..."
                    className="flex-1 rounded-xl bg-[#07090F] border border-[#222B3D] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2B6FF3] focus:ring-1 focus:ring-[#2B6FF3]"
                  />
                  <button
                    type="submit"
                    disabled={!inputChat.trim()}
                    className="flex items-center justify-center h-9 w-9 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white disabled:opacity-40 transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

              </div>
            )}

            {/* ================= TAB 2: CODE INSPECTOR & STATIC ANALYSIS ================= */}
            {activeTab === 'inspector' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
                
                {/* Presets Bar */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <Flame className="h-3 w-3 text-amber-500" />
                    <span>Try Common Bug Snippets:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {sampleSnippets.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLoadSample(s.code, s.lang)}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#121622] hover:bg-[#1A2030] border border-[#222B3D] text-[11px] text-left text-slate-300 hover:text-white transition-all font-semibold"
                      >
                        <span className="truncate">{s.name}</span>
                        <ChevronRight className="h-3 w-3 text-slate-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Container */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Code2 className="h-4 w-4 text-[#60A5FA]" />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="rounded-xl bg-[#121622] border border-[#222B3D] px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#2B6FF3]"
                      >
                        <option value="auto">⚡ Auto-Detect Language</option>
                        <option value="python">🐍 Python</option>
                        <option value="java">☕ Java</option>
                        <option value="sql">🗄️ SQL</option>
                        <option value="dsa">⚡ Data Structures</option>
                        <option value="c">💻 C</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={clearCode}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-[#161B26] hover:bg-[#222B3D] border border-[#222B3D] text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Clear</span>
                      </button>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-[#161B26] hover:bg-[#222B3D] border border-[#222B3D] text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
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
                        <span>Code Inspector Editor</span>
                      </div>
                      <span>Analyze code without direct answers</span>
                    </div>

                    <div className="flex p-3 overflow-x-auto min-h-[140px] max-h-[220px]">
                      <div className="select-none pr-3 text-right text-slate-600 font-mono text-xs leading-5 border-r border-[#222B3D]">
                        {Array.from({ length: lineCount }).map((_, i) => (
                          <div key={i} className="h-5 text-[10px] leading-5">{i + 1}</div>
                        ))}
                      </div>

                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="// Paste or write your Python, Java, SQL, DSA, or C code here..."
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
                      className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#2B6FF3] to-[#1557D6] hover:from-[#1557D6] text-white px-5 py-2.5 text-xs font-bold shadow-lg shadow-[#2B6FF3]/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <Sparkles className="h-4 w-4 animate-spin text-white" />
                          <span>Analyzing Code...</span>
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

                {/* Analysis Result & Structured Mentor Guidance */}
                {currentAnalysis && (
                  <div className="space-y-4 pt-2 border-t border-[#222B3D] animate-in fade-in duration-300">
                    
                    {/* Status Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#121622] border border-[#222B3D]">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded-xl bg-[#1A2030] text-xs font-bold text-white border border-[#222B3D]">
                          {currentAnalysis.language}
                        </span>

                        <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                          currentAnalysis.isCorrect
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                            : 'bg-rose-950/60 text-rose-300 border-rose-700/50'
                        }`}>
                          {currentAnalysis.isCorrect ? '✓ No Error Detected' : `● ${currentAnalysis.errorType}`}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-400">
                        Topic: <span className="text-white font-bold">{currentAnalysis.topic}</span>
                      </div>
                    </div>

                    {/* Problem Diagnosis */}
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
            )}

          </div>
        </div>
      )}
    </>
  );
};
