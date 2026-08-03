import React from "react";
import Button from "../ui/button";
import { Trash, ArrowDownAZ } from "lucide-react";

const WatchlistActions = ({ onClearAll, onSortChange, currentSort = "dateAdded" }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/10 font-sans select-none">
      
      {/* Sort Select list */}
      <div className="flex items-center gap-2">
        <ArrowDownAZ className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Sort by:</span>
        <select
          value={currentSort}
          onChange={(e) => onSortChange && onSortChange(e.target.value)}
          className="bg-card text-xs text-foreground font-semibold py-1 px-2.5 rounded-btn border border-border/40 focus:outline-none"
        >
          <option value="dateAdded">Date Added</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="matchScore">Match Percentage</option>
          <option value="releaseYear">Release Year</option>
        </select>
      </div>

      {/* Clear watchlist action */}
      {onClearAll && (
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive/5 hover:text-destructive gap-1.5 border-destructive/20 h-8"
          onClick={onClearAll}
        >
          <Trash className="w-3.5 h-3.5" />
          <span>Clear Watchlist</span>
        </Button>
      )}

    </div>
  );
};

export default WatchlistActions;
export { WatchlistActions };
