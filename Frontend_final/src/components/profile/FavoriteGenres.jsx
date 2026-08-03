import React from "react";
import GenreBadge from "../movie/GenreBadge";

const FavoriteGenres = ({ genres }) => {
  const defaultGenres = ["Sci-Fi", "Drama", "Mystery", "Romance"];
  const list = genres || defaultGenres;

  return (
    <div className="bg-card p-6 rounded-card border border-border/40 space-y-4 shadow-sm text-left font-sans">
      <div className="space-y-1">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Favorite Genres
        </h3>
        <p className="text-xs text-muted-foreground">
          Top film categories based on your viewing history.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {list.map((genre) => (
          <GenreBadge key={genre} genre={genre} className="px-4 py-1.5 text-xs" />
        ))}
      </div>
    </div>
  );
};

export default FavoriteGenres;
export { FavoriteGenres };
