import { Link } from "react-router-dom";
import { ArrowRight, Package, Zap, Layers, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { PresetCard } from "@/components/PresetCard";
import { presets } from "@/data/toolsData";
import Footer from "@/components/Footer";
import CTA from "./sections/CTA";
import PresetPreview from "./sections/PresetPreview";
import Features from "./sections/Features";
import Hero from "./sections/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Presets Preview Section */}
      <PresetPreview />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
