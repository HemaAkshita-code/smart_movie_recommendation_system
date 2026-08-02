import React from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import Input from "../ui/input";

const WatchlistToolbar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterStatus,
  onFilterStatusChange,
  isGridView,
  onViewChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4 border-b border-border/10 font-sans select-none text-left">
      
      {/* Search Input */}
      <div className="relative flex-grow max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <Search className="w-4 h-4" />
        </div>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search watchlist..."
          className="pl-9 h-9 w-full bg-muted/30 border-border/40 text-xs"
        />
      </div>

      {/* Sorting & Filters */}
      <div className="flex flex-wrap items-center gap-4 justify-between md:justify-end">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => onFilterStatusChange && onFilterStatusChange(e.target.value)}
            className="bg-card text-xs text-foreground font-semibold py-1 px-2 rounded-btn border border-border/40 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="want to watch">Want to Watch</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="bg-card text-xs text-foreground font-semibold py-1 px-2 rounded-btn border border-border/40 focus:outline-none"
          >
            <option value="dateAdded">Date Added</option>
            <option value="match">Match Score</option>
            <option value="rating">IMDb Rating</option>
          </select>
        </div>

        {/* View mode toggle */}
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

export default WatchlistToolbar;
export { WatchlistToolbar };
