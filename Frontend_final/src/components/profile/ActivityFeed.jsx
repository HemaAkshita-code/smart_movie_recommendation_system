import React from "react";
import { Film, Star, Bookmark } from "lucide-react";

const ActivityFeed = ({ activities }) => {
  const defaultActivities = [
    {
      id: 1,
      type: "rating",
      movieTitle: "In the Mood for Love",
      detail: "Rated 5 stars",
      time: "2 days ago",
    },
    {
      id: 2,
      type: "watchlist",
      movieTitle: "Blade Runner 2049",
      detail: "Added to watchlist",
      time: "5 days ago",
    },
    {
      id: 3,
      type: "review",
      movieTitle: "Arrival",
      detail: "Wrote a review",
      time: "1 week ago",
    },
  ];

  const data = activities || defaultActivities;

  const icons = {
    rating: <Star className="w-4 h-4 text-primary" />,
    watchlist: <Bookmark className="w-4 h-4 text-secondary" />,
    review: <Film className="w-4 h-4 text-accent" />,
  };

  return (
    <div className="bg-card p-6 rounded-card border border-border/40 space-y-4 shadow-sm text-left font-sans">
      <h3 className="font-heading font-semibold text-base text-foreground mb-4">
        Recent Activity
      </h3>
      <div className="relative border-l border-border/10 pl-6 space-y-6">
        {data.map((item) => (
          <div key={item.id} className="relative">
            {/* Timeline bullet icon */}
            <span className="absolute -left-10 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-muted border border-border/40">
              {icons[item.type] || <Film className="w-4 h-4" />}
            </span>

            {/* Content info */}
            <div className="min-w-0">
              <p className="text-sm text-foreground leading-normal">
                <span className="font-semibold">{item.detail}</span> for{" "}
                <span className="font-medium text-primary hover:underline cursor-pointer">
                  {item.movieTitle}
                </span>
              </p>
              <span className="text-[10px] text-muted-foreground mt-1 block">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
export { ActivityFeed };
