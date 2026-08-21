import { DifficultyLevel } from './adaptiveEngine';

export type QuestionType = 
  | 'MULTIPLE_CHOICE'
  | 'OUTPUT_PREDICTION'
  | 'DEBUGGING'
  | 'FILL_IN_BLANK'
  | 'CODE_ORDERING';

export interface AdaptiveQuestion {
  id: string;
  topicId: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  question: string;
  codeContext?: string;
  options?: string[]; // for MCQ and Output Prediction
  correctOptionIndex?: number;
  correctAnswerText?: string; // for Fill in the Blank / Output
  codeLinesToOrder?: string[]; // for Code Ordering
  correctOrderIndices?: number[]; // for Code Ordering
  buggyCodeSnippet?: string; // for Debugging
  bugExplanation?: string;
  explanation: string; // Tailored explanation referencing the concept and mistake
}

export interface TopicLesson {
  id: string;
  subjectId: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  moduleId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  order: number;
  content: {
    summary: string;
    conceptExplanation: string;
    codeSnippet: string;
    expectedOutput: string;
    keyTakeaways: string[];
    youtubeVideoId?: string;
    youtubeUrl?: string;
    youtubeDuration?: string;
  };
  adaptiveQuestions: AdaptiveQuestion[];
}

export interface CourseModule {
  id: string;
  subjectId: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  title: string;
  description: string;
  order: number;
  topics: TopicLesson[];
}

export interface SubjectCourse {
  id: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  bgGlow: string;
  totalTopics: number;
  modules: CourseModule[];
}

export interface HiddenTestCase {
  id: string;
  name: string;
  type: 'spacing_size' | 'variable_naming' | 'edge_boundary' | 'structure';
  description: string;
  hint: string;
}

export interface PracticeProblem {
  id: string;
  subjectId: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  topicId: string;
  topicName: string;
  title: string;
  difficulty: DifficultyLevel;
  acceptancePercentage: number;
  estimatedTime: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  hints: string[];
  starterCode: Record<string, string>; // lang -> code
  testCases: {
    id?: string;
    input: string;
    expectedOutput: string;
    explanation?: string;
    isHidden?: boolean;
  }[];
  hiddenCases?: HiddenTestCase[];
  solutionCode: Record<string, string>;
}

export interface DiagnosticAssessmentQuestion {
  id: string;
  subjectId: 'java' | 'python' | 'sql' | 'dsa' | 'c';
  topicId: string;
  topicName: string;
  difficulty: DifficultyLevel;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  conceptTested: string;
  explanation: string;
}

export const SUBJECT_COURSES: Record<'java' | 'python' | 'sql' | 'dsa' | 'c', SubjectCourse> = {
  java: {
    id: 'java',
    title: 'Java Mastery Series',
    tagline: '54 Structured Step-by-Step Lessons & Error Makes Clever Video Tutorials',
    description: 'Master Java from basic setup and control flow to OOP, Exception Handling, File I/O, and Multithreading. Features official Error Makes Clever video tutorials.',
    iconName: 'Coffee',
    color: '#F89820',
    bgGlow: 'from-amber-500/20 to-orange-600/10',
    totalTopics: 54,
    modules: [
      {
        id: 'java-m1',
        subjectId: 'java',
        title: 'Module 1: Introduction, Setup & Basics (Topics 01–07)',
        description: 'Java introduction, JDK installation, JVM execution, variables, user input, and coding challenge 1.',
        order: 1,
        topics: [
          {
            id: 'java-01-intro',
            subjectId: 'java',
            moduleId: 'java-m1',
            title: '01. Introduction to Java',
            description: 'Overview of Java, platform independence (WORA), bytecode, and the Java ecosystem.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: [],
            order: 1,
            content: {
              summary: 'Java is a robust, class-based, object-oriented programming language designed for high portability.',
              conceptExplanation: 'Java source code (.java) is compiled by javac into platform-neutral Bytecode (.class), which is executed by the Java Virtual Machine (JVM). This allows Java to achieve "Write Once, Run Anywhere" (WORA).',
              codeSnippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Welcome to Java Programming with Topic Solver!");\n    }\n}`,
              expectedOutput: 'Welcome to Java Programming with Topic Solver!',
              keyTakeaways: [
                'Java code compiles to bytecode, not native machine code directly',
                'JVM enables cross-platform execution on Windows, macOS, and Linux',
                'main() method is the standard entry point of every standalone Java application'
              ],
              youtubeVideoId: 'IT2durkDCXM',
              youtubeUrl: 'https://www.youtube.com/watch?v=IT2durkDCXM',
              youtubeDuration: '12:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-01-1',
                topicId: 'java-01-intro',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What allows Java to achieve "Write Once, Run Anywhere" (WORA)?',
                options: ['Direct machine code compilation', 'Java Bytecode executed by the JVM', 'Browser JavaScript engines', 'C++ compilers'],
                correctOptionIndex: 1,
                explanation: 'Java source files compile into platform-independent Bytecode (.class) that can run on any system with a JVM installed.'
              }
            ]
          },
          {
            id: 'java-02-setup',
            subjectId: 'java',
            moduleId: 'java-m1',
            title: '02. Setting Up Java Environment',
            description: 'Install JDK, configure JAVA_HOME environment variables, and verify with java --version.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-01-intro'],
            order: 2,
            content: {
              summary: 'Setting up the Java Development Kit (JDK) and configuring system PATH.',
              conceptExplanation: 'The JDK includes compiler tools (javac), standard libraries, and the JVM runtime (java). Adding the JDK bin path to system environment variables allows compiling and running Java from any terminal directory.',
              codeSnippet: `// Verify in your terminal:\n// java -version\n// javac -version`,
              expectedOutput: 'openjdk version "21.0.1"',
              keyTakeaways: [
                'JDK contains development tools + JRE runtime',
                'JAVA_HOME points to your base JDK directory',
                'PATH must include %JAVA_HOME%/bin or $JAVA_HOME/bin'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Setting+Up+Java+Environment',
              youtubeDuration: '10:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-02-1',
                topicId: 'java-02-setup',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which component of Java is responsible for compiling .java files into .class bytecode files?',
                options: ['JRE (Java Runtime)', 'javac (Java Compiler)', 'JVM (Virtual Machine)', 'Garbage Collector'],
                correctOptionIndex: 1,
                explanation: '`javac` is the Java compiler included in the JDK that translates human-readable source code into bytecode.'
              }
            ]
          },
          {
            id: 'java-03-how-works',
            subjectId: 'java',
            moduleId: 'java-m1',
            title: '03. How Java Works',
            description: 'Deep dive into JDK, JRE, JVM architecture, JIT Compiler, and memory execution cycle.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['java-02-setup'],
            order: 3,
            content: {
              summary: 'Understand the internal relationship between JDK, JRE, JVM, and the JIT (Just-In-Time) compiler.',
              conceptExplanation: 'The JVM contains ClassLoader, Execution Engine, and Memory Areas (Heap, Stack, Method Area). The JIT compiler converts frequently executed bytecode ("hot spots") into native machine code at runtime for high performance.',
              codeSnippet: `public class ExecutionDemo {\n    public static void main(String[] args) {\n        System.out.println("Source Code -> Compiler -> Bytecode -> JVM -> Native Code");\n    }\n}`,
              expectedOutput: 'Source Code -> Compiler -> Bytecode -> JVM -> Native Code',
              keyTakeaways: [
                'JDK = JRE + Development Tools',
                'JRE = JVM + Core Class Libraries',
                'JIT compiler compiles hot code into native CPU instructions on the fly'
              ],
              youtubeVideoId: 'gS7azO8ybEc',
              youtubeUrl: 'https://www.youtube.com/watch?v=gS7azO8ybEc',
              youtubeDuration: '15:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-03-1',
                topicId: 'java-03-how-works',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the role of the JIT (Just-In-Time) compiler inside the JVM?',
                options: ['Formats Java syntax', 'Compiles repetitive bytecode into native machine instructions at runtime', 'Deletes unused files', 'Manages git repositories'],
                correctOptionIndex: 1,
                explanation: 'The JIT compiler dynamically converts performance-critical bytecode into native CPU instructions to speed up execution.'
              }
            ]
          },
          {
            id: 'java-04-variables',
            subjectId: 'java',
            moduleId: 'java-m1',
            title: '04. Variables & Data Types',
            description: 'Declaring variables, primitive types (int, double, char, boolean), stack memory, and value assignment.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-03-how-works'],
            order: 4,
            content: {
              summary: 'Variables hold data values in memory. Java is strongly-typed, so types must be declared explicitly.',
              conceptExplanation: 'Every variable requires a data type and a unique name. Primitives store raw values directly on the stack memory.',
              codeSnippet: `public class VariablesDemo {\n    public static void main(String[] args) {\n        int age = 22;\n        double price = 99.95;\n        char grade = 'A';\n        boolean isPassed = true;\n        System.out.println("Age: " + age + ", Grade: " + grade);\n    }\n}`,
              expectedOutput: 'Age: 22, Grade: A',
              keyTakeaways: [
                'Primitive types: byte, short, int, long, float, double, boolean, char',
                'Variable names should follow camelCase naming convention',
                'Values must be initialized before they can be read'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Variables+and+Datatypes+in+Java',
              youtubeDuration: '14:10'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-04-1',
                topicId: 'java-04-variables',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of the following Java code?',
                codeContext: 'int x = 5;\nint y = 2;\nSystem.out.println(x / y);',
                options: ['2.5', '2', '2.0', 'Compilation Error'],
                correctOptionIndex: 1,
                explanation: 'Integer division `int / int` in Java truncates the fractional part, resulting in `2`.'
              }
            ]
          },
          {
            id: 'java-05-user-input',
            subjectId: 'java',
            moduleId: 'java-m1',
            title: '05. User Input (Scanner)',
            description: 'Reading keyboard input using java.util.Scanner, nextInt(), nextDouble(), and nextLine().',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-04-variables'],
            order: 5,
            content: {
              summary: 'Use Scanner class to accept input from System.in.',
              conceptExplanation: 'Import `java.util.Scanner`. Create an instance with `new Scanner(System.in)`. Use methods like `nextInt()`, `nextDouble()`, and `nextLine()` to capture typed tokens.',
              codeSnippet: `import java.util.Scanner;\n\npublic class InputDemo {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter your name: ");\n        String name = "AniNova"; // simulated input\n        System.out.println("Hello, " + name + "!");\n    }\n}`,
              expectedOutput: 'Enter your name: Hello, AniNova!',
              keyTakeaways: [
                'Always import java.util.Scanner',
                'Use nextLine() to capture strings with whitespace',
                'Watch out for leftover newline characters after calling nextInt()'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+How+to+Get+User+Input+in+Java',
              youtubeDuration: '11:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-05-1',
                topicId: 'java-05-user-input',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which method in java.util.Scanner reads an entire line of text including spaces?',
                options: ['next()', 'nextLine()', 'readString()', 'nextWord()'],
                correctOptionIndex: 1,
                explanation: '`nextLine()` advances this scanner past the current line and returns the input that was skipped.'
              }
            ]
          },
          {
            id: 'java-06-coding-challenge-1',
            subjectId: 'java',
            moduleId: 'java-m1',
            title: '06. Coding Challenge 1',
            description: 'Hands-on practice: Calculating simple interest, bill amounts, and swapping variables.',
            estimatedMinutes: 15,
            difficulty: 'Easy',
            prerequisites: ['java-05-user-input'],
            order: 6,
            content: {
              summary: 'Apply variables, arithmetic operations, and user input to solve beginner programming challenges.',
              conceptExplanation: 'Practice calculating total marks, calculating BMI, and performing mathematical formula conversions in Java.',
              codeSnippet: `public class Challenge1 {\n    public static void main(String[] args) {\n        double principal = 10000.0;\n        double rate = 5.5;\n        int time = 3;\n        double interest = (principal * rate * time) / 100;\n        System.out.println("Simple Interest: " + interest);\n    }\n}`,
              expectedOutput: 'Simple Interest: 1650.0',
              keyTakeaways: [
                'Use double or float when formulas involve decimal precision',
                'Follow operator precedence (PEMDAS) or use parentheses'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Java+Coding+Challenge+1',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-06-1',
                topicId: 'java-06-coding-challenge-1',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What will this code snippet print?',
                codeContext: 'int a = 10;\nint b = 20;\na = a + b;\nb = a - b;\na = a - b;\nSystem.out.println(a + " " + b);',
                options: ['10 20', '20 10', '30 20', '20 30'],
                correctOptionIndex: 1,
                explanation: 'This is the arithmetic swap algorithm without a third variable. It swaps `a` and `b` so `a` becomes 20 and `b` becomes 10.'
              }
            ]
          },
          {
            id: 'java-07-data-types',
            subjectId: 'java',
            moduleId: 'java-m1',
            title: '07. Java Data Types Deep Dive',
            description: 'Size in bytes, type conversion, implicit widening, explicit narrowing casting, and overflow.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['java-06-coding-challenge-1'],
            order: 7,
            content: {
              summary: 'Deep dive into memory sizes (1 byte to 8 bytes), ranges, and casting mechanics.',
              conceptExplanation: 'Widening casting (byte -> short -> char -> int -> long -> float -> double) happens automatically. Narrowing casting requires manual explicit casting `(int) myDouble`.',
              codeSnippet: `public class DataTypesDeepDive {\n    public static void main(String[] args) {\n        double preciseScore = 98.75;\n        int truncatedScore = (int) preciseScore;\n        System.out.println("Narrowed int score: " + truncatedScore);\n    }\n}`,
              expectedOutput: 'Narrowed int score: 98',
              keyTakeaways: [
                'Narrowing casting truncates decimal precision without rounding',
                'byte is 8-bit (-128 to 127), int is 32-bit, long is 64-bit'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Java+Data+Types+Tamil',
              youtubeDuration: '13:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-07-1',
                topicId: 'java-07-data-types',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which of the following type conversions requires an explicit type cast in Java?',
                options: ['int to double', 'byte to int', 'double to int', 'short to long'],
                correctOptionIndex: 2,
                explanation: 'Converting from a larger data type (`double`) to a smaller data type (`int`) is a narrowing conversion and requires explicit casting `(int)`.'
              }
            ]
          }
        ]
      },
      {
        id: 'java-m2',
        subjectId: 'java',
        title: 'Module 2: Conditionals & Control Flow (Topics 08–13)',
        description: 'if-else, string comparison, nested if, else-if ladders, ternary operator, and coding challenge 2.',
        order: 2,
        topics: [
          {
            id: 'java-08-if-else',
            subjectId: 'java',
            moduleId: 'java-m2',
            title: '08. If Else',
            description: 'Conditional decision making using comparison operators (<, >, ==, !=, <=, >=) and boolean logic.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-07-data-types'],
            order: 8,
            content: {
              summary: 'Execute code blocks conditionally based on whether a boolean condition is true or false.',
              conceptExplanation: 'The `if` block executes when condition is true; otherwise, the `else` block executes.',
              codeSnippet: `public class IfElseDemo {\n    public static void main(String[] args) {\n        int marks = 75;\n        if (marks >= 50) {\n            System.out.println("Result: Pass");\n        } else {\n            System.out.println("Result: Fail");\n        }\n    }\n}`,
              expectedOutput: 'Result: Pass',
              keyTakeaways: [
                'Conditions evaluate to boolean true or false',
                'Comparison operator == checks equality, while = assigns values'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+If+Else+Java+Tamil',
              youtubeDuration: '11:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-08-1',
                topicId: 'java-08-if-else',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output when score = 40?',
                codeContext: 'int score = 40;\nif (score > 50)\n    System.out.println("Great");\nSystem.out.println("Done");',
                options: ['Great', 'Done', 'Great Done', 'Nothing'],
                correctOptionIndex: 1,
                explanation: 'Without curly braces, only the immediately following statement is part of the `if`. `System.out.println("Done")` executes unconditionally.'
              }
            ]
          },
          {
            id: 'java-09-compare-strings',
            subjectId: 'java',
            moduleId: 'java-m2',
            title: '09. Comparing Strings',
            description: 'Why `==` fails for String equality in Java and how to correctly use `.equals()` and `.equalsIgnoreCase()`.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-08-if-else'],
            order: 9,
            content: {
              summary: 'String comparison in Java: reference equality `==` vs content equality `.equals()`.',
              conceptExplanation: '`==` compares memory references (addresses on the heap). `.equals()` checks the actual characters sequence inside the string.',
              codeSnippet: `public class StringCompare {\n    public static void main(String[] args) {\n        String s1 = new String("Java");\n        String s2 = new String("Java");\n        System.out.println("Using ==: " + (s1 == s2));\n        System.out.println("Using equals: " + s1.equals(s2));\n    }\n}`,
              expectedOutput: 'Using ==: false\nUsing equals: true',
              keyTakeaways: [
                'Never compare String values with ==',
                'Always use .equals() or .equalsIgnoreCase() for string comparisons'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Compare+Strings+Java+Tamil',
              youtubeDuration: '10:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-09-1',
                topicId: 'java-09-compare-strings',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why does `s1 == s2` return false for `String s1 = new String("test")` and `String s2 = new String("test")`?',
                options: ['The characters are different', '== compares heap memory references, not character contents', 'Java strings cannot be compared', 'String constructor is deprecated'],
                correctOptionIndex: 1,
                explanation: '`new String()` allocates distinct memory objects on the heap with different memory addresses, so `==` returns false.'
              }
            ]
          },
          {
            id: 'java-10-challenge-2-p1',
            subjectId: 'java',
            moduleId: 'java-m2',
            title: '10. Coding Challenge 2 — Part 1',
            description: 'Building an interactive password checker and traffic light decision system.',
            estimatedMinutes: 15,
            difficulty: 'Easy',
            prerequisites: ['java-09-compare-strings'],
            order: 10,
            content: {
              summary: 'Practical conditionals challenge with string authentication and boundary checking.',
              conceptExplanation: 'Implement a verification system that checks username and password match using `.equals()` and compound logical operators (`&&`, `||`).',
              codeSnippet: `public class Challenge2P1 {\n    public static void main(String[] args) {\n        String user = "admin";\n        String pass = "secret123";\n        if (user.equals("admin") && pass.equals("secret123")) {\n            System.out.println("Access Granted");\n        } else {\n            System.out.println("Access Denied");\n        }\n    }\n}`,
              expectedOutput: 'Access Granted',
              keyTakeaways: [
                'Use && (AND) when all conditions must be true',
                'Use || (OR) when at least one condition must be true'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Java+Coding+Challenge+2+Part+1',
              youtubeDuration: '15:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-10-1',
                topicId: 'java-10-challenge-2-p1',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which logical operator evaluates to true if either condition A OR condition B is true?',
                options: ['&&', '||', '!', '^'],
                correctOptionIndex: 1,
                explanation: '`||` is the logical OR operator in Java.'
              }
            ]
          },
          {
            id: 'java-11-else-if-nested',
            subjectId: 'java',
            moduleId: 'java-m2',
            title: '11. Else If & Nested If',
            description: 'Multi-branch decision ladders and nesting conditional checks inside each other.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['java-10-challenge-2-p1'],
            order: 11,
            content: {
              summary: 'Evaluate multiple conditions in sequence using else-if ladders and nested if blocks.',
              conceptExplanation: 'When the first `if` is false, the program checks subsequent `else if` conditions in order until a true condition matches.',
              codeSnippet: `public class GradeCalculator {\n    public static void main(String[] args) {\n        int score = 88;\n        if (score >= 90) {\n            System.out.println("Grade: A");\n        } else if (score >= 80) {\n            System.out.println("Grade: B");\n        } else if (score >= 70) {\n            System.out.println("Grade: C");\n        } else {\n            System.out.println("Grade: F");\n        }\n    }\n}`,
              expectedOutput: 'Grade: B',
              keyTakeaways: [
                'Once an else-if branch matches, subsequent branches are skipped',
                'The final else block acts as the fallback default'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Else+If+Nested+If+Java',
              youtubeDuration: '14:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-11-1',
                topicId: 'java-11-else-if-nested',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output when mark = 85?',
                codeContext: 'int mark = 85;\nif (mark > 80) {\n    System.out.print("Pass ");\n    if (mark > 90)\n        System.out.print("Distinction");\n    else\n        System.out.print("Merit");\n}',
                options: ['Pass Distinction', 'Pass Merit', 'Pass', 'Merit'],
                correctOptionIndex: 1,
                explanation: '`mark > 80` is true (prints "Pass "). The nested `mark > 90` is false, so it triggers the nested else (prints "Merit").'
              }
            ]
          },
          {
            id: 'java-12-challenge-2-p2',
            subjectId: 'java',
            moduleId: 'java-m2',
            title: '12. Coding Challenge 2 — Part 2',
            description: 'Building a salary tax slab deduction calculator and leap year validation.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['java-11-else-if-nested'],
            order: 12,
            content: {
              summary: 'Solving real-world nested logic challenges with compound year and tax bracket calculations.',
              conceptExplanation: 'A leap year is divisible by 4, but century years must also be divisible by 400: `(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)`.',
              codeSnippet: `public class LeapYearChallenge {\n    public static void main(String[] args) {\n        int year = 2024;\n        boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);\n        System.out.println(year + " is leap year: " + isLeap);\n    }\n}`,
              expectedOutput: '2024 is leap year: true',
              keyTakeaways: [
                'Combine modulo `%` arithmetic with logical operators',
                'Always test edge cases (e.g. year 1900 vs year 2000)'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Java+Coding+Challenge+2+Part+2',
              youtubeDuration: '15:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-12-1',
                topicId: 'java-12-challenge-2-p2',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Why is the year 1900 NOT a leap year in the Gregorian calendar?',
                options: ['It is not divisible by 4', 'It is divisible by 100 but not divisible by 400', 'It is an odd number', 'It is divisible by 400'],
                correctOptionIndex: 1,
                explanation: 'Century years are only leap years if they are evenly divisible by 400 (e.g. 1600, 2000, 2400).'
              }
            ]
          },
          {
            id: 'java-13-ternary',
            subjectId: 'java',
            moduleId: 'java-m2',
            title: '13. Ternary Operator',
            description: 'Shorthand inline conditional assignment: `condition ? valueIfTrue : valueIfFalse`.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: ['java-12-challenge-2-p2'],
            order: 13,
            content: {
              summary: 'The ternary operator `? :` provides a compact inline syntax for if-else expressions.',
              conceptExplanation: 'Syntax: `variable = (expression) ? expression1 : expression2;`. Both expressions must return compatible types.',
              codeSnippet: `public class TernaryDemo {\n    public static void main(String[] args) {\n        int age = 19;\n        String status = (age >= 18) ? "Eligible to Vote" : "Minor";\n        System.out.println("Status: " + status);\n    }\n}`,
              expectedOutput: 'Status: Eligible to Vote',
              keyTakeaways: [
                'Ternary operator evaluates and returns a value directly',
                'Avoid deeply nested ternary operators to maintain code readability'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Ternary+Operator+Java+Tamil',
              youtubeDuration: '9:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-13-1',
                topicId: 'java-13-ternary',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of `int a = 15; int b = 25; int max = (a > b) ? a : b; System.out.println(max);`?',
                options: ['15', '25', 'true', 'false'],
                correctOptionIndex: 1,
                explanation: '`15 > 25` is false, so the expression resolves to `b` (which is 25).'
              }
            ]
          }
        ]
      },
      {
        id: 'java-m3',
        subjectId: 'java',
        title: 'Module 3: Loops & Arrays (Topics 14–20)',
        description: 'for loop, while, do-while, nested loops, array declaration, common array mistakes, and coding challenge 3.',
        order: 3,
        topics: [
          {
            id: 'java-14-for-loop',
            subjectId: 'java',
            moduleId: 'java-m3',
            title: '14. For Loop',
            description: 'Initialization, condition check, iteration step, and count-controlled repetition.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-13-ternary'],
            order: 14,
            content: {
              summary: 'Use for loops when the number of iterations is known in advance.',
              conceptExplanation: 'Structure: `for (init; condition; update) { ... }`. The condition is checked before each iteration.',
              codeSnippet: `public class ForLoopDemo {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.print(i + " ");\n        }\n    }\n}`,
              expectedOutput: '1 2 3 4 5 ',
              keyTakeaways: [
                'Loop variable i is scoped within the for block',
                'If condition is false initially, loop body never runs'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+For+Loop+Java+Tamil',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-14-1',
                topicId: 'java-14-for-loop',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'How many times does this loop execute: `for (int i = 0; i < 10; i += 2)`?',
                options: ['10 times', '5 times', '4 times', '6 times'],
                correctOptionIndex: 1,
                explanation: '`i` takes values 0, 2, 4, 6, 8 (total of 5 executions). When i reaches 10, `10 < 10` is false.'
              }
            ]
          },
          {
            id: 'java-15-challenge-3-p1',
            subjectId: 'java',
            moduleId: 'java-m3',
            title: '15. Coding Challenge 3 — Part 1',
            description: 'Sum of N numbers, multiplication tables, and factorial computation using for loops.',
            estimatedMinutes: 15,
            difficulty: 'Easy',
            prerequisites: ['java-14-for-loop'],
            order: 15,
            content: {
              summary: 'Practice accumulating totals, computing mathematical products, and factorial algorithms.',
              conceptExplanation: 'Factorial $N! = 1 \times 2 \times \dots \times N$. Use an accumulator variable initialized to 1 for products and 0 for sums.',
              codeSnippet: `public class FactorialChallenge {\n    public static void main(String[] args) {\n        int n = 5;\n        long fact = 1;\n        for (int i = 1; i <= n; i++) {\n            fact *= i;\n        }\n        System.out.println("5! = " + fact);\n    }\n}`,
              expectedOutput: '5! = 120',
              keyTakeaways: [
                'Initialize sum accumulators to 0 and product accumulators to 1',
                'Use long for factorials to avoid 32-bit integer overflow'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Java+Coding+Challenge+3+Part+1',
              youtubeDuration: '14:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-15-1',
                topicId: 'java-15-challenge-3-p1',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the sum of integers from 1 to 4 computed by a loop?',
                codeContext: 'int sum = 0;\nfor (int i = 1; i <= 4; i++) sum += i;\nSystem.out.println(sum);',
                options: ['10', '15', '4', '6'],
                correctOptionIndex: 0,
                explanation: '`1 + 2 + 3 + 4 = 10`.'
              }
            ]
          },
          {
            id: 'java-16-arrays-mistakes',
            subjectId: 'java',
            moduleId: 'java-m3',
            title: '16. Arrays & Common Array Mistakes',
            description: '0-based indexing, array declaration, ArrayIndexOutOfBoundsException, and fixed capacity.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['java-15-challenge-3-p1'],
            order: 16,
            content: {
              summary: 'Arrays store fixed-size sequential collections of elements of the same type.',
              conceptExplanation: 'Array indices range from `0` to `length - 1`. Accessing `arr[arr.length]` triggers `ArrayIndexOutOfBoundsException`.',
              codeSnippet: `public class ArrayDemo {\n    public static void main(String[] args) {\n        int[] scores = {95, 88, 72, 90};\n        System.out.println("First score: " + scores[0]);\n        System.out.println("Last score: " + scores[scores.length - 1]);\n    }\n}`,
              expectedOutput: 'First score: 95\nLast score: 90',
              keyTakeaways: [
                'Arrays have fixed length determined at instantiation',
                'Valid index range is 0 to length - 1',
                'scores.length is a property (not a method call scores.length())'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Array+Common+Array+Mistakes+Java',
              youtubeDuration: '16:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-16-1',
                topicId: 'java-16-arrays-mistakes',
                difficulty: 'Medium',
                type: 'DEBUGGING',
                question: 'Identify the bug in this array traversal loop:',
                buggyCodeSnippet: 'int[] nums = {10, 20, 30};\nfor (int i = 0; i <= nums.length; i++) {\n    System.out.println(nums[i]);\n}',
                options: ['Loop condition should be i < nums.length', 'nums is missing semicolon', 'nums.length() requires parentheses', 'int i should start at 1'],
                correctOptionIndex: 0,
                explanation: 'Using `<= nums.length` attempts to access index 3 on an array of length 3, throwing an ArrayIndexOutOfBoundsException. It must be `< nums.length`.'
              }
            ]
          },
          {
            id: 'java-17-challenge-3-p2',
            subjectId: 'java',
            moduleId: 'java-m3',
            title: '17. Coding Challenge 3 — Part 2',
            description: 'Finding min, max, average, and reversing an array in place.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['java-16-arrays-mistakes'],
            order: 17,
            content: {
              summary: 'Algorithmic array challenges: linear search, finding extreme values, and in-place two-pointer reversal.',
              conceptExplanation: 'Initialize `max = arr[0]`. Traverse the array: if `arr[i] > max`, update `max = arr[i]`.',
              codeSnippet: `public class ArrayMaxChallenge {\n    public static void main(String[] args) {\n        int[] values = {14, 56, 89, 23, 7};\n        int max = values[0];\n        for (int i = 1; i < values.length; i++) {\n            if (values[i] > max) max = values[i];\n        }\n        System.out.println("Maximum Value: " + max);\n    }\n}`,
              expectedOutput: 'Maximum Value: 89',
              keyTakeaways: [
                'Always initialize max/min with arr[0] rather than 0 to handle negative arrays',
                'Two pointers left and right can reverse an array in O(N) time and O(1) space'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Java+Coding+Challenge+3+Part+2',
              youtubeDuration: '17:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-17-1',
                topicId: 'java-17-challenge-3-p2',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Why should you initialize `int min = arr[0];` instead of `int min = 0;` when searching for the minimum in an array?',
                options: ['To avoid compiler syntax errors', 'If all elements in the array are positive, 0 would falsely remain the minimum', 'Arrays cannot compare against 0', 'It is faster for CPU cache'],
                correctOptionIndex: 1,
                explanation: 'If the array contains `{10, 20, 30}`, initializing `min = 0` would falsely report 0 as the minimum even though 0 is not in the array.'
              }
            ]
          },
          {
            id: 'java-18-nested-loops',
            subjectId: 'java',
            moduleId: 'java-m3',
            title: '18. Nested Loops',
            description: 'Printing 2D star patterns, matrices, and understanding O(N^2) time complexity.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['java-17-challenge-3-p2'],
            order: 18,
            content: {
              summary: 'Loops inside loops: outer loop controls rows and inner loop controls columns.',
              conceptExplanation: 'For every single iteration of the outer loop, the inner loop executes completely from start to finish.',
              codeSnippet: `public class PatternDemo {\n    public static void main(String[] args) {\n        for (int row = 1; row <= 3; row++) {\n            for (int col = 1; col <= row; col++) {\n                System.out.print("* ");\n            }\n            System.out.println();\n        }\n    }\n}`,
              expectedOutput: '* \n* * \n* * * ',
              keyTakeaways: [
                'Outer loop represents row index; inner loop represents column index',
                'Nested loops over N and M run in O(N * M) time complexity'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Nested+Loops+Java+Tamil',
              youtubeDuration: '18:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-18-1',
                topicId: 'java-18-nested-loops',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'How many asterisks (*) are printed in total by `for(int i=0; i<3; i++) for(int j=0; j<4; j++) System.out.print("*");`?',
                options: ['7', '12', '9', '16'],
                correctOptionIndex: 1,
                explanation: 'Outer loop runs 3 times; for each outer iteration, inner loop runs 4 times. Total = `3 * 4 = 12`.'
              }
            ]
          },
          {
            id: 'java-19-while-loop',
            subjectId: 'java',
            moduleId: 'java-m3',
            title: '19. While Loop',
            description: 'Condition-controlled loops: reversing a number, checking palindromes, and digit extraction.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['java-18-nested-loops'],
            order: 19,
            content: {
              summary: 'Use while loops when the termination condition is dynamic (e.g. until number becomes 0).',
              conceptExplanation: 'The while loop evaluates the condition before executing the loop body. Extract digits with `% 10` and reduce with `/ 10`.',
              codeSnippet: `public class ReverseNumber {\n    public static void main(String[] args) {\n        int num = 1234;\n        int rev = 0;\n        while (num != 0) {\n            int digit = num % 10;\n            rev = rev * 10 + digit;\n            num /= 10;\n        }\n        System.out.println("Reversed: " + rev);\n    }\n}`,
              expectedOutput: 'Reversed: 4321',
              keyTakeaways: [
                'Ensure the loop variable changes toward false to avoid infinite loops',
                '`num % 10` gives the last digit; `num / 10` drops the last digit'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+While+Loop+Java+Tamil',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-19-1',
                topicId: 'java-19-while-loop',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the value of count when `int n = 5; int count = 0; while(n > 0) { count++; n -= 2; }` finishes?',
                options: ['3', '2', '5', 'Infinite loop'],
                correctOptionIndex: 0,
                explanation: 'Iteration 1: n=3, count=1; Iteration 2: n=1, count=2; Iteration 3: n=-1, count=3. Loop terminates with count=3.'
              }
            ]
          },
          {
            id: 'java-20-do-while',
            subjectId: 'java',
            moduleId: 'java-m3',
            title: '20. Do-While Loop',
            description: 'Exit-controlled loops that execute at least once regardless of condition validity.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: ['java-19-while-loop'],
            order: 20,
            content: {
              summary: 'The do-while loop executes the body first, then checks the condition at the end.',
              conceptExplanation: 'Ideal for interactive console menus where you must prompt the user at least once before testing if they want to exit.',
              codeSnippet: `public class DoWhileDemo {\n    public static void main(String[] args) {\n        int count = 10;\n        do {\n            System.out.println("Executes at least once! Count: " + count);\n            count++;\n        } while (count < 5);\n    }\n}`,
              expectedOutput: 'Executes at least once! Count: 10',
              keyTakeaways: [
                'do-while always executes at least once',
                'Notice the semicolon `;` at the end of the while condition'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Do+While+Loop+Java+Tamil',
              youtubeDuration: '10:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-20-1',
                topicId: 'java-20-do-while',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the primary difference between a `while` loop and a `do-while` loop in Java?',
                options: ['while is faster', 'do-while guarantees at least one execution because condition is checked at the end', 'do-while cannot use break statements', 'while loops cannot use integers'],
                correctOptionIndex: 1,
                explanation: '`do-while` is an exit-controlled loop that executes the body before checking the loop condition.'
              }
            ]
          }
        ]
      },
      {
        id: 'java-m4',
        subjectId: 'java',
        title: 'Module 4: Methods, Functions & Overloading (Topics 21–28)',
        description: 'Objects & classes, methods, parameters, return keyword, method overloading, for-each, and IDE setup.',
        order: 4,
        topics: [
          {
            id: 'java-21-objects-classes',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '21. Objects & Classes',
            description: 'Class as a blueprint, object instantiation using `new`, state (fields), and behavior (methods).',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['java-20-do-while'],
            order: 21,
            content: {
              summary: 'A class is a template defining data fields and methods; an object is a live instance in heap memory.',
              conceptExplanation: 'Classes define attributes (variables) and behaviors (methods). Creating an object allocating memory with `new` keyword.',
              codeSnippet: `class Car {\n    String model;\n    int speed;\n    \n    void display() {\n        System.out.println(model + " running at " + speed + " km/h");\n    }\n}\n\npublic class OOPIntro {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.model = "Tesla Model 3";\n        myCar.speed = 120;\n        myCar.display();\n    }\n}`,
              expectedOutput: 'Tesla Model 3 running at 120 km/h',
              keyTakeaways: [
                'Class = Blueprint, Object = Instance in Heap Memory',
                'Access fields and methods using the dot `.` operator'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Objects+Classes+Java+Tamil',
              youtubeDuration: '14:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-21-1',
                topicId: 'java-21-objects-classes',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which keyword in Java is used to instantiate an object from a class?',
                options: ['create', 'new', 'instantiate', 'make'],
                correctOptionIndex: 1,
                explanation: 'The `new` keyword dynamically allocates memory on the heap for a new object instance.'
              }
            ]
          },
          {
            id: 'java-22-methods',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '22. Functions / Methods',
            description: 'Defining reusable procedures, void return type, method calling, and clean code modularity.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-21-objects-classes'],
            order: 22,
            content: {
              summary: 'Methods encapsulate blocks of logic that can be invoked repeatedly across an application.',
              conceptExplanation: 'Method syntax: `returnType methodName(parameters) { body }`. `void` indicates no value is returned.',
              codeSnippet: `public class MethodDemo {\n    static void printGreeting() {\n        System.out.println("Hello from a reusable Java method!");\n    }\n    \n    public static void main(String[] args) {\n        printGreeting();\n    }\n}`,
              expectedOutput: 'Hello from a reusable Java method!',
              keyTakeaways: [
                'Methods promote the DRY (Don\'t Repeat Yourself) principle',
                'Method names should be verbs written in camelCase'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Functions+Methods+Java+Tamil',
              youtubeDuration: '12:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-22-1',
                topicId: 'java-22-methods',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What return type should you specify if a method does not return any value to the caller?',
                options: ['null', 'void', 'empty', 'none'],
                correctOptionIndex: 1,
                explanation: '`void` indicates that a method performs actions but returns no result.'
              }
            ]
          },
          {
            id: 'java-23-parameters',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '23. Methods with Parameters',
            description: 'Passing arguments by value, primitive parameters vs reference parameters.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-22-methods'],
            order: 23,
            content: {
              summary: 'Pass data into methods as formal parameters to make them dynamic and reusable.',
              conceptExplanation: 'Parameters defined in method signatures receive arguments passed during invocation. Java is strictly Pass-by-Value.',
              codeSnippet: `public class ParamDemo {\n    static void calculateArea(int width, int height) {\n        int area = width * height;\n        System.out.println("Area: " + area + " sq units");\n    }\n    \n    public static void main(String[] args) {\n        calculateArea(5, 8);\n    }\n}`,
              expectedOutput: 'Area: 40 sq units',
              keyTakeaways: [
                'Parameters are local variables inside the method',
                'Arguments passed must match expected parameter types and count'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Function+Parameters+Java+Tamil',
              youtubeDuration: '11:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-23-1',
                topicId: 'java-23-parameters',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is printed by this method call?',
                codeContext: 'static void greet(String name, int age) {\n    System.out.println(name + " is " + age);\n}\npublic static void main(String[] args) {\n    greet("Alice", 21);\n}',
                options: ['Alice is 21', '21 is Alice', 'Alice is age', 'Compilation Error'],
                correctOptionIndex: 0,
                explanation: 'Arguments "Alice" and 21 are bound to `name` and `age` respectively, printing "Alice is 21".'
              }
            ]
          },
          {
            id: 'java-24-return',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '24. Return Keyword',
            description: 'Returning computed values from methods and early exit with return statement.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-23-parameters'],
            order: 24,
            content: {
              summary: 'The return statement yields a value back to the caller and terminates method execution.',
              conceptExplanation: 'The returned value\'s type must match the declared return type in the method signature.',
              codeSnippet: `public class ReturnDemo {\n    static int add(int a, int b) {\n        return a + b;\n    }\n    \n    public static void main(String[] args) {\n        int result = add(15, 25);\n        System.out.println("Sum: " + result);\n    }\n}`,
              expectedOutput: 'Sum: 40',
              keyTakeaways: [
                'Any code written directly after an unconditional return is unreachable (compiler error)',
                'Methods returning non-void must guarantee a return on all execution paths'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Return+Keyword+Java+Tamil',
              youtubeDuration: '10:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-24-1',
                topicId: 'java-24-return',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What happens if a Java method declared with `int` return type has a code branch that does not return an integer?',
                options: ['It returns 0 by default', 'It throws a runtime NullPointerException', 'It fails to compile ("missing return statement")', 'It returns null'],
                correctOptionIndex: 2,
                explanation: 'The Java compiler verifies that all execution paths in a non-void method return an appropriate value.'
              }
            ]
          },
          {
            id: 'java-25-challenge-4',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '25. Coding Challenge 4',
            description: 'Building helper functions: prime number tester, string palindrome checker, and GCD calculation.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['java-24-return'],
            order: 25,
            content: {
              summary: 'Combine modular functions with loops and conditions to test primes and compute Greatest Common Divisor (GCD).',
              conceptExplanation: 'Check if $N$ is prime by verifying no integers from $2$ to $\sqrt{N}$ divide $N$ evenly.',
              codeSnippet: `public class PrimeChecker {\n    static boolean isPrime(int n) {\n        if (n <= 1) return false;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println("Is 29 prime? " + isPrime(29));\n    }\n}`,
              expectedOutput: 'Is 29 prime? true',
              keyTakeaways: [
                'Checking up to sqrt(N) optimizes prime checks to O(sqrt(N)) time',
                'Modular functions simplify unit testing'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Java+Coding+Challenge+4',
              youtubeDuration: '16:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-25-1',
                topicId: 'java-25-challenge-4',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the time complexity of checking if N is prime by testing divisors up to sqrt(N)?',
                options: ['O(N)', 'O(sqrt(N))', 'O(1)', 'O(log N)'],
                correctOptionIndex: 1,
                explanation: 'Looping up to `i * i <= n` checks at most `sqrt(N)` divisors.'
              }
            ]
          },
          {
            id: 'java-26-overloading',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '26. Method Overloading',
            description: 'Compile-time polymorphism: defining methods with same name but different parameter list.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-25-challenge-4'],
            order: 26,
            content: {
              summary: 'Method overloading allows multiple methods to share the same name with different parameter signatures.',
              conceptExplanation: 'Overloading requires differences in parameter count, types, or order. Changing return type alone is NOT sufficient for overloading.',
              codeSnippet: `public class Calculator {\n    static int add(int a, int b) {\n        return a + b;\n    }\n    static double add(double a, double b) {\n        return a + b;\n    }\n    static int add(int a, int b, int c) {\n        return a + b + c;\n    }\n    public static void main(String[] args) {\n        System.out.println("2 ints: " + add(5, 10));\n        System.out.println("2 doubles: " + add(3.5, 2.5));\n    }\n}`,
              expectedOutput: '2 ints: 15\n2 doubles: 6.0',
              keyTakeaways: [
                'Overloading is resolved at compile time (Static Polymorphism)',
                'Return type does NOT differentiate overloaded methods'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Method+Overloading+Java+Tamil',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-26-1',
                topicId: 'java-26-overloading',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Can two methods in the same class have the same name and parameter list, but different return types in Java?',
                options: ['Yes, Java allows return type overloading', 'No, method signature includes only name and parameter types, causing a compiler error', 'Yes, only if static', 'Yes, only in interfaces'],
                correctOptionIndex: 1,
                explanation: 'Method signature is composed of the method name and parameter types. Differing return types alone causes a duplicate method compilation error.'
              }
            ]
          },
          {
            id: 'java-27-for-each',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '27. For-Each Loop',
            description: 'Enhanced for loop syntax `for (Type element : arrayOrCollection)` for clean traversal.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: ['java-26-overloading'],
            order: 27,
            content: {
              summary: 'The enhanced for-each loop iterates over arrays and collections without index counters.',
              conceptExplanation: 'Eliminates off-by-one errors and simplifies read-only iteration over arrays and `Iterable` collections.',
              codeSnippet: `public class ForEachDemo {\n    public static void main(String[] args) {\n        String[] fruits = {"Apple", "Banana", "Cherry"};\n        for (String fruit : fruits) {\n            System.out.println("Fruit: " + fruit);\n        }\n    }\n}`,
              expectedOutput: 'Fruit: Apple\nFruit: Banana\nFruit: Cherry',
              keyTakeaways: [
                'Cannot modify elements in place during for-each iteration on primitives',
                'Read-only forward iteration'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+For+Each+Loop+Java+Tamil',
              youtubeDuration: '9:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-27-1',
                topicId: 'java-27-for-each',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'When should you prefer a standard index-based `for` loop over a `for-each` loop?',
                options: ['When you need to read every element in order', 'When you need to know or modify specific element indices or traverse in reverse', 'For-each is always required in modern Java', 'Standard for loops are deprecated'],
                correctOptionIndex: 1,
                explanation: 'Standard index loops are needed when accessing index positions, stepping backwards, or modifying array elements by index.'
              }
            ]
          },
          {
            id: 'java-28-eclipse',
            subjectId: 'java',
            moduleId: 'java-m4',
            title: '28. Eclipse Installation & IDE Setup',
            description: 'Setting up Eclipse IDE / IntelliJ IDEA, project workspace, package structures, and debugging shortcuts.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['java-27-for-each'],
            order: 28,
            content: {
              summary: 'Configuring professional Java IDE workspaces for rapid development and debugging.',
              conceptExplanation: 'Modern IDEs offer real-time syntax checking, auto-import, breakpoint debugging, and build automation.',
              codeSnippet: `package com.topicsolver.demo;\n\npublic class WorkspaceSetup {\n    public static void main(String[] args) {\n        System.out.println("IDE Workspace Configured Successfully!");\n    }\n}`,
              expectedOutput: 'IDE Workspace Configured Successfully!',
              keyTakeaways: [
                'Packages organize classes into hierarchical namespaces',
                'Use IDE debugger breakpoints (F6/F8) to inspect live stack frames'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Eclipse+Installation+Java+Tamil',
              youtubeDuration: '11:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-28-1',
                topicId: 'java-28-eclipse',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the purpose of the `package` declaration at the top of a Java file?',
                options: ['To import external libraries', 'To group related classes into a namespace and prevent naming collisions', 'To declare main methods', 'To configure JVM memory'],
                correctOptionIndex: 1,
                explanation: 'Packages prevent naming conflicts and control class access visibility.'
              }
            ]
          }
        ]
      },
      {
        id: 'java-m5',
        subjectId: 'java',
        title: 'Module 5: Constructors & Inheritance (Topics 29–36)',
        description: 'Constructors, overloading, `this`, inheritance types, `super` keyword, abstract methods, and challenge.',
        order: 5,
        topics: [
          {
            id: 'java-29-constructor',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '29. Constructor',
            description: 'Special method with no return type called automatically during `new` object creation.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-28-eclipse'],
            order: 29,
            content: {
              summary: 'Constructors initialize object fields at the time of creation.',
              conceptExplanation: 'A constructor has the exact same name as the class and has NO return type. If no constructor is written, Java provides a default no-argument constructor.',
              codeSnippet: `class Student {\n    String name;\n    int rollNo;\n    \n    // Parameterized constructor\n    Student(String n, int r) {\n        name = n;\n        rollNo = r;\n    }\n}\n\npublic class ConstructorDemo {\n    public static void main(String[] args) {\n        Student s1 = new Student("Aria", 101);\n        System.out.println("Student: " + s1.name + " (" + s1.rollNo + ")");\n    }\n}`,
              expectedOutput: 'Student: Aria (101)',
              keyTakeaways: [
                'Constructors have no return type (not even void)',
                'Defining any custom constructor removes the default no-arg constructor'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Constructor+Java+Tamil',
              youtubeDuration: '13:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-29-1',
                topicId: 'java-29-constructor',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What happens if you define a method `void Student()` with the same name as the class?',
                options: ['It is a valid constructor', 'It is treated as a regular method, NOT a constructor, because it specifies a return type `void`', 'Compiler error immediately', 'It deletes the class'],
                correctOptionIndex: 1,
                explanation: 'Constructors cannot have a return type. Giving it `void` makes it a regular method.'
              }
            ]
          },
          {
            id: 'java-30-constructor-overload',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '30. Constructor Overloading',
            description: 'Providing multiple constructors with different argument lists for flexible object initialization.',
            estimatedMinutes: 10,
            difficulty: 'Medium',
            prerequisites: ['java-29-constructor'],
            order: 30,
            content: {
              summary: 'Constructors can be overloaded with different parameters to allow initializing objects with default or custom values.',
              conceptExplanation: 'Allows creating objects via `new Product("Laptop")` or `new Product("Laptop", 1200.0)`.',
              codeSnippet: `class Product {\n    String name;\n    double price;\n    \n    Product(String name) {\n        this.name = name;\n        this.price = 0.0;\n    }\n    \n    Product(String name, double price) {\n        this.name = name;\n        this.price = price;\n    }\n}`,
              expectedOutput: 'Multiple constructor instances instantiated.',
              keyTakeaways: [
                'Overloaded constructors provide flexible ways to create objects',
                'Can chain constructors using this(...) syntax'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Constructor+Overloading+Java+Tamil',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-30-1',
                topicId: 'java-30-constructor-overload',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'How do you call another constructor in the same class from within a constructor?',
                options: ['super()', 'this()', 'call()', 'self()'],
                correctOptionIndex: 1,
                explanation: '`this(...)` invokes an overloaded constructor in the same class (must be the first statement in the constructor body).'
              }
            ]
          },
          {
            id: 'java-31-this-keyword',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '31. `this` Keyword',
            description: 'Referencing the current class instance, resolving variable shadowing, and constructor chaining.',
            estimatedMinutes: 10,
            difficulty: 'Medium',
            prerequisites: ['java-30-constructor-overload'],
            order: 31,
            content: {
              summary: '`this` refers to the current object whose method or constructor is being called.',
              conceptExplanation: 'Commonly used to resolve ambiguity when parameter names match instance variable names (shadowing).',
              codeSnippet: `class User {\n    String name;\n    User(String name) {\n        this.name = name; // this.name is field; name is parameter\n    }\n}`,
              expectedOutput: 'Shadowing resolved successfully.',
              keyTakeaways: [
                '`this.field` refers to the instance variable',
                '`this()` must be the very first statement in a constructor'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+This+Keyword+Java+Tamil',
              youtubeDuration: '10:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-31-1',
                topicId: 'java-31-this-keyword',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the primary purpose of using `this.name = name;` in a constructor?',
                options: ['To make the variable static', 'To distinguish the instance field from the incoming parameter when both share the same identifier', 'To make the variable private', 'To destroy memory'],
                correctOptionIndex: 1,
                explanation: 'When parameters shadow instance variables, `this.name` explicitly targets the instance field on the current heap object.'
              }
            ]
          },
          {
            id: 'java-32-inheritance',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '32. Inheritance',
            description: 'Reusing code across classes using the `extends` keyword (IS-A relationship).',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['java-31-this-keyword'],
            order: 32,
            content: {
              summary: 'Inheritance allows a child (subclass) to inherit fields and methods from a parent (superclass).',
              conceptExplanation: 'Use `class SubClass extends SuperClass`. Promotes code reuse and forms polymorphic class hierarchies.',
              codeSnippet: `class Animal {\n    void eat() {\n        System.out.println("Animal eats food.");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println("Dog barks!");\n    }\n}\n\npublic class InheritanceDemo {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.eat();\n        d.bark();\n    }\n}`,
              expectedOutput: 'Animal eats food.\nDog barks!',
              keyTakeaways: [
                'Subclasses inherit non-private fields and methods',
                'Java supports single class inheritance (a class can only extend one superclass)'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Inheritance+Java+Tamil',
              youtubeDuration: '14:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-32-1',
                topicId: 'java-32-inheritance',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Which keyword is used by a Java class to inherit from a superclass?',
                options: ['implements', 'extends', 'inherits', 'super'],
                correctOptionIndex: 1,
                explanation: '`extends` is used for class inheritance in Java.'
              }
            ]
          },
          {
            id: 'java-33-inheritance-types',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '33. Types of Inheritance',
            description: 'Single, Multilevel, and Hierarchical inheritance (and why Java avoids Multiple Inheritance with classes).',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-32-inheritance'],
            order: 33,
            content: {
              summary: 'Explore inheritance structures supported in Java and why Multiple Class Inheritance is prevented (Diamond Problem).',
              conceptExplanation: 'Single: A -> B. Multilevel: A -> B -> C. Hierarchical: A -> B and A -> C. Multiple inheritance of classes is disallowed to avoid ambiguity.',
              codeSnippet: `// Multilevel Inheritance\nclass GrandParent {}\nclass Parent extends GrandParent {}\nclass Child extends Parent {}`,
              expectedOutput: 'Multilevel hierarchy established.',
              keyTakeaways: [
                'Single, Multilevel, and Hierarchical are supported with classes',
                'Multiple inheritance is supported only through Interfaces'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Inheritance+Types+Java+Tamil',
              youtubeDuration: '13:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-33-1',
                topicId: 'java-33-inheritance-types',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Why does Java not support multiple inheritance with classes (e.g. class C extends A, B)?',
                options: ['It would slow down the JVM', 'To avoid ambiguity such as the Diamond Problem where two parents have the same method', 'Java cannot compile more than one class', 'Because memory cannot support it'],
                correctOptionIndex: 1,
                explanation: 'To prevent the Diamond Problem where the compiler cannot determine which superclass method implementation to inherit.'
              }
            ]
          },
          {
            id: 'java-34-inheritance-challenge',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '34. Inheritance Coding Challenge',
            description: 'Designing an Employee management system (Manager, Developer, Intern) with specialized salary computations.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['java-33-inheritance-types'],
            order: 34,
            content: {
              summary: 'Practical challenge modeling enterprise domains using inheritance and method overriding.',
              conceptExplanation: 'Superclass `Employee` with base `salary`. Subclasses override `calculateBonus()` to provide role-specific bonuses.',
              codeSnippet: `class Employee {\n    double baseSalary = 50000;\n    double calculateTotal() {\n        return baseSalary;\n    }\n}\nclass Manager extends Employee {\n    @Override\n    double calculateTotal() {\n        return baseSalary + 15000;\n    }\n}`,
              expectedOutput: 'Bonus calculated via method override.',
              keyTakeaways: [
                'Use @Override annotation to catch spelling mistakes during compilation',
                'Subclasses customize behavior while maintaining common superclass API'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Inheritance+Coding+Challenge+Java',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-34-1',
                topicId: 'java-34-inheritance-challenge',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the purpose of the `@Override` annotation in Java?',
                options: ['It speeds up runtime execution', 'It tells the compiler to verify that the method actually overrides a superclass method', 'It prevents subclasses from changing the method', 'It makes the method private'],
                correctOptionIndex: 1,
                explanation: '`@Override` provides compile-time safety to ensure you accurately match a superclass method signature.'
              }
            ]
          },
          {
            id: 'java-35-super-keyword',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '35. `super` Keyword',
            description: 'Calling superclass constructors `super()`, accessing superclass methods, and resolving shadowed fields.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-34-inheritance-challenge'],
            order: 35,
            content: {
              summary: '`super` is a reference variable used to access parent class members and invoke parent constructors.',
              conceptExplanation: '`super()` invokes the parent constructor and must be the first line of the child constructor.',
              codeSnippet: `class Parent {\n    Parent(String message) {\n        System.out.println("Parent: " + message);\n    }\n}\n\nclass Child extends Parent {\n    Child() {\n        super("Initialized from Child");\n    }\n}\n\npublic class SuperDemo {\n    public static void main(String[] args) {\n        new Child();\n    }\n}`,
              expectedOutput: 'Parent: Initialized from Child',
              keyTakeaways: [
                'super() must be the first statement in child constructor',
                'super.methodName() invokes the parent version of an overridden method'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Super+Keyword+Java+Tamil',
              youtubeDuration: '12:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-35-1',
                topicId: 'java-35-super-keyword',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Where must the `super()` constructor call be placed inside a subclass constructor?',
                options: ['Anywhere in the constructor', 'At the very first line of the constructor body', 'At the last line before return', 'Outside the constructor'],
                correctOptionIndex: 1,
                explanation: 'In Java, `super()` must always be the first statement in a constructor so superclass state is initialized first.'
              }
            ]
          },
          {
            id: 'java-36-abstract-method',
            subjectId: 'java',
            moduleId: 'java-m5',
            title: '36. Abstract Method & Abstract Classes',
            description: 'Defining contract methods with no body using `abstract` keyword and enforcing subclass implementation.',
            estimatedMinutes: 12,
            difficulty: 'Hard',
            prerequisites: ['java-35-super-keyword'],
            order: 36,
            content: {
              summary: 'Abstract classes cannot be instantiated directly and define template contracts for subclasses.',
              conceptExplanation: 'An abstract method has no implementation (no `{}` body). Any non-abstract subclass MUST implement all inherited abstract methods.',
              codeSnippet: `abstract class Shape {\n    abstract double area();\n}\n\nclass Circle extends Shape {\n    double radius;\n    Circle(double r) { this.radius = r; }\n    \n    @Override\n    double area() {\n        return Math.PI * radius * radius;\n    }\n}\n\npublic class AbstractDemo {\n    public static void main(String[] args) {\n        Shape s = new Circle(5.0);\n        System.out.printf("Area: %.2f\\n", s.area());\n    }\n}`,
              expectedOutput: 'Area: 78.54',
              keyTakeaways: [
                'Abstract classes can have both abstract and concrete methods',
                'You cannot create objects of an abstract class using `new Shape()`'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Abstract+Method+Java+Tamil',
              youtubeDuration: '14:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-36-1',
                topicId: 'java-36-abstract-method',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'Can you instantiate an abstract class directly using the `new` operator in Java?',
                options: ['Yes, if it has a constructor', 'No, abstract classes cannot be instantiated directly', 'Yes, but only in the main method', 'Yes, with reflection only'],
                correctOptionIndex: 1,
                explanation: 'Abstract classes cannot be instantiated with `new`. They are intended to be extended by concrete subclasses.'
              }
            ]
          }
        ]
      },
      {
        id: 'java-m6',
        subjectId: 'java',
        title: 'Module 6: Modifiers, Interfaces & Lambdas (Topics 37–43)',
        description: 'Access modifiers, static memory, final, interface contracts, multiple inheritance, and lambda expressions.',
        order: 6,
        topics: [
          {
            id: 'java-37-access-modifiers',
            subjectId: 'java',
            moduleId: 'java-m6',
            title: '37. Access Modifiers',
            description: 'Encapsulation boundaries: public, private, protected, and default (package-private).',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-36-abstract-method'],
            order: 37,
            content: {
              summary: 'Access modifiers protect object state and enforce encapsulation in object-oriented design.',
              conceptExplanation: 'private (same class only), default (same package), protected (same package + subclasses), public (accessible everywhere).',
              codeSnippet: `class BankAccount {\n    private double balance = 1000.0; // Encapsulated data\n    \n    public double getBalance() {\n        return balance;\n    }\n    \n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}`,
              expectedOutput: 'Encapsulated account state maintained.',
              keyTakeaways: [
                'Keep fields private and expose controlled access via public getters/setters',
                'protected allows subclass access across different packages'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Access+Modifiers+Java+Tamil',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-37-1',
                topicId: 'java-37-access-modifiers',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Which access modifier restricts access so a member is ONLY visible within its defining class?',
                options: ['protected', 'default', 'private', 'public'],
                correctOptionIndex: 2,
                explanation: '`private` members are completely inaccessible from any other class.'
              }
            ]
          },
          {
            id: 'java-38-static-keyword',
            subjectId: 'java',
            moduleId: 'java-m6',
            title: '38. `static` Keyword',
            description: 'Class-level variables, static methods, static blocks, and Metaspace memory sharing.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-37-access-modifiers'],
            order: 38,
            content: {
              summary: '`static` members belong to the class itself rather than any individual object instance.',
              conceptExplanation: 'A single copy of a static variable is shared across all instances of the class. Static methods can be invoked directly with `ClassName.method()` without creating an object.',
              codeSnippet: `class Counter {\n    static int count = 0; // Shared across all instances\n    Counter() {\n        count++;\n    }\n}\n\npublic class StaticDemo {\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        new Counter();\n        System.out.println("Total Instances: " + Counter.count);\n    }\n}`,
              expectedOutput: 'Total Instances: 3',
              keyTakeaways: [
                'static members are loaded once when class is loaded into memory',
                'static methods cannot access instance variables or `this` keyword directly'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Static+Keyword+Java+Tamil',
              youtubeDuration: '14:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-38-1',
                topicId: 'java-38-static-keyword',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Why can a `static` method NOT access non-static instance variables directly?',
                options: ['Static methods run before memory is allocated', 'Static methods belong to the class and do not have a `this` reference to a specific object instance', 'Static methods are private', 'Java does not permit variable sharing'],
                correctOptionIndex: 1,
                explanation: 'Static methods can execute without any instance existing, so there is no specific object instance (`this`) to query.'
              }
            ]
          },
          {
            id: 'java-39-final-keyword',
            subjectId: 'java',
            moduleId: 'java-m6',
            title: '39. `final` Keyword',
            description: 'Constants (final variable), preventing method overriding (final method), and immutable classes (final class).',
            estimatedMinutes: 10,
            difficulty: 'Medium',
            prerequisites: ['java-38-static-keyword'],
            order: 39,
            content: {
              summary: 'The `final` keyword restricts modification: constants, un-overridable methods, and un-extendable classes.',
              conceptExplanation: '`final int MAX = 100` cannot be reassigned. `final void process()` cannot be overridden. `final class String` cannot be subclassed.',
              codeSnippet: `public class FinalDemo {\n    public static final double PI = 3.1415926535;\n    public static void main(String[] args) {\n        System.out.println("Constant PI: " + PI);\n    }\n}`,
              expectedOutput: 'Constant PI: 3.1415926535',
              keyTakeaways: [
                'final variables must be initialized and cannot be reassigned',
                'final classes (like java.lang.String and Integer) prevent inheritance'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Final+Keyword+Java+Tamil',
              youtubeDuration: '11:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-39-1',
                topicId: 'java-39-final-keyword',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the effect of declaring a class as `final class SecurityManager` in Java?',
                options: ['No objects of this class can be created', 'The class cannot be extended / subclassed by any other class', 'All methods inside become static', 'The class can only be run once'],
                correctOptionIndex: 1,
                explanation: 'A `final` class cannot be inherited or extended by any subclass.'
              }
            ]
          },
          {
            id: 'java-40-coding-practice',
            subjectId: 'java',
            moduleId: 'java-m6',
            title: '40. Coding Practice',
            description: 'Comprehensive OOP integration: Building an ATM banking simulator with encapsulation, inheritance, and static counters.',
            estimatedMinutes: 16,
            difficulty: 'Medium',
            prerequisites: ['java-39-final-keyword'],
            order: 40,
            content: {
              summary: 'Consolidate classes, constructors, encapsulation, and static fields into a functional ATM transaction engine.',
              conceptExplanation: 'Implement account authentication, balance query, withdraw with balance checks, and deposit operations.',
              codeSnippet: `class ATM {\n    private double balance = 5000;\n    void withdraw(double amount) {\n        if (amount <= balance) {\n            balance -= amount;\n            System.out.println("Withdrawn: " + amount + ", Remaining: " + balance);\n        } else {\n            System.out.println("Insufficient Funds");\n        }\n    }\n}`,
              expectedOutput: 'Transaction verified and executed.',
              keyTakeaways: [
                'Combine validation rules with encapsulated data',
                'Modular OOP code simplifies future extensions'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Coding+Practice+Java+Tamil',
              youtubeDuration: '18:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-40-1',
                topicId: 'java-40-coding-practice',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Which OOP pillar is demonstrated by hiding the `balance` field and providing a `withdraw()` method with balance checks?',
                options: ['Polymorphism', 'Encapsulation', 'Inheritance', 'Multiple Dispatch'],
                correctOptionIndex: 1,
                explanation: 'Encapsulation bundles data with validation methods and restricts direct access to internal state.'
              }
            ]
          },
          {
            id: 'java-41-interface',
            subjectId: 'java',
            moduleId: 'java-m6',
            title: '41. Interface',
            description: 'Pure contract definition using `interface` and `implements` keywords, default methods, and static interface methods.',
            estimatedMinutes: 12,
            difficulty: 'Hard',
            prerequisites: ['java-40-coding-practice'],
            order: 41,
            content: {
              summary: 'Interfaces define contracts specifying what a class must do without dictating how.',
              conceptExplanation: 'All methods in an interface are implicitly `public abstract` (unless marked `default` or `static`). A class uses `implements` to fulfill the interface contract.',
              codeSnippet: `interface PaymentGateway {\n    void processPayment(double amount);\n}\n\nclass StripeGateway implements PaymentGateway {\n    public void processPayment(double amount) {\n        System.out.println("Processing $" + amount + " via Stripe.");\n    }\n}\n\npublic class InterfaceDemo {\n    public static void main(String[] args) {\n        PaymentGateway p = new StripeGateway();\n        p.processPayment(150.0);\n    }\n}`,
              expectedOutput: 'Processing $150.0 via Stripe.',
              keyTakeaways: [
                'Classes can implement multiple interfaces',
                'Fields in interfaces are implicitly public static final'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Interface+Java+Tamil',
              youtubeDuration: '15:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-41-1',
                topicId: 'java-41-interface',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What are the default modifiers for variables declared inside a Java interface?',
                options: ['private final', 'public static final', 'protected', 'package-private'],
                correctOptionIndex: 1,
                explanation: 'All variables declared in an interface are automatically `public static final` constants.'
              }
            ]
          },
          {
            id: 'java-42-multiple-inheritance',
            subjectId: 'java',
            moduleId: 'java-m6',
            title: '42. Multiple Inheritance via Interfaces',
            description: 'How Java achieves clean multiple inheritance by implementing multiple interfaces simultaneously.',
            estimatedMinutes: 12,
            difficulty: 'Hard',
            prerequisites: ['java-41-interface'],
            order: 42,
            content: {
              summary: 'A class in Java can implement multiple interfaces separated by commas: `class Robot implements Printable, Operable`.',
              conceptExplanation: 'This provides the benefits of multiple inheritance without the ambiguity problems of multiple superclasses.',
              codeSnippet: `interface Printable { void print(); }\ninterface Shareable { void share(); }\n\nclass Document implements Printable, Shareable {\n    public void print() { System.out.println("Printing..."); }\n    public void share() { System.out.println("Sharing..."); }\n}`,
              expectedOutput: 'Multiple interface implementation established.',
              keyTakeaways: [
                'class C implements A, B, D {...}',
                'A single class can satisfy multiple independent contracts'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Multiple+Inheritance+Java+Tamil',
              youtubeDuration: '13:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-42-1',
                topicId: 'java-42-multiple-inheritance',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'Can a Java class simultaneously extend one superclass AND implement two interfaces?',
                options: ['No, you must choose either extends or implements', 'Yes: `class Sub extends Super implements Intf1, Intf2`', 'Only in Java 8 and earlier', 'Only if all methods are static'],
                correctOptionIndex: 1,
                explanation: 'Java supports extending a single superclass while implementing any number of interfaces.'
              }
            ]
          },
          {
            id: 'java-43-lambda',
            subjectId: 'java',
            moduleId: 'java-m6',
            title: '43. Lambda Expression',
            description: 'Functional programming in Java: Anonymous functions `(params) -> { body }` and Functional Interfaces (`@FunctionalInterface`).',
            estimatedMinutes: 14,
            difficulty: 'Hard',
            prerequisites: ['java-42-multiple-inheritance'],
            order: 43,
            content: {
              summary: 'Lambda expressions provide concise syntax for implementing single-method functional interfaces.',
              conceptExplanation: 'A Functional Interface has exactly one abstract method (e.g. `Runnable`, `Comparator`, `Consumer`). Lambdas `(a, b) -> a + b` replace verbose anonymous classes.',
              codeSnippet: `interface Greeting {\n    void sayHello(String name);\n}\n\npublic class LambdaDemo {\n    public static void main(String[] args) {\n        Greeting g = (name) -> System.out.println("Hello, " + name + "!");\n        g.sayHello("Java Developer");\n    }\n}`,
              expectedOutput: 'Hello, Java Developer!',
              keyTakeaways: [
                'Lambdas require a Functional Interface with exactly one abstract method',
                'Syntax: (parameters) -> { body }'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Lambda+Expression+Java+Tamil',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-43-1',
                topicId: 'java-43-lambda',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What is a Functional Interface in Java?',
                options: ['An interface with no methods at all', 'An interface that contains exactly one abstract method', 'An interface with only static methods', 'A class with main method'],
                correctOptionIndex: 1,
                explanation: 'A functional interface is any interface with exactly one abstract method (SAM: Single Abstract Method).'
              }
            ]
          }
        ]
      },
      {
        id: 'java-m7',
        subjectId: 'java',
        title: 'Module 7: Exception Handling (Topics 44–49)',
        description: 'try-catch, finally, throw, custom exceptions, practice, and throws keyword for checked exceptions.',
        order: 7,
        topics: [
          {
            id: 'java-44-exception-handling',
            subjectId: 'java',
            moduleId: 'java-m7',
            title: '44. Exception Handling',
            description: 'Runtime errors vs compile errors, Throwable hierarchy, and protecting code with `try-catch` blocks.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['java-43-lambda'],
            order: 44,
            content: {
              summary: 'Exceptions disrupt normal application flow. Try-catch blocks gracefully intercept and handle errors.',
              conceptExplanation: 'Risky code is wrapped in `try`. If an exception occurs, execution transfers immediately to the matching `catch (Exception e)` block without crashing the JVM.',
              codeSnippet: `public class ExceptionDemo {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Caught Error: Division by zero is not permitted.");\n        }\n        System.out.println("Application continues smoothly!");\n    }\n}`,
              expectedOutput: 'Caught Error: Division by zero is not permitted.\nApplication continues smoothly!',
              keyTakeaways: [
                'Throwable -> Exception -> RuntimeException (Unchecked) & Checked Exceptions',
                'try block must be followed by at least one catch or finally block'
              ],
              youtubeVideoId: 'cklET8UVxQI',
              youtubeUrl: 'https://www.youtube.com/watch?v=cklET8UVxQI',
              youtubeDuration: '18:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-44-1',
                topicId: 'java-44-exception-handling',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What happens when an unhandled runtime exception occurs in a Java program?',
                options: ['The program ignores it and continues', 'The JVM terminates the current thread and prints a stack trace', 'The compiler fixes the error automatically', 'The method restarts'],
                correctOptionIndex: 1,
                explanation: 'Unhandled exceptions terminate thread execution and output an error stack trace to System.err.'
              }
            ]
          },
          {
            id: 'java-45-finally',
            subjectId: 'java',
            moduleId: 'java-m7',
            title: '45. `finally` Keyword',
            description: 'Guaranteed execution block for closing resources (Database connections, File Streams, Network Sockets).',
            estimatedMinutes: 10,
            difficulty: 'Medium',
            prerequisites: ['java-44-exception-handling'],
            order: 45,
            content: {
              summary: 'The `finally` block ALWAYS executes whether an exception was thrown, caught, or not.',
              conceptExplanation: 'Used for critical cleanup (releasing database connections, closing file handles). Even if a `return` statement exists in try/catch, finally will execute before returning.',
              codeSnippet: `public class FinallyDemo {\n    public static void main(String[] args) {\n        try {\n            System.out.println("Opening database connection...");\n        } finally {\n            System.out.println("Finally block executed: Connection closed safely.");\n        }\n    }\n}`,
              expectedOutput: 'Opening database connection...\nFinally block executed: Connection closed safely.',
              keyTakeaways: [
                'finally block executes even if try or catch has a return statement',
                'Only System.exit(0) prevents a finally block from executing'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Finally+Keyword+Java+Tamil',
              youtubeDuration: '11:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-45-1',
                topicId: 'java-45-finally',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Under what circumstance will a `finally` block NOT execute in Java?',
                options: ['If an uncaught exception is thrown', 'If System.exit(0) is called before the finally block executes', 'If the try block contains a return statement', 'If no exception occurs'],
                correctOptionIndex: 1,
                explanation: '`System.exit(0)` shuts down the JVM process immediately, bypassing the finally block.'
              }
            ]
          },
          {
            id: 'java-46-throw',
            subjectId: 'java',
            moduleId: 'java-m7',
            title: '46. `throw` Keyword',
            description: 'Explicitly generating and throwing an exception instance: `throw new IllegalArgumentException("Invalid age")`.',
            estimatedMinutes: 10,
            difficulty: 'Medium',
            prerequisites: ['java-45-finally'],
            order: 46,
            content: {
              summary: 'Use `throw` to explicitly trigger an exception when business rules or invalid inputs are violated.',
              conceptExplanation: 'Syntax: `throw new ExceptionType("Error message");`. Instantly interrupts execution and searches for an enclosing catch block.',
              codeSnippet: `public class ThrowDemo {\n    static void checkAge(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException("Age must be 18 or above.");\n        }\n    }\n    public static void main(String[] args) {\n        try {\n            checkAge(15);\n        } catch (IllegalArgumentException e) {\n            System.out.println("Caught: " + e.getMessage());\n        }\n    }\n}`,
              expectedOutput: 'Caught: Age must be 18 or above.',
              keyTakeaways: [
                '`throw` is followed by an instantiated Throwable object',
                'Used for defensive programming and input validation'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Throw+Keyword+Java+Tamil',
              youtubeDuration: '10:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-46-1',
                topicId: 'java-46-throw',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the correct syntax to manually throw an exception in Java?',
                options: ['throws IllegalArgumentException;', 'throw new IllegalArgumentException("Error");', 'catch (IllegalArgumentException e);', 'new throw IllegalArgumentException();'],
                correctOptionIndex: 1,
                explanation: '`throw` followed by `new ExceptionType(message)` is the correct statement to trigger an exception.'
              }
            ]
          },
          {
            id: 'java-47-custom-exception',
            subjectId: 'java',
            moduleId: 'java-m7',
            title: '47. Custom Exception Handling',
            description: 'Creating domain-specific custom exception classes by extending `Exception` or `RuntimeException`.',
            estimatedMinutes: 12,
            difficulty: 'Hard',
            prerequisites: ['java-46-throw'],
            order: 47,
            content: {
              summary: 'Define custom exception classes representing specific business errors (e.g. `InsufficientFundsException`).',
              conceptExplanation: 'Create a class extending `Exception` (for Checked exception) or `RuntimeException` (for Unchecked exception).',
              codeSnippet: `class InsufficientFundsException extends Exception {\n    public InsufficientFundsException(String msg) {\n        super(msg);\n    }\n}\n\npublic class CustomExceptionDemo {\n    public static void main(String[] args) {\n        try {\n            throw new InsufficientFundsException("Account balance below minimum threshold.");\n        } catch (InsufficientFundsException e) {\n            System.out.println("Custom Exception: " + e.getMessage());\n        }\n    }\n}`,
              expectedOutput: 'Custom Exception: Account balance below minimum threshold.',
              keyTakeaways: [
                'Extend Exception for checked exceptions requiring throws declarations',
                'Extend RuntimeException for unchecked exceptions'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Custom+Exception+Handling+Java+Tamil',
              youtubeDuration: '14:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-47-1',
                topicId: 'java-47-custom-exception',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'To create a custom Checked Exception in Java, which base class must your class extend?',
                options: ['java.lang.RuntimeException', 'java.lang.Exception', 'java.lang.Error', 'java.lang.Object'],
                correctOptionIndex: 1,
                explanation: 'Extending `java.lang.Exception` creates a checked exception that the compiler forces callers to handle or declare.'
              }
            ]
          },
          {
            id: 'java-48-exception-practice',
            subjectId: 'java',
            moduleId: 'java-m7',
            title: '48. Exception Handling Practice',
            description: 'Building a robust banking validator with multi-catch blocks, nested tries, and custom error logs.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['java-47-custom-exception'],
            order: 48,
            content: {
              summary: 'Comprehensive practice managing multiple exception types using Java 7+ multi-catch syntax `catch (TypeA | TypeB e)`.',
              conceptExplanation: 'Order catch blocks from most specific subclass to most general superclass (`Exception`).',
              codeSnippet: `public class MultiCatchPractice {\n    public static void main(String[] args) {\n        try {\n            String str = null;\n            System.out.println(str.length());\n        } catch (NullPointerException | ArithmeticException e) {\n            System.out.println("Recovered from: " + e.getClass().getSimpleName());\n        }\n    }\n}`,
              expectedOutput: 'Recovered from: NullPointerException',
              keyTakeaways: [
                'Multi-catch `catch (A | B e)` reduces boilerplate code',
                'Specific exceptions must precede generic Exception catch blocks'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Exception+Handling+Practice+Java+Tamil',
              youtubeDuration: '16:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-48-1',
                topicId: 'java-48-exception-practice',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the correct ordering when catching `Exception` and `NullPointerException` in consecutive catch blocks?',
                options: ['catch (Exception e) must come first', 'catch (NullPointerException e) must come before catch (Exception e)', 'Order does not matter in Java', 'They must be in separate try blocks'],
                correctOptionIndex: 1,
                explanation: 'Subclass exceptions must be caught before superclass `Exception` to avoid unreachable code compilation errors.'
              }
            ]
          },
          {
            id: 'java-49-throws',
            subjectId: 'java',
            moduleId: 'java-m7',
            title: '49. `throws` Keyword',
            description: 'Declaring checked exceptions in method signatures and delegating error handling to the caller.',
            estimatedMinutes: 10,
            difficulty: 'Medium',
            prerequisites: ['java-48-exception-practice'],
            order: 49,
            content: {
              summary: 'The `throws` keyword indicates that a method may cause an exception that must be handled by the calling method.',
              conceptExplanation: 'Placed in method declaration: `void readFile() throws IOException, SQLException`. Alerts callers to handle checked exceptions.',
              codeSnippet: `import java.io.IOException;\n\npublic class ThrowsDemo {\n    static void checkFile() throws IOException {\n        throw new IOException("File not found on disk.");\n    }\n    public static void main(String[] args) {\n        try {\n            checkFile();\n        } catch (IOException e) {\n            System.out.println("Caller handled: " + e.getMessage());\n        }\n    }\n}`,
              expectedOutput: 'Caller handled: File not found on disk.',
              keyTakeaways: [
                '`throws` is used in method signature; `throw` is used in method body',
                'Checked exceptions must either be caught or declared with throws'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Throws+Keyword+Java+Tamil',
              youtubeDuration: '11:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-49-1',
                topicId: 'java-49-throws',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the key grammatical difference between `throw` and `throws` in Java?',
                options: ['`throw` is for classes; `throws` is for methods', '`throw` is used inside a method body to trigger an exception; `throws` is in the method signature to declare potential checked exceptions', 'They are completely interchangeable', '`throws` is deprecated'],
                correctOptionIndex: 1,
                explanation: '`throw` is an action verb in the method body; `throws` is a declaration clause in the method header.'
              }
            ]
          }
        ]
      },
      {
        id: 'java-m8',
        subjectId: 'java',
        title: 'Module 8: File I/O & Multithreading (Topics 50–54)',
        description: 'Writing/reading text files, Threads lifecycle, `join()` synchronization, and Runnable interface.',
        order: 8,
        topics: [
          {
            id: 'java-50-write-file',
            subjectId: 'java',
            moduleId: 'java-m8',
            title: '50. Write to Text File',
            description: 'FileWriter, BufferedWriter, and try-with-resources automatic stream closing.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-49-throws'],
            order: 50,
            content: {
              summary: 'Persist textual data to local storage files using FileWriter and BufferedWriter.',
              conceptExplanation: 'Using `try-with-resources` automatically calls `.close()` on AutoCloseable streams when the block terminates.',
              codeSnippet: `import java.io.FileWriter;\nimport java.io.IOException;\n\npublic class WriteFileDemo {\n    public static void main(String[] args) {\n        try (FileWriter writer = new FileWriter("output.txt")) {\n            writer.write("Topic Solver: Learn Java Step-by-Step!\\n");\n            System.out.println("File written successfully.");\n        } catch (IOException e) {\n            System.out.println("I/O Error: " + e.getMessage());\n        }\n    }\n}`,
              expectedOutput: 'File written successfully.',
              keyTakeaways: [
                'try-with-resources syntax guarantees streams are closed without manual finally blocks',
                'Pass true as second parameter to FileWriter("file.txt", true) to append data'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Write+Text+File+Java+Tamil',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-50-1',
                topicId: 'java-50-write-file',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the main benefit of Java\'s try-with-resources statement (`try (FileWriter fw = new FileWriter(...))`)?',
                options: ['It speeds up file writes by 10x', 'It automatically closes open streams and releases system file handles without an explicit finally block', 'It bypasses checked exceptions', 'It prevents hard drive corruption'],
                correctOptionIndex: 1,
                explanation: 'Any resource implementing `AutoCloseable` is automatically closed at the conclusion of the try-with-resources block.'
              }
            ]
          },
          {
            id: 'java-51-read-file',
            subjectId: 'java',
            moduleId: 'java-m8',
            title: '51. Read from Text File',
            description: 'Reading files line-by-line using Scanner, FileReader, and BufferedReader.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['java-50-write-file'],
            order: 51,
            content: {
              summary: 'Read text streams line-by-line using BufferedReader or Scanner.',
              conceptExplanation: '`BufferedReader.readLine()` buffers disk reads into memory chunks for fast sequential processing.',
              codeSnippet: `import java.io.BufferedReader;\nimport java.io.FileReader;\nimport java.io.IOException;\n\npublic class ReadFileDemo {\n    public static void main(String[] args) {\n        // BufferedReader reads character stream efficiently\n        System.out.println("Read file line-by-line using BufferedReader.readLine()");\n    }\n}`,
              expectedOutput: 'Read file line-by-line using BufferedReader.readLine()',
              keyTakeaways: [
                'BufferedReader is more efficient than FileReader for large files',
                'readLine() returns null when end of file (EOF) is reached'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Read+Text+File+Java+Tamil',
              youtubeDuration: '12:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-51-1',
                topicId: 'java-51-read-file',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What value does `BufferedReader.readLine()` return when it reaches the end of a file (EOF)?',
                options: ['Empty string ""', 'null', '-1', 'EOFException'],
                correctOptionIndex: 1,
                explanation: '`readLine()` returns `null` when the end of the input stream is reached.'
              }
            ]
          },
          {
            id: 'java-52-threads',
            subjectId: 'java',
            moduleId: 'java-m8',
            title: '52. Threads',
            description: 'Concurrent multitasking: Thread class, lifecycle (New, Runnable, Running, Blocked, Terminated), and `start()` vs `run()`.',
            estimatedMinutes: 14,
            difficulty: 'Hard',
            prerequisites: ['java-51-read-file'],
            order: 52,
            content: {
              summary: 'A thread is an independent lightweight path of execution within a Java process.',
              conceptExplanation: 'Extend `Thread` and override `run()`. Calling `.start()` creates a new OS thread and invokes `run()` asynchronously. Calling `.run()` directly executes synchronously on the main thread.',
              codeSnippet: `class WorkerThread extends Thread {\n    public void run() {\n        System.out.println("Worker thread executing asynchronously in parallel!");\n    }\n}\n\npublic class ThreadDemo {\n    public static void main(String[] args) {\n        WorkerThread t = new WorkerThread();\n        t.start(); // Spawns new thread\n    }\n}`,
              expectedOutput: 'Worker thread executing asynchronously in parallel!',
              keyTakeaways: [
                'Always call start() to spawn a thread; never call run() directly',
                'Multithreading utilizes multi-core CPU hardware'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Threads+Java+Tamil',
              youtubeDuration: '15:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-52-1',
                topicId: 'java-52-threads',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What happens if you invoke `thread.run()` directly instead of `thread.start()`?',
                options: ['A new thread is created normally', 'The `run()` method executes synchronously on the current calling thread without starting a new thread', 'Compilation error', 'JVM crash'],
                correctOptionIndex: 1,
                explanation: 'Calling `run()` directly is just a regular method call on the main thread. `start()` is required to allocate a new OS execution thread.'
              }
            ]
          },
          {
            id: 'java-53-join-method',
            subjectId: 'java',
            moduleId: 'java-m8',
            title: '53. `join()` Method in Threads',
            description: 'Thread synchronization: pausing the current thread until the target thread finishes execution.',
            estimatedMinutes: 12,
            difficulty: 'Hard',
            prerequisites: ['java-52-threads'],
            order: 53,
            content: {
              summary: 'The `join()` method forces the calling thread to wait until the referenced thread terminates.',
              conceptExplanation: 'Ensures thread execution sequencing (e.g. main thread waits for background data fetch thread to complete before printing summary).',
              codeSnippet: `class TaskThread extends Thread {\n    public void run() {\n        System.out.println("Task completed.");\n    }\n}\n\npublic class JoinDemo {\n    public static void main(String[] args) throws InterruptedException {\n        TaskThread t1 = new TaskThread();\n        t1.start();\n        t1.join(); // Main thread pauses until t1 finishes\n        System.out.println("Main thread resumes after t1 is done.");\n    }\n}`,
              expectedOutput: 'Task completed.\nMain thread resumes after t1 is done.',
              keyTakeaways: [
                'join() throws InterruptedException which must be caught or declared',
                'Used to synchronize dependent asynchronous tasks'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Join+Method+Threads+Java+Tamil',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-53-1',
                topicId: 'java-53-join-method',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the primary function of calling `t1.join()` from the main thread in Java?',
                options: ['It terminates thread t1 immediately', 'It halts the main thread until thread t1 completes its execution', 'It pauses thread t1 forever', 'It restarts thread t1'],
                correctOptionIndex: 1,
                explanation: '`t1.join()` blocks the calling thread until `t1` completes its execution.'
              }
            ]
          },
          {
            id: 'java-54-runnable',
            subjectId: 'java',
            moduleId: 'java-m8',
            title: '54. Threads using Runnable Interface',
            description: 'Modern concurrency: implementing `Runnable`, Thread pools, and separating tasks from Thread execution.',
            estimatedMinutes: 14,
            difficulty: 'Hard',
            prerequisites: ['java-53-join-method'],
            order: 54,
            content: {
              summary: 'Implementing `Runnable` is the preferred way to define concurrent tasks, allowing your class to extend other superclasses.',
              conceptExplanation: 'Pass a `Runnable` lambda or instance to `new Thread(runnable).start()`. Separates the task logic from thread lifecycle management.',
              codeSnippet: `public class RunnableDemo {\n    public static void main(String[] args) {\n        Runnable task = () -> {\n            System.out.println("Runnable task executing via lambda expression!");\n        };\n        Thread t = new Thread(task);\n        t.start();\n    }\n}`,
              expectedOutput: 'Runnable task executing via lambda expression!',
              keyTakeaways: [
                'Implementing Runnable preserves single inheritance capabilities',
                'Compatible with ExecutorService thread pools and Lambda expressions'
              ],
              youtubeUrl: 'https://www.youtube.com/results?search_query=Error+Makes+Clever+Runnable+Threads+Java+Tamil',
              youtubeDuration: '14:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-java-54-1',
                topicId: 'java-54-runnable',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'Why is implementing `Runnable` generally preferred over extending `Thread` in Java?',
                options: ['Runnable is faster', 'Java only allows single class inheritance; implementing Runnable keeps the class free to extend another class and decouples task from thread runner', 'Thread class is deprecated', 'Runnable runs on GPU'],
                correctOptionIndex: 1,
                explanation: 'Implementing `Runnable` preserves single class inheritance for your domain models and decouples the executable task from the Thread execution mechanism.'
              }
            ]
          }
        ]
      }
    ]
  },

  python: {
    id: 'python',
    title: 'Python Mastery',
    tagline: 'From Dynamic Syntax & Lists to Functions, Dicts & OOP',
    description: 'Learn idiomatic Python with adaptive learning. Master 27 comprehensive topics including variables, control flow, loops, data structures, functions, lambdas, and object-oriented programming.',
    iconName: 'Code',
    color: '#3776AB',
    bgGlow: 'from-blue-500/20 to-yellow-500/10',
    totalTopics: 27,
    modules: [
      {
        id: 'py-m1',
        subjectId: 'python',
        title: 'Module 1: Python Core Syntax & Conditionals (Topics 01–07)',
        description: 'Introduction, variables, data types, type casting, user input, if-else, and conditional branching.',
        order: 1,
        topics: [
          {
            id: 'py-01-intro',
            subjectId: 'python',
            moduleId: 'py-m1',
            title: '01. Introduction to Python',
            description: 'Understanding Python architecture, interpreted vs compiled execution, and writing your first script.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: [],
            order: 1,
            content: {
              summary: 'Python is a high-level, interpreted, dynamically-typed programming language emphasizing code readability.',
              conceptExplanation: 'Python code is interpreted line by line at runtime by CPython into bytecode. It is renowned for concise syntax and rapid prototyping.',
              codeSnippet: 'print("Welcome to Python Programming with Topic Solver!")',
              expectedOutput: 'Welcome to Python Programming with Topic Solver!',
              keyTakeaways: [
                'Interpreted execution eliminates explicit compilation steps',
                'Indentation is mandatory and defines code blocks in Python',
                'Extensive standard library enables battery-included development'
              ],
              youtubeVideoId: 'BVIoAILnZ4Q',
              youtubeUrl: 'https://www.youtube.com/watch?v=BVIoAILnZ4Q',
              youtubeDuration: '10:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-01-1',
                topicId: 'py-01-intro',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'How are code blocks (scopes) demarcated in Python?',
                options: ['Curly braces {}', 'Consistent whitespace indentation', 'BEGIN and END keywords', 'Semicolons ;'],
                correctOptionIndex: 1,
                explanation: 'Python uses consistent whitespace indentation instead of braces to delineate block scope.'
              }
            ]
          },
          {
            id: 'py-02-variables',
            subjectId: 'python',
            moduleId: 'py-m1',
            title: '02. Variables & Data Types',
            description: 'Dynamically-typed variables, integers, floats, strings, booleans, and memory references.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-01-intro'],
            order: 2,
            content: {
              summary: 'Variables reference objects in memory without explicit data type declarations.',
              conceptExplanation: 'Python automatically assigns data types at runtime. Primitive types include int, float, str, and bool.',
              codeSnippet: 'name = "AniNova"\nage = 21\ngpa = 3.92\nis_enrolled = True\nprint(f"Student {name} ({age}) - GPA: {gpa}")',
              expectedOutput: 'Student AniNova (21) - GPA: 3.92',
              keyTakeaways: [
                'No type declaration required on variable assignment',
                'f-strings provide clean inline string interpolation',
                'Variables are references pointing to memory objects'
              ],
              youtubeVideoId: 'Rtmgt2Qfqr4',
              youtubeUrl: 'https://www.youtube.com/watch?v=Rtmgt2Qfqr4',
              youtubeDuration: '12:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-02-1',
                topicId: 'py-02-variables',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of x = 5; x = "hello"; print(type(x))?',
                options: ['<class "int">', '<class "str">', 'SyntaxError', '<class "object">'],
                correctOptionIndex: 1,
                explanation: 'Variables in Python are dynamically typed and can re-bind to values of any type at runtime.'
              }
            ]
          },
          {
            id: 'py-03-casting',
            subjectId: 'python',
            moduleId: 'py-m1',
            title: '03. Type Casting & Conversion',
            description: 'Implicit vs explicit type conversion using int(), float(), str(), and bool() functions.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: ['py-02-variables'],
            order: 3,
            content: {
              summary: 'Type casting explicitly converts a value from one data type to another.',
              conceptExplanation: 'int("25") parses numeric strings into integers. float(10) yields 10.0. str(100) serializes numbers into strings.',
              codeSnippet: 'raw_score = "95"\nscore = int(raw_score) + 5\nprint("Total score:", score)',
              expectedOutput: 'Total score: 100',
              keyTakeaways: [
                'int() truncates floating point values towards zero',
                'Invalid numeric strings raise ValueError on int() conversion',
                'Empty collections or zero evaluate to False in bool() casting'
              ],
              youtubeVideoId: 'rqkkd-h087A',
              youtubeUrl: 'https://www.youtube.com/watch?v=rqkkd-h087A',
              youtubeDuration: '09:40'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-03-1',
                topicId: 'py-03-casting',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What does int(7.89) evaluate to in Python?',
                options: ['8', '7', '7.0', 'ValueError'],
                correctOptionIndex: 1,
                explanation: 'int() truncates the fractional part, yielding 7.'
              }
            ]
          },
          {
            id: 'py-04-user-input',
            subjectId: 'python',
            moduleId: 'py-m1',
            title: '04. User Input',
            description: 'Reading console inputs using input() and parsing typed responses into appropriate types.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: ['py-03-casting'],
            order: 4,
            content: {
              summary: 'The input() function reads keyboard input from the user as a string.',
              conceptExplanation: 'Always wrap input() in int() or float() when numeric inputs are expected.',
              codeSnippet: '# Simulation of user input:\nuser_input = "25"\nage = int(user_input)\nprint(f"You will be {age + 1} next year.")',
              expectedOutput: 'You will be 26 next year.',
              keyTakeaways: [
                'input() always returns a string (str)',
                'Cast to int/float immediately when arithmetic is required'
              ],
              youtubeVideoId: 'eYtf9a8LoIg',
              youtubeUrl: 'https://www.youtube.com/watch?v=eYtf9a8LoIg',
              youtubeDuration: '11:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-04-1',
                topicId: 'py-04-user-input',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the return type of input("Enter number: ") before casting?',
                options: ['int', 'float', 'str', 'None'],
                correctOptionIndex: 2,
                explanation: 'input() in Python 3 unconditionally returns a string (str).'
              }
            ]
          },
          {
            id: 'py-05-if-else',
            subjectId: 'python',
            moduleId: 'py-m1',
            title: '05. If Else Conditional Statements',
            description: 'Logical predicates, comparison operators (==, !=, <, >), and if/else branching.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-04-user-input'],
            order: 5,
            content: {
              summary: 'Control execution flow using conditional predicates and if-else branches.',
              conceptExplanation: 'Condition evaluation uses Python truthiness. Indented blocks execute when predicates evaluate to True.',
              codeSnippet: 'marks = 85\nif marks >= 50:\n    print("Status: Passed")\nelse:\n    print("Status: Failed")',
              expectedOutput: 'Status: Passed',
              keyTakeaways: [
                'Colons : are mandatory after if/else headers',
                'Comparison == tests value equality, while is tests object identity'
              ],
              youtubeVideoId: 'TQTnqQ6CypM',
              youtubeUrl: 'https://www.youtube.com/watch?v=TQTnqQ6CypM',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-05-1',
                topicId: 'py-05-if-else',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which operator tests whether two variables point to the same memory object in Python?',
                options: ['==', 'is', 'equals', '==='],
                correctOptionIndex: 1,
                explanation: 'The is keyword tests identity (same memory address), whereas == tests equality of values.'
              }
            ]
          },
          {
            id: 'py-06-nested-if',
            subjectId: 'python',
            moduleId: 'py-m1',
            title: '06. Else If & Nested If Statements',
            description: 'Multi-branch decision logic with elif chains and nested conditionals.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-05-if-else'],
            order: 6,
            content: {
              summary: 'Chain multiple decision paths using elif clauses in top-to-bottom priority order.',
              conceptExplanation: 'Only the first matching elif block executes. Use logical operators and, or, and not for composite conditions.',
              codeSnippet: 'score = 92\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\nprint(f"Final Grade: {grade}")',
              expectedOutput: 'Final Grade: A',
              keyTakeaways: [
                'elif avoids deeply nested if-else ladders',
                'Python evaluates compound boolean chains with short-circuit evaluation'
              ],
              youtubeVideoId: 'KYmMV9tABjU',
              youtubeUrl: 'https://www.youtube.com/watch?v=KYmMV9tABjU',
              youtubeDuration: '12:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-06-1',
                topicId: 'py-06-nested-if',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is printed if x = 15 and if x > 10 and x < 20: print("In Range")?',
                options: ['In Range', 'Nothing', 'SyntaxError', 'False'],
                correctOptionIndex: 0,
                explanation: 'Both predicates evaluate to True (15 > 10 and 15 < 20), printing "In Range".'
              }
            ]
          },
          {
            id: 'py-07-mini-challenge-1',
            subjectId: 'python',
            moduleId: 'py-m1',
            title: '07. Coding Challenge 1 — Conditionals',
            description: 'Hands-on practice: Building a discount calculator, leap year checker, and BMI category evaluator.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['py-06-nested-if'],
            order: 7,
            content: {
              summary: 'Synthesize variables, input conversion, and compound conditionals to solve real-world problems.',
              conceptExplanation: 'Apply boundary testing and defensive input checks across logical branching structures.',
              codeSnippet: 'year = 2024\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint(f"{year} Leap Year: {is_leap}")',
              expectedOutput: '2024 Leap Year: True',
              keyTakeaways: [
                'Parentheses make composite logical conditions readable',
                'Test boundary cases (e.g. leap years like 1900 vs 2000)'
              ],
              youtubeVideoId: 'hqD4pfTPAMk',
              youtubeUrl: 'https://www.youtube.com/watch?v=hqD4pfTPAMk',
              youtubeDuration: '14:50'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-07-1',
                topicId: 'py-07-mini-challenge-1',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Why is the year 1900 NOT a leap year in the Gregorian calendar?',
                options: ['It is divisible by 4', 'Centurial years must be divisible by 400', 'It was a leap year', 'None of the above'],
                correctOptionIndex: 1,
                explanation: 'Years ending in 00 are only leap years if they are evenly divisible by 400 (e.g., 2000 is leap, 1900 is not).'
              }
            ]
          }
        ]
      },
      {
        id: 'py-m2',
        subjectId: 'python',
        title: 'Module 2: Loops, Iterations & Sequences (Topics 08–14)',
        description: 'For loops, while loops, range generator, break, continue, nested loops, and string slicing.',
        order: 2,
        topics: [
          {
            id: 'py-08-for-loop',
            subjectId: 'python',
            moduleId: 'py-m2',
            title: '08. For Loop & Range Function',
            description: 'Iterating sequences with for-in, range(start, stop, step), and accumulator patterns.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-07-mini-challenge-1'],
            order: 8,
            content: {
              summary: 'For loops iterate over elements in sequences or integer ranges generated by range().',
              conceptExplanation: 'range(1, 6) generates integers 1 through 5. range(start, stop, step) steps by custom increments.',
              codeSnippet: 'total = 0\nfor num in range(1, 6):\n    total += num\nprint("Sum 1..5:", total)',
              expectedOutput: 'Sum 1..5: 15',
              keyTakeaways: [
                'range(stop) excludes the stop boundary',
                'for loops naturally terminate without manual index management'
              ],
              youtubeVideoId: 'zwM_9R37pyo',
              youtubeUrl: 'https://www.youtube.com/watch?v=zwM_9R37pyo',
              youtubeDuration: '11:40'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-08-1',
                topicId: 'py-08-for-loop',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What are the elements generated by range(2, 10, 3)?',
                options: ['[2, 5, 8]', '[2, 5, 8, 10]', '[3, 6, 9]', '[2, 4, 6, 8]'],
                correctOptionIndex: 0,
                explanation: 'Starting at 2 and stepping by 3 produces 2, 5, 8 (11 exceeds stop=10).'
              }
            ]
          },
          {
            id: 'py-09-while-loop',
            subjectId: 'python',
            moduleId: 'py-m2',
            title: '09. While Loop',
            description: 'Condition-driven repetition, loop guards, accumulator updates, and preventing infinite loops.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-08-for-loop'],
            order: 9,
            content: {
              summary: 'While loops repeatedly execute code as long as their condition evaluates to True.',
              conceptExplanation: 'Ensure state modification inside the while loop body to guarantee loop termination.',
              codeSnippet: 'count = 3\nwhile count > 0:\n    print(f"Countdown: {count}")\n    count -= 1\nprint("Blast off!")',
              expectedOutput: 'Countdown: 3\nCountdown: 2\nCountdown: 1\nBlast off!',
              keyTakeaways: [
                'Always ensure a termination condition is reachable',
                'While loops are ideal when iteration count is not predetermined'
              ],
              youtubeVideoId: 'WMh9yACCYwI',
              youtubeUrl: 'https://www.youtube.com/watch?v=WMh9yACCYwI',
              youtubeDuration: '10:50'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-09-1',
                topicId: 'py-09-while-loop',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'How many times does while x < 3: execute if x = 0 and increments by 1 each iteration?',
                options: ['2', '3', '4', 'Infinite'],
                correctOptionIndex: 1,
                explanation: 'Executes for x=0, x=1, x=2 — exactly 3 times before terminating at x=3.'
              }
            ]
          },
          {
            id: 'py-10-loop-control',
            subjectId: 'python',
            moduleId: 'py-m2',
            title: '10. Break, Continue & Pass',
            description: 'Altering loop control: early termination with break, skipping iterations with continue, and pass placeholder.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-09-while-loop'],
            order: 10,
            content: {
              summary: 'break exits the loop immediately. continue skips to the next iteration. pass serves as a syntactic no-op.',
              conceptExplanation: 'for-else blocks execute only if the loop terminates normally without encountering a break statement.',
              codeSnippet: 'for n in range(1, 6):\n    if n == 3:\n        continue\n    if n == 5:\n        break\n    print(n, end=" ")',
              expectedOutput: '1 2 4 ',
              keyTakeaways: [
                'continue skips the remainder of the current loop iteration',
                'break halts the innermost enclosing loop entirely',
                'pass fulfills Python grammar where statements are required'
              ],
              youtubeVideoId: 'ChMbB1TC0BE',
              youtubeUrl: 'https://www.youtube.com/watch?v=ChMbB1TC0BE',
              youtubeDuration: '09:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-10-1',
                topicId: 'py-10-loop-control',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the purpose of the pass statement in Python?',
                options: ['Exits the function', 'A placeholder statement that does nothing', 'Skips to next loop cycle', 'Restarts the loop'],
                correctOptionIndex: 1,
                explanation: 'pass is a null statement used as a syntactic placeholder where code is required.'
              }
            ]
          },
          {
            id: 'py-11-nested-loops',
            subjectId: 'python',
            moduleId: 'py-m2',
            title: '11. Nested Loops',
            description: 'Multi-dimensional iterations, 2D coordinates, and algorithmic time complexity (O(N^2)).',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['py-10-loop-control'],
            order: 11,
            content: {
              summary: 'Loops placed inside another loop enable traversing 2D matrices and generating combinations.',
              conceptExplanation: 'For each single iteration of the outer loop, the inner loop completes its entire cycle.',
              codeSnippet: 'for row in range(1, 3):\n    for col in range(1, 4):\n        print(f"({row},{col})", end=" ")\n    print()',
              expectedOutput: '(1,1) (1,2) (1,3) \n(2,1) (2,2) (2,3) ',
              keyTakeaways: [
                'Total iterations = outer_count * inner_count',
                'Beware of algorithmic complexity when nesting loops deeply'
              ],
              youtubeVideoId: 'wuKfqoPsf7E',
              youtubeUrl: 'https://www.youtube.com/watch?v=wuKfqoPsf7E',
              youtubeDuration: '13:10'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-11-1',
                topicId: 'py-11-nested-loops',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'How many times does the inner body execute for for i in range(3): for j in range(4):?',
                options: ['7', '12', '10', '9'],
                correctOptionIndex: 1,
                explanation: '3 outer iterations * 4 inner iterations = 12 total inner executions.'
              }
            ]
          },
          {
            id: 'py-12-pattern-printing',
            subjectId: 'python',
            moduleId: 'py-m2',
            title: '12. Pattern Printing in Python',
            description: 'Printing right triangles, pyramids, diamond patterns, and number matrices with loops.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['py-11-nested-loops'],
            order: 12,
            content: {
              summary: 'Develop structured logic by printing geometric character matrices and pyramids.',
              conceptExplanation: 'String multiplication * simplifies row generation: print("*" * i).',
              codeSnippet: 'for i in range(1, 5):\n    print("*" * i)',
              expectedOutput: '*\n**\n***\n****',
              keyTakeaways: [
                'Python strings support multiplication: "A" * 3 -> "AAA"',
                'Calculate leading whitespace for centered pyramid patterns'
              ],
              youtubeVideoId: 'Np3fzqoaYQw',
              youtubeUrl: 'https://www.youtube.com/watch?v=Np3fzqoaYQw',
              youtubeDuration: '15:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-12-1',
                topicId: 'py-12-pattern-printing',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of print("#" * 4) in Python?',
                options: ['####', '####\n', 'Error', '#4'],
                correctOptionIndex: 0,
                explanation: 'String multiplication repeats the string character 4 times, printing ####.'
              }
            ]
          },
          {
            id: 'py-13-strings-slicing',
            subjectId: 'python',
            moduleId: 'py-m2',
            title: '13. String Indexing & Slicing',
            description: 'Positive/negative indexing, substring extraction [start:stop:step], and string immutability.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['py-12-pattern-printing'],
            order: 13,
            content: {
              summary: 'Strings are immutable sequences of Unicode characters supporting slicing operations.',
              conceptExplanation: 'Negative index -1 references the last character. s[::-1] reverses a string.',
              codeSnippet: 'text = "TopicSolver"\nprint("First 5:", text[:5])\nprint("Reversed:", text[::-1])',
              expectedOutput: 'First 5: Topic\nReversed: revloScipoT',
              keyTakeaways: [
                'Strings cannot be modified in place (immutable)',
                'Slicing creates new string instances efficiently'
              ],
              youtubeVideoId: 'hvmduOeCh4o',
              youtubeUrl: 'https://www.youtube.com/watch?v=hvmduOeCh4o',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-13-1',
                topicId: 'py-13-strings-slicing',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is returned by "Python"[1:4]?',
                options: ['"Pyth"', '"yth"', '"ytho"', '"Pyt"'],
                correctOptionIndex: 1,
                explanation: 'Index 1 is y, index 2 is t, index 3 is h. Stop index 4 is excluded.'
              }
            ]
          },
          {
            id: 'py-14-string-methods',
            subjectId: 'python',
            moduleId: 'py-m2',
            title: '14. Essential String Methods',
            description: 'upper(), lower(), strip(), split(), join(), replace(), find(), and count() methods.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-13-strings-slicing'],
            order: 14,
            content: {
              summary: 'Master built-in string methods for formatting, sanitation, and tokenization.',
              conceptExplanation: 'split(",") converts comma-separated text into a list. ", ".join(list) converts list items into text.',
              codeSnippet: 'raw = "  apple,banana,mango  "\nfruits = [f.strip().upper() for f in raw.split(",")]\nprint("Cleaned:", ", ".join(fruits))',
              expectedOutput: 'Cleaned: APPLE, BANANA, MANGO',
              keyTakeaways: [
                'strip() removes leading and trailing whitespace',
                'join() is the fast, idiomatic way to concatenate sequence strings'
              ],
              youtubeVideoId: 'Gb1oZy6kAWA',
              youtubeUrl: 'https://www.youtube.com/watch?v=Gb1oZy6kAWA',
              youtubeDuration: '14:10'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-14-1',
                topicId: 'py-14-string-methods',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What does "hello world".split() return by default?',
                options: ['["h", "e", "l", "l", "o", ...]', '["hello", "world"]', '"helloworld"', '("hello", "world")'],
                correctOptionIndex: 1,
                explanation: 'split() without arguments splits strings on whitespace boundaries into a list of words.'
              }
            ]
          }
        ]
      },
      {
        id: 'py-m3',
        subjectId: 'python',
        title: 'Module 3: Data Structures & Collections (Topics 15–20)',
        description: 'Lists, list methods, Tuples, Sets, Dictionaries, and dict operations.',
        order: 3,
        topics: [
          {
            id: 'py-15-lists',
            subjectId: 'python',
            moduleId: 'py-m3',
            title: '15. Python Lists',
            description: 'Mutable ordered sequences, heterogeneous elements, appending, indexing, and slicing.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['py-14-string-methods'],
            order: 15,
            content: {
              summary: 'Lists are dynamic, mutable ordered collections storing heterogeneous items.',
              conceptExplanation: 'Lists are enclosed in square brackets [] and allow in-place element reassignment.',
              codeSnippet: 'fruits = ["Apple", "Banana", "Cherry"]\nfruits[1] = "Blueberry"\nfruits.append("Date")\nprint(fruits)',
              expectedOutput: "['Apple', 'Blueberry', 'Cherry', 'Date']",
              keyTakeaways: [
                'Lists are mutable and maintain insertion order',
                'append() adds elements to the end in O(1) amortized time'
              ],
              youtubeVideoId: 'XCDDWb71Zr8',
              youtubeUrl: 'https://www.youtube.com/watch?v=XCDDWb71Zr8',
              youtubeDuration: '13:40'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-15-1',
                topicId: 'py-15-lists',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Are Python lists mutable or immutable?',
                options: ['Immutable', 'Mutable', 'Read-only', 'Static'],
                correctOptionIndex: 1,
                explanation: 'Lists in Python are mutable: elements can be modified, appended, and removed in place.'
              }
            ]
          },
          {
            id: 'py-16-list-methods',
            subjectId: 'python',
            moduleId: 'py-m3',
            title: '16. List Methods & Operations',
            description: 'insert(), remove(), pop(), sort(), reverse(), extend(), and list comprehensions.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['py-15-lists'],
            order: 16,
            content: {
              summary: 'Perform operations on lists: sorting, reversing, removing elements by index or value.',
              conceptExplanation: 'pop() removes and returns the last element. sort() sorts in place, while sorted() returns a new list.',
              codeSnippet: 'nums = [5, 2, 8, 1, 9]\nnums.sort()\nlast = nums.pop()\nprint("Sorted:", nums, "Popped:", last)',
              expectedOutput: 'Sorted: [1, 2, 5, 8] Popped: 9',
              keyTakeaways: [
                'sort() modifies the list in place; sorted() creates a new list',
                'List comprehensions offer faster execution than manual append loops'
              ],
              youtubeVideoId: 'rltSHY2Y7-c',
              youtubeUrl: 'https://www.youtube.com/watch?v=rltSHY2Y7-c',
              youtubeDuration: '14:25'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-16-1',
                topicId: 'py-16-list-methods',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of [x * 2 for x in range(3)]?',
                options: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[1, 2, 3]'],
                correctOptionIndex: 0,
                explanation: 'For x in [0, 1, 2], multiplying by 2 yields [0, 2, 4].'
              }
            ]
          },
          {
            id: 'py-17-tuples',
            subjectId: 'python',
            moduleId: 'py-m3',
            title: '17. Python Tuples',
            description: 'Immutable sequences, tuple unpacking, memory efficiency, and using tuples as dictionary keys.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-16-list-methods'],
            order: 17,
            content: {
              summary: 'Tuples are ordered, immutable collections defined with parentheses ().',
              conceptExplanation: 'Because tuples cannot be changed, they are faster than lists and hashable for dictionary keys.',
              codeSnippet: 'point = (10, 20)\nx, y = point  # Tuple unpacking\nprint(f"X: {x}, Y: {y}")',
              expectedOutput: 'X: 10, Y: 20',
              keyTakeaways: [
                'Tuples are immutable: attempting to assign t[0] = 5 raises TypeError',
                'Tuple unpacking allows multi-variable assignment in a single line'
              ],
              youtubeVideoId: 'K3HD0gJXJYQ',
              youtubeUrl: 'https://www.youtube.com/watch?v=K3HD0gJXJYQ',
              youtubeDuration: '11:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-17-1',
                topicId: 'py-17-tuples',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which syntax creates a valid single-element tuple in Python?',
                options: ['(5)', '(5,)', '[5]', '{5}'],
                correctOptionIndex: 1,
                explanation: 'A trailing comma (5,) is required to distinguish a single-element tuple from parenthesized integer arithmetic.'
              }
            ]
          },
          {
            id: 'py-18-sets',
            subjectId: 'python',
            moduleId: 'py-m3',
            title: '18. Python Sets & Set Operations',
            description: 'Unordered unique collections, union, intersection, difference, and O(1) membership testing.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['py-17-tuples'],
            order: 18,
            content: {
              summary: 'Sets store unique, unordered elements and provide mathematical set algebra.',
              conceptExplanation: 'Sets eliminate duplicates automatically. a & b finds intersection; a | b computes union.',
              codeSnippet: 'dev_skills = {"Python", "SQL", "Git"}\nai_skills = {"Python", "PyTorch", "Math"}\ncommon = dev_skills & ai_skills\nprint("Common skills:", common)',
              expectedOutput: "Common skills: {'Python'}",
              keyTakeaways: [
                'Sets automatically remove duplicates',
                'Membership testing x in my_set runs in O(1) average time'
              ],
              youtubeVideoId: 'PJxwAJdWpVY',
              youtubeUrl: 'https://www.youtube.com/watch?v=PJxwAJdWpVY',
              youtubeDuration: '12:50'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-18-1',
                topicId: 'py-18-sets',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the length of len(set([1, 2, 2, 3, 3, 3]))?',
                options: ['6', '3', '1', 'TypeError'],
                correctOptionIndex: 1,
                explanation: 'Sets deduplicate entries, resulting in {1, 2, 3} with length 3.'
              }
            ]
          },
          {
            id: 'py-19-dictionaries',
            subjectId: 'python',
            moduleId: 'py-m3',
            title: '19. Python Dictionaries',
            description: 'Key-value associative mapping, O(1) lookup speed, dict syntax, and nested dictionaries.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['py-18-sets'],
            order: 19,
            content: {
              summary: 'Dictionaries store key-value associations with fast hash table lookups.',
              conceptExplanation: 'Keys must be immutable types (strings, numbers, tuples). Values can be any data type.',
              codeSnippet: 'student = {"name": "Maya", "track": "Python", "streak": 7}\nstudent["level"] = "Intermediate"\nprint(student["name"], "is on streak:", student["streak"])',
              expectedOutput: 'Maya is on streak: 7',
              keyTakeaways: [
                'Dict keys must be hashable and unique',
                'Access values via dict[key] or safely with dict.get(key, default)'
              ],
              youtubeVideoId: 'u2xA51-7WHE',
              youtubeUrl: 'https://www.youtube.com/watch?v=u2xA51-7WHE',
              youtubeDuration: '15:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-19-1',
                topicId: 'py-19-dictionaries',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which data type CANNOT be used as a dictionary key in Python?',
                options: ['str (String)', 'int (Integer)', 'list (List)', 'tuple (Tuple)'],
                correctOptionIndex: 2,
                explanation: 'Lists are mutable and unhashable, so they cannot be used as dictionary keys.'
              }
            ]
          },
          {
            id: 'py-20-dict-methods',
            subjectId: 'python',
            moduleId: 'py-m3',
            title: '20. Dictionary Methods & Iterations',
            description: 'keys(), values(), items(), update(), pop(), and dictionary comprehensions.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['py-19-dictionaries'],
            order: 20,
            content: {
              summary: 'Iterate across dictionary entries and transform data using dictionary comprehensions.',
              conceptExplanation: 'for k, v in d.items() iterates key-value pairs simultaneously.',
              codeSnippet: 'scores = {"Alice": 85, "Bob": 92, "Charlie": 78}\ntop_scorers = {k: v for k, v in scores.items() if v >= 90}\nprint("Top scorers:", top_scorers)',
              expectedOutput: "Top scorers: {'Bob': 92}",
              keyTakeaways: [
                'items() yields (key, value) tuple pairs during iteration',
                'dict.get(key, default) prevents unhandled KeyError crashes'
              ],
              youtubeVideoId: '5AKE_lm_XTI',
              youtubeUrl: 'https://www.youtube.com/watch?v=5AKE_lm_XTI',
              youtubeDuration: '13:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-20-1',
                topicId: 'py-20-dict-methods',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What does d.get("unknown", "default") return if "unknown" is not in dict d?',
                options: ['None', '"default"', 'KeyError', 'False'],
                correctOptionIndex: 1,
                explanation: 'get() returns the provided fallback value "default" instead of raising an exception.'
              }
            ]
          }
        ]
      },
      {
        id: 'py-m4',
        subjectId: 'python',
        title: 'Module 4: Functions, Modules & OOP (Topics 21–27)',
        description: 'Functions, parameters, return keyword, *args, **kwargs, lambdas, classes, and inheritance.',
        order: 4,
        topics: [
          {
            id: 'py-21-functions',
            subjectId: 'python',
            moduleId: 'py-m4',
            title: '21. Functions in Python',
            description: 'Defining reusable procedures with def, function invocation, docstrings, and modular code design.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-20-dict-methods'],
            order: 21,
            content: {
              summary: 'Functions encapsulate reusable code logic that can be invoked with arguments.',
              conceptExplanation: 'Define functions using the def keyword. Use descriptive verb names and docstrings.',
              codeSnippet: 'def greet_user(name):\n    """Print a personalized greeting."""\n    print(f"Welcome back, {name}!")\n\ngreet_user("Aria")',
              expectedOutput: 'Welcome back, Aria!',
              keyTakeaways: [
                'Functions promote code reuse and separation of concerns',
                'Functions without explicit return return None by default'
              ],
              youtubeVideoId: 'oVypM2Ld1PA',
              youtubeUrl: 'https://www.youtube.com/watch?v=oVypM2Ld1PA',
              youtubeDuration: '12:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-21-1',
                topicId: 'py-21-functions',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What does a Python function return if it lacks a return statement?',
                options: ['0', 'None', 'False', 'Undefined'],
                correctOptionIndex: 1,
                explanation: 'Python functions return None by default when no explicit return statement is encountered.'
              }
            ]
          },
          {
            id: 'py-22-function-params',
            subjectId: 'python',
            moduleId: 'py-m4',
            title: '22. Function Parameters & Arguments',
            description: 'Positional arguments, keyword arguments, and default parameter values.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-21-functions'],
            order: 22,
            content: {
              summary: 'Pass data into functions via positional or named keyword arguments with default fallbacks.',
              conceptExplanation: 'Default arguments must appear after positional arguments in function signatures.',
              codeSnippet: 'def calculate_bill(amount, tax_rate=0.08):\n    return round(amount * (1 + tax_rate), 2)\n\nprint("Total:", calculate_bill(100))',
              expectedOutput: 'Total: 108.0',
              keyTakeaways: [
                'Positional arguments match parameter order',
                'Never use mutable default arguments like def f(x=[])'
              ],
              youtubeVideoId: 'tEzYlonaKYs',
              youtubeUrl: 'https://www.youtube.com/watch?v=tEzYlonaKYs',
              youtubeDuration: '11:40'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-22-1',
                topicId: 'py-22-function-params',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why is def append_item(item, target=[]) considered a bad practice in Python?',
                options: ['SyntaxError on compilation', 'The default list is created once and shared across all invocations', 'Default arguments cannot be lists', 'Functions cannot accept lists'],
                correctOptionIndex: 1,
                explanation: 'Default arguments are evaluated once at definition time, so mutable objects are shared across calls.'
              }
            ]
          },
          {
            id: 'py-23-return-keyword',
            subjectId: 'python',
            moduleId: 'py-m4',
            title: '23. Return Keyword & Multiple Return Values',
            description: 'Yielding values to the caller, returning tuples, and early function termination.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['py-22-function-params'],
            order: 23,
            content: {
              summary: 'The return statement exits a function and passes results back to the caller.',
              conceptExplanation: 'Python functions can return multiple comma-separated values, which are packed as a tuple.',
              codeSnippet: 'def min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([4, 1, 9, 2, 7])\nprint(f"Min: {low}, Max: {high}")',
              expectedOutput: 'Min: 1, Max: 9',
              keyTakeaways: [
                'Code after an executed return is unreachable',
                'Multiple returns are unpacked cleanly via tuple assignment'
              ],
              youtubeVideoId: 'CxLFjJHkWLI',
              youtubeUrl: 'https://www.youtube.com/watch?v=CxLFjJHkWLI',
              youtubeDuration: '10:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-23-1',
                topicId: 'py-23-return-keyword',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the return type of def f(): return 1, 2, 3?',
                options: ['list', 'tuple', 'set', 'int'],
                correctOptionIndex: 1,
                explanation: 'Returning comma-separated values in Python automatically packs them into a tuple.'
              }
            ]
          },
          {
            id: 'py-24-args-kwargs',
            subjectId: 'python',
            moduleId: 'py-m4',
            title: '24. *args and **kwargs in Python',
            description: 'Handling variable number of positional arguments (*args) and keyword arguments (**kwargs).',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['py-23-return-keyword'],
            order: 24,
            content: {
              summary: '*args collects arbitrary positional arguments as a tuple; **kwargs collects keyword arguments as a dictionary.',
              conceptExplanation: 'Use *args and **kwargs when building flexible decorators, wrapper functions, and APIs.',
              codeSnippet: 'def custom_logger(*args, **kwargs):\n    print("Args:", args)\n    print("Kwargs:", kwargs)\n\ncustom_logger("UserLogin", 101, status="Success", ip="127.0.0.1")',
              expectedOutput: "Args: ('UserLogin', 101)\nKwargs: {'status': 'Success', 'ip': '127.0.0.1'}",
              keyTakeaways: [
                '*args unpacks tuples; **kwargs unpacks dictionaries',
                'Standard signature order: def func(pos, *args, default=val, **kwargs)'
              ],
              youtubeVideoId: 'OFjHWCdCCcs',
              youtubeUrl: 'https://www.youtube.com/watch?v=OFjHWCdCCcs',
              youtubeDuration: '13:50'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-24-1',
                topicId: 'py-24-args-kwargs',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What data structure represents **kwargs inside a function body?',
                options: ['tuple', 'list', 'dict', 'set'],
                correctOptionIndex: 2,
                explanation: '**kwargs collects keyword arguments into a standard Python dictionary (dict).'
              }
            ]
          },
          {
            id: 'py-25-lambda-functions',
            subjectId: 'python',
            moduleId: 'py-m4',
            title: '25. Lambda Functions & Higher-Order Functions',
            description: 'Anonymous inline functions, map(), filter(), sorted(key=...), and functional programming.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['py-24-args-kwargs'],
            order: 25,
            content: {
              summary: 'Lambda expressions define concise, single-expression anonymous functions.',
              conceptExplanation: 'Syntax: lambda params: expression. Commonly used with sorted(key=...) and filtering.',
              codeSnippet: 'students = [("Aria", 95), ("Devon", 82), ("Maya", 88)]\nstudents.sort(key=lambda s: s[1], reverse=True)\nprint("Top student:", students[0][0])',
              expectedOutput: 'Top student: Aria',
              keyTakeaways: [
                'Lambdas are limited to a single expression and return automatically',
                'Ideal for short custom key sorting extractors'
              ],
              youtubeVideoId: '1LAYd0xtkkI',
              youtubeUrl: 'https://www.youtube.com/watch?v=1LAYd0xtkkI',
              youtubeDuration: '11:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-25-1',
                topicId: 'py-25-lambda-functions',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of (lambda a, b: a * b + 2)(3, 4)?',
                options: ['14', '12', '10', 'TypeError'],
                correctOptionIndex: 0,
                explanation: 'Evaluates 3 * 4 + 2 = 14.'
              }
            ]
          },
          {
            id: 'py-26-classes-objects',
            subjectId: 'python',
            moduleId: 'py-m4',
            title: '26. Classes & Objects in Python',
            description: 'Object-Oriented Programming: class blueprints, __init__ constructor, self reference, and instance methods.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['py-25-lambda-functions'],
            order: 26,
            content: {
              summary: 'Classes model real-world entities by bundling state (attributes) and behavior (methods).',
              conceptExplanation: '__init__ initializes instance attributes when ClassName() is called. self refers to the current instance.',
              codeSnippet: 'class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\n    def is_passed(self):\n        return self.score >= 50\n\ns = Student("Aria", 94)\nprint(s.name, "Passed:", s.is_passed())',
              expectedOutput: 'Aria Passed: True',
              keyTakeaways: [
                '__init__ is the initializer method called on instantiation',
                'self must be the explicit first parameter of all instance methods'
              ],
              youtubeVideoId: 'Z09I_OHuflw',
              youtubeUrl: 'https://www.youtube.com/watch?v=Z09I_OHuflw',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-26-1',
                topicId: 'py-26-classes-objects',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the purpose of the self parameter in Python class methods?',
                options: ['Refers to the class definition', 'Refers to the instance of the class being operated on', 'It is a keyword required by CPython', 'Creates a static reference'],
                correctOptionIndex: 1,
                explanation: 'self represents the specific object instance calling the method, allowing access to its attributes.'
              }
            ]
          },
          {
            id: 'py-27-inheritance-oop',
            subjectId: 'python',
            moduleId: 'py-m4',
            title: '27. Inheritance & Polymorphism in Python',
            description: 'Subclassing, method overriding, super() call, multiple inheritance, and MRO (Method Resolution Order).',
            estimatedMinutes: 15,
            difficulty: 'Hard',
            prerequisites: ['py-26-classes-objects'],
            order: 27,
            content: {
              summary: 'Inheritance allows child classes to derive attributes and methods from parent classes.',
              conceptExplanation: 'super().__init__() invokes parent initializers. Python supports multiple inheritance resolved by C3 Linearization (MRO).',
              codeSnippet: 'class User:\n    def __init__(self, username):\n        self.username = username\n\nclass Admin(User):\n    def __init__(self, username, permissions):\n        super().__init__(username)\n        self.permissions = permissions\n\na = Admin("admin_aria", ["READ", "WRITE", "DELETE"])\nprint(f"Admin: {a.username} with {len(a.permissions)} permissions")',
              expectedOutput: 'Admin: admin_aria with 3 permissions',
              keyTakeaways: [
                'super() accesses parent class methods cleanly',
                'Python Method Resolution Order (MRO) inspects inheritance hierarchy with Class.__mro__'
              ],
              youtubeVideoId: 'm2xIFRXHnJY',
              youtubeUrl: 'https://www.youtube.com/watch?v=m2xIFRXHnJY',
              youtubeDuration: '17:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-py-27-1',
                topicId: 'py-27-inheritance-oop',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What built-in function returns the Method Resolution Order (MRO) for a Python class?',
                options: ['Class.get_mro()', 'Class.__mro__ or Class.mro()', 'mro(Class)', 'Class.hierarchy()'],
                correctOptionIndex: 1,
                explanation: 'Class.__mro__ or Class.mro() returns the tuple of classes Python searches when resolving methods.'
              }
            ]
          }
        ]
      }
    ]
  },

  sql: {
    id: 'sql',
    title: 'SQL & Relational Databases',
    tagline: 'From Queries & Aggregations to Complex JOINs, Subqueries & Window Functions',
    description: 'Master relational data manipulation. Learn SELECT statements, aggregations, relational joins, subqueries, and analytical window functions.',
    iconName: 'Database',
    color: '#00758F',
    bgGlow: 'from-cyan-500/20 to-blue-600/10',
    totalTopics: 4,
    modules: [
      {
        id: 'sql-m1',
        subjectId: 'sql',
        title: 'Module 1: Querying & Aggregations',
        description: 'SELECT, WHERE filtering, ORDER BY, GROUP BY, and HAVING clauses.',
        order: 1,
        topics: [
          {
            id: 'sql-select',
            subjectId: 'sql',
            moduleId: 'sql-m1',
            title: 'SELECT, WHERE & Filtering',
            description: 'Retrieve columns, filter rows with predicates (=, !=, IN, BETWEEN, LIKE), and order results.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: [],
            order: 1,
            content: {
              summary: 'SQL is declarative. You specify what data to retrieve, and the database engine determines the execution plan.',
              conceptExplanation: '`SELECT col1, col2 FROM table WHERE condition ORDER BY col1 DESC LIMIT 10;`. `LIKE "%abc%"` searches substring patterns.',
              codeSnippet: `SELECT student_id, name, gpa\nFROM students\nWHERE gpa >= 3.5 AND active = TRUE\nORDER BY gpa DESC\nLIMIT 5;`,
              expectedOutput: 'Top 5 honor roll students returned ordered by GPA.',
              keyTakeaways: [
                'SQL clauses execute in logical order: FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT',
                'NULL comparisons must use `IS NULL` or `IS NOT NULL`, never `= NULL`'
              ],
              youtubeVideoId: 'HXV3zeRR3h4',
              youtubeDuration: '9:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-sql-sel-1',
                topicId: 'sql-select',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why does `WHERE email = NULL` fail to match rows containing null emails in SQL?',
                options: ['SQL requires double quotes for null', 'In SQL three-valued logic, comparing with NULL using = evaluates to UNKNOWN; you must use `IS NULL`', 'email is a reserved keyword', 'NULL is an integer in SQL'],
                correctOptionIndex: 1,
                explanation: 'NULL represents an unknown value. Comparisons with `=` yield UNKNOWN. You must write `WHERE email IS NULL`.'
              }
            ]
          },
          {
            id: 'sql-group-by',
            subjectId: 'sql',
            moduleId: 'sql-m1',
            title: 'Aggregations & GROUP BY / HAVING',
            description: 'COUNT, SUM, AVG, MIN, MAX, grouping data, and filtering aggregate results with HAVING.',
            estimatedMinutes: 10,
            difficulty: 'Medium',
            prerequisites: ['sql-select'],
            order: 2,
            content: {
              summary: 'GROUP BY aggregates multiple rows into summary records using aggregate functions.',
              conceptExplanation: '`WHERE` filters individual rows BEFORE grouping. `HAVING` filters aggregated groups AFTER grouping.',
              codeSnippet: `SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) >= 5\nORDER BY avg_sal DESC;`,
              expectedOutput: 'Departments with at least 5 employees and their average salary.',
              keyTakeaways: [
                'WHERE cannot contain aggregate functions like SUM() or COUNT()',
                'HAVING filters groups after aggregation has completed'
              ],
              youtubeVideoId: 'HXV3zeRR3h4',
              youtubeDuration: '11:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-sql-grp-1',
                topicId: 'sql-group-by',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the critical difference between `WHERE` and `HAVING` in SQL?',
                options: ['HAVING is faster than WHERE', 'WHERE filters rows before grouping; HAVING filters aggregated groups after grouping', 'WHERE only works on strings', 'HAVING cannot be used with GROUP BY'],
                correctOptionIndex: 1,
                explanation: '`WHERE` operates on row-level data prior to aggregation; `HAVING` filters aggregated group results.'
              }
            ]
          }
        ]
      },
      {
        id: 'sql-m2',
        subjectId: 'sql',
        title: 'Module 2: Relational JOINs & Subqueries',
        description: 'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, Subqueries & CTEs.',
        order: 2,
        topics: [
          {
            id: 'sql-joins',
            subjectId: 'sql',
            moduleId: 'sql-m2',
            title: 'Relational JOINs (INNER, LEFT, RIGHT)',
            description: 'Combine tables based on primary and foreign key relationships without data loss.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['sql-group-by'],
            order: 3,
            content: {
              summary: 'JOINs correlate data across relational tables using foreign key matching predicates.',
              conceptExplanation: '`INNER JOIN` returns rows where matches exist in both tables. `LEFT JOIN` returns all rows from the left table, padding missing right-table columns with NULL.',
              codeSnippet: `SELECT u.user_id, u.name, o.order_id, o.amount\nFROM users u\nLEFT JOIN orders o ON u.user_id = o.user_id;`,
              expectedOutput: 'All users including those who haven\'t placed any orders (NULL for order_id).',
              keyTakeaways: [
                'LEFT JOIN guarantees every record from the left table appears in the output',
                'Index foreign key columns for performant join execution'
              ],
              youtubeVideoId: 'HXV3zeRR3h4',
              youtubeDuration: '14:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-sql-join-1',
                topicId: 'sql-joins',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'If you want to list all customers whether they have placed an order or not, which JOIN should you use?',
                options: ['INNER JOIN', 'LEFT JOIN from customers to orders', 'CROSS JOIN', 'NATURAL JOIN'],
                correctOptionIndex: 1,
                explanation: 'A `LEFT JOIN` retains all records from the `customers` table even if no matching records exist in `orders`.'
              }
            ]
          },
          {
            id: 'sql-subqueries',
            subjectId: 'sql',
            moduleId: 'sql-m2',
            title: 'Subqueries & CTEs (Common Table Expressions)',
            description: 'WITH clauses, correlated subqueries, and modular query structuring for readable SQL.',
            estimatedMinutes: 14,
            difficulty: 'Hard',
            prerequisites: ['sql-joins'],
            order: 4,
            content: {
              summary: 'CTEs (WITH clause) provide named temporary result sets for readable multi-stage SQL pipelines.',
              conceptExplanation: '`WITH HighEarners AS (SELECT ...) SELECT ... FROM HighEarners`. Replaces messy nested subqueries with clean modular declarations.',
              codeSnippet: `WITH RankedScores AS (\n    SELECT student_id, score,\n           DENSE_RANK() OVER (ORDER BY score DESC) as rank_pos\n    FROM exam_results\n)\nSELECT student_id, score\nFROM RankedScores\nWHERE rank_pos <= 3;`,
              expectedOutput: 'Top 3 ranked student scores including ties.',
              keyTakeaways: [
                'CTEs improve SQL readability and query optimization',
                'Window functions like RANK() compute across row partitions without collapsing rows'
              ],
              youtubeVideoId: 'HXV3zeRR3h4',
              youtubeDuration: '15:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-sql-sub-1',
                topicId: 'sql-subqueries',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the advantage of using a Common Table Expression (WITH clause) over nested subqueries in SQL?',
                options: ['It eliminates table indexes', 'It improves readability, modularity, and can be referenced multiple times in the query', 'It works on NoSQL databases only', 'It disables transactions'],
                correctOptionIndex: 1,
                explanation: 'CTEs create clear, readable query pipelines that can be reused within the same statement.'
              }
            ]
          }
        ]
      }
    ]
  },

  dsa: {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    tagline: 'Master Big-O Complexity, Arrays, Stacks, Binary Search & 21-Day Mastery Roadmap',
    description: 'Learn Data Structures & Algorithms from the ground up with the Error Makes Clever Masterclass. Master Big-O (O(1), O(N), O(N^2), O(log N)), array operations, stack implementation, and binary search.',
    iconName: 'Cpu',
    color: '#10B981',
    bgGlow: 'from-emerald-500/20 to-teal-600/10',
    totalTopics: 20,
    modules: [
      {
        id: 'dsa-m1',
        subjectId: 'dsa',
        title: 'Module 1: DSA Foundations & Big-O Time Complexity (Topics 01–06)',
        description: 'Chocolate box concept, array insertions/deletions, Big-O notation, O(1), O(N), O(N^2), O(log N), and linear search.',
        order: 1,
        topics: [
          {
            id: 'dsa-01-what-is-data',
            subjectId: 'dsa',
            moduleId: 'dsa-m1',
            title: '01. What is Data & Data Structures? (Chocolate Box Concept)',
            description: 'Understanding passwords, numbers, and how data structures organize memory like compartments in a chocolate box.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: [],
            order: 1,
            content: {
              summary: 'Data is raw information (passwords, numbers). A data structure is a specialized format for organizing, processing, retrieving, and storing data efficiently.',
              conceptExplanation: 'Imagine an unorganized pile of chocolates versus a structured compartment box. Data structures give structure to raw memory so algorithms can access elements instantly.',
              codeSnippet: '// Conceptual Data Structure in memory:\nint[] chocolateBox = { 10, 20, 30, 40 };\nSystem.out.println("Item at compartment 0: " + chocolateBox[0]);',
              expectedOutput: 'Item at compartment 0: 10',
              keyTakeaways: [
                'Data is meaningless without structured organization',
                'Choosing the right data structure directly impacts memory and runtime performance',
                'Contiguous structures (arrays) provide instant indexed access'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=115',
              youtubeDuration: '08:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-01-1',
                topicId: 'dsa-01-what-is-data',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why do we use data structures instead of storing raw unorganized data?',
                options: ['To increase hard drive storage space', 'To organize memory so algorithms can access and process data efficiently', 'Because computers cannot read raw integers', 'Data structures prevent memory allocation'],
                correctOptionIndex: 1,
                explanation: 'Data structures organize data in memory to enable efficient access, search, insertion, and deletion.'
              }
            ]
          },
          {
            id: 'dsa-02-array-basics',
            subjectId: 'dsa',
            moduleId: 'dsa-m1',
            title: '02. Array Basics: Insertion, Deletion & Hidden Traversal Costs',
            description: 'Contiguous memory layout, 0-based indexing, insertion shifting, and hidden deletion costs.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['dsa-01-what-is-data'],
            order: 2,
            content: {
              summary: 'Arrays allocate a fixed block of contiguous memory cells where every element occupies identical byte width.',
              conceptExplanation: 'While reading arr[i] is instantaneous O(1), inserting or deleting an element at index 0 forces every subsequent element to shift, incurring O(N) hidden overhead.',
              codeSnippet: '// Array element traversal & manipulation:\nint[] arr = { 10, 20, 30, 40, 50 };\n// Deleting index 1 requires shifting elements left:\nfor (int i = 1; i < arr.length - 1; i++) {\n    arr[i] = arr[i + 1];\n}',
              expectedOutput: 'Elements shifted left to overwrite index 1.',
              keyTakeaways: [
                'Array lookups by index are instantaneous O(1) via base + offset formula',
                'Inserting or deleting at the beginning takes O(N) due to element shifting'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=333',
              youtubeDuration: '10:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-02-1',
                topicId: 'dsa-02-array-basics',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why does deleting the first element in an array of size N take O(N) time?',
                options: ['Because memory is freed slowly', 'Because all N - 1 remaining elements must be shifted one position to the left', 'Because arrays are linked together', 'Because it requires garbage collection'],
                correctOptionIndex: 1,
                explanation: 'To maintain contiguous order without gaps, deleting index 0 requires shifting all subsequent elements left.'
              }
            ]
          },
          {
            id: 'dsa-03-big-o-constant-linear',
            subjectId: 'dsa',
            moduleId: 'dsa-m1',
            title: '03. Big O(1) Constant & Big O(N) Linear Time Explained',
            description: 'Asymptotic growth analysis, constant time operations vs linear scale with input size N.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['dsa-02-array-basics'],
            order: 3,
            content: {
              summary: 'Big-O measures how an algorithm runtime or memory requirement scales as input size N grows toward infinity.',
              conceptExplanation: 'O(1) Constant Time executes in fixed steps regardless of N (e.g. arr[0]). O(N) Linear Time executes steps directly proportional to N (e.g. iterating an entire array).',
              codeSnippet: '// O(1) Constant Time:\nint getFirst(int[] arr) { return arr[0]; }\n\n// O(N) Linear Time:\nint sumAll(int[] arr) {\n    int sum = 0;\n    for (int num : arr) sum += num;\n    return sum;\n}',
              expectedOutput: 'O(1) completes in 1 step; O(N) completes in N iterations.',
              keyTakeaways: [
                'Big-O ignores constant multipliers and lower-order terms (e.g. 5N + 10 -> O(N))',
                'O(1) operations do not slow down even with millions of items'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=431',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-03-1',
                topicId: 'dsa-03-big-o-constant-linear',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which of the following operations runs in Big O(1) Constant Time?',
                options: ['Searching for an item in an unsorted array', 'Accessing an element in an array by its index arr[5]', 'Finding the maximum number in an array', 'Reversing an entire array'],
                correctOptionIndex: 1,
                explanation: 'Accessing an element by index computes base_address + index * item_size directly in O(1) constant time.'
              }
            ]
          },
          {
            id: 'dsa-04-big-o-quadratic',
            subjectId: 'dsa',
            moduleId: 'dsa-m1',
            title: '04. Big O(N²) Quadratic Time (The Handshake Problem)',
            description: 'Nested loops, pairwise comparisons, quadratic blowup, and the handshake analogy N*(N-1)/2.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['dsa-03-big-o-constant-linear'],
            order: 4,
            content: {
              summary: 'O(N^2) Quadratic Time occurs when an algorithm performs a linear pass for every element in the input.',
              conceptExplanation: 'Imagine N people in a room: if everyone shakes hands with everyone else, total handshakes = N*(N-1)/2, which simplifies asymptotically to O(N^2).',
              codeSnippet: '// O(N^2) Nested Comparison:\nfor (int i = 0; i < n; i++) {\n    for (int j = i + 1; j < n; j++) {\n        System.out.println("Pair: " + i + ", " + j);\n    }\n}',
              expectedOutput: 'All unique pairs printed in N*(N-1)/2 operations.',
              keyTakeaways: [
                'Nested loops over the same dataset typically result in O(N^2) complexity',
                'For N = 100,000, N^2 requires 10 billion operations and will timeout in competitive coding'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=820',
              youtubeDuration: '14:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-04-1',
                topicId: 'dsa-04-big-o-quadratic',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'If an O(N^2) algorithm takes 1 second for N = 1,000 items, how long will it approximately take for N = 10,000 items?',
                options: ['10 seconds', '100 seconds', '1,000 seconds', '2 seconds'],
                correctOptionIndex: 1,
                explanation: 'When input size increases 10x, an O(N^2) algorithm takes 10^2 = 100x longer (100 seconds).'
              }
            ]
          },
          {
            id: 'dsa-05-big-o-logarithmic',
            subjectId: 'dsa',
            moduleId: 'dsa-m1',
            title: '05. Big O(log N) Logarithmic Time (Dictionary Search Idea)',
            description: 'Halving the search space, binary halving, dictionary lookup analogy, and logarithmic growth.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['dsa-04-big-o-quadratic'],
            order: 5,
            content: {
              summary: 'O(log N) Logarithmic Time halves the remaining problem size in each single step.',
              conceptExplanation: 'When searching a physical dictionary of 1,000 pages, opening to the middle divides the remaining search to 500 pages. 1,000 pages requires only ~10 steps (log2(1000) = 10).',
              codeSnippet: '// O(log N) Repeated Halving:\nint n = 1024, steps = 0;\nwhile (n > 1) {\n    n = n / 2;\n    steps++;\n}\nSystem.out.println("Steps to reach 1 from 1024: " + steps);',
              expectedOutput: 'Steps to reach 1 from 1024: 10',
              keyTakeaways: [
                'Log2(1,000,000) is only ~20 operations',
                'O(log N) is exponentially faster than O(N) for large datasets'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=1285',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-05-1',
                topicId: 'dsa-05-big-o-logarithmic',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'How many maximum steps does an O(log2 N) algorithm take to search among 1,000,000 items?',
                options: ['1,000,000 steps', '500,000 steps', 'About 20 steps', '10,000 steps'],
                correctOptionIndex: 2,
                explanation: 'Because 2^20 = 1,048,576, an O(log N) algorithm requires at most 20 comparisons to find any item among 1 million.'
              }
            ]
          },
          {
            id: 'dsa-06-linear-search',
            subjectId: 'dsa',
            moduleId: 'dsa-m1',
            title: '06. Linear Search: Step-by-Step Explanation',
            description: 'Scanning elements sequentially from index 0 to N-1, best/worst case analysis, and search predicates.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['dsa-05-big-o-logarithmic'],
            order: 6,
            content: {
              summary: 'Linear search inspects every element sequentially until target is found or array ends.',
              conceptExplanation: 'Works on both sorted and unsorted arrays. Best case: O(1) (target at index 0). Worst case: O(N) (target at last index or absent).',
              codeSnippet: 'public static int linearSearch(int[] arr, int target) {\n    for (int i = 0; i < arr.length; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}',
              expectedOutput: 'Target index returned or -1 if not found.',
              keyTakeaways: [
                'Linear search does not require sorted data',
                'Average and worst-case time complexity is O(N)'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=1526',
              youtubeDuration: '11:10'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-06-1',
                topicId: 'dsa-06-linear-search',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the primary advantage of Linear Search over Binary Search?',
                options: ['It is faster for all array sizes', 'It works on unsorted arrays without requiring sorting first', 'It has O(1) worst-case time', 'It uses O(log N) memory'],
                correctOptionIndex: 1,
                explanation: 'Linear search can be executed directly on unsorted data without preprocessing.'
              }
            ]
          }
        ]
      },
      {
        id: 'dsa-m2',
        subjectId: 'dsa',
        title: 'Module 2: Universal Method & Stack Data Structure (Topics 07–12)',
        description: 'Universal learning method, Stack LIFO architecture, browser history, pseudocode to code, and push/pop.',
        order: 2,
        topics: [
          {
            id: 'dsa-07-universal-learning-method',
            subjectId: 'dsa',
            moduleId: 'dsa-m2',
            title: '07. 3 Biggest DSA Mistakes & Universal Method to Learn Any Data Structure',
            description: 'Avoiding syntax memorization, 5-step universal methodology: Definition -> Real-world Need -> Tradeoffs -> Pseudocode -> Code.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['dsa-06-linear-search'],
            order: 7,
            content: {
              summary: 'Master any data structure by following the 5-step framework: Concept -> Real-world use -> Tradeoffs -> Pseudocode -> Code.',
              conceptExplanation: 'Top 3 mistakes: (1) Memorizing code lines without understanding memory layout, (2) Skipping pseudocode visualization, (3) Not analyzing edge cases.',
              codeSnippet: '// The 5-Step Universal Framework:\n// Step 1: What is the core definition?\n// Step 2: Where is it used in real systems?\n// Step 3: Why choose it over basic arrays?\n// Step 4: Write clean language-agnostic pseudocode\n// Step 5: Convert pseudocode to robust production code',
              expectedOutput: 'Framework applied to build Stacks, Queues, Trees, and Graphs.',
              keyTakeaways: [
                'Never jump straight into coding without visualizing pointers first',
                'Pseudocode bridges mathematical logic and syntactic execution'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=1985',
              youtubeDuration: '13:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-07-1',
                topicId: 'dsa-07-universal-learning-method',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the most effective first step before writing implementation code for a data structure?',
                options: ['Memorize language-specific library imports', 'Understand the real-world problem and write step-by-step pseudocode', 'Run a benchmark tester', 'Copy code from StackOverflow'],
                correctOptionIndex: 1,
                explanation: 'Understanding the problem requirements and drafting logic in pseudocode prevents architectural bugs.'
              }
            ]
          },
          {
            id: 'dsa-08-what-is-stack',
            subjectId: 'dsa',
            moduleId: 'dsa-m2',
            title: '08. What is a Stack? Real-World Uses (Browser Back Button)',
            description: 'LIFO (Last In First Out) principle, browser back/forward history, undo-redo operations, and call stack.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['dsa-07-universal-learning-method'],
            order: 8,
            content: {
              summary: 'A Stack is a linear data structure following LIFO: the last item pushed is the first item popped.',
              conceptExplanation: 'Like a stack of dinner plates: you place plates on top and remove plates from the top. Used in browser navigation (Back button) and text editor Undo (Ctrl+Z).',
              codeSnippet: '// LIFO Principle Demonstration:\n// Push Page A -> Push Page B -> Push Page C\n// Pop returns Page C (most recently visited)',
              expectedOutput: 'LIFO: Page C popped first, revealing Page B underneath.',
              keyTakeaways: [
                'LIFO: Last In, First Out',
                'Browser navigation, text undo/redo, and recursion call stacks all rely on Stacks'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=2100',
              youtubeDuration: '10:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-08-1',
                topicId: 'dsa-08-what-is-stack',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which real-world application uses a Stack (LIFO) data structure?',
                options: ['Print queue printer jobs (FIFO)', 'Browser Back button history and Ctrl+Z Undo', 'Streaming video buffering', 'Round-robin CPU scheduling'],
                correctOptionIndex: 1,
                explanation: 'The browser back button takes you to the most recently visited page (Last In, First Out).'
              }
            ]
          },
          {
            id: 'dsa-09-why-stack-over-array',
            subjectId: 'dsa',
            moduleId: 'dsa-m2',
            title: '09. Why Stack over Array? (Behind the Scenes)',
            description: 'Restricting arbitrary access to enforce safety, preventing mid-array mutations, and O(1) top-pointer operations.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['dsa-08-what-is-stack'],
            order: 9,
            content: {
              summary: 'A Stack intentionally restricts access to only the top element, guaranteeing strict LIFO order and O(1) operations.',
              conceptExplanation: 'While arrays allow arbitrary indexing (arr[5]), allowing random modifications in undo-history would corrupt sequential state. Stack guarantees integrity.',
              codeSnippet: '// Enforcing encapsulation in Stack:\nclass Stack {\n    private int[] data;\n    private int top = -1;\n    // Only push() and pop() permitted; no random indexing!\n}',
              expectedOutput: 'Encapsulated Stack prevents arbitrary mid-sequence mutations.',
              keyTakeaways: [
                'Restricting access patterns prevents accidental corruption of sequential state',
                'Push and Pop operate in guaranteed O(1) constant time'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=2220',
              youtubeDuration: '11:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-09-1',
                topicId: 'dsa-09-why-stack-over-array',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why do we use a Stack rather than an unrestricted Array for Undo history?',
                options: ['Stacks use less memory than arrays', 'Stacks enforce strict LIFO access and prevent illegal mid-history edits', 'Arrays cannot store strings', 'Stacks are faster than RAM'],
                correctOptionIndex: 1,
                explanation: 'Restricting access to the top element ensures strict chronological undo order without corruption.'
              }
            ]
          },
          {
            id: 'dsa-10-stack-pseudocode',
            subjectId: 'dsa',
            moduleId: 'dsa-m2',
            title: '10. Stack Pseudocode to Code Conversion',
            description: 'Writing language-agnostic logic, defining top index pointer, overflow condition, and underflow guards.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['dsa-09-why-stack-over-array'],
            order: 10,
            content: {
              summary: 'Translate abstract Stack rules into clear pseudocode before implementation.',
              conceptExplanation: 'Stack state: top = -1 (empty). Overflow occurs when top == capacity - 1. Underflow occurs when attempting to pop with top == -1.',
              codeSnippet: '// Stack Pseudocode:\n// PUSH(value):\n//   if top == capacity - 1 -> throw Stack Overflow\n//   top = top + 1\n//   arr[top] = value\n//\n// POP():\n//   if top == -1 -> throw Stack Underflow\n//   value = arr[top]\n//   top = top - 1\n//   return value',
              expectedOutput: 'Clean algorithmic blueprint ready for Java/Python implementation.',
              keyTakeaways: [
                'Always guard against Stack Overflow (full) and Stack Underflow (empty)',
                'top pointer increment precedes write; pop returns value then decrements top'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=2541',
              youtubeDuration: '12:40'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-10-1',
                topicId: 'dsa-10-stack-pseudocode',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the value of top in a 0-indexed array-based Stack when it contains 3 elements?',
                options: ['0', '1', '2', '3'],
                correctOptionIndex: 2,
                explanation: 'Empty is -1, 1 element is index 0, 2 elements is index 1, 3 elements is index 2.'
              }
            ]
          },
          {
            id: 'dsa-11-push-pop-operations',
            subjectId: 'dsa',
            moduleId: 'dsa-m2',
            title: '11. Push & Pop Operations (Memory View & Implementation)',
            description: 'Visualizing memory pointer updates during push, pop, and peek operations.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['dsa-10-stack-pseudocode'],
            order: 11,
            content: {
              summary: 'Push adds an element onto the top; Pop removes and returns the topmost element.',
              conceptExplanation: 'Memory view: top moves upward on push and downward on pop. peek() inspects arr[top] without removing it.',
              codeSnippet: 'public void push(int val) {\n    if (top == capacity - 1) throw new RuntimeException("Stack Overflow");\n    arr[++top] = val;\n}\n\npublic int pop() {\n    if (top == -1) throw new RuntimeException("Stack Underflow");\n    return arr[top--];\n}',
              expectedOutput: 'O(1) push and pop executed with boundary checks.',
              keyTakeaways: [
                '++top increments before assigning; top-- returns then decrements',
                'peek() / top() inspects the top without mutating the stack'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=4114',
              youtubeDuration: '14:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-11-1',
                topicId: 'dsa-11-push-pop-operations',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What happens when pop() is executed on an empty Stack?',
                options: ['Returns 0', 'Stack Underflow error', 'Allocates new memory', 'Pushes null'],
                correctOptionIndex: 1,
                explanation: 'Attempting to pop from an empty stack triggers a Stack Underflow error.'
              }
            ]
          },
          {
            id: 'dsa-12-final-stack-implementation',
            subjectId: 'dsa',
            moduleId: 'dsa-m2',
            title: '12. Complete Stack Implementation & Practice Challenges',
            description: 'Building a complete generic Stack class with isEmpty(), size(), peek(), push(), and pop() methods.',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['dsa-11-push-pop-operations'],
            order: 12,
            content: {
              summary: 'Construct a complete, production-grade Stack with custom capacity and error handling.',
              conceptExplanation: 'Test your stack by implementing balanced parenthesis validation: matching (, [, { with }, ], ).',
              codeSnippet: 'public class CustomStack {\n    private int[] data;\n    private int top;\n    \n    public CustomStack(int size) {\n        data = new int[size];\n        top = -1;\n    }\n    public boolean isEmpty() { return top == -1; }\n    public int size() { return top + 1; }\n}',
              expectedOutput: 'CustomStack initialized and validated.',
              keyTakeaways: [
                'Generic Stacks handle any object type cleanly',
                'Balanced parentheses validation is a classic LeetCode Stack interview problem'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=4530',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-12-1',
                topicId: 'dsa-12-final-stack-implementation',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Which algorithm validates whether string "({[]})" contains balanced parentheses?',
                options: ['Linear Search', 'Push opening brackets to Stack; on closing bracket, pop and verify matching pair', 'Binary Search', 'Sorting characters'],
                correctOptionIndex: 1,
                explanation: 'Pushing opening brackets onto a stack and checking matching pairs on closing brackets solves parentheses matching in O(N) time.'
              }
            ]
          }
        ]
      },
      {
        id: 'dsa-m3',
        subjectId: 'dsa',
        title: 'Module 3: Searching Algorithms & Binary Search (Topics 13–17)',
        description: 'Why algorithms matter, Binary Search with phone contacts, sorted array requirement, log N trace, and pseudocode.',
        order: 3,
        topics: [
          {
            id: 'dsa-13-why-search-algorithms',
            subjectId: 'dsa',
            moduleId: 'dsa-m3',
            title: '13. Why Search Algorithms Matter (Linear vs Binary Search)',
            description: 'Comparison of O(N) linear scan vs O(log N) binary search on 1 million records.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['dsa-12-final-stack-implementation'],
            order: 13,
            content: {
              summary: 'Searching is the most frequent computational operation in database engines, search indexes, and caches.',
              conceptExplanation: 'On 1,000,000 records, linear search takes up to 1,000,000 comparisons. Binary search finds any item in at most 20 comparisons.',
              codeSnippet: '// Scale comparison for 1,000,000 items:\n// Linear Search max operations: 1,000,000 (O(N))\n// Binary Search max operations: 20 (O(log N))',
              expectedOutput: 'Binary Search is 50,000x faster on 1M items.',
              keyTakeaways: [
                'Algorithm choice is the single biggest factor in backend responsiveness',
                'O(log N) scales gracefully to billions of entries'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=4784',
              youtubeDuration: '11:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-13-1',
                topicId: 'dsa-13-why-search-algorithms',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'On 1,000,000 items, how many comparisons does Binary Search take in the worst case?',
                options: ['1,000,000', '500,000', '20', '100'],
                correctOptionIndex: 2,
                explanation: 'Because 2^20 > 1,000,000, binary search finishes in at most 20 comparisons.'
              }
            ]
          },
          {
            id: 'dsa-14-binary-search-contacts',
            subjectId: 'dsa',
            moduleId: 'dsa-m3',
            title: '14. Binary Search: Real-World Phone Contacts & Sorted Arrays',
            description: 'Why binary search strictly requires sorted data, telephone directory analogy, and left/right pointers.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['dsa-13-why-search-algorithms'],
            order: 14,
            content: {
              summary: 'Binary Search requires the array to be sorted so each midpoint comparison safely discards half of the remaining elements.',
              conceptExplanation: 'Searching for Rohan in a phone book: open in the middle (M). Since R > M, discard the entire first half (A to M) and search only the second half.',
              codeSnippet: 'int[] sortedContacts = { 10, 25, 33, 47, 58, 62, 79, 88, 95 };\n// Low = 0, High = 8, Mid = (0 + 8) / 2 = 4 (value 58)',
              expectedOutput: 'Halves search space from 9 to 4 items in a single check.',
              keyTakeaways: [
                'Binary Search PRECONDITION: The array MUST be sorted',
                'If data is unsorted, comparisons cannot eliminate half the array'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=4923',
              youtubeDuration: '12:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-14-1',
                topicId: 'dsa-14-binary-search-contacts',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the mandatory prerequisite before Binary Search can be applied?',
                options: ['The array must have an even number of elements', 'The array must be sorted in ascending or descending order', 'The array must only contain positive integers', 'The array must fit in cache'],
                correctOptionIndex: 1,
                explanation: 'Binary search requires sorted data so comparisons can deterministically eliminate one half of the search range.'
              }
            ]
          },
          {
            id: 'dsa-15-log-n-vs-n2',
            subjectId: 'dsa',
            moduleId: 'dsa-m3',
            title: '15. Understanding Log N vs N vs N² Visual Comparisons',
            description: 'Plotting growth rates: Constant O(1) < Logarithmic O(log N) < Linear O(N) < Quadratic O(N^2).',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['dsa-14-binary-search-contacts'],
            order: 15,
            content: {
              summary: 'Visualize the massive performance gap between logarithmic, linear, and quadratic time complexity as N grows.',
              conceptExplanation: 'For N = 10,000: log2(N) = 14 steps, N = 10,000 steps, N^2 = 100,000,000 steps.',
              codeSnippet: '// Growth comparison for N = 10,000:\n// O(1)      : 1 op\n// O(log N)  : ~14 ops\n// O(N)      : 10,000 ops\n// O(N^2)    : 100,000,000 ops',
              expectedOutput: 'O(log N) is 7,000,000x faster than O(N^2) at N=10,000.',
              keyTakeaways: [
                'Never use O(N^2) nested loops when O(N log N) sorting + binary search is available',
                'Understanding growth curves separates senior engineers from juniors'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=5154',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-15-1',
                topicId: 'dsa-15-log-n-vs-n2',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Which list of complexities is sorted from FASTEST to SLOWEST?',
                options: ['O(N^2) < O(N) < O(log N) < O(1)', 'O(1) < O(log N) < O(N) < O(N^2)', 'O(log N) < O(1) < O(N) < O(N^2)', 'O(1) < O(N) < O(log N) < O(N^2)'],
                correctOptionIndex: 1,
                explanation: 'O(1) Constant is fastest, followed by O(log N) Logarithmic, O(N) Linear, and O(N^2) Quadratic.'
              }
            ]
          },
          {
            id: 'dsa-16-binary-search-trace',
            subjectId: 'dsa',
            moduleId: 'dsa-m3',
            title: '16. Binary Search Real-Time Tracing & Pseudocode',
            description: 'Low, high, and mid index calculations, avoiding integer overflow low + (high - low) / 2, and while loop condition.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['dsa-15-log-n-vs-n2'],
            order: 16,
            content: {
              summary: 'Trace pointers step-by-step: low = 0, high = n - 1, while (low <= high).',
              conceptExplanation: 'To avoid integer overflow in languages with fixed int sizes, calculate mid as int mid = low + (high - low) / 2; rather than (low + high) / 2.',
              codeSnippet: 'public static int binarySearch(int[] arr, int target) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}',
              expectedOutput: 'Index of target returned in O(log N) time, or -1 if absent.',
              keyTakeaways: [
                'Loop runs while low <= high (includes single-element boundary)',
                'low = mid + 1 or high = mid - 1 prevents infinite looping'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=5680',
              youtubeDuration: '15:10'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-16-1',
                topicId: 'dsa-16-binary-search-trace',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Why is mid = low + (high - low) / 2 preferred over mid = (low + high) / 2?',
                options: ['It runs faster on CPU', 'It prevents integer overflow when low + high exceeds Integer.MAX_VALUE', 'It handles negative array indices', 'It rounds up instead of down'],
                correctOptionIndex: 1,
                explanation: 'In large arrays, low + high can exceed 2,147,483,647 and overflow into negative numbers.'
              }
            ]
          },
          {
            id: 'dsa-17-solved-binary-search',
            subjectId: 'dsa',
            moduleId: 'dsa-m3',
            title: '17. Solved Binary Search Problems & Edge Cases',
            description: 'First & last occurrence, search insert position, square root calculation with binary search.',
            estimatedMinutes: 15,
            difficulty: 'Hard',
            prerequisites: ['dsa-16-binary-search-trace'],
            order: 17,
            content: {
              summary: 'Apply binary search on answer spaces: find first occurrence, peak element, or compute sqrt(X) in O(log X).',
              conceptExplanation: 'When duplicates exist in sorted arrays, continue searching high = mid - 1 to locate the first occurrence, or low = mid + 1 for the last occurrence.',
              codeSnippet: '// Finding First Occurrence of target in sorted array with duplicates:\nint firstOccurrence(int[] arr, int target) {\n    int low = 0, high = arr.length - 1, res = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) { res = mid; high = mid - 1; }\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return res;\n}',
              expectedOutput: 'First index of duplicate element returned.',
              keyTakeaways: [
                'Binary search applies to any monotonic function, not just explicit arrays',
                'Edge cases to test: empty array, target smaller than all elements, target larger than all'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=6135',
              youtubeDuration: '16:40'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-17-1',
                topicId: 'dsa-17-solved-binary-search',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'If target is not found in an array, what does the low pointer represent after while (low <= high) terminates?',
                options: ['The index of the largest element', 'The exact insertion index where target should be inserted to maintain sort order', 'Always -1', 'The midpoint index'],
                correctOptionIndex: 1,
                explanation: 'Upon termination, low points to the exact insert position (LeetCode 35: Search Insert Position).'
              }
            ]
          }
        ]
      },
      {
        id: 'dsa-m4',
        subjectId: 'dsa',
        title: 'Module 4: DSA Practice Mastery & AI Learning Roadmap (Topics 18–20)',
        description: 'Building custom data structures, using ChatGPT for targeted DSA practice, and the 21-day mastery roadmap.',
        order: 4,
        topics: [
          {
            id: 'dsa-18-building-custom-ds',
            subjectId: 'dsa',
            moduleId: 'dsa-m4',
            title: '18. Building Custom Data Structures & Hands-on Practice',
            description: 'Synthesizing Arrays, Dynamic Arrays (ArrayList), Stacks, and Queues from scratch.',
            estimatedMinutes: 15,
            difficulty: 'Hard',
            prerequisites: ['dsa-17-solved-binary-search'],
            order: 18,
            content: {
              summary: 'Implement dynamic resizing arrays and double-ended queues from scratch to master memory management.',
              conceptExplanation: 'When capacity is exceeded, allocate a new array with double size (2 * capacity), copy existing elements over, and re-point the reference in amortized O(1) time.',
              codeSnippet: '// Dynamic Array Resizing Logic:\nif (size == capacity) {\n    capacity *= 2;\n    int[] newData = new int[capacity];\n    System.arraycopy(data, 0, newData, 0, size);\n    data = newData;\n}',
              expectedOutput: 'Amortized O(1) dynamic growth without memory leaks.',
              keyTakeaways: [
                'Doubling capacity yields amortized O(1) append performance',
                'Implementing collections from scratch builds deep intuition for interview questions'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=4712',
              youtubeDuration: '14:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-18-1',
                topicId: 'dsa-18-building-custom-ds',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the amortized time complexity of appending an element to a dynamically resizing array (like Java ArrayList or Python List)?',
                options: ['O(N^2)', 'O(N)', 'O(1) Amortized', 'O(log N)'],
                correctOptionIndex: 2,
                explanation: 'Because array copying occurs infrequently (only on doubling powers of 2), the amortized cost per append is O(1).'
              }
            ]
          },
          {
            id: 'dsa-19-using-ai-for-dsa',
            subjectId: 'dsa',
            moduleId: 'dsa-m4',
            title: '19. Using AI / ChatGPT for Dynamic DSA Practice & Debugging',
            description: 'Leveraging AI for edge-case generation, dry-run memory traces, and interactive mock interviews.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['dsa-18-building-custom-ds'],
            order: 19,
            content: {
              summary: 'Use AI as a personalized tutor to generate corner test cases, explain failed dry runs, and simulate interview coding questions.',
              conceptExplanation: 'Effective prompt structure: (1) Provide the problem constraints, (2) Ask for Big-O analysis, (3) Request failing test case edge cases without revealing the full solution immediately.',
              codeSnippet: '// Prompting Template:\n// "Analyze my binary search code. Don\'t give me the solution yet.\n// Show me one edge case where my while loop will fail with an infinite loop."',
              expectedOutput: 'AI provides targeted hints and edge-case test vectors.',
              keyTakeaways: [
                'Ask AI to review time and space complexity bottlenecks',
                'Use Topic Solver AI Tutor for immediate feedback on test case failures'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=6860',
              youtubeDuration: '11:50'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-19-1',
                topicId: 'dsa-19-using-ai-for-dsa',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the best way to utilize AI when practicing DSA problems?',
                options: ['Copy and paste full solutions immediately', 'Ask AI to generate boundary edge cases and dry-run code explanations to build problem-solving intuition', 'Avoid writing code and let AI solve it', 'Only use AI for syntax translation'],
                correctOptionIndex: 1,
                explanation: 'Using AI to discover blind spots and test edge cases builds long-term analytical problem-solving skills.'
              }
            ]
          },
          {
            id: 'dsa-20-21-day-roadmap',
            subjectId: 'dsa',
            moduleId: 'dsa-m4',
            title: '20. 21-Day DSA Mastery Roadmap & Interview Prep Strategy',
            description: 'Structured 3-week study schedule: Week 1 (Arrays, Big-O, Stacks), Week 2 (Searching, Sorting, Linked Lists), Week 3 (Trees, HashMaps, Mock Interviews).',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['dsa-19-using-ai-for-dsa'],
            order: 20,
            content: {
              summary: 'The battle-tested 21-day roadmap to conquer Data Structures & Algorithms and crack technical interviews.',
              conceptExplanation: 'Week 1: Foundations & Linear Structures (Big-O, Arrays, Stacks). Week 2: Algorithms & Pointers (Binary Search, Two Pointers, Linked Lists). Week 3: Non-Linear & Systems (Trees, HashMaps, 25 Classic LeetCode Patterns).',
              codeSnippet: '// 21-Day Milestone Schedule:\n// Days 1-7   : Arrays, Big-O Notation, Stacks, LIFO Design\n// Days 8-14  : Binary Search, Two Pointers, Linked Lists\n// Days 15-21 : Binary Trees, HashMaps, Mock Coding Rounds',
              expectedOutput: '21-day technical interview readiness plan completed.',
              keyTakeaways: [
                'Consistency beats cramming: solve 2 problems daily rather than 20 in one day',
                'Always write time and space complexity for every solution submitted'
              ],
              youtubeVideoId: '-PPCDEOOYF0',
              youtubeUrl: 'https://youtu.be/-PPCDEOOYF0?t=3641',
              youtubeDuration: '15:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-dsa-20-1',
                topicId: 'dsa-20-21-day-roadmap',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'In the 21-day DSA Roadmap, what is the recommended order of topics?',
                options: ['Dynamic Programming -> Arrays -> Stacks', 'Big-O & Arrays -> Stacks & Linear Structures -> Binary Search -> Trees & HashMaps', 'Graph Theory -> Bit Manipulation -> Variables', 'Trees -> Arrays -> Time Complexity'],
                correctOptionIndex: 1,
                explanation: 'Mastering Big-O and Arrays first establishes the foundation for Stacks, Binary Search, and hierarchical Tree structures.'
              }
            ]
          }
        ]
      }
    ]
  },
  c: {
    id: 'c',
    title: 'C Programming for Beginners',
    tagline: '37 Step-by-Step Lessons: From Variables & Loops to Pointers, Structs, Files & Dynamic Memory',
    description: 'Master C programming from the ground up with the official 37-part video series. Learn data types, operators, conditionals, loops, number algorithms (Armstrong, Palindrome, Prime), arrays, strings, matrix math, functions, recursion, pointers, call by reference, structures, unions, file I/O, and dynamic memory allocation.',
    iconName: 'Terminal',
    color: '#A8B9CC',
    bgGlow: 'from-purple-500/20 to-indigo-600/10',
    totalTopics: 37,
    modules: [
      {
        id: 'c-m1',
        subjectId: 'c',
        title: 'Module 1: Introduction, Data Types & Operators (Topics 01–07)',
        description: 'C introduction, int & float, char & double, arithmetic operators (Parts 1 & 2), relational/logical operators, and scanf user input.',
        order: 1,
        topics: [
          {
            id: 'c-01-intro',
            subjectId: 'c',
            moduleId: 'c-m1',
            title: '01. Introduction to C Programming',
            description: 'Overview of C language, compiler toolchain (GCC), structure of a C program, and main() entry point.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: [],
            order: 1,
            content: {
              summary: 'C is a general-purpose, procedural language designed for system programming with high execution speed and direct memory access.',
              conceptExplanation: 'A C program starts execution at the main() function. The #include <stdio.h> directive includes standard input/output header functions like printf().',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World! Welcome to C Programming.\\n");\n    return 0;\n}',
              expectedOutput: 'Hello, World! Welcome to C Programming.',
              keyTakeaways: [
                'main() is the starting execution point of every C program',
                '#include <stdio.h> provides essential standard I/O library functions',
                'return 0 indicates successful program termination to the OS'
              ],
              youtubeVideoId: 'Zi_n_mE3pEM',
              youtubeUrl: 'https://www.youtube.com/watch?v=Zi_n_mE3pEM',
              youtubeDuration: '10:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-01-1',
                topicId: 'c-01-intro',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which function is the mandatory entry point for every C program?',
                options: ['start()', 'main()', 'init()', 'run()'],
                correctOptionIndex: 1,
                explanation: 'Execution in C always starts from the main() function.'
              }
            ]
          },
          {
            id: 'c-02-int-float',
            subjectId: 'c',
            moduleId: 'c-m1',
            title: '02. int & float Data Types',
            description: 'Understanding integer (int) and floating-point (float) variables, memory size, and format specifiers (%d, %f).',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-01-intro'],
            order: 2,
            content: {
              summary: 'int stores whole numbers (typically 4 bytes) and float stores single-precision decimal values (4 bytes).',
              conceptExplanation: 'Use %d to print or read integers and %f (or %.2f for two decimal places) for floats in printf and scanf.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float height = 5.9f;\n    printf("Age: %d, Height: %.1f ft\\n", age, height);\n    return 0;\n}',
              expectedOutput: 'Age: 20, Height: 5.9 ft',
              keyTakeaways: [
                '%d is the format specifier for signed integers',
                '%f is the format specifier for floating-point numbers',
                '%.2f restricts decimal output to 2 digits'
              ],
              youtubeVideoId: 'ixaX9hbMQ-g',
              youtubeUrl: 'https://www.youtube.com/watch?v=ixaX9hbMQ-g',
              youtubeDuration: '11:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-02-1',
                topicId: 'c-02-int-float',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Which format specifier is used to display an int variable in printf?',
                options: ['%f', '%d', '%c', '%s'],
                correctOptionIndex: 1,
                explanation: '%d (or %i) is used for integer formatting in printf.'
              }
            ]
          },
          {
            id: 'c-03-char-double',
            subjectId: 'c',
            moduleId: 'c-m1',
            title: '03. Char & double Data Types',
            description: 'Character data type (char), ASCII character codes, double-precision floats (double), and %c / %lf specifiers.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-02-int-float'],
            order: 3,
            content: {
              summary: 'char stores a single 1-byte ASCII character enclosed in single quotes; double stores high-precision 8-byte decimals.',
              conceptExplanation: 'Characters in C are internally represented by their ASCII integer codes (e.g. \'A\' is 65). double uses %lf in scanf and %f / %lf in printf.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    char grade = \'A\';\n    double pi = 3.1415926535;\n    printf("Grade: %c (ASCII: %d), Pi: %.6lf\\n", grade, grade, pi);\n    return 0;\n}',
              expectedOutput: 'Grade: A (ASCII: 65), Pi: 3.141593',
              keyTakeaways: [
                'char variables occupy 1 byte and store ASCII numerical values',
                'double provides 64-bit double precision for scientific calculations',
                'Single quotes represent single characters (\'A\'), double quotes represent strings ("A")'
              ],
              youtubeVideoId: 'hjoHjnAUs4s',
              youtubeUrl: 'https://www.youtube.com/watch?v=hjoHjnAUs4s',
              youtubeDuration: '12:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-03-1',
                topicId: 'c-03-char-double',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of char ch = \'A\'; printf("%d", ch); in C?',
                options: ['A', '65', '1', 'Error'],
                correctOptionIndex: 1,
                explanation: 'Printing a char with %d outputs its underlying ASCII numerical value (65 for \'A\').'
              }
            ]
          },
          {
            id: 'c-04-arithmetic-1',
            subjectId: 'c',
            moduleId: 'c-m1',
            title: '04. Arithmetic Operators (Part 1)',
            description: 'Basic arithmetic: addition (+), subtraction (-), multiplication (*), division (/), and modulus (%).',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-03-char-double'],
            order: 4,
            content: {
              summary: 'Perform mathematical arithmetic in C: addition, subtraction, multiplication, integer division, and remainder extraction.',
              conceptExplanation: 'Integer division 7 / 2 truncates fractional parts to 3. The modulus operator % returns the integer remainder of division (e.g. 7 % 2 is 1).',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int a = 15, b = 4;\n    printf("Sum: %d, Quotient: %d, Remainder: %d\\n", a + b, a / b, a % b);\n    return 0;\n}',
              expectedOutput: 'Sum: 19, Quotient: 3, Remainder: 3',
              keyTakeaways: [
                'Integer division truncates towards zero; use float cast for decimals (e.g. (float)a / b)',
                'The modulus operator % operates strictly on integer operands'
              ],
              youtubeVideoId: 'Sa1lfPsDjMM',
              youtubeUrl: 'https://www.youtube.com/watch?v=Sa1lfPsDjMM',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-04-1',
                topicId: 'c-04-arithmetic-1',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the value of 19 % 5 in C?',
                options: ['3', '4', '3.8', '0'],
                correctOptionIndex: 1,
                explanation: '19 divided by 5 is 3 with a remainder of 4 (19 % 5 = 4).'
              }
            ]
          },
          {
            id: 'c-05-arithmetic-2',
            subjectId: 'c',
            moduleId: 'c-m1',
            title: '05. Arithmetic Operators (Part 2)',
            description: 'Pre-increment (++i), post-increment (i++), pre-decrement (--i), post-decrement (i--), and operator precedence.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['c-04-arithmetic-1'],
            order: 5,
            content: {
              summary: 'Master prefix and postfix increment/decrement operators and their evaluation timing in expressions.',
              conceptExplanation: 'Prefix (++a) increments before evaluating the surrounding expression; Postfix (a++) evaluates the current value first, then increments.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int a = 5, b = 5;\n    int x = ++a; // a becomes 6, x becomes 6\n    int y = b++; // y becomes 5, b becomes 6\n    printf("x: %d, y: %d, a: %d, b: %d\\n", x, y, a, b);\n    return 0;\n}',
              expectedOutput: 'x: 6, y: 5, a: 6, b: 6',
              keyTakeaways: [
                '++i increments the variable before using its value in the expression',
                'i++ uses the current value in the expression, then increments',
                'Multiplication and division have higher precedence than addition and subtraction'
              ],
              youtubeVideoId: 'Vv9Hoxz-p6U',
              youtubeUrl: 'https://www.youtube.com/watch?v=Vv9Hoxz-p6U',
              youtubeDuration: '14:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-05-1',
                topicId: 'c-05-arithmetic-2',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of int a = 10; int b = a++; printf("%d %d", a, b);?',
                options: ['11 10', '10 10', '11 11', '10 11'],
                correctOptionIndex: 0,
                explanation: 'b receives the original value 10 before a is incremented to 11.'
              }
            ]
          },
          {
            id: 'c-06-relational-logical',
            subjectId: 'c',
            moduleId: 'c-m1',
            title: '06. Relational and Logical Operators',
            description: 'Comparison operators (<, >, <=, >=, ==, !=) and logical operators (&&, ||, !) with truth evaluation.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-05-arithmetic-2'],
            order: 6,
            content: {
              summary: 'Evaluate boolean relationships where 0 represents false and 1 (or any non-zero) represents true.',
              conceptExplanation: '&& requires both operands true; || requires at least one true; ! inverts truth value. Short-circuit evaluation halts once the outcome is determined.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int age = 22;\n    int hasId = 1;\n    if (age >= 18 && hasId) {\n        printf("Entry allowed!\\n");\n    }\n    return 0;\n}',
              expectedOutput: 'Entry allowed!',
              keyTakeaways: [
                'In C, boolean expressions return integer 1 for true and 0 for false',
                'Logical AND (&&) has higher precedence than Logical OR (||)',
                'Equality comparison uses == (double equal), not = (assignment)'
              ],
              youtubeVideoId: 'ThgpAn-gniA',
              youtubeUrl: 'https://www.youtube.com/watch?v=ThgpAn-gniA',
              youtubeDuration: '12:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-06-1',
                topicId: 'c-06-relational-logical',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What does the expression (5 > 3 && 2 > 8) evaluate to in C?',
                options: ['1 (True)', '0 (False)', '-1', 'Undefined'],
                correctOptionIndex: 1,
                explanation: '5 > 3 is true (1) but 2 > 8 is false (0). Since 1 && 0 is false, it evaluates to 0.'
              }
            ]
          },
          {
            id: 'c-07-scanf-input',
            subjectId: 'c',
            moduleId: 'c-m1',
            title: '07. Scanf — User Input',
            description: 'Reading keyboard input from stdin using scanf(), address-of operator (&), and reading multiple values.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-06-relational-logical'],
            order: 7,
            content: {
              summary: 'Use scanf() to take user input from the console and store it in variable memory addresses.',
              conceptExplanation: 'The & (address-of) operator passes the memory address of the variable so scanf can write the input directly into memory.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int number;\n    printf("Enter an integer: ");\n    // scanf("%d", &number);\n    number = 42; // Example value\n    printf("You entered: %d\\n", number);\n    return 0;\n}',
              expectedOutput: 'You entered: 42',
              keyTakeaways: [
                'Always include & before scalar variables in scanf("%d", &var)',
                'scanf returns the count of successfully parsed input items',
                'Multiple inputs can be read in one line: scanf("%d %f", &a, &b)'
              ],
              youtubeVideoId: 'W3NSluYwwdM',
              youtubeUrl: 'https://www.youtube.com/watch?v=W3NSluYwwdM',
              youtubeDuration: '13:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-07-1',
                topicId: 'c-07-scanf-input',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why is the & symbol required in scanf("%d", &num)?',
                options: ['It specifies the data type', 'It provides the memory address where the input value should be stored', 'It clears the input buffer', 'It converts integer to string'],
                correctOptionIndex: 1,
                explanation: 'The & operator passes the address of num, enabling scanf to modify its value directly in memory.'
              }
            ]
          }
        ]
      },
      {
        id: 'c-m2',
        subjectId: 'c',
        title: 'Module 2: Conditionals, Control Flow & Applications (Topics 08–13)',
        description: 'if-else statements, else-if ladder, leap year & nested if, getch(), building a calculator app, and switch case.',
        order: 2,
        topics: [
          {
            id: 'c-08-if-else',
            subjectId: 'c',
            moduleId: 'c-m2',
            title: '08. if else Conditional Statements',
            description: 'Conditional decision making, if and else branching blocks, and block scoping with braces.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-07-scanf-input'],
            order: 8,
            content: {
              summary: 'Control program execution flow based on whether a boolean condition evaluates to true (non-zero) or false (0).',
              conceptExplanation: 'If the condition inside if(...) is true, the if-block executes; otherwise, the else block executes.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int marks = 75;\n    if (marks >= 50) {\n        printf("Result: PASS\\n");\n    } else {\n        printf("Result: FAIL\\n");\n    }\n    return 0;\n}',
              expectedOutput: 'Result: PASS',
              keyTakeaways: [
                'Any non-zero integer is treated as true in C if conditions',
                'Always use braces {} to group multiple statements inside if/else blocks'
              ],
              youtubeVideoId: 'wiVkDyyjXSw',
              youtubeUrl: 'https://www.youtube.com/watch?v=wiVkDyyjXSw',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-08-1',
                topicId: 'c-08-if-else',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is printed by if (0) printf("A"); else printf("B"); in C?',
                options: ['A', 'B', 'AB', 'Error'],
                correctOptionIndex: 1,
                explanation: 'In C, 0 is strictly false, so the else branch executes and prints B.'
              }
            ]
          },
          {
            id: 'c-09-else-if-positive-negative',
            subjectId: 'c',
            moduleId: 'c-m2',
            title: '09. Positive / Negative Number | else if',
            description: 'Chaining multiple conditions using else-if ladders to check positive, negative, and zero values.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-08-if-else'],
            order: 9,
            content: {
              summary: 'The else-if ladder evaluates multiple mutually exclusive conditions sequentially from top to bottom.',
              conceptExplanation: 'Once any condition evaluates to true, its code block executes and all remaining else-if/else branches are bypassed.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int num = -12;\n    if (num > 0) {\n        printf("Positive\\n");\n    } else if (num < 0) {\n        printf("Negative\\n");\n    } else {\n        printf("Zero\\n");\n    }\n    return 0;\n}',
              expectedOutput: 'Negative',
              keyTakeaways: [
                'else-if cascades allow checking multiple conditions in prioritized order',
                'The final else acts as a catch-all fallback when no previous condition is met'
              ],
              youtubeVideoId: 'SajArMi34qg',
              youtubeUrl: 'https://www.youtube.com/watch?v=SajArMi34qg',
              youtubeDuration: '11:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-09-1',
                topicId: 'c-09-else-if-positive-negative',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'In an else-if ladder, what happens after the first condition evaluates to true and its block runs?',
                options: ['All subsequent else-if conditions are evaluated', 'The entire else-if structure terminates and execution continues after it', 'The program restarts', 'The fallback else block also runs'],
                correctOptionIndex: 1,
                explanation: 'In an else-if ladder, only the first matching condition executes; subsequent branches are skipped.'
              }
            ]
          },
          {
            id: 'c-10-leap-year-nested-if',
            subjectId: 'c',
            moduleId: 'c-m2',
            title: '10. Leap Year | Nested if else',
            description: 'Placing if statements inside other if statements, and the leap year century rule algorithm.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['c-09-else-if-positive-negative'],
            order: 10,
            content: {
              summary: 'Nested if-else handles complex multi-tiered decision trees such as calendar leap year determination.',
              conceptExplanation: 'A year is a leap year if divisible by 4, except century years (divisible by 100) which must also be divisible by 400.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int year = 2024;\n    if (year % 4 == 0) {\n        if (year % 100 == 0) {\n            if (year % 400 == 0) printf("%d is a Leap Year\\n", year);\n            else printf("%d is NOT a Leap Year\\n", year);\n        } else {\n            printf("%d is a Leap Year\\n", year);\n        }\n    } else {\n        printf("%d is NOT a Leap Year\\n", year);\n    }\n    return 0;\n}',
              expectedOutput: '2024 is a Leap Year',
              keyTakeaways: [
                'Nested if statements allow checking conditions dependent on previous conditions being true',
                'Can also be written in a single line: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)'
              ],
              youtubeVideoId: '0QO6lhjEeJ8',
              youtubeUrl: 'https://www.youtube.com/watch?v=0QO6lhjEeJ8',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-10-1',
                topicId: 'c-10-leap-year-nested-if',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Is the year 1900 a leap year according to Gregorian calendar rules?',
                options: ['Yes, because 1900 is divisible by 4', 'No, because century years must be divisible by 400, and 1900 is not', 'Yes, because 1900 is divisible by 100', 'No, because 1900 is not divisible by 4'],
                correctOptionIndex: 1,
                explanation: '1900 is divisible by 100 but not by 400, so it is NOT a leap year.'
              }
            ]
          },
          {
            id: 'c-11-getch-turbo-c',
            subjectId: 'c',
            moduleId: 'c-m2',
            title: '11. getch () — Console Input & Screen Holding',
            description: 'Understanding getch() in conio.h, pausing console output, reading keypress without Enter, and portable alternatives.',
            estimatedMinutes: 8,
            difficulty: 'Easy',
            prerequisites: ['c-10-leap-year-nested-if'],
            order: 11,
            content: {
              summary: 'getch() reads a single character directly from console without waiting for the Enter key and without echoing it to the screen.',
              conceptExplanation: 'Traditionally used in Turbo C++ to pause execution so the user can inspect output before the console closes.',
              codeSnippet: '#include <stdio.h>\n// In modern standard C, getchar() is used:\n\nint main() {\n    printf("Press any key to continue...\\n");\n    // getchar(); // Standard portable alternative to getch()\n    printf("Finished!\\n");\n    return 0;\n}',
              expectedOutput: 'Press any key to continue...\nFinished!',
              keyTakeaways: [
                'getch() reads a character immediately without buffering or echoing',
                'getchar() is the standard C library alternative defined in <stdio.h>'
              ],
              youtubeVideoId: '0DYAkWa7ahs',
              youtubeUrl: 'https://www.youtube.com/watch?v=0DYAkWa7ahs',
              youtubeDuration: '09:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-11-1',
                topicId: 'c-11-getch-turbo-c',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the primary difference between getch() and getchar()?',
                options: ['getch() reads strings; getchar() reads integers', 'getch() returns immediately without echoing or waiting for Enter, while getchar() buffers until Enter is pressed', 'getchar() is faster', 'There is no difference'],
                correctOptionIndex: 1,
                explanation: 'getch() reads a keypress immediately without screen echo, whereas getchar() uses line-buffered standard input requiring Enter.'
              }
            ]
          },
          {
            id: 'c-12-calculator-app',
            subjectId: 'c',
            moduleId: 'c-m2',
            title: '12. Calculator App using if - else if',
            description: 'Practical project: Building a command-line arithmetic calculator with operator selection (+, -, *, /) and validation.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-11-getch-turbo-c'],
            order: 12,
            content: {
              summary: 'Integrate variables, user input (scanf), and else-if control flow to build a working calculator.',
              conceptExplanation: 'Prompt user for two operands and an operator character, then route computation through else-if branches with division-by-zero validation.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    double num1 = 20, num2 = 4;\n    char op = \'/\';\n    \n    if (op == \'+\') printf("Result: %.2lf\\n", num1 + num2);\n    else if (op == \'-\') printf("Result: %.2lf\\n", num1 - num2);\n    else if (op == \'*\') printf("Result: %.2lf\\n", num1 * num2);\n    else if (op == \'/\') {\n        if (num2 != 0) printf("Result: %.2lf\\n", num1 / num2);\n        else printf("Error: Division by zero\\n");\n    } else printf("Invalid operator\\n");\n    return 0;\n}',
              expectedOutput: 'Result: 5.00',
              keyTakeaways: [
                'Always guard against division by zero (num2 == 0)',
                'Use char comparison (op == \'+\') with single quotes for character operators'
              ],
              youtubeVideoId: 'vi9XWxpX3v8',
              youtubeUrl: 'https://www.youtube.com/watch?v=vi9XWxpX3v8',
              youtubeDuration: '14:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-12-1',
                topicId: 'c-12-calculator-app',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Why is it critical to check if (num2 != 0) before executing num1 / num2?',
                options: ['To prevent a division by zero crash / runtime exception', 'Because C cannot divide floating-point numbers', 'To format output correctly', 'It is not necessary'],
                correctOptionIndex: 0,
                explanation: 'Dividing by zero causes an undefined arithmetic exception that can crash the program.'
              }
            ]
          },
          {
            id: 'c-13-switch-case',
            subjectId: 'c',
            moduleId: 'c-m2',
            title: '13. Switch Case Statements',
            description: 'Multi-way jump branching using switch, case labels, break keyword, and default fallback clause.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['c-12-calculator-app'],
            order: 13,
            content: {
              summary: 'Switch case provides clean, performant multi-way branching for integral values (int, char, enum).',
              conceptExplanation: 'Each case must end with a break statement to prevent fall-through execution into subsequent cases.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int day = 3;\n    switch (day) {\n        case 1: printf("Monday\\n"); break;\n        case 2: printf("Tuesday\\n"); break;\n        case 3: printf("Wednesday\\n"); break;\n        default: printf("Other Day\\n");\n    }\n    return 0;\n}',
              expectedOutput: 'Wednesday',
              keyTakeaways: [
                'Switch expressions must evaluate to integral types (int, char, enum)',
                'break is required to exit the switch block after a matching case',
                'default executes when no case matches'
              ],
              youtubeVideoId: 'pOFmLd843dU',
              youtubeUrl: 'https://www.youtube.com/watch?v=pOFmLd843dU',
              youtubeDuration: '13:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-13-1',
                topicId: 'c-13-switch-case',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What happens if you omit break at the end of a matching case in a C switch statement?',
                options: ['Compiler error', 'Execution falls through and runs subsequent case statements until a break or end of switch', 'The switch statement restarts', 'The default case executes immediately'],
                correctOptionIndex: 1,
                explanation: 'Without break, C falls through and executes the statements in following cases sequentially.'
              }
            ]
          }
        ]
      },
      {
        id: 'c-m3',
        subjectId: 'c',
        title: 'Module 3: Iteration, Number Problems & Nested Loops (Topics 14–21)',
        description: 'For, while & do-while loops, Sum of Digits, Armstrong numbers, Palindrome numbers, Prime numbers, and Nested Loops.',
        order: 3,
        topics: [
          {
            id: 'c-14-for-loop',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '14. For Loop Iterative Statements',
            description: '3-part loop header: initialization, condition checking, and increment/decrement step with loop counting.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-13-switch-case'],
            order: 14,
            content: {
              summary: 'The for loop provides a structured syntax for executing a block of code a known number of times.',
              conceptExplanation: 'Syntax: for (init; condition; step) { body }. Initialization runs once, condition is tested before each iteration, step runs after each iteration.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}',
              expectedOutput: '1 2 3 4 5 ',
              keyTakeaways: [
                'for loop consolidates initialization, condition, and increment in one header',
                'Loop continues while condition is true and terminates as soon as it becomes false'
              ],
              youtubeVideoId: 'PEcU-8KGogQ',
              youtubeUrl: 'https://www.youtube.com/watch?v=PEcU-8KGogQ',
              youtubeDuration: '12:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-14-1',
                topicId: 'c-14-for-loop',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'How many times does for (int i = 0; i < 4; i++) iterate?',
                options: ['3', '4', '5', 'Infinite'],
                correctOptionIndex: 1,
                explanation: 'It iterates for i = 0, 1, 2, 3 (4 total iterations).'
              }
            ]
          },
          {
            id: 'c-15-while-loop',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '15. While Loop Iterative Statements',
            description: 'Entry-controlled loop repetition, condition testing before body execution, and counter maintenance.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-14-for-loop'],
            order: 15,
            content: {
              summary: 'The while loop repeatedly executes code as long as the specified condition remains true.',
              conceptExplanation: 'Ideal when the exact number of iterations is unknown before runtime (e.g. processing digits of a number).',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int n = 5;\n    while (n > 0) {\n        printf("%d ", n);\n        n--;\n    }\n    printf("\\n");\n    return 0;\n}',
              expectedOutput: '5 4 3 2 1 ',
              keyTakeaways: [
                'Entry-controlled: If condition is false initially, the body executes 0 times',
                'Ensure the loop variable updates inside the body to prevent infinite loops'
              ],
              youtubeVideoId: 'ck01r6NVv7Y',
              youtubeUrl: 'https://www.youtube.com/watch?v=ck01r6NVv7Y',
              youtubeDuration: '11:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-15-1',
                topicId: 'c-15-while-loop',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of int i = 1; while (i <= 3) { printf("%d", i); i += 2; }?',
                options: ['13', '123', '12', '1'],
                correctOptionIndex: 0,
                explanation: 'i starts at 1 (printed), increments to 3 (printed), then increments to 5 (loop terminates). Output: 13.'
              }
            ]
          },
          {
            id: 'c-16-do-while-loop',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '16. do while Loop Iterative Statements',
            description: 'Exit-controlled loops, guaranteed single initial execution, and trailing semicolon syntax.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-15-while-loop'],
            order: 16,
            content: {
              summary: 'The do-while loop executes the body first before evaluating the condition at the end.',
              conceptExplanation: 'Guaranteed to run at least once, making it ideal for interactive menu programs.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int i = 1;\n    do {\n        printf("Count: %d\\n", i);\n        i++;\n    } while (i <= 2);\n    return 0;\n}',
              expectedOutput: 'Count: 1\nCount: 2',
              keyTakeaways: [
                'do-while always executes at least once regardless of condition',
                'Syntax requires a closing semicolon: } while (condition);'
              ],
              youtubeVideoId: 'CQAMRuZ5uNw',
              youtubeUrl: 'https://www.youtube.com/watch?v=CQAMRuZ5uNw',
              youtubeDuration: '10:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-16-1',
                topicId: 'c-16-do-while-loop',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the guaranteed minimum number of times a do-while loop body will execute?',
                options: ['0', '1', '2', 'Depends on condition'],
                correctOptionIndex: 1,
                explanation: 'Because condition evaluation occurs at the end, the body always executes at least 1 time.'
              }
            ]
          },
          {
            id: 'c-17-sum-of-digits',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '17. Sum of Digits of a Number',
            description: 'Extracting last digits with modulus (% 10), truncating with division (/ 10), and summing digits in a loop.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['c-16-do-while-loop'],
            order: 17,
            content: {
              summary: 'Extract individual digits of an integer and compute their cumulative sum using while loops.',
              conceptExplanation: 'num % 10 extracts the rightmost digit; num = num / 10 removes the rightmost digit until num reaches 0.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int num = 1234, sum = 0;\n    while (num > 0) {\n        int digit = num % 10;\n        sum += digit;\n        num /= 10;\n    }\n    printf("Sum of digits: %d\\n", sum);\n    return 0;\n}',
              expectedOutput: 'Sum of digits: 10',
              keyTakeaways: [
                'num % 10 isolates the least significant digit',
                'num / 10 shifts the number right by one decimal place',
                'Loop runs until num == 0'
              ],
              youtubeVideoId: 'ZM71FswcPK4',
              youtubeUrl: 'https://www.youtube.com/watch?v=ZM71FswcPK4',
              youtubeDuration: '11:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-17-1',
                topicId: 'c-17-sum-of-digits',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the sum of digits of 54321?',
                options: ['15', '12', '14', '10'],
                correctOptionIndex: 0,
                explanation: '5 + 4 + 3 + 2 + 1 = 15.'
              }
            ]
          },
          {
            id: 'c-18-armstrong-number',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '18. Armstrong Number',
            description: 'Definition of an Armstrong number (sum of cubes of digits equals original number) and verification algorithm.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-17-sum-of-digits'],
            order: 18,
            content: {
              summary: 'An Armstrong number (e.g. 153, 370, 371, 407) equals the sum of its own digits each raised to the power of the number of digits.',
              conceptExplanation: 'For 153: 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153. Preserve original number in a temp variable for comparison.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int num = 153, temp = num, sum = 0;\n    while (temp > 0) {\n        int r = temp % 10;\n        sum += (r * r * r);\n        temp /= 10;\n    }\n    if (sum == num) printf("%d is an Armstrong Number\\n", num);\n    else printf("%d is NOT an Armstrong Number\\n", num);\n    return 0;\n}',
              expectedOutput: '153 is an Armstrong Number',
              keyTakeaways: [
                'Always copy num to a temp variable before modifying in loop',
                'Calculate (r * r * r) for 3-digit Armstrong numbers',
                'Compare accumulated sum with the original number'
              ],
              youtubeVideoId: 'O9xssz3T0KY',
              youtubeUrl: 'https://www.youtube.com/watch?v=O9xssz3T0KY',
              youtubeDuration: '13:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-18-1',
                topicId: 'c-18-armstrong-number',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Which of the following is a valid 3-digit Armstrong number?',
                options: ['123', '153', '200', '101'],
                correctOptionIndex: 1,
                explanation: '1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153 (an Armstrong number).'
              }
            ]
          },
          {
            id: 'c-19-palindrome-number',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '19. Palindrome Number',
            description: 'Reversing integer digits with rev = rev * 10 + rem, and checking if number equals its reverse.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['c-18-armstrong-number'],
            order: 19,
            content: {
              summary: 'A Palindrome number reads the same backward as forward (e.g. 121, 1331, 12321).',
              conceptExplanation: 'Construct reversed number using rev = rev * 10 + (num % 10) in a loop, then verify rev == original.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int num = 1221, temp = num, rev = 0;\n    while (temp > 0) {\n        int rem = temp % 10;\n        rev = rev * 10 + rem;\n        temp /= 10;\n    }\n    if (rev == num) printf("%d is a Palindrome\\n", num);\n    else printf("%d is NOT a Palindrome\\n", num);\n    return 0;\n}',
              expectedOutput: '1221 is a Palindrome',
              keyTakeaways: [
                'rev = rev * 10 + rem builds the reversed integer digit-by-digit',
                'Palindromes are symmetric around their center'
              ],
              youtubeVideoId: '5AE4kl1-v4A',
              youtubeUrl: 'https://www.youtube.com/watch?v=5AE4kl1-v4A',
              youtubeDuration: '12:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-19-1',
                topicId: 'c-19-palindrome-number',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the reverse of integer 1234 constructed via rev = rev * 10 + rem?',
                options: ['1234', '4321', '4312', '4231'],
                correctOptionIndex: 1,
                explanation: 'Reversing the digits of 1234 produces 4321.'
              }
            ]
          },
          {
            id: 'c-20-prime-number',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '20. Prime Number',
            description: 'Definition of a prime number, factor counting, trial division algorithm, and break optimization.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-19-palindrome-number'],
            order: 20,
            content: {
              summary: 'A Prime number is greater than 1 and has no positive divisors other than 1 and itself.',
              conceptExplanation: 'Check for divisors between 2 and n/2 (or sqrt(n)). If any factor divides evenly (n % i == 0), mark as composite and break.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int n = 29, isPrime = 1;\n    if (n <= 1) isPrime = 0;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) { isPrime = 0; break; }\n    }\n    printf("%d is %s\\n", n, isPrime ? "Prime" : "Not Prime");\n    return 0;\n}',
              expectedOutput: '29 is Prime',
              keyTakeaways: [
                'Numbers <= 1 are NOT prime',
                '2 is the only even prime number',
                'Testing up to i * i <= n reduces time complexity from O(N) to O(sqrt(N))'
              ],
              youtubeVideoId: 'hz4QpLPa4BY',
              youtubeUrl: 'https://www.youtube.com/watch?v=hz4QpLPa4BY',
              youtubeDuration: '13:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-20-1',
                topicId: 'c-20-prime-number',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the smallest positive prime number?',
                options: ['0', '1', '2', '3'],
                correctOptionIndex: 2,
                explanation: '2 is the smallest prime number and the only even prime.'
              }
            ]
          },
          {
            id: 'c-21-nested-loops',
            subjectId: 'c',
            moduleId: 'c-m3',
            title: '21. Nested Loops',
            description: 'Outer and inner loop execution, 2D row-column iterations, and printing geometric patterns.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['c-20-prime-number'],
            order: 21,
            content: {
              summary: 'Nested loops place one loop inside another to traverse 2D grids and print patterns.',
              conceptExplanation: 'For each single iteration of the outer loop (rows), the inner loop (columns) runs to completion.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    for (int r = 1; r <= 3; r++) {\n        for (int c = 1; c <= r; c++) {\n            printf("* ");\n        }\n        printf("\\n");\n    }\n    return 0;\n}',
              expectedOutput: '* \n* * \n* * * ',
              keyTakeaways: [
                'Outer loop controls row index; inner loop controls column output',
                'Total inner executions = rows * columns'
              ],
              youtubeVideoId: 'QSJy2PCFKQY',
              youtubeUrl: 'https://www.youtube.com/watch?v=QSJy2PCFKQY',
              youtubeDuration: '14:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-21-1',
                topicId: 'c-21-nested-loops',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'How many total stars are printed by for(int i=1;i<=4;i++) for(int j=1;j<=i;j++) printf("*");?',
                options: ['4', '10', '16', '8'],
                correctOptionIndex: 1,
                explanation: 'Row 1 has 1 star, row 2 has 2, row 3 has 3, row 4 has 4 (1 + 2 + 3 + 4 = 10 total stars).'
              }
            ]
          }
        ]
      },
      {
        id: 'c-m4',
        subjectId: 'c',
        title: 'Module 4: Arrays, Strings, Matrices & Functions (Topics 22–30)',
        description: '1D Arrays, Sum & Average, Min & Max, Strings, 2D Arrays, Matrix Addition/Transpose, Functions, Applications, and Recursion.',
        order: 4,
        topics: [
          {
            id: 'c-22-arrays-1d',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '22. Arrays | 1D Arrays in C',
            description: 'Homogeneous elements in contiguous memory cells, 0-based indexing, declaration, and memory traversal.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['c-21-nested-loops'],
            order: 22,
            content: {
              summary: 'An array stores multiple items of the same data type in sequential, contiguous memory locations.',
              conceptExplanation: 'Elements are accessed by 0-indexed positions arr[0] to arr[size - 1].',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int scores[4] = { 88, 92, 79, 95 };\n    for (int i = 0; i < 4; i++) {\n        printf("Score [%d] = %d\\n", i, scores[i]);\n    }\n    return 0;\n}',
              expectedOutput: 'Score [0] = 88\nScore [1] = 92\nScore [2] = 79\nScore [3] = 95',
              keyTakeaways: [
                'Arrays are 0-indexed in C',
                'Memory layout is contiguous: address of arr[i] = base + i * sizeof(type)',
                'C does not perform bounds checking'
              ],
              youtubeVideoId: '8JPtAO392h8',
              youtubeUrl: 'https://www.youtube.com/watch?v=8JPtAO392h8',
              youtubeDuration: '14:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-22-1',
                topicId: 'c-22-arrays-1d',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the index of the last element in an array declared as int arr[10];?',
                options: ['10', '9', '1', 'Undefined'],
                correctOptionIndex: 1,
                explanation: 'With 0-based indexing, a 10-element array has valid indices 0 through 9.'
              }
            ]
          },
          {
            id: 'c-23-sum-avg-array',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '23. Sum & Average of Array Elements',
            description: 'Iterating through array elements with an accumulator variable, calculating sum, and typecasting float average.',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            prerequisites: ['c-22-arrays-1d'],
            order: 23,
            content: {
              summary: 'Traverse an array to accumulate total sum and compute average value.',
              conceptExplanation: 'Cast sum to float (float)sum / n to avoid integer division truncation.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int arr[] = { 10, 20, 30, 40, 50 };\n    int n = 5, sum = 0;\n    for (int i = 0; i < n; i++) sum += arr[i];\n    float avg = (float)sum / n;\n    printf("Sum: %d, Average: %.2f\\n", sum, avg);\n    return 0;\n}',
              expectedOutput: 'Sum: 150, Average: 30.00',
              keyTakeaways: [
                'Initialize sum to 0 before accumulation loop',
                'Cast to float when dividing to retain decimal places'
              ],
              youtubeVideoId: 'EvFE1nwbKFw',
              youtubeUrl: 'https://www.youtube.com/watch?v=EvFE1nwbKFw',
              youtubeDuration: '11:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-23-1',
                topicId: 'c-23-sum-avg-array',
                difficulty: 'Easy',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the average of array { 5, 10, 15 }?',
                options: ['10.0', '15.0', '30.0', '5.0'],
                correctOptionIndex: 0,
                explanation: '(5 + 10 + 15) / 3 = 30 / 3 = 10.0.'
              }
            ]
          },
          {
            id: 'c-24-min-max-array',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '24. Maximum & Minimum Element of an Array',
            description: 'Linear search for minimum and maximum values, initializing trackers with arr[0], and updating on comparison.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['c-23-sum-avg-array'],
            order: 24,
            content: {
              summary: 'Find the largest and smallest numbers in an array in O(N) linear time.',
              conceptExplanation: 'Initialize max = arr[0] and min = arr[0]. Compare each element and update whenever a larger or smaller value is found.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int arr[] = { 45, 12, 89, 7, 63 };\n    int n = 5, max = arr[0], min = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] > max) max = arr[i];\n        if (arr[i] < min) min = arr[i];\n    }\n    printf("Max: %d, Min: %d\\n", max, min);\n    return 0;\n}',
              expectedOutput: 'Max: 89, Min: 7',
              keyTakeaways: [
                'Always initialize min and max with arr[0] (not 0, which fails on negative numbers)',
                'Loop can start at index 1 since index 0 is already initialized'
              ],
              youtubeVideoId: 'bSvSgCmvbI0',
              youtubeUrl: 'https://www.youtube.com/watch?v=bSvSgCmvbI0',
              youtubeDuration: '12:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-24-1',
                topicId: 'c-24-min-max-array',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'Why should min and max be initialized with arr[0] rather than 0?',
                options: ['Because 0 is invalid syntax', 'Because if all array elements are negative, initializing max with 0 will return 0 incorrectly', 'To speed up the loop', 'Because C arrays cannot hold zero'],
                correctOptionIndex: 1,
                explanation: 'If all numbers are negative (e.g. [-5, -12, -8]), setting max=0 would falsely report 0 as the maximum.'
              }
            ]
          },
          {
            id: 'c-25-strings-char-array',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '25. Strings in C [Char Array]',
            description: 'Null-terminated character arrays, string reading (%s), string literals, and null terminator byte (\0).',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['c-24-min-max-array'],
            order: 25,
            content: {
              summary: 'Strings in C are 1D character arrays terminated by a special null character (\0).',
              conceptExplanation: '"Hello" occupies 6 bytes in memory (5 characters + 1 byte for \0). %s reads until whitespace.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    char name[] = "TopicSolver";\n    printf("String: %s\\n", name);\n    return 0;\n}',
              expectedOutput: 'String: TopicSolver',
              keyTakeaways: [
                'All C strings must terminate with the null character \0',
                'Array size must be at least length + 1 to hold the null terminator',
                'printf("%s") prints characters until it encounters \0'
              ],
              youtubeVideoId: 'lxOcM748Xc0',
              youtubeUrl: 'https://www.youtube.com/watch?v=lxOcM748Xc0',
              youtubeDuration: '14:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-25-1',
                topicId: 'c-25-strings-char-array',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'How many bytes of memory does string "CODE" take in C?',
                options: ['4 bytes', '5 bytes', '8 bytes', '1 byte'],
                correctOptionIndex: 1,
                explanation: '4 characters + 1 null terminator byte (\0) = 5 bytes total.'
              }
            ]
          },
          {
            id: 'c-26-2d-arrays',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '26. 2-D Arrays in C',
            description: 'Two-dimensional grid arrays, row-major memory representation, nested loops traversal, and matrix indexing.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-25-strings-char-array'],
            order: 26,
            content: {
              summary: '2D arrays represent tables of elements with rows and columns, stored contiguously in row-major order.',
              conceptExplanation: 'Declared as type arr[rows][cols]. Element at row r and column c is accessed via arr[r][c].',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int matrix[2][3] = { {1, 2, 3}, {4, 5, 6} };\n    for (int r = 0; r < 2; r++) {\n        for (int c = 0; c < 3; c++) {\n            printf("%d ", matrix[r][c]);\n        }\n        printf("\\n");\n    }\n    return 0;\n}',
              expectedOutput: '1 2 3 \n4 5 6 ',
              keyTakeaways: [
                '2D arrays are indexed as [row][column]',
                'C stores 2D arrays in row-major sequential order in memory'
              ],
              youtubeVideoId: 'QK6h66LKOYU',
              youtubeUrl: 'https://www.youtube.com/watch?v=QK6h66LKOYU',
              youtubeDuration: '15:15'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-26-1',
                topicId: 'c-26-2d-arrays',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'In int mat[3][3] = {{1,2,3},{4,5,6},{7,8,9}};, what is mat[1][2]?',
                options: ['2', '4', '6', '8'],
                correctOptionIndex: 2,
                explanation: 'Row index 1 is {4, 5, 6}, and column index 2 is 6.'
              }
            ]
          },
          {
            id: 'c-27-matrix-addition-transpose',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '27. Addition of Matrix & Transpose of Matrix',
            description: 'Element-wise matrix addition (A[i][j] + B[i][j]) and matrix transposition (swap rows and columns T[j][i] = A[i][j]).',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['c-26-2d-arrays'],
            order: 27,
            content: {
              summary: 'Perform linear algebra matrix operations in C: addition of same-dimension matrices and matrix transposition.',
              conceptExplanation: 'Matrix addition adds corresponding elements C[i][j] = A[i][j] + B[i][j]. Transposition swaps indices Trans[j][i] = A[i][j].',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int a[2][2] = {{1, 2}, {3, 4}};\n    int t[2][2];\n    for (int i = 0; i < 2; i++)\n        for (int j = 0; j < 2; j++)\n            t[j][i] = a[i][j];\n    printf("Transposed [0][1]: %d\\n", t[0][1]);\n    return 0;\n}',
              expectedOutput: 'Transposed [0][1]: 3',
              keyTakeaways: [
                'Matrix addition requires identical row and column dimensions',
                'Transposing an M x N matrix results in an N x M matrix'
              ],
              youtubeVideoId: 'P05OZE69kSQ',
              youtubeUrl: 'https://www.youtube.com/watch?v=P05OZE69kSQ',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-27-1',
                topicId: 'c-27-matrix-addition-transpose',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the formula to transpose an element from matrix A to transposed matrix T?',
                options: ['T[i][j] = A[i][j]', 'T[j][i] = A[i][j]', 'T[i][i] = A[j][j]', 'T[i+j] = A[i*j]'],
                correctOptionIndex: 1,
                explanation: 'Transposition flips rows and columns: element at row i, column j moves to row j, column i.'
              }
            ]
          },
          {
            id: 'c-28-functions',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '28. Functions in C',
            description: 'Modular code design, function declaration (prototype), function definition, parameters, and return types.',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            prerequisites: ['c-27-matrix-addition-transpose'],
            order: 28,
            content: {
              summary: 'Functions break complex programs into small, reusable, independent computational blocks.',
              conceptExplanation: '3 parts: Prototype declaration int add(int, int);, Function Call add(5, 3), and Function Definition body.',
              codeSnippet: '#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int res = add(15, 25);\n    printf("Sum: %d\\n", res);\n    return 0;\n}',
              expectedOutput: 'Sum: 40',
              keyTakeaways: [
                'Functions prevent duplicate code and improve maintainability',
                'void return type means the function does not return any value'
              ],
              youtubeVideoId: '_99lZBc-lFY',
              youtubeUrl: 'https://www.youtube.com/watch?v=_99lZBc-lFY',
              youtubeDuration: '13:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-28-1',
                topicId: 'c-28-functions',
                difficulty: 'Easy',
                type: 'MULTIPLE_CHOICE',
                question: 'What return type is used when a function does not return any data to its caller?',
                options: ['null', 'void', 'int', 'empty'],
                correctOptionIndex: 1,
                explanation: 'The void keyword indicates that a function produces no return value.'
              }
            ]
          },
          {
            id: 'c-29-functions-applications',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '29. Applications of Functions in C',
            description: 'Building helper functions, passing arrays to functions, mathematical utilities, and modular program structure.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-28-functions'],
            order: 29,
            content: {
              summary: 'Apply functions to solve real-world problems such as finding factorials, checking primes, and processing arrays.',
              conceptExplanation: 'When passing an array to a function, pass its length as a separate parameter because the array decays into a pointer.',
              codeSnippet: '#include <stdio.h>\n\nint findMax(int arr[], int size) {\n    int max = arr[0];\n    for (int i = 1; i < size; i++) if (arr[i] > max) max = arr[i];\n    return max;\n}\n\nint main() {\n    int nums[] = { 3, 9, 2, 7, 1 };\n    printf("Max: %d\\n", findMax(nums, 5));\n    return 0;\n}',
              expectedOutput: 'Max: 9',
              keyTakeaways: [
                'Passing arrays to functions modifies the original elements if mutated inside',
                'Pass array size explicitly alongside the array pointer'
              ],
              youtubeVideoId: 'gdV_9c4DU9A',
              youtubeUrl: 'https://www.youtube.com/watch?v=gdV_9c4DU9A',
              youtubeDuration: '14:45'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-29-1',
                topicId: 'c-29-functions-applications',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'When an array is passed as an argument to a C function, how is it passed?',
                options: ['By complete value copy of all elements', 'As a pointer to its first element (by reference)', 'As a string', 'It cannot be passed'],
                correctOptionIndex: 1,
                explanation: 'In C, array parameters decay into a pointer to their first element (&arr[0]).'
              }
            ]
          },
          {
            id: 'c-30-recursion',
            subjectId: 'c',
            moduleId: 'c-m4',
            title: '30. Recursion in C',
            description: 'Recursive functions calling themselves, base termination condition, recursive call stack, and factorial/fibonacci.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-29-functions-applications'],
            order: 30,
            content: {
              summary: 'Recursion is a programming technique where a function calls itself to solve smaller subproblems.',
              conceptExplanation: 'Every recursive function must have a base condition to stop recursion; otherwise, the call stack overflows.',
              codeSnippet: '#include <stdio.h>\n\nint fact(int n) {\n    if (n <= 1) return 1; // Base condition\n    return n * fact(n - 1);\n}\n\nint main() {\n    printf("5! = %d\\n", fact(5));\n    return 0;\n}',
              expectedOutput: '5! = 120',
              keyTakeaways: [
                'A base case is mandatory to prevent infinite recursion',
                'Each recursive step pushes a new activation frame onto the call stack'
              ],
              youtubeVideoId: 'UiGsy_Qb1ug',
              youtubeUrl: 'https://www.youtube.com/watch?v=UiGsy_Qb1ug',
              youtubeDuration: '15:20'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-30-1',
                topicId: 'c-30-recursion',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'What is the output of int f(int n) { if(n==1) return 1; return n + f(n-1); } called with f(4)?',
                options: ['10', '24', '4', '8'],
                correctOptionIndex: 0,
                explanation: '4 + 3 + 2 + 1 = 10.'
              }
            ]
          }
        ]
      },
      {
        id: 'c-m5',
        subjectId: 'c',
        title: 'Module 5: Pointers, Structures, Files & Dynamic Memory (Topics 31–37)',
        description: 'Pointers, Call by Value vs Reference, Structures, Unions, File Handling (Parts 1 & 2), and Dynamic Memory Allocation.',
        order: 5,
        topics: [
          {
            id: 'c-31-pointers',
            subjectId: 'c',
            moduleId: 'c-m5',
            title: '31. Pointers in C',
            description: 'Memory addresses, pointer variables (int *p), address-of operator (&), and dereferencing operator (*).',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            prerequisites: ['c-30-recursion'],
            order: 31,
            content: {
              summary: 'A pointer is a variable that stores the memory address of another variable.',
              conceptExplanation: '&var gets the address of var. int *ptr = &var; stores it. *ptr accesses or modifies the value at that address.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int *p = &a;\n    *p = 25; // Modifies a via pointer dereferencing\n    printf("a: %d, address: %p\\n", a, (void*)p);\n    return 0;\n}',
              expectedOutput: 'a: 25, address: 0x7ffd...',
              keyTakeaways: [
                '& is the address-of operator; * is the dereference operator',
                'Pointers provide direct access and manipulation of system memory'
              ],
              youtubeVideoId: 'ZiAC-NrRsqY',
              youtubeUrl: 'https://www.youtube.com/watch?v=ZiAC-NrRsqY',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-31-1',
                topicId: 'c-31-pointers',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'If p is a pointer holding the address of variable x, what does *p evaluate to?',
                options: ['The address of x', 'The value stored inside x', 'The size of x', 'The address of p'],
                correctOptionIndex: 1,
                explanation: 'Dereferencing *p yields the actual value stored at the address pointed to by p.'
              }
            ]
          },
          {
            id: 'c-32-call-by-value-reference',
            subjectId: 'c',
            moduleId: 'c-m5',
            title: '32. Call By Value Call By Reference in C',
            description: 'Passing values (copies) vs passing memory addresses (pointers) to mutate caller variables, swap function.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-31-pointers'],
            order: 32,
            content: {
              summary: 'Call by value passes copies; Call by reference passes pointers allowing functions to mutate original caller variables.',
              conceptExplanation: 'The classic swap function swap(&x, &y) swaps two variables in place using pointer dereferencing.',
              codeSnippet: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    swap(&x, &y);\n    printf("x: %d, y: %d\\n", x, y);\n    return 0;\n}',
              expectedOutput: 'x: 10, y: 5',
              keyTakeaways: [
                'In call by value, modifications inside the function do not affect caller variables',
                'In call by reference, passing &var allows direct in-place mutation'
              ],
              youtubeVideoId: 'mfi3Ah1D-gE',
              youtubeUrl: 'https://www.youtube.com/watch?v=mfi3Ah1D-gE',
              youtubeDuration: '15:10'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-32-1',
                topicId: 'c-32-call-by-value-reference',
                difficulty: 'Medium',
                type: 'OUTPUT_PREDICTION',
                question: 'If void addTen(int *n) { *n += 10; } is called with int x = 5; addTen(&x);, what is x?',
                options: ['5', '15', '10', 'Undefined'],
                correctOptionIndex: 1,
                explanation: 'Because the address of x was passed, *n += 10 modified x directly in place to 15.'
              }
            ]
          },
          {
            id: 'c-33-structures',
            subjectId: 'c',
            moduleId: 'c-m5',
            title: '33. Structures in C',
            description: 'User-defined composite types grouping heterogeneous variables, member access with dot (.), and typedef.',
            estimatedMinutes: 14,
            difficulty: 'Medium',
            prerequisites: ['c-32-call-by-value-reference'],
            order: 33,
            content: {
              summary: 'A structure (struct) groups related variables of different data types into a single compound unit.',
              conceptExplanation: 'Declare fields inside struct and access them via variable dot operator: student.roll_no or student.gpa.',
              codeSnippet: '#include <stdio.h>\n\nstruct Student {\n    int id;\n    char name[20];\n    float marks;\n};\n\nint main() {\n    struct Student s1 = { 101, "Alice", 94.5f };\n    printf("ID: %d, Name: %s, Marks: %.1f\\n", s1.id, s1.name, s1.marks);\n    return 0;\n}',
              expectedOutput: 'ID: 101, Name: Alice, Marks: 94.5',
              keyTakeaways: [
                'structs allow heterogeneous grouping of different data types',
                'Use the dot operator . to read and write member fields'
              ],
              youtubeVideoId: 'q6LGDcXtFqo',
              youtubeUrl: 'https://www.youtube.com/watch?v=q6LGDcXtFqo',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-33-1',
                topicId: 'c-33-structures',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'Which operator is used to access member variables of a struct in C?',
                options: ['Dot .', 'Arrow ->', 'Colon :', 'Hash #'],
                correctOptionIndex: 0,
                explanation: 'Direct structure variables use the dot operator . (e.g. s1.id).'
              }
            ]
          },
          {
            id: 'c-34-unions',
            subjectId: 'c',
            moduleId: 'c-m5',
            title: '34. Unions in C',
            description: 'Shared memory allocations, union size equal to largest member, and memory differences between struct and union.',
            estimatedMinutes: 12,
            difficulty: 'Medium',
            prerequisites: ['c-33-structures'],
            order: 34,
            content: {
              summary: 'A union stores multiple members in the exact same memory space to conserve memory.',
              conceptExplanation: 'The size of a union is determined by its largest member. Only one member can hold a valid value at any time.',
              codeSnippet: '#include <stdio.h>\n\nunion Data {\n    int i;\n    float f;\n    char ch;\n};\n\nint main() {\n    union Data d;\n    d.i = 100;\n    printf("d.i: %d, sizeof(d): %lu\\n", d.i, sizeof(d));\n    return 0;\n}',
              expectedOutput: 'd.i: 100, sizeof(d): 4',
              keyTakeaways: [
                'All members of a union share the same memory location',
                'Writing to one member overwrites other members',
                'Size of a union = size of its largest member'
              ],
              youtubeVideoId: 'jIq0fkrS4EY',
              youtubeUrl: 'https://www.youtube.com/watch?v=jIq0fkrS4EY',
              youtubeDuration: '13:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-34-1',
                topicId: 'c-34-unions',
                difficulty: 'Medium',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the memory size of a union containing an int (4 bytes), double (8 bytes), and char (1 byte)?',
                options: ['13 bytes (sum of all)', '8 bytes (size of largest)', '4 bytes', '16 bytes'],
                correctOptionIndex: 1,
                explanation: 'A union allocates memory equal to its largest member (8 bytes for double).'
              }
            ]
          },
          {
            id: 'c-35-file-handling-1',
            subjectId: 'c',
            moduleId: 'c-m5',
            title: '35. File Handling in C part - 1',
            description: 'File streams, FILE pointer, fopen(), file modes ("w", "r", "a"), fputc(), fputs(), fprintf(), and fclose().',
            estimatedMinutes: 15,
            difficulty: 'Hard',
            prerequisites: ['c-34-unions'],
            order: 35,
            content: {
              summary: 'Persist data to disk files using standard C I/O file streams and write functions.',
              conceptExplanation: 'Open files using FILE *fp = fopen("filename.txt", "w");. Write with fprintf(fp, ...) and always close with fclose(fp).',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("output.txt", "w");\n    if (fp != NULL) {\n        fprintf(fp, "Hello C File Handling!\\n");\n        fclose(fp);\n        printf("File created and written successfully\\n");\n    }\n    return 0;\n}',
              expectedOutput: 'File created and written successfully',
              keyTakeaways: [
                'Always verify if fp != NULL before accessing a file pointer',
                'Mode "w" creates a new file or overwrites; mode "a" appends to existing content',
                'Always call fclose(fp) to flush buffers and release operating system handles'
              ],
              youtubeVideoId: 'UV9y30gblto',
              youtubeUrl: 'https://www.youtube.com/watch?v=UV9y30gblto',
              youtubeDuration: '16:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-35-1',
                topicId: 'c-35-file-handling-1',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'Which file mode in fopen() appends data without erasing previous content?',
                options: ['"r"', '"w"', '"a"', '"r+"'],
                correctOptionIndex: 2,
                explanation: 'Mode "a" (append) writes new data at the end of the file without clearing existing contents.'
              }
            ]
          },
          {
            id: 'c-36-file-handling-2',
            subjectId: 'c',
            moduleId: 'c-m5',
            title: '36. File Handling in C part - 2',
            description: 'Reading files with fgetc(), fgets(), fscanf(), checking End-Of-File with feof(), and file copying.',
            estimatedMinutes: 15,
            difficulty: 'Hard',
            prerequisites: ['c-35-file-handling-1'],
            order: 36,
            content: {
              summary: 'Read text and data from disk files line-by-line or character-by-character until EOF.',
              conceptExplanation: 'fgets(buffer, size, fp) reads lines safely; fgetc(fp) reads single characters until EOF.',
              codeSnippet: '#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("output.txt", "r");\n    char line[100];\n    if (fp != NULL) {\n        while (fgets(line, sizeof(line), fp) != NULL) {\n            printf("%s", line);\n        }\n        fclose(fp);\n    }\n    return 0;\n}',
              expectedOutput: 'Hello C File Handling!',
              keyTakeaways: [
                'fgets() protects against buffer overflows by limiting max characters read',
                'feof(fp) checks whether the stream has reached the End Of File (EOF)'
              ],
              youtubeVideoId: 'WtUy-VFWe7w',
              youtubeUrl: 'https://www.youtube.com/watch?v=WtUy-VFWe7w',
              youtubeDuration: '15:30'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-36-1',
                topicId: 'c-36-file-handling-2',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What special constant does fgetc() return when it reaches the end of a file?',
                options: ['NULL', '0', 'EOF', '-1'],
                correctOptionIndex: 2,
                explanation: 'fgetc() returns the special integer constant EOF (typically -1) upon reaching end-of-file.'
              }
            ]
          },
          {
            id: 'c-37-dynamic-memory-allocation',
            subjectId: 'c',
            moduleId: 'c-m5',
            title: '37. Dynamic Memory Allocation in C',
            description: 'Heap memory management, malloc(), calloc(), realloc(), free(), and preventing memory leaks.',
            estimatedMinutes: 18,
            difficulty: 'Hard',
            prerequisites: ['c-36-file-handling-2'],
            order: 37,
            content: {
              summary: 'Allocate heap memory dynamically at runtime when size cannot be determined at compile time.',
              conceptExplanation: 'malloc(bytes) allocates raw heap memory. calloc(n, size) allocates and zeroes memory. free(ptr) deallocates memory back to the OS.',
              codeSnippet: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 3;\n    int *arr = (int*)malloc(n * sizeof(int));\n    if (arr != NULL) {\n        arr[0] = 10; arr[1] = 20; arr[2] = 30;\n        printf("Allocated: %d, %d, %d\\n", arr[0], arr[1], arr[2]);\n        free(arr); // Always free dynamically allocated memory\n        arr = NULL;\n    }\n    return 0;\n}',
              expectedOutput: 'Allocated: 10, 20, 30',
              keyTakeaways: [
                'Always verify if malloc returned NULL (out of memory)',
                'Every malloc/calloc allocation MUST be paired with a free() call',
                'Set pointer to NULL after freeing to avoid dangling pointers'
              ],
              youtubeVideoId: '2Rdxk8yfrOU',
              youtubeUrl: 'https://www.youtube.com/watch?v=2Rdxk8yfrOU',
              youtubeDuration: '22:00'
            },
            adaptiveQuestions: [
              {
                id: 'q-c-37-1',
                topicId: 'c-37-dynamic-memory-allocation',
                difficulty: 'Hard',
                type: 'MULTIPLE_CHOICE',
                question: 'What is the primary difference between malloc() and calloc()?',
                options: ['malloc allocates on stack; calloc allocates on heap', 'calloc initializes allocated memory to zero; malloc leaves memory uninitialized with garbage values', 'malloc is slower than calloc', 'calloc cannot be freed'],
                correctOptionIndex: 1,
                explanation: 'calloc() zeroes all allocated memory bytes, whereas malloc() leaves them containing raw uninitialized garbage values.'
              }
            ]
          }
        ]
      }
    ]
  }
};

export const DIAGNOSTIC_QUESTIONS: Record<'java' | 'python' | 'sql' | 'dsa' | 'c', DiagnosticAssessmentQuestion[]> = {
  java: [
    {
      id: 'diag-java-1',
      subjectId: 'java',
      topicId: 'java-04-variables',
      topicName: 'Variables & Primitive Types (Mod 1)',
      difficulty: 'Easy',
      question: 'Which of the following is a primitive data type in Java?',
      options: ['String', 'Integer', 'boolean', 'ArrayList'],
      correctIndex: 2,
      conceptTested: 'Primitive types vs Reference wrapper classes',
      explanation: 'boolean is a primitive type stored on the stack. String and Integer are reference objects.'
    },
    {
      id: 'diag-java-2',
      subjectId: 'java',
      topicId: 'java-01-intro',
      topicName: 'JVM Execution & Bytecode (Mod 1)',
      difficulty: 'Easy',
      question: 'What format does the Java compiler (javac) compile source code (.java) into for the JVM?',
      options: ['Machine Code (.exe)', 'Java Bytecode (.class)', 'Assembly Code (.asm)', 'C Source Code (.c)'],
      correctIndex: 1,
      conceptTested: 'Java Bytecode & WORA execution model',
      explanation: 'javac compiles .java source files into portable bytecode (.class files) executed by the JVM.'
    },
    {
      id: 'diag-java-3',
      subjectId: 'java',
      topicId: 'java-08-if-else',
      topicName: 'Conditionals & Boolean Logic (Mod 2)',
      difficulty: 'Easy',
      question: 'What is the result of 10 > 5 && 3 == 4 in Java?',
      options: ['true', 'false', 'Compilation Error', 'NullPointerException'],
      correctIndex: 1,
      conceptTested: 'Logical AND operator short-circuit evaluation',
      explanation: '10 > 5 is true, but 3 == 4 is false. true && false evaluates to false.'
    },
    {
      id: 'diag-java-4',
      subjectId: 'java',
      topicId: 'java-14-for-loop',
      topicName: 'Loops & Iterations (Mod 2)',
      difficulty: 'Medium',
      question: 'How many times does this loop body execute: for (int i = 1; i <= 5; i++)?',
      options: ['4 times', '5 times', '6 times', '0 times'],
      correctIndex: 1,
      conceptTested: 'For loop boundary conditions',
      explanation: 'i takes values 1, 2, 3, 4, 5 (total of 5 iterations).'
    },
    {
      id: 'diag-java-5',
      subjectId: 'java',
      topicId: 'java-15-functions',
      topicName: 'Methods & Return Types (Mod 3)',
      difficulty: 'Medium',
      question: 'Which keyword indicates that a method does not return any value in Java?',
      options: ['null', 'void', 'empty', 'static'],
      correctIndex: 1,
      conceptTested: 'Void return type specification',
      explanation: 'void specifies that a method returns no value to the caller.'
    },
    {
      id: 'diag-java-6',
      subjectId: 'java',
      topicId: 'java-16-arrays-mistakes',
      topicName: 'Arrays & Indexing (Mod 3)',
      difficulty: 'Medium',
      question: 'What exception is thrown if you access arr[5] on an array of length 5?',
      options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'IllegalArgumentException', 'ClassCastException'],
      correctIndex: 1,
      conceptTested: '0-based indexing limits',
      explanation: 'Array indices range from 0 to length - 1 (0 to 4). Index 5 throws ArrayIndexOutOfBoundsException.'
    },
    {
      id: 'diag-java-7',
      subjectId: 'java',
      topicId: 'java-28-string-methods',
      topicName: 'Strings & Immutability (Mod 4)',
      difficulty: 'Medium',
      question: 'Why are Java String objects considered immutable in memory?',
      options: ['They cannot be assigned to variables', 'Their internal character values cannot be altered after creation', 'They are stored on the hard drive', 'They only accept ASCII characters'],
      correctIndex: 1,
      conceptTested: 'String immutability and string pool security',
      explanation: 'Once a String object is created in Java, its character sequence cannot be changed in memory.'
    },
    {
      id: 'diag-java-8',
      subjectId: 'java',
      topicId: 'java-30-classes-objects',
      topicName: 'OOP & Constructors (Mod 5)',
      difficulty: 'Medium',
      question: 'What is the primary role of a constructor in a Java class?',
      options: ['To destroy unreferenced objects', 'To initialize the state of a newly created instance', 'To convert bytecode to machine code', 'To import packages'],
      correctIndex: 1,
      conceptTested: 'Object initialization via constructors',
      explanation: 'Constructors initialize newly created instances and allocate memory for member variables.'
    },
    {
      id: 'diag-java-9',
      subjectId: 'java',
      topicId: 'java-32-inheritance',
      topicName: 'Inheritance & Polymorphism (Mod 5)',
      difficulty: 'Hard',
      question: 'Which concept in Java allows a subclass to provide a specific implementation of an inherited method?',
      options: ['Method Overloading', 'Method Overriding', 'Encapsulation', 'Data Hiding'],
      correctIndex: 1,
      conceptTested: 'Dynamic method dispatch & overriding',
      explanation: 'Method Overriding allows a subclass to provide a specialized implementation of a superclass method.'
    },
    {
      id: 'diag-java-10',
      subjectId: 'java',
      topicId: 'java-44-exception-handling',
      topicName: 'Exception Handling & Collections (Mod 6)',
      difficulty: 'Hard',
      question: 'Which block in Java is guaranteed to execute whether an exception is thrown or caught?',
      options: ['try', 'catch', 'finally', 'throw'],
      correctIndex: 2,
      conceptTested: 'Finally block guaranteed cleanup',
      explanation: 'The finally block always executes after try/catch for resource cleanup regardless of errors.'
    }
  ],

  python: [
    {
      id: 'diag-py-1',
      subjectId: 'python',
      topicId: 'py-variables',
      topicName: 'Variables & Division (Mod 1)',
      difficulty: 'Easy',
      question: 'What is the type and value of x = 5 / 2 in Python 3?',
      options: ['int with value 2', 'float with value 2.5', 'double with value 2.5', 'str with value "2.5"'],
      correctIndex: 1,
      conceptTested: 'True division operator in Python 3',
      explanation: 'The / operator in Python 3 performs true division returning a float (2.5).'
    },
    {
      id: 'diag-py-2',
      subjectId: 'python',
      topicId: 'py-data-types',
      topicName: 'Data Types & Strings (Mod 1)',
      difficulty: 'Easy',
      question: 'What is the output of type({"name": "Alice"}) in Python?',
      options: ['<class \'list\'>', '<class \'set\'>', '<class \'dict\'>', '<class \'tuple\'>'],
      correctIndex: 2,
      conceptTested: 'Dictionary type recognition',
      explanation: 'Key-value pairs enclosed in curly braces define a dict in Python.'
    },
    {
      id: 'diag-py-3',
      subjectId: 'python',
      topicId: 'py-conditionals',
      topicName: 'Conditionals & Truthiness (Mod 2)',
      difficulty: 'Easy',
      question: 'Which of the following values evaluates to False in a Python if statement?',
      options: ['"False"', '[-1]', '0', '(0,)'],
      correctIndex: 2,
      conceptTested: 'Python boolean truthiness rules',
      explanation: 'The integer 0, empty sequences, and None evaluate to False in boolean context.'
    },
    {
      id: 'diag-py-4',
      subjectId: 'python',
      topicId: 'py-loops',
      topicName: 'Loops & range() (Mod 2)',
      difficulty: 'Medium',
      question: 'What elements are produced by list(range(1, 7, 2)) in Python?',
      options: ['[1, 3, 5]', '[1, 2, 3, 4, 5, 6]', '[1, 3, 5, 7]', '[2, 4, 6]'],
      correctIndex: 0,
      conceptTested: 'Range start, stop, step parameters',
      explanation: 'range(1, 7, 2) starts at 1, increments by 2, and stops before 7 -> [1, 3, 5].'
    },
    {
      id: 'diag-py-5',
      subjectId: 'python',
      topicId: 'py-lists',
      topicName: 'Lists & Slicing (Mod 3)',
      difficulty: 'Medium',
      question: 'What is the result of "Python"[1:4] in Python?',
      options: ['"Pyt"', '"yth"', '"ytho"', '"Pyth"'],
      correctIndex: 1,
      conceptTested: 'String slice indexing',
      explanation: 'Slice [1:4] takes indices 1, 2, 3 -> "yth".'
    },
    {
      id: 'diag-py-6',
      subjectId: 'python',
      topicId: 'py-dicts',
      topicName: 'Dictionaries & Safe Access (Mod 3)',
      difficulty: 'Medium',
      question: 'How do you safely retrieve key "score" from dictionary d without raising KeyError if absent?',
      options: ['d["score"]', 'd.get("score", 0)', 'd.find("score")', 'd.lookup("score")'],
      correctIndex: 1,
      conceptTested: 'Dictionary .get() method with default fallback',
      explanation: 'd.get("score", 0) returns the default value 0 if "score" is not found in d without raising KeyError.'
    },
    {
      id: 'diag-py-7',
      subjectId: 'python',
      topicId: 'py-functions',
      topicName: 'Functions & *args (Mod 4)',
      difficulty: 'Medium',
      question: 'What does *args inside a Python function parameter list capture?',
      options: ['Keyword arguments as a dict', 'Arbitrary positional arguments as a tuple', 'Only string arguments', 'Global variables'],
      correctIndex: 1,
      conceptTested: 'Variable length positional arguments (*args)',
      explanation: '*args gathers variable positional arguments into an immutable tuple.'
    },
    {
      id: 'diag-py-8',
      subjectId: 'python',
      topicId: 'py-oop',
      topicName: 'OOP & __init__ (Mod 5)',
      difficulty: 'Hard',
      question: 'In Python class methods, what does the first parameter self represent?',
      options: ['The class blueprint itself', 'The specific instance of the class being operated on', 'A global singleton', 'A pointer to parent memory'],
      correctIndex: 1,
      conceptTested: 'Instance reference binding with self',
      explanation: 'self refers to the specific instance of the class invoking the method.'
    },
    {
      id: 'diag-py-9',
      subjectId: 'python',
      topicId: 'py-exceptions',
      topicName: 'Exceptions & File I/O (Mod 6)',
      difficulty: 'Hard',
      question: 'What is the primary benefit of using with open("data.txt") as f: in Python?',
      options: ['Files load 10x faster', 'The file is automatically closed when the block exits even if an error occurs', 'It prevents all syntax errors', 'It encrypts file content'],
      correctIndex: 1,
      conceptTested: 'Context managers and automatic resource cleanup',
      explanation: 'The with statement creates a context manager that guarantees file closure upon exit.'
    },
    {
      id: 'diag-py-10',
      subjectId: 'python',
      topicId: 'py-comprehensions',
      topicName: 'Comprehensions & Advanced (Mod 7)',
      difficulty: 'Hard',
      question: 'What is the result of [x * 2 for x in [1, 2, 3, 4] if x % 2 == 0]?',
      options: ['[2, 4, 6, 8]', '[4, 8]', '[2, 6]', '[1, 4]'],
      correctIndex: 1,
      conceptTested: 'List comprehension with conditional filter',
      explanation: 'Even numbers are 2 and 4. Multiplying by 2 gives [4, 8].'
    }
  ],

  sql: [
    {
      id: 'diag-sql-1',
      subjectId: 'sql',
      topicId: 'sql-intro',
      topicName: 'Relational Model & Primary Keys (Mod 1)',
      difficulty: 'Easy',
      question: 'What is the defining rule of a PRIMARY KEY in a relational SQL table?',
      options: ['It can contain duplicate values', 'It uniquely identifies each row and cannot contain NULL values', 'It must be a foreign key', 'It stores text only'],
      correctIndex: 1,
      conceptTested: 'Primary key constraints and uniqueness',
      explanation: 'A PRIMARY KEY must be unique for every row and cannot contain NULL.'
    },
    {
      id: 'diag-sql-2',
      subjectId: 'sql',
      topicId: 'sql-select',
      topicName: 'SELECT & DISTINCT (Mod 1)',
      difficulty: 'Easy',
      question: 'Which SQL keyword removes duplicate rows from the query output?',
      options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'REMOVE_DUPLICATES'],
      correctIndex: 1,
      conceptTested: 'DISTINCT clause deduplication',
      explanation: 'SELECT DISTINCT eliminates duplicate rows from the returned result set.'
    },
    {
      id: 'diag-sql-3',
      subjectId: 'sql',
      topicId: 'sql-where',
      topicName: 'WHERE Clause & LIKE (Mod 2)',
      difficulty: 'Easy',
      question: 'Which SQL operator searches for pattern matches using wildcard characters like %?',
      options: ['MATCH', 'EQUAL', 'LIKE', 'CONTAINS'],
      correctIndex: 2,
      conceptTested: 'Pattern matching with LIKE operator',
      explanation: 'The LIKE operator matches string patterns with % (any sequence) and _ (single char).'
    },
    {
      id: 'diag-sql-4',
      subjectId: 'sql',
      topicId: 'sql-order-by',
      topicName: 'ORDER BY & Sorting (Mod 2)',
      difficulty: 'Medium',
      question: 'Which clause sorts query results in descending order by salary?',
      options: ['ORDER BY salary DESC', 'SORT BY salary DOWN', 'GROUP BY salary DESC', 'ORDER BY salary REVERSE'],
      correctIndex: 0,
      conceptTested: 'ORDER BY descending sort syntax',
      explanation: 'ORDER BY column_name DESC sorts rows from highest to lowest.'
    },
    {
      id: 'diag-sql-5',
      subjectId: 'sql',
      topicId: 'sql-aggregate',
      topicName: 'Aggregate Functions (Mod 3)',
      difficulty: 'Medium',
      question: 'What is the difference between COUNT(*) and COUNT(salary) in SQL?',
      options: ['They are identical in all situations', 'COUNT(*) counts all rows; COUNT(salary) counts only rows where salary is NOT NULL', 'COUNT(salary) calculates the sum of salaries', 'COUNT(*) returns an error on large tables'],
      correctIndex: 1,
      conceptTested: 'COUNT(*) vs COUNT(column) null handling',
      explanation: 'COUNT(*) counts every row regardless of content; COUNT(col) ignores NULL values.'
    },
    {
      id: 'diag-sql-6',
      subjectId: 'sql',
      topicId: 'sql-group-by',
      topicName: 'GROUP BY & HAVING (Mod 3)',
      difficulty: 'Hard',
      question: 'Why does WHERE AVG(salary) > 50000 cause an SQL syntax error?',
      options: ['AVG is not a valid function', 'WHERE cannot filter on aggregate functions; HAVING must be used instead', 'Salary must be an integer', 'GROUP BY is prohibited with WHERE'],
      correctIndex: 1,
      conceptTested: 'HAVING vs WHERE in SQL execution order',
      explanation: 'WHERE filters rows before aggregation occurs; HAVING filters aggregated results after GROUP BY.'
    },
    {
      id: 'diag-sql-7',
      subjectId: 'sql',
      topicId: 'sql-joins',
      topicName: 'INNER JOIN (Mod 4)',
      difficulty: 'Medium',
      question: 'What rows are returned by an INNER JOIN between Orders and Customers on customer_id?',
      options: ['All orders regardless of customer', 'Only rows where customer_id matches in both Orders and Customers', 'All customers regardless of orders', 'A Cartesian product of all rows'],
      correctIndex: 1,
      conceptTested: 'INNER JOIN matching key semantics',
      explanation: 'INNER JOIN returns only rows that have matching values in both joined tables.'
    },
    {
      id: 'diag-sql-8',
      subjectId: 'sql',
      topicId: 'sql-left-join',
      topicName: 'LEFT JOIN & Outer Joins (Mod 4)',
      difficulty: 'Medium',
      question: 'In a LEFT JOIN, what appears in the right table columns for rows that have no match?',
      options: ['0', 'Empty strings', 'NULL', 'An error is thrown'],
      correctIndex: 2,
      conceptTested: 'LEFT JOIN non-matching NULL values',
      explanation: 'Unmatched right-table columns in a LEFT JOIN are populated with NULL.'
    },
    {
      id: 'diag-sql-9',
      subjectId: 'sql',
      topicId: 'sql-subqueries',
      topicName: 'Subqueries & Nested Queries (Mod 5)',
      difficulty: 'Hard',
      question: 'What is a subquery that references a column from the outer query on each row evaluated called?',
      options: ['Correlated Subquery', 'Scalar Subquery', 'Static Subquery', 'Inline View'],
      correctIndex: 0,
      conceptTested: 'Correlated subquery row-by-row dependency',
      explanation: 'A correlated subquery depends on values from the outer query and evaluates once per outer row.'
    },
    {
      id: 'diag-sql-10',
      subjectId: 'sql',
      topicId: 'sql-transactions',
      topicName: 'Transactions & Indexes (Mod 6)',
      difficulty: 'Hard',
      question: 'Which transaction command permanently saves all changes made since the transaction began?',
      options: ['SAVEPOINT', 'ROLLBACK', 'COMMIT', 'PERSIST'],
      correctIndex: 2,
      conceptTested: 'ACID transaction COMMIT persistence',
      explanation: 'COMMIT makes all pending data modifications in the current transaction permanent.'
    }
  ],

  dsa: [
    {
      id: 'diag-dsa-1',
      subjectId: 'dsa',
      topicId: 'dsa-arrays',
      topicName: 'Array Indexing & Big-O (Mod 1)',
      difficulty: 'Easy',
      question: 'What is the time complexity to access an element by its index in an array?',
      options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
      correctIndex: 2,
      conceptTested: 'Contiguous memory constant time index access',
      explanation: 'Array elements are stored contiguously in memory, enabling O(1) constant time index access.'
    },
    {
      id: 'diag-dsa-2',
      subjectId: 'dsa',
      topicId: 'dsa-complexity',
      topicName: 'Space Complexity (Mod 1)',
      difficulty: 'Easy',
      question: 'If an algorithm creates a helper array of size N to process input of size N, what is its auxiliary space complexity?',
      options: ['O(1)', 'O(N)', 'O(N^2)', 'O(log N)'],
      correctIndex: 1,
      conceptTested: 'Auxiliary memory growth analysis',
      explanation: 'Auxiliary space scales linearly with input size N -> O(N).'
    },
    {
      id: 'diag-dsa-3',
      subjectId: 'dsa',
      topicId: 'dsa-linked-lists',
      topicName: 'Linked Lists (Mod 2)',
      difficulty: 'Medium',
      question: 'What is the time complexity to insert a new node at the head of a singly linked list with a head pointer?',
      options: ['O(N)', 'O(1)', 'O(log N)', 'O(N log N)'],
      correctIndex: 1,
      conceptTested: 'Linked list head insertion time complexity',
      explanation: 'Creating a node and pointing it to the current head takes O(1) constant time.'
    },
    {
      id: 'diag-dsa-4',
      subjectId: 'dsa',
      topicId: 'dsa-stacks',
      topicName: 'Stacks & LIFO (Mod 2)',
      difficulty: 'Medium',
      question: 'Which data structure operates on the Last-In, First-Out (LIFO) principle?',
      options: ['Queue', 'Stack', 'Array', 'Binary Tree'],
      correctIndex: 1,
      conceptTested: 'Stack LIFO access pattern',
      explanation: 'Stacks follow Last-In, First-Out (LIFO); the last pushed item is popped first.'
    },
    {
      id: 'diag-dsa-5',
      subjectId: 'dsa',
      topicId: 'dsa-queues',
      topicName: 'Queues & FIFO (Mod 3)',
      difficulty: 'Medium',
      question: 'Which data structure is most appropriate for managing tasks in First-Come, First-Served order?',
      options: ['Stack', 'Queue', 'Max-Heap', 'Graph'],
      correctIndex: 1,
      conceptTested: 'Queue FIFO ordering for task scheduling',
      explanation: 'Queues enforce First-In, First-Out (FIFO) ordering ideal for fair scheduling.'
    },
    {
      id: 'diag-dsa-6',
      subjectId: 'dsa',
      topicId: 'dsa-binary-search',
      topicName: 'Binary Search (Mod 4)',
      difficulty: 'Medium',
      question: 'What essential condition must be satisfied before Binary Search can be used on an array?',
      options: ['The array elements must all be positive', 'The array must be sorted in order', 'The array size must be a power of 2', 'The array cannot contain duplicates'],
      correctIndex: 1,
      conceptTested: 'Binary search sorted precondition',
      explanation: 'Binary Search halves search intervals at each step, which requires sorted elements.'
    },
    {
      id: 'diag-dsa-7',
      subjectId: 'dsa',
      topicId: 'dsa-sorting',
      topicName: 'Merge Sort & Divide-and-Conquer (Mod 4)',
      difficulty: 'Hard',
      question: 'What is the worst-case time complexity of Merge Sort on an array of size N?',
      options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(log N)'],
      correctIndex: 1,
      conceptTested: 'Merge sort guaranteed O(N log N) performance',
      explanation: 'Merge Sort divides arrays into halves and merges in linear time, guaranteeing O(N log N) worst-case.'
    },
    {
      id: 'diag-dsa-8',
      subjectId: 'dsa',
      topicId: 'dsa-trees',
      topicName: 'Binary Search Trees (Mod 5)',
      difficulty: 'Hard',
      question: 'What property does an In-order traversal (Left, Root, Right) of a valid Binary Search Tree produce?',
      options: ['Nodes in decreasing order', 'Nodes in ascending sorted order', 'Nodes grouped by tree depth', 'Leaves before root'],
      correctIndex: 1,
      conceptTested: 'BST in-order sorted output property',
      explanation: 'In-order traversal visits all elements in strictly non-decreasing sorted order.'
    },
    {
      id: 'diag-dsa-9',
      subjectId: 'dsa',
      topicId: 'dsa-hash-tables',
      topicName: 'Hash Tables & Collisions (Mod 6)',
      difficulty: 'Hard',
      question: 'What is the average time complexity for searching an element in a Hash Table with good distribution?',
      options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
      correctIndex: 2,
      conceptTested: 'Hash table average constant time lookup',
      explanation: 'With a uniform hash function, hash table lookups execute in O(1) average time.'
    },
    {
      id: 'diag-dsa-10',
      subjectId: 'dsa',
      topicId: 'dsa-graphs',
      topicName: 'Graph Traversals (Mod 7)',
      difficulty: 'Hard',
      question: 'Which graph traversal algorithm explores nodes level-by-level using a Queue?',
      options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm'],
      correctIndex: 1,
      conceptTested: 'BFS queue-based layer exploration',
      explanation: 'BFS uses a Queue to visit all neighbor vertices before proceeding to the next level of depth.'
    }
  ],

  c: [
    {
      id: 'diag-c-1',
      subjectId: 'c',
      topicId: 'c-04-variables',
      topicName: 'Variables & Data Types (Mod 1)',
      difficulty: 'Easy',
      question: 'What is the guaranteed size in bytes of a standard char in C?',
      options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
      correctIndex: 0,
      conceptTested: 'C primitive character type byte size',
      explanation: 'The C standard defines sizeof(char) as exactly 1 byte.'
    },
    {
      id: 'diag-c-2',
      subjectId: 'c',
      topicId: 'c-01-intro',
      topicName: 'Compilation & Preprocessor (Mod 1)',
      difficulty: 'Easy',
      question: 'Which stage of C compilation handles #include and #define macro substitutions?',
      options: ['Assembler', 'Linker', 'Preprocessor', 'Optimizer'],
      correctIndex: 2,
      conceptTested: 'C Preprocessor source expansion',
      explanation: 'The preprocessor expands headers and macros before actual C compilation.'
    },
    {
      id: 'diag-c-3',
      subjectId: 'c',
      topicId: 'c-10-if-else',
      topicName: 'Conditionals & Truthiness (Mod 2)',
      difficulty: 'Easy',
      question: 'In C, what does an integer condition evaluating to 0 represent in an if statement?',
      options: ['True', 'False', 'Null', 'Undefined'],
      correctIndex: 1,
      conceptTested: 'C numerical boolean evaluation',
      explanation: 'In C, 0 represents False and any non-zero integer represents True.'
    },
    {
      id: 'diag-c-4',
      subjectId: 'c',
      topicId: 'c-12-switch',
      topicName: 'Switch & Fallthrough (Mod 2)',
      difficulty: 'Medium',
      question: 'What happens in a C switch statement if a matching case does NOT contain a break statement?',
      options: ['The program terminates', 'Execution falls through and runs subsequent cases until a break or end is reached', 'A compilation error is raised', 'The variable is reset to 0'],
      correctIndex: 1,
      conceptTested: 'Switch case fallthrough behavior in C',
      explanation: 'Without a break statement, execution continues into subsequent cases (fallthrough).'
    },
    {
      id: 'diag-c-5',
      subjectId: 'c',
      topicId: 'c-17-functions-intro',
      topicName: 'Functions & Pass by Value (Mod 3)',
      difficulty: 'Medium',
      question: 'How are primitive arguments passed to functions in standard C by default?',
      options: ['Pass by Reference', 'Pass by Value (a copy is passed)', 'Pass by Pointer automatically', 'Pass by Thread'],
      correctIndex: 1,
      conceptTested: 'C pass-by-value function call semantics',
      explanation: 'C passes function parameters by value; modifications inside the function do not affect the caller original.'
    },
    {
      id: 'diag-c-6',
      subjectId: 'c',
      topicId: 'c-20-1d-arrays',
      topicName: 'Arrays & 0-Indexing (Mod 3)',
      difficulty: 'Medium',
      question: 'In C, what is the valid index range for an array declared as int numbers[10];?',
      options: ['1 to 10', '0 to 9', '0 to 10', '-1 to 9'],
      correctIndex: 1,
      conceptTested: '0-based indexing limits for C arrays',
      explanation: 'An array of size 10 has valid indices 0 through 9.'
    },
    {
      id: 'diag-c-7',
      subjectId: 'c',
      topicId: 'c-29-pointers-intro',
      topicName: 'Pointers & Addresses (Mod 4)',
      difficulty: 'Medium',
      question: 'Which operator is used to retrieve the memory address of a variable in C?',
      options: ['* (asterisk)', '& (ampersand)', '-> (arrow)', '% (percent)'],
      correctIndex: 1,
      conceptTested: 'Address-of operator & in C',
      explanation: 'The & operator returns the memory address of a variable.'
    },
    {
      id: 'diag-c-8',
      subjectId: 'c',
      topicId: 'c-30-pointers-dereferencing',
      topicName: 'Pointer Dereferencing (Mod 4)',
      difficulty: 'Hard',
      question: 'If int x = 10; int *p = &x; what does the expression *p = 25; do?',
      options: ['Changes the address stored in p to 25', 'Changes the value of variable x to 25 through dereferencing', 'Throws a Segmentation Fault', 'Allocates 25 bytes on heap'],
      correctIndex: 1,
      conceptTested: 'Dereference operator modification of target memory',
      explanation: '*p accesses the memory location pointed to by p (variable x) and sets its value to 25.'
    },
    {
      id: 'diag-c-9',
      subjectId: 'c',
      topicId: 'c-35-dynamic-memory',
      topicName: 'Dynamic Memory & free() (Mod 5)',
      difficulty: 'Hard',
      question: 'What occurs if dynamically allocated memory with malloc() is never released using free() before program exit?',
      options: ['Stack Overflow', 'Memory Leak', 'Null Pointer Dereference', 'Segmentation Fault on compilation'],
      correctIndex: 1,
      conceptTested: 'Memory leaks and manual heap deallocation',
      explanation: 'Failing to release heap memory allocated via malloc/calloc results in memory leaks.'
    },
    {
      id: 'diag-c-10',
      subjectId: 'c',
      topicId: 'c-38-structs-intro',
      topicName: 'Structs & Member Access (Mod 6)',
      difficulty: 'Hard',
      question: 'If ptr is a pointer to a struct Point { int x; int y; };, how do you access member x?',
      options: ['ptr.x', 'ptr->x', 'ptr::x', '*ptr.x'],
      correctIndex: 1,
      conceptTested: 'Structure pointer arrow operator -> in C',
      explanation: 'The arrow operator -> is shorthand for (*ptr).x when accessing struct members via pointers.'
    }
  ]
};

// Practice Problems Collection (With Default Skeletons, Visible Test Cases & Hidden Quality Checks)
export interface HiddenTestCase {
  id: string;
  name: string;
  type: 'spacing_size' | 'variable_naming' | 'edge_boundary' | 'structure';
  description: string;
  hint: string;
}

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'prob-two-sum',
    subjectId: 'dsa',
    topicId: 'dsa-arrays',
    topicName: 'Arrays & Hashing',
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptancePercentage: 88,
    estimatedTime: '15 min',
    description: 'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that their sum equals `target`.\n\nYou may assume that each input has exactly one valid solution, and you may not use the same element twice. You can return the answer in any order.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return indices [0, 1].' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] == 2 + 4 == 6, we return indices [1, 2].' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]', explanation: 'nums[0] + nums[1] == 3 + 3 == 6, we return [0, 1].' }
    ],
    hints: [
      'Can you iterate through the array and store each element in a hash table with its index?',
      'For each element nums[i], look up if (target - nums[i]) already exists in your table in O(1) time.'
    ],
    starterCode: {
      java: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // write the code here\n    }\n}',
      python: 'def main():\n    # write the code here\n    pass\n\nif __name__ == "__main__":\n    main()',
      c: '#include <stdio.h>\n\nint main() {\n    // write the code here\n    return 0;\n}',
      sql: '-- write the code here\n'
    },
    testCases: [
      { id: 'tc-1', input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]', explanation: 'Standard positive array addition.' },
      { id: 'tc-2', input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]', explanation: 'Target sum at non-adjacent indices.' },
      { id: 'tc-3', input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]', explanation: 'Duplicate values in array.' }
    ],
    hiddenCases: [
      { id: 'hc-1', name: 'Code Spacing & Structure', type: 'spacing_size', description: 'Checks proper code block indentation and readable line spacing.', hint: 'Format your code with clean indentation.' },
      { id: 'hc-2', name: 'Variable Naming Standard', type: 'variable_naming', description: 'Validates descriptive variable identifiers (e.g., target, complement, map, indices).', hint: 'Avoid single-letter variable names except loop counters.' },
      { id: 'hc-3', name: 'Negative Limits & Large Bounds', type: 'edge_boundary', description: 'Evaluates negative inputs nums = [-3, 4, 3, 90], target = 0.', hint: 'Ensure logic handles negative numbers correctly.' }
    ],
    solutionCode: {
      java: 'import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}',
      python: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []'
    }
  },
  {
    id: 'c-prob-1',
    subjectId: 'c',
    topicId: 'c-29-pointers-intro',
    topicName: 'Pointers & Memory',
    title: 'Swap Two Numbers using Pointers',
    difficulty: 'Easy',
    acceptancePercentage: 88,
    estimatedTime: '8 mins',
    description: 'Implement a function `void swap(int *a, int *b)` that swaps the values of two integers in place in caller memory using pointer dereferencing.\n\nYour implementation must modify the actual variables referenced by the pointers without using global variables.',
    constraints: [
      'Must mutate original caller memory using pointer dereferencing (*a, *b)',
      'No global variables or static state allowed',
      'Value range: -2^31 <= a, b <= 2^31 - 1'
    ],
    examples: [
      { input: 'a = 5, b = 10', output: 'a = 10, b = 5', explanation: 'Values swapped in place via memory pointers.' },
      { input: 'a = -1, b = 100', output: 'a = 100, b = -1', explanation: 'Negative and positive numbers swapped correctly.' },
      { input: 'a = 42, b = 42', output: 'a = 42, b = 42', explanation: 'Identical numbers maintain consistent values.' }
    ],
    hints: [
      'Store *a into a temporary local integer variable temp.',
      'Assign the dereferenced value *b into *a, then write temp into *b.'
    ],
    starterCode: {
      c: '#include <stdio.h>\n\nint main() {\n    // write the code here\n    return 0;\n}',
      java: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // write the code here\n    }\n}',
      python: 'def main():\n    # write the code here\n    pass\n\nif __name__ == "__main__":\n    main()'
    },
    testCases: [
      { id: 'tc-1', input: 'x = 5, y = 10', expectedOutput: '10, 5', explanation: 'Initial swap verification.' },
      { id: 'tc-2', input: 'x = -1, y = 100', expectedOutput: '100, -1', explanation: 'Signed integer swap.' },
      { id: 'tc-3', input: 'x = 0, y = 0', expectedOutput: '0, 0', explanation: 'Zero values swap.' }
    ],
    hiddenCases: [
      { id: 'hc-1', name: 'Pointer Spacing & Syntax', type: 'spacing_size', description: 'Ensures correct pointer asterisk placement and clean spacing.', hint: 'Use explicit pointer dereference operators.' },
      { id: 'hc-2', name: 'Temporary Variable Scoping', type: 'variable_naming', description: 'Verifies appropriate local temporary variable declaration (temp, tempVal).', hint: 'Declare a local integer to hold swap buffer.' },
      { id: 'hc-3', name: 'Extreme Integer Range', type: 'edge_boundary', description: 'Tests swapping INT_MAX (2147483647) and INT_MIN (-2147483648).', hint: 'Ensure no arithmetic overflow occurs.' }
    ],
    solutionCode: {
      c: 'void swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}'
    }
  },
  {
    id: 'prob-reverse-linked-list',
    subjectId: 'dsa',
    topicId: 'dsa-linked-lists',
    topicName: 'Linked Lists',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    acceptancePercentage: 79,
    estimatedTime: '15 min',
    description: 'Given the `head` of a singly linked list, reverse the list in-place, and return the new reversed list head.\n\nCan you implement the solution both iteratively with O(1) extra space and recursively?',
    constraints: [
      'The number of nodes in the list is in the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
      'Time complexity should be O(N).'
    ],
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Pointers reversed so 5 points to 4, 4 points to 3, etc.' },
      { input: 'head = [1, 2]', output: '[2, 1]', explanation: '2-node list reversed.' },
      { input: 'head = []', output: '[]', explanation: 'Empty list returns null/empty.' }
    ],
    hints: [
      'Maintain three pointer references: prev, curr, and next.',
      'Before advancing curr, store curr.next so you do not lose the rest of the list.'
    ],
    starterCode: {
      java: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // write the code here\n    }\n}',
      python: 'def main():\n    # write the code here\n    pass\n\nif __name__ == "__main__":\n    main()',
      c: '#include <stdio.h>\n\nint main() {\n    // write the code here\n    return 0;\n}'
    },
    testCases: [
      { id: 'tc-1', input: 'head = [1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]', explanation: 'Multi-node list reversal.' },
      { id: 'tc-2', input: 'head = [1, 2]', expectedOutput: '[2, 1]', explanation: 'Two-node list reversal.' },
      { id: 'tc-3', input: 'head = [1]', expectedOutput: '[1]', explanation: 'Single node list remains identical.' }
    ],
    hiddenCases: [
      { id: 'hc-1', name: 'Pointer Mutation Spacing', type: 'spacing_size', description: 'Checks clear pointer movement loop structure.', hint: 'Keep pointer updates formatted in distinct lines.' },
      { id: 'hc-2', name: 'Pointer Identifier Naming', type: 'variable_naming', description: 'Checks standard linked list pointer naming (prev, curr, nextNode).', hint: 'Name pointers intuitively.' },
      { id: 'hc-3', name: 'Null / Empty Head Edge Case', type: 'edge_boundary', description: 'Tests passing head = null without NullPointerException.', hint: 'Handle null head check gracefully.' }
    ],
    solutionCode: {
      java: 'public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}'
    }
  },
  {
    id: 'prob-combine-two-tables',
    subjectId: 'sql',
    topicId: 'sql-joins',
    topicName: 'Relational JOINs',
    title: 'Combine Two Tables',
    difficulty: 'Easy',
    acceptancePercentage: 82,
    estimatedTime: '10 min',
    description: 'Write a SQL query to report the `firstName`, `lastName`, `city`, and `state` of each person in the `Person` table. If the address of a personId is not present in the `Address` table, report null instead.',
    constraints: [
      'Person table: personId (PK), lastName, firstName',
      'Address table: addressId (PK), personId, city, state',
      'Person records must be preserved regardless of Address presence.'
    ],
    examples: [
      { input: 'Person: [(1, "Wang", "Allen"), (2, "Alice", "Bob")], Address: [(1, 2, "New York", "NY")]', output: 'firstName | lastName | city | state\nAllen | Wang | NULL | NULL\nBob | Alice | New York | NY', explanation: 'Allen has no Address record, so city & state are NULL.' },
      { input: 'Person: [(1, "Smith", "John")], Address: []', output: 'John | Smith | NULL | NULL', explanation: 'Empty address table yields NULL for all addresses.' }
    ],
    hints: [
      'Use a LEFT OUTER JOIN to retain all records from the Person table regardless of matching keys in Address.'
    ],
    starterCode: {
      sql: '-- write the code here\n'
    },
    testCases: [
      { id: 'tc-1', input: 'Person with matching and non-matching Address rows', expectedOutput: 'Complete list with NULLs for missing addresses' },
      { id: 'tc-2', input: 'Address table with duplicate or zero matches', expectedOutput: 'All Person records preserved' }
    ],
    hiddenCases: [
      { id: 'hc-1', name: 'SQL Formatting & Clause Structure', type: 'spacing_size', description: 'Checks standard SQL keyword structure (SELECT, FROM, LEFT JOIN, ON).', hint: 'Format SQL with standard uppercase keywords.' },
      { id: 'hc-2', name: 'Explicit Table Alias Usage', type: 'variable_naming', description: 'Validates clear table aliases (p for Person, a for Address).', hint: 'Use readable aliases to avoid column ambiguity.' },
      { id: 'hc-3', name: 'Missing Key Preservation Check', type: 'edge_boundary', description: 'Checks that INNER JOIN is not mistakenly used.', hint: 'A LEFT JOIN is required so unmatched persons are not omitted.' }
    ],
    solutionCode: {
      sql: 'SELECT p.firstName, p.lastName, a.city, a.state\nFROM Person p\nLEFT JOIN Address a ON p.personId = a.personId;'
    }
  },
  {
    id: 'prob-palindrome-number',
    subjectId: 'java',
    topicId: 'java-syntax',
    topicName: 'Control Flow & Logic',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    acceptancePercentage: 84,
    estimatedTime: '10 min',
    description: 'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same backward as forward. For example, 121 is a palindrome while 123 is not.',
    constraints: [
      '-2^31 <= x <= 2^31 - 1',
      'Bonus: Solve it without converting the integer to a string.'
    ],
    examples: [
      { input: 'x = 121', output: 'true', explanation: '121 reads as 121 from left to right and from right to left.' },
      { input: 'x = -121', output: 'false', explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.' },
      { input: 'x = 10', output: 'false', explanation: 'Reads 01 from right to left.' }
    ],
    hints: [
      'Negative numbers are never palindromes due to the leading minus sign.',
      'Reverting the second half of the number avoids integer overflow.'
    ],
    starterCode: {
      java: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // write the code here\n    }\n}',
      python: 'def main():\n    # write the code here\n    pass\n\nif __name__ == "__main__":\n    main()',
      c: '#include <stdio.h>\n\nint main() {\n    // write the code here\n    return 0;\n}'
    },
    testCases: [
      { id: 'tc-1', input: 'x = 121', expectedOutput: 'true', explanation: 'Standard positive palindrome.' },
      { id: 'tc-2', input: 'x = -121', expectedOutput: 'false', explanation: 'Negative numbers are not palindromes.' },
      { id: 'tc-3', input: 'x = 10', expectedOutput: 'false', explanation: 'Trailing zeroes not symmetric.' }
    ],
    hiddenCases: [
      { id: 'hc-1', name: 'Arithmetic Loop Formatting', type: 'spacing_size', description: 'Checks clean loop and arithmetic expression formatting.', hint: 'Use % 10 and / 10 in clean loop.' },
      { id: 'hc-2', name: 'Reversed Buffer Naming', type: 'variable_naming', description: 'Validates clear variable naming (reversedNum, original, digit).', hint: 'Avoid ambiguous variable names.' },
      { id: 'hc-3', name: 'Zero & Single Digit Boundary', type: 'edge_boundary', description: 'Tests x = 0 (true) and x = 7 (true).', hint: 'Any single non-negative digit is a palindrome.' }
    ],
    solutionCode: {
      java: 'public static boolean isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int revertedNumber = 0;\n    while (x > revertedNumber) {\n        revertedNumber = revertedNumber * 10 + x % 10;\n        x /= 10;\n    }\n    return x == revertedNumber || x == revertedNumber / 10;\n}'
    }
  }
];
