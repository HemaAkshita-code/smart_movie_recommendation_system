import React from "react";
import Button from "../ui/button";

const FilterSidebar = ({
  selectedGenres = [],
  onGenreToggle,
  selectedDecade,
  onDecadeSelect,
  onReset,
}) => {
  const genres = ["Sci-Fi", "Drama", "Mystery", "Action", "Romance", "Thriller"];
  const decades = ["All", "2020s", "2010s", "2000s", "1990s", "1980s"];

  return (
    <div className="w-full space-y-6 text-left font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/10 pb-4">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Filters
        </h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs text-primary hover:underline font-semibold"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Genres Checkbox List */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
          Genres
        </span>
        <div className="space-y-2">
          {genres.map((genre) => {
            const isChecked = selectedGenres.includes(genre);
            return (
              <label
                key={genre}
                className="flex items-center gap-3 text-sm cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onGenreToggle && onGenreToggle(genre)}
                  className="w-4 h-4 rounded border-border/40 text-primary focus:ring-primary/30"
                />
                <span>{genre}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Decades Selector */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
          Release Decade
        </span>
        <div className="grid grid-cols-2 gap-2">
          {decades.map((decade) => {
            const isSelected = selectedDecade === decade;
            return (
              <button
                key={decade}
                onClick={() => onDecadeSelect && onDecadeSelect(decade)}
                className={`px-3 py-1.5 rounded-btn text-xs font-semibold border text-center transition-colors focus:outline-none ${
                  isSelected
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-transparent text-muted-foreground border-border/40 hover:bg-muted/40"
                }`}
              >
                {decade}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
export { FilterSidebar };
