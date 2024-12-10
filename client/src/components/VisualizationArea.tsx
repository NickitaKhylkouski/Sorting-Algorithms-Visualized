import { useMemo } from "react";

interface VisualizationAreaProps {
  array: number[];
}

export function VisualizationArea({ array }: VisualizationAreaProps) {
  const maxValue = useMemo(() => Math.max(...array), [array]);
  
  return (
    <div className="aspect-video rounded-lg border bg-card p-6 shadow-sm">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {array.map((value, index) => {
          const barWidth = 100 / array.length;
          const barHeight = (value / maxValue) * 90;
          const x = index * barWidth;
          
          return (
            <rect
              key={index}
              x={`${x}%`}
              y={`${100 - barHeight}%`}
              width={`${barWidth * 0.9}%`}
              height={`${barHeight}%`}
              className="fill-primary transition-all duration-200"
            />
          );
        })}
      </svg>
    </div>
  );
}
