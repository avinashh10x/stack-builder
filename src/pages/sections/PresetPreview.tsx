import { PresetCard } from "@/components/PresetCard";
import { Button } from "@/components/ui/button";
import { presets } from "@/data/toolsData";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function PresetPreview() {
  return (
    <section className="py-20 border-t border-border bg-muted/30">
      <div className=" mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Popular Presets
            </h2>
            <p className="text-muted-foreground">
              Start with proven stack combinations.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/presets">
              View All Presets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.slice(0, 3).map((preset, index) => (
            <div
              key={preset.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PresetCard preset={preset} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PresetPreview;
