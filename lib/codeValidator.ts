export interface SyntaxValidationResult {
  isValid: boolean;
  error?: {
    title: string;
    message: string;
    line?: number;
    column?: number;
  };
}

/**
 * Validates bracket balance ({ }, ( ), [ ]) across all languages,
 * ignoring brackets inside string literals and comments.
 */
export function validateBrackets(code: string, language: string): SyntaxValidationResult {
  const stack: { char: string; line: number; col: number }[] = [];
  const lines = code.split('\n');

  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBlockComment = false;

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    let inLineComment = false;

    for (let col = 0; col < line.length; col++) {
      const char = line[col];
      const nextChar = line[col + 1] || '';

      // Handle comments
      if (!inSingleQuote && !inDoubleQuote) {
        // Line comments
        if (language === 'python' && char === '#') {
          break;
        }
        if (language === 'sql' && char === '-' && nextChar === '-') {
          break;
        }
        if ((language === 'java' || language === 'c' || language === 'javascript') && char === '/' && nextChar === '/') {
          break;
        }

        // Block comments
        if ((language === 'java' || language === 'c' || language === 'javascript' || language === 'sql') && char === '/' && nextChar === '*') {
          inBlockComment = true;
          col++;
          continue;
        }
        if (inBlockComment && char === '*' && nextChar === '/') {
          inBlockComment = false;
          col++;
          continue;
        }
      }

      if (inBlockComment) continue;

      // Handle string quotes
      if (char === '"' && (col === 0 || line[col - 1] !== '\\')) {
        if (!inSingleQuote) inDoubleQuote = !inDoubleQuote;
        continue;
      }
      if (char === "'" && (col === 0 || line[col - 1] !== '\\')) {
        if (!inDoubleQuote) inSingleQuote = !inSingleQuote;
        continue;
      }

      if (inSingleQuote || inDoubleQuote) continue;

      // Track Opening Brackets
      if (char === '{' || char === '(' || char === '[') {
        stack.push({ char, line: lineNum + 1, col: col + 1 });
      } 
      // Validate Closing Brackets
      else if (char === '}' || char === ')' || char === ']') {
        if (stack.length === 0) {
          return {
            isValid: false,
            error: {
              title: 'Compile Error: Unexpected Closing Bracket',
              message: `Unexpected closing bracket '${char}' at line ${lineNum + 1}, column ${col + 1}. No matching opening bracket found.`,
              line: lineNum + 1,
              column: col + 1
            }
          };
        }

        const top = stack.pop()!;
        const expectedMap: Record<string, string> = { '{': '}', '(': ')', '[': ']' };
        if (expectedMap[top.char] !== char) {
          return {
            isValid: false,
            error: {
              title: 'Compile Error: Mismatched Bracket',
              message: `Mismatched bracket: Opened '${top.char}' at line ${top.line}:${top.col}, but found '${char}' at line ${lineNum + 1}:${col + 1}. Expected '${expectedMap[top.char]}'.`,
              line: lineNum + 1,
              column: col + 1
            }
          };
        }
      }
    }
  }

  // Check unclosed brackets left on stack
  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    const expectedMap: Record<string, string> = { '{': '}', '(': ')', '[': ']' };
    return {
      isValid: false,
      error: {
        title: 'Compile Error: Unclosed Bracket',
        message: `Syntax error: Reached end of file while parsing. Missing closing bracket '${expectedMap[unclosed.char]}' for opening bracket '${unclosed.char}' at line ${unclosed.line}, column ${unclosed.col}.`,
        line: unclosed.line,
        column: unclosed.col
      }
    };
  }

  return { isValid: true };
}

/**
 * Checks for common language syntax requirements
 */
export function validateLanguageSyntax(code: string, language: string): SyntaxValidationResult {
  // First check bracket balance
  const bracketCheck = validateBrackets(code, language);
  if (!bracketCheck.isValid) return bracketCheck;

  const cleanCode = code.trim();
  if (!cleanCode) {
    return {
      isValid: false,
      error: {
        title: 'Error: Empty Code Submission',
        message: 'Your editor is empty. Please write your code solution before running test cases.'
      }
    };
  }

  // Check if code is just untouched starter template with comment only
  const strippedOfComments = cleanCode
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/#.*/g, '')
    .replace(/--.*/g, '')
    .replace(/\s+/g, '');

  if (
    strippedOfComments === 'publicclassSolution{publicstaticvoidmain(String[]args){}}' ||
    strippedOfComments === 'defmain():passif__name__=="__main__":main()' ||
    strippedOfComments === '#include<stdio.h>intmain(){return0;}' ||
    strippedOfComments === ''
  ) {
    return {
      isValid: false,
      error: {
        title: 'Code Incomplete',
        message: 'No solution logic written yet. Replace the comment "// write the code here" with your implementation.'
      }
    };
  }

  // Java-specific checks
  if (language === 'java') {
    if (!code.includes('class') || !code.includes('main') && !code.includes('public')) {
      return {
        isValid: false,
        error: {
          title: 'Java Syntax Error',
          message: 'Missing standard class or method declaration in Java file.'
        }
      };
    }
  }

  // Python-specific checks
  if (language === 'python') {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if ((trimmed.startsWith('def ') || trimmed.startsWith('if ') || trimmed.startsWith('for ') || trimmed.startsWith('while ') || trimmed.startsWith('class ') || trimmed.startsWith('elif ') || trimmed.startsWith('else')) && !trimmed.endsWith(':') && !trimmed.includes('#')) {
        return {
          isValid: false,
          error: {
            title: 'Python Syntax Error: Missing Colon',
            message: `SyntaxError: expected ':' at the end of statement at line ${i + 1}: "${trimmed}"`,
            line: i + 1
          }
        };
      }
    }
  }

  // C-specific checks
  if (language === 'c') {
    if (!code.includes('#include') && !code.includes('main') && !code.includes('void') && !code.includes('int')) {
      return {
        isValid: false,
        error: {
          title: 'C Syntax Error',
          message: 'Missing main entrypoint or function declaration in C code.'
        }
      };
    }
  }

  // SQL-specific checks
  if (language === 'sql') {
    const upper = code.toUpperCase();
    if (!upper.includes('SELECT') && !upper.includes('WITH') && !upper.includes('INSERT') && !upper.includes('UPDATE') && !upper.includes('CREATE')) {
      return {
        isValid: false,
        error: {
          title: 'SQL Syntax Error',
          message: 'Invalid SQL query statement. A valid SELECT query is required.'
        }
      };
    }
  }

  return { isValid: true };
}
