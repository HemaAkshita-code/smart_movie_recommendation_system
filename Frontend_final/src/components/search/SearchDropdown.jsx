import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import CompatibilityScore from "../movie/CompatibilityScore";

const SearchDropdown = ({ isOpen, results = [], onSelect }) => {
  if (!isOpen || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-card rounded-card border border-border/40 shadow-elevation-3 overflow-hidden font-sans">
      <div className="max-h-72 overflow-y-auto divide-y divide-border/10">
        {results.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            onClick={() => onSelect && onSelect(movie)}
            className="flex items-center justify-between p-3.5 hover:bg-muted/40 transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <span className="font-semibold text-sm text-foreground truncate block">
                  {movie.title}
                </span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  {movie.releaseYear} &bull; {movie.genres ? movie.genres.join(", ") : "Movie"}
                </span>
              </div>
            </div>
            {movie.matchScore && <CompatibilityScore score={movie.matchScore} />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
export { SearchDropdown };
