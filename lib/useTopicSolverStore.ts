import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  StudentProfile, 
  DifficultyLevel, 
  StudentLevel, 
  DEMO_PERSONAS, 
  getMasteryTier, 
  evaluateAdaptiveDifficulty,
  generateExplainableRecommendation,
  DifficultyDecision,
  TopicMastery
} from './adaptiveEngine';
import { SUBJECT_COURSES, DIAGNOSTIC_QUESTIONS, PRACTICE_PROBLEMS } from './topicSolverData';
import { Language } from './translations';

export interface AnalyzedSkill {
  id: string;
  topicId?: string;
  title: string;
  category: string;
  subjectId: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  subjectName: string;
  proficiencyPct: number;
  solvedProblems: number;
  totalAttempts: number;
  status: 'MASTERED' | 'STRONG' | 'DEVELOPING' | 'NEEDS_PRACTICE';
  reason: string;
  recommendation: string;
  actionLink: string;
  actionLabel: string;
}

export function computeSkillInsights(
  completedLessons: string[],
  practiceStatus: Record<string, { solved: boolean; code?: string; notes?: string }>,
  topicMasteries: Record<string, TopicMastery>,
  activeSubject: string
): { 
  strengths: AnalyzedSkill[]; 
  weaknesses: AnalyzedSkill[]; 
  overallAccuracy: number; 
  totalSolved: number;
  subjectSummary: Record<string, { solved: number; completedLessons: number; score: number }>;
} {
  const strengths: AnalyzedSkill[] = [];
  const weaknesses: AnalyzedSkill[] = [];

  const solvedProbIds = Object.keys(practiceStatus).filter(k => practiceStatus[k]?.solved);
  const totalSolved = solvedProbIds.length;

  // 1. Check Practice Problems Solved
  if (solvedProbIds.includes('prob-two-sum')) {
    strengths.push({
      id: 'skill-two-sum',
      topicId: 'dsa-arrays',
      title: 'Array Hashing & Time Complexity Optimization',
      category: 'Data Structures & Algorithms',
      subjectId: 'dsa',
      subjectName: 'DSA',
      proficiencyPct: 96,
      solvedProblems: 1,
      totalAttempts: 2,
      status: 'MASTERED',
      reason: 'Successfully implemented O(N) Hash Table lookup for two-sum pair matching with boundary checks.',
      recommendation: 'Advance to 2D Array Matrix math and sliding window problems.',
      actionLink: '/practice',
      actionLabel: 'Explore Next DSA Problem'
    });
  }

  if (solvedProbIds.includes('prob-combine-two-tables')) {
    strengths.push({
      id: 'skill-sql-joins',
      topicId: 'sql-joins',
      title: 'Relational Database Queries & OUTER JOINs',
      category: 'SQL & Database Architecture',
      subjectId: 'sql',
      subjectName: 'SQL',
      proficiencyPct: 92,
      solvedProblems: 1,
      totalAttempts: 1,
      status: 'MASTERED',
      reason: 'Effectively applied LEFT JOIN preserving unmatched foreign keys without record omissions.',
      recommendation: 'Practice GROUP BY aggregations, HAVING clauses, and subqueries.',
      actionLink: '/courses/sql',
      actionLabel: 'View SQL Modules'
    });
  }

  if (solvedProbIds.includes('c-prob-1') || solvedProbIds.includes('prob-reverse-linked-list')) {
    strengths.push({
      id: 'skill-pointers-linked-list',
      topicId: 'c-29-pointers-intro',
      title: 'Pointer In-Place Memory Mutation',
      category: 'System Programming',
      subjectId: 'c',
      subjectName: 'C Programming',
      proficiencyPct: 88,
      solvedProblems: 1,
      totalAttempts: 2,
      status: 'STRONG',
      reason: 'Demonstrated correct pointer dereferencing (*ptr) without unintended memory leaks.',
      recommendation: 'Practice Dynamic Memory Allocation with malloc/free and struct pointers.',
      actionLink: '/practice',
      actionLabel: 'Practice More C Problems'
    });
  }

  // 2. Check Completed Lessons / Masteries
  if (completedLessons.some(id => id.includes('java-01') || id.includes('java-04') || id.includes('java-08'))) {
    strengths.push({
      id: 'skill-java-syntax',
      topicId: 'java-04-variables',
      title: 'Java Syntax, Scoping & Control Flow',
      category: 'Object Oriented Programming',
      subjectId: 'java',
      subjectName: 'Java',
      proficiencyPct: 94,
      solvedProblems: 2,
      totalAttempts: 8,
      status: 'MASTERED',
      reason: 'Passed syntax and conditional branching quizzes with ≥90% average accuracy.',
      recommendation: 'Build complex OOP domain models with abstract classes and interfaces.',
      actionLink: '/courses/java',
      actionLabel: 'Continue Java Syllabus'
    });
  }

  if (completedLessons.some(id => id.includes('py-'))) {
    strengths.push({
      id: 'skill-python-collections',
      topicId: 'py-lists',
      title: 'Python List Slicing & Dynamic Collections',
      category: 'Python Programming',
      subjectId: 'python',
      subjectName: 'Python',
      proficiencyPct: 89,
      solvedProblems: 1,
      totalAttempts: 5,
      status: 'STRONG',
      reason: 'Handled 0-based and negative step slicing with zero index bounds errors.',
      recommendation: 'Explore Dictionary Comprehensions and lambda generators.',
      actionLink: '/courses/python',
      actionLabel: 'Practice Python'
    });
  }

  // Fallback default strength if none yet
  if (strengths.length === 0) {
    strengths.push({
      id: 'skill-syntax-foundations',
      title: 'Syntax & Algorithmic Foundations',
      category: 'Foundational Programming',
      subjectId: 'java',
      subjectName: 'Java',
      proficiencyPct: 85,
      solvedProblems: 0,
      totalAttempts: 3,
      status: 'DEVELOPING',
      reason: 'Grounded understanding of basic code execution and primitive data structures.',
      recommendation: 'Complete full topic quizzes to build advanced mastery scores.',
      actionLink: '/courses/java',
      actionLabel: 'Start Practice'
    });
  }

  // 3. Computed Weaknesses / Areas for Improvement
  // A. Pointers & Linked Lists
  if (!solvedProbIds.includes('c-prob-1') && !solvedProbIds.includes('prob-reverse-linked-list')) {
    weaknesses.push({
      id: 'weak-pointers-memory',
      topicId: 'c-29-pointers-intro',
      title: 'Pointer Dereferencing & Dynamic Memory Management',
      category: 'Memory Management',
      subjectId: 'c',
      subjectName: 'C Programming',
      proficiencyPct: 45,
      solvedProblems: 0,
      totalAttempts: 2,
      status: 'NEEDS_PRACTICE',
      reason: 'Potential confusion between pointer address (&var) vs value dereferencing (*ptr).',
      recommendation: 'Solve the Swap Numbers and Reverse Linked List pointer mutation challenges.',
      actionLink: '/practice',
      actionLabel: 'Solve Pointer Challenge'
    });
  }

  // B. Multithreading & Race Conditions
  if (!completedLessons.includes('java-52-threads')) {
    weaknesses.push({
      id: 'weak-concurrency',
      topicId: 'java-52-threads',
      title: 'Concurrency, Thread Safety & Race Conditions',
      category: 'Advanced Execution',
      subjectId: 'java',
      subjectName: 'Java',
      proficiencyPct: 52,
      solvedProblems: 0,
      totalAttempts: 4,
      status: 'NEEDS_PRACTICE',
      reason: 'Thread synchronization hurdles and race conditions on shared mutable object state.',
      recommendation: 'Review Java Threads lesson with synchronized blocks and join() methods.',
      actionLink: '/lessons/java-52-threads',
      actionLabel: 'Review Threads Lesson'
    });
  }

  // C. Recursive Base Conditions
  if (!solvedProbIds.includes('prob-palindrome-number')) {
    weaknesses.push({
      id: 'weak-recursion',
      topicId: 'dsa-recursion',
      title: 'Recursive Base Cases & Stack Memory Unwinding',
      category: 'Algorithmic Paradigms',
      subjectId: 'dsa',
      subjectName: 'DSA',
      proficiencyPct: 58,
      solvedProblems: 0,
      totalAttempts: 3,
      status: 'DEVELOPING',
      reason: 'Occasional infinite recursion stack overflow when boundary conditions are not checked first.',
      recommendation: 'Solve Palindrome Number and Fibonacci recursive problems.',
      actionLink: '/practice',
      actionLabel: 'Practice Recursion'
    });
  }

  const overallAccuracy = Math.round(
    (strengths.reduce((acc, s) => acc + s.proficiencyPct, 0) +
     weaknesses.reduce((acc, w) => acc + w.proficiencyPct, 0)) / 
    (strengths.length + weaknesses.length)
  );

  const subjectSummary: Record<string, { solved: number; completedLessons: number; score: number }> = {
    java: { 
      solved: solvedProbIds.filter(id => id.includes('java') || id.includes('palindrome')).length, 
      completedLessons: completedLessons.filter(id => id.startsWith('java')).length,
      score: 92
    },
    python: { 
      solved: solvedProbIds.filter(id => id.includes('py')).length, 
      completedLessons: completedLessons.filter(id => id.startsWith('py')).length,
      score: 88
    },
    sql: { 
      solved: solvedProbIds.filter(id => id.includes('sql') || id.includes('combine')).length, 
      completedLessons: completedLessons.filter(id => id.startsWith('sql')).length,
      score: 94
    },
    dsa: { 
      solved: solvedProbIds.filter(id => id.includes('prob-two-sum') || id.includes('linked-list')).length, 
      completedLessons: completedLessons.filter(id => id.startsWith('dsa')).length,
      score: 86
    },
    c: { 
      solved: solvedProbIds.filter(id => id.startsWith('c-')).length, 
      completedLessons: completedLessons.filter(id => id.startsWith('c-')).length,
      score: 80
    }
  };

  return {
    strengths,
    weaknesses,
    overallAccuracy,
    totalSolved,
    subjectSummary
  };
}

interface TopicSolverStore {
  profile: StudentProfile;
  activeSubject: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  lowBandwidthMode: boolean;
  language: Language;
  completedLessons: string[];
  recentQuizAttempts: Record<string, boolean[]>; // topicId -> array of boolean attempts
  latestDifficultyDecision: DifficultyDecision | null;
  practiceStatus: Record<string, { solved: boolean; code?: string; notes?: string }>;
  searchModalOpen: boolean;

  // Actions
  updateProfile: (updates: Partial<StudentProfile>) => void;
  setPersona: (persona: 'strong' | 'developing' | 'beginner') => void;
  setActiveSubject: (subject: 'java' | 'python' | 'sql' | 'dsa' | 'c') => void;
  setLanguage: (lang: Language) => void;
  toggleLowBandwidthMode: () => void;
  setSearchModalOpen: (open: boolean) => void;
  markLessonComplete: (lessonId: string) => void;
  
  // Diagnostic Assessment Action
  completeDiagnosticAssessment: (
    subject: 'java' | 'python' | 'sql' | 'dsa' | 'c', 
    answers: Record<string, number>
  ) => {
    level: StudentLevel;
    startingDifficulty: DifficultyLevel;
    strengths: string[];
    weaknesses: string[];
    accuracy: number;
    jumpedToModule: number;
    placementTitle: string;
    placementMessage: string;
    focusTopicId: string;
    focusTopicTitle: string;
  };

  // Adaptive Quiz Action
  recordQuizResult: (
    topicId: string, 
    topicName: string, 
    isCorrect: boolean, 
    questionDiff: DifficultyLevel
  ) => DifficultyDecision;

  // Practice Action
  submitPracticeProblem: (problemId: string, solved: boolean, userCode?: string, notes?: string) => void;
}

export const useTopicSolverStore = create<TopicSolverStore>()(
  persist(
    (set, get) => ({
      profile: DEMO_PERSONAS.developing,
      activeSubject: 'java',
      lowBandwidthMode: false,
      language: 'en',
      completedLessons: ['java-01-intro', 'java-04-variables'],
      recentQuizAttempts: {
        'java-01-intro': [true, true, true],
        'java-04-variables': [true, true, false, true],
        'java-08-if-else': [true, false, false, true],
        'java-14-for-loop': [false, false, true]
      },
      latestDifficultyDecision: null,
      practiceStatus: {
        'prob-two-sum': { solved: true, notes: 'Used HashMap for O(N) linear time lookups.' },
        'prob-combine-two-tables': { solved: true, notes: 'Applied LEFT JOIN to retain null records.' }
      },
      searchModalOpen: false,

      updateProfile: (updates: Partial<StudentProfile>) => {
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates
          }
        }));
      },

      setPersona: (persona: 'strong' | 'developing' | 'beginner') => {
        const selected = DEMO_PERSONAS[persona];
        set({
          profile: { ...selected },
          activeSubject: selected.activeSubject,
          completedLessons: persona === 'strong' 
            ? ['java-01-intro', 'java-04-variables', 'java-08-if-else', 'java-14-for-loop', 'java-32-inheritance', 'java-44-exception-handling']
            : persona === 'developing'
              ? ['java-01-intro', 'java-04-variables', 'java-08-if-else']
              : ['java-01-intro']
        });
      },

      setActiveSubject: (subject) => {
        set((state) => ({
          activeSubject: subject,
          profile: {
            ...state.profile,
            activeSubject: subject
          }
        }));
      },

      setLanguage: (lang) => {
        set({ language: lang });
      },

      toggleLowBandwidthMode: () => {
        set((state) => ({ lowBandwidthMode: !state.lowBandwidthMode }));
      },

      setSearchModalOpen: (open) => {
        set({ searchModalOpen: open });
      },

      markLessonComplete: (lessonId) => {
        const current = get().completedLessons;
        if (!current.includes(lessonId)) {
          set({ completedLessons: [...current, lessonId] });
        }
      },

      completeDiagnosticAssessment: (subject, answers) => {
        const questions = DIAGNOSTIC_QUESTIONS[subject];
        let correctCount = 0;
        const topicScores: Record<string, { total: number; correct: number; name: string }> = {};

        questions.forEach((q) => {
          if (!topicScores[q.topicId]) {
            topicScores[q.topicId] = { total: 0, correct: 0, name: q.topicName };
          }
          topicScores[q.topicId].total++;
          if (answers[q.id] === q.correctIndex) {
            correctCount++;
            topicScores[q.topicId].correct++;
          }
        });

        const overallAccuracy = Math.round((correctCount / questions.length) * 100);

        let level: StudentLevel = 'Beginner';
        let startingDifficulty: DifficultyLevel = 'Easy';

        if (overallAccuracy >= 80) {
          level = 'Advanced';
          startingDifficulty = 'Hard';
        } else if (overallAccuracy >= 50) {
          level = 'Intermediate';
          startingDifficulty = 'Medium';
        } else {
          level = 'Beginner';
          startingDifficulty = 'Easy';
        }

        const strengths: string[] = [];
        const weaknesses: string[] = [];
        const masteries = { ...get().profile.topicMasteries };

        Object.entries(topicScores).forEach(([topicId, stat]) => {
          const pct = Math.round((stat.correct / stat.total) * 100);
          const tier = getMasteryTier(pct);
          masteries[topicId] = {
            topicId,
            topicName: stat.name,
            subjectId: subject,
            score: pct,
            tier,
            attempts: stat.total,
            correctAnswers: stat.correct,
            lastAttemptAt: new Date().toISOString()
          };

          if (pct >= 70) {
            strengths.push(stat.name);
          } else {
            weaknesses.push(stat.name);
          }
        });

        // Determine recommended next topic and module placement jump
        const course = SUBJECT_COURSES[subject];
        let jumpedToModule = 1;
        let placementTitle = '📚 Foundational Start';
        let placementMessage = `You scored ${overallAccuracy}% (< 50%). Starting from Level 1 Basics to build solid mastery!`;
        let unlockedTopicIdsToCredit: string[] = [];

        if (overallAccuracy >= 90) {
          // Master level: fast-track up to the final module
          jumpedToModule = Math.max(1, course.modules.length - 1);
          placementTitle = `🚀 Master Placement (${overallAccuracy}%)`;
          placementMessage = `Outstanding! You scored ${overallAccuracy}% (≥ 90%). All foundational modules have been credited and unlocked. You have jumped directly to Module ${jumpedToModule}!`;
          
          // Credit all topics in modules 1 to (jumpedToModule - 1)
          const modulesToCredit = course.modules.slice(0, jumpedToModule - 1);
          unlockedTopicIdsToCredit = modulesToCredit.flatMap(m => m.topics.map(t => t.id));
        } else if (overallAccuracy >= 70) {
          // Intermediate level: credit modules 1 & 2, jump to module 3
          jumpedToModule = Math.min(course.modules.length, 3);
          placementTitle = `⚡ Proficient Placement (${overallAccuracy}%)`;
          placementMessage = `Great job! You scored ${overallAccuracy}% (70–89%). Basic syntax and control flow have been credited. You have jumped directly to Module ${jumpedToModule}!`;
          
          const modulesToCredit = course.modules.slice(0, jumpedToModule - 1);
          unlockedTopicIdsToCredit = modulesToCredit.flatMap(m => m.topics.map(t => t.id));
        } else if (overallAccuracy >= 50) {
          // Developing level: credit module 1, jump to module 2
          jumpedToModule = Math.min(course.modules.length, 2);
          placementTitle = `🌱 Developing Placement (${overallAccuracy}%)`;
          placementMessage = `Good start! You scored ${overallAccuracy}% (50–69%). Intro setup has been credited. You have jumped to Module ${jumpedToModule}!`;
          
          const modulesToCredit = course.modules.slice(0, 1);
          unlockedTopicIdsToCredit = modulesToCredit.flatMap(m => m.topics.map(t => t.id));
        } else {
          jumpedToModule = 1;
          placementTitle = `📚 Foundational Start (${overallAccuracy}%)`;
          placementMessage = `You scored ${overallAccuracy}% (< 50%). Starting from Level 1 Basics to build step-by-step mastery.`;
          unlockedTopicIdsToCredit = [];
        }

        // Merge newly credited topic IDs into completedLessons
        const currentCompleted = get().completedLessons;
        const newCompleted = Array.from(new Set([...currentCompleted, ...unlockedTopicIdsToCredit]));

        // Target starting topic for student
        const targetModule = course.modules[jumpedToModule - 1] || course.modules[0];
        const focusTopic = targetModule.topics[0] || course.modules[0].topics[0];

        // Generate recommendations
        const newRecs = weaknesses.map((weakName, idx) => ({
          id: `rec-diag-${idx}`,
          title: `${weakName} — Targeted Foundations`,
          type: 'Concept Review' as const,
          estimatedTime: '4 min',
          reason: generateExplainableRecommendation(weakName),
          topicId: focusTopic.id,
          actionLink: `/lessons/${focusTopic.id}`
        }));

        set((state) => ({
          completedLessons: newCompleted,
          profile: {
            ...state.profile,
            activeSubject: subject,
            level,
            currentDifficulty: startingDifficulty,
            strengths,
            weakTopics: weaknesses,
            topicMasteries: masteries,
            currentFocusTopicId: focusTopic.id,
            currentFocusTopicName: focusTopic.title,
            recommendations: newRecs.length > 0 ? newRecs : state.profile.recommendations
          }
        }));

        return {
          level,
          startingDifficulty,
          strengths,
          weaknesses,
          accuracy: overallAccuracy,
          jumpedToModule,
          placementTitle,
          placementMessage,
          focusTopicId: focusTopic.id,
          focusTopicTitle: focusTopic.title
        };
      },

      recordQuizResult: (topicId, topicName, isCorrect, questionDiff) => {
        const currentAttempts = get().recentQuizAttempts[topicId] || [];
        const updatedAttempts = [...currentAttempts, isCorrect].slice(-5); // keep last 5 attempts
        
        const attemptsMap = {
          ...get().recentQuizAttempts,
          [topicId]: updatedAttempts
        };

        const decision = evaluateAdaptiveDifficulty(get().profile.currentDifficulty, updatedAttempts);

        // Update Topic Mastery Score
        const existingMastery = get().profile.topicMasteries[topicId] || {
          topicId,
          topicName,
          subjectId: get().activeSubject,
          score: 50,
          tier: 'DEVELOPING',
          attempts: 0,
          correctAnswers: 0
        };

        const newAttempts = existingMastery.attempts + 1;
        const newCorrect = existingMastery.correctAnswers + (isCorrect ? 1 : 0);
        const calculatedScore = Math.min(100, Math.max(0, Math.round((newCorrect / newAttempts) * 100)));
        const newTier = getMasteryTier(calculatedScore);

        const updatedMasteries = {
          ...get().profile.topicMasteries,
          [topicId]: {
            ...existingMastery,
            score: calculatedScore,
            tier: newTier,
            attempts: newAttempts,
            correctAnswers: newCorrect,
            lastAttemptAt: new Date().toISOString()
          }
        };

        // Update strengths and weaknesses
        const strengths: string[] = [];
        const weakTopics: string[] = [];

        Object.values(updatedMasteries).forEach(m => {
          if (m.score >= 70) strengths.push(m.topicName);
          else weakTopics.push(m.topicName);
        });

        // Update recommendations
        const updatedRecs = [...get().profile.recommendations];
        if (!isCorrect) {
          updatedRecs.unshift({
            id: `rec-err-${Date.now()}`,
            title: `${topicName} — Reinforcement Practice`,
            type: 'Practice',
            estimatedTime: '3 min',
            reason: `Because you struggled with ${topicName}, here is a simpler concept check.`,
            topicId,
            actionLink: `/lessons/${topicId}`
          });
        }

        set((state) => ({
          recentQuizAttempts: attemptsMap,
          latestDifficultyDecision: decision,
          profile: {
            ...state.profile,
            currentDifficulty: decision.nextDifficulty,
            topicMasteries: updatedMasteries,
            strengths,
            weakTopics,
            recommendations: updatedRecs.slice(0, 4)
          }
        }));

        return decision;
      },

      submitPracticeProblem: (problemId, solved, userCode, notes) => {
        const current = { ...get().practiceStatus };
        current[problemId] = { solved, code: userCode, notes };
        set((state) => ({
          practiceStatus: current,
          profile: {
            ...state.profile,
            problemsCompleted: Object.values(current).filter(p => p.solved).length
          }
        }));
      }
    }),
    {
      name: 'topicsolver-storage-v1'
    }
  )
);
