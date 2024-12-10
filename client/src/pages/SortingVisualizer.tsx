import { Navigation } from "../components/Navigation";
import { ControlPanel } from "../components/ControlPanel";
import { VisualizationArea } from "../components/VisualizationArea";
import { ExplanationPanel } from "../components/ExplanationPanel";
import { useState, useCallback } from "react";
import { AnimationEngine } from "../lib/AnimationEngine";

export type AlgorithmType = "bubble" | "quick" | "merge" | "insertion" | "selection";

import { type ArrayElement } from "../lib/types";

function generateRandomArray(size: number): ArrayElement[] {
  return Array.from(
    { length: size },
    () => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: "default"
    })
  );
}

export default function SortingVisualizer() {
  const [array, setArray] = useState(() => generateRandomArray(50));
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>("bubble");
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [isEducationalMode, setIsEducationalMode] = useState(false);
  const [animationEngine] = useState(() => new AnimationEngine());

  const handleStart = useCallback(() => {
    if (isRunning) {
      animationEngine.stop();
      setIsRunning(false);
    } else {
      setIsRunning(true);
      animationEngine.start(array, selectedAlgorithm, speed, setArray, () => {
        setIsRunning(false);
      });
    }
  }, [array, selectedAlgorithm, speed, animationEngine, isRunning]);

  const handleStop = useCallback(() => {
    animationEngine.stop();
    setIsRunning(false);
  }, [animationEngine]);

  const handleStep = useCallback(() => {
    animationEngine.step(setArray, () => {
      setIsRunning(false);
    });
  }, [animationEngine]);

  const handleToggleEducationalMode = useCallback(() => {
    const newMode = !isEducationalMode;
    setIsEducationalMode(newMode);
    animationEngine.setEducationalMode(newMode);
    animationEngine.stop(); // Stop any running animation
    if (newMode) {
      // Reset and show initial state
      animationEngine.start(array, selectedAlgorithm, speed, setArray, () => {
        setIsRunning(false);
      });
    }
  }, [isEducationalMode, array, selectedAlgorithm, speed, animationEngine]);

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
            onStop={handleStop}
            onStep={handleStep}
            isRunning={isRunning}
            isEducationalMode={isEducationalMode}
            onToggleEducationalMode={handleToggleEducationalMode}
          />
          <VisualizationArea 
            array={array}
            algorithm={selectedAlgorithm}
            isRunning={isRunning}
          />
        </div>
        <ExplanationPanel 
          algorithm={selectedAlgorithm} 
          currentStep={animationEngine.getCurrentStep()}
        />
      </div>
    </div>
  );
}
