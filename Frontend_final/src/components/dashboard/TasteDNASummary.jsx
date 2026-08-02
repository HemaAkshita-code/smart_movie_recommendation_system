import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import TasteDNAChart from "../recommendation/TasteDNAChart";
import Badge from "../ui/badge";
import { Dna } from "lucide-react";

const TasteDNASummary = ({ data }) => {
  const defaultGenres = ["Drama", "Sci-Fi", "Mystery", "Independent Cinema"];

  return (
    <Card className="border-border/40 h-full font-sans text-left shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Dna className="w-4 h-4 text-primary" />
          Taste DNA Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Radar Graphic */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="w-full max-w-[280px]">
            <TasteDNAChart data={data} />
          </div>
        </div>

        {/* Text descriptions */}
        <div className="lg:col-span-6 space-y-5 text-left">
          {/* Top Genres list */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
              Core Genres
            </span>
            <div className="flex flex-wrap gap-2">
              {defaultGenres.map((g) => (
                <Badge key={g} variant="primary" className="text-[10px] px-2 py-0.5">
                  {g}
                </Badge>
              ))}
            </div>
          </div>

          {/* Personality description */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
              Cinematic Personality
            </span>
            <p className="text-xs text-foreground font-medium leading-relaxed">
              Thought-provoking explorer
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed pt-0.5 font-sans">
              You gravitate toward emotionally rich, thought-provoking films with strong visual storytelling and slower, atmospheric pacing.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default TasteDNASummary;
export { TasteDNASummary };
