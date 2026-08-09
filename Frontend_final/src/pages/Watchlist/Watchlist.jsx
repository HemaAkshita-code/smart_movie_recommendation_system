import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bookmark, Eye, Trash2 } from "lucide-react";
import Button from "../../components/ui/button";
import MoviePoster from "../../components/movie/MoviePoster";
import EmptyState from "../../components/common/EmptyState";
import WatchlistToolbar from "../../components/watchlist/WatchlistToolbar";

import {
  fetchWatchlist,
  removeFromWatchlist,
  updateWatchlistStatus,
} from "../../redux/watchlist/watchlistSlice";

const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlistItems = useSelector((state) => state.watchlist.items);
  const currentUser = useSelector((state) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isGridView, setIsGridView] = useState(true);

  // Fetch user's watchlist on load
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchWatchlist(currentUser._id));
    }
  }, [dispatch, currentUser?._id]);

  const handleRemove = (entryId) => {
    dispatch(removeFromWatchlist(entryId));
  };

  const handleUpdateStatus = (entryId, currentStatus) => {
    const nextStatus = currentStatus === "completed" ? "want to watch" : "completed";
    dispatch(updateWatchlistStatus({ entryId, status: nextStatus }));
  };

  // Filter watchlist items
  const filteredItems = watchlistItems.filter((item) => {
    if (!item.movie) return false;
    // Search query matching title
    if (searchQuery.trim()) {
      const title = item.movie.title.toLowerCase();
      if (!title.includes(searchQuery.toLowerCase())) return false;
    }
    // Status filters
    if (filterStatus !== "All" && item.status !== filterStatus) {
      return false;
    }
    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "match") return (b.movie.matchScore || 0) - (a.movie.matchScore || 0);
    if (sortBy === "rating") return (b.movie.avgRating || b.movie.rating || 0) - (a.movie.avgRating || a.movie.rating || 0);
    return 0;
  });

  return (
    <div className="space-y-8 font-sans select-none pb-12 text-left">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          My Watchlist
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage your saved films, queues, and watched logs.
        </p>
      </div>

      {/* Toolbar filters */}
      <WatchlistToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        isGridView={isGridView}
        onViewChange={setIsGridView}
      />

      {/* Watchlist grid/list result layout */}
      {sortedItems.length > 0 ? (
        <div className="w-full">
          {isGridView ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {sortedItems.map((item) => {
                const entryId = item._id || item.id;
                return (
                  <div key={entryId} className="space-y-3 group relative text-left">
                    <div className="relative">
                      <MoviePoster title={item.movie.title} src={item.movie.coverImage || item.movie.posterPath} />
                      
                      {/* Hover actions menu panel on poster */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 rounded-poster">
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleRemove(entryId)}
                            className="p-1.5 rounded-btn bg-black/40 hover:bg-destructive text-white hover:text-white transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          <Button
                            variant="primary"
                            onClick={() => handleUpdateStatus(entryId, item.status)}
                            className="w-full h-8 text-[10px] gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{item.status === "completed" ? "Completed" : "Mark Watched"}</span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 px-1">
                      <span className="font-semibold text-xs text-foreground truncate block">
                        {item.movie.title}
                      </span>
                      <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                        <span>{item.movie.releaseYear}</span>
                        <span className="capitalize">{item.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // List View table details
            <div className="divide-y divide-border/10">
              {sortedItems.map((item) => {
                const entryId = item._id || item.id;
                return (
                  <div
                    key={entryId}
                    className="flex items-center justify-between py-4 hover:bg-muted/30 px-4 rounded-btn transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="font-heading font-semibold text-xs text-foreground truncate block">
                        {item.movie.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">
                        {item.movie.releaseYear} &bull; {item.movie.genre ? item.movie.genre.join(", ") : (item.movie.genres ? item.movie.genres.join(", ") : "")} &bull;{" "}
                        <span className="capitalize text-primary font-medium">{item.status}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(entryId, item.status)}
                        className={`p-2 rounded-btn border text-xs flex items-center gap-1.5 transition-colors focus:outline-none ${
                          item.status === "completed"
                            ? "border-primary/20 bg-primary/5 text-primary"
                            : "border-border/40 hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{item.status === "completed" ? "Watched" : "Mark Watched"}</span>
                      </button>
                      <button
                        onClick={() => handleRemove(entryId)}
                        className="p-2 rounded-btn border border-border/40 text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors focus:outline-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="Your next favorite movie is waiting."
          description="Save films to build your personal watchlist."
          actionText="Browse Discover"
          onAction={() => {}}
        />
      )}
    </div>
  );
};

export default Watchlist;
export { Watchlist };
