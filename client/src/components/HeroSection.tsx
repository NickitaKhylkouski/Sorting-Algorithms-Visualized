import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import { HeroVisualizer } from "./HeroVisualizer";

export function HeroSection() {
  return (
    <div className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
        <div className="absolute inset-0">
          <HeroVisualizer />
        </div>
      </div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent">
            Learn Sorting Algorithms Visually
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Experience how different sorting techniques work through interactive animations.
            Understand the mechanics behind popular algorithms with step-by-step visualization.
          </p>
          <Link href="/visualizer">
            <Button size="lg" className="rounded-full font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
