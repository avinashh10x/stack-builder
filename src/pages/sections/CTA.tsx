import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Ready to Build Faster?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Stop wasting time on setup. Start building what matters.
        </p>
        <Button
          asChild
          size="lg"
          className="h-12 px-8 rounded-xl shadow-glow hover:shadow-glow-lg transition-all"
        >
          <Link to="/create-stack">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default CTA;
