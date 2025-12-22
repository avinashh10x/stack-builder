import { Header } from '@/components/Header';
import { PresetCard } from '@/components/PresetCard';
import { presets } from '@/data/toolsData';

const Presets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stack Presets
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              One-click starter stacks curated for common use cases. Pick one and start building immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {presets.map((preset, index) => (
              <div
                key={preset.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PresetCard preset={preset} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Presets;
