import { type AnimationFrame, type ArrayElement } from "../types";

export function insertionSort(arr: ArrayElement[]): AnimationFrame[] {
  const animations: AnimationFrame[] = [];
  const array: ArrayElement[] = arr.map(el => ({ ...el, state: "default" }));
  
  for (let i = 1; i < array.length; i++) {
    const key = array[i].value;
    array[i].state = "pivot";
    animations.push({ 
      array: array.map(el => ({ ...el })),
      step: {
        description: `Current element: ${key}`,
        codeLineNumber: 1
      }
    });
    
    let j = i - 1;
    array[i].state = "comparing";
    
    while (j >= 0 && array[j].value > key) {
      array[j].state = "comparing";
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: `Comparing ${array[j].value} with ${key}`,
          codeLineNumber: 2
        }
      });
      
      array[j + 1].value = array[j].value;
      array[j].state = "default";
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: `Moving ${array[j].value} one position ahead`,
          codeLineNumber: 3
        }
      });
      
      j--;
    }
    
    array[j + 1].value = key;
    array[j + 1].state = "sorted";
    animations.push({ 
      array: array.map(el => ({ ...el })),
      step: {
        description: `Placing ${key} in its correct position`,
        codeLineNumber: 4
      }
    });
  }
  
  // Mark all elements as sorted at the end
  array.forEach(el => el.state = "sorted");
  animations.push({ 
    array: array.map(el => ({ ...el })),
    step: {
      description: "Sorting complete",
      codeLineNumber: 5
    }
  });
  
  return animations;
}
