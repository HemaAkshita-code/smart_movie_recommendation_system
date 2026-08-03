import React from "react";
import MovieCarousel from "../movie/MovieCarousel";

const TrendingSection = () => {
  const trendingMovies = [
    { id: 61, title: "Inception", releaseYear: 2010, genres: ["Sci-Fi", "Action"], matchScore: 89, rating: 4.8, posterPath: null },
    { id: 62, title: "Parasite", releaseYear: 2019, genres: ["Thriller", "Drama"], matchScore: 92, rating: 4.9, posterPath: null },
    { id: 63, title: "Spirited Away", releaseYear: 2001, genres: ["Animation", "Fantasy"], matchScore: 88, rating: 4.8, posterPath: null },
    { id: 64, title: "Whiplash", releaseYear: 2014, genres: ["Drama", "Music"], matchScore: 91, rating: 4.7, posterPath: null },
    { id: 65, title: "The Dark Knight", releaseYear: 2008, genres: ["Action", "Crime"], matchScore: 90, rating: 4.8, posterPath: null },
  ];

  return (
    <div className="space-y-4 text-left font-sans select-none">
      <MovieCarousel title="Trending Globally" movies={trendingMovies} />
    </div>
  );
};

export default TrendingSection;
export { TrendingSection };
