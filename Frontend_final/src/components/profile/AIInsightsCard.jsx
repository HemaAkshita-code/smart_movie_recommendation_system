import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Sparkles, MessageSquare, Compass } from "lucide-react";

const AIInsightsCard = () => {
  const insights = [
    {
      icon: Sparkles,
      title: "Slower Narrative Pacing",
      description: "You increasingly prefer slower, character-driven science fiction and dramas featuring long contemplation sequences over traditional fast-paced blockbusters.",
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      icon: Compass,
      title: "Appreciation for International Cinema",
      description: "Your recent viewing habits suggest a growing appreciation for East Asian romance and drama, showing an increase in Cantonese and Korean titles in your library.",
      color: "text-secondary bg-secondary/10 border-secondary/20",
    },
    {
      icon: MessageSquare,
      title: "Visually Rich Directors",
      description: "You exhibit 96% matching correlation with directors who emphasize colored visual themes, especially Wong Kar-wai and Denis Villeneuve's cinematography.",
      color: "text-accent bg-accent/10 border-accent/20",
    },
  ];

  return (
    <Card className="border-border/40 h-full font-sans select-none text-left shadow-sm">
      <CardHeader className="border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Taste Insights
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {insights.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex gap-4 items-start">
              <div className={`p-2 rounded-btn border shrink-0 ${item.color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-semibold text-xs text-foreground">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard;
export { AIInsightsCard };
