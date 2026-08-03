import React from "react";
import Card, { CardContent } from "../ui/card";
import { Film, Clock, Heart, Award, Languages, Calendar, User, Compass } from "lucide-react";

const ViewingInsights = () => {
  const insights = [
    { label: "Decade Focus", value: "2010s", desc: "45% of library", icon: Calendar },
    { label: "Avg. Runtime", value: "124 min", desc: "Contemplative length", icon: Clock },
    { label: "Primary Lang.", value: "English", desc: "82% audio ratio", icon: Languages },
    { label: "Core Director", className: "col-span-1", value: "Denis Villeneuve", desc: "3 titles watched", icon: User },
    { label: "Core Actor", value: "Ryan Gosling", desc: "3 titles watched", icon: User },
    { label: "Top Rated Genre", value: "Sci-Fi", desc: "4.8/5 avg. rating", icon: Compass },
  ];

  return (
    <div className="space-y-4 font-sans select-none text-left">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        Viewing Insights Snapshot
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {insights.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="border-border/40 hover:shadow-elevation-1 transition-shadow duration-300">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-2 rounded-btn bg-muted/40 border border-border/25 text-primary shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                    {item.label}
                  </span>
                  <span className="text-sm font-heading font-bold text-foreground block truncate">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground block truncate mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ViewingInsights;
export { ViewingInsights };
