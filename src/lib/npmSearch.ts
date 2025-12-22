import { SearchResult } from '@/components/SearchResults';
import { tools, categories } from '@/data/toolsData';

interface NpmPackage {
  name: string;
  description?: string;
  version?: string;
  keywords?: string[];
  links?: {
    npm?: string;
    homepage?: string;
    repository?: string;
  };
}

interface NpmSearchResponse {
  objects: Array<{
    package: NpmPackage;
    score?: {
      final?: number;
      detail?: {
        quality?: number;
        popularity?: number;
        maintenance?: number;
      };
    };
    downloads?: {
      weekly?: number;
    };
  }>;
  total: number;
}

// Search local curated tools
export function searchLocalTools(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  return tools
    .filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery)
    )
    .map((tool) => ({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      installCommand: tool.installCommand,
      docsUrl: tool.docsUrl,
      isLocal: true,
    }));
}

// Determine category from package keywords/name
function inferCategory(pkg: NpmPackage): string {
  const text = `${pkg.name} ${pkg.description || ''} ${(pkg.keywords || []).join(' ')}`.toLowerCase();
  
  if (text.includes('react') || text.includes('vue') || text.includes('angular') || text.includes('framework')) {
    return 'frameworks';
  }
  if (text.includes('ui') || text.includes('component') || text.includes('css') || text.includes('style')) {
    return 'ui';
  }
  if (text.includes('state') || text.includes('redux') || text.includes('store')) {
    return 'state';
  }
  if (text.includes('animation') || text.includes('motion') || text.includes('animate')) {
    return 'animation';
  }
  if (text.includes('auth') || text.includes('login') || text.includes('session')) {
    return 'auth';
  }
  if (text.includes('lint') || text.includes('test') || text.includes('debug') || text.includes('dev')) {
    return 'devtools';
  }
  return 'utilities';
}

// Search npm registry
export async function searchNpm(
  query: string,
  signal?: AbortSignal
): Promise<SearchResult[]> {
  if (query.length < 2) return [];

  try {
    const response = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=20`,
      { signal }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from npm registry');
    }

    const data: NpmSearchResponse = await response.json();

    return data.objects.map((obj) => ({
      name: obj.package.name,
      description: obj.package.description || 'No description available',
      version: obj.package.version,
      downloads: obj.downloads?.weekly,
      category: inferCategory(obj.package),
      installCommand: `npm install ${obj.package.name}`,
      docsUrl: obj.package.links?.homepage || obj.package.links?.npm || `https://www.npmjs.com/package/${obj.package.name}`,
      isLocal: false,
    }));
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return [];
    }
    console.error('npm search error:', error);
    return [];
  }
}

// Combined search: local tools first, then npm
export async function combinedSearch(
  query: string,
  signal?: AbortSignal
): Promise<SearchResult[]> {
  const localResults = searchLocalTools(query);
  
  // Get npm results
  const npmResults = await searchNpm(query, signal);
  
  // Filter out npm results that match local tools (by name)
  const localNames = new Set(localResults.map((r) => r.name.toLowerCase()));
  const filteredNpmResults = npmResults.filter(
    (r) => !localNames.has(r.name.toLowerCase())
  );

  return [...localResults, ...filteredNpmResults];
}
