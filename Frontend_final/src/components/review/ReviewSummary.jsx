import React from "react";
import RatingStars from "../movie/RatingStars";

const ReviewSummary = ({ averageRating = 0, totalReviews = 0 }) => {
  return (
    <div className="p-6 bg-card border border-border/40 rounded-card flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left font-sans shadow-sm">
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
          Audience Rating
        </span>
        <div className="flex items-baseline gap-2 justify-center sm:justify-start">
          <span className="text-4xl font-heading font-bold text-foreground">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">/ 5.0</span>
        </div>
      </div>

      <div className="flex flex-col items-center sm:items-end gap-1">
        <RatingStars rating={averageRating} />
        <span className="text-xs text-muted-foreground mt-1">
          Based on {totalReviews} community reviews
        </span>
      </div>
    </div>
  );
};

export default ReviewSummary;
export { ReviewSummary };
