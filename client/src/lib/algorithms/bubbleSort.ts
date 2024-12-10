export function bubbleSort(arr: number[]): number[][] {
  const animations: number[][] = [];
  const n = arr.length;
  const array = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        animations.push([...array]);
      }
    }
  }
  
  return animations;
}
