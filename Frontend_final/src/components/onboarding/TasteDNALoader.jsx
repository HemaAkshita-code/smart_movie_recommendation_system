import React, { useState, useEffect } from "react";
import Spinner from "../ui/spinner";

const STAGES = [
  { text: "Analyzing Preferences...", progress: 15 },
  { text: "Building Taste DNA...", progress: 45 },
  { text: "Finding Similar Viewers...", progress: 75 },
  { text: "Preparing Recommendations...", progress: 90 },
  { text: "Complete.", progress: 100 },
];

const TasteDNALoader = ({ onComplete }) => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stageIndex >= STAGES.length) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      if (stageIndex === STAGES.length - 1) {
        if (onComplete) onComplete();
      } else {
        setStageIndex((prev) => prev + 1);
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [stageIndex, onComplete]);

  const currentStage = STAGES[stageIndex] || STAGES[STAGES.length - 1];

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center select-none font-sans min-h-[300px]">
      <Spinner size="lg" className="text-primary w-12 h-12" />

      <div className="space-y-3 w-full max-w-xs">
        {/* Stage description text */}
        <h3 className="font-heading font-semibold text-sm text-foreground animate-pulse">
          {currentStage.text}
        </h3>
        
        {/* Mini progress tracker */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            style={{ width: `${currentStage.progress}%` }}
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          />
        </div>
        
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block">
          Generating Profile
        </span>
      </div>
    </div>
  );
};

export default TasteDNALoader;
export { TasteDNALoader };
