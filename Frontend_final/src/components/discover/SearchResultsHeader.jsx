import React from "react";
import { LayoutGrid, List } from "lucide-react";

const SearchResultsHeader = ({
  count = 0,
  sortBy = "match",
  onSortChange,
  isGridView = true,
  onViewChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-border/10 font-sans select-none text-left">
      <div className="space-y-1">
        <h3 className="font-heading font-bold text-sm text-foreground">
          Curated Search Results
        </h3>
        <p className="text-[11px] text-muted-foreground">
          Found {count} films matching your criteria and Taste DNA.
        </p>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="bg-card text-xs text-foreground font-semibold py-1 px-2 rounded-btn border border-border/40 focus:outline-none"
          >
            <option value="match">Match Score</option>
            <option value="rating">IMDb Rating</option>
            <option value="releaseDate">Release Date</option>
          </select>
        </div>

        {/* View toggler */}
        <div className="flex items-center gap-1 bg-muted/40 p-0.5 rounded-btn border border-border/25">
          <button
            onClick={() => onViewChange && onViewChange(true)}
            className={`p-1.5 rounded-btn transition-colors focus:outline-none ${
              isGridView ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewChange && onViewChange(false)}
            className={`p-1.5 rounded-btn transition-colors focus:outline-none ${
              !isGridView ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="List view"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsHeader;
export { SearchResultsHeader };
