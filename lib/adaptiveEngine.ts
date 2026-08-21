export type MasteryTier = 'NEEDS_SUPPORT' | 'DEVELOPING' | 'PROFICIENT' | 'MASTERED';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Advanced';
export type StudentLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LearningPace = 'Developing' | 'Steady' | 'Fast';

export interface TopicMastery {
  topicId: string;
  topicName: string;
  subjectId: string;
  score: number; // 0 - 100
  tier: MasteryTier;
  attempts: number;
  correctAnswers: number;
  lastAttemptAt?: string;
}

export interface DifficultyDecision {
  currentDifficulty: DifficultyLevel;
  nextDifficulty: DifficultyLevel;
  action: 'INCREASE' | 'MAINTAIN' | 'TARGETED_PRACTICE' | 'REDUCE';
  reason: string;
  recentAccuracy: number;
}

export interface RecommendationItem {
  id: string;
  title: string;
  type: 'Article' | 'Practice' | 'Video' | 'Concept Review';
  estimatedTime: string;
  reason: string;
  topicId: string;
  url?: string;
  actionLink: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  personaType: 'custom' | 'strong' | 'developing' | 'beginner';
  activeSubject: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  level: StudentLevel;
  currentDifficulty: DifficultyLevel;
  learningPace: LearningPace;
  currentFocusTopicId: string;
  currentFocusTopicName: string;
  topicMasteries: Record<string, TopicMastery>;
  strengths: string[];
  weakTopics: string[];
  recentMistakePatterns: string[];
  recommendations: RecommendationItem[];
  streakDays: number;
  topicsImprovedThisWeek: number;
  problemsCompleted: number;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
}

/**
 * Calculates the mastery tier based on a 0-100 percentage score.
 * 0–39%   Needs Support
 * 40–69%  Developing
 * 70–84%  Proficient
 * 85–100% Mastered
 */
export function getMasteryTier(score: number): MasteryTier {
  if (score >= 85) return 'MASTERED';
  if (score >= 70) return 'PROFICIENT';
  if (score >= 40) return 'DEVELOPING';
  return 'NEEDS_SUPPORT';
}

export function getMasteryTierLabel(tier: MasteryTier): { label: string; color: string; badgeBg: string } {
  switch (tier) {
    case 'MASTERED':
      return { label: 'Mastered', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    case 'PROFICIENT':
      return { label: 'Proficient', color: 'text-cyan-400', badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
    case 'DEVELOPING':
      return { label: 'Developing', color: 'text-amber-400', badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    case 'NEEDS_SUPPORT':
    default:
      return { label: 'Needs Support', color: 'text-rose-400', badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
  }
}

/**
 * Evaluates recent question attempts and determines if difficulty should be increased, maintained, or reduced.
 * >= 85% -> Increase
 * 70-84% -> Maintain
 * 40-69% -> Targeted practice
 * < 40%  -> Reduce difficulty + prerequisite review
 */
export function evaluateAdaptiveDifficulty(
  currentDiff: DifficultyLevel,
  recentAttempts: boolean[] // array of true (correct) and false (incorrect)
): DifficultyDecision {
  if (recentAttempts.length === 0) {
    return {
      currentDifficulty: currentDiff,
      nextDifficulty: currentDiff,
      action: 'MAINTAIN',
      reason: 'Starting with baseline diagnostic difficulty.',
      recentAccuracy: 100
    };
  }

  const correctCount = recentAttempts.filter(Boolean).length;
  const accuracy = Math.round((correctCount / recentAttempts.length) * 100);

  if (accuracy >= 85) {
    let next: DifficultyLevel = currentDiff;
    if (currentDiff === 'Easy') next = 'Medium';
    else if (currentDiff === 'Medium') next = 'Hard';
    else if (currentDiff === 'Hard') next = 'Advanced';

    return {
      currentDifficulty: currentDiff,
      nextDifficulty: next,
      action: 'INCREASE',
      reason: `You answered ${correctCount} of your last ${recentAttempts.length} questions correctly (${accuracy}%), so we're increasing the challenge level.`,
      recentAccuracy: accuracy
    };
  }

  if (accuracy >= 70) {
    return {
      currentDifficulty: currentDiff,
      nextDifficulty: currentDiff,
      action: 'MAINTAIN',
      reason: `Your accuracy is steady at ${accuracy}%. Maintaining ${currentDiff} difficulty to solidify concept retention.`,
      recentAccuracy: accuracy
    };
  }

  if (accuracy >= 40) {
    return {
      currentDifficulty: currentDiff,
      nextDifficulty: currentDiff,
      action: 'TARGETED_PRACTICE',
      reason: `Your recent accuracy is ${accuracy}%. Providing targeted reinforcement questions on this topic before advancing.`,
      recentAccuracy: accuracy
    };
  }

  // < 40%
  let next: DifficultyLevel = currentDiff;
  if (currentDiff === 'Advanced') next = 'Hard';
  else if (currentDiff === 'Hard') next = 'Medium';
  else if (currentDiff === 'Medium') next = 'Easy';

  return {
    currentDifficulty: currentDiff,
    nextDifficulty: next,
    action: 'REDUCE',
    reason: `Your recent accuracy was ${accuracy}%. Let's review the foundational principles with a simpler challenge to build confidence.`,
    recentAccuracy: accuracy
  };
}

/**
 * Generates an Explainable Recommendation Reason based on student gaps.
 */
export function generateExplainableRecommendation(
  weakTopicName: string,
  mistakePattern?: string
): string {
  if (mistakePattern) {
    return `Because you encountered repeated errors with ${mistakePattern}, we recommend this targeted review to strengthen your foundation.`;
  }
  return `You demonstrated proficiency in preceding modules, but your ${weakTopicName} mastery is developing. Focusing here unlocks the next advanced milestone.`;
}

/**
 * OKR Progress Bar Logic per specification:
 * - Gray: 0.0 (Inactive / Unallocated / Not Started)
 * - Red: 0.01 - 0.3 (1% - 30%) Low Progress / Critical Status / At Risk
 * - Amber/Orange/Yellow: 0.4 - 0.6 (31% - 69%) Medium Progress / Caution / Partially Complete
 * - Green: 0.7 - 0.99 (70% - 99%) High Progress / On Track
 * - Blue: 1.0 (100%) Completed Task
 */
export function getOkrProgressColor(score: number): {
  barBg: string;
  badgeBg: string;
  textColor: string;
  statusLabel: string;
  hex: string;
} {
  if (score <= 0) {
    return {
      barBg: 'bg-slate-300',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-300',
      textColor: 'text-slate-600',
      statusLabel: 'Not Started (0.0)',
      hex: '#94A3B8'
    };
  }
  if (score <= 30) {
    return {
      barBg: 'bg-rose-500',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      textColor: 'text-rose-600',
      statusLabel: 'Critical / Low Progress (0.0 - 0.3)',
      hex: '#EF4444'
    };
  }
  if (score <= 69) {
    return {
      barBg: 'bg-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      textColor: 'text-amber-600',
      statusLabel: 'Medium / Attention Required (0.4 - 0.6)',
      hex: '#F59E0B'
    };
  }
  if (score < 100) {
    return {
      barBg: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      textColor: 'text-emerald-600',
      statusLabel: 'On Track / High Progress (0.7 - 1.0)',
      hex: '#10B981'
    };
  }
  return {
    barBg: 'bg-[#2B6FF3]',
    badgeBg: 'bg-blue-50 text-[#2B6FF3] border-blue-200',
    textColor: 'text-[#2B6FF3]',
    statusLabel: 'Completed Objective (1.0)',
    hex: '#2B6FF3'
  };
}

// Preset Demo Personas for Judge Presentations
export const DEMO_PERSONAS: Record<'strong' | 'developing' | 'beginner', StudentProfile> = {
  strong: {
    id: 'student-strong',
    name: 'Kailash (Advanced)',
    email: 'kailash.tech@domain.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    personaType: 'strong',
    activeSubject: 'java',
    level: 'Advanced',
    currentDifficulty: 'Hard',
    learningPace: 'Fast',
    currentFocusTopicId: 'java-52-threads',
    currentFocusTopicName: '52. Threads & Concurrency',
    topicMasteries: {
      'java-01-intro': { topicId: 'java-01-intro', topicName: '01. Introduction to Java', subjectId: 'java', score: 100, tier: 'MASTERED', attempts: 10, correctAnswers: 10 },
      'java-04-variables': { topicId: 'java-04-variables', topicName: '04. Variables & Data Types', subjectId: 'java', score: 98, tier: 'MASTERED', attempts: 12, correctAnswers: 12 },
      'java-08-if-else': { topicId: 'java-08-if-else', topicName: '08. If Else', subjectId: 'java', score: 95, tier: 'MASTERED', attempts: 10, correctAnswers: 10 },
      'java-14-for-loop': { topicId: 'java-14-for-loop', topicName: '14. For Loop', subjectId: 'java', score: 92, tier: 'MASTERED', attempts: 14, correctAnswers: 13 },
      'java-16-arrays-mistakes': { topicId: 'java-16-arrays-mistakes', topicName: '16. Arrays & Mistakes', subjectId: 'java', score: 88, tier: 'MASTERED', attempts: 15, correctAnswers: 13 },
      'java-32-inheritance': { topicId: 'java-32-inheritance', topicName: '32. Inheritance', subjectId: 'java', score: 86, tier: 'MASTERED', attempts: 18, correctAnswers: 16 },
      'java-44-exception-handling': { topicId: 'java-44-exception-handling', topicName: '44. Exception Handling', subjectId: 'java', score: 82, tier: 'PROFICIENT', attempts: 8, correctAnswers: 7 },
      'java-52-threads': { topicId: 'java-52-threads', topicName: '52. Threads', subjectId: 'java', score: 68, tier: 'DEVELOPING', attempts: 6, correctAnswers: 4 }
    },
    strengths: ['01. Introduction to Java', '04. Variables & Data Types', '08. If Else', '14. For Loop', '32. Inheritance'],
    weakTopics: ['52. Threads', '53. join() Method'],
    recentMistakePatterns: ['Thread race conditions on shared state'],
    recommendations: [
      {
        id: 'rec-1',
        title: '52. Multithreading & Runnable Interface Mastery',
        type: 'Article',
        estimatedTime: '4 min',
        reason: 'Because you have mastered OOP fundamentals and are ready for asynchronous parallel execution.',
        topicId: 'java-52-threads',
        actionLink: '/lessons/java-52-threads'
      },
      {
        id: 'rec-2',
        title: '53. Thread Synchronization with join() Method',
        type: 'Practice',
        estimatedTime: '6 min',
        reason: 'Targeted practice to bring your Threads mastery from 68% to 85%+.',
        topicId: 'java-53-join-method',
        actionLink: '/lessons/java-53-join-method'
      }
    ],
    streakDays: 14,
    topicsImprovedThisWeek: 5,
    problemsCompleted: 42,
    achievements: [
      { id: 'ach-1', title: 'Fast Learner', description: 'Skipped 5 foundational modules via diagnostic mastery', icon: 'Zap', unlockedAt: '2026-08-19' },
      { id: 'ach-2', title: 'OOP Architect', description: 'Scored 100% on Polymorphism & Abstraction assessment', icon: 'Award', unlockedAt: '2026-08-20' },
      { id: 'ach-3', title: '14-Day Streak', description: 'Consecutive daily coding engagement', icon: 'Flame', unlockedAt: '2026-08-21' }
    ]
  },

  developing: {
    id: 'student-developing',
    name: 'Kailash',
    email: 'kailash@domain.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    personaType: 'developing',
    activeSubject: 'java',
    level: 'Intermediate',
    currentDifficulty: 'Medium',
    learningPace: 'Steady',
    currentFocusTopicId: 'java-16-arrays-mistakes',
    currentFocusTopicName: '16. Arrays & Common Array Mistakes',
    topicMasteries: {
      'java-01-intro': { topicId: 'java-01-intro', topicName: '01. Introduction to Java', subjectId: 'java', score: 95, tier: 'MASTERED', attempts: 10, correctAnswers: 10 },
      'java-04-variables': { topicId: 'java-04-variables', topicName: '04. Variables & Data Types', subjectId: 'java', score: 88, tier: 'MASTERED', attempts: 10, correctAnswers: 9 },
      'java-08-if-else': { topicId: 'java-08-if-else', topicName: '08. If Else', subjectId: 'java', score: 78, tier: 'PROFICIENT', attempts: 9, correctAnswers: 7 },
      'java-14-for-loop': { topicId: 'java-14-for-loop', topicName: '14. For Loop', subjectId: 'java', score: 62, tier: 'DEVELOPING', attempts: 12, correctAnswers: 7 },
      'java-16-arrays-mistakes': { topicId: 'java-16-arrays-mistakes', topicName: '16. Arrays & Common Array Mistakes', subjectId: 'java', score: 48, tier: 'DEVELOPING', attempts: 14, correctAnswers: 7 },
      'java-21-objects-classes': { topicId: 'java-21-objects-classes', topicName: '21. Objects & Classes', subjectId: 'java', score: 30, tier: 'NEEDS_SUPPORT', attempts: 4, correctAnswers: 1 }
    },
    strengths: ['01. Introduction to Java', '04. Variables & Data Types', '08. If Else'],
    weakTopics: ['14. For Loop', '16. Arrays & Common Array Mistakes'],
    recentMistakePatterns: ['Off-by-one loop boundary termination', 'ArrayIndexOutOfBoundsException on traversal'],
    recommendations: [
      {
        id: 'rec-dev-1',
        title: '16. Array Indexing & Boundary Traversal — Quick Notes',
        type: 'Concept Review',
        estimatedTime: '3 min',
        reason: 'Because your recent accuracy dropped on boundary conditions, here is a concise breakdown of array indexing.',
        topicId: 'java-16-arrays-mistakes',
        actionLink: '/lessons/java-16-arrays-mistakes'
      },
      {
        id: 'rec-dev-2',
        title: '17. Coding Challenge 3 — Part 2 Practice',
        type: 'Practice',
        estimatedTime: '5 min',
        reason: 'Simpler medium question to reinforce array lengths before proceeding to multi-dimensional matrices.',
        topicId: 'java-17-challenge-3-p2',
        actionLink: '/lessons/java-17-challenge-3-p2'
      }
    ],
    streakDays: 7,
    topicsImprovedThisWeek: 3,
    problemsCompleted: 18,
    achievements: [
      { id: 'ach-1', title: '7-Day Streak', description: 'Active practice 7 days in a row', icon: 'Flame', unlockedAt: '2026-08-20' },
      { id: 'ach-2', title: 'Condition Master', description: 'Achieved 78% accuracy on logic gates', icon: 'CheckCircle', unlockedAt: '2026-08-18' }
    ]
  },

  beginner: {
    id: 'student-beginner',
    name: 'Maya Patel (Beginner)',
    email: 'maya.patel@school.org',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    personaType: 'beginner',
    activeSubject: 'java',
    level: 'Beginner',
    currentDifficulty: 'Easy',
    learningPace: 'Developing',
    currentFocusTopicId: 'java-01-intro',
    currentFocusTopicName: '01. Introduction to Java',
    topicMasteries: {
      'java-01-intro': { topicId: 'java-01-intro', topicName: '01. Introduction to Java', subjectId: 'java', score: 65, tier: 'DEVELOPING', attempts: 8, correctAnswers: 5 },
      'java-04-variables': { topicId: 'java-04-variables', topicName: '04. Variables & Data Types', subjectId: 'java', score: 45, tier: 'DEVELOPING', attempts: 6, correctAnswers: 3 },
      'java-08-if-else': { topicId: 'java-08-if-else', topicName: '08. If Else', subjectId: 'java', score: 25, tier: 'NEEDS_SUPPORT', attempts: 5, correctAnswers: 1 },
      'java-14-for-loop': { topicId: 'java-14-for-loop', topicName: '14. For Loop', subjectId: 'java', score: 10, tier: 'NEEDS_SUPPORT', attempts: 2, correctAnswers: 0 }
    },
    strengths: ['01. Introduction to Java'],
    weakTopics: ['04. Variables & Data Types', '08. If Else', '14. For Loop'],
    recentMistakePatterns: ['Data type mismatch in assignment', 'Missing semicolon or braces in if statements'],
    recommendations: [
      {
        id: 'rec-beg-1',
        title: '01. Step-by-Step Programming Basics with Visual Examples',
        type: 'Concept Review',
        estimatedTime: '5 min',
        reason: 'Guided step-by-step primer with hints to make variable assignments crystal clear.',
        topicId: 'java-01-intro',
        actionLink: '/lessons/java-01-intro'
      },
      {
        id: 'rec-beg-2',
        title: '04. Variables & Data Types Interactive Quiz',
        type: 'Practice',
        estimatedTime: '4 min',
        reason: 'Hands-on beginner exercises with immediate hints to boost logic confidence.',
        topicId: 'java-04-variables',
        actionLink: '/lessons/java-04-variables'
      }
    ],
    streakDays: 3,
    topicsImprovedThisWeek: 2,
    problemsCompleted: 6,
    achievements: [
      { id: 'ach-1', title: 'First Steps', description: 'Completed initial skill diagnostic assessment', icon: 'Sparkles', unlockedAt: '2026-08-19' },
      { id: 'ach-2', title: 'First Code Run', description: 'Successfully executed first Java program', icon: 'Terminal', unlockedAt: '2026-08-20' }
    ]
  }
};

