import React from "react";
import Card, { CardContent } from "../ui/card";
import { Check } from "lucide-react";

const GENRES = [
  "Drama", "Thriller", "Sci-Fi", "Romance", "Mystery", 
  "Fantasy", "Documentary", "Animation", "Crime", "Horror"
];

const GenreExplorer = ({ selectedGenres = [], onToggle }) => {
  return (
    <div className="space-y-4 font-sans select-none text-left">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        Explore Genres
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {GENRES.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <Card
              key={genre}
              onClick={() => onToggle && onToggle(genre)}
              className={`cursor-pointer transition-all duration-200 border relative ${
                isSelected
                  ? "border-primary bg-primary/5 text-primary scale-[1.02] shadow-elevation-1"
                  : "border-border/40 hover:border-muted-foreground/30 bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between text-left relative min-h-[60px]">
                <span className="font-heading font-bold text-xs tracking-wide">
                  {genre}
                </span>
                {isSelected && (
                  <div className="w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GenreExplorer;
export { GenreExplorer };
