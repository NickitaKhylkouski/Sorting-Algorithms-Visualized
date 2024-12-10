import { bubbleSort } from "./algorithms/bubbleSort";
import { quickSort } from "./algorithms/quickSort";
import { mergeSort } from "./algorithms/mergeSort";
import type { AlgorithmType } from "../pages/SortingVisualizer";
import type { AnimationFrame, ArrayElement } from "./types";
import { useSoundStore } from "./sounds";

export class AnimationEngine {
  private animations: AnimationFrame[] = [];
  private currentFrame = 0;
  private animationId: number | null = null;
  private isEducationalMode = false;

  getCurrentStep() {
    if (this.currentFrame < this.animations.length) {
      return this.animations[this.currentFrame].step;
    }
    return undefined;
  }
  
  setEducationalMode(mode: boolean) {
    this.isEducationalMode = mode;
  }

  step(onFrame: (array: ArrayElement[]) => void, onComplete: () => void) {
    if (this.currentFrame >= this.animations.length) {
      onComplete();
      return;
    }

    const frame = this.animations[this.currentFrame];
    const soundStore = useSoundStore.getState();
    
    // Play appropriate sound based on the operation
    if (frame.step?.description.includes("Comparing")) {
      soundStore.playCompare();
    } else if (frame.step?.description.includes("Swapping")) {
      soundStore.playSwap();
    }

    onFrame(frame.array);
    this.currentFrame++;
  }

  start(
    array: ArrayElement[],
    algorithm: AlgorithmType,
    speed: number,
    onFrame: (array: ArrayElement[]) => void,
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

    if (this.isEducationalMode) {
      // In educational mode, just show the first frame
      onFrame(this.animations[0].array);
      return;
    }
    
    const animate = () => {
      if (this.currentFrame >= this.animations.length) {
        this.stop();
        onComplete();
        return;
      }
      
      const frame = this.animations[this.currentFrame];
      const soundStore = useSoundStore.getState();
      
      // Play appropriate sound based on the operation
      if (frame.step?.description.includes("Comparing")) {
        soundStore.playCompare();
      } else if (frame.step?.description.includes("Swapping")) {
        soundStore.playSwap();
      }

      onFrame(frame.array);
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
