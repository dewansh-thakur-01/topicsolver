import { create } from 'zustand';
import { MentorAnalysis, analyzeStudentCode } from './codeMentorEngine';
import { ChatMessage, generateChatResponse } from './codeMentorChatEngine';

interface CodeMentorState {
  isOpen: boolean;
  activeTab: 'chat' | 'inspector';
  code: string;
  selectedLanguage: string;
  activeHintLevel: 1 | 2 | 3;
  isAnalyzing: boolean;
  currentAnalysis: MentorAnalysis | null;
  problemContext: {
    title: string;
    difficulty: string;
    subjectId: string;
    description: string;
  } | null;
  messages: ChatMessage[];
  history: Array<{
    code: string;
    analysis: MentorAnalysis;
    timestamp: number;
  }>;
  
  // Actions
  openMentorWithCode: (code: string, language?: string) => void;
  openMentorWithProblemError: (
    problem: { title: string; difficulty: string; subjectId: string; description: string },
    userCode: string,
    lang: string,
    errorFeedback: string
  ) => void;
  openMentorWithGreeting: (userName: string) => void;
  openMentor: () => void;
  closeMentor: () => void;
  setActiveTab: (tab: 'chat' | 'inspector') => void;
  setCode: (code: string) => void;
  setSelectedLanguage: (lang: string) => void;
  setHintLevel: (level: 1 | 2 | 3) => void;
  analyzeCode: (customCode?: string, customLang?: string) => void;
  sendMessage: (userText: string) => void;
  clearCode: () => void;
  clearChat: () => void;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-init',
  role: 'assistant',
  content: "👋 Hi! I'm **CodeMentor**, your AI Coding & Debugging Companion on TOPIC SOLVER.\n\nAsk me anything, or try quick commands:\n• /hint - Progressive clue for your problem\n• /explain - Learn the concept intuition\n• /debug - Scan and fix errors in your editor code\n• /complexity - Time & Space analysis",
  timestamp: Date.now(),
  quickActions: ['/hint', '/explain', '/debug', '/complexity']
};

export const useCodeMentorStore = create<CodeMentorState>((set, get) => ({
  isOpen: false,
  activeTab: 'chat',
  code: '',
  selectedLanguage: 'auto',
  activeHintLevel: 1,
  isAnalyzing: false,
  currentAnalysis: null,
  problemContext: null,
  messages: [INITIAL_GREETING],
  history: [],

  openMentorWithCode: (code: string, language?: string) => {
    const lang = language || 'auto';
    set({
      isOpen: true,
      activeTab: 'inspector',
      code,
      selectedLanguage: lang,
      activeHintLevel: 1,
      isAnalyzing: true
    });

    setTimeout(() => {
      const analysis = analyzeStudentCode(code, lang);
      set((state) => ({
        isAnalyzing: false,
        currentAnalysis: analysis,
        history: [{ code, analysis, timestamp: Date.now() }, ...state.history.slice(0, 9)]
      }));
    }, 400);
  },

  openMentorWithProblemError: (problem, userCode, lang, errorFeedback) => {
    const promptMsg = '🤖 **I detected an issue while running test cases for ' + problem.title + '**:\n\n' + errorFeedback + '\n\nWould you like me to explain the failure, give you a step-by-step hint, or debug your solution?';
    
    set((state) => ({
      isOpen: true,
      activeTab: 'chat',
      code: userCode,
      selectedLanguage: lang,
      problemContext: problem,
      messages: [
        ...state.messages,
        {
          id: 'msg-err-' + Date.now(),
          role: 'assistant',
          content: promptMsg,
          timestamp: Date.now(),
          quickActions: ['/hint', '/debug', '/explain']
        }
      ]
    }));
  },

  openMentorWithGreeting: (userName: string) => {
    const greetingMsg: ChatMessage = {
      id: 'msg-welcome-' + Date.now(),
      role: 'assistant',
      content: '🎉 **Hello ' + userName + '! Welcome to TOPIC SOLVER!** 🚀\n\nI am **CodeMentor**, your personal AI companion. I am here to help you master coding tracks (Java, Python, SQL, DSA, C), debug your code test cases, and explain complex concepts step-by-step.\n\nFeel free to ask questions or type commands like **/hint**, **/explain**, **/debug**, or **/complexity** anytime!\n\nWhat would you like to build or learn today?',
      timestamp: Date.now(),
      quickActions: ['/hint', '/explain', '/debug', '/complexity']
    };
    set((state) => ({
      isOpen: true,
      activeTab: 'chat',
      messages: [...state.messages, greetingMsg]
    }));
  },

  openMentor: () => set({ isOpen: true }),
  closeMentor: () => set({ isOpen: false }),
  setActiveTab: (activeTab: 'chat' | 'inspector') => set({ activeTab }),
  setCode: (code: string) => set({ code }),
  setSelectedLanguage: (selectedLanguage: string) => set({ selectedLanguage }),
  setHintLevel: (activeHintLevel: 1 | 2 | 3) => set({ activeHintLevel }),

  analyzeCode: (customCode?: string, customLang?: string) => {
    const codeToAnalyze = customCode !== undefined ? customCode : get().code;
    const langToUse = customLang !== undefined ? customLang : get().selectedLanguage;

    set({ isAnalyzing: true });

    setTimeout(() => {
      const analysis = analyzeStudentCode(codeToAnalyze, langToUse);
      set((state) => ({
        isAnalyzing: false,
        currentAnalysis: analysis,
        activeHintLevel: 1,
        history: [{ code: codeToAnalyze, analysis, timestamp: Date.now() }, ...state.history.slice(0, 9)]
      }));
    }, 450);
  },

  sendMessage: (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now()
    };

    set((state) => ({
      messages: [...state.messages, userMsg]
    }));

    // Generate intelligent AI reply
    setTimeout(() => {
      const { code, selectedLanguage, problemContext } = get();
      const response = generateChatResponse(trimmed, code, selectedLanguage, problemContext || undefined);

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        content: response.reply,
        timestamp: Date.now(),
        quickActions: response.quickActions
      };

      set((state) => ({
        messages: [...state.messages, botMsg]
      }));
    }, 350);
  },

  clearCode: () => set({
    code: '',
    currentAnalysis: null,
    activeHintLevel: 1
  }),

  clearChat: () => set({
    messages: [INITIAL_GREETING]
  })
}));
