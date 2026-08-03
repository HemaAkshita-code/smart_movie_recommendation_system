import React from "react";
import { Link } from "react-router-dom";
import MoviePoster from "../movie/MoviePoster";

const FavoriteMovies = ({ movies }) => {
  const defaultMovies = [
    { id: 1, title: "In the Mood for Love", posterPath: null },
    { id: 2, title: "Blade Runner 2049", posterPath: null },
    { id: 3, title: "Portrait of a Lady on Fire", posterPath: null },
  ];

  const list = movies || defaultMovies;

  return (
    <div className="bg-card p-6 rounded-card border border-border/40 space-y-4 shadow-sm text-left font-sans">
      <div className="space-y-1">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Favorite Movies
        </h3>
        <p className="text-xs text-muted-foreground">
          Hand-picked cinema masterpieces on your profile.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-2">
        {list.slice(0, 3).map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="block">
            <MoviePoster
              src={movie.posterPath}
              title={movie.title}
              className="hover:-translate-y-0.5"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
export { FavoriteMovies };
