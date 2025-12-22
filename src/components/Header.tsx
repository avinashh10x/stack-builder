import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-primary text-primary-foreground shadow-glow transition-all group-hover:shadow-glow-lg">
            <Package className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Beenzod
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/create-stack"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/create-stack')
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            Create Stack
          </Link>
          <Link
            to="/presets"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/presets')
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            Presets
          </Link>
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
