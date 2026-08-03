import React from "react";
import MovieCard from "./MovieCard";
import { cn } from "../../utils/helpers";

const MovieGrid = ({ movies, className }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No movies available to display.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8",
        className
      )}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
export { MovieGrid };
