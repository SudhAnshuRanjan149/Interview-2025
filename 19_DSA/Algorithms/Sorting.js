// Bubble Sort, Selection Sort, Insertion Sort, Quick Sort


// -----------------------------

let arr = [5, 2, 9, 1, 5, 6];

// Bubble Sort
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Time Complexity: O(n^2) in all cases (worst, average, best)
// Space Complexity: O(1) - in-place sorting algorithm

// 5, 2, 9, 1, 5, 6
// 1, 2, 5, 5, 6, 9
//          i
//       j


// ---------------------------------


// Selection Sort
function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap arr[i] and arr[minIndex]
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

// Time Complexity: O(n^2) in all cases (worst, average, best)
// Space Complexity: O(1) - in-place sorting algorithm


// 5, 2, 9, 1, 5, 6
// 5, 2, 9, 1, 5, 6
//          i
//       j


// ---------------------------------


// Insertion Sort
function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}



// Explain Insertion Sort:
// Insertion Sort builds the sorted array one item at a time. It takes each element from the input and finds the correct position for it in the already sorted part of the array. This is done by comparing the key element with the elements in the sorted part and shifting those elements to the right until the correct position for the key is found, where it is then inserted.

// Time Complexity: O(n^2) in worst and average cases, O(n) in best case (when the array is already sorted)
// Space Complexity: O(1) - in-place sorting algorithm


// ---------------------------------

console.log("Bubble Sort:", bubbleSort([...arr]));
console.log("Selection Sort:", selectionSort([...arr]));
console.log("Insertion Sort:", insertionSort([...arr]));

// ---------------------------------



// Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Time Complexity: O(n log n) on average and in the best case, O(n^2) in the worst case (when the smallest or largest element is always chosen as the pivot)
// Space Complexity: O(log n) on average and in the best case, O(n) in the worst case (due to recursive stack space)


// ---------------------------------

// console.log("Quick Sort:", quickSort([...arr]));
console.log("Quick Sort 2:", quickSort2([...arr]));