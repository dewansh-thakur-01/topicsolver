import { create } from 'zustand';
import { MentorAnalysis, analyzeStudentCode } from './codeMentorEngine';

interface CodeMentorState {
  isOpen: boolean;
  code: string;
  selectedLanguage: string;
  activeHintLevel: 1 | 2 | 3;
  isAnalyzing: boolean;
  currentAnalysis: MentorAnalysis | null;
  history: Array<{
    code: string;
    analysis: MentorAnalysis;
    timestamp: number;
  }>;
  
  // Actions
  openMentorWithCode: (code: string, language?: string) => void;
  openMentor: () => void;
  closeMentor: () => void;
  setCode: (code: string) => void;
  setSelectedLanguage: (lang: string) => void;
  setHintLevel: (level: 1 | 2 | 3) => void;
  analyzeCode: (customCode?: string, customLang?: string) => void;
  clearCode: () => void;
}

export const useCodeMentorStore = create<CodeMentorState>((set, get) => ({
  isOpen: false,
  code: '',
  selectedLanguage: 'auto',
  activeHintLevel: 1,
  isAnalyzing: false,
  currentAnalysis: null,
  history: [],

  openMentorWithCode: (code: string, language?: string) => {
    const lang = language || 'auto';
    set({
      isOpen: true,
      code,
      selectedLanguage: lang,
      activeHintLevel: 1,
      isAnalyzing: true
    });

    // Auto-analyze incoming code
    setTimeout(() => {
      const analysis = analyzeStudentCode(code, lang);
      set((state) => ({
        isAnalyzing: false,
        currentAnalysis: analysis,
        history: [{ code, analysis, timestamp: Date.now() }, ...state.history.slice(0, 9)]
      }));
    }, 400);
  },

  openMentor: () => set({ isOpen: true }),
  closeMentor: () => set({ isOpen: false }),
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

  clearCode: () => set({
    code: '',
    currentAnalysis: null,
    activeHintLevel: 1
  })
}));
