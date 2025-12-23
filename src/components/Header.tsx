import { Link, useLocation } from "react-router-dom";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className=" flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-transparent text-primary-foreground shadow-glow transition-all group-hover:shadow-glow-lg">
            <Package className="h-5 w-5 text-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Stacky</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/create-stack"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive("/create-stack")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            Create Stack
          </Link>
          <Link
            to="/presets"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive("/presets")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            Presets
          </Link>
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-muted/50"
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
          <div className="p-3 flex flex-col gap-2">
            <Link
              to="/create-stack"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/create-stack")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              Create Stack
            </Link>
            <Link
              to="/presets"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/presets")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              Presets
            </Link>
            <div className="pt-2 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
