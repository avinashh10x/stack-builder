import React from "react";
import { CategoryList } from "@/components/CategoryList";

type Props = {
  leftWidth: number;
  onStartResize: (e: React.PointerEvent) => void;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
};

export const LeftSidebar: React.FC<Props> = ({
  leftWidth,
  onStartResize,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <aside
      className="hidden lg:block fixed left-0 top-[64px] bottom-0 border-r border-border bg-card overflow-y-auto z-10"
      style={{ width: leftWidth }}
    >
      <div className="p-4">
        <CategoryList
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        onPointerDown={onStartResize}
        className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 transition-colors"
      />
    </aside>
  );
};

export default LeftSidebar;
