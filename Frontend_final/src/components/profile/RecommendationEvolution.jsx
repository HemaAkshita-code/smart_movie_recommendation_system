import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import Badge from "../ui/badge";
import { Sparkles, Library } from "lucide-react";

const RecommendationEvolution = () => {
  const influences = ["Arrival", "Blade Runner 2049", "Her"];
  const newGenres = ["Independent Romance", "East Asian Drama"];

  return (
    <Card className="border-border/40 h-full font-sans select-none text-left shadow-sm">
      <CardHeader className="border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Library className="w-4 h-4 text-primary" />
          Taste Influences
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-5">
        
        {/* Core Influencing Films */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Core Influencing Films
          </span>
          <div className="flex flex-wrap gap-2">
            {influences.map((film) => (
              <Badge key={film} variant="primary" className="text-[10px] px-2 py-0.5">
                {film}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recently Discovered Genres */}
        <div className="space-y-2 border-t border-border/10 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Recently Discovered Areas
          </span>
          <div className="flex flex-wrap gap-2">
            {newGenres.map((g) => (
              <Badge key={g} variant="outline" className="text-[10px] px-2 py-0.5 border-secondary/35 text-secondary">
                {g}
              </Badge>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default RecommendationEvolution;
export { RecommendationEvolution };
