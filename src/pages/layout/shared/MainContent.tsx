import React from "react";
import { ToolCard } from "@/components/ToolCard";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults, SearchResult } from "@/components/SearchResults";
import { tools, categories } from "@/data/toolsData";

type Props = {
  isLg: boolean;
  isMd: boolean;
  leftWidth: number;
  rightWidth: number;
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  searchMode: boolean;
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  onSearchSubmit: (q: string, results: SearchResult[]) => void;
  onCloseSearch: () => void;
};

export const MainContent: React.FC<Props> = ({
  isLg,
  isMd,
  leftWidth,
  rightWidth,
  activeCategory,
  setActiveCategory,
  searchMode,
  searchQuery,
  searchResults,
  isSearching,
  onSearchSubmit,
  onCloseSearch,
}) => {
  const filteredTools = tools.filter((t) => t.category === activeCategory);
  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{
        marginLeft: isLg ? leftWidth : 0,
        marginRight: isMd ? rightWidth : 0,
      }}
    >
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border">
          <SearchBar onSearchSubmit={onSearchSubmit} />
        </div>

        {searchMode ? (
          <SearchResults
            results={searchResults}
            query={searchQuery}
            isLoading={isSearching}
            onClose={onCloseSearch}
          />
        ) : (
          <>
            <div className="lg:hidden px-4 py-3 border-b border-border overflow-x-auto">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">
                {activeCategoryData?.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {activeCategoryData?.description}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredTools.map((tool, i) => (
                  <div
                    key={tool.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No tools in this category yet.
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MainContent;
