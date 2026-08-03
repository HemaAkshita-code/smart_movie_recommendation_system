import React from "react";
import { Sparkles } from "lucide-react";

const DashboardHeader = ({ userName = "Ria", recommendationCount = 3 }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 font-sans text-left border-b border-border/10 pb-6 mb-8 select-none">
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
          {formattedDate}
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
          {getGreeting()}, {userName}
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground font-sans">
          Your cinematic journey continues.
        </p>
      </div>

      {recommendationCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-btn text-xs font-semibold text-primary w-fit animate-pulse">
          <Sparkles className="w-4 h-4 fill-current" />
          <span>{recommendationCount} new matches today</span>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
export { DashboardHeader };
