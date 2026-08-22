export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: number;
  slug: string;
  title: string;
  language: 'Java' | 'Python' | 'SQL' | 'DSA' | 'C';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  leetCodeUrl: string;
  description: string;
  examples: ProblemExample[];
  sampleSolution: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const ALL_PROBLEMS: Problem[] = [
  // ================= Java (6 Problems) =================
  {
    id: 1,
    slug: 'palindrome-number',
    title: 'Palindrome Number',
    language: 'Java',
    difficulty: 'Easy',
    category: 'Math & Conditionals',
    leetCodeUrl: 'https://leetcode.com/problems/palindrome-number/',
    description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
    examples: [
      { input: 'x = 121', output: 'true', explanation: '121 reads as 121 backwards.' },
      { input: 'x = -121', output: 'false', explanation: 'From left to right it reads -121. From right to left it reads 121-.' }
    ],
    sampleSolution: `class Solution {\n    public boolean isPalindrome(int x) {\n        if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n        int rev = 0;\n        while (x > rev) {\n            rev = rev * 10 + x % 10;\n            x /= 10;\n        }\n        return x == rev || x == rev / 10;\n    }\n}`,
    timeComplexity: 'O(log10(N))',
    spaceComplexity: 'O(1)'
  },
  {
    id: 2,
    slug: 'char-frequency',
    title: 'Character Frequency Counter',
    language: 'Java',
    difficulty: 'Easy',
    category: 'Strings & Maps',
    leetCodeUrl: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
    description: 'Count frequency of each character in alphabetical order.',
    examples: [{ input: 's = "banana"', output: 'a:3,b:1,n:2' }],
    sampleSolution: `class Solution {\n    public String getCharFrequency(String s) {\n        Map<Character, Integer> map = new TreeMap<>();\n        for (char c : s.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);\n        return map.toString();\n    }\n}`,
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)'
  },
  {
    id: 3,
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    language: 'Java',
    difficulty: 'Medium',
    category: 'Stack',
    leetCodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    description: 'Determine if the input string containing brackets is valid.',
    examples: [{ input: 's = "()[]{}"', output: 'true' }],
    sampleSolution: `class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> st = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else if (st.isEmpty() || st.pop() != c) return false;\n        }\n        return st.isEmpty();\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 4,
    slug: 'merge-sorted-array',
    title: 'Merge Sorted Arrays',
    language: 'Java',
    difficulty: 'Medium',
    category: 'Two Pointers',
    leetCodeUrl: 'https://leetcode.com/problems/merge-sorted-array/',
    description: 'Merge nums1 and nums2 into nums1 in-place in non-decreasing order.',
    examples: [{ input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' }],
    sampleSolution: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p1 >= 0 && p2 >= 0) nums1[p--] = (nums1[p1] > nums2[p2]) ? nums1[p1--] : nums2[p2--];\n        while (p2 >= 0) nums1[p--] = nums2[p2--];\n    }\n}`,
    timeComplexity: 'O(m + n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 5,
    slug: 'second-largest',
    title: 'Second Largest Element in Array',
    language: 'Java',
    difficulty: 'Medium',
    category: 'Linear Scan',
    leetCodeUrl: 'https://leetcode.com/problems/third-maximum-number/',
    description: 'Find second largest distinct integer in an array.',
    examples: [{ input: 'arr = [12, 35, 1, 10, 34, 1]', output: '34' }],
    sampleSolution: `class Solution {\n    public int getSecondLargest(int[] arr) {\n        int f = Integer.MIN_VALUE, s = Integer.MIN_VALUE;\n        for (int x : arr) {\n            if (x > f) { s = f; f = x; }\n            else if (x > s && x != f) s = x;\n        }\n        return s == Integer.MIN_VALUE ? -1 : s;\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 6,
    slug: 'custom-exception',
    title: 'Age Validator with Custom Exception',
    language: 'Java',
    difficulty: 'Hard',
    category: 'OOP & Exception Handling',
    leetCodeUrl: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/',
    description: 'Validate age boundary and throw InvalidAgeException.',
    examples: [{ input: 'age = 25', output: '"Valid Age: 25"' }],
    sampleSolution: `class Solution {\n    public static String validateAge(int age) throws Exception {\n        if (age < 18 || age > 100) throw new Exception("Age must be between 18 and 100");\n        return "Valid Age: " + age;\n    }\n}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)'
  },

  // ================= Python (6 Problems) =================
  {
    id: 7,
    slug: 'two-sum-py',
    title: 'Two Sum Hash Map',
    language: 'Python',
    difficulty: 'Easy',
    category: 'Dictionaries & Hash Table',
    leetCodeUrl: 'https://leetcode.com/problems/two-sum/',
    description: 'Find indices of two numbers that add up to target in O(N).',
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]' }],
    sampleSolution: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        comp = target - num\n        if comp in seen:\n            return [seen[comp], i]\n        seen[num] = i\n    return []`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 8,
    slug: 'valid-anagram-py',
    title: 'Valid Anagram',
    language: 'Python',
    difficulty: 'Easy',
    category: 'Strings',
    leetCodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    description: 'Return True if t is an anagram of s, and False otherwise.',
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'True' }],
    sampleSolution: `def is_anagram(s: str, t: str) -> bool:\n    return sorted(s) == sorted(t)`,
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 9,
    slug: 'longest-substring-py',
    title: 'Longest Substring Without Repeating Characters',
    language: 'Python',
    difficulty: 'Medium',
    category: 'Sliding Window',
    leetCodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    description: 'Find length of longest substring without duplicate characters.',
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    sampleSolution: `def lengthOfLongestSubstring(s: str) -> int:\n    chars = set()\n    l = 0\n    res = 0\n    for r in range(len(s)):\n        while s[r] in chars:\n            chars.remove(s[l])\n            l += 1\n        chars.add(s[r])\n        res = max(res, r - l + 1)\n    return res`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 10,
    slug: 'flatten-list-py',
    title: 'Flatten Nested List',
    language: 'Python',
    difficulty: 'Medium',
    category: 'Recursion',
    leetCodeUrl: 'https://leetcode.com/problems/flatten-nested-list-iterator/',
    description: 'Recursively flatten an arbitrarily nested list of integers.',
    examples: [{ input: 'nested = [1, [2, [3, 4], 5], 6]', output: '[1, 2, 3, 4, 5, 6]' }],
    sampleSolution: `def flatten_list(nested):\n    res = []\n    for x in nested:\n        if isinstance(x, list): res.extend(flatten_list(x))\n        else: res.append(x)\n    return res`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 11,
    slug: 'group-anagrams-py',
    title: 'Group Anagrams',
    language: 'Python',
    difficulty: 'Medium',
    category: 'Hash Map',
    leetCodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    description: 'Group an array of strings by their anagram sets.',
    examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }],
    sampleSolution: `from collections import defaultdict\ndef group_anagrams(strs):\n    ans = defaultdict(list)\n    for s in strs: ans[tuple(sorted(s))].append(s)\n    return list(ans.values())`,
    timeComplexity: 'O(N * K log K)',
    spaceComplexity: 'O(N * K)'
  },
  {
    id: 12,
    slug: 'lru-cache-py',
    title: 'LRU Cache Implementation',
    language: 'Python',
    difficulty: 'Hard',
    category: 'OOP & Data Structures',
    leetCodeUrl: 'https://leetcode.com/problems/lru-cache/',
    description: 'Implement Least Recently Used cache with get() and put() in O(1).',
    examples: [{ input: 'capacity = 2, put(1,1), put(2,2), get(1)', output: '1' }],
    sampleSolution: `from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, cap): self.cap = cap; self.c = OrderedDict()\n    def get(self, k):\n        if k not in self.c: return -1\n        self.c.move_to_end(k); return self.c[k]\n    def put(self, k, v):\n        if k in self.c: self.c.move_to_end(k)\n        self.c[k] = v\n        if len(self.c) > self.cap: self.c.popitem(last=False)`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(capacity)'
  },

  // ================= SQL (6 Problems) =================
  {
    id: 13,
    slug: 'combine-two-tables-sql',
    title: 'Combine Two Tables (LEFT JOIN)',
    language: 'SQL',
    difficulty: 'Easy',
    category: 'Joins',
    leetCodeUrl: 'https://leetcode.com/problems/combine-two-tables/',
    description: 'Report firstName, lastName, city, and state using LEFT JOIN.',
    examples: [{ input: 'Person & Address tables', output: 'firstName | lastName | city | state' }],
    sampleSolution: `SELECT p.firstName, p.lastName, a.city, a.state FROM Person p LEFT JOIN Address a ON p.personId = a.personId;`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 14,
    slug: 'second-highest-salary-sql',
    title: 'Second Highest Salary',
    language: 'SQL',
    difficulty: 'Easy',
    category: 'Subqueries & Aggregation',
    leetCodeUrl: 'https://leetcode.com/problems/second-highest-salary/',
    description: 'Find the second highest distinct salary from the Employee table.',
    examples: [{ input: 'Employee salaries = [100, 200, 300]', output: 'SecondHighestSalary: 200' }],
    sampleSolution: `SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 15,
    slug: 'duplicate-emails-sql',
    title: 'Find Duplicate Emails',
    language: 'SQL',
    difficulty: 'Medium',
    category: 'GROUP BY & HAVING',
    leetCodeUrl: 'https://leetcode.com/problems/duplicate-emails/',
    description: 'Report all the duplicate emails in the Person table.',
    examples: [{ input: 'Person = [a@b.com, c@d.com, a@b.com]', output: 'a@b.com' }],
    sampleSolution: `SELECT email AS Email FROM Person GROUP BY email HAVING COUNT(email) > 1;`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 16,
    slug: 'department-top-3-salaries-sql',
    title: 'Department Top Three Salaries',
    language: 'SQL',
    difficulty: 'Medium',
    category: 'Window Functions',
    leetCodeUrl: 'https://leetcode.com/problems/department-top-three-salaries/',
    description: 'Find employees who have a salary in the top three unique salaries for that department.',
    examples: [{ input: 'Employee & Department joined', output: 'Department | Employee | Salary' }],
    sampleSolution: `WITH Ranked AS (SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary, DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk FROM Employee e JOIN Department d ON e.departmentId = d.id) SELECT Department, Employee, Salary FROM Ranked WHERE rnk <= 3;`,
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 17,
    slug: 'customers-never-order-sql',
    title: 'Customers Who Never Order',
    language: 'SQL',
    difficulty: 'Medium',
    category: 'Anti-Joins',
    leetCodeUrl: 'https://leetcode.com/problems/customers-who-never-order/',
    description: 'Find customers who never place any orders.',
    examples: [{ input: 'Customers = [Joe, Henry], Orders = [Joe]', output: 'Customers: Henry' }],
    sampleSolution: `SELECT c.name AS Customers FROM Customers c LEFT JOIN Orders o ON c.id = o.customerId WHERE o.id IS NULL;`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 18,
    slug: 'consecutive-numbers-sql',
    title: 'Consecutive Numbers',
    language: 'SQL',
    difficulty: 'Hard',
    category: 'Self Joins',
    leetCodeUrl: 'https://leetcode.com/problems/consecutive-numbers/',
    description: 'Find numbers that appear at least three times consecutively in the Logs table.',
    examples: [{ input: 'Logs table', output: 'ConsecutiveNums: 1' }],
    sampleSolution: `SELECT DISTINCT l1.num AS ConsecutiveNums FROM Logs l1 JOIN Logs l2 ON l1.id = l2.id - 1 JOIN Logs l3 ON l1.id = l3.id - 2 WHERE l1.num = l2.num AND l2.num = l3.num;`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },

  // ================= DSA (6 Problems) =================
  {
    id: 19,
    slug: 'two-sum-dsa',
    title: 'Two Sum Sorted Array (Two Pointers)',
    language: 'DSA',
    difficulty: 'Easy',
    category: 'Arrays',
    leetCodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    description: 'Find two numbers adding to target in sorted array with O(1) space.',
    examples: [{ input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' }],
    sampleSolution: `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int l = 0, r = numbers.length - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return new int[]{l + 1, r + 1};\n            if (sum < target) l++; else r--;\n        }\n        return new int[0];\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 20,
    slug: 'reverse-linked-list-dsa',
    title: 'Reverse Linked List',
    language: 'DSA',
    difficulty: 'Easy',
    category: 'Linked Lists',
    leetCodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    description: 'Reverse a singly linked list in-place.',
    examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
    sampleSolution: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 21,
    slug: 'tree-inorder-dsa',
    title: 'Binary Tree Inorder Traversal',
    language: 'DSA',
    difficulty: 'Medium',
    category: 'Binary Trees',
    leetCodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    description: 'Return inorder traversal of binary tree (Left -> Root -> Right).',
    examples: [{ input: 'root = [1,null,2,3]', output: '[1,3,2]' }],
    sampleSolution: `class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer> res = new ArrayList<>();\n        helper(root, res);\n        return res;\n    }\n    void helper(TreeNode n, List<Integer> r) {\n        if (n == null) return;\n        helper(n.left, r);\n        r.add(n.val);\n        helper(n.right, r);\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 22,
    slug: 'max-subarray-dsa',
    title: 'Maximum Subarray (Kadane)',
    language: 'DSA',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    leetCodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    description: 'Find contiguous subarray with largest sum in O(N).',
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' }],
    sampleSolution: `class Solution {\n    public int maxSubArray(int[] nums) {\n        int max = nums[0], curr = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            curr = Math.max(nums[i], curr + nums[i]);\n            max = Math.max(max, curr);\n        }\n        return max;\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 23,
    slug: 'validate-bst-dsa',
    title: 'Validate Binary Search Tree',
    language: 'DSA',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    leetCodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    description: 'Determine if binary tree is a valid BST.',
    examples: [{ input: 'root = [2,1,3]', output: 'true' }],
    sampleSolution: `class Solution {\n    public boolean isValidBST(TreeNode root) { return val(root, null, null); }\n    boolean val(TreeNode n, Integer min, Integer max) {\n        if (n == null) return true;\n        if ((min != null && n.val <= min) || (max != null && n.val >= max)) return false;\n        return val(n.left, min, n.val) && val(n.right, n.val, max);\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)'
  },
  {
    id: 24,
    slug: 'word-ladder-dsa',
    title: 'Word Ladder (Shortest Transformation)',
    language: 'DSA',
    difficulty: 'Hard',
    category: 'BFS & Graphs',
    leetCodeUrl: 'https://leetcode.com/problems/word-ladder/',
    description: 'Find number of words in shortest sequence from beginWord to endWord.',
    examples: [{ input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' }],
    sampleSolution: `class Solution {\n    public int ladderLength(String b, String e, List<String> w) {\n        Set<String> set = new HashSet<>(w);\n        if (!set.contains(e)) return 0;\n        Queue<String> q = new LinkedList<>();\n        q.add(b);\n        int len = 1;\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                char[] ch = q.poll().toCharArray();\n                for (int j = 0; j < ch.length; j++) {\n                    char o = ch[j];\n                    for (char c = 'a'; c <= 'z'; c++) {\n                        ch[j] = c;\n                        String s = new String(ch);\n                        if (s.equals(e)) return len + 1;\n                        if (set.remove(s)) q.add(s);\n                    }\n                    ch[j] = o;\n                }\n            }\n            len++;\n        }\n        return 0;\n    }\n}`,
    timeComplexity: 'O(M^2 * N)',
    spaceComplexity: 'O(M * N)'
  },

  // ================= C Programming (6 Problems) =================
  {
    id: 25,
    slug: 'swap-pointers-c',
    title: 'Swap Two Numbers using Pointers',
    language: 'C',
    difficulty: 'Easy',
    category: 'Pointers',
    leetCodeUrl: 'https://en.cppreference.com/w/c/language/pointer',
    description: 'Swap values of two integers using memory dereferencing in C.',
    examples: [{ input: 'a = 5, b = 10', output: 'a = 10, b = 5' }],
    sampleSolution: `void swap(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 26,
    slug: 'reverse-string-c',
    title: 'Reverse a String In-Place',
    language: 'C',
    difficulty: 'Easy',
    category: 'Strings & Pointers',
    leetCodeUrl: 'https://leetcode.com/problems/reverse-string/',
    description: 'Reverse null-terminated char array in C.',
    examples: [{ input: 's = "hello"', output: '"olleh"' }],
    sampleSolution: `void reverseString(char* s) {\n    int i = 0, j = strlen(s) - 1;\n    while (i < j) {\n        char t = s[i];\n        s[i] = s[j];\n        s[j] = t;\n        i++; j--;\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 27,
    slug: 'dynamic-array-sum-c',
    title: 'Dynamic Array Allocation & Sum',
    language: 'C',
    difficulty: 'Medium',
    category: 'Dynamic Memory (malloc/free)',
    leetCodeUrl: 'https://en.cppreference.com/w/c/memory/malloc',
    description: 'Dynamically allocate array with malloc, compute sum, and call free.',
    examples: [{ input: 'arr = [1, 2, 3, 4, 5], n = 5', output: '15' }],
    sampleSolution: `int calculateDynamicSum(int* arr, int n) {\n    int* dyn = (int*)malloc(n * sizeof(int));\n    if (!dyn) return 0;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        dyn[i] = arr[i];\n        sum += dyn[i];\n    }\n    free(dyn);\n    return sum;\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 28,
    slug: 'matrix-transpose-c',
    title: 'Matrix Transpose in C',
    language: 'C',
    difficulty: 'Medium',
    category: '2D Arrays',
    leetCodeUrl: 'https://leetcode.com/problems/transpose-matrix/',
    description: 'Transpose a 2D integer matrix of size R x C.',
    examples: [{ input: 'matrix = [[1,2,3],[4,5,6]]', output: '[[1,4],[2,5],[3,6]]' }],
    sampleSolution: `void transpose(int R, int C, int m[R][C], int res[C][R]) {\n    for (int i = 0; i < R; i++) {\n        for (int j = 0; j < C; j++) res[j][i] = m[i][j];\n    }\n}`,
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 29,
    slug: 'count-vowels-c',
    title: 'Count Vowels and Consonants',
    language: 'C',
    difficulty: 'Medium',
    category: 'Strings & ASCII',
    leetCodeUrl: 'https://en.cppreference.com/w/c/string/byte',
    description: 'Count vowels and consonants in a string using pointer traversal.',
    examples: [{ input: 'str = "Topic Solver"', output: 'vowels = 4, consonants = 7' }],
    sampleSolution: `void countVowels(const char* str, int* v, int* c) {\n    *v = 0; *c = 0;\n    while (*str) {\n        char ch = tolower(*str);\n        if (ch >= 'a' && ch <= 'z') {\n            if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u') (*v)++;\n            else (*c)++;\n        }\n        str++;\n    }\n}`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 30,
    slug: 'linked-list-insert-c',
    title: 'Linked List Node Insertion',
    language: 'C',
    difficulty: 'Hard',
    category: 'Structs & Pointers',
    leetCodeUrl: 'https://en.cppreference.com/w/c/language/struct',
    description: 'Insert new node at beginning of linked list and return new head.',
    examples: [{ input: 'head = [2, 3], data = 1', output: '[1, 2, 3]' }],
    sampleSolution: `struct Node* insertAtBeginning(struct Node* head, int data) {\n    struct Node* n = (struct Node*)malloc(sizeof(struct Node));\n    if (!n) return head;\n    n->data = data;\n    n->next = head;\n    return n;\n}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)'
  }
];
