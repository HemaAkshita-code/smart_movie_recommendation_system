import React from "react";
import Avatar from "../ui/avatar";
import Card, { CardContent } from "../ui/card";
import { Sparkles } from "lucide-react";

const TasteDNAHero = ({ userName = "Ria", personality = "The Thoughtful Visionary", summary = "" }) => {
  return (
    <div className="relative p-6 md:p-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent border border-border/20 rounded-btn select-none font-sans text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        
        {/* Profile Info */}
        <div className="flex items-start md:items-center gap-4">
          <Avatar fallback={userName[0].toUpperCase()} className="w-14 h-14 bg-primary/20 border-2 border-primary text-primary font-bold text-lg" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Taste DNA Analysis
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {personality}
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Last updated: Today
            </p>
          </div>
        </div>

        {/* DNA score badge */}
        <div className="px-5 py-2 border border-border/40 bg-card/60 backdrop-blur-sm rounded-btn text-center shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Taste DNA Score
          </span>
          <span className="text-2xl font-heading font-bold text-primary block mt-0.5">
            94%
          </span>
        </div>

      </div>

      {/* Narrative Curation Summary */}
      <div className="mt-6 pt-6 border-t border-border/10">
        <p className="text-xs md:text-sm text-foreground/80 leading-relaxed max-w-3xl">
          {summary || "You gravitate toward emotionally rich, visually immersive stories that blend philosophical ideas with human emotion. Your selections indicate a strong preference for slower, atmospheric pacing and complex character development."}
        </p>
      </div>

    </div>
  );
};

export default TasteDNAHero;
export { TasteDNAHero };
