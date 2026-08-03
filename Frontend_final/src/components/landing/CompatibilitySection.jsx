import React from "react";
import { Users, ShieldAlert, Sparkles } from "lucide-react";
import CompatibilityMeter from "../recommendation/CompatibilityMeter";
import Avatar from "../ui/avatar";

const CompatibilitySection = () => {
  return (
    <section id="compatibility" className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            Social Sync
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Compare tastes with friends.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Movie night shouldn't require compromises. Compare your Taste DNA with friends to discover where your cinematic preferences overlap.
          </p>
        </div>

        {/* Visual Comparison Widget */}
        <div className="max-w-3xl mx-auto bg-card rounded-card border border-border/40 p-8 md:p-12 shadow-elevation-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            {/* User A: You */}
            <div className="flex flex-col items-center text-center space-y-3 md:w-1/3">
              <Avatar fallback="Y" className="w-16 h-16 bg-primary/10 border border-primary/20 text-primary font-heading font-bold text-xl" />
              <div>
                <h4 className="font-heading font-semibold text-sm text-foreground">You</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">Atmospheric, Sci-Fi, slow-burn</p>
              </div>
            </div>

            {/* Center: Compatibility Gauge */}
            <div className="flex flex-col items-center justify-center md:w-1/3 py-4 select-none">
              <CompatibilityMeter value={87} size={130} strokeWidth={8} />
            </div>

            {/* User B: Friend */}
            <div className="flex flex-col items-center text-center space-y-3 md:w-1/3">
              <Avatar fallback="S" className="w-16 h-16 bg-secondary/10 border border-secondary/20 text-secondary font-heading font-bold text-xl" />
              <div>
                <h4 className="font-heading font-semibold text-sm text-foreground">Sarah</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">Cerebral, Mystery, Neo-Noir</p>
              </div>
            </div>

          </div>

          {/* Detailed Shared Analysis */}
          <div className="mt-12 pt-8 border-t border-border/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Shared DNA Highlights
              </h5>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 font-sans leading-relaxed">
                <li>Both appreciate highly structured cinematography and atmospheric scores.</li>
                <li>Shared favorite director overlap: <span className="text-foreground font-semibold">Denis Villeneuve</span>.</li>
                <li>Both enjoy films with slow-burn pacing and minimal expository dialogue.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Perfect Match Recommendation
              </h5>
              <div className="p-4 bg-muted/30 rounded-btn border border-border/20 space-y-1.5">
                <h6 className="font-heading font-bold text-xs text-foreground">In the Mood for Love (2000)</h6>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">
                  An 89% match for both profiles. A cinematic masterpiece from Wong Kar-wai featuring rich cinematography and a melancholic atmospheric score.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CompatibilitySection;
export { CompatibilitySection };
