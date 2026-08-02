import React from "react";
import Card, { CardContent } from "../ui/card";
import { Star, Bookmark, CheckCircle2, Video } from "lucide-react";

const HistoryTimeline = ({ history = [] }) => {
  const activityIcons = {
    rating: <Star className="w-4 h-4 text-primary" />,
    watchlist: <Bookmark className="w-4 h-4 text-secondary" />,
    onboarding: <CheckCircle2 className="w-4 h-4 text-accent" />,
    complete: <Video className="w-4 h-4 text-info" />,
  };

  if (!history || history.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground bg-card border border-border/40 rounded-btn">
        No history items recorded.
      </div>
    );
  }

  return (
    <div className="relative border-l border-border/10 pl-6 space-y-8 font-sans select-none text-left">
      {history.map((item) => (
        <div key={item.id} className="relative">
          {/* Timeline Node Badge Icon */}
          <span className="absolute -left-10 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border/40 shadow-sm">
            {activityIcons[item.type] || <CheckCircle2 className="w-4 h-4" />}
          </span>

          {/* Timeline Card */}
          <Card className="border-border/40 hover:border-muted-foreground/30 transition-colors shadow-xs">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                  {item.time} ({item.date})
                </span>
                <p className="text-xs text-foreground font-sans">
                  <span className="font-semibold">{item.detail}</span> for{" "}
                  <span className="text-primary font-medium">{item.movieTitle}</span>
                </p>
              </div>

              {item.genre && (
                <span className="text-[9px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground font-bold shrink-0 uppercase tracking-wide">
                  {item.genre}
                </span>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default HistoryTimeline;
export { HistoryTimeline };
