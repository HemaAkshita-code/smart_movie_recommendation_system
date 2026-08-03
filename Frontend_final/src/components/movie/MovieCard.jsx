import React from "react";
import { Link } from "react-router-dom";
import MoviePoster from "./MoviePoster";
import CompatibilityScore from "./CompatibilityScore";
import RatingStars from "./RatingStars";

const MovieCard = ({ movie }) => {
  const { id, title, posterPath, releaseYear, matchScore, rating, genres } = movie;

  return (
    <div className="flex flex-col space-y-3 font-sans group">
      {/* Link wrap of Poster */}
      <Link to={`/movie/${id}`} aria-label={`View details for ${title}`}>
        <MoviePoster src={posterPath} title={title} />
      </Link>

      {/* Movie Meta Information */}
      <div className="space-y-1 pl-1">
        <div className="flex items-center justify-between gap-2">
          {/* Title */}
          <Link
            to={`/movie/${id}`}
            className="font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors truncate block flex-grow"
          >
            {title}
          </Link>
          
          {/* Match Badge */}
          {matchScore && <CompatibilityScore score={matchScore} />}
        </div>

        {/* Small subtitle details */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{releaseYear || "Unknown Year"}</span>
          {rating && <RatingStars rating={rating} />}
        </div>

        {/* Genres */}
        {genres && genres.length > 0 && (
          <p className="text-[10px] text-muted-foreground/80 truncate pt-0.5">
            {genres.slice(0, 2).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
export { MovieCard };
