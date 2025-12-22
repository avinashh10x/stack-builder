import { Plus, Check, ExternalLink } from 'lucide-react';
import { Tool, useBasketStore } from '@/store/basketStore';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { addTool, removeTool, hasTool } = useBasketStore();
  const isInBasket = hasTool(tool.id);

  const handleToggle = () => {
    if (isInBasket) {
      removeTool(tool.id);
    } else {
      addTool(tool);
    }
  };

  return (
    <div
      className={`group relative p-4 rounded-xl border transition-all duration-200 ${
        isInBasket
          ? 'border-primary/50 bg-accent shadow-glow'
          : 'border-border bg-card hover:border-primary/30 hover:shadow-card'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{tool.name}</h3>
            <a
              href={tool.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {tool.description}
          </p>
        </div>
        <Button
          size="icon"
          variant={isInBasket ? 'default' : 'outline'}
          className={`shrink-0 h-8 w-8 rounded-lg transition-all ${
            isInBasket
              ? 'bg-primary text-primary-foreground shadow-glow hover:bg-primary/90'
              : 'hover:border-primary hover:text-primary'
          }`}
          onClick={handleToggle}
        >
          {isInBasket ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border/50">
        <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
          {tool.installCommand.split(' ').slice(0, 3).join(' ')}...
        </code>
      </div>
    </div>
  );
}
