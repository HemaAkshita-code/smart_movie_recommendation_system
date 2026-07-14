import React from "react";
import { Link } from "react-router-dom";
import CompatibilityScore from "../movie/CompatibilityScore";
import RatingStars from "../movie/RatingStars";

const SearchResultCard = ({ movie }) => {
  const { id, title, posterPath, releaseYear, matchScore, rating, genres } = movie;

  return (
    <Link
      to={`/movie/${id}`}
      className="flex items-center gap-4 p-3 bg-card border border-border/40 rounded-card hover:shadow-elevation-2 hover:-translate-y-0.5 transition-all duration-200 text-left font-sans"
    >
      {/* Thumbnail poster */}
      <div className="w-14 aspect-[2/3] rounded-poster bg-muted/60 overflow-hidden border border-border/10 shrink-0">
        {posterPath ? (
          <img src={posterPath} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-[8px] font-bold">
            NO ART
          </div>
        )}
      </div>

      {/* Info details */}
      <div className="flex-grow min-w-0 space-y-1">
        <h4 className="font-heading font-semibold text-sm text-foreground truncate">
          {title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{releaseYear}</span>
          {rating && (
            <>
              <span>&bull;</span>
              <RatingStars rating={rating} />
            </>
          )}
        </div>
        {genres && genres.length > 0 && (
          <p className="text-[10px] text-muted-foreground/80 truncate">
            {genres.join(", ")}
          </p>
        )}
      </div>

      {/* Match Score */}
      {matchScore && (
        <div className="shrink-0 pl-2">
          <CompatibilityScore score={matchScore} />
        </div>
      )}
    </Link>
  );
};

export default SearchResultCard;
export { SearchResultCard };
