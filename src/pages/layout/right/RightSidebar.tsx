import React from "react";
import { Basket } from "@/components/Basket";
import { OutputPanel } from "@/components/OutputPanel";
import { ShoppingCart, X } from "lucide-react";

type Props = {
  rightRef: React.RefObject<HTMLDivElement>;
  rightWidth: number;
  rightTopPct: number;
  onStartResizeRight: (e: React.PointerEvent) => void;
  onStartResizeVertical: (e: React.PointerEvent) => void;
  mobileRightOpen: boolean;
  setMobileRightOpen: (v: boolean) => void;
  mobileRightTab: "stack" | "commands";
  setMobileRightTab: (t: "stack" | "commands") => void;
};

export const RightSidebar: React.FC<Props> = ({
  rightRef,
  rightWidth,
  rightTopPct,
  onStartResizeRight,
  onStartResizeVertical,
  mobileRightOpen,
  setMobileRightOpen,
  mobileRightTab,
  setMobileRightTab,
}) => {
  return (
    <>
      <aside
        ref={rightRef}
        className="hidden md:flex fixed right-0 top-[64px] bottom-0 border-l border-border bg-card flex-col z-10"
        style={{ width: rightWidth }}
      >
        <div
          role="separator"
          aria-orientation="vertical"
          onPointerDown={onStartResizeRight}
          className="absolute top-0 left-0 bottom-0 w-1 -ml-1 cursor-col-resize hover:bg-primary/50 transition-colors z-20"
          style={{ backgroundClip: "padding-box" }}
        />

        <div
          className="overflow-hidden relative"
          style={{ height: `${rightTopPct}%` }}
        >
          <Basket />
        </div>

        <div
          onPointerDown={onStartResizeVertical}
          className="h-1 cursor-row-resize hover:bg-primary/50 transition-colors flex-shrink-0"
        />

        <div
          className="overflow-auto flex-1"
          style={{ height: `${100 - rightTopPct}%` }}
        >
          <OutputPanel />
        </div>
      </aside>

      <button
        className="md:hidden fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-glow flex items-center justify-center"
        aria-label="Open panel"
        onClick={() => setMobileRightOpen(true)}
      >
        <ShoppingCart className="w-5 h-5" />
      </button>

      {mobileRightOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex-1" onClick={() => setMobileRightOpen(false)} />
          <div className="w-4/5 max-w-xs bg-card border-l border-border h-full shadow-lg overflow-auto">
            <div className="p-3 flex items-center justify-between border-b border-border">
              <h3 className="text-sm font-semibold">Your Stack</h3>
              <button
                onClick={() => setMobileRightOpen(false)}
                aria-label="Close"
                className="p-1 rounded hover:bg-muted/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 flex gap-2">
              <button
                className={`px-3 py-1 rounded ${
                  mobileRightTab === "stack"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }`}
                onClick={() => setMobileRightTab("stack")}
              >
                Stack
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  mobileRightTab === "commands"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }`}
                onClick={() => setMobileRightTab("commands")}
              >
                Commands
              </button>
            </div>

            <div className="p-3">
              {mobileRightTab === "stack" ? (
                <div className="space-y-2">
                  <Basket />
                </div>
              ) : (
                <OutputPanel />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
