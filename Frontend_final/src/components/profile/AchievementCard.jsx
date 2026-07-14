import React from "react";
import { Award } from "lucide-react";

const AchievementCard = ({ achievement }) => {
  const { title, description, iconColor = "text-primary bg-primary/10 border-primary/20" } = achievement;

  return (
    <div className="flex items-start gap-4 p-5 bg-card border border-border/40 rounded-card font-sans text-left shadow-sm">
      {/* Icon Badge container */}
      <div className={`p-3 rounded-btn border shrink-0 ${iconColor}`}>
        <Award className="w-6 h-6" strokeWidth={1.5} />
      </div>

      {/* Description info */}
      <div className="space-y-1 min-w-0">
        <h4 className="font-heading font-semibold text-sm text-foreground truncate">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AchievementCard;
export { AchievementCard };
