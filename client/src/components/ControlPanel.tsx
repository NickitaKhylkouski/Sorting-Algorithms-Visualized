import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Shuffle, Play, Pause } from "lucide-react";
import type { AlgorithmType } from "../pages/SortingVisualizer";
import { useSoundStore } from "../lib/sounds";

interface ControlPanelProps {
  selectedAlgorithm: AlgorithmType;
  onAlgorithmChange: (algo: AlgorithmType) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onShuffle: () => void;
  onStart: () => void;
  onStop: () => void;
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
  onStop,
  onStep,
  isRunning,
  isEducationalMode,
  onToggleEducationalMode,
}: ControlPanelProps) {
  const soundStore = useSoundStore();

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Controls</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={soundStore.toggleMute}
          >
            {soundStore.muted ? "🔇" : "🔊"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <SelectItem value="insertion">Insertion Sort</SelectItem>
                <SelectItem value="selection">Selection Sort</SelectItem>
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
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onShuffle}
            disabled={isRunning}
          >
            <Shuffle className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={onToggleEducationalMode}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isEducationalMode ? (
              <>
                <span className="text-lg">🎓</span>
                <span className="hidden sm:inline">Educational Mode</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">Auto Mode</span>
              </>
            )}
          </Button>

          <div className="flex-1" />

          <div className="flex gap-2">
            {isEducationalMode ? (
              <Button
                onClick={onStep}
                disabled={isRunning}
                variant="default"
                className="gap-2"
              >
                <span className="text-lg">👉</span>
                Next Step
              </Button>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={onStart}
                    disabled={isRunning}
                    variant="default"
                    className="gap-2"
                  >
                    {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isRunning ? "Running..." : "Start Sorting"}
                  </Button>
                  {isRunning && (
                    <Button
                      variant="destructive"
                      onClick={onStop}
                      className="whitespace-nowrap"
                    >
                      Stop Sorting
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
