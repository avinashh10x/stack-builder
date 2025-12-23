import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const num = 3;
    const maxOffset = 80; // max px offset from initial position

    const positions: { x: number; y: number }[] = Array.from(
      { length: num },
      () => ({ x: 0, y: 0 })
    );
    const velocities: { x: number; y: number }[] = Array.from(
      { length: num },
      () => ({ x: (Math.random() - 0.5) * 0.8, y: (Math.random() - 0.5) * 0.8 })
    );

    const initPositions = () => {
      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        // reset transform so getBoundingClientRect is stable
        el.style.transform = `translate(0px, 0px)`;
        positions[i] = { x: 0, y: 0 };
        velocities[i] = {
          x: (Math.random() - 0.5) * 0.8,
          y: (Math.random() - 0.5) * 0.8,
        };
      });
    };

    let raf = 0;

    function step() {
      blobRefs.current.forEach((el, i) => {
        if (!el) return;

        // small random acceleration
        velocities[i].x += (Math.random() - 0.5) * 0.06;
        velocities[i].y += (Math.random() - 0.5) * 0.06;

        // clamp velocity
        velocities[i].x = Math.max(-3, Math.min(3, velocities[i].x));
        velocities[i].y = Math.max(-3, Math.min(3, velocities[i].y));

        positions[i].x += velocities[i].x;
        positions[i].y += velocities[i].y;

        // bounce within bounds
        if (positions[i].x > maxOffset) {
          positions[i].x = maxOffset;
          velocities[i].x *= -0.8;
        }
        if (positions[i].x < -maxOffset) {
          positions[i].x = -maxOffset;
          velocities[i].x *= -0.8;
        }
        if (positions[i].y > maxOffset) {
          positions[i].y = maxOffset;
          velocities[i].y *= -0.8;
        }
        if (positions[i].y < -maxOffset) {
          positions[i].y = -maxOffset;
          velocities[i].y *= -0.8;
        }

        // apply transform
        el.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
      });

      raf = requestAnimationFrame(step);
    }

    initPositions();
    raf = requestAnimationFrame(step);

    const onResize = () => initPositions();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden h-screen border-b border-border">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-subtle" />

      <div ref={containerRef} className="absolute inset-0" />

      {/* moving decorative blobs */}
      <div
        ref={(el) => (blobRefs.current[0] = el)}
        className="absolute top-20 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        style={{ willChange: "transform" }}
      />

      <div
        ref={(el) => (blobRefs.current[1] = el)}
        className="absolute top-1/3 right-1/3 w-72 h-72 bg-secondary/50 rounded-full blur-xl"
        style={{ willChange: "transform" }}
      />

      <div
        ref={(el) => (blobRefs.current[2] = el)}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        style={{ willChange: "transform" }}
      />

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
