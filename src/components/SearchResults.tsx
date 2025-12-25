import {
  Package,
  Plus,
  Check,
  ExternalLink,
  Download,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBasketStore, Tool } from "@/store/basketStore";
import { toast } from "sonner";
import { categories } from "@/data/toolsData";

export interface SearchResult {
  name: string;
  description: string;
  version?: string;
  downloads?: number;
  category?: string;
  installCommand: string;
  docsUrl?: string;
  isLocal?: boolean;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
  onClose: () => void;
}

export function SearchResults({
  results,
  query,
  isLoading,
  onClose,
}: SearchResultsProps) {
  const { addTool, hasTool } = useBasketStore();

  const handleAddToStack = (result: SearchResult) => {
    const toolId = result.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    if (hasTool(toolId)) {
      toast.info(`${result.name} is already in your stack`);
      return;
    }

    const tool: Tool = {
      id: toolId,
      name: result.name,
      description: result.description,
      category: result.category || "utilities",
      installCommand: result.installCommand,
      docsUrl: result.docsUrl || `https://www.npmjs.com/package/${result.name}`,
    };

    addTool(tool);
    toast.success(`${result.name} added to stack!`, {
      description: result.installCommand,
    });
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "Utilities";
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Utilities";
  };

  const formatDownloads = (downloads?: number) => {
    if (!downloads) return null;
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`;
    return downloads.toString();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="p-3 ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Search Results for "{query}"
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Searching..." : `${results.length} packages found`}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Back to Categories
          </Button>
        </div>
      </div>

      <div className="px-4">
        <div className="h-px bg-border/60 my-3" />
      </div>
      {/* Results */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Searching packages...</p>
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-1">
              No packages found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try a different search term
            </p>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-3 grid md:grid-cols-2 gap-3">
            {results.map((result, index) => {
              const toolId = result.name
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-");
              const isInStack = hasTool(toolId);

              return (
                <div
                  key={`${result.name}-${index}`}
                  className="group border border-border rounded-lg p-3 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {result.name}
                        </h3>
                        {result.isLocal && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            Curated
                          </span>
                        )}
                      </div>
                      {result.version && (
                        <span className="text-xs text-muted-foreground">
                          v{result.version}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant={isInStack ? "secondary" : "default"}
                      onClick={() => handleAddToStack(result)}
                      disabled={isInStack}
                      className="shrink-0"
                    >
                      {isInStack ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {result.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded-md">
                      {getCategoryName(result.category)}
                    </span>
                    {result.downloads && (
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {formatDownloads(result.downloads)}
                      </span>
                    )}
                    {result.docsUrl && (
                      <a
                        href={result.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Docs
                      </a>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-border">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground block truncate">
                      {result.installCommand}
                    </code>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
