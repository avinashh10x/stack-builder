import { useNavigate } from 'react-router-dom';
import { presets } from '@/data/toolsData';
import { tools } from '@/data/toolsData';
import { useBasketStore } from '@/store/basketStore';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PresetCardProps {
  preset: typeof presets[0];
  showAction?: boolean;
}

export function PresetCard({ preset, showAction = true }: PresetCardProps) {
  const navigate = useNavigate();
  const { applyPreset } = useBasketStore();

  const handleApplyPreset = () => {
    applyPreset(preset, tools);
    navigate('/create-stack');
  };

  const presetTools = tools.filter((t) => preset.tools.includes(t.id));

  return (
    <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{preset.icon}</div>
        {showAction && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleApplyPreset}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Use Preset
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{preset.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{preset.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {presetTools.slice(0, 5).map((tool) => (
          <span
            key={tool.id}
            className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-md"
          >
            {tool.name}
          </span>
        ))}
        {presetTools.length > 8 && (
          <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md">
            +{presetTools.length - 8} more
          </span>
        )}
      </div>
    </div>
  );
}
