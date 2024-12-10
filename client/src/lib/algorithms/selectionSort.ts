import { type AnimationFrame, type ArrayElement } from "../types";

export function selectionSort(arr: ArrayElement[]): AnimationFrame[] {
  const animations: AnimationFrame[] = [];
  const array: ArrayElement[] = arr.map(el => ({ ...el, state: "default" }));
  
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    array[i].state = "pivot";
    
    animations.push({ 
      array: array.map(el => ({ ...el })),
      step: {
        description: `Finding minimum element in unsorted portion`,
        codeLineNumber: 1
      }
    });
    
    for (let j = i + 1; j < array.length; j++) {
      array[j].state = "comparing";
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: `Comparing ${array[j].value} with current minimum ${array[minIdx].value}`,
          codeLineNumber: 2
        }
      });
      
      if (array[j].value < array[minIdx].value) {
        if (minIdx !== i) {
          array[minIdx].state = "default";
        }
        minIdx = j;
        array[minIdx].state = "pivot";
      } else {
        array[j].state = "default";
      }
    }
    
    if (minIdx !== i) {
      const temp = array[i].value;
      array[i].value = array[minIdx].value;
      array[minIdx].value = temp;
      array[minIdx].state = "default";
    }
    
    array[i].state = "sorted";
    animations.push({ 
      array: array.map(el => ({ ...el })),
      step: {
        description: `Placing ${array[i].value} in its correct position`,
        codeLineNumber: 3
      }
    });
  }
  
  // Mark the last element as sorted
  array[array.length - 1].state = "sorted";
  animations.push({ 
    array: array.map(el => ({ ...el })),
    step: {
      description: "Sorting complete",
      codeLineNumber: 4
    }
  });
  
  return animations;
}
