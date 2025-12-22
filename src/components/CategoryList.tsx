import * as LucideIcons from 'lucide-react';
import { categories } from '@/data/toolsData';

interface CategoryListProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryList({ activeCategory, onCategoryChange }: CategoryListProps) {
  return (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Categories
        </h2>
      </div>
      {categories.map((category) => {
        const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
        const isActive = activeCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {IconComponent && <IconComponent className="h-4 w-4 shrink-0" />}
            <span className="truncate">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
