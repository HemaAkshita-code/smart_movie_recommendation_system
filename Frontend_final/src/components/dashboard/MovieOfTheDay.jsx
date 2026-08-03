import React from "react";
import { Play, Sparkles, Star } from "lucide-react";
import Button from "../ui/button";
import Card, { CardContent } from "../ui/card";
import CompatibilityScore from "../movie/CompatibilityScore";

const MovieOfTheDay = ({ movie }) => {
  if (!movie) return null;

  return (
    <Card className="border-border/40 overflow-hidden relative w-full min-h-[300px] md:min-h-[340px] flex flex-col justify-end p-6 md:p-8 bg-gradient-to-tr from-slate-950 via-slate-900 to-zinc-950 shadow-elevation-2 font-sans select-none">
      {/* Background artwork decorative tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none z-10" />
      
      {/* Visual content overlay */}
      <div className="relative z-20 space-y-4 text-left max-w-2xl">
        {/* Banner indicator */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full">
            <Sparkles className="w-3 h-3 fill-current" />
            Today's Pick
          </span>
          <CompatibilityScore score={movie.matchScore} className="text-secondary" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white tracking-tight leading-none">
            {movie.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>{movie.releaseYear}</span>
            <span>&bull;</span>
            <span>{movie.duration}</span>
            <span>&bull;</span>
            <div className="flex items-center gap-0.5 text-primary">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold">{movie.rating}</span>
            </div>
          </div>
        </div>

        {/* AI explanation */}
        <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl">
          {movie.aiExplanation}
        </p>

        {/* Play Action */}
        <div className="pt-2">
          <Button variant="primary" size="sm" className="gap-2">
            <Play className="w-4 h-4 fill-current" />
            Watch Trailer
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MovieOfTheDay;
export { MovieOfTheDay };
