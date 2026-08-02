import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Award, Lock } from "lucide-react";

const AchievementsSection = ({ achievements = [] }) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <Card className="border-border/40 font-sans select-none text-left shadow-sm">
      <CardHeader className="border-b border-border/10 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-primary" />
          Achievements
        </CardTitle>
        <span className="text-xs text-primary font-semibold">
          {unlockedCount} of {achievements.length} Unlocked
        </span>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Grid badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {achievements.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center justify-center p-4 border rounded-btn text-center space-y-2 relative transition-all ${
                badge.unlocked
                  ? "border-primary/20 bg-primary/5 text-foreground hover:scale-[1.02]"
                  : "border-border/40 bg-card text-muted-foreground opacity-60"
              }`}
            >
              {/* Badge Icon */}
              <div className="text-3xl filter drop-shadow-sm select-none">
                {badge.icon}
              </div>
              
              {/* Badge Details */}
              <div className="space-y-0.5 min-w-0">
                <span className="font-semibold text-[11px] block truncate text-foreground">
                  {badge.title}
                </span>
                <span className="text-[9px] leading-relaxed text-muted-foreground block line-clamp-2">
                  {badge.description}
                </span>
              </div>

              {/* Lock overlay for locked badges */}
              {!badge.unlocked && (
                <div className="absolute top-2 right-2 text-muted-foreground">
                  <Lock className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;
export { AchievementsSection };
