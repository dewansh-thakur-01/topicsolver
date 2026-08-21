export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  notes: string;
  codeSnippet: string;
  quizzes: Quiz[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: 'java' | 'sql' | 'c';
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  bgGlow: string;
  totalVideos: number;
  level: string;
  modules: Module[];
}

export const COURSES_DATA: Record<string, Course> = {
  java: {
    id: 'java',
    title: 'Java Masterclass',
    tagline: 'From Fundamentals & OOP to Multithreading & Streams',
    description: 'Comprehensive step-by-step Java course covering modern Java syntax, Object-Oriented Principles, Collections, Memory Allocation, and 600+ LeetCode Java problems.',
    iconName: 'Coffee',
    color: '#F89820',
    bgGlow: 'from-amber-500/20 to-orange-600/10',
    totalVideos: 54,
    level: 'Beginner to Advanced',
    modules: [
      {
        id: 'java-m1',
        title: 'Module 1: Java Basics & Control Flow',
        description: 'Set up JVM, understand variables, primitive data types, operators, and control statements.',
        lessons: Array.from({ length: 14 }, (_, i) => {
          const lessonNum = i + 1;
          const titles = [
            'Introduction to Java & JVM Architecture',
            'Variables, Primitive Types & Memory Stack',
            'Operators, Expressions & Typecasting',
            'Conditional Logic: if-else & Switch Expressions',
            'Loops: for, while & do-while',
            'Break, Continue & Labelled Control Flow',
            'Methods, Parameters & Return Types',
            'Method Overloading & Varargs',
            'Arrays: 1D & 2D Array Manipulation',
            'String Manipulation & StringBuilder',
            'Formatting Output & Scanner Input',
            'Bitwise Operations & Shift Operators',
            'Command Line Arguments & Main Method',
            'Module 1 Recap & Java Basics Coding Challenge'
          ];
          return {
            id: `java-l${lessonNum}`,
            title: titles[i] || `Java Lesson ${lessonNum}`,
            duration: `${10 + (lessonNum % 7)}:${(lessonNum * 13) % 60 < 10 ? '0' : ''}${(lessonNum * 13) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
            notes: `In this lesson, we explore ${titles[i]}. Understand how Java bytecode runs on the Java Virtual Machine (JVM), stack memory allocation, and clean Java coding standards.`,
            codeSnippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Leatcode Java!");\n        int x = ${lessonNum * 5};\n        int y = 20;\n        System.out.println("Result: " + (x + y));\n    }\n}`,
            quizzes: [
              {
                id: `q-java-${lessonNum}-1`,
                question: `Which component of the Java platform executes bytecode line-by-line or via JIT compiler?`,
                options: ['JDK', 'JRE', 'JVM', 'JIT Engine Only'],
                correctIdx: 2,
                explanation: 'The Java Virtual Machine (JVM) is responsible for executing Java bytecode on the host OS.'
              },
              {
                id: `q-java-${lessonNum}-2`,
                question: 'What is the default value of an uninitialized int variable in a class attribute?',
                options: ['null', '0', 'undefined', 'garbage value'],
                correctIdx: 1,
                explanation: 'Primitive class fields in Java default to zero (0 for int, 0.0 for float/double, false for boolean).'
              },
              {
                id: `q-java-${lessonNum}-3`,
                question: 'Which string class in Java is mutable and thread-safe?',
                options: ['String', 'StringBuilder', 'StringBuffer', 'StringTokenizer'],
                correctIdx: 2,
                explanation: 'StringBuffer is synchronized and mutable, while StringBuilder is mutable but not thread-safe.'
              }
            ]
          };
        })
      },
      {
        id: 'java-m2',
        title: 'Module 2: Object-Oriented Programming (OOP)',
        description: 'Master classes, objects, encapsulation, inheritance, polymorphism, abstract classes, and interfaces.',
        lessons: Array.from({ length: 14 }, (_, i) => {
          const lessonNum = i + 15;
          const titles = [
            'Classes, Objects & Constructors',
            'Encapsulation & Access Modifiers (public, private, protected)',
            'The `this` and `super` Keywords',
            'Inheritance & Method Overriding',
            'Polymorphism: Static vs Dynamic Binding',
            'Abstract Classes vs Interfaces',
            'Default and Static Methods in Interfaces',
            'Static Fields, Methods & Static Initializers',
            'Final Keyword: Variables, Methods & Classes',
            'Packages, Imports & Access Control',
            'The Object Class: equals(), hashCode() & toString()',
            'Enums with Fields and Custom Methods',
            'Inner Classes & Anonymous Classes',
            'Module 2 Capstone: Building an OOP Banking System'
          ];
          return {
            id: `java-l${lessonNum}`,
            title: titles[i] || `Java Lesson ${lessonNum}`,
            duration: `${11 + (lessonNum % 6)}:${(lessonNum * 17) % 60 < 10 ? '0' : ''}${(lessonNum * 17) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/grEKMHGYync',
            notes: `Deep dive into OOP concepts in Java. Learn how encapsulation shields state, polymorphism enables clean extensibility, and interface abstractions reduce tight coupling.`,
            codeSnippet: `public abstract class Shape {\n    abstract double calculateArea();\n}\n\npublic class Circle extends Shape {\n    private double radius;\n    public Circle(double radius) {\n        this.radius = radius;\n    }\n    @Override\n    double calculateArea() {\n        return Math.PI * radius * radius;\n    }\n}`,
            quizzes: [
              {
                id: `q-java-${lessonNum}-1`,
                question: 'Can a Java class inherit from multiple concrete classes using `extends`?',
                options: ['Yes, Java supports multiple class inheritance', 'No, Java supports single class inheritance only', 'Only if methods are static', 'Only in Java 17+'],
                correctIdx: 1,
                explanation: 'Java avoids the diamond problem by allowing single class inheritance (`extends`), but multiple interface implementation (`implements`).'
              },
              {
                id: `q-java-${lessonNum}-2`,
                question: 'What happens if a class is declared as `final`?',
                options: ['It cannot be instantiated', 'It cannot be subclassed', 'All its methods are automatically static', 'It consumes zero heap memory'],
                correctIdx: 1,
                explanation: 'A final class cannot be extended by any other class.'
              },
              {
                id: `q-java-${lessonNum}-3`,
                question: 'If you override `equals()`, which method MUST also be overridden to work properly in HashMaps?',
                options: ['clone()', 'hashCode()', 'toString()', 'finalize()'],
                correctIdx: 1,
                explanation: 'Equal objects must produce identical hash codes to maintain the contract in hash-based collections.'
              }
            ]
          };
        })
      },
      {
        id: 'java-m3',
        title: 'Module 3: Java Collections Framework & Data Structures',
        description: 'Master List, Set, Map, Queue, PriorityQueue, Iterators, Generics, and Algorithm Complexity.',
        lessons: Array.from({ length: 13 }, (_, i) => {
          const lessonNum = i + 29;
          const titles = [
            'Generics Basics: Type Safety & Wildcards',
            'ArrayList Internals & Dynamic Resizing',
            'LinkedList: Doubly-Linked Operations & Deque Interface',
            'HashSet & TreeSet: Uniqueness & Navigable Sets',
            'HashMap Internals: Hash Buckets & Treeification',
            'TreeMap & Comparable vs Comparator Interface',
            'PriorityQueue & Min/Max Heap Operations',
            'ArrayDeque vs Stack for LIFO Operations',
            'Iterators, ListIterators & Fail-Fast vs Fail-Safe',
            'Collections Utility Class & Sorting Algorithms',
            'Arrays Utility Methods & Searching',
            'LRU Cache Design using LinkedHashMap',
            'Module 3 Problem Solving: LeetCode DSA Patterns'
          ];
          return {
            id: `java-l${lessonNum}`,
            title: titles[i] || `Java Lesson ${lessonNum}`,
            duration: `${12 + (lessonNum % 5)}:${(lessonNum * 11) % 60 < 10 ? '0' : ''}${(lessonNum * 11) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/A74TOX803D0',
            notes: `Explore the power of Java Collections. Learn internal collision handling in HashMap (bucket linked lists turning into Red-Black trees in Java 8+), and O(1) lookups.`,
            codeSnippet: `import java.util.*;\n\npublic class MapExample {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new HashMap<>();\n        map.put("Java", 600);\n        map.put("SQL", 125);\n        map.put("C", 100);\n        for (var entry : map.entrySet()) {\n            System.out.println(entry.getKey() + " -> " + entry.getValue());\n        }\n    }\n}`,
            quizzes: [
              {
                id: `q-java-${lessonNum}-1`,
                question: 'What is the worst-case time complexity of `get(key)` in a Java 8+ HashMap when collisions occur?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
                correctIdx: 1,
                explanation: 'In Java 8+, when a bucket exceeds 8 elements, it converts from a linked list O(N) to a balanced Red-Black tree O(log N).'
              },
              {
                id: `q-java-${lessonNum}-2`,
                question: 'Which interface allows ordering custom objects in Java using a custom lambda or separate class?',
                options: ['Comparable', 'Comparator', 'Iterable', 'Serializable'],
                correctIdx: 1,
                explanation: 'Comparator provides custom sorting logic via compare(T o1, T o2), whereas Comparable defines natural ordering via compareTo(T o).'
              },
              {
                id: `q-java-${lessonNum}-3`,
                question: 'Which collection does NOT permit null elements or duplicate keys?',
                options: ['ArrayList', 'HashSet', 'Hashtable', 'LinkedList'],
                correctIdx: 2,
                explanation: 'Hashtable throws NullPointerException on null keys or values.'
              }
            ]
          };
        })
      },
      {
        id: 'java-m4',
        title: 'Module 4: Advanced Java, Multithreading & Streams',
        description: 'Exception handling, Lambda Expressions, Java Streams API, Concurrency, Threads, and Memory Management.',
        lessons: Array.from({ length: 13 }, (_, i) => {
          const lessonNum = i + 42;
          const titles = [
            'Exception Handling Hierarchy & Checked vs Unchecked',
            'Custom Exceptions & Try-with-Resources',
            'Functional Interfaces & Lambda Expressions',
            'Java Streams API: filter, map, flatMap & collect',
            'Streams API: Reduction, Grouping & Parallel Streams',
            'Optional API: Eliminating NullPointerException',
            'Threads Creation: Thread Class vs Runnable Interface',
            'Synchronization, Locks & Race Conditions',
            'ExecutorService, Thread Pools & Future/CompletableFuture',
            'Volatile Keyword, Atomic Variables & Memory Barrier',
            'JVM Memory Tuning: Heap, Metaspace & Garbage Collection',
            'Modern Java Features: Records, Sealed Classes & Pattern Matching',
            'Java Graduation & Final System Assessment'
          ];
          return {
            id: `java-l${lessonNum}`,
            title: titles[i] || `Java Lesson ${lessonNum}`,
            duration: `${14 + (lessonNum % 4)}:${(lessonNum * 19) % 60 < 10 ? '0' : ''}${(lessonNum * 19) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/17N47Otz18M',
            notes: `Master modern Java functional programming and multithreading. Learn how Streams enable declarative data processing and how ExecutorService manages background worker threads.`,
            codeSnippet: `import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class StreamDemo {\n    public static void main(String[] args) {\n        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);\n        List<Integer> evens = nums.stream()\n                                  .filter(n -> n % 2 == 0)\n                                  .map(n -> n * 10)\n                                  .collect(Collectors.toList());\n        System.out.println(evens); // [20, 40, 60]\n    }\n}`,
            quizzes: [
              {
                id: `q-java-${lessonNum}-1`,
                question: 'Which intermediate stream operation flattens a Stream of Streams into a single Stream?',
                options: ['map()', 'filter()', 'flatMap()', 'reduce()'],
                correctIdx: 2,
                explanation: 'flatMap takes a function that maps each element to a stream and merges all resulting streams into one.'
              },
              {
                id: `q-java-${lessonNum}-2`,
                question: 'What does the `volatile` keyword guarantee in multi-threaded Java?',
                options: ['Atomicity of compound operations', 'Visibility of variable changes across threads', 'Thread lock mutex acquisition', 'Garbage collection immunity'],
                correctIdx: 1,
                explanation: '`volatile` ensures that reads/writes go straight to main memory, guaranteeing visibility across threads.'
              },
              {
                id: `q-java-${lessonNum}-3`,
                question: 'Which modern Java feature (Java 14+) introduces immutable data carrier classes automatically?',
                options: ['Sealed Class', 'Record', 'Varargs', 'Pattern Matching'],
                correctIdx: 1,
                explanation: 'Records produce concise, immutable data classes with built-in getters, equals(), hashCode(), and toString().'
              }
            ]
          };
        })
      }
    ]
  },
  sql: {
    id: 'sql',
    title: 'SQL & Relational Databases',
    tagline: 'Master Queries, Joins, Aggregations, Window Functions & Triggers',
    description: 'Complete hands-on SQL and Database design course covering PostgreSQL, MySQL, Complex Joins, CTEs, Window Functions, and 125+ LeetCode Database problems.',
    iconName: 'Database',
    color: '#336791',
    bgGlow: 'from-cyan-500/20 to-blue-600/10',
    totalVideos: 24,
    level: 'Beginner to Advanced',
    modules: [
      {
        id: 'sql-m1',
        title: 'Module 1: Relational Data Fundamentals & Basic SQL',
        description: 'Understand relational database architecture, tables, SELECT queries, filtering, and sorting.',
        lessons: Array.from({ length: 6 }, (_, i) => {
          const lessonNum = i + 1;
          const titles = [
            'Introduction to RDBMS & SQL Architecture',
            'SELECT Statements, Column Aliases & DISTINCT',
            'Filtering Rows with WHERE: Operators & LIKE / IN',
            'Handling NULL Values: IS NULL, COALESCE & NVL',
            'Sorting Output: ORDER BY & LIMIT / OFFSET',
            'SQL Math Functions & String Manipulation'
          ];
          return {
            id: `sql-l${lessonNum}`,
            title: titles[i],
            duration: `${8 + i}:${(i * 14) % 60 < 10 ? '0' : ''}${(i * 14) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
            notes: `Learn the fundamentals of SQL queries. Write SELECT clauses to extract data from tables, filter with logical operators, and eliminate duplicate records using DISTINCT.`,
            codeSnippet: `SELECT department_id, COUNT(*) AS employee_count\nFROM employees\nWHERE salary >= 50000\nGROUP BY department_id\nHAVING COUNT(*) > 5\nORDER BY employee_count DESC;`,
            quizzes: [
              {
                id: `q-sql-${lessonNum}-1`,
                question: 'Which keyword is used to remove duplicate rows from a query result set?',
                options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'GROUP BY'],
                correctIdx: 1,
                explanation: 'SELECT DISTINCT eliminates duplicate rows from the output dataset.'
              },
              {
                id: `q-sql-${lessonNum}-2`,
                question: 'What result is returned by `SELECT 5 + NULL;` in SQL?',
                options: ['5', '0', 'NULL', 'Error'],
                correctIdx: 2,
                explanation: 'Any arithmetic operation involving NULL yields NULL in SQL.'
              },
              {
                id: `q-sql-${lessonNum}-3`,
                question: 'Which SQL clause is used to filter aggregated group results after GROUP BY?',
                options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
                correctIdx: 1,
                explanation: 'WHERE filters rows before aggregation, while HAVING filters aggregated group results.'
              }
            ]
          };
        })
      },
      {
        id: 'sql-m2',
        title: 'Module 2: Relational Joins & Subqueries',
        description: 'Master INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, and Subqueries.',
        lessons: Array.from({ length: 6 }, (_, i) => {
          const lessonNum = i + 7;
          const titles = [
            'INNER JOIN: Linking Tables on Foreign Keys',
            'LEFT & RIGHT JOIN: Preserving Unmatched Records',
            'FULL OUTER JOIN & CROSS JOIN (Cartesian Product)',
            'Self Joins & Hierarchical Data',
            'Subqueries: Scalar, Column, and Correlated Subqueries',
            'EXISTS vs IN Operators & Performance Comparison'
          ];
          return {
            id: `sql-l${lessonNum}`,
            title: titles[i],
            duration: `${9 + i}:${(i * 12) % 60 < 10 ? '0' : ''}${(i * 12) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/qw--VYLpxG4',
            notes: `Master joining relational datasets. Understand key differences between INNER JOINs and OUTER JOINs, and how to write correlated subqueries with EXISTS.`,
            codeSnippet: `SELECT e.name, e.salary, d.dept_name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.id\nWHERE d.location = 'California';`,
            quizzes: [
              {
                id: `q-sql-${lessonNum}-1`,
                question: 'Which JOIN returns all rows from the left table even if there is no match in the right table?',
                options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
                correctIdx: 1,
                explanation: 'LEFT JOIN returns all left table rows, padding right table columns with NULL when unmatched.'
              },
              {
                id: `q-sql-${lessonNum}-2`,
                question: 'How many rows are produced by a CROSS JOIN between Table A (10 rows) and Table B (5 rows)?',
                options: ['15 rows', '50 rows', '10 rows', '5 rows'],
                correctIdx: 1,
                explanation: 'A CROSS JOIN produces a Cartesian product (10 * 5 = 50 rows).'
              },
              {
                id: `q-sql-${lessonNum}-3`,
                question: 'What characterizes a Correlated Subquery?',
                options: ['It runs once before the main query', 'It references columns from the outer query for each outer row', 'It can only return 1 number', 'It creates a temporary table on disk'],
                correctIdx: 1,
                explanation: 'A correlated subquery references columns from the outer query and evaluates once for every candidate row of the outer query.'
              }
            ]
          };
        })
      },
      {
        id: 'sql-m3',
        title: 'Module 3: Schema DDL, DML & Indexing',
        description: 'Create tables, constraints (Primary Key, Foreign Key), Indexes, Transactions, and ACID properties.',
        lessons: Array.from({ length: 6 }, (_, i) => {
          const lessonNum = i + 13;
          const titles = [
            'DDL: CREATE, ALTER & DROP TABLE',
            'Primary Keys, Foreign Keys & Referential Integrity',
            'DML: INSERT, UPDATE, DELETE & MERGE',
            'B-Tree Indexes & Query Execution Plans (EXPLAIN ANALYZE)',
            'Database Transactions: BEGIN, COMMIT & ROLLBACK',
            'ACID Properties & Isolation Levels'
          ];
          return {
            id: `sql-l${lessonNum}`,
            title: titles[i],
            duration: `${10 + i}:${(i * 15) % 60 < 10 ? '0' : ''}${(i * 15) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/Cz3WcZLRaWc',
            notes: `Learn DDL and DML operations. Understand how B-Tree indexes speed up lookups from O(N) sequential scans to O(log N) index scans, and enforce foreign key referential integrity.`,
            codeSnippet: `CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE INDEX idx_users_email ON users(email);`,
            quizzes: [
              {
                id: `q-sql-${lessonNum}-1`,
                question: 'Which ACID property guarantees that all operations in a transaction succeed or all are reverted?',
                options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
                correctIdx: 0,
                explanation: 'Atomicity ensures "all-or-nothing" execution for database transactions.'
              },
              {
                id: `q-sql-${lessonNum}-2`,
                question: 'Which index type is the default standard in relational databases like PostgreSQL and MySQL?',
                options: ['Hash Index', 'B-Tree Index', 'GIN Index', 'Bitmap Index'],
                correctIdx: 1,
                explanation: 'B-Tree indexes are the default for range queries, equality checks, and sorting.'
              },
              {
                id: `q-sql-${lessonNum}-3`,
                question: 'Which command permanently saves all changes made during a transaction?',
                options: ['SAVEPOINT', 'COMMIT', 'ROLLBACK', 'PERSIST'],
                correctIdx: 1,
                explanation: 'COMMIT persists transaction modifications to disk.'
              }
            ]
          };
        })
      },
      {
        id: 'sql-m4',
        title: 'Module 4: Advanced SQL, Window Functions & CTEs',
        description: 'Master ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG, CTEs (WITH clause), Views, and Triggers.',
        lessons: Array.from({ length: 6 }, (_, i) => {
          const lessonNum = i + 19;
          const titles = [
            'Common Table Expressions (CTEs) & Recursive WITH Queries',
            'Window Functions Overview: OVER (PARTITION BY ... ORDER BY)',
            'Ranking Functions: ROW_NUMBER(), RANK() & DENSE_RANK()',
            'Value Functions: LEAD(), LAG(), FIRST_VALUE() & LAST_VALUE()',
            'Database Views & Materialized Views',
            'Database Triggers & Stored Procedures'
          ];
          return {
            id: `sql-l${lessonNum}`,
            title: titles[i],
            duration: `${11 + i}:${(i * 18) % 60 < 10 ? '0' : ''}${(i * 18) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/zS0nZ20eYq0',
            notes: `Unlock advanced SQL mastery. Window functions compute values across a set of table rows related to the current row without collapsing rows into a single aggregated row.`,
            codeSnippet: `WITH RankedSalaries AS (\n    SELECT \n        employee_id,\n        department_id,\n        salary,\n        DENSE_RANK() OVER (\n            PARTITION BY department_id \n            ORDER BY salary DESC\n        ) as rnk\n    FROM employees\n)\nSELECT * FROM RankedSalaries WHERE rnk <= 3;`,
            quizzes: [
              {
                id: `q-sql-${lessonNum}-1`,
                question: 'What is the key difference between RANK() and DENSE_RANK() when ties occur?',
                options: ['RANK() skips rank numbers after a tie; DENSE_RANK() does not skip', 'DENSE_RANK() skips numbers; RANK() does not', 'RANK() requires GROUP BY; DENSE_RANK() does not', 'They are completely identical'],
                correctIdx: 0,
                explanation: 'If two rows tie for rank 1, RANK() assigns 1, 1, 3 (skipping 2), whereas DENSE_RANK() assigns 1, 1, 2.'
              },
              {
                id: `q-sql-${lessonNum}-2`,
                question: 'Which window function accesses data from a subsequent row at a given physical offset?',
                options: ['LAG()', 'LEAD()', 'NTILE()', 'SUBSEQUENT()'],
                correctIdx: 1,
                explanation: 'LEAD() accesses data from a row N steps ahead of the current row, while LAG() accesses preceding rows.'
              },
              {
                id: `q-sql-${lessonNum}-3`,
                question: 'What is the purpose of a Recursive CTE in SQL?',
                options: ['To speed up simple SELECT queries', 'To query hierarchical or graph data like organizational trees', 'To auto-delete invalid rows', 'To format dates'],
                correctIdx: 1,
                explanation: 'Recursive CTEs iteratively traverse hierarchical data structures (e.g. parent-child employee hierarchies).'
              }
            ]
          };
        })
      }
    ]
  },
  c: {
    id: 'c',
    title: 'C Programming & Systems',
    tagline: 'Master Pointers, Dynamic Memory Allocation & Low-Level DSA',
    description: 'Essential C programming course covering manual memory management (malloc/free), Pointer Arithmetic, Structs, File I/O, and official C LeetCode problems.',
    iconName: 'Cpu',
    color: '#A8B9CC',
    bgGlow: 'from-blue-500/20 to-slate-600/10',
    totalVideos: 34,
    level: 'Beginner to Advanced',
    modules: [
      {
        id: 'c-m1',
        title: 'Module 1: C Fundamentals & Core Syntax',
        description: 'GCC compilation pipeline, data types, control flow, functions, and header files.',
        lessons: Array.from({ length: 9 }, (_, i) => {
          const lessonNum = i + 1;
          const titles = [
            'Introduction to C, GCC Compiler & Compilation Steps',
            'Data Types, Storage Sizes & printf / scanf Formatting',
            'Operators: Arithmetic, Relational, Logical & Bitwise',
            'Control Flow: if-else, switch & Ternary Operator',
            'Loops: for, while & do-while in C',
            'Functions, Prototypes & Storage Classes (auto, static, extern, register)',
            'Arrays in C: Memory Layout & Array Decay',
            'Strings in C: Null-Terminated Character Arrays',
            'Module 1 Review & C Basic Projects'
          ];
          return {
            id: `c-l${lessonNum}`,
            title: titles[i],
            duration: `${7 + i}:${(i * 16) % 60 < 10 ? '0' : ''}${(i * 16) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/KJgsSFOSQv0',
            notes: `Learn fundamental C concepts. C is compiled directly into machine instructions. Understand GCC stages: Preprocessing -> Compilation -> Assembly -> Linking.`,
            codeSnippet: `#include <stdio.h>\n\nint main() {\n    printf("Welcome to Leatcode C Course!\\n");\n    int val = 42;\n    printf("Address of val: %p, Value: %d\\n", (void*)&val, val);\n    return 0;\n}`,
            quizzes: [
              {
                id: `q-c-${lessonNum}-1`,
                question: 'Which stage of C compilation handles `#include` and `#define` directives?',
                options: ['Compiler', 'Preprocessor', 'Assembler', 'Linker'],
                correctIdx: 1,
                explanation: 'The Preprocessor expands macros and inserts header file contents prior to compilation.'
              },
              {
                id: `q-c-${lessonNum}-2`,
                question: 'What character terminates strings in standard C?',
                options: ['\\n', '\\0', 'NULL', ';'],
                correctIdx: 1,
                explanation: 'C strings are null-terminated character arrays ending with `\\0` (ASCII value 0).'
              },
              {
                id: `q-c-${lessonNum}-3`,
                question: 'Which storage class retains variable value across function calls for the lifetime of the program?',
                options: ['auto', 'register', 'static', 'extern'],
                correctIdx: 2,
                explanation: '`static` local variables maintain their state across repeated function invocations.'
              }
            ]
          };
        })
      },
      {
        id: 'c-m2',
        title: 'Module 2: Pointers & Dynamic Memory Allocation',
        description: 'Master memory addresses, dereferencing, pointer arithmetic, malloc, calloc, realloc, free, and Valgrind.',
        lessons: Array.from({ length: 9 }, (_, i) => {
          const lessonNum = i + 10;
          const titles = [
            'Understanding Memory Addresses & The & and * Operators',
            'Pointer Types & Dereferencing Null/Wild Pointers',
            'Pointer Arithmetic & Array Indexing Equivalence',
            'Pass-by-Value vs Pass-by-Reference via Pointers',
            'Function Pointers & Callback Functions',
            'Dynamic Memory Allocation: malloc() and free()',
            'calloc() vs realloc() & Dynamic Array Growth',
            'Memory Leaks, Dangling Pointers & Valgrind Debugging',
            'Void Pointers (void*) & Low-Level Memory Copies (memcpy)'
          ];
          return {
            id: `c-l${lessonNum}`,
            title: titles[i],
            duration: `${9 + i}:${(i * 14) % 60 < 10 ? '0' : ''}${(i * 14) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/zuegQmMdy8M',
            notes: `Master C pointers and memory management. Learn how pointers directly reference RAM memory addresses and how to dynamically allocate heap memory using malloc/calloc.`,
            codeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = (int*) malloc(n * sizeof(int));\n    if (!arr) return 1;\n    for(int i = 0; i < n; i++) arr[i] = (i + 1) * 10;\n    free(arr);\n    return 0;\n}`,
            quizzes: [
              {
                id: `q-c-${lessonNum}-1`,
                question: 'What is the primary difference between `malloc()` and `calloc()`?',
                options: ['malloc initializes memory to zero; calloc does not', 'calloc initializes memory to zero; malloc contains garbage values', 'malloc allocates heap memory; calloc allocates stack memory', 'calloc cannot fail'],
                correctIdx: 1,
                explanation: '`calloc(n, size)` clears allocated memory bytes to zero, whereas `malloc()` leaves existing memory uninitialized (garbage values).'
              },
              {
                id: `q-c-${lessonNum}-2`,
                question: 'What happens if you attempt to dereference a NULL pointer in C?',
                options: ['Returns 0', 'Causes a Segmentation Fault (Crash)', 'Prints NULL', 'Silent ignore'],
                correctIdx: 1,
                explanation: 'Dereferencing NULL triggers a memory access violation resulting in a Segmentation Fault.'
              },
              {
                id: `q-c-${lessonNum}-3`,
                question: 'What tool is widely used on Linux to detect memory leaks and invalid heap accesses in C programs?',
                options: ['GDB', 'Valgrind', 'GCC', 'Make'],
                correctIdx: 1,
                explanation: 'Valgrind memcheck detects memory leaks, uninitialized memory usage, and out-of-bounds heap accesses.'
              }
            ]
          };
        })
      },
      {
        id: 'c-m3',
        title: 'Module 3: Structs, Unions & File I/O',
        description: 'User-defined types (`struct`, `union`, `typedef`, `enum`), memory alignment, and file operations.',
        lessons: Array.from({ length: 8 }, (_, i) => {
          const lessonNum = i + 19;
          const titles = [
            'Defining Structs & Struct Member Access (. vs ->)',
            'Typedef Alias & Anonymous Structs',
            'Struct Memory Padding & Alignment (sizeof struct)',
            'Unions: Shared Memory Space & Variant Types',
            'Enums & Bit Fields in C Structs',
            'File Handling: fopen(), fclose(), fprintf() & fscanf()',
            'Binary File Operations: fread() and fwrite()',
            'Error Handling in File I/O (errno & perror)'
          ];
          return {
            id: `c-l${lessonNum}`,
            title: titles[i],
            duration: `${10 + i}:${(i * 15) % 60 < 10 ? '0' : ''}${(i * 15) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/2wM6y1l089E',
            notes: `Learn structures and file operations in C. Understand how -> dereferences a struct pointer to access its fields and how binary file operations write raw bytes.`,
            codeSnippet: `#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[50];\n    float gpa;\n} Student;\n\nvoid printStudent(const Student *s) {\n    printf("ID: %d, Name: %s, GPA: %.2f\\n", s->id, s->name, s->gpa);\n}`,
            quizzes: [
              {
                id: `q-c-${lessonNum}-1`,
                question: 'Which operator is used to access a struct member through a pointer to that struct?',
                options: ['.', '->', '*', '&'],
                correctIdx: 1,
                explanation: 'The arrow operator -> dereferences a struct pointer and accesses the member field (equivalent to (*ptr).member).'
              },
              {
                id: `q-c-${lessonNum}-2`,
                question: 'In a C `union`, how much memory is allocated relative to its members?',
                options: ['Sum of all member sizes', 'Size of the largest member', 'Size of the smallest member', 'Fixed 64 bytes'],
                correctIdx: 1,
                explanation: 'A union shares a single memory region large enough to hold its largest member.'
              },
              {
                id: `q-c-${lessonNum}-3`,
                question: 'Which file mode in `fopen()` opens a file for appending data at the end without overwriting?',
                options: ['"r"', '"w"', '"a"', '"r+"'],
                correctIdx: 2,
                explanation: '"a" mode opens or creates a file for appending data to the end.'
              }
            ]
          };
        })
      },
      {
        id: 'c-m4',
        title: 'Module 4: Low-Level Systems & Data Structures in C',
        description: 'Implement Single/Doubly Linked Lists, Dynamic Vectors, Bit Manipulation, Macros, and Makefile build automation.',
        lessons: Array.from({ length: 8 }, (_, i) => {
          const lessonNum = i + 27;
          const titles = [
            'Building a Custom Dynamic Array (Vector) in C',
            'Singly Linked List Implementation & Memory Traversal',
            'Doubly Linked List & Sentinel Nodes',
            'Bitwise Operations & Masking Techniques in C',
            'C Preprocessor Macros & Conditional Compilation (#ifdef)',
            'Writing Modular Code: Source (.c) and Header (.h) Separation',
            'Makefiles & Build Automation Systems',
            'C Course Graduation & Low-Level Final Capstone'
          ];
          return {
            id: `c-l${lessonNum}`,
            title: titles[i],
            duration: `${11 + i}:${(i * 17) % 60 < 10 ? '0' : ''}${(i * 17) % 60}`,
            videoUrl: 'https://www.youtube.com/embed/R-CPLcmS_80',
            notes: `Implement fundamental data structures in C. Build linked list nodes with struct Node containing a payload pointer and struct Node* next.`,
            codeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int data) {\n    Node *n = (Node*) malloc(sizeof(Node));\n    n->data = data;\n    n->next = NULL;\n    return n;\n}`,
            quizzes: [
              {
                id: `q-c-${lessonNum}-1`,
                question: 'What bitwise operator is commonly used to SET a specific bit at index k to 1?',
                options: ['AND (&)', 'OR (|)', 'XOR (^)', 'NOT (~)'],
                correctIdx: 1,
                explanation: '`val |= (1 << k)` uses Bitwise OR to set bit k to 1.'
              },
              {
                id: `q-c-${lessonNum}-2`,
                question: 'Why are header guards (`#ifndef HEADER_H ... #endif`) used in C `.h` files?',
                options: ['To encrypt header code', 'To prevent multiple inclusion compilation errors', 'To make functions static', 'To enable multithreading'],
                correctIdx: 1,
                explanation: 'Header guards prevent the same header from being included multiple times in a single compilation unit.'
              },
              {
                id: `q-c-${lessonNum}-3`,
                question: 'What is the time complexity of inserting a node at the head of a Singly Linked List?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
                correctIdx: 0,
                explanation: 'Prepending to a linked list takes O(1) constant time as it only requires reassigning the new node next pointer to current head.'
              }
            ]
          };
        })
      }
    ]
  }
};
