import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoryList } from '@/components/CategoryList';
import { ToolCard } from '@/components/ToolCard';
import { SearchBar } from '@/components/SearchBar';
import { Basket } from '@/components/Basket';
import { OutputPanel } from '@/components/OutputPanel';
import { tools, categories } from '@/data/toolsData';

const CreateStack = () => {
  const [activeCategory, setActiveCategory] = useState('frameworks');

  const filteredTools = tools.filter((tool) => tool.category === activeCategory);
  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Categories & Tools */}
        <div className="flex-1 flex overflow-hidden">
          {/* Categories Sidebar */}
          <aside className="w-56 shrink-0 border-r border-border bg-card overflow-y-auto hidden lg:block">
            <div className="p-4">
              <CategoryList
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </aside>

          {/* Tools Area */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <SearchBar />
            </div>

            {/* Mobile Categories */}
            <div className="lg:hidden px-4 py-3 border-b border-border overflow-x-auto">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Header */}
            <div className="px-4 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">
                {activeCategoryData?.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {activeCategoryData?.description}
              </p>
            </div>

            {/* Tools Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No tools in this category yet.
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Right Panel - Basket & Output */}
        <aside className="w-80 shrink-0 border-l border-border bg-card flex flex-col hidden md:flex">
          <div className="h-1/2 border-b border-border overflow-hidden">
            <Basket />
          </div>
          <div className="h-1/2 overflow-hidden">
            <OutputPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CreateStack;
