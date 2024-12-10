import { type AnimationFrame, type ArrayElement } from "../types";

export function mergeSort(arr: ArrayElement[]): AnimationFrame[] {
  const animations: AnimationFrame[] = [];
  const array: ArrayElement[] = arr.map(el => ({ ...el, state: "default" }));
  
  function merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
      array[k].state = "comparing";
      if (k > 0) array[k - 1].state = "default";
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: `Comparing elements from left and right subarrays`,
          codeLineNumber: 3
        }
      });
      
      if (L[i].value <= R[j].value) {
        array[k] = { ...L[i], state: "comparing" };
        i++;
      } else {
        array[k] = { ...R[j], state: "comparing" };
        j++;
      }
      k++;
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: "Placing smaller element in sorted position",
          codeLineNumber: 3
        }
      });
    }
    
    while (i < n1) {
      array[k] = { ...L[i], state: "comparing" };
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: "Copying remaining elements from left subarray",
          codeLineNumber: 4
        }
      });
      i++;
      k++;
    }
    
    while (j < n2) {
      array[k] = { ...R[j], state: "comparing" };
      animations.push({ 
        array: array.map(el => ({ ...el })),
        step: {
          description: "Copying remaining elements from right subarray",
          codeLineNumber: 4
        }
      });
      j++;
      k++;
    }
    
    // Mark the merged section as sorted
    for (let m = left; m <= right; m++) {
      array[m].state = "sorted";
    }
    animations.push({ 
      array: array.map(el => ({ ...el })),
      step: {
        description: "Merging complete for current section",
        codeLineNumber: 5
      }
    });
  }
  
  function mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor(left + (right - left) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }
  
  mergeSortHelper(0, array.length - 1);
  
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
