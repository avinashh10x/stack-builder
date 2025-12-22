import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Loader2, Plus, Check, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/debounce';
import { Tool, useBasketStore } from '@/store/basketStore';
import { searchLocalTools, combinedSearch } from '@/lib/npmSearch';
import { SearchResult } from '@/components/SearchResults';
import { toast } from 'sonner';
import { categories } from '@/data/toolsData';

interface SearchBarProps {
  onSearchSubmit?: (query: string, results: SearchResult[]) => void;
}

export function SearchBar({ onSearchSubmit }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);
  const { addTool, hasTool } = useBasketStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsSearching(true);

    // Start with local results immediately
    const localResults = searchLocalTools(debouncedQuery);
    setSuggestions(localResults.slice(0, 8));

    // Then fetch npm results
    combinedSearch(debouncedQuery, controller.signal)
      .then((results) => {
        if (!controller.signal.aborted) {
          setSuggestions(results.slice(0, 8));
          setIsSearching(false);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return 'Utilities';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Utilities';
  };

  const handleAddToStack = useCallback((result: SearchResult) => {
    const toolId = result.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    if (hasTool(toolId)) {
      toast.info(`${result.name} is already in your stack`);
      return;
    }

    const tool: Tool = {
      id: toolId,
      name: result.name,
      description: result.description,
      category: result.category || 'utilities',
      installCommand: result.installCommand,
      docsUrl: result.docsUrl || `https://www.npmjs.com/package/${result.name}`,
    };

    addTool(tool);
    toast.success(`${result.name} added to stack!`, {
      description: result.installCommand,
    });

    // Clear search
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  }, [addTool, hasTool]);

  const handleSearch = useCallback(async () => {
    if (query.length < 2) return;

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      const results = await combinedSearch(query);
      onSearchSubmit?.(query, results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [query, onSearchSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleAddToStack(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search npm packages... (Press Enter for full results)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Delay to allow click on suggestion
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 h-11 bg-background border-border focus:border-primary focus:ring-primary"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto">
            {suggestions.map((result, index) => {
              const toolId = result.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
              const isInStack = hasTool(toolId);

              return (
                <button
                  key={`${result.name}-${index}`}
                  onClick={() => handleAddToStack(result)}
                  className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border/50 last:border-0 flex items-start gap-3 ${
                    selectedIndex === index ? 'bg-accent' : ''
                  }`}
                >
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {result.name}
                      </span>
                      {result.isLocal && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded">
                          Curated
                        </span>
                      )}
                      {result.version && (
                        <span className="text-xs text-muted-foreground">
                          v{result.version}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {result.description}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                        {getCategoryName(result.category)}
                      </span>
                      <code className="text-xs text-muted-foreground font-mono truncate">
                        {result.installCommand}
                      </code>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {isInStack ? (
                      <span className="flex items-center gap-1 text-xs text-primary">
                        <Check className="h-3.5 w-3.5" />
                        Added
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary">
                        <Plus className="h-3.5 w-3.5" />
                        Add
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {query.length >= 2 && (
            <button
              onClick={handleSearch}
              className="w-full px-4 py-3 text-sm font-medium text-primary hover:bg-accent transition-colors border-t border-border flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              View all results for "{query}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
