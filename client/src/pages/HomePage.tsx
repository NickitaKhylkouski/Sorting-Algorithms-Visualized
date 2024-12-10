import { HeroSection } from "../components/HeroSection";
import { Navigation } from "../components/Navigation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>Built with React and Shadcn UI. Learn more about sorting algorithms.</p>
        </div>
      </footer>
    </div>
  );
}
