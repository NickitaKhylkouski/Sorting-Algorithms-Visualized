export type ElementState = "default" | "comparing" | "sorted" | "pivot";

export interface ArrayElement {
  value: number;
  state: ElementState;
}

export interface AnimationFrame {
  array: ArrayElement[];
  step: {
    description: string;
    codeLineNumber: number;
  };
}
