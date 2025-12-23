import { Package } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-semibold">Stacky</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for developers who value their time.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
