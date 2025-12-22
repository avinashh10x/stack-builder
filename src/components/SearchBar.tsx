import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/debounce';
import { Tool, useBasketStore } from '@/store/basketStore';
import { tools } from '@/data/toolsData';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

interface SearchResult {
  name: string;
  description: string;
  version?: string;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { addTool } = useBasketStore();

  // Search local tools and simulate npm search
  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Search local tools first
    const localResults = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Add some mock npm results for demo
    const mockNpmResults: SearchResult[] = [
      { name: `${searchQuery}-utils`, description: `Utility library for ${searchQuery}`, version: '1.0.0' },
      { name: `react-${searchQuery}`, description: `React bindings for ${searchQuery}`, version: '2.3.1' },
    ];

    setTimeout(() => {
      setResults([
        ...localResults.map((t) => ({ name: t.name, description: t.description })),
        ...mockNpmResults,
      ]);
      setIsSearching(false);
    }, 300);
  };

  // Trigger search when debounced query changes
  useState(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    }
  });

  const handleSelectResult = (result: SearchResult) => {
    const existingTool = tools.find(
      (t) => t.name.toLowerCase() === result.name.toLowerCase()
    );

    if (existingTool) {
      addTool(existingTool);
    } else {
      // Create a custom tool entry
      const customTool: Tool = {
        id: result.name.toLowerCase().replace(/\s+/g, '-'),
        name: result.name,
        description: result.description,
        category: 'utilities',
        installCommand: `npm install ${result.name.toLowerCase().replace(/\s+/g, '-')}`,
        docsUrl: `https://www.npmjs.com/package/${result.name.toLowerCase().replace(/\s+/g, '-')}`,
      };
      addTool(customTool);
    }

    setQuery('');
    setShowResults(false);
    setResults([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search npm packages..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
            onSearch?.(e.target.value);
            handleSearch(e.target.value);
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="pl-10 pr-10 h-11 bg-background border-border focus:border-primary focus:ring-primary"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg overflow-hidden z-50">
          <div className="max-h-64 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelectResult(result)}
                className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border/50 last:border-0"
              >
                <div className="font-medium text-foreground">{result.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">
                  {result.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
