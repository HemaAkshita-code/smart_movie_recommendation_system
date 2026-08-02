import React from "react";
import MovieCarousel from "../movie/MovieCarousel";

const FeaturedMovies = () => {
  const trendingMovies = [
    { id: 1, title: "Arrival", releaseYear: 2016, genres: ["Sci-Fi", "Drama"], matchScore: 94, rating: 4.7, posterPath: null },
    { id: 2, title: "In the Mood for Love", releaseYear: 2000, genres: ["Romance", "Drama"], matchScore: 89, rating: 4.8, posterPath: null },
    { id: 3, title: "Blade Runner 2049", releaseYear: 2017, genres: ["Sci-Fi", "Action"], matchScore: 91, rating: 4.6, posterPath: null },
    { id: 4, title: "Portrait of a Lady on Fire", releaseYear: 2019, genres: ["Drama", "Romance"], matchScore: 87, rating: 4.7, posterPath: null },
    { id: 5, title: "Interstellar", releaseYear: 2014, genres: ["Sci-Fi", "Drama"], matchScore: 93, rating: 4.8, posterPath: null },
  ];

  const hiddenGems = [
    { id: 11, title: "Coherence", releaseYear: 2013, genres: ["Sci-Fi", "Mystery"], matchScore: 85, rating: 4.2, posterPath: null },
    { id: 12, title: "Burning", releaseYear: 2018, genres: ["Mystery", "Drama"], matchScore: 89, rating: 4.5, posterPath: null },
    { id: 13, title: "Perfect Blue", releaseYear: 1997, genres: ["Mystery", "Thriller"], matchScore: 88, rating: 4.6, posterPath: null },
    { id: 14, title: "First Reformed", releaseYear: 2017, genres: ["Drama", "Mystery"], matchScore: 86, rating: 4.3, posterPath: null },
    { id: 15, title: "The Double", releaseYear: 2013, genres: ["Drama", "Comedy"], matchScore: 82, rating: 4.1, posterPath: null },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-2 max-w-xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            Cinema Database
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            Revolving around great films.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            From blockbusters to hidden indie pieces, CineCompass covers centuries of film history to match you with matching cinema.
          </p>
        </div>

        {/* Carousels */}
        <div className="space-y-12">
          <MovieCarousel title="Trending Now" movies={trendingMovies} />
          <MovieCarousel title="Hidden Indie Gems" movies={hiddenGems} />
        </div>

      </div>
    </section>
  );
};

export default FeaturedMovies;
export { FeaturedMovies };
