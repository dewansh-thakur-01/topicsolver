export type SupportedLanguage = 'python' | 'java' | 'sql' | 'dsa' | 'unknown';
export type ErrorCategory = 
  | 'Syntax Error'
  | 'Compilation Error'
  | 'Runtime Error'
  | 'Logical Error'
  | 'SQL Query Error'
  | 'Wrong Output'
  | 'Data Structure Implementation Error'
  | 'No Error Detected';

export interface MentorAnalysis {
  language: string;
  detectedLanguageId: SupportedLanguage;
  dsaSpecificLanguage?: string;
  errorType: ErrorCategory;
  topic: string;
  problem: string;
  hint1: string;
  hint2: string;
  hint3: string;
  nextStep: string;
  encouragement: string;
  isCorrect: boolean;
  codeSnippetSummary?: string;
}

/**
 * Heuristic & Token-based Language Detector
 */
export function detectLanguage(code: string): { language: string; id: SupportedLanguage; dsaLang?: string } {
  const trimmed = code.trim();
  const lower = trimmed.toLowerCase();

  // Check SQL first (Keywords at start or heavy SQL syntax)
  if (
    /^\s*(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE|WITH\s+[a-zA-Z0-9_]+\s+AS)\b/i.test(trimmed) ||
    (lower.includes('select ') && lower.includes(' from ')) ||
    (lower.includes('inner join ') || lower.includes('left join ') || lower.includes('group by '))
  ) {
    return { language: 'SQL', id: 'sql' };
  }

  // Check Data Structures (ListNode, TreeNode, Stack, Queue, BinarySearch, Graph)
  const isDSA = 
    /ListNode|TreeNode|class Node|struct Node|Stack<|Queue<|root\.left|root\.right|head\.next|curr\.next|prev\.next|push\(|pop\(|enqueue|dequeue/i.test(code) ||
    (lower.includes('reverse') && lower.includes('list')) ||
    (lower.includes('binary_search') || lower.includes('two_sum') || lower.includes('tree') || lower.includes('graph'));

  // Detect underlying language for DSA or general code
  const isJava = 
    /\b(public\s+class|public\s+static\s+void|System\.out\.println|int\[\]|String\[\]|HashMap<|ArrayList<|boolean|void\s+[a-zA-Z0-9_]+\s*\()\b/.test(code) ||
    (code.includes(';') && (code.includes('public') || code.includes('class Solution') || code.includes('int ')));

  const isPython = 
    /\b(def\s+[a-zA-Z0-9_]+\s*\(|print\(|elif\b|import\s+sys|self\.|__init__|in\s+range\(|list\[int\])\b/.test(code) ||
    (/^\s*def\s+/m.test(code) || /^\s*class\s+[A-Za-z0-9_]+:/.test(code) || (code.includes(':') && !code.includes(';') && !code.includes('{')));

  const isC = 
    /\b(#include\s*<stdio\.h>|int\s+main\s*\(|printf\(|scanf\(|int\s*\*[a-zA-Z0-9_]+|malloc\(|sizeof\()\b/.test(code);

  if (isDSA) {
    const subLang = isPython ? 'Python' : isC ? 'C' : 'Java';
    return { language: `Data Structures (${subLang})`, id: 'dsa', dsaLang: subLang };
  }

  if (isJava) return { language: 'Java', id: 'java' };
  if (isPython) return { language: 'Python', id: 'python' };
  if (isC) return { language: 'C / Systems', id: 'java' }; // Map C under Java/Systems tracks

  // Fallback check
  if (lower.includes('def ') || lower.includes('print(') || lower.includes('import ')) {
    return { language: 'Python', id: 'python' };
  }

  return { language: 'Unknown / Ambiguous', id: 'unknown' };
}

/**
 * Deep Static Error Analysis Engine for CodeMentor
 */
export function analyzeStudentCode(code: string, userSpecifiedLanguage?: string): MentorAnalysis {
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      language: 'Unknown',
      detectedLanguageId: 'unknown',
      errorType: 'Syntax Error',
      topic: 'Empty Submission',
      problem: 'Your code input box is currently empty.',
      hint1: 'Paste or type your code in the editor above.',
      hint2: 'You can write Python, Java, SQL, or Data Structures code.',
      hint3: 'Click "Analyze Code" once you have written your solution attempt.',
      nextStep: 'Type your code in the box above.',
      encouragement: "I'm ready whenever you are! Paste your code to get started.",
      isCorrect: false
    };
  }

  // Detect Language
  const detection = detectLanguage(code);
  let effectiveId: SupportedLanguage = detection.id;
  let effectiveLanguage = detection.language;

  if (userSpecifiedLanguage && userSpecifiedLanguage !== 'auto' && userSpecifiedLanguage !== 'unknown') {
    effectiveId = userSpecifiedLanguage.toLowerCase() as SupportedLanguage;
    effectiveLanguage = userSpecifiedLanguage.toUpperCase();
    if (userSpecifiedLanguage === 'dsa') effectiveLanguage = detection.dsaLang ? `Data Structures (${detection.dsaLang})` : 'Data Structures';
  }

  // If language cannot be detected
  if (effectiveId === 'unknown') {
    return {
      language: 'Unknown',
      detectedLanguageId: 'unknown',
      errorType: 'Syntax Error',
      topic: 'Language Identification',
      problem: "I'm not completely sure what language this code belongs to.",
      hint1: 'Please select Python, Java, SQL, or Data Structures from the dropdown above.',
      hint2: 'Make sure your code contains standard keywords (like def in Python, class/main in Java, or SELECT in SQL).',
      hint3: 'Select the explicit language so I can guide you with exact compiler and syntax rules.',
      nextStep: 'Select your language from the selector dropdown and click Analyze.',
      encouragement: "No worries! Just pick your language from the selector so I can give you the best guidance.",
      isCorrect: false
    };
  }

  // Check 1: Bracket & Parenthesis Balance
  const bracketResult = checkBracketBalance(trimmed);
  if (!bracketResult.balanced) {
    return {
      language: effectiveLanguage,
      detectedLanguageId: effectiveId,
      errorType: 'Syntax Error',
      topic: 'Brackets & Punctuation',
      problem: bracketResult.problem || 'Bracket mismatch or unclosed bracket found in your statement.',
      hint1: 'Check whether every opening bracket has a corresponding closing bracket.',
      hint2: `Look closely around line ${bracketResult.line || 1}. Find the bracket '${bracketResult.unmatchedChar || '()'}' that was opened without being closed.`,
      hint3: `Count each '${bracketResult.unmatchedChar || '{'}' and ensure you have closed it at the proper block boundary.`,
      nextStep: 'Check the opening and closing brackets on and around the highlighted line.',
      encouragement: "You're close! A missing bracket is one of the most common syntax errors in programming.",
      isCorrect: false
    };
  }

  // Check 2: Unclosed String Quotes
  const quoteResult = checkUnclosedQuotes(trimmed);
  if (quoteResult.hasUnclosed) {
    return {
      language: effectiveLanguage,
      detectedLanguageId: effectiveId,
      errorType: 'Syntax Error',
      topic: 'String Literals & Quotes',
      problem: 'There is an unclosed quotation mark in your code.',
      hint1: 'Check that every text string opened with a quote is properly closed with the same quote type.',
      hint2: `Look at line ${quoteResult.line}: verify whether you opened a string with ${quoteResult.quoteType} and forgot to close it.`,
      hint3: `Ensure every ${quoteResult.quoteType}...${quoteResult.quoteType} string has matching start and end quotes on that line.`,
      nextStep: 'Review all string literals and close any unfinished text.',
      encouragement: 'Great effort! Fixing the unclosed quote will resolve this syntax error quickly.',
      isCorrect: false
    };
  }

  // ================= Python Specific Error Analysis =================
  if (effectiveId === 'python' || (effectiveId === 'dsa' && detection.dsaLang === 'Python')) {
    const pyAnalysis = analyzePythonErrors(trimmed);
    if (pyAnalysis) return pyAnalysis;
  }

  // ================= Java Specific Error Analysis =================
  if (effectiveId === 'java' || (effectiveId === 'dsa' && detection.dsaLang === 'Java')) {
    const javaAnalysis = analyzeJavaErrors(trimmed);
    if (javaAnalysis) return javaAnalysis;
  }

  // ================= SQL Specific Error Analysis =================
  if (effectiveId === 'sql') {
    const sqlAnalysis = analyzeSqlErrors(trimmed);
    if (sqlAnalysis) return sqlAnalysis;
  }

  // ================= Data Structures Specific Error Analysis =================
  if (effectiveId === 'dsa') {
    const dsaAnalysis = analyzeDsaErrors(trimmed, detection.dsaLang || 'Java');
    if (dsaAnalysis) return dsaAnalysis;
  }

  // General Logical / Boundary Check (Check if placeholder comment only or incomplete)
  const strippedOfComments = trimmed
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/#.*/g, '')
    .replace(/--.*/g, '')
    .replace(/\s+/g, '');

  if (strippedOfComments.length < 15) {
    return {
      language: effectiveLanguage,
      detectedLanguageId: effectiveId,
      errorType: 'Logical Error',
      topic: 'Incomplete Implementation',
      problem: 'The code structure appears incomplete or only contains comments.',
      hint1: 'Write your algorithmic logic inside the function or block.',
      hint2: 'Think about what input variables are given and what the expected result should be.',
      hint3: 'Begin by defining your variables and writing the main loop or conditional statement.',
      nextStep: 'Implement your core problem-solving steps in the function body.',
      encouragement: "You've set up the basic template! Now let's implement the problem-solving steps.",
      isCorrect: false
    };
  }

  // Code Appears Correct!
  return {
    language: effectiveLanguage,
    detectedLanguageId: effectiveId,
    errorType: 'No Error Detected',
    topic: 'Algorithm Verification & Edge Cases',
    problem: 'Your code appears syntactically correct and structurally sound!',
    hint1: 'Think about boundary conditions: what happens with empty inputs, 0, or negative numbers?',
    hint2: 'Consider time and space complexity: can you optimize the solution to run in fewer operations?',
    hint3: 'Try testing with edge-case test values such as maximum integer limits, duplicate elements, or single-node structures.',
    nextStep: 'Run your solution against edge cases and stress-test your logic with different input sizes.',
    encouragement: '🌟 Outstanding work! Your code looks clean and well-structured. Keep practicing edge-case verification!',
    isCorrect: true
  };
}

// -------------------------------------------------------------
// Helper Analysis Routines
// -------------------------------------------------------------

function checkBracketBalance(code: string): { balanced: boolean; problem?: string; line?: number; unmatchedChar?: string } {
  const stack: { char: string; line: number }[] = [];
  const lines = code.split('\n');

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '(' || ch === '{' || ch === '[') {
        stack.push({ char: ch, line: l + 1 });
      } else if (ch === ')' || ch === '}' || ch === ']') {
        if (stack.length === 0) {
          return {
            balanced: false,
            problem: `There is an unexpected closing bracket '${ch}' with no matching opening bracket.`,
            line: l + 1,
            unmatchedChar: ch
          };
        }
        const top = stack.pop()!;
        const map: Record<string, string> = { '(': ')', '{': '}', '[': ']' };
        if (map[top.char] !== ch) {
          return {
            balanced: false,
            problem: `Mismatched brackets: Opened '${top.char}' on line ${top.line}, but closed with '${ch}' on line ${l + 1}.`,
            line: l + 1,
            unmatchedChar: top.char
          };
        }
      }
    }
  }

  if (stack.length > 0) {
    const last = stack[stack.length - 1];
    return {
      balanced: false,
      problem: `There is an unclosed opening bracket '${last.char}' that was opened on line ${last.line}.`,
      line: last.line,
      unmatchedChar: last.char
    };
  }

  return { balanced: true };
}

function checkUnclosedQuotes(code: string): { hasUnclosed: boolean; line?: number; quoteType?: string } {
  const lines = code.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    let inSingle = false;
    let inDouble = false;

    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      const prev = line[c - 1] || '';

      if (ch === '"' && prev !== '\\') {
        if (!inSingle) inDouble = !inDouble;
      } else if (ch === "'" && prev !== '\\') {
        if (!inDouble) inSingle = !inSingle;
      }
    }

    if (inSingle) return { hasUnclosed: true, line: l + 1, quoteType: "'" };
    if (inDouble) return { hasUnclosed: true, line: l + 1, quoteType: '"' };
  }
  return { hasUnclosed: false };
}

function analyzePythonErrors(code: string): MentorAnalysis | null {
  const lines = code.split('\n');

  // Missing Colon check
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      (line.startsWith('def ') || line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('else') || line.startsWith('for ') || line.startsWith('while ') || line.startsWith('class ') || line.startsWith('try') || line.startsWith('except')) &&
      !line.endsWith(':') && !line.includes('#')
    ) {
      return {
        language: 'Python',
        detectedLanguageId: 'python',
        errorType: 'Syntax Error',
        topic: 'Compound Statements & Colons',
        problem: `A compound statement on line ${i + 1} is missing a terminating colon (:) character.`,
        hint1: 'In Python, header statements (like def, if, for, while, else) must end with a specific punctuation mark.',
        hint2: `Inspect line ${i + 1}: "${line}". What character must appear at the end of the line before entering the indented block?`,
        hint3: `Add a colon (:) at the end of "${line}".`,
        nextStep: `Place a ':' at the end of line ${i + 1}.`,
        encouragement: "You're doing great! In Python, colons tell the interpreter that an indented block is starting.",
        isCorrect: false
      };
    }
  }

  // Single = assignment in conditional check (e.g. if x = 5:)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if ((line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('while ')) && /[^!=<>]=[^=]/.test(line)) {
      return {
        language: 'Python',
        detectedLanguageId: 'python',
        errorType: 'Syntax Error',
        topic: 'Comparison vs Assignment Operator',
        problem: `You may be using an assignment operator (=) instead of a comparison operator (==) in a condition on line ${i + 1}.`,
        hint1: 'In programming, a single equals sign (=) assigns a value, while double equals (==) tests for equality.',
        hint2: `Check the condition on line ${i + 1}. Are you comparing two values or assigning a variable?`,
        hint3: 'Replace the single = with == to check if the two expressions are equal.',
        nextStep: `Change '=' to '==' inside your condition on line ${i + 1}.`,
        encouragement: 'Spotting the difference between = and == is a key milestone for every programmer!',
        isCorrect: false
      };
    }
  }

  // Common off-by-one or range indexing error
  if (code.includes('range(len(') && code.includes('nums[i + 1]') && !code.includes('len(nums) - 1') && !code.includes('len(nums)-1')) {
    return {
      language: 'Python',
      detectedLanguageId: 'python',
      errorType: 'Runtime Error',
      topic: 'IndexError: List Index Out of Range',
      problem: 'Accessing `nums[i + 1]` in a loop running up to `len(nums)` will cause an IndexError on the final iteration.',
      hint1: 'Think about what index is accessed when the loop reaches its last iteration.',
      hint2: 'If the list has 5 elements (indices 0 to 4), what happens when i = 4 and you evaluate i + 1?',
      hint3: 'Adjust the loop upper bound to range(len(nums) - 1) so i + 1 never exceeds the last valid index.',
      nextStep: 'Ensure your loop bounds stop one element early when looking ahead with i + 1.',
      encouragement: "Index errors happen to everyone! Thinking through the last iteration will help you catch it.",
      isCorrect: false
    };
  }

  // Indentation check
  let hasIndentedBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (lines[i - 1]?.trim().endsWith(':') && line.trim().length > 0 && !line.startsWith(' ') && !line.startsWith('\t')) {
      return {
        language: 'Python',
        detectedLanguageId: 'python',
        errorType: 'Syntax Error',
        topic: 'IndentationError',
        problem: `Expected an indented block after the colon on line ${i}.`,
        hint1: 'In Python, code blocks under def, if, for, and while must be indented.',
        hint2: `Line ${i + 1} is at the same indentation level as the header above it. Add 4 spaces of indentation.`,
        hint3: `Indent the statement on line ${i + 1} so Python knows it belongs inside the block.`,
        nextStep: `Add 4 spaces at the beginning of line ${i + 1}.`,
        encouragement: "Python relies on indentation instead of braces. Indenting this line will fix the error!",
        isCorrect: false
      };
    }
  }

  return null;
}

function analyzeJavaErrors(code: string): MentorAnalysis | null {
  const lines = code.split('\n');

  // Missing semicolon check (Java requires ; on expression statements)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      line.length > 0 &&
      !line.endsWith(';') &&
      !line.endsWith('{') &&
      !line.endsWith('}') &&
      !line.startsWith('//') &&
      !line.startsWith('/*') &&
      !line.startsWith('*') &&
      !line.startsWith('import ') &&
      !line.startsWith('public class') &&
      !line.startsWith('class ') &&
      !line.startsWith('if ') &&
      !line.startsWith('for ') &&
      !line.startsWith('while ') &&
      !line.startsWith('else') &&
      !line.startsWith('@') &&
      !line.endsWith(':')
    ) {
      return {
        language: 'Java',
        detectedLanguageId: 'java',
        errorType: 'Compilation Error',
        topic: 'Syntax & Statement Terminators',
        problem: `A statement on line ${i + 1} is missing a terminating semicolon (;).`,
        hint1: 'In Java, every standard statement, variable declaration, and method call must end with a semicolon.',
        hint2: `Look at line ${i + 1}: "${line}". Does it end with the required semicolon terminator?`,
        hint3: `Add a semicolon (;) to the end of line ${i + 1}.`,
        nextStep: `Place a ';' at the end of "${line}".`,
        encouragement: "Missing semicolons are classic Java compilation errors. You'll spot them instantly with practice!",
        isCorrect: false
      };
    }
  }

  // Type Mismatch / Assignment check (e.g. int x = "hello" or String s = 123)
  if (/\bint\s+[a-zA-Z0-9_]+\s*=\s*"[^"]*"/.test(code)) {
    return {
      language: 'Java',
      detectedLanguageId: 'java',
      errorType: 'Compilation Error',
      topic: 'Data Types & Type Compatibility',
      problem: 'Type mismatch: Attempting to assign a String value inside double quotes to a variable declared as int.',
      hint1: 'Compare the declared data type of the variable with the literal value you are assigning.',
      hint2: 'The int type only holds whole numbers (like 42), while text inside quotes is of type String.',
      hint3: 'Either change the variable type to String or change the assigned value to an integer without quotes.',
      nextStep: 'Ensure the variable declaration type matches the value being assigned.',
      encouragement: "Java is statically typed, which helps catch data type mistakes before running. You've got this!",
      isCorrect: false
    };
  }

  // Array bounds off-by-one in loop (e.g. for (int i = 0; i <= arr.length; i++))
  if (/for\s*\(\s*int\s+[a-zA-Z0-9_]+\s*=\s*0\s*;\s*[a-zA-Z0-9_]+\s*<=\s*[a-zA-Z0-9_]+\.length\s*;/.test(code)) {
    return {
      language: 'Java',
      detectedLanguageId: 'java',
      errorType: 'Runtime Error',
      topic: 'ArrayIndexOutOfBoundsException',
      problem: 'Your loop condition uses `<= arr.length`, which will attempt to access an index beyond the end of the array.',
      hint1: 'Remember that Java arrays are 0-indexed. If an array has length 5, what is the highest valid index?',
      hint2: 'An array of size N has indices from 0 to N - 1. Accessing index N will throw an ArrayIndexOutOfBoundsException.',
      hint3: 'Change the loop condition from `<= arr.length` to `< arr.length`.',
      nextStep: 'Use the `<` strictly less than operator when looping over array lengths.',
      encouragement: "Off-by-one loop conditions are very common. Changing to `< arr.length` will protect your bounds!",
      isCorrect: false
    };
  }

  // String equality using == instead of .equals()
  if (/\b[a-zA-Z0-9_]+\s*==\s*"[^"]*"/.test(code) || /"[^"]*"\s*==\s*[a-zA-Z0-9_]+/.test(code)) {
    return {
      language: 'Java',
      detectedLanguageId: 'java',
      errorType: 'Logical Error',
      topic: 'String Comparison (.equals() vs ==)',
      problem: 'Comparing Strings using the `==` operator checks for object memory reference equality rather than content equality.',
      hint1: 'In Java, `==` compares whether two objects point to the exact same memory address.',
      hint2: 'To compare the actual text characters inside two String objects, Java provides a dedicated method.',
      hint3: 'Use the `.equals()` method (e.g. str.equals("value")) instead of `==`.',
      nextStep: 'Replace `==` with `.equals(...)` for String comparisons.',
      encouragement: "This is one of the most famous Java interview questions! Using `.equals()` is the correct approach.",
      isCorrect: false
    };
  }

  return null;
}

function analyzeSqlErrors(code: string): MentorAnalysis | null {
  const upper = code.toUpperCase();

  // Missing FROM clause in SELECT
  if (upper.includes('SELECT') && !upper.includes('FROM') && !upper.includes('SELECT 1') && !upper.includes('SELECT NOW()')) {
    return {
      language: 'SQL',
      detectedLanguageId: 'sql',
      errorType: 'SQL Query Error',
      topic: 'Query Structure & Clauses',
      problem: 'Your SELECT query specifies columns to retrieve but is missing a FROM clause.',
      hint1: 'A SELECT query needs to know which database table to query records from.',
      hint2: 'Check the syntax order: SELECT <columns> FROM <table_name>.',
      hint3: 'Add a `FROM table_name` clause specifying the source table for your selected columns.',
      nextStep: 'Specify the table name using the FROM clause.',
      encouragement: "SQL queries follow a structured clause order. Adding FROM tells the database where to find the data!",
      isCorrect: false
    };
  }

  // Aggregate function with non-aggregated column without GROUP BY
  if (
    (upper.includes('COUNT(') || upper.includes('SUM(') || upper.includes('AVG(') || upper.includes('MAX(') || upper.includes('MIN(')) &&
    upper.includes('SELECT') &&
    !upper.includes('GROUP BY') &&
    /,/.test(code) &&
    !upper.includes('OVER(')
  ) {
    return {
      language: 'SQL',
      detectedLanguageId: 'sql',
      errorType: 'SQL Query Error',
      topic: 'Aggregation & GROUP BY Clause',
      problem: 'You are selecting both individual columns and aggregate functions (like COUNT/SUM) without a GROUP BY clause.',
      hint1: 'When combining normal columns with aggregate functions, the database needs to know how to group the rows.',
      hint2: 'Any column in the SELECT list that is not wrapped in an aggregate function must be included in a GROUP BY clause.',
      hint3: 'Add a `GROUP BY column_name` clause at the end of your query for all unaggregated columns.',
      nextStep: 'Add a GROUP BY clause listing the non-aggregated columns.',
      encouragement: "Great job using aggregate functions! Adding GROUP BY will allow the database to group your rows properly.",
      isCorrect: false
    };
  }

  // JOIN missing ON condition
  if (
    (upper.includes('INNER JOIN') || upper.includes('LEFT JOIN') || upper.includes('RIGHT JOIN') || upper.includes('JOIN')) &&
    !upper.includes(' ON ') &&
    !upper.includes(' USING ') &&
    !upper.includes('NATURAL JOIN') &&
    !upper.includes('CROSS JOIN')
  ) {
    return {
      language: 'SQL',
      detectedLanguageId: 'sql',
      errorType: 'SQL Query Error',
      topic: 'JOIN Conditions & Foreign Keys',
      problem: 'Your JOIN clause is missing an ON condition specifying how the two tables relate.',
      hint1: 'A relational JOIN needs a connecting condition to match rows between tables.',
      hint2: 'Without an ON condition, the database cannot determine which foreign key matches the primary key.',
      hint3: 'Add `ON tableA.key = tableB.key` directly after your JOIN clause.',
      nextStep: 'Provide an ON predicate linking the related columns between both tables.',
      encouragement: "JOINs are the superpower of relational databases. An ON clause will connect your tables seamlessly!",
      isCorrect: false
    };
  }

  // WHERE placed after ORDER BY or GROUP BY
  if (upper.includes('WHERE') && (upper.indexOf('WHERE') > upper.indexOf('ORDER BY') || (upper.includes('GROUP BY') && upper.indexOf('WHERE') > upper.indexOf('GROUP BY')))) {
    return {
      language: 'SQL',
      detectedLanguageId: 'sql',
      errorType: 'SQL Query Error',
      topic: 'SQL Clause Execution Order',
      problem: 'The WHERE clause appears in the wrong sequence in your SQL statement.',
      hint1: 'SQL enforces a strict clause order: SELECT -> FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> ORDER BY.',
      hint2: 'The WHERE clause filters individual rows before any grouping or sorting occurs.',
      hint3: 'Move your WHERE clause before the GROUP BY and ORDER BY clauses.',
      nextStep: 'Place the WHERE clause immediately after the FROM / JOIN section.',
      encouragement: "Mastering SQL clause order makes complex queries feel easy. Move WHERE before GROUP BY/ORDER BY!",
      isCorrect: false
    };
  }

  return null;
}

function analyzeDsaErrors(code: string, subLang: string): MentorAnalysis | null {
  const lower = code.toLowerCase();

  // Linked List Reversal pointer loss (e.g. curr.next = prev before saving next)
  if (
    (code.includes('curr.next = prev') || code.includes('curr->next = prev') || code.includes('head.next = prev')) &&
    !/\b(nextTemp|next_node|next_temp|temp|nxt|nextNode)\s*=\s*(curr|head)(\.|->)next/i.test(code) &&
    !code.includes('nextTemp') && !code.includes('next_node')
  ) {
    return {
      language: `Data Structures (${subLang})`,
      detectedLanguageId: 'dsa',
      dsaSpecificLanguage: subLang,
      errorType: 'Data Structure Implementation Error',
      topic: 'Linked Lists & Pointer Overwriting',
      problem: 'Overwriting `curr.next = prev` before storing `curr.next` in a temporary pointer causes you to lose reference to the rest of the list.',
      hint1: 'Before you change where a pointer points, consider whether you still need access to what it was pointing to.',
      hint2: 'Once you execute `curr.next = prev`, the original reference to the remaining nodes is lost forever.',
      hint3: 'Create a temporary pointer (e.g. `nextTemp = curr.next`) before reassigning `curr.next`.',
      nextStep: 'Save `curr.next` in a temporary variable before mutating the link.',
      encouragement: "Pointer manipulation in Linked Lists is tricky! Preserving the next reference in a temp variable is the key.",
      isCorrect: false
    };
  }

  // Binary Search missing mid calculation or integer overflow (e.g. mid = (low + high) / 2 without handling large limits)
  if (lower.includes('binary') || (code.includes('low <= high') && code.includes('mid'))) {
    if (code.includes('low = mid') && !code.includes('low = mid + 1') && !code.includes('low = mid+1')) {
      return {
        language: `Data Structures (${subLang})`,
        detectedLanguageId: 'dsa',
        dsaSpecificLanguage: subLang,
        errorType: 'Logical Error',
        topic: 'Binary Search & Infinite Loops',
        problem: 'Setting `low = mid` without adding 1 can cause an infinite loop when `low` and `high` are adjacent.',
        hint1: 'Since `mid` was already checked and did not match the target, we can safely exclude it from the next search space.',
        hint2: 'If you do not advance past `mid`, the search space will never shrink, leading to a hang/timeout.',
        hint3: 'Update the pointer to `low = mid + 1` (or `high = mid - 1`) to guarantee the interval strictly shrinks.',
        nextStep: 'Advance the boundary past mid: use `low = mid + 1`.',
        encouragement: "Binary search boundary adjustments are subtle. Advancing past mid ensures your algorithm terminates!",
        isCorrect: false
      };
    }
  }

  // Tree recursion missing Base Case (e.g. recursive call without if root == null return)
  if (
    (code.includes('root.left') || code.includes('root->left') || code.includes('node.left')) &&
    !code.includes('== null') && !code.includes('== None') && !code.includes('== NULL') && !code.includes('not root') && !code.includes('!root')
  ) {
    return {
      language: `Data Structures (${subLang})`,
      detectedLanguageId: 'dsa',
      dsaSpecificLanguage: subLang,
      errorType: 'Runtime Error',
      topic: 'Binary Trees & Recursion Base Cases',
      problem: 'Your recursive tree traversal is missing a base case checking for null/empty nodes, causing a NullPointerException or infinite recursion.',
      hint1: 'Every recursive algorithm must have a stopping condition to handle leaf node children.',
      hint2: 'When you traverse down past a leaf node, root will be null/None.',
      hint3: 'Add a check at the top of your function: `if (root == null) return ...` before accessing `root.left` or `root.right`.',
      nextStep: 'Place a base case guard at the very start of your recursive function.',
      encouragement: "Recursion on trees becomes second nature once base cases are in place. Add the null check!",
      isCorrect: false
    };
  }

  return null;
}
