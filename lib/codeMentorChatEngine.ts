import { MentorAnalysis, analyzeStudentCode } from './codeMentorEngine';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  command?: string;
  quickActions?: string[];
}

export function generateChatResponse(
  userMessage: string,
  currentCode: string = '',
  currentLanguage: string = 'auto',
  problemContext?: { title: string; difficulty: string; subjectId: string; description: string }
): { reply: string; quickActions?: string[] } {
  const trimmed = userMessage.trim();
  const lower = trimmed.toLowerCase();

  // Handle Slash Commands
  if (lower.startsWith('/hint') || lower === 'hint' || lower.includes('give me a hint') || lower.includes('need a hint')) {
    if (problemContext) {
      return {
        reply: '💡 **Hint for ' + problemContext.title + '**:\n\n1. **Core Concept**: Think about the data structure that gives you O(1) or optimal lookups.\n2. **Strategy**: Trace your inputs step-by-step. What happens with edge cases like empty inputs or single-element bounds?\n3. **Pro-tip**: Avoid brute-force nested loops if you can store visited elements in a set or hash table!',
        quickActions: ['/explain', '/debug', '/complexity']
      };
    }
    return {
      reply: '💡 **General Strategy Clue**:\n\n• Check if your loop boundaries include or exclude the final index.\n• For strings/arrays, verify two-pointer technique or frequency maps.\n• For recursion, ensure your base case returns before the recursive call!',
      quickActions: ['/explain', '/debug', '/complexity']
    };
  }

  if (lower.startsWith('/explain') || lower === 'explain' || lower.includes('explain this') || lower.includes('how does it work')) {
    const topic = problemContext?.title || 'this algorithm';
    return {
      reply: '📘 **Concept Breakdown: ' + topic + '**\n\n• **Goal**: Solve the problem within optimal time and memory constraints.\n• **Analogy**: Imagine checking each element like indexing items in a lookup table. Instead of searching the whole array repeatedly, we record visited elements so each check takes O(1) constant time!\n• **Pattern**: Look for problem invariants (e.g. sorted order implies binary search or two pointers; paired brackets imply a Stack).',
      quickActions: ['/hint', '/test', '/complexity']
    };
  }

  if (lower.startsWith('/debug') || lower === 'debug' || lower.includes('debug my code') || lower.includes('why is my code wrong') || lower.includes('fix my error')) {
    if (!currentCode.trim()) {
      return {
        reply: '🔍 **Code Debugger**: Your code editor is currently empty! Paste or write your solution in the editor, and I will analyze your syntax and logic line-by-line.',
        quickActions: ['/hint', '/explain']
      };
    }
    
    const analysis = analyzeStudentCode(currentCode, currentLanguage);
    if (!analysis.isCorrect) {
      return {
        reply: '🚨 **Debug Diagnosis (' + analysis.errorType + ')**:\n\n**Issue**: ' + analysis.problem + '\n\n💡 **Suggested Fix**: ' + analysis.hint1 + '\n\n👉 **Next Step**: ' + analysis.nextStep,
        quickActions: ['/hint', '/test', '/explain']
      };
    }

    return {
      reply: '✅ **Syntax & Structure Check**: No obvious compiler syntax errors found in your current snippet! If test cases are still failing, verify your mathematical logic or boundary checks on edge inputs.',
      quickActions: ['/test', '/complexity', '/hint']
    };
  }

  if (lower.startsWith('/complexity') || lower === 'complexity' || lower.includes('time complexity') || lower.includes('space complexity')) {
    return {
      reply: '⏱️ **Complexity Analysis Guide**:\n\n• **Time Complexity**: Optimal solution is typically O(N) for single linear scans or O(N log N) if sorting is required.\n• **Space Complexity**: In-place algorithms achieve O(1) auxiliary space. Hash map solutions use O(N) extra space for faster lookups.\n• **Golden Rule**: Trade space for time when you need sub-quadratic performance!',
      quickActions: ['/hint', '/explain', '/debug']
    };
  }

  if (lower.startsWith('/test') || lower === 'test' || lower.includes('dry run') || lower.includes('walk through test')) {
    return {
      reply: '🧪 **Test Case Walkthrough**:\n\n1. **Standard Input**: Test with normal inputs to verify expected path.\n2. **Edge Cases**: Always test boundary extremes:\n   - Empty inputs [] or ""\n   - Single element arrays [1]\n   - Duplicate values [3, 3]\n   - Negative numbers [-5, -1]\n\nTry running your code with these test cases in the practice runner!',
      quickActions: ['/debug', '/hint', '/cheer']
    };
  }

  if (lower.startsWith('/cheer') || lower === 'cheer' || lower.includes('motivate') || lower.includes('stuck')) {
    const cheers = [
      "🚀 You're doing great! Every syntax error is just one step closer to mastery. Keep pushing!",
      "🔥 Debugging is 90% of real software engineering. Take a breath and trace it step-by-step!",
      "⭐ Great engineers aren't the ones who never make mistakes; they're the ones who learn from every bug. You've got this!",
      "🧠 Every tricky problem sharpens your algorithmic intuition. Let's solve this together!"
    ];
    return {
      reply: cheers[Math.floor(Math.random() * cheers.length)],
      quickActions: ['/hint', '/explain', '/debug']
    };
  }

  // Conversational response logic
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return {
      reply: '👋 Hello! I am **CodeMentor**, your AI Coding & Algorithm Assistant on TOPIC SOLVER.\n\nYou can chat with me, ask questions about your code, or use quick commands like:\n• `/hint` - Get a progressive clue\n• `/explain` - Learn the concept\n• `/debug` - Analyze your code for errors\n• `/complexity` - Check Time & Space complexity\n\nHow can I help you today?',
      quickActions: ['/hint', '/explain', '/debug', '/test']
    };
  }

  if (lower.includes('recursion') || lower.includes('recursive')) {
    return {
      reply: '🔄 **Recursion Made Simple**:\n\nRecursion has two essential parts:\n1. **Base Case**: The condition where the function stops calling itself (e.g. if (n <= 1) return 1;). Without this, you get a Stack Overflow!\n2. **Recursive Step**: The function calling itself with a smaller subproblem (e.g. return n * factorial(n - 1);).\n\nWould you like an example in Java, Python, or C?',
      quickActions: ['/explain', '/hint', '/debug']
    };
  }

  if (lower.includes('pointer') || lower.includes('pointers') || lower.includes('malloc') || lower.includes('memory')) {
    return {
      reply: '⚡ **Pointers & Memory Essentials**:\n\n• A **pointer** stores the memory address of another variable (e.g. int* ptr = &x;).\n• **Dereferencing** (*ptr) accesses or modifies the value at that memory address.\n• **Dynamic Memory**: Always pair every malloc() or calloc() with a corresponding free(ptr); to prevent memory leaks!',
      quickActions: ['/hint', '/debug', '/explain']
    };
  }

  if (lower.includes('sql') || lower.includes('join') || lower.includes('group by')) {
    return {
      reply: '🗄️ **SQL Query Essentials**:\n\n• **INNER JOIN**: Returns only matching rows from both tables.\n• **LEFT JOIN**: Returns all rows from the left table, with NULL for non-matching right table rows.\n• **GROUP BY & HAVING**: Use WHERE before grouping, and HAVING to filter aggregate conditions like HAVING COUNT(*) > 1.',
      quickActions: ['/hint', '/explain', '/debug']
    };
  }

  // Fallback intelligent coding assistant response
  return {
    reply: '🤖 I am here to help with your coding journey! Here is what I can do:\n\n• **Debug your solution**: Type `/debug` to scan your current editor code.\n• **Give non-spoiler hints**: Type `/hint` for a progressive clue.\n• **Explain concepts**: Type `/explain` to understand the algorithm.\n• **Ask any question**: Feel free to ask about syntax, time complexity, or data structures!',
    quickActions: ['/hint', '/explain', '/debug', '/complexity']
  };
}