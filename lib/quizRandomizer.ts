import { AdaptiveQuestion } from './topicSolverData';

/**
 * Fisher-Yates In-Place Shuffle for pure randomness
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Randomizes option order of a single question and updates correctOptionIndex accordingly
 */
export function randomizeQuestionOptions(q: AdaptiveQuestion): AdaptiveQuestion {
  if (!q.options || q.options.length < 2 || q.correctOptionIndex === undefined) {
    return { ...q };
  }

  const correctText = q.options[q.correctOptionIndex];
  const optionsWithIndices = q.options.map((opt, i) => ({ opt, originalIndex: i }));
  const shuffledOptions = shuffleArray(optionsWithIndices);

  const newCorrectIndex = shuffledOptions.findIndex(o => o.opt === correctText);

  return {
    ...q,
    options: shuffledOptions.map(o => o.opt),
    correctOptionIndex: newCorrectIndex !== -1 ? newCorrectIndex : q.correctOptionIndex
  };
}

/**
 * Prepares a fresh, randomized question batch of 5 questions for a topic assessment.
 * Automatically excludes previously failed questions when retaking to ensure fresh questions from the topic bank.
 */
export function prepareRandomizedQuiz(
  topicQuestions: AdaptiveQuestion[],
  topicTitle: string,
  targetCount: number = 5,
  excludeQuestionIds: string[] = []
): AdaptiveQuestion[] {
  if (!topicQuestions || topicQuestions.length === 0) return [];

  // Filter out excluded/previously failed questions first if enough questions remain
  let candidatePool = topicQuestions.filter(q => !excludeQuestionIds.includes(q.id));

  // If candidate pool is smaller than targetCount, backfill from original pool while shuffling
  if (candidatePool.length < targetCount) {
    candidatePool = [...candidatePool, ...topicQuestions.filter(q => excludeQuestionIds.includes(q.id))];
  }

  // Shuffle candidate pool
  const shuffledPool = shuffleArray(candidatePool);

  // Take targetCount (5) questions
  const selectedBatch = shuffledPool.slice(0, Math.min(targetCount, shuffledPool.length));

  // Randomize options for each selected question
  const preparedQuestions = selectedBatch.map(q => randomizeQuestionOptions(q));

  return shuffleArray(preparedQuestions);
}

/**
 * Retrieves a brand new, unused replacement question from the same topic
 * when a student answers a question incorrectly.
 */
export function getReplacementQuestion(
  topicQuestions: AdaptiveQuestion[],
  currentBatchQuestionIds: string[],
  failedQuestionId: string
): AdaptiveQuestion | null {
  if (!topicQuestions || topicQuestions.length === 0) return null;

  // Look for any question in the topic pool that is NOT in the current quiz batch
  const availableUnused = topicQuestions.filter(
    q => !currentBatchQuestionIds.includes(q.id) && q.id !== failedQuestionId
  );

  let selectedQ: AdaptiveQuestion;

  if (availableUnused.length > 0) {
    // Pick one at random from unused questions
    selectedQ = availableUnused[Math.floor(Math.random() * availableUnused.length)];
  } else {
    // Fallback: pick another question from the topic that is different from failedQuestionId
    const otherQuestions = topicQuestions.filter(q => q.id !== failedQuestionId);
    if (otherQuestions.length > 0) {
      selectedQ = otherQuestions[Math.floor(Math.random() * otherQuestions.length)];
    } else {
      selectedQ = topicQuestions[0];
    }
  }

  return randomizeQuestionOptions(selectedQ);
}

/**
 * Generates a non-spoiler mistake hint/clue explaining WHY the user's answer is wrong,
 * without revealing the correct option.
 */
export function generateMistakeClue(
  question: AdaptiveQuestion,
  selectedOptionIndex: number
): string {
  const selectedText = question.options ? question.options[selectedOptionIndex] : 'Your selected option';
  const explanation = question.explanation || '';

  // Non-spoiler regex scrub to remove direct answers like "Option B is correct" or "The correct answer is ..."
  const cleanedExplanation = explanation
    .replace(/(?:The\s+correct\s+answer\s+is\s+.*?\.|Option\s+[A-D]\s+is\s+correct\b[\.\:\,]?)/gi, '')
    .trim();

  // Curated domain conceptual clues based on question keywords
  const qText = (question.question + ' ' + (question.codeContext || '')).toLowerCase();

  let conceptClue = '';

  if (qText.includes('loop') || qText.includes('while') || qText.includes('for')) {
    conceptClue = 'Review the loop termination condition and how the index variable increments on each iteration.';
  } else if (qText.includes('pointer') || qText.includes('null') || qText.includes('reference')) {
    conceptClue = 'Check what object or node pointer is referencing before accessing its properties to avoid null access.';
  } else if (qText.includes('select') || qText.includes('group by') || qText.includes('where') || qText.includes('having')) {
    conceptClue = 'Remember SQL execution order: WHERE filters individual rows before GROUP BY aggregates them.';
  } else if (qText.includes('stack') || qText.includes('queue') || qText.includes('fifo') || qText.includes('lifo')) {
    conceptClue = 'Consider the operational order: Stacks operate on LIFO (Last In First Out), while Queues use FIFO.';
  } else if (qText.includes('array') || qText.includes('index') || qText.includes('length')) {
    conceptClue = 'Be mindful of 0-based indexing and the valid bounds between 0 and length - 1.';
  } else if (qText.includes('recursion') || qText.includes('base case')) {
    conceptClue = 'Identify the base case that stops recursion from continuing indefinitely.';
  } else if (qText.includes('time complexity') || qText.includes('o(') || qText.includes('big-o')) {
    conceptClue = 'Count how many times the innermost operation runs relative to the input size N.';
  } else {
    conceptClue = 'Re-read the problem premises carefully. Compare the specific behavior of your chosen option with the expected requirement.';
  }

  return `⚠️ Incorrect Choice. Clue for Re-quiz: "${selectedText}" does not meet the requirements. ${cleanedExplanation || conceptClue}`;
}
