import type { AlgorithmType } from "../pages/SortingVisualizer";
import { Card } from "@/components/ui/card";

interface ExplanationPanelProps {
  algorithm: AlgorithmType;
  currentStep?: {
    description: string;
    codeLineNumber: number;
  };
}

const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    complexity: {
      time: "O(n²)",
      space: "O(1)",
    },
    pseudocode: `for i = 0 to n-1
  for j = 0 to n-i-1
    if arr[j] > arr[j+1]
      swap arr[j], arr[j+1]`,
  },
  quick: {
    name: "Quick Sort",
    description: "An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements.",
    complexity: {
      time: "O(n log n)",
      space: "O(log n)",
    },
    pseudocode: `quickSort(arr, low, high):
  if low < high
    pivot = partition(arr, low, high)
    quickSort(arr, low, pivot-1)
    quickSort(arr, pivot+1, high)`,
  },
  merge: {
    name: "Merge Sort",
    description: "A divide-and-conquer algorithm that recursively breaks down a problem into smaller, more manageable subproblems until they become simple enough to solve directly.",
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
    },
    pseudocode: `mergeSort(arr):
  if length of arr <= 1
    return arr
  mid = length of arr / 2
  left = mergeSort(arr[0...mid])
  right = mergeSort(arr[mid...end])
  return merge(left, right)`,
  },
  insertion: {
    name: "Insertion Sort",
    description: "Builds the final sorted array one item at a time by repeatedly inserting a new element into a sorted portion of the array.",
    complexity: {
      time: "O(n²)",
      space: "O(1)",
    },
    pseudocode: `for i = 1 to n-1
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`,
  },
  selection: {
    name: "Selection Sort",
    description: "Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.",
    complexity: {
      time: "O(n²)",
      space: "O(1)",
    },
    pseudocode: `for i = 0 to n-1
  min_idx = i
  for j = i+1 to n
    if arr[j] < arr[min_idx]
      min_idx = j
  swap arr[i] with arr[min_idx]`,
  },
};

export function ExplanationPanel({ algorithm, currentStep }: ExplanationPanelProps) {
  const info = algorithmInfo[algorithm];

  return (
    <Card className="sticky top-6 p-6">
      <h2 className="mb-4 text-2xl font-bold">{info.name}</h2>
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-semibold">Description</h3>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
        
        <div>
          <h3 className="mb-2 font-semibold">Time Complexity</h3>
          <p className="text-sm text-muted-foreground">{info.complexity.time}</p>
        </div>
        
        <div>
          <h3 className="mb-2 font-semibold">Space Complexity</h3>
          <p className="text-sm text-muted-foreground">{info.complexity.space}</p>
        </div>
        
        <div>
          <h3 className="mb-2 font-semibold">Pseudocode</h3>
          <pre className="rounded-md bg-muted p-4 text-sm">
            <code>
              {info.pseudocode.split('\n').map((line: string, index: number) => (
                <div
                  key={index}
                  className={currentStep?.codeLineNumber === index ? "bg-primary/20" : ""}
                >
                  {line}
                </div>
              ))}
            </code>
          </pre>
          {currentStep && (
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Current Step</h3>
              <p className="text-sm text-muted-foreground">{currentStep.description}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
