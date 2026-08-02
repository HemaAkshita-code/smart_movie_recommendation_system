import React, { useState } from "react";
import { Search, X, Check } from "lucide-react";
import MoviePoster from "../movie/MoviePoster";
import Input from "../ui/input";

const MOCK_MOVIES = [
  { id: 1, title: "Interstellar", releaseYear: 2014, genres: ["Sci-Fi", "Drama"] },
  { id: 2, title: "Inception", releaseYear: 2010, genres: ["Sci-Fi", "Action"] },
  { id: 3, title: "Pulp Fiction", releaseYear: 1994, genres: ["Crime", "Thriller"] },
  { id: 4, title: "Parasite", releaseYear: 2019, genres: ["Thriller", "Drama"] },
  { id: 5, title: "Spirited Away", releaseYear: 2001, genres: ["Animation", "Fantasy"] },
  { id: 6, title: "La La Land", releaseYear: 2016, genres: ["Romance", "Drama"] },
  { id: 7, title: "Whiplash", releaseYear: 2014, genres: ["Drama", "Music"] },
  { id: 8, title: "The Dark Knight", releaseYear: 2008, genres: ["Action", "Crime"] },
  { id: 9, title: "The Matrix", releaseYear: 1999, genres: ["Sci-Fi", "Action"] },
  { id: 10, title: "Eternal Sunshine of the Spotless Mind", releaseYear: 2004, genres: ["Romance", "Sci-Fi"] },
  { id: 11, title: "Arrival", releaseYear: 2016, genres: ["Sci-Fi", "Drama"] },
  { id: 12, title: "In the Mood for Love", releaseYear: 2000, genres: ["Romance", "Drama"] },
  { id: 13, title: "Blade Runner 2049", releaseYear: 2017, genres: ["Sci-Fi", "Mystery"] },
  { id: 14, title: "Portrait of a Lady on Fire", releaseYear: 2019, genres: ["Drama", "Romance"] },
];

const MovieSelector = ({ selectedMovies = [], onChange }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredMovies = query.trim()
    ? MOCK_MOVIES.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_MOVIES.slice(0, 5); // Default popular recommendations

  const handleSelect = (movie) => {
    const isAlreadySelected = selectedMovies.some((m) => m.id === movie.id);
    let newSelection;
    if (isAlreadySelected) {
      newSelection = selectedMovies.filter((m) => m.id !== movie.id);
    } else {
      newSelection = [...selectedMovies, movie];
    }
    onChange(newSelection);
    setQuery("");
  };

  const handleRemove = (movieId) => {
    const newSelection = selectedMovies.filter((m) => m.id !== movieId);
    onChange(newSelection);
  };

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
          <Search className="w-4 h-4" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Allow click to fire first
          placeholder="Search films by title..."
          className="pl-10 h-10 w-full"
        />

        {/* Results Dropdown */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-card border border-border/40 rounded-card shadow-elevation-3 max-h-60 overflow-y-auto divide-y divide-border/10">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => {
                const isSelected = selectedMovies.some((m) => m.id === movie.id);
                return (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => handleSelect(movie)}
                    className="w-full flex items-center justify-between p-3 text-sm hover:bg-muted/40 transition-colors text-left"
                  >
                    <div>
                      <span className="font-semibold block text-foreground">
                        {movie.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">
                        {movie.releaseYear} &bull; {movie.genres.join(", ")}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-muted-foreground">
                No matching movies found in database.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Movies Poster Grid */}
      {selectedMovies.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Selected Masterpieces ({selectedMovies.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {selectedMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <MoviePoster title={movie.title} />
                
                {/* Delete overlay icon */}
                <button
                  type="button"
                  onClick={() => handleRemove(movie.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-white hover:bg-destructive transition-colors focus:outline-none z-10 opacity-0 group-hover:opacity-100 shadow-sm"
                  aria-label={`Remove ${movie.title}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSelector;
export { MovieSelector };
