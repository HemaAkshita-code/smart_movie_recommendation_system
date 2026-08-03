import React from "react";
import { cn } from "../../utils/helpers";

const CompatibilityMeter = ({ value = 0, size = 100, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center font-sans select-none">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-border/30"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle (Sage Green) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#8CA38C"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Percentage Center Text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-heading font-bold text-xl text-foreground leading-none">
          {value}%
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-1 leading-none">
          Match
        </span>
      </div>
    </div>
  );
};

export default CompatibilityMeter;
export { CompatibilityMeter };
