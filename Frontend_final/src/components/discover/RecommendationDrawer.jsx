import React, { useRef, useEffect } from "react";
import { X, Bookmark, Star, Sparkles } from "lucide-react";
import Button from "../ui/button";
import Avatar from "../ui/avatar";
import GenreBadge from "../movie/GenreBadge";
import MoviePoster from "../movie/MoviePoster";

const RecommendationDrawer = ({ isOpen, movie, onClose, onAddToWatchlist }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans select-none">
      {/* Backdrop blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-background/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer content (sliding from right) */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-card border-l border-border/40 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-elevation-3 z-10 animate-in slide-in-from-right duration-250"
      >
        <div className="space-y-6 text-left">
          {/* Header Close button */}
          <div className="flex items-center justify-between border-b border-border/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
              Curator Details
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-btn hover:bg-muted/40 transition-colors focus:outline-none"
              aria-label="Close drawer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Movie Poster Aspect 2/3 */}
          <div className="w-48 mx-auto shadow-elevation-2">
            <MoviePoster title={movie.title} src={movie.posterPath} />
          </div>

          {/* Title & Metadata */}
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground leading-tight">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{movie.releaseYear}</span>
              <span>&bull;</span>
              <span>{movie.duration}</span>
              <span>&bull;</span>
              <div className="flex items-center gap-0.5 text-primary">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold">{movie.rating}</span>
              </div>
            </div>
            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {movie.genres && movie.genres.map((g) => (
                <GenreBadge key={g} genre={g} />
              ))}
            </div>
          </div>

          {/* AI Explanation block */}
          <div className="p-4 bg-primary/5 border-l-2 border-primary rounded-r-btn space-y-1.5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              AI Curator Note
            </h4>
            <p className="text-[11px] leading-relaxed text-muted-foreground whitespace-pre-line">
              {movie.aiExplanation}
            </p>
          </div>

          {/* Synopsis */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Synopsis
            </h4>
            <p className="text-xs text-foreground/90 leading-relaxed font-sans">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast / Director credits */}
          <div className="grid grid-cols-2 gap-4 border-t border-border/10 pt-4 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Director
              </span>
              <span className="font-semibold text-foreground">{movie.director}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Featured Cast
              </span>
              <span className="font-semibold text-foreground truncate block">
                {movie.cast ? movie.cast.join(", ") : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button CTA */}
        <div className="pt-6 border-t border-border/10 mt-8">
          <Button
            variant="primary"
            onClick={() => {
              if (onAddToWatchlist) onAddToWatchlist(movie);
              onClose();
            }}
            className="w-full h-11 gap-2"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            Add to Watchlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDrawer;
export { RecommendationDrawer };
