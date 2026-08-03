import React from "react";
import { Check } from "lucide-react";
import Card, { CardContent } from "../ui/card";

const StreamingCard = ({ platform, isSelected, onClick }) => {
  const platformColors = {
    netflix: "border-red-600/40 text-red-500 bg-red-950/5",
    "prime video": "border-sky-500/40 text-sky-400 bg-sky-950/5",
    "disney+": "border-blue-600/40 text-blue-400 bg-blue-950/5",
    "apple tv+": "border-neutral-500/40 text-neutral-300 bg-neutral-900/5",
    max: "border-indigo-600/40 text-indigo-400 bg-indigo-950/5",
    hulu: "border-emerald-500/40 text-emerald-400 bg-emerald-950/5",
  };

  const nameKey = platform.toLowerCase();
  const themeClass = platformColors[nameKey] || "border-border/40 bg-card text-foreground";

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 select-none overflow-hidden relative group border ${
        isSelected
          ? `${themeClass} ring-2 ring-primary/40 scale-[1.02] shadow-elevation-1`
          : "border-border/40 hover:border-muted-foreground/30 bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-3 relative">
        {/* Selected Tick Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <Check className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Platform Logo Avatar Placeholder */}
        <div className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-background/50 font-heading font-bold text-sm tracking-wide shadow-sm group-hover:scale-105 transition-transform">
          {platform.split(" ")[0].slice(0, 3).toUpperCase()}
        </div>

        {/* Platform Title */}
        <span className="font-heading font-semibold text-xs tracking-wide">
          {platform}
        </span>
      </CardContent>
    </Card>
  );
};

export default StreamingCard;
export { StreamingCard };
