import { Link } from 'react-router-dom';
import { ArrowRight, Package, Zap, Layers, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { PresetCard } from '@/components/PresetCard';
import { presets } from '@/data/toolsData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8 animate-fade-in">
              <Zap className="h-4 w-4" />
              <span>Stop Googling, Start Building</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Your Tech Stack,{' '}
              <span className="text-gradient">One Click Away</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Select frameworks, libraries, and tools. Get unified install commands, setup instructions, and docs links instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Button asChild size="lg" className="h-12 px-8 rounded-xl shadow-glow hover:shadow-glow-lg transition-all">
                <Link to="/create-stack">
                  Create Your Stack
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-xl">
                <Link to="/presets">
                  Browse Presets
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three simple steps to get your project started faster than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Layers,
                title: 'Pick Your Tools',
                description: 'Browse categorized libraries or search npm for any package you need.',
              },
              {
                icon: Package,
                title: 'Build Your Stack',
                description: 'Add tools to your basket and see your stack come together.',
              },
              {
                icon: Copy,
                title: 'Copy & Go',
                description: 'Get consolidated install commands and start coding immediately.',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl hover:bg-accent/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presets Preview Section */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Popular Presets</h2>
              <p className="text-muted-foreground">Start with proven stack combinations.</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/presets">
                View All Presets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presets.slice(0, 3).map((preset, index) => (
              <div key={preset.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <PresetCard preset={preset} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Build Faster?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Stop wasting time on setup. Start building what matters.
          </p>
          <Button asChild size="lg" className="h-12 px-8 rounded-xl shadow-glow hover:shadow-glow-lg transition-all">
            <Link to="/create-stack">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-semibold">Beenzod</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for developers who value their time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
