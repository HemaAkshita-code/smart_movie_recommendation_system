import React from "react";
import { cn } from "../../utils/helpers";

const SearchFilters = ({
  options = ["All", "Sci-Fi", "Drama", "Thriller", "Action", "Romance", "Mystery"],
  selectedOption,
  onSelect,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none select-none font-sans">
      {options.map((option) => {
        const isSelected = selectedOption === option;
        return (
          <button
            key={option}
            onClick={() => onSelect && onSelect(option)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all focus:outline-none whitespace-nowrap",
              isSelected
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-transparent text-muted-foreground border-border/40 hover:bg-muted/40"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default SearchFilters;
export { SearchFilters };
