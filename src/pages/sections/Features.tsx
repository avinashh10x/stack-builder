import { Copy, Layers, Package } from 'lucide-react'
import React from 'react'

function Features() {
  return (
   <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three simple steps to get your project started faster than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Layers,
                title: "Pick Your Tools",
                description:
                  "Browse categorized libraries or search npm for any package you need.",
              },
              {
                icon: Package,
                title: "Build Your Stack",
                description:
                  "Add tools to your basket and see your stack come together.",
              },
              {
                icon: Copy,
                title: "Copy & Go",
                description:
                  "Get consolidated install commands and start coding immediately.",
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
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Features