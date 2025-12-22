import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useBasketStore } from '@/store/basketStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Basket() {
  const { tools, removeTool, clearBasket } = useBasketStore();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Your Stack</h2>
          {tools.length > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {tools.length}
            </span>
          )}
        </div>
        {tools.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearBasket}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {tools.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Your stack is empty</h3>
          <p className="text-sm text-muted-foreground">
            Add tools from the left to build your stack
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="group flex items-center justify-between p-3 bg-accent/50 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">
                    {tool.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {tool.category}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={() => removeTool(tool.id)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
