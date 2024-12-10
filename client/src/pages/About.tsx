import { Navigation } from "../components/Navigation";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

const algorithmDescriptions = [
  {
    name: "Bubble Sort",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    bestFor: "Small datasets, nearly sorted arrays",
    advantages: [
      "Simple to understand and implement",
      "Requires no additional memory space",
      "Stable sorting algorithm"
    ],
    disadvantages: [
      "Poor performance on large datasets",
      "Not suitable for large collections",
      "Higher number of swaps compared to other algorithms"
    ]
  },
  {
    name: "Quick Sort",
    description: "A divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    bestFor: "Large datasets, general-purpose sorting",
    advantages: [
      "Very efficient for large datasets",
      "Can be faster than merge sort",
      "In-place sorting possible"
    ],
    disadvantages: [
      "Unstable sorting algorithm",
      "Poor performance on already sorted arrays",
      "Recursive nature can lead to stack overflow"
    ]
  },
  {
    name: "Merge Sort",
    description: "A divide-and-conquer algorithm that recursively breaks down a problem into smaller, more manageable subproblems until they become simple enough to solve directly.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    bestFor: "Large datasets, stable sorting requirements",
    advantages: [
      "Consistent performance",
      "Stable sorting algorithm",
      "Parallel processing possible"
    ],
    disadvantages: [
      "Requires additional memory space",
      "Slower for small datasets",
      "More complex implementation"
    ]
  },
  {
    name: "Insertion Sort",
    description: "Builds the final sorted array one item at a time by repeatedly inserting a new element into a sorted portion of the array.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    bestFor: "Small datasets, nearly sorted arrays",
    advantages: [
      "Simple implementation",
      "Efficient for small data sets",
      "Adaptive algorithm"
    ],
    disadvantages: [
      "Poor performance on large datasets",
      "Many element shifts needed",
      "Not suitable for large collections"
    ]
  },
  {
    name: "Selection Sort",
    description: "Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    bestFor: "Small datasets, minimizing memory writes",
    advantages: [
      "Simple implementation",
      "Minimal memory usage",
      "Performs well on small lists"
    ],
    disadvantages: [
      "Poor performance on large datasets",
      "Not stable by default",
      "Always performs the same number of comparisons"
    ]
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">About Sorting Algorithms</h1>
            <p className="text-lg text-muted-foreground">
              Understanding different sorting algorithms and their characteristics
            </p>
          </div>
          
          <div className="grid gap-6">
            {algorithmDescriptions.map((algo) => (
              <Card key={algo.name} className="p-6">
                <h2 className="text-2xl font-bold mb-4">{algo.name}</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{algo.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <h3 className="font-semibold mb-2">Time Complexity</h3>
                      <p className="text-sm text-muted-foreground">{algo.timeComplexity}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Space Complexity</h3>
                      <p className="text-sm text-muted-foreground">{algo.spaceComplexity}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Best Used For</h3>
                    <p className="text-sm text-muted-foreground">{algo.bestFor}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-green-600">Advantages</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {algo.advantages.map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 text-red-600">Disadvantages</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {algo.disadvantages.map((dis, i) => (
                          <li key={i}>{dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center py-8">
            <Link href="/visualizer">
              <a className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-primary rounded-md hover:bg-primary/90">
                Try the Visualizer
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
