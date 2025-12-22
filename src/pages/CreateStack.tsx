import React, { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import LeftSidebar from "@/pages/layout/left/LeftSidebar";
import RightSidebar from "@/pages/layout/right/RightSidebar";
import MainContent from "@/pages/layout/shared/MainContent";
import { tools, categories } from "@/data/toolsData";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

const LG_QUERY = "(min-width: 1024px)";
const MD_QUERY = "(min-width: 768px)";

export default function CreateStack() {
  const [activeCategory, setActiveCategory] = useState<string>("frameworks");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // responsive flags
  const [isLg, setIsLg] = useState<boolean>(
    () => window.matchMedia(LG_QUERY).matches
  );
  const [isMd, setIsMd] = useState<boolean>(
    () => window.matchMedia(MD_QUERY).matches
  );

  // sidebar sizes
  const [leftWidth, setLeftWidth] = useState<number>(224);
  const [rightWidth, setRightWidth] = useState<number>(320);

  // right vertical split (percentage)
  const [rightTopPct, setRightTopPct] = useState<number>(50);

  // mobile right panel
  const [mobileRightOpen, setMobileRightOpen] = useState(false);
  const [mobileRightTab, setMobileRightTab] = useState<"stack" | "commands">(
    "stack"
  );

  const rightRef = useRef<HTMLDivElement | null>(null);
  const activeResizeRef = useRef<null | "left" | "right" | "vertical">(null);
  const rafRef = useRef<number | null>(null);

  const filteredTools = tools.filter((t) => t.category === activeCategory);
  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  useEffect(() => {
    const lgM = window.matchMedia(LG_QUERY);
    const mdM = window.matchMedia(MD_QUERY);
    const onLg = () => setIsLg(lgM.matches);
    const onMd = () => setIsMd(mdM.matches);
    lgM.addEventListener("change", onLg);
    mdM.addEventListener("change", onMd);
    onLg();
    onMd();
    return () => {
      lgM.removeEventListener("change", onLg);
      mdM.removeEventListener("change", onMd);
    };
  }, []);

  // Pointer based resize handlers (supports touch + mouse)
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const active = activeResizeRef.current;
        if (!active) return;
        if (active === "left") {
          const x = e.clientX;
          setLeftWidth(clamp(x, 180, 400));
        } else if (active === "right") {
          const x = e.clientX;
          setRightWidth(clamp(window.innerWidth - x, 280, 600));
        } else if (active === "vertical") {
          const rect = rightRef.current?.getBoundingClientRect();
          if (!rect) return;
          const rel = e.clientY - rect.top;
          setRightTopPct(clamp((rel / rect.height) * 100, 20, 80));
        }
      });
    };

    const onPointerUp = () => {
      activeResizeRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startResize = (
    type: "left" | "right" | "vertical",
    e: React.PointerEvent
  ) => {
    e.preventDefault();
    activeResizeRef.current = type;
    document.body.style.cursor =
      type === "vertical" ? "row-resize" : "col-resize";
    document.body.style.userSelect = "none";
    (e.currentTarget as Element)?.setPointerCapture?.(e.pointerId);
  };

  const handleSearchSubmit = (q: string, results: SearchResult[]) => {
    setSearchQuery(q);
    setSearchResults(results);
    setSearchMode(true);
    setIsSearching(false);
  };

  const handleCloseSearch = () => {
    setSearchMode(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex overflow-hidden relative">
        <LeftSidebar
          leftWidth={leftWidth}
          onStartResize={(e) => startResize("left", e)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <MainContent
          isLg={isLg}
          isMd={isMd}
          leftWidth={leftWidth}
          rightWidth={rightWidth}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchMode={searchMode}
          searchQuery={searchQuery}
          searchResults={searchResults}
          isSearching={isSearching}
          onSearchSubmit={handleSearchSubmit}
          onCloseSearch={handleCloseSearch}
        />

        <RightSidebar
          rightRef={rightRef}
          rightWidth={rightWidth}
          rightTopPct={rightTopPct}
          onStartResizeRight={(e) => startResize("right", e)}
          onStartResizeVertical={(e) => startResize("vertical", e)}
          mobileRightOpen={mobileRightOpen}
          setMobileRightOpen={setMobileRightOpen}
          mobileRightTab={mobileRightTab}
          setMobileRightTab={setMobileRightTab}
        />
      </div>
    </div>
  );
}
