import React from "react";
import MovieCard from "../movie/MovieCard";
import Badge from "../ui/badge";
import { Trash2, CheckCircle2 } from "lucide-react";

const WatchlistCard = ({ watchlistItem, onRemove, onToggleStatus }) => {
  const { movie, status } = watchlistItem;

  const statusBadges = {
    "want to watch": <Badge variant="primary">Want to Watch</Badge>,
    watching: <Badge variant="info">Watching</Badge>,
    completed: <Badge variant="success">Completed</Badge>,
  };

  return (
    <div className="bg-card p-4 rounded-card border border-border/40 shadow-sm relative group space-y-4 font-sans text-left">
      
      {/* Status indicator badge */}
      <div className="absolute top-6 left-6 z-10 select-none">
        {statusBadges[status.toLowerCase()] || <Badge variant="primary">{status}</Badge>}
      </div>

      {/* Composed movie display */}
      <MovieCard movie={movie} />

      {/* Watchlist Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border/10">
        <button
          onClick={() => onToggleStatus && onToggleStatus(watchlistItem)}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors focus:outline-none"
          aria-label="Change viewing status"
        >
          <CheckCircle2 className="w-4 h-4 text-secondary" />
          <span>Mark progress</span>
        </button>

        {onRemove && (
          <button
            onClick={() => onRemove(watchlistItem.id)}
            className="text-muted-foreground hover:text-destructive p-1 rounded-btn hover:bg-muted/40 transition-colors focus:outline-none"
            aria-label="Remove movie from watchlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WatchlistCard;
export { WatchlistCard };
