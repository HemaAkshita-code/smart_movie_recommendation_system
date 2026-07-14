import React from "react";
import { Sparkles, Calendar, Clock, Star } from "lucide-react";

const CompatibilitySection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80 mb-4 block">
            See the Magic
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Explainable AI Matches.
          </h2>
        </div>

        {/* Cinematic Review Spread Layout (Cardless & Spacious) */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Stately Poster Placeholder (8px Radius) */}
            <div className="md:col-span-5 w-full aspect-[2/3] bg-gradient-to-tr from-slate-950 via-slate-900 to-zinc-950 rounded-poster border border-border/10 shadow-elevation-2 flex flex-col justify-between p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
              
              {/* Minimal header */}
              <div className="text-[10px] tracking-widest uppercase text-white/40 font-medium">
                CineCompass Featured Recommendation
              </div>

              {/* Minimal graphics */}
              <div className="my-auto py-8 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 text-primary/20 animate-pulse">
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
              </div>

              {/* Poster info */}
              <div>
                <span className="text-[10px] tracking-widest uppercase text-primary font-bold">
                  DENIS VILLENEUVE
                </span>
                <h3 className="font-heading font-bold text-2xl text-white mt-1 leading-tight">
                  Arrival
                </h3>
                <p className="text-xs text-white/50 mt-1">2016 &bull; 1h 56m</p>
              </div>
            </div>

            {/* Right Side: Editorial Text & Explanations */}
            <div className="md:col-span-7 space-y-8 text-left">
              
              {/* Title & Compatibility */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    Arrival
                  </span>
                  <span className="text-sm font-semibold text-secondary flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    94% Match
                  </span>
                </div>
                
                {/* Meta details */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide font-sans">
                  <span>Denis Villeneuve</span>
                  <span>&bull;</span>
                  <span>Sci-Fi, Drama</span>
                  <span>&bull;</span>
                  <span>2016</span>
                </div>
              </div>

              {/* Curator Note - Left primary border */}
              <div className="border-l border-primary/40 pl-6 py-1 space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Why Recommended
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Matches your preferences for <strong className="text-foreground font-semibold">slow-burn pacing</strong>, atmospheric soundtracks, and philosophical sci-fi. Inspired by your recent high ratings for <em className="text-foreground font-medium">Interstellar</em> and <em className="text-foreground font-medium">Arrival's</em> director Denis Villeneuve.
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Audience Summary
                </h4>
                <p className="text-foreground leading-relaxed text-sm">
                  A quiet masterpiece of modern science fiction that explores language, linear time, and grief, carrying a deeply emotional performance by Amy Adams.
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
