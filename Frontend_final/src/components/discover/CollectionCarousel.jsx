import React from "react";
import MovieCarousel from "../movie/MovieCarousel";

const CollectionCarousel = ({ title, movies }) => {
  return (
    <div className="space-y-4 text-left select-none">
      <MovieCarousel title={title} movies={movies} />
    </div>
  );
};

export default CollectionCarousel;
export { CollectionCarousel };
