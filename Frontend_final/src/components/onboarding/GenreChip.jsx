import React from "react";

const GenreChip = ({ genre, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-all duration-150 focus:outline-none select-none ${
        isSelected
          ? "bg-primary text-primary-foreground border-primary shadow-elevation-1 scale-[1.02]"
          : "bg-card text-muted-foreground border-border/40 hover:border-muted-foreground/30 hover:text-foreground"
      }`}
    >
      {genre}
    </button>
  );
};

export default GenreChip;
export { GenreChip };
