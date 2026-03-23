/*

MASTER DSA INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — DSA FUNDAMENTALS
========================================================
1. What is an algorithm?  
2. What are characteristics of a good algorithm?  
3. What is Data Structure?  
4. What is the difference between array and linked list?  
5. What is time complexity?  
6. What is space complexity?  
7. What is Big-O notation?  
8. What is Big-Theta and Big-Omega?  
9. What is amortized analysis?  
10. What is recursion? When do you use it?

========================================================
SECTION 2 — ARRAYS & STRINGS
========================================================
11. How do you reverse an array?  
12. What is sliding window technique?  
13. What is two-pointer technique?  
14. How do you detect duplicates in an array?  
15. What is Kadane’s algorithm?  
16. How do you rotate an array?  
17. What is prefix-sum technique?  
18. What is string hashing?  
19. How do you check if two strings are anagrams?  
20. What is the longest common prefix problem?

========================================================
SECTION 3 — LINKED LISTS
========================================================
21. What is a singly linked list?  
22. What is a doubly linked list?  
23. What is a circular linked list?  
24. How do you detect a cycle in a linked list (Floyd’s algorithm)?  
25. How do you find the middle of a linked list?  
26. How do you reverse a linked list iteratively and recursively?  
27. How do you merge two sorted linked lists?  
28. What is the intersection point of two linked lists?  
29. How do you remove duplicates from a linked list?  
30. What are advantages/disadvantages of linked lists vs arrays?

========================================================
SECTION 4 — STACKS & QUEUES
========================================================
31. What is a stack and how is it implemented?  
32. What is a queue and how is it implemented?  
33. What is a circular queue?  
34. How do you check balanced parentheses using stacks?  
35. What is the monotonic stack technique?  
36. How do you implement a queue using two stacks?  
37. How do you implement a stack using two queues?  
38. What is deque (double-ended queue)?  
39. What is priority queue (heap)?  
40. What is the difference between stack overflow and heap overflow?

========================================================
SECTION 5 — HASHING & MAPS
========================================================
41. What is a hash table?  
42. What is a hash function?  
43. What is collision?  
44. What are collision resolution techniques (chaining, open addressing)?  
45. What is load factor?  
46. What is rehashing?  
47. What is unordered_map vs map?  
48. What is consistent hashing?  
49. How do you count frequency of elements efficiently?  
50. What is LRU cache and how do you design it?

========================================================
SECTION 6 — TREES & BINARY TREES
========================================================
51. What is a binary tree?  
52. What is the difference between binary tree and binary search tree (BST)?  
53. What are tree traversals (inorder, preorder, postorder)?  
54. What is level-order traversal (BFS)?  
55. How do you check if a binary tree is height balanced?  
56. What is lowest common ancestor (LCA)?  
57. What is diameter of a tree?  
58. How do you invert a binary tree?  
59. What is serializing/deserializing a binary tree?  
60. What is a complete, full, and perfect binary tree?

========================================================
SECTION 7 — BINARY SEARCH TREES (BST)
========================================================
61. What operations are supported by BST?  
62. How do you insert/delete/search in a BST?  
63. What is the time complexity of BST operations?  
64. What causes BST to become unbalanced?  
65. How do you fix an unbalanced BST?  
66. What is floor/ceil in BST?  
67. What is kth smallest/largest element in BST?  
68. What is BST iterator design?  
69. What is Morris traversal?  
70. What are limitations of BST?

========================================================
SECTION 8 — HEAPS & PRIORITY QUEUES
========================================================
71. What is a heap?  
72. What is min-heap vs max-heap?  
73. How is heap represented using arrays?  
74. How do you build a heap in O(n)?  
75. What is heapify?  
76. How do you insert/delete in a heap?  
77. What is heap sort?  
78. What is k-th largest/smallest element using heap?  
79. What is a d-ary heap?  
80. What is a Fibonacci heap?

========================================================
SECTION 9 — GRAPH THEORY
========================================================
81. What is a graph?  
82. What is adjacency list vs adjacency matrix?  
83. What is BFS and when is it used?  
84. What is DFS?  
85. What is topological sorting?  
86. What is cycle detection in directed and undirected graphs?  
87. What is a connected component?  
88. What is shortest path (Dijkstra, Bellman-Ford)?  
89. What is Floyd-Warshall algorithm?  
90. What is minimum spanning tree (Prim’s vs Kruskal’s)?

========================================================
SECTION 10 — ADVANCED GRAPH ALGORITHMS
========================================================
91. What is union-find / disjoint set?  
92. What is path compression technique?  
93. What is bipartite graph check?  
94. What is articulation point / bridge in graph?  
95. What is strongly connected components (Kosaraju / Tarjan)?  
96. What is Kahn’s algorithm?  
97. What is A* search algorithm?  
98. What is maximum flow (Ford-Fulkerson / Edmonds–Karp)?  
99. What is traveling salesman problem (TSP)?  
100. What is graph coloring?

========================================================
SECTION 11 — DYNAMIC PROGRAMMING (DP)
========================================================
101. What is dynamic programming?  
102. What is the difference between DP and recursion?  
103. What is memoization?  
104. What is tabulation?  
105. What is overlapping subproblems?  
106. What is optimal substructure?  
107. What is 0/1 knapsack?  
108. What is unbounded knapsack?  
109. What is longest increasing subsequence (LIS)?  
110. What is matrix chain multiplication?

========================================================
SECTION 12 — GREEDY ALGORITHMS
========================================================
111. What is greedy strategy?  
112. When does greedy fail?  
113. What is coin change (greedy)?  
114. What is activity selection problem?  
115. What is Huffman coding?  
116. What is fractional knapsack?  
117. What is interval scheduling?  
118. What is minimum platforms problem?  
119. What is job sequencing with deadlines?  
120. What is greedy choice property?

========================================================
SECTION 13 — TRIES & STRING ALGORITHMS
========================================================
121. What is a Trie?  
122. How do you insert/search in a Trie?  
123. What is auto-complete using Trie?  
124. What is prefix tree?  
125. What is Rabin-Karp algorithm?  
126. What is KMP (Knuth–Morris–Pratt) algorithm?  
127. What is Z-algorithm?  
128. What is suffix array?  
129. What is suffix tree?  
130. What is longest repeating substring?

========================================================
SECTION 14 — BIT MANIPULATION
========================================================
131. What is XOR trick?  
132. How do you find non-repeating element using XOR?  
133. What is the difference between left shift and right shift?  
134. How do you check if a number is power of two?  
135. How do you count set bits?  
136. What is bitmask DP?  
137. What is two’s complement?  
138. How to reverse bits of a number?  
139. What is the AND/OR properties in optimization?  
140. What is bit trie?

========================================================
SECTION 15 — SYSTEM DESIGN LEVEL DSA CONCEPTS
========================================================
141. What is consistent hashing and why is it used?  
142. How does a bloom filter work?  
143. What is LRU cache and how do you implement it?  
144. What is LFU cache?  
145. What is a skip list?  
146. What is a bounded queue?  
147. What data structures are used in message queues?  
148. How does key-value storage use hashing?  
149. What is distributed union-find?  
150. How DSA applies in large-scale systems?

========================================================

*/