import { useEffect, useState, useMemo } from "react";
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
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  
  const animations = useMemo(() => {
    const initialArray = generateRandomArray(10);
    return bubbleSort(initialArray);
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= animations.length - 1) {
          // Reset animation when it completes
          setTimeout(() => {
            setArray(generateRandomArray(10));
            setCurrentFrame(0);
          }, 1000);
          return prev;
        }
        setArray(animations[prev].array);
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, [animations]);

  const maxValue = useMemo(() => Math.max(...array.map(el => el.value)), [array]);
  
  return (
    <div className="h-48 w-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="opacity-50"
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
