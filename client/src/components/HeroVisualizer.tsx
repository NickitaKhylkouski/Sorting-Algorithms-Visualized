import { useEffect, useState, useMemo, useCallback } from "react";
import { type ArrayElement } from "../lib/types";
import { bubbleSort } from "../lib/algorithms/bubbleSort";

function generateRandomArray(size: number): ArrayElement[] {
  return Array.from(
    { length: size },
    () => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: "default"
    })
  );
}

export function HeroVisualizer() {
  const [array, setArray] = useState<ArrayElement[]>(() => generateRandomArray(10));
  const [currentFrame, setCurrentFrame] = useState(0);
  
  const animations = useMemo(() => {
    return bubbleSort(array);
  }, [array]);
  
  const resetAnimation = useCallback(() => {
    setArray(generateRandomArray(10));
    setCurrentFrame(0);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const intervalId = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= animations.length - 1) {
          timeoutId = window.setTimeout(resetAnimation, 1000);
          return prev;
        }
        setArray(animations[prev].array);
        return prev + 1;
      });
    }, 500); // Slower animation for better visibility in the background

    return () => {
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [animations, resetAnimation]);

  const maxValue = useMemo(() => Math.max(...array.map(el => el.value)), [array]);
  
  return (
    <div className="h-full w-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full opacity-30"
      >
        {array.map((element, index) => {
          const barWidth = 100 / array.length;
          const barHeight = (element.value / maxValue) * 90;
          const x = index * barWidth;
          
          let fillColor;
          switch (element.state) {
            case "comparing":
              fillColor = "fill-destructive/90";
              break;
            case "sorted":
              fillColor = "fill-green-500/90";
              break;
            default:
              fillColor = "fill-primary/80";
          }
          
          return (
            <rect
              key={index}
              x={`${x}%`}
              y={`${100 - barHeight}%`}
              width={`${barWidth * 0.9}%`}
              height={`${barHeight}%`}
              className={`transition-all duration-300 ease-in-out ${fillColor}`}
            />
          );
        })}
      </svg>
    </div>
  );
}
