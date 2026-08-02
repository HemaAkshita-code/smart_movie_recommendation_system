import React from "react";

const ProgressStepper = ({ currentStep = 1, totalSteps = 6 }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2 select-none font-sans">
      <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      {/* Track */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
        />
      </div>
    </div>
  );
};

export default ProgressStepper;
export { ProgressStepper };
