import React from "react";
import MovieCard from "../movie/MovieCard";
import MatchReasons from "./MatchReasons";

const RecommendationCard = ({ recommendation }) => {
  const { movie, matchReasons } = recommendation;

  return (
    <div className="bg-card p-4 rounded-card border border-border/40 shadow-elevation-1 space-y-4 hover:shadow-elevation-2 transition-shadow duration-200">
      {/* Composed Movie Card */}
      <MovieCard movie={movie} />

      {/* Explanatory Details */}
      {matchReasons && matchReasons.length > 0 && (
        <div className="pt-3 border-t border-border/10">
          <MatchReasons reasons={matchReasons} />
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
export { RecommendationCard };
