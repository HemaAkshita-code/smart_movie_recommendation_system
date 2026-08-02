import React from "react";
import { Link } from "react-router-dom";
import { Compass, Users, Bookmark, TrendingUp } from "lucide-react";
import Card, { CardContent } from "../ui/card";

const QuickActions = () => {
  const actions = [
    {
      icon: Compass,
      title: "Discover Movies",
      description: "Explore curated movie pathways and genre coordinates.",
      path: "/discover",
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      icon: Users,
      title: "Compare Taste",
      description: "Compare your Taste DNA with friends for movie nights.",
      path: "/friends",
      color: "text-secondary bg-secondary/10 border-secondary/20",
    },
    {
      icon: Bookmark,
      title: "View Watchlist",
      description: "Access your saved films and active viewing queues.",
      path: "/watchlist",
      color: "text-accent bg-accent/10 border-accent/20",
    },
    {
      icon: TrendingUp,
      title: "Explore Trending",
      description: "Review current box office hits and hidden indie gems.",
      path: "/discover",
      color: "text-info bg-info/10 border-info/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans text-left">
      {actions.map((act, index) => {
        const Icon = act.icon;
        return (
          <Link key={index} to={act.path} className="group block select-none">
            <Card className="h-full border-border/40 hover:border-muted-foreground/30 hover:shadow-elevation-1 transition-all duration-300">
              <CardContent className="p-5 flex items-start gap-4 h-full">
                {/* Icon Badge */}
                <div className={`p-2.5 rounded-btn border shrink-0 ${act.color}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                {/* Details */}
                <div className="space-y-1 min-w-0">
                  <h4 className="font-heading font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default QuickActions;
export { QuickActions };
