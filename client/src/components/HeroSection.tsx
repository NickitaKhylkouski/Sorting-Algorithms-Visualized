import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-24">
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
  );
}
