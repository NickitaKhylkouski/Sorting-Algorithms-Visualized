import { type AnimationFrame, type ArrayElement } from "../types";

export function bubbleSort(arr: ArrayElement[]): AnimationFrame[] {
  const animations: AnimationFrame[] = [];
  const n = arr.length;
  const array: ArrayElement[] = arr.map(el => ({ ...el, state: "default" }));
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      array[j].state = "comparing";
      array[j + 1].state = "comparing";
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: `Comparing elements at positions ${j} and ${j + 1}`,
          codeLineNumber: 2
        }
      });
      
      if (array[j].value > array[j + 1].value) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        animations.push({ 
          array: array.map(el => ({ ...el })),
          step: {
            description: `Swapping ${array[j].value} and ${array[j + 1].value} since ${array[j].value} > ${array[j + 1].value}`,
            codeLineNumber: 3
          }
        });
      }
      
      // After comparison, mark elements as sorted if they are in final position
      if (j === n - i - 2) {
        array[j + 1].state = "sorted";
      } else {
        // Reset only if not being marked as sorted
        array[j].state = "default";
        array[j + 1].state = "default";
      }

      // Push the current state to animations
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: "Moving to next pair of elements",
          codeLineNumber: 2
        }
      });
    }
  }
  
  // Mark the first element as sorted
  array[0].state = "sorted";
  animations.push({ 
    array: array.map(el => ({ ...el })),
    step: {
      description: "Sorting complete",
      codeLineNumber: 4
    }
  });
  
  return animations;
}
