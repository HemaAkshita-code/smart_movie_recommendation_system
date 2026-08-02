import React, { useState } from "react";
import { useSelector } from "react-redux";
import HistoryTimeline from "../../components/library/HistoryTimeline";

const History = () => {
  const historyList = useSelector((state) => state.library.history);
  const [filterGenre, setFilterGenre] = useState("All");

  const filteredHistory = historyList.filter((item) => {
    if (filterGenre !== "All" && item.genre !== filterGenre) return false;
    return true;
  });

  return (
    <div className="space-y-8 font-sans select-none pb-12 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Watch History
          </h1>
          <p className="text-xs text-muted-foreground">
            Chronological logging of your viewing actions and reviews.
          </p>
        </div>

        {/* Filters Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Genre:</span>
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="bg-card text-xs text-foreground font-semibold py-1 px-2 rounded-btn border border-border/40 focus:outline-none"
          >
            <option value="All">All Genres</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Romance">Romance</option>
            <option value="Drama">Drama</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* History Timeline */}
      <div className="max-w-3xl pt-4">
        <HistoryTimeline history={filteredHistory} />
      </div>
    </div>
  );
};

export default History;
export { History };
