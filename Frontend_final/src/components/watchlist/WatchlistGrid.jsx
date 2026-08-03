import React from "react";
import WatchlistCard from "./WatchlistCard";
import { cn } from "../../utils/helpers";

const WatchlistGrid = ({ watchlistItems = [], onRemove, onToggleStatus, className }) => {
  if (watchlistItems.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground font-sans">
        Your watchlist is currently empty.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
        className
      )}
    >
      {watchlistItems.map((item) => (
        <WatchlistCard
          key={item.id}
          watchlistItem={item}
          onRemove={onRemove}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default WatchlistGrid;
export { WatchlistGrid };
