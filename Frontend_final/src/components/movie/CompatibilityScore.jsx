import React from "react";
import { Star } from "lucide-react";
import { cn } from "../../utils/helpers";

const CompatibilityScore = ({ score, className }) => {
  if (score === undefined || score === null) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold text-secondary select-none tracking-wide",
        className
      )}
    >
      <Star className="w-3.5 h-3.5 fill-current" />
      {score}% Match
    </span>
  );
};

export default CompatibilityScore;
export { CompatibilityScore };
