import React from "react";
import { Star, Sparkles, Bookmark, Eye, Share2 } from "lucide-react";
import MoviePoster from "./MoviePoster";
import CompatibilityScore from "./CompatibilityScore";
import Button from "../ui/button";

const MovieHero = ({
  movie,
  isWatchlisted,
  isWatched,
  onToggleWatchlist,
  onToggleWatched,
  onOpenRateDialog,
  onShare,
}) => {
  if (!movie) return null;

  return (
    <div className="relative min-h-[440px] md:min-h-[500px] bg-slate-950 flex flex-col justify-end p-6 md:p-12 font-sans select-none rounded-btn overflow-hidden">
      
      {/* Visual Backdrop Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none z-10" />

      {/* Info Split Panel */}
      <div className="relative z-20 flex flex-col md:flex-row gap-8 items-start md:items-end">
        {/* Left Side: Movie Poster */}
        <div className="w-40 md:w-56 shrink-0 shadow-elevation-3 rounded-poster overflow-hidden bg-card border border-border/10">
          <MoviePoster title={movie.title} src={movie.posterPath} />
        </div>

        {/* Right Side: Movie Details */}
        <div className="space-y-4 text-left max-w-3xl">
          {/* Badges indicators */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-bold tracking-widest uppercase bg-primary/10 border border-primary/20 text-primary rounded-full">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              {movie.matchScore}% Match
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
              <Star className="w-4 h-4 fill-current" />
              <span>{movie.rating} IMDb</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight leading-none">
              {movie.title}
            </h1>
            <p className="text-sm md:text-md italic text-white/60 font-medium">
              "{movie.synopsis.split(".")[0]}."
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 font-medium">
            <span>{movie.releaseYear}</span>
            <span>&bull;</span>
            <span>{movie.duration}</span>
            <span>&bull;</span>
            <span>{movie.language}</span>
            <span>&bull;</span>
            <span>{movie.country}</span>
          </div>

          {/* Actions panel */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant={isWatchlisted ? "secondary" : "primary"}
              onClick={onToggleWatchlist}
              size="sm"
              className="gap-2 text-xs"
            >
              <Bookmark className={`w-4 h-4 ${isWatchlisted ? "fill-current" : ""}`} />
              <span>{isWatchlisted ? "In Watchlist" : "Add to Watchlist"}</span>
            </Button>

            <Button
              variant="outline"
              onClick={onToggleWatched}
              size="sm"
              className={`gap-2 text-xs ${isWatched ? "border-primary text-primary" : "border-white/20 text-white"}`}
            >
              <Eye className={`w-4 h-4 ${isWatched ? "fill-current" : ""}`} />
              <span>{isWatched ? "Watched" : "Mark Watched"}</span>
            </Button>

            <Button variant="ghost" onClick={onOpenRateDialog} size="sm" className="text-white hover:text-primary gap-2 text-xs">
              <Star className="w-4 h-4" />
              <span>Rate</span>
            </Button>

            <Button variant="ghost" onClick={onShare} size="sm" className="text-white hover:text-primary gap-2 text-xs">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default MovieHero;
export { MovieHero };
