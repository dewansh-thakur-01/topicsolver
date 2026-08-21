import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image: string;
  skillRank: string;
  currentStreak: number;
  lastActiveDate: string;
}

export interface ProblemState {
  solved: boolean;
  notes?: string;
  userCode?: string;
}

interface AppStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  completedLessons: string[]; // lessonIds
  passedQuizzes: Record<string, number>; // lessonId -> score percentage
  problemStatus: Record<number, ProblemState>; // problemId -> state
  lowBandwidthMode: boolean;
  activeCourseId: 'java' | 'sql' | 'c';
  
  // Actions
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  markLessonComplete: (lessonId: string) => void;
  markQuizPassed: (lessonId: string, score: number) => void;
  toggleProblemSolved: (problemId: number) => void;
  saveProblemNotes: (problemId: number, notes: string) => void;
  saveUserCode: (problemId: number, code: string) => void;
  toggleLowBandwidthMode: () => void;
  setActiveCourse: (courseId: 'java' | 'sql' | 'c') => void;
  getSkillRank: () => string;
  getOverallProgress: () => number;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: {
        id: 'user-demo-1',
        email: 'kailash@domain.com',
        name: 'Kailash',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        skillRank: 'Full Stack Adaptive Engineer',
        currentStreak: 7,
        lastActiveDate: new Date().toISOString().split('T')[0]
      },
      isAuthenticated: true,
      completedLessons: ['java-l1', 'java-l2', 'sql-l1', 'c-l1'],
      passedQuizzes: {
        'java-l1': 100,
        'java-l2': 100,
        'sql-l1': 100,
        'c-l1': 100
      },
      problemStatus: {
        1: { solved: true, notes: 'Used HashMap for O(N) time efficiency.' },
        175: { solved: true, notes: 'Used LEFT JOIN to retain unmapped address records.' },
        206: { solved: true, notes: 'In-place reverse using prev and curr pointers in C.' }
      },
      lowBandwidthMode: false,
      activeCourseId: 'java',

      signIn: (email: string, name?: string) => {
        const today = new Date().toISOString().split('T')[0];
        set({
          isAuthenticated: true,
          user: {
            id: 'user-' + Math.random().toString(36).substr(2, 9),
            email,
            name: name || email.split('@')[0],
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
            skillRank: get().getSkillRank(),
            currentStreak: 1,
            lastActiveDate: today
          }
        });
      },

      signOut: () => {
        set({ isAuthenticated: false, user: null });
      },

      markLessonComplete: (lessonId: string) => {
        const current = get().completedLessons;
        if (!current.includes(lessonId)) {
          const updated = [...current, lessonId];
          set({ completedLessons: updated });
          
          // Update streak & rank
          const user = get().user;
          if (user) {
            const newRank = get().getSkillRank();
            set({ user: { ...user, skillRank: newRank } });
          }
        }
      },

      markQuizPassed: (lessonId: string, score: number) => {
        const passedMap = { ...get().passedQuizzes, [lessonId]: score };
        set({ passedQuizzes: passedMap });
        get().markLessonComplete(lessonId);
      },

      toggleProblemSolved: (problemId: number) => {
        const currentMap = { ...get().problemStatus };
        const existing = currentMap[problemId] || { solved: false };
        currentMap[problemId] = { ...existing, solved: !existing.solved };
        set({ problemStatus: currentMap });

        const user = get().user;
        if (user) {
          set({ user: { ...user, skillRank: get().getSkillRank() } });
        }
      },

      saveProblemNotes: (problemId: number, notes: string) => {
        const currentMap = { ...get().problemStatus };
        const existing = currentMap[problemId] || { solved: false };
        currentMap[problemId] = { ...existing, notes };
        set({ problemStatus: currentMap });
      },

      saveUserCode: (problemId: number, userCode: string) => {
        const currentMap = { ...get().problemStatus };
        const existing = currentMap[problemId] || { solved: false };
        currentMap[problemId] = { ...existing, userCode };
        set({ problemStatus: currentMap });
      },

      toggleLowBandwidthMode: () => {
        set((state) => ({ lowBandwidthMode: !state.lowBandwidthMode }));
      },

      setActiveCourse: (courseId: 'java' | 'sql' | 'c') => {
        set({ activeCourseId: courseId });
      },

      getSkillRank: () => {
        const totalCompleted = get().completedLessons.length + Object.values(get().problemStatus).filter(p => p.solved).length;
        if (totalCompleted >= 90) return 'Master Algorithmist';
        if (totalCompleted >= 50) return 'Polyglot Engineer';
        if (totalCompleted >= 20) return 'Algorithm Specialist';
        if (totalCompleted >= 5) return 'Code Apprentice';
        return 'Java, SQL & C Explorer';
      },

      getOverallProgress: () => {
        const totalLessons = 112; // 54 Java + 24 SQL + 34 C
        const done = get().completedLessons.length;
        return Math.min(100, Math.round((done / totalLessons) * 100));
      }
    }),
    {
      name: 'leatcode-storage-v1'
    }
  )
);
