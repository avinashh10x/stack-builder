import { create } from 'zustand';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  installCommand: string;
  docsUrl: string;
  setupSteps?: string[];
  icon?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  tools: string[];
  icon: string;
}

interface BasketState {
  tools: Tool[];
  addTool: (tool: Tool) => void;
  removeTool: (toolId: string) => void;
  clearBasket: () => void;
  applyPreset: (preset: Preset, allTools: Tool[]) => void;
  hasTool: (toolId: string) => boolean;
}

export const useBasketStore = create<BasketState>((set, get) => ({
  tools: [],
  
  addTool: (tool) => {
    const { tools } = get();
    if (!tools.find(t => t.id === tool.id)) {
      set({ tools: [...tools, tool] });
    }
  },
  
  removeTool: (toolId) => {
    set({ tools: get().tools.filter(t => t.id !== toolId) });
  },
  
  clearBasket: () => {
    set({ tools: [] });
  },
  
  applyPreset: (preset, allTools) => {
    const presetTools = allTools.filter(t => preset.tools.includes(t.id));
    set({ tools: presetTools });
  },
  
  hasTool: (toolId) => {
    return get().tools.some(t => t.id === toolId);
  },
}));
