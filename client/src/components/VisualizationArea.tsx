import { useMemo } from "react";

import { type ArrayElement } from "../lib/types";

interface VisualizationAreaProps {
  array: ArrayElement[];
}

export function VisualizationArea({ array }: VisualizationAreaProps) {
  const maxValue = useMemo(() => Math.max(...array.map(el => el.value)), [array]);
  
  return (
    <div className="aspect-video rounded-lg border bg-card p-6 shadow-sm">
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
          
          let className = "transition-all duration-200 ";
          switch (element.state) {
            case "comparing":
              className += "fill-destructive";
              break;
            case "sorted":
              className += "fill-success";
              break;
            case "pivot":
              className += "fill-blue-500";
              break;
            default:
              className += "fill-primary";
          }
          
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
