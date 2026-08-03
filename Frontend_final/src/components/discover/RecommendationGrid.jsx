import React from "react";
import RecommendationCard from "../recommendation/RecommendationCard";

const RecommendationGrid = ({ recommendations = [], onMovieClick }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
      {recommendations.map((rec) => (
        <div
          key={rec.movie.id}
          onClick={(e) => {
            // Prevent drawer trigger if they click action buttons (like watchlist) inside the card
            const tag = e.target.tagName.toLowerCase();
            if (tag !== "button" && tag !== "svg" && tag !== "path" && tag !== "a") {
              if (onMovieClick) onMovieClick(rec.movie);
            }
          }}
          className="cursor-pointer block"
        >
          <RecommendationCard recommendation={rec} />
        </div>
      ))}
    </div>
  );
};

export default RecommendationGrid;
export { RecommendationGrid };
