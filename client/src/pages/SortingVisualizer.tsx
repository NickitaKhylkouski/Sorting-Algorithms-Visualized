import { Navigation } from "../components/Navigation";
import { ControlPanel } from "../components/ControlPanel";
import { VisualizationArea } from "../components/VisualizationArea";
import { ExplanationPanel } from "../components/ExplanationPanel";
import { useState, useCallback } from "react";
import { AnimationEngine } from "../lib/AnimationEngine";

export type AlgorithmType = "bubble" | "quick" | "merge";

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

export default function SortingVisualizer() {
  const [array, setArray] = useState(() => generateRandomArray(50));
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>("bubble");
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [animationEngine] = useState(() => new AnimationEngine());

  const handleStart = useCallback(() => {
    setIsRunning(true);
    animationEngine.start(array, selectedAlgorithm, speed, setArray, () => {
      setIsRunning(false);
    });
  }, [array, selectedAlgorithm, speed, animationEngine]);

  const handleShuffle = useCallback(() => {
    if (isRunning) return;
    setArray(generateRandomArray(array.length));
  }, [array.length, isRunning]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto grid gap-6 p-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <ControlPanel
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={setSelectedAlgorithm}
            arraySize={array.length}
            onArraySizeChange={(size) => setArray(generateRandomArray(size))}
            speed={speed}
            onSpeedChange={setSpeed}
            onShuffle={handleShuffle}
            onStart={handleStart}
            isRunning={isRunning}
          />
          <VisualizationArea array={array} />
        </div>
        <ExplanationPanel algorithm={selectedAlgorithm} />
      </div>
    </div>
  );
}
