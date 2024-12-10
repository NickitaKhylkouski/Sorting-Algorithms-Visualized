export function mergeSort(arr: number[]): number[][] {
  const animations: number[][] = [];
  const array = [...arr];
  
  function merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      k++;
      animations.push([...array]);
    }
    
    while (i < n1) {
      array[k] = L[i];
      i++;
      k++;
      animations.push([...array]);
    }
    
    while (j < n2) {
      array[k] = R[j];
      j++;
      k++;
      animations.push([...array]);
    }
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
  return animations;
}
