import React from "react";
import Card, { CardContent } from "../ui/card";
import { Sparkles } from "lucide-react";
import CompatibilityMeter from "../recommendation/CompatibilityMeter";

const AIExplanationCard = ({ explanation = "", confidenceScore = 95 }) => {
  return (
    <Card className="border-border/40 font-sans text-left shadow-sm select-none">
      <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
        
        {/* Left Side details */}
        <div className="space-y-3 max-w-xl text-left">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 fill-current" />
            <h4 className="font-heading font-bold text-sm tracking-wide">
              AI Curation Explanation
            </h4>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pr-2">
            {explanation || "Recommended because it aligns with your core taste attributes, combining stunning visual storytelling, contemplative narrative arcs, and atmospheric scores."}
          </p>
        </div>

        {/* Right Side meter */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
              Curator Match
            </span>
            <span className="text-xs text-primary font-bold">Excellent Fit</span>
          </div>
          <CompatibilityMeter value={confidenceScore} size={80} strokeWidth={5} />
        </div>

      </CardContent>
    </Card>
  );
};

export default AIExplanationCard;
export { AIExplanationCard };
