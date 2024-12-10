import { type AnimationFrame, type ArrayElement } from "../types";

export function quickSort(arr: ArrayElement[]): AnimationFrame[] {
  const animations: AnimationFrame[] = [];
  const array: ArrayElement[] = arr.map(el => ({ ...el, state: "default" }));
  
  function partition(low: number, high: number): number {
    array[high].state = "pivot";
    animations.push({ 
      array: array.map(el => ({ ...el })),
      step: {
        description: `Setting pivot element ${array[high].value} at position ${high}`,
        codeLineNumber: 1
      }
    });
    
    const pivot = array[high].value;
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      array[j].state = "comparing";
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: `Comparing element ${array[j].value} with pivot ${pivot}`,
          codeLineNumber: 2
        }
      });
      
      if (array[j].value < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        animations.push({ 
          array: array.map(el => ({ ...el })),
          step: {
            description: `Swapping elements ${array[i].value} and ${array[j].value}`,
            codeLineNumber: 2
          }
        });
      }
      
      array[j].state = "default";
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    array[i + 1].state = "sorted";
    animations.push({ 
      array: array.map(el => ({ ...el })),
      step: {
        description: `Placing pivot ${array[i + 1].value} in its final position`,
        codeLineNumber: 3
      }
    });
    
    return i + 1;
  }
  
  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }
  
  quickSortHelper(0, array.length - 1);
  
  // Mark all elements as sorted at the end
  array.forEach(el => el.state = "sorted");
  animations.push({ 
    array: array.map(el => ({ ...el })),
    step: {
      description: "Sorting complete",
      codeLineNumber: 4
    }
  });
  
  return animations;
}
