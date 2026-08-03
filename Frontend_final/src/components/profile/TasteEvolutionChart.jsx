import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const TasteEvolutionChart = () => {
  const trends = [
    { name: "Sci-Fi", change: "up-high", text: "Growing rapidly (+24%)", icon: TrendingUp, color: "text-primary bg-primary/10" },
    { name: "Drama", change: "up-soft", text: "Increasing steadily (+12%)", icon: TrendingUp, color: "text-secondary bg-secondary/10" },
    { name: "Romance", change: "stable", text: "Relatively stable (+2%)", icon: RefreshCw, color: "text-accent bg-accent/10" },
    { name: "Comedy", change: "down", text: "Decreased slightly (-8%)", icon: TrendingDown, color: "text-destructive bg-destructive/10" },
  ];

  return (
    <Card className="border-border/40 h-full font-sans select-none text-left shadow-sm">
      <CardHeader className="border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-primary" />
          Taste Evolution
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            January → August Preference Shifts
          </span>
          <p className="text-xs text-muted-foreground">
            How your cinematic appetite shifted over the last eight months.
          </p>
        </div>

        {/* Shift items */}
        <div className="divide-y divide-border/10">
          {trends.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div>
                  <span className="font-heading font-semibold text-xs text-foreground block">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">
                    {item.text}
                  </span>
                </div>
                <div className={`p-1.5 rounded-full border border-transparent shrink-0 ${item.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasteEvolutionChart;
export { TasteEvolutionChart };
