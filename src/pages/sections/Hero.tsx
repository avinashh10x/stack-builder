import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden h-screen border-b border-border">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-subtle" />
      <div className="absolute top-20 left-1/4 w-96 h-96  bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-10 md:py-32 h-full ">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8 animate-fade-in">
            <Zap className="h-4 w-4" />
            <span>Stop Googling, Start Building</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Your Tech Stack,{" "}
            <span className="text-gradient">One Click Away</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Select frameworks, libraries, and tools. Get unified install
            commands, setup instructions, and docs links instantly.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 rounded-xl shadow-glow hover:shadow-glow-lg transition-all"
            >
              <Link to="/create-stack">
                Create Your Stack
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-xl"
            >
              <Link to="/presets">Browse Presets</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
