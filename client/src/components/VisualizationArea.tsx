import { useMemo, useEffect, useState } from "react";
import { type ArrayElement } from "../lib/types";
import type { AlgorithmType } from "../pages/SortingVisualizer";

interface VisualizationAreaProps {
  array: ArrayElement[];
  algorithm: AlgorithmType;
  isRunning: boolean;
}

export function VisualizationArea({ array, algorithm, isRunning }: VisualizationAreaProps) {
  const maxValue = useMemo(() => Math.max(...array.map(el => el.value)), [array]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning) {
      // Reset progress when starting
      setProgress(0);
      
      // Update progress every 100ms
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          // Increment based on algorithm type
          const increment = algorithm === 'bubble' || algorithm === 'insertion' || algorithm === 'selection'
            ? 2  // Slower for O(n²) algorithms
            : 4; // Faster for O(n log n) algorithms
            
          const nextProgress = Math.min(prevProgress + increment, 100);
          
          // Clear interval when we reach 100%
          if (nextProgress >= 100) {
            clearInterval(intervalId);
          }
          
          return nextProgress;
        });
      }, 100);
      
      // Cleanup function
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    } else {
      // Reset progress when stopping
      setProgress(0);
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [isRunning, algorithm]); // Only re-run effect when these dependencies change

  return (
    <div className="aspect-video rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-200" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {array.map((element, index) => {
          const barWidth = 100 / array.length;
          const barHeight = (element.value / maxValue) * 90;
          const x = index * barWidth;
          
          let fillColor;
          let shadow = "";
          switch (element.state) {
            case "comparing":
              fillColor = "fill-destructive/90";
              shadow = "drop-shadow(0 0 4px rgb(239 68 68 / 0.5))";
              break;
            case "sorted":
              fillColor = "fill-green-500/90";
              shadow = "drop-shadow(0 0 2px rgb(34 197 94 / 0.3))";
              break;
            case "pivot":
              fillColor = "fill-blue-500/90";
              shadow = "drop-shadow(0 0 4px rgb(59 130 246 / 0.5))";
              break;
            default:
              fillColor = "fill-primary/80";
          }
          const className = `transition-all duration-300 ease-in-out hover:brightness-110 ${fillColor} ${shadow}`;
          
          return (
            <rect
              key={index}
              x={`${x}%`}
              y={`${100 - barHeight}%`}
              width={`${barWidth * 0.9}%`}
              height={`${barHeight}%`}
              className={className}
            />
          );
        })}
      </svg>
    </div>
  );
}
