import React from "react";
import ProgressStepper from "./ProgressStepper";
import Button from "../ui/button";
import { ArrowLeft } from "lucide-react";

const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps,
  onBack,
  onSkip,
  showSkip = false,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans transition-colors duration-200">
      
      {/* Top Header Progress stepper */}
      <header className="max-w-[650px] w-full mx-auto px-6 pt-10 pb-4">
        <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />
      </header>

      {/* Main body wrapper */}
      <main className="flex-grow flex items-center justify-center px-6 py-6">
        <div className="max-w-[650px] w-full bg-card rounded-card border border-border/40 p-8 sm:p-10 shadow-elevation-1 space-y-8 text-left">
          
          {/* Step Headers */}
          {(title || subtitle) && (
            <div className="space-y-2 border-b border-border/10 pb-6">
              {title && (
                <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Children panel */}
          <div className="min-h-[220px]">{children}</div>

        </div>
      </main>

      {/* Bottom Footer Actions */}
      <footer className="max-w-[650px] w-full mx-auto px-6 pb-12 flex items-center justify-between font-sans">
        <div>
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2 pl-2 text-muted-foreground hover:text-foreground font-semibold text-xs"
            >
              <ArrowLeft className="w-4.5 h-4.5" strokeWidth={1.5} />
              Back
            </Button>
          )}
        </div>
        <div>
          {showSkip && onSkip && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="font-semibold text-xs text-muted-foreground hover:text-foreground"
            >
              Skip Step
            </Button>
          )}
        </div>
      </footer>

    </div>
  );
};

export default OnboardingLayout;
export { OnboardingLayout };
