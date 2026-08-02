import React from "react";
import { useSelector } from "react-redux";
import LibraryStats from "../../components/library/LibraryStats";
import MoviePoster from "../../components/movie/MoviePoster";
import EmptyState from "../../components/common/EmptyState";
import { Film } from "lucide-react";

const Library = () => {
  const watchlistItems = useSelector((state) => state.watchlist.items);

  const watched = watchlistItems.filter((i) => i.status === "completed");
  const inProgress = watchlistItems.filter((i) => i.status === "watching");
  const favorites = watchlistItems.filter((i) => i.movie.rating >= 4.7);

  const stats = {
    moviesWatched: watched.length + 8, // Adding offset for realistic count
    hoursWatched: (watched.length + 8) * 2 + 3.5,
    favoriteGenre: "Sci-Fi",
    averageRating: 4.7,
  };

  return (
    <div className="space-y-10 font-sans select-none pb-12 text-left">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Personal Library
        </h1>
        <p className="text-xs text-muted-foreground">
          Track statistics, viewing status, and history of your film catalog.
        </p>
      </div>

      {/* 1. Statistics Row */}
      <LibraryStats stats={stats} />

      {/* Grid divisions */}
      <div className="space-y-10 border-t border-border/10 pt-8">
        
        {/* Watched list */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
            Completed Movies ({watched.length})
          </h3>
          {watched.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {watched.map((item) => (
                <div key={item.id} className="space-y-2">
                  <MoviePoster title={item.movie.title} src={item.movie.posterPath} />
                  <span className="font-semibold text-xs text-foreground truncate block px-1">
                    {item.movie.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Film}
              title="No completed films."
              description="Mark watched films from your watchlist to see them here."
              actionText="Go to Watchlist"
              onAction={() => {}}
            />
          )}
        </div>

        {/* In progress list */}
        <div className="space-y-4 border-t border-border/10 pt-8">
          <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
            In Progress ({inProgress.length})
          </h3>
          {inProgress.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {inProgress.map((item) => (
                <div key={item.id} className="space-y-2">
                  <MoviePoster title={item.movie.title} src={item.movie.posterPath} />
                  <span className="font-semibold text-xs text-foreground truncate block px-1">
                    {item.movie.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-muted-foreground bg-card border border-border/40 rounded-btn">
              No movies currently in progress.
            </div>
          )}
        </div>

        {/* Favorites list */}
        <div className="space-y-4 border-t border-border/10 pt-8">
          <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
            Favorites ({favorites.length})
          </h3>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {favorites.map((item) => (
                <div key={item.id} className="space-y-2">
                  <MoviePoster title={item.movie.title} src={item.movie.posterPath} />
                  <span className="font-semibold text-xs text-foreground truncate block px-1">
                    {item.movie.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-muted-foreground bg-card border border-border/40 rounded-btn">
              No favorite films bookmarked yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Library;
export { Library };
