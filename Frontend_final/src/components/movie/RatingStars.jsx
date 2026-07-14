import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "../../utils/helpers";

const RatingStars = ({ rating, max = 5, className }) => {
  // Convert 10-point rating scale to 5-point scale if needed
  const normalizedRating = rating > 5 ? rating / 2 : rating;

  const stars = [];
  const fullStars = Math.floor(normalizedRating);
  const hasHalf = normalizedRating % 1 >= 0.5;

  for (let i = 1; i <= max; i++) {
    if (i <= fullStars) {
      stars.push(<Star key={i} className="w-3.5 h-3.5 fill-current text-primary" />);
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(<StarHalf key={i} className="w-3.5 h-3.5 fill-current text-primary" />);
    } else {
      stars.push(<Star key={i} className="w-3.5 h-3.5 text-muted-foreground/35" />);
    }
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rating: ${normalizedRating} out of ${max}`}>
      {stars}
    </div>
  );
};

export default RatingStars;
export { RatingStars };
