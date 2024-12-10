export function quickSort(arr: number[]): number[][] {
  const animations: number[][] = [];
  const array = [...arr];
  
  function partition(low: number, high: number): number {
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        animations.push([...array]);
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    animations.push([...array]);
    
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
  return animations;
}
