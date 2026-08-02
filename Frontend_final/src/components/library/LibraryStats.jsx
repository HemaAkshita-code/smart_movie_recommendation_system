import React from "react";
import Card, { CardContent } from "../ui/card";
import { Film, Clock, Heart, Award } from "lucide-react";

const LibraryStats = ({ stats }) => {
  const defaultStats = {
    moviesWatched: 14,
    hoursWatched: 28.5,
    favoriteGenre: "Sci-Fi",
    averageRating: 4.6,
  };

  const data = stats || defaultStats;

  const statItems = [
    {
      icon: Film,
      label: "Movies Watched",
      value: data.moviesWatched,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      icon: Clock,
      label: "Hours Watched",
      value: `${data.hoursWatched}h`,
      color: "text-secondary bg-secondary/10 border-secondary/20",
    },
    {
      icon: Heart,
      label: "Favorite Genre",
      value: data.favoriteGenre,
      color: "text-accent bg-accent/10 border-accent/20",
    },
    {
      icon: Award,
      label: "Average Rating",
      value: `${data.averageRating}★`,
      color: "text-info bg-info/10 border-info/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-sans select-none text-left">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="border-border/40 hover:shadow-elevation-1 transition-shadow duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-2.5 rounded-btn border shrink-0 ${item.color}`}>
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                  {item.label}
                </span>
                <span className="text-lg md:text-xl font-heading font-bold text-foreground block truncate">
                  {item.value}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LibraryStats;
export { LibraryStats };
