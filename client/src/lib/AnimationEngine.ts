import { bubbleSort } from "./algorithms/bubbleSort";
import { quickSort } from "./algorithms/quickSort";
import { mergeSort } from "./algorithms/mergeSort";
import type { AlgorithmType } from "../pages/SortingVisualizer";

export class AnimationEngine {
  private animations: number[][] = [];
  private currentFrame = 0;
  private animationId: number | null = null;
  
  start(
    array: number[],
    algorithm: AlgorithmType,
    speed: number,
    onFrame: (array: number[]) => void,
    onComplete: () => void
  ) {
    this.stop();
    this.currentFrame = 0;
    
    switch (algorithm) {
      case "bubble":
        this.animations = bubbleSort(array);
        break;
      case "quick":
        this.animations = quickSort(array);
        break;
      case "merge":
        this.animations = mergeSort(array);
        break;
    }
    
    const animate = () => {
      if (this.currentFrame >= this.animations.length) {
        this.stop();
        onComplete();
        return;
      }
      
      onFrame(this.animations[this.currentFrame]);
      this.currentFrame++;
      
      this.animationId = window.setTimeout(
        animate,
        Math.max(1, 1000 - speed * 10)
      );
    };
    
    animate();
  }
  
  stop() {
    if (this.animationId !== null) {
      window.clearTimeout(this.animationId);
      this.animationId = null;
    }
  }
}
