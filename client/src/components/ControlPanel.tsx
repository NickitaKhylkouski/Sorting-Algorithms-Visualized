import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Shuffle, Play, Pause } from "lucide-react";
import type { AlgorithmType } from "../pages/SortingVisualizer";

interface ControlPanelProps {
  selectedAlgorithm: AlgorithmType;
  onAlgorithmChange: (algo: AlgorithmType) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onShuffle: () => void;
  onStart: () => void;
  onStep: () => void;
  isRunning: boolean;
  isEducationalMode: boolean;
  onToggleEducationalMode: () => void;
}

export function ControlPanel({
  selectedAlgorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  onShuffle,
  onStart,
  isRunning,
}: ControlPanelProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Algorithm</label>
          <Select
            value={selectedAlgorithm}
            onValueChange={(value) => onAlgorithmChange(value as AlgorithmType)}
            disabled={isRunning}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble">Bubble Sort</SelectItem>
              <SelectItem value="quick">Quick Sort</SelectItem>
              <SelectItem value="merge">Merge Sort</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Array Size</label>
          <Slider
            min={10}
            max={100}
            step={1}
            value={[arraySize]}
            onValueChange={([value]) => onArraySizeChange(value)}
            disabled={isRunning}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Speed</label>
          <Slider
            min={1}
            max={100}
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
            disabled={isRunning}
          />
        </div>

        <div className="flex items-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onShuffle}
            disabled={isRunning}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleEducationalMode}
              disabled={isRunning}
            >
              {isEducationalMode ? "🎓" : "▶️"}
            </Button>
            {isEducationalMode ? (
              <Button
                className="flex-1"
                onClick={onStep}
                disabled={isRunning}
              >
                Next Step
              </Button>
            ) : (
              <Button
                className="flex-1"
                onClick={onStart}
                disabled={isRunning}
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRunning ? "Running..." : "Start"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
