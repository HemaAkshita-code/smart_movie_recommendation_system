import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Clock, Star, Bookmark, CheckCircle2 } from "lucide-react";

const RecentActivity = ({ activities = [] }) => {
  const defaultActivities = [
    { id: 1, type: "rating", movieTitle: "Arrival", detail: "Rated 5.0", time: "Today" },
    { id: 2, type: "watchlist", movieTitle: "Her", detail: "Added to Watchlist", time: "Yesterday" },
    { id: 3, type: "onboarding", movieTitle: "Taste DNA Profile", detail: "Completed Taste DNA Setup", time: "2 days ago" },
  ];

  const data = activities.length > 0 ? activities : defaultActivities;

  const activityIcons = {
    rating: <Star className="w-3.5 h-3.5 text-primary" />,
    watchlist: <Bookmark className="w-3.5 h-3.5 text-secondary" />,
    onboarding: <CheckCircle2 className="w-3.5 h-3.5 text-accent" />,
  };

  return (
    <Card className="border-border/40 h-full font-sans text-left shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 relative select-none">
        {data.length > 0 ? (
          <div className="relative border-l border-border/10 pl-5 space-y-6">
            {data.map((item) => (
              <div key={item.id} className="relative">
                {/* Timeline node icon */}
                <span className="absolute -left-8 top-0.5 flex h-6.5 w-6.5 items-center justify-center rounded-full bg-card border border-border/40">
                  {activityIcons[item.type] || <Clock className="w-3.5 h-3.5" />}
                </span>

                {/* Content details */}
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] text-muted-foreground font-semibold block uppercase tracking-widest">
                    {item.time}
                  </span>
                  <p className="text-xs text-foreground leading-normal font-sans">
                    <span className="font-semibold text-foreground/90">{item.detail}</span> for{" "}
                    <span className="text-primary font-medium hover:underline cursor-pointer">
                      {item.movieTitle}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No recent activity logged.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
export { RecentActivity };
