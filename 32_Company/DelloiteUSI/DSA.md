# Deloitte USI — Top 50 DSA & Logic Interview Questions
### For 5 Years Experience | Frontend Developer Role
### Explained in Simple, Beginner-Friendly Language with JavaScript Code

---

> **How to use this guide:** Every question is explained like you're a complete beginner. You'll find a plain English explanation, a real-life analogy, step-by-step approach, JavaScript code, and time/space complexity for every single question.

---

## Table of Contents

1. [Arrays (Q1–Q12)](#arrays)
2. [Strings (Q13–Q22)](#strings)
3. [Objects (Q23–Q30)](#objects)
4. [Linked Lists (Q31–Q35)](#linked-lists)
5. [Trees (Q36–Q40)](#trees)
6. [Dynamic Programming (Q41–Q45)](#dynamic-programming)
7. [Logic & Design (Q46–Q50)](#logic--design)

---

## Arrays

---

### Q1. Two Sum — Find indices of two numbers that add up to target ⭐ Frequently Asked

**What does this question mean?**

You have a list of numbers and a target number. Find two numbers in the list that add up to the target, and return their positions (indices).

**Real-life analogy:** You have a bag of price tags: [20, 50, 30, 70]. You want to find two items that together cost exactly ₹100. The answer is 30 + 70 = 100, at positions [2, 3].

**Step-by-step approach:**
1. Go through each number one by one
2. For each number, ask: "What number do I NEED to reach the target?" (target - current = complement)
3. Check if you've seen that complement before
4. If yes → you found your pair!
5. If no → remember this number and move on

```javascript
// SLOW approach (check every pair) — O(n²) time
function twoSumSlow(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// FAST approach (use a memory map) — O(n) time
function twoSum(nums, target) {
  const seen = new Map(); // Our memory: { number → its index }

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]; // What do I need?

    if (seen.has(complement)) {
      return [seen.get(complement), i]; // Found it!
    }

    seen.set(nums[i], i); // Remember current number
  }
}

// Test it
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1] → 2+7=9
console.log(twoSum([3, 2, 4], 6));        // [1, 2] → 2+4=6
console.log(twoSum([3, 3], 6));           // [0, 1] → 3+3=6
```

**Time complexity:** O(n) — we look at each number only once
**Space complexity:** O(n) — we store numbers in our map

---

### Q2. Maximum Subarray Sum (Kadane's Algorithm) ⭐ Frequently Asked

**What does this question mean?**

Find a continuous group of numbers in the array that gives the biggest sum possible.

**Real-life analogy:** Imagine you track your daily profit/loss: [-2, 1, -3, 4, -1, 2, 1, -5, 4]. Which stretch of days gave you the most profit if you picked the best window?

**Step-by-step approach:**
1. Start with the first number as both current sum and max sum
2. For each number, decide: should I ADD this to my current streak, or START FRESH with just this number?
3. If adding is better → add it
4. If starting fresh is better → restart from this number
5. Always track the highest sum seen so far

```javascript
function maxSubarraySum(nums) {
  let currentSum = nums[0]; // Running sum of current subarray
  let maxSum = nums[0];     // Best sum we've seen

  for (let i = 1; i < nums.length; i++) {
    // Should we continue the streak or start fresh?
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // Is this the best we've seen?
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// Test it
console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 → [4,-1,2,1]
console.log(maxSubarraySum([1]));                               // 1
console.log(maxSubarraySum([-1, -2, -3]));                     // -1 (best of bad options)

// BONUS: Return the actual subarray too
function maxSubarrayWithIndices(nums) {
  let currentSum = nums[0], maxSum = nums[0];
  let start = 0, end = 0, tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > currentSum + nums[i]) {
      currentSum = nums[i];
      tempStart = i; // Fresh start here
    } else {
      currentSum += nums[i];
    }
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }
  return { maxSum, subarray: nums.slice(start, end + 1) };
}
console.log(maxSubarrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// { maxSum: 6, subarray: [4, -1, 2, 1] }
```

**Time complexity:** O(n) — single pass
**Space complexity:** O(1) — just two variables

---

### Q3. Move All Zeros to End ⭐ Frequently Asked

**What does this question mean?**

Given an array with some zeros mixed in, push all zeros to the end while keeping the order of non-zero numbers the same.

**Real-life analogy:** You have a row of seats: [1, 0, 3, 0, 5]. Empty seats (0s) should go to the back, filled seats stay in order at the front.

**Step-by-step approach:**
1. Keep a pointer `insertPos` starting at 0 — this tracks where the next non-zero goes
2. Walk through the array
3. Whenever you see a non-zero number, place it at `insertPos` and move the pointer forward
4. Fill the remaining positions with zeros

```javascript
function moveZeros(nums) {
  let insertPos = 0; // Where should the next non-zero go?

  // Step 1: Move all non-zero numbers to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos] = nums[i];
      insertPos++;
    }
  }

  // Step 2: Fill the rest with zeros
  for (let i = insertPos; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}

// Test it
console.log(moveZeros([0, 1, 0, 3, 12]));   // [1, 3, 12, 0, 0]
console.log(moveZeros([0, 0, 1]));           // [1, 0, 0]
console.log(moveZeros([1, 2, 3]));           // [1, 2, 3] — no zeros

// Alternative: swap approach (maintains relative order too)
function moveZerosSwap(nums) {
  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]]; // Swap
      left++;
    }
  }
  return nums;
}
```

**Time complexity:** O(n)
**Space complexity:** O(1) — done in-place

---

### Q4. Find the Missing Number in Array of 1 to N ⭐ Frequently Asked

**What does this question mean?**

You have an array with numbers from 1 to N, but one number is missing. Find it.

**Real-life analogy:** You have roll numbers 1 to 10 in class but only 9 students are present. Which student is absent?

**Step-by-step approach:**
The sum of 1 to N is always: N × (N+1) / 2
Just subtract the actual sum of the array from this expected sum — the difference is the missing number!

```javascript
// Method 1: Math formula — simplest
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // Sum if nothing was missing
  const actualSum = nums.reduce((acc, num) => acc + num, 0);
  return expectedSum - actualSum; // The missing piece
}

// Method 2: XOR trick (handles large numbers better — no overflow risk)
function missingNumberXOR(nums) {
  let xor = 0;
  // XOR all numbers from 0 to n
  for (let i = 0; i <= nums.length; i++) xor ^= i;
  // XOR all elements in array
  for (let num of nums) xor ^= num;
  // Duplicates cancel out, leaving only the missing number
  return xor;
}

// Test both
console.log(missingNumber([3, 0, 1]));        // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8
console.log(missingNumberXOR([3, 0, 1]));     // 2
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

### Q5. Rotate an Array to the Right by K Positions

**What does this question mean?**

Shift every element to the right by K places. Elements that fall off the end wrap around to the beginning.

**Real-life analogy:** Think of people sitting in a circle. "Rotate by 2" means everyone moves 2 chairs to the right, and the last two people wrap around to the front.

```javascript
// Input:  [1, 2, 3, 4, 5, 6, 7], k = 3
// Output: [5, 6, 7, 1, 2, 3, 4]

// Method 1: Extra array — easy to understand
function rotateSimple(nums, k) {
  const n = nums.length;
  k = k % n; // Handle k larger than array length
  return [...nums.slice(n - k), ...nums.slice(0, n - k)];
}

// Method 2: Reverse trick — O(1) space, in-place
function rotate(nums, k) {
  const n = nums.length;
  k = k % n; // In case k > n

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  // Step 1: Reverse the entire array
  reverse(nums, 0, n - 1);       // [7,6,5,4,3,2,1]
  // Step 2: Reverse the first k elements
  reverse(nums, 0, k - 1);       // [5,6,7,4,3,2,1]
  // Step 3: Reverse the remaining elements
  reverse(nums, k, n - 1);       // [5,6,7,1,2,3,4] ✓

  return nums;
}

console.log(rotate([1,2,3,4,5,6,7], 3)); // [5,6,7,1,2,3,4]
console.log(rotate([1,2], 3));           // [2,1] (k=3%2=1)
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

### Q6. Find Duplicates in an Array ⭐ Frequently Asked

**What does this question mean?**

Find all numbers that appear more than once in the array.

**Real-life analogy:** You're checking a guest list and want to find names that appear more than once (duplicate bookings).

```javascript
// Method 1: HashMap — easy and clear
function findDuplicates(nums) {
  const count = {};
  const duplicates = [];

  for (const num of nums) {
    count[num] = (count[num] || 0) + 1;
  }

  for (const [num, freq] of Object.entries(count)) {
    if (freq > 1) duplicates.push(Number(num));
  }

  return duplicates;
}

// Method 2: Using Set — clean one-liner approach
function findDuplicatesSet(nums) {
  const seen = new Set();
  const duplicates = new Set();

  for (const num of nums) {
    if (seen.has(num)) duplicates.add(num);
    else seen.add(num);
  }

  return [...duplicates];
}

// Test
console.log(findDuplicates([4,3,2,7,8,2,3,1])); // [2, 3]
console.log(findDuplicatesSet([1,1,2,3,3,4]));   // [1, 3]
```

**Time complexity:** O(n)
**Space complexity:** O(n)

---

### Q7. Merge Two Sorted Arrays Without Extra Space

**What does this question mean?**

You have two sorted arrays. Merge them so both are sorted, without creating a third array.

**Real-life analogy:** Two sorted decks of cards. You want to merge them in-place without a table (extra space).

```javascript
// The trick: compare from the END of both arrays
// Place the larger element at the end of the longer array
function mergeSortedArrays(arr1, m, arr2, n) {
  // arr1 has m real elements + n empty spots at the end
  // arr2 has n elements
  let p1 = m - 1;       // Last real element in arr1
  let p2 = n - 1;       // Last element in arr2
  let p = m + n - 1;    // Last position in arr1

  while (p1 >= 0 && p2 >= 0) {
    if (arr1[p1] > arr2[p2]) {
      arr1[p] = arr1[p1]; // Put the larger one at the end
      p1--;
    } else {
      arr1[p] = arr2[p2];
      p2--;
    }
    p--;
  }

  // Copy remaining elements from arr2 (if any)
  while (p2 >= 0) {
    arr1[p] = arr2[p2];
    p2--;
    p--;
  }

  return arr1;
}

// Test
const arr1 = [1, 2, 3, 0, 0, 0]; // 3 real elements, 3 empty slots
const arr2 = [2, 5, 6];
console.log(mergeSortedArrays(arr1, 3, arr2, 3)); // [1,2,2,3,5,6]
```

**Time complexity:** O(m + n)
**Space complexity:** O(1)

---

### Q8. Find the Majority Element (appears more than n/2 times) ⭐ Frequently Asked

**What does this question mean?**

Find the element that appears more than half the time in the array. It is guaranteed to exist.

**Real-life analogy:** In a vote where one party wins by absolute majority (more than 50%), find that party.

```javascript
// Boyer-Moore Voting Algorithm — genius O(1) space solution
function majorityElement(nums) {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      // No current candidate — pick this as new candidate
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++; // Same as candidate — strengthen it
    } else {
      count--; // Different — weaken the candidate
    }
  }

  // The majority element always survives this process
  return candidate;
}

// Easy alternative: HashMap
function majorityElementMap(nums) {
  const count = {};
  const half = nums.length / 2;

  for (const num of nums) {
    count[num] = (count[num] || 0) + 1;
    if (count[num] > half) return num;
  }
}

console.log(majorityElement([3, 2, 3]));           // 3
console.log(majorityElement([2,2,1,1,1,2,2]));     // 2
```

**Time complexity:** O(n)
**Space complexity:** O(1) for Boyer-Moore, O(n) for HashMap

---

### Q9. Best Time to Buy and Sell Stock ⭐ Frequently Asked

**What does this question mean?**

Given prices of a stock on different days, find the best day to buy and the best day to sell (must buy before selling) to get maximum profit.

**Real-life analogy:** You know the Sensex price for 7 days. When should you buy and when should you sell to make the most money?

```javascript
function maxProfit(prices) {
  let minPrice = Infinity; // Cheapest price seen so far
  let maxProfit = 0;       // Best profit seen so far

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;    // Found a cheaper buy price
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice; // Found a better profit
    }
  }

  return maxProfit;
}

// Test
console.log(maxProfit([7,1,5,3,6,4])); // 5 (buy at 1, sell at 6)
console.log(maxProfit([7,6,4,3,1]));   // 0 (prices only go down, don't trade)
console.log(maxProfit([2,4,1,7]));     // 6 (buy at 1, sell at 7)
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

### Q10. Container With Most Water

**What does this question mean?**

You have vertical walls of different heights. Find two walls that can hold the most water between them.

**Real-life analogy:** Placing two planks in a stream to hold water. The amount of water = width × height of shorter plank.

```javascript
// Two-pointer approach — start from both ends, move the shorter wall inward
function maxWater(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    // Area = width × height of shorter wall
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;
    maxArea = Math.max(maxArea, area);

    // Move the shorter wall inward (hope to find a taller one)
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

console.log(maxWater([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxWater([1,1]));                 // 1
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

### Q11. Merge Overlapping Intervals ⭐ Frequently Asked

**What does this question mean?**

Given a list of time intervals like [[1,3],[2,6],[8,10]], merge intervals that overlap with each other.

**Real-life analogy:** You have meetings: 10am-12pm, 11am-1pm, 3pm-4pm. Meetings 1 and 2 overlap, so merge them into 10am-1pm.

```javascript
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  // Sort by start time first
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]]; // Start with the first interval

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1]; // Last merged interval

    if (current[0] <= last[1]) {
      // Overlap! Extend the last interval's end if needed
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap — add as new interval
      result.push(current);
    }
  }

  return result;
}

console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]));
// [[1,6],[8,10],[15,18]]

console.log(mergeIntervals([[1,4],[4,5]]));
// [[1,5]] — touching intervals also merge
```

**Time complexity:** O(n log n) — due to sorting
**Space complexity:** O(n)

---

### Q12. Product of Array Except Self (No Division Allowed)

**What does this question mean?**

For each position, find the product of ALL other elements — but you cannot use division.

**Real-life analogy:** 5 friends each contribute to a prize. Each person's prize = product of everyone else's contribution.

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Step 1: Fill with prefix products (everything to the LEFT)
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Step 2: Multiply with suffix products (everything to the RIGHT)
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

console.log(productExceptSelf([1,2,3,4]));  // [24,12,8,6]
// Position 0: 2×3×4=24
// Position 1: 1×3×4=12
// Position 2: 1×2×4=8
// Position 3: 1×2×3=6
```

**Time complexity:** O(n)
**Space complexity:** O(1) (output array doesn't count)

---

## Strings

---

### Q13. Reverse a String — Multiple Ways ⭐ Frequently Asked

**What does this question mean?**

Flip a string so the last character becomes first, and so on.

```javascript
// Method 1: Built-in (easiest)
function reverseBuiltin(str) {
  return str.split("").reverse().join("");
}

// Method 2: Two pointers (swap from both ends)
function reverseTwoPointer(str) {
  const arr = str.split("");
  let left = 0, right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap
    left++;
    right--;
  }

  return arr.join("");
}

// Method 3: Recursive
function reverseRecursive(str) {
  if (str.length <= 1) return str;
  return reverseRecursive(str.slice(1)) + str[0];
}

// Method 4: For loop from end
function reverseLoop(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverseBuiltin("hello"));       // "olleh"
console.log(reverseTwoPointer("Deloitte")); // "ettioled"
```

**Time complexity:** O(n)
**Space complexity:** O(n)

---

### Q14. Check if a String is a Palindrome ⭐ Frequently Asked

**What does this question mean?**

A palindrome reads the same forwards and backwards. "racecar" → same both ways. "hello" → not the same.

**Real-life analogy:** "MADAM" reads same forward and backward. "LEVEL" does too.

```javascript
// Method 1: Simple reverse and compare
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

// Method 2: Two pointer — more efficient (stops early on mismatch)
function isPalindromeFast(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false; // Mismatch!
    left++;
    right--;
  }
  return true; // All characters matched
}

console.log(isPalindrome("racecar"));                       // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello"));                         // false
console.log(isPalindromeFast("Was it a car or a cat I saw?")); // true
```

**Time complexity:** O(n)
**Space complexity:** O(n) for Method 1, O(1) for Method 2

---

### Q15. Check if Two Strings Are Anagrams ⭐ Frequently Asked

**What does this question mean?**

Two strings are anagrams if one can be rearranged to form the other. They use the exact same letters in the same counts.

**Real-life analogy:** "listen" and "silent" — same letters, just rearranged!

```javascript
// Method 1: Sort both strings and compare
function isAnagramSort(s, t) {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
}

// Method 2: Count characters — more efficient
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = {};

  // Count characters in s (add)
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  // Subtract counts using t
  for (const char of t) {
    if (!count[char]) return false; // Character not in s, or used up
    count[char]--;
  }

  return true;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false
console.log(isAnagram("listen", "silent"));   // true
```

**Time complexity:** O(n)
**Space complexity:** O(1) — only 26 letters possible

---

### Q16. Longest Substring Without Repeating Characters ⭐ Frequently Asked

**What does this question mean?**

Find the length of the longest window/section in a string where no character repeats.

**Real-life analogy:** Imagine typing a password where each character must be unique. What's the longest unique streak you can make from the given string?

**Step-by-step:**
- Use a sliding window: two pointers (left and right)
- Expand right as long as new character is unique
- When a repeat is found, shrink from left until unique again

```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Map(); // Stores: character → its last seen index
  let left = 0;          // Left boundary of window
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If we've seen this char AND it's inside our current window
    if (seen.has(char) && seen.get(char) >= left) {
      left = seen.get(char) + 1; // Move left past the duplicate
    }

    seen.set(char, right);        // Update last seen position
    maxLen = Math.max(maxLen, right - left + 1); // Update max
  }

  return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 → "abc"
console.log(lengthOfLongestSubstring("bbbbb"));    // 1 → "b"
console.log(lengthOfLongestSubstring("pwwkew"));   // 3 → "wke"
console.log(lengthOfLongestSubstring(""));         // 0
```

**Time complexity:** O(n)
**Space complexity:** O(min(n, alphabet size))

---

### Q17. Count and Say — Generate Nth Term

**What does this question mean?**

Start with "1". Describe each term to generate the next:
- "1" → one 1 → "11"
- "11" → two 1s → "21"
- "21" → one 2, one 1 → "1211"
- And so on...

```javascript
function countAndSay(n) {
  let result = "1"; // Start with "1"

  for (let i = 1; i < n; i++) {
    let next = "";
    let count = 1;

    for (let j = 1; j < result.length; j++) {
      if (result[j] === result[j - 1]) {
        count++; // Same character, keep counting
      } else {
        next += count + result[j - 1]; // Say what we counted
        count = 1; // Reset count
      }
    }
    next += count + result[result.length - 1]; // Don't forget last group
    result = next;
  }

  return result;
}

console.log(countAndSay(1)); // "1"
console.log(countAndSay(2)); // "11"
console.log(countAndSay(3)); // "21"
console.log(countAndSay(4)); // "1211"
console.log(countAndSay(5)); // "111221"
```

**Time complexity:** O(n × length of string at each step)
**Space complexity:** O(n)

---

### Q18. Find All Permutations of a String

**What does this question mean?**

List all possible ways to arrange all characters of a string.

**Real-life analogy:** How many ways can you arrange the letters of "ABC"? ABC, ACB, BAC, BCA, CAB, CBA.

```javascript
function permutations(str) {
  const result = [];

  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push(current); // Found a complete permutation
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      // Pick the character at position i
      backtrack(
        current + remaining[i],
        remaining.slice(0, i) + remaining.slice(i + 1) // Remove picked char
      );
    }
  }

  backtrack("", str);
  return result;
}

console.log(permutations("abc"));
// ["abc","acb","bac","bca","cab","cba"]

console.log(permutations("ab").length); // 2
console.log(permutations("abc").length); // 6
console.log(permutations("abcd").length); // 24
```

**Time complexity:** O(n!) — factorial growth
**Space complexity:** O(n)

---

### Q19. Longest Common Prefix Among an Array of Strings

**What does this question mean?**

Find the longest starting portion that is common to ALL strings in the array.

**Real-life analogy:** ["flower","flow","flight"] all start with "fl" — that's the longest common prefix.

```javascript
function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  let prefix = strs[0]; // Start with the first string as prefix

  for (let i = 1; i < strs.length; i++) {
    // Keep trimming prefix until it matches the start of strs[i]
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1); // Remove last character
      if (!prefix) return ""; // No common prefix at all
    }
  }

  return prefix;
}

console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""
console.log(longestCommonPrefix(["interview","internal","inter"])); // "inter"
```

**Time complexity:** O(n × m) where m is the shortest string length
**Space complexity:** O(1)

---

### Q20. Valid Parentheses — Check if Brackets Are Properly Matched ⭐ Frequently Asked

**What does this question mean?**

Given a string of brackets `()[]{}`, check if they are opened and closed in the correct order.

**Real-life analogy:** Think of Russian nesting dolls. Each doll must be closed before the outer doll can close.

```javascript
function isValidParentheses(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char); // Opening bracket — push to stack
    } else {
      // Closing bracket — check if it matches the last opened one
      if (stack.pop() !== pairs[char]) {
        return false; // Mismatch!
      }
    }
  }

  return stack.length === 0; // Stack must be empty (all matched)
}

console.log(isValidParentheses("()"));      // true
console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("(]"));     // false
console.log(isValidParentheses("([)]"));   // false
console.log(isValidParentheses("{[]}"));   // true
```

**Time complexity:** O(n)
**Space complexity:** O(n) — stack

---

### Q21. Roman to Integer — Convert Roman Numeral to Number

```javascript
function romanToInt(s) {
  const values = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = values[s[i]];
    const next = values[s[i + 1]];

    // If next value is bigger, subtract current (e.g., IV = 5-1 = 4)
    if (next > current) {
      total -= current;
    } else {
      total += current;
    }
  }

  return total;
}

console.log(romanToInt("III"));    // 3
console.log(romanToInt("IV"));     // 4
console.log(romanToInt("IX"));     // 9
console.log(romanToInt("LVIII"));  // 58
console.log(romanToInt("MCMXCIV")); // 1994
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

### Q22. Implement strStr() — Find First Occurrence of Substring

**What does this question mean?**

Find the starting index where a pattern string first appears inside a main string. Return -1 if not found.

```javascript
// Method 1: Using built-in (quick answer in interview)
function strStr(haystack, needle) {
  return haystack.indexOf(needle);
}

// Method 2: Sliding window — shows understanding
function strStrManual(haystack, needle) {
  if (needle.length === 0) return 0;
  if (needle.length > haystack.length) return -1;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    // Check if substring starting at i matches needle
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }

  return -1;
}

console.log(strStr("hello", "ll"));   // 2
console.log(strStr("aaaaa", "bba"));  // -1
console.log(strStr("sadbutsad", "sad")); // 0
```

**Time complexity:** O(n × m) where n = haystack length, m = needle length
**Space complexity:** O(1)

---

## Objects

---

### Q23. Flatten a Deeply Nested Object ⭐ Frequently Asked

**What does this question mean?**

Convert a nested object like `{a:{b:{c:1}}}` into a flat object `{"a.b.c": 1}` where dots show the path.

**Real-life analogy:** Convert a folder inside a folder into a single file with its full path as the name. `Documents/Work/Report.pdf` becomes one flat entry.

```javascript
function flattenObject(obj, prefix = "", result = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const newKey = prefix ? `${prefix}.${key}` : key; // Build full path

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // It's an object → go deeper (recurse)
      flattenObject(obj[key], newKey, result);
    } else {
      // It's a value → save it with the full path as key
      result[newKey] = obj[key];
    }
  }
  return result;
}

// Test
console.log(flattenObject({ a: { b: { c: 1 } } }));
// { "a.b.c": 1 }

console.log(flattenObject({
  name: "Ravi",
  address: { city: "Pune", pin: 411001 },
  job: { company: "Deloitte", role: "Senior Dev" }
}));
// { "name": "Ravi", "address.city": "Pune", "address.pin": 411001,
//   "job.company": "Deloitte", "job.role": "Senior Dev" }
```

**Time complexity:** O(n) where n = total number of key-value pairs
**Space complexity:** O(d) where d = max depth (recursion stack)

---

### Q24. Deep Clone an Object Without JSON.parse/stringify ⭐ Frequently Asked

**What does this question mean?**

Make a completely independent copy of an object — changing the copy should NOT affect the original.

**Why not JSON.parse/stringify?**
- It breaks for functions, `undefined`, `Date`, circular references, and `RegExp`

**Real-life analogy:** Photocopying a document (deep clone) vs sharing a Google Doc link (reference copy). Changes to the photocopy don't affect the original.

```javascript
function deepClone(obj) {
  // Base case: null or primitive (string, number, boolean)
  if (obj === null || typeof obj !== "object") return obj;

  // Handle Date objects
  if (obj instanceof Date) return new Date(obj.getTime());

  // Handle Arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Handle plain objects
  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]); // Recursively clone each value
    }
  }
  return clone;
}

// Test
const original = {
  name: "Ravi",
  scores: [10, 20, 30],
  address: { city: "Pune" },
  joinedAt: new Date("2020-01-01")
};

const copy = deepClone(original);
copy.address.city = "Mumbai"; // Change the copy
copy.scores.push(99);

console.log(original.address.city); // "Pune" — unchanged!
console.log(original.scores);       // [10, 20, 30] — unchanged!
console.log(copy.address.city);     // "Mumbai"
```

**Time complexity:** O(n) — visit every node
**Space complexity:** O(d) — recursion depth

---

### Q25. Group an Array of Objects by a Given Key ⭐ Frequently Asked

**What does this question mean?**

Take a list of objects and group them based on a shared property value.

**Real-life analogy:** You have a list of employees. Group them by their city — all Pune employees together, all Mumbai employees together.

```javascript
function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const groupKey = item[key]; // Get the grouping value

    if (!groups[groupKey]) {
      groups[groupKey] = []; // Create the group if it doesn't exist
    }

    groups[groupKey].push(item); // Add item to its group
    return groups;
  }, {});
}

// Test
const employees = [
  { name: "Ravi", city: "Pune" },
  { name: "Priya", city: "Mumbai" },
  { name: "Amit", city: "Pune" },
  { name: "Sara", city: "Mumbai" },
  { name: "John", city: "Delhi" },
];

console.log(groupBy(employees, "city"));
// {
//   Pune:   [{name:"Ravi",...}, {name:"Amit",...}],
//   Mumbai: [{name:"Priya",...}, {name:"Sara",...}],
//   Delhi:  [{name:"John",...}]
// }

// Group numbers by even/odd
const nums = [1, 2, 3, 4, 5, 6];
console.log(groupBy(nums.map(n => ({ val: n, type: n % 2 === 0 ? "even" : "odd" })), "type"));
```

**Time complexity:** O(n)
**Space complexity:** O(n)

---

### Q26. Implement a memoize() Function ⭐ Frequently Asked

**What does this question mean?**

Create a function wrapper that remembers the result of previous calls. If the same inputs are given again, return the cached result instead of recalculating.

**Real-life analogy:** A calculator that remembers: "5 × 7 = 35". Next time you type 5×7, it shows the answer instantly without computing again.

```javascript
function memoize(fn) {
  const cache = new Map(); // Our memory storage

  return function(...args) {
    const key = JSON.stringify(args); // Convert args to a unique key

    if (cache.has(key)) {
      console.log("Cache hit! Returning saved result for:", key);
      return cache.get(key); // Return saved result
    }

    const result = fn.apply(this, args); // Calculate fresh
    cache.set(key, result);              // Save it for future
    console.log("Calculated and cached:", key, "=", result);
    return result;
  };
}

// Test with expensive Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fastFib = memoize(fibonacci);
console.log(fastFib(10)); // Calculates → 55
console.log(fastFib(10)); // Cache hit! → 55 instantly
console.log(fastFib(5));  // Calculates → 5
console.log(fastFib(5));  // Cache hit! → 5 instantly

// Works with multiple arguments too
const memoAdd = memoize((a, b) => a + b);
console.log(memoAdd(2, 3)); // 5 (calculated)
console.log(memoAdd(2, 3)); // 5 (from cache)
```

**Time complexity:** O(1) for cache hits, O(n) for first call
**Space complexity:** O(n) — cache storage

---

### Q27. Deep Equality Check Between Two Objects

**What does this question mean?**

Check if two objects have the exact same structure and values at every level of nesting.

```javascript
function deepEqual(obj1, obj2) {
  // Same reference or same primitive value
  if (obj1 === obj2) return true;

  // One is null but not the other
  if (obj1 === null || obj2 === null) return false;

  // Different types
  if (typeof obj1 !== typeof obj2) return false;

  // Handle arrays
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  if (typeof obj1 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Different number of keys
    if (keys1.length !== keys2.length) return false;

    // Check each key recursively
    for (const key of keys1) {
      if (!obj2.hasOwnProperty(key)) return false;
      if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  }

  return false; // Primitive mismatch (already handled by ===)
}

console.log(deepEqual({a:1, b:{c:2}}, {a:1, b:{c:2}})); // true
console.log(deepEqual({a:1}, {a:2}));                   // false
console.log(deepEqual([1,2,3], [1,2,3]));               // true
console.log(deepEqual({a:1, b:2}, {b:2, a:1}));         // true (order doesn't matter)
```

---

### Q28. Implement debounce() and throttle() from scratch ⭐ Frequently Asked

**What does this question mean?**

- **Debounce:** Wait until the user stops doing something, THEN act. (Used for search bars)
- **Throttle:** Allow the action at most once every X milliseconds. (Used for scroll/resize events)

```javascript
// DEBOUNCE — wait for user to stop, then fire
function debounce(fn, delay) {
  let timer = null; // Our waiting timer

  return function(...args) {
    clearTimeout(timer);    // Cancel previous timer
    timer = setTimeout(() => {
      fn.apply(this, args); // Fire after the wait
    }, delay);
  };
}

// THROTTLE — fire at most once per interval
function throttle(fn, limit) {
  let lastCalled = 0; // When did we last fire?

  return function(...args) {
    const now = Date.now();

    if (now - lastCalled >= limit) { // Enough time passed?
      lastCalled = now;
      fn.apply(this, args);          // Fire!
    }
  };
}

// Usage examples
const searchAPI = debounce((query) => {
  console.log("Searching for:", query); // Only fires 500ms after typing stops
}, 500);

// In an input box: searchAPI(e.target.value);

const handleScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY); // Max once per second
}, 1000);

// window.addEventListener("scroll", handleScroll);
```

---

### Q29. Convert Flat Array to Nested Tree Structure ⭐ Frequently Asked

**What does this question mean?**

Transform a flat list of `{id, parentId, name}` items into a proper tree where children are nested inside their parents.

**Real-life analogy:** A company org chart — CEO → VPs → Managers → Employees. The flat database table becomes a nested hierarchy.

```javascript
function buildTree(items) {
  const map = {};     // id → node
  const roots = [];   // Top-level nodes (no parent)

  // Step 1: Create a map of all nodes
  items.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // Step 2: Connect children to parents
  items.forEach(item => {
    if (item.parentId === null) {
      roots.push(map[item.id]); // No parent = root node
    } else {
      map[item.parentId].children.push(map[item.id]); // Add to parent
    }
  });

  return roots;
}

// Test
const flat = [
  { id: 1, parentId: null, name: "CEO" },
  { id: 2, parentId: 1,    name: "VP Engineering" },
  { id: 3, parentId: 1,    name: "VP Marketing" },
  { id: 4, parentId: 2,    name: "Frontend Lead" },
  { id: 5, parentId: 2,    name: "Backend Lead" },
  { id: 6, parentId: 4,    name: "Ravi (Dev)" },
];

console.log(JSON.stringify(buildTree(flat), null, 2));
// CEO
//   VP Engineering
//     Frontend Lead
//       Ravi (Dev)
//     Backend Lead
//   VP Marketing
```

**Time complexity:** O(n)
**Space complexity:** O(n)

---

### Q30. Implement a curry() Function

**What does this question mean?**

Transform a function that takes multiple arguments into a chain of functions that each take one argument at a time.

**Real-life analogy:** Instead of ordering "burger with cheese extra spicy" all at once, you say "burger" → they ask "cheese?" → "yes" → "spice level?" → "extra". One step at a time.

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // Got all the arguments — call the original function
      return fn.apply(this, args);
    }
    // Not enough arguments — return a function that waits for more
    return function(...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

// Test
const add = curry((a, b, c) => a + b + c);

console.log(add(1)(2)(3));    // 6 — one at a time
console.log(add(1, 2)(3));    // 6 — two then one
console.log(add(1)(2, 3));    // 6 — one then two
console.log(add(1, 2, 3));    // 6 — all at once

// Real use case: pre-fill tax rate
const multiply = curry((rate, price) => price * rate);
const applyGST = multiply(1.18); // Lock in the tax rate
console.log(applyGST(1000));     // 1180
console.log(applyGST(2000));     // 2360
```

---

## Linked Lists

---

### Q31. Reverse a Singly Linked List ⭐ Frequently Asked

**What does this question mean?**

A linked list is a chain of nodes where each node points to the next. Reversing it means making the last node the first.

**Real-life analogy:** A train with carriages connected. Reverse means the last carriage becomes the engine (first).

```javascript
// Node structure
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// Helper to create linked list from array
function createList(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper to print linked list
function printList(head) {
  const vals = [];
  while (head) { vals.push(head.val); head = head.next; }
  return vals.join(" → ");
}

// Iterative reversal — easier to understand
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next; // Save next
    current.next = prev;           // Reverse the pointer
    prev = current;                // Move prev forward
    current = nextNode;            // Move current forward
  }

  return prev; // prev is now the new head
}

// Recursive reversal
function reverseListRecursive(head) {
  if (!head || !head.next) return head; // Base case

  const newHead = reverseListRecursive(head.next); // Reverse the rest
  head.next.next = head; // Make next node point back to current
  head.next = null;      // Cut current's forward pointer
  return newHead;
}

const list = createList([1, 2, 3, 4, 5]);
console.log(printList(list));              // 1 → 2 → 3 → 4 → 5
console.log(printList(reverseList(list))); // 5 → 4 → 3 → 2 → 1
```

**Time complexity:** O(n)
**Space complexity:** O(1) iterative, O(n) recursive

---

### Q32. Detect if a Linked List Has a Cycle ⭐ Frequently Asked

**What does this question mean?**

A cycle means the list loops back — some node's `next` points to an earlier node, creating an infinite loop. Detect if this exists.

**Real-life analogy:** Driving in a city — if you keep arriving at the same intersection, you're going in circles (there's a cycle).

```javascript
// Floyd's "Tortoise and Hare" algorithm
function hasCycle(head) {
  let slow = head; // Tortoise — moves 1 step at a time
  let fast = head; // Hare — moves 2 steps at a time

  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // 1 step
    fast = fast.next.next;  // 2 steps

    if (slow === fast) {
      return true; // They met! There's a cycle
    }
  }

  return false; // Fast reached the end — no cycle
}

// Why does this work?
// In a cycle, the fast pointer will eventually "lap" the slow pointer
// They're guaranteed to meet inside the cycle

// Test setup
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = head.next; // Creates cycle: 3 → 2

console.log(hasCycle(head)); // true

const linear = createList([1, 2, 3]);
console.log(hasCycle(linear)); // false
```

**Time complexity:** O(n)
**Space complexity:** O(1) — no extra memory needed

---

### Q33. Find the Middle Node of a Linked List

**What does this question mean?**

Find the middle element of a linked list in a single pass (without counting the length first).

```javascript
function findMiddle(head) {
  let slow = head; // Moves 1 step
  let fast = head; // Moves 2 steps

  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // 1 step
    fast = fast.next.next;  // 2 steps
  }

  // When fast reaches the end, slow is at the middle!
  return slow;
}

// Test
const list1 = createList([1, 2, 3, 4, 5]);
console.log(findMiddle(list1).val); // 3 (middle of 5 elements)

const list2 = createList([1, 2, 3, 4, 5, 6]);
console.log(findMiddle(list2).val); // 4 (second middle for even length)
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

### Q34. Merge Two Sorted Linked Lists ⭐ Frequently Asked

**What does this question mean?**

You have two linked lists, each already sorted in ascending order. Merge them into one sorted linked list.

**Real-life analogy:** Two sorted lines of students (by height). Merge them into one sorted line by always picking the shorter student from either line.

```javascript
function mergeTwoLists(l1, l2) {
  // Dummy node to simplify edge cases
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      current.next = l1; // Pick from l1
      l1 = l1.next;
    } else {
      current.next = l2; // Pick from l2
      l2 = l2.next;
    }
    current = current.next;
  }

  // Attach any remaining nodes
  current.next = l1 !== null ? l1 : l2;

  return dummy.next; // Skip the dummy head
}

// Test
const l1 = createList([1, 2, 4]);
const l2 = createList([1, 3, 4]);
console.log(printList(mergeTwoLists(l1, l2))); // 1 → 1 → 2 → 3 → 4 → 4
```

**Time complexity:** O(m + n)
**Space complexity:** O(1)

---

### Q35. Remove Nth Node From the End of a Linked List

**What does this question mean?**

Remove the Nth node counting from the END of the list (in a single pass).

**The trick:** Use two pointers. Move the first pointer N steps ahead. Then move both pointers together. When the first reaches the end, the second is at the Nth node from end.

```javascript
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  // Move fast pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both until fast reaches the end
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // slow is now just before the node to remove
  slow.next = slow.next.next; // Skip the target node

  return dummy.next;
}

// Test
const list = createList([1, 2, 3, 4, 5]);
console.log(printList(removeNthFromEnd(list, 2))); // 1 → 2 → 3 → 5
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

## Trees

---

### Q36. Find Maximum Depth of a Binary Tree ⭐ Frequently Asked

**What does this question mean?**

Count how many levels deep the tree goes. The height/depth is the number of edges (or nodes) from the root to the deepest leaf.

**Real-life analogy:** A family tree. How many generations down does it go?

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Recursive DFS — elegant
function maxDepth(root) {
  if (root === null) return 0; // Empty tree = 0 depth

  const leftDepth = maxDepth(root.left);   // Depth of left subtree
  const rightDepth = maxDepth(root.right); // Depth of right subtree

  return 1 + Math.max(leftDepth, rightDepth); // Current node + deeper child
}

// Iterative BFS — using a queue
function maxDepthBFS(root) {
  if (!root) return 0;

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length; // Process one level at a time

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}

// Build tree:  3
//             / \
//            9  20
//               / \
//              15   7
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(maxDepth(root));    // 3
console.log(maxDepthBFS(root)); // 3
```

**Time complexity:** O(n) — visit every node
**Space complexity:** O(h) where h = height of tree

---

### Q37. Level Order Traversal of a Binary Tree (BFS) ⭐ Frequently Asked

**What does this question mean?**

Visit all nodes level by level, left to right — like reading a pyramid row by row.

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root]; // Start with the root

  while (queue.length > 0) {
    const levelSize = queue.length; // How many nodes on this level?
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // Take from front
      currentLevel.push(node.val);

      // Add children for the next level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// Using the same tree from Q36
console.log(levelOrder(root));
// [[3], [9, 20], [15, 7]]
// Level 0: [3]
// Level 1: [9, 20]
// Level 2: [15, 7]
```

**Time complexity:** O(n)
**Space complexity:** O(n) — queue holds up to one full level

---

### Q38. Check if a Binary Tree is Symmetric (Mirror Image)

**What does this question mean?**

A tree is symmetric if it looks the same on the left and right sides — like a mirror.

```javascript
function isSymmetric(root) {
  function isMirror(left, right) {
    if (!left && !right) return true;  // Both null — symmetric
    if (!left || !right) return false; // One null — not symmetric
    if (left.val !== right.val) return false; // Different values

    // Check outer and inner children
    return isMirror(left.left, right.right) &&
           isMirror(left.right, right.left);
  }

  return isMirror(root.left, root.right);
}

// Symmetric tree:    1
//                   / \
//                  2   2
//                 / \ / \
//                3  4 4  3
const symRoot = new TreeNode(1);
symRoot.left = new TreeNode(2);
symRoot.right = new TreeNode(2);
symRoot.left.left = new TreeNode(3);
symRoot.left.right = new TreeNode(4);
symRoot.right.left = new TreeNode(4);
symRoot.right.right = new TreeNode(3);

console.log(isSymmetric(symRoot)); // true
```

**Time complexity:** O(n)
**Space complexity:** O(h) recursion stack

---

### Q39. Lowest Common Ancestor (LCA) of a BST ⭐ Frequently Asked

**What does this question mean?**

In a Binary Search Tree (BST), find the lowest (deepest) node that is an ancestor of both given nodes.

**Real-life analogy:** In a family tree, find the closest common grandparent of two people.

```javascript
function lowestCommonAncestor(root, p, q) {
  // BST property: left < root < right
  if (p.val < root.val && q.val < root.val) {
    // Both values are on the LEFT — LCA must be in left subtree
    return lowestCommonAncestor(root.left, p, q);
  }

  if (p.val > root.val && q.val > root.val) {
    // Both values are on the RIGHT — LCA must be in right subtree
    return lowestCommonAncestor(root.right, p, q);
  }

  // One is left, one is right (or one equals root) — THIS is the LCA
  return root;
}

// BST:        6
//            / \
//           2   8
//          / \ / \
//         0  4 7  9
//           / \
//          3   5

const bstRoot = new TreeNode(6);
bstRoot.left = new TreeNode(2);
bstRoot.right = new TreeNode(8);
bstRoot.left.left = new TreeNode(0);
bstRoot.left.right = new TreeNode(4);
bstRoot.left.right.left = new TreeNode(3);
bstRoot.left.right.right = new TreeNode(5);

const p = bstRoot.left;        // node 2
const q = bstRoot.left.right;  // node 4

console.log(lowestCommonAncestor(bstRoot, p, q).val); // 2
```

**Time complexity:** O(h) where h = height of BST
**Space complexity:** O(h) — recursion stack

---

### Q40. Validate Whether a Binary Tree is a Valid BST

**What does this question mean?**

In a valid BST: left child < parent < right child (at every level, not just immediate children).

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true; // Empty tree is valid

  if (root.val <= min || root.val >= max) {
    return false; // Violates BST property
  }

  // Left subtree: all values must be < root.val (new max = root.val)
  // Right subtree: all values must be > root.val (new min = root.val)
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}

// Valid BST
const validBST = new TreeNode(5);
validBST.left = new TreeNode(3);
validBST.right = new TreeNode(7);
validBST.left.left = new TreeNode(1);
validBST.left.right = new TreeNode(4);
console.log(isValidBST(validBST)); // true

// Invalid BST (right child 4 < root 5, but it's on the right side of 3)
const invalidBST = new TreeNode(5);
invalidBST.left = new TreeNode(3);
invalidBST.right = new TreeNode(4); // 4 < 5 — invalid for right child!
console.log(isValidBST(invalidBST)); // false
```

**Time complexity:** O(n)
**Space complexity:** O(h) recursion stack

---

## Dynamic Programming

---

### Q41. Fibonacci Sequence — Iterative, Recursive, Memoized ⭐ Frequently Asked

**What does this question mean?**

Fibonacci: each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21...

**Real-life analogy:** A staircase problem — how many ways to go up if you can take 1 or 2 steps? That's actually Fibonacci!

```javascript
// Method 1: Recursive — elegant but SLOW (exponential time)
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2); // Calls itself twice!
}
// Problem: fib(40) makes 2^40 = BILLIONS of calls!

// Method 2: Memoized — recursive with memory
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n]; // Already calculated? Return it!
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo); // Save result
  return memo[n];
}

// Method 3: Iterative (Bottom-Up DP) — best approach
function fibIterative(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

console.log(fibIterative(0));  // 0
console.log(fibIterative(1));  // 1
console.log(fibIterative(10)); // 55
console.log(fibIterative(20)); // 6765
console.log(fibMemo(50));      // 12586269025 (fast!)
```

| Method | Time | Space |
|---|---|---|
| Recursive | O(2^n) | O(n) |
| Memoized | O(n) | O(n) |
| Iterative | O(n) | O(1) |

---

### Q42. Climbing Stairs ⭐ Frequently Asked

**What does this question mean?**

You're climbing stairs. Each time you can take 1 or 2 steps. How many distinct ways can you reach the top with N stairs?

**Real-life analogy:** How many ways to climb a ladder if you can move up 1 rung or 2 rungs at a time?

```javascript
// Observation: ways(n) = ways(n-1) + ways(n-2) — it's Fibonacci!
// ways(1) = 1: {1}
// ways(2) = 2: {1+1, 2}
// ways(3) = 3: {1+1+1, 1+2, 2+1}
// ways(4) = 5: {1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2}

function climbStairs(n) {
  if (n <= 2) return n;

  let oneStepBefore = 2; // ways to reach stair n-1
  let twoStepsBefore = 1; // ways to reach stair n-2

  for (let i = 3; i <= n; i++) {
    const current = oneStepBefore + twoStepsBefore;
    twoStepsBefore = oneStepBefore;
    oneStepBefore = current;
  }

  return oneStepBefore;
}

console.log(climbStairs(1)); // 1
console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(5)); // 8
console.log(climbStairs(10)); // 89
```

**Time complexity:** O(n)
**Space complexity:** O(1)

---

### Q43. Coin Change — Minimum Coins to Make Amount ⭐ Frequently Asked

**What does this question mean?**

Given coin denominations and a target amount, find the minimum number of coins needed. You have unlimited coins of each denomination.

**Real-life analogy:** You need to give back ₹11 as change. You have coins of ₹1, ₹5, ₹6. Minimum coins = 2 (₹5 + ₹6).

```javascript
function coinChange(coins, amount) {
  // dp[i] = minimum coins needed to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins needed to make amount 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        // Can we use this coin?
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
        // 1 (this coin) + however many coins needed for the remainder
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]; // -1 if impossible
}

console.log(coinChange([1, 5, 6, 9], 11)); // 2 → [5, 6]
console.log(coinChange([2], 3));           // -1 → impossible
console.log(coinChange([1, 2, 5], 11));    // 3 → [5, 5, 1]
```

**Time complexity:** O(amount × number of coins)
**Space complexity:** O(amount)

---

### Q44. Longest Common Subsequence (LCS) of Two Strings

**What does this question mean?**

Find the longest sequence of characters that appears in both strings in the same order (not necessarily contiguous).

**Real-life analogy:** "ABCDEF" and "ACDF" — the common subsequence is "ACDF" (length 4).

```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  // dp[i][j] = LCS length for text1[0..i-1] and text2[0..j-1]
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // Characters match — extend the LCS
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        // No match — take best from ignoring one character from either string
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

console.log(longestCommonSubsequence("abcde", "ace")); // 3 → "ace"
console.log(longestCommonSubsequence("abc", "abc"));   // 3
console.log(longestCommonSubsequence("abc", "def"));   // 0
```

**Time complexity:** O(m × n)
**Space complexity:** O(m × n)

---

### Q45. 0/1 Knapsack — Maximize Value with Given Weight Capacity

**What does this question mean?**

You have a bag with limited weight capacity. Items have weights and values. Pick items to maximize total value without exceeding capacity. Each item can only be picked once (0/1 — either take it or leave it).

**Real-life analogy:** Packing a suitcase for a trip. Each item has a weight and usefulness. Maximize usefulness without overloading.

```javascript
function knapsack(weights, values, capacity) {
  const n = weights.length;
  // dp[i][w] = max value using first i items with capacity w
  const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Option 1: Don't take item i
      dp[i][w] = dp[i - 1][w];

      // Option 2: Take item i (if it fits)
      if (weights[i - 1] <= w) {
        const valueWithItem = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        dp[i][w] = Math.max(dp[i][w], valueWithItem);
      }
    }
  }

  return dp[n][capacity];
}

// Items: [laptop, phone, book, tablet]
const weights = [3, 1, 2, 4];
const values  = [4, 3, 3, 5]; // Usefulness scores
const capacity = 5;

console.log(knapsack(weights, values, capacity)); // 7 → take phone(1kg,3) + book(2kg,3) + part of laptop
```

**Time complexity:** O(n × capacity)
**Space complexity:** O(n × capacity)

---

## Logic & Design

---

### Q46. FizzBuzz with Twist — Return as Array, Skip Multiples of 7 ⭐ Frequently Asked

**What does this question mean?**

The classic FizzBuzz but return results as an array and SKIP numbers divisible by 7.

```javascript
function fizzBuzz(n) {
  const result = [];

  for (let i = 1; i <= n; i++) {
    // Skip multiples of 7
    if (i % 7 === 0) continue;

    if (i % 15 === 0) {         // Divisible by both 3 and 5
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {   // Divisible by 3
      result.push("Fizz");
    } else if (i % 5 === 0) {   // Divisible by 5
      result.push("Buzz");
    } else {
      result.push(String(i));
    }
  }

  return result;
}

console.log(fizzBuzz(20));
// ["1","2","Fizz","4","Buzz","Fizz","8","9","Buzz","11","Fizz","13","Buzz","FizzBuzz","16","17","Fizz","19","Buzz"]
// Note: 7 and 14 are skipped

// Variation: Check multiples of 3 before checking 15 (common mistake — always check combined first!)
```

**Time complexity:** O(n)
**Space complexity:** O(n)

---

### Q47. Flatten a Nested Array to Any Depth ⭐ Frequently Asked

**What does this question mean?**

Convert a deeply nested array like `[1,[2,[3,[4]]]]` into a flat `[1,2,3,4]`.

```javascript
// Method 1: Recursion — clear and readable
function flattenRecursive(arr) {
  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      return result.concat(flattenRecursive(item)); // Flatten nested
    }
    return result.concat(item); // Add non-array item
  }, []);
}

// Method 2: Stack-based — iterative
function flattenStack(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item); // Unpack and push back
    } else {
      result.unshift(item); // Add to front of result
    }
  }
  return result;
}

// Method 3: Generator — advanced
function* flattenGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item); // Delegate to nested
    } else {
      yield item;
    }
  }
}

// Test all
const nested = [1, [2, [3, [4, [5]]]]];
console.log(flattenRecursive(nested)); // [1,2,3,4,5]
console.log(flattenStack(nested));     // [1,2,3,4,5]
console.log([...flattenGenerator(nested)]); // [1,2,3,4,5]

// With depth limit
function flattenDepth(arr, depth = 1) {
  if (depth === 0) return arr.slice();
  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flattenDepth(item, depth - 1));
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

console.log(flattenDepth([1,[2,[3]]], 1)); // [1,2,[3]] — only one level
console.log(flattenDepth([1,[2,[3]]], 2)); // [1,2,3]
```

**Time complexity:** O(n)
**Space complexity:** O(n)

---

### Q48. Implement a Custom Promise.all from Scratch ⭐ Frequently Asked

**What does this question mean?**

`Promise.all` takes an array of promises and waits for ALL of them to finish. If any one fails, the entire thing fails.

**Real-life analogy:** A flight that waits for ALL passengers to board before departing. One late passenger = everyone waits. If someone is denied boarding = flight cancelled.

```javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Handle empty array
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length); // Store results in order
    let completedCount = 0;

    promises.forEach((promise, index) => {
      // Wrap in Promise.resolve to handle non-promise values too
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;    // Store result at correct position
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results); // All done!
          }
        })
        .catch(error => {
          reject(error); // Any failure → reject everything
        });
    });
  });
}

// Test
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(values => {
  console.log(values); // [1, 2, 3] — in order!
});

// Test rejection
myPromiseAll([p1, Promise.reject("Error!"), p3])
  .catch(err => console.log("Failed:", err)); // "Failed: Error!"

// Bonus: Implement Promise.allSettled
function myPromiseAllSettled(promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p)
        .then(value => ({ status: "fulfilled", value }))
        .catch(reason => ({ status: "rejected", reason }))
    )
  );
}
```

**Time complexity:** O(n) + time of slowest promise
**Space complexity:** O(n)

---

### Q49. Implement an Event Emitter Class ⭐ Frequently Asked

**What does this question mean?**

An Event Emitter lets different parts of your code communicate. You can subscribe to events (`on`) and fire them (`emit`), and unsubscribe (`off`). It's like a pub/sub system.

**Real-life analogy:** A radio station. Many listeners (subscribers) tune in to a frequency (event). When the station broadcasts (emit), all listeners hear it. A listener can turn off their radio (off).

```javascript
class EventEmitter {
  constructor() {
    this.events = {}; // { eventName: [callback1, callback2, ...] }
  }

  // Subscribe to an event
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; // Create the event's listener list
    }
    this.events[event].push(callback);
    return this; // Allow chaining: emitter.on(...).on(...)
  }

  // Fire an event — call all subscribers
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
    return this;
  }

  // Unsubscribe a specific callback
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
    return this;
  }

  // Subscribe only ONCE — auto-removes after first call
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper); // Remove after first call
    };
    this.on(event, wrapper);
    return this;
  }
}

// Test it
const emitter = new EventEmitter();

const greet = (name) => console.log(`Hello, ${name}!`);
const shout = (name) => console.log(`HEY ${name.toUpperCase()}!`);

emitter.on("greet", greet);
emitter.on("greet", shout);

emitter.emit("greet", "Ravi");
// Hello, Ravi!
// HEY RAVI!

emitter.off("greet", shout);
emitter.emit("greet", "Priya");
// Hello, Priya! (shout is removed)

// once() example
emitter.once("login", (user) => console.log(`${user} logged in!`));
emitter.emit("login", "Admin"); // "Admin logged in!"
emitter.emit("login", "Admin"); // Nothing — already removed
```

---

### Q50. Design and Implement an LRU Cache ⭐ Frequently Asked

**What does this question mean?**

LRU = Least Recently Used. A cache with a size limit. When full, it removes the item that was used LEAST recently to make space for a new one.

**Real-life analogy:** Your browser's recently visited tabs. When all tab slots are full, the tab you opened longest ago and haven't visited since gets closed first.

**Data structure:** HashMap (for O(1) lookup) + Doubly Linked List (for O(1) insertion/deletion of least recently used)

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Map maintains insertion order in JavaScript!
    // We'll use Map's ordering as our LRU tracking (newest at end)
  }

  get(key) {
    if (!this.cache.has(key)) return -1; // Not in cache

    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Remove old position
    } else if (this.cache.size >= this.capacity) {
      // Cache full — remove LRU (first item in Map = oldest)
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }

    this.cache.set(key, value); // Add/update at end (most recent)
  }

  // Bonus: see what's in the cache
  display() {
    console.log("Cache:", [...this.cache.entries()]);
  }
}

// Test
const lru = new LRUCache(3);

lru.put(1, "One");
lru.put(2, "Two");
lru.put(3, "Three");
lru.display(); // [1,2,3] → 3 is most recent

lru.get(1);    // Access 1 → 1 becomes most recent
lru.display(); // [2,3,1] → 1 is now most recent

lru.put(4, "Four"); // Cache full! Remove LRU (2 — oldest)
lru.display(); // [3,1,4] → 2 was removed

console.log(lru.get(2)); // -1 → 2 was evicted!
console.log(lru.get(3)); // "Three" → still in cache
```

**Time complexity:** O(1) for both get and put
**Space complexity:** O(capacity)

---

## Quick Revision Cheat Sheet

| # | Question | Algorithm Pattern | Difficulty |
|---|---|---|---|
| 1 | Two Sum | HashMap | Easy |
| 2 | Maximum Subarray | Kadane's / DP | Easy |
| 3 | Move Zeros | Two Pointers | Easy |
| 4 | Missing Number | Math Formula / XOR | Easy |
| 5 | Rotate Array | Reversal Trick | Easy |
| 6 | Find Duplicates | HashMap / Set | Easy |
| 7 | Merge Sorted Arrays | Two Pointers | Medium |
| 8 | Majority Element | Boyer-Moore Voting | Easy |
| 9 | Best Stock Profit | Greedy / Sliding Window | Easy |
| 10 | Container With Most Water | Two Pointers | Medium |
| 11 | Merge Intervals | Sorting + Greedy | Medium |
| 12 | Product Except Self | Prefix Products | Medium |
| 13 | Reverse String | Two Pointers | Easy |
| 14 | Palindrome Check | Two Pointers | Easy |
| 15 | Anagram Check | HashMap | Easy |
| 16 | Longest Substring | Sliding Window | Medium |
| 17 | Count and Say | Simulation | Medium |
| 18 | All Permutations | Backtracking | Medium |
| 19 | Longest Common Prefix | String Comparison | Easy |
| 20 | Valid Parentheses | Stack | Easy |
| 21 | Roman to Integer | HashMap | Easy |
| 22 | Find Substring Index | Sliding Window | Medium |
| 23 | Flatten Object | Recursion | Medium |
| 24 | Deep Clone Object | Recursion | Medium |
| 25 | Group By Key | HashMap / Reduce | Easy |
| 26 | Memoize Function | Closure + HashMap | Medium |
| 27 | Deep Equality | Recursion | Medium |
| 28 | Debounce & Throttle | Closure + Timer | Medium |
| 29 | Flat Array to Tree | HashMap + Recursion | Hard |
| 30 | Curry Function | Closure | Medium |
| 31 | Reverse Linked List | Pointer Manipulation | Easy |
| 32 | Detect Cycle | Floyd's Two Pointers | Easy |
| 33 | Find Middle Node | Fast/Slow Pointer | Easy |
| 34 | Merge Sorted Lists | Two Pointers | Easy |
| 35 | Remove Nth from End | Two Pointers | Medium |
| 36 | Max Tree Depth | DFS Recursion | Easy |
| 37 | Level Order Traversal | BFS + Queue | Medium |
| 38 | Symmetric Tree | DFS Recursion | Medium |
| 39 | Lowest Common Ancestor | BST Property | Medium |
| 40 | Validate BST | DFS + Min/Max | Medium |
| 41 | Fibonacci | DP / Memoization | Easy |
| 42 | Climbing Stairs | DP (Fibonacci pattern) | Easy |
| 43 | Coin Change | DP (Bottom-Up) | Medium |
| 44 | Longest Common Subseq | 2D DP | Medium |
| 45 | 0/1 Knapsack | 2D DP | Medium |
| 46 | FizzBuzz with Twist | Loop / Modulo | Easy |
| 47 | Flatten Nested Array | Recursion / Stack | Easy |
| 48 | Custom Promise.all | Async / Promises | Hard |
| 49 | Event Emitter | OOP / Pub-Sub | Medium |
| 50 | LRU Cache | HashMap + Map order | Hard |

---

## Key Algorithm Patterns Summary

**Two Pointers** — Use when searching pairs, reversing, or removing elements in sorted arrays/strings. Start from both ends and move inward.

**Sliding Window** — Use for contiguous subarray/substring problems. Maintain a window and expand/shrink it as needed.

**HashMap** — Use when you need O(1) lookup. Track frequency, check existence, or store index positions.

**Recursion / DFS** — Use for tree traversal, nested structures, and problems that break into smaller identical subproblems.

**BFS + Queue** — Use for level-by-level tree traversal or shortest path in an unweighted graph.

**Dynamic Programming** — Use when a problem has overlapping subproblems and optimal substructure. Build solutions from smaller ones.

**Fast/Slow Pointer** — Use to find middle of list, detect cycles, or find Nth element from end.

---

*Good luck with your Deloitte USI interview! Practice each question until you can code it from memory. 🚀*