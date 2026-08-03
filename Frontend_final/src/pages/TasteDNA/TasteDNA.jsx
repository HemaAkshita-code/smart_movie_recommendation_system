import React from "react";
import TasteDNAHero from "../../components/profile/TasteDNAHero";
import TasteDNAChart from "../../components/recommendation/TasteDNAChart";
import TasteEvolutionChart from "../../components/profile/TasteEvolutionChart";
import ViewingInsights from "../../components/profile/ViewingInsights";
import AIInsightsCard from "../../components/profile/AIInsightsCard";
import RecommendationEvolution from "../../components/profile/RecommendationEvolution";
import Card, { CardContent } from "../../components/ui/card";

const TasteDNA = () => {
  const radarData = {
    labels: ["Drama", "Sci-Fi", "Mystery", "Romance", "Thriller", "Animation", "Fantasy"],
    values: [85, 95, 75, 60, 80, 50, 65],
  };

  return (
    <div className="space-y-10 font-sans select-none pb-12 text-left">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          My Taste DNA
        </h1>
        <p className="text-xs text-muted-foreground">
          A living, breathing representation of your movie taste coordinates.
        </p>
      </div>

      {/* 1. Hero Personality Card */}
      <TasteDNAHero />

      {/* Grid divisions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Radar and shifts (8 columns) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Radar Chart */}
          <Card className="border-border/40">
            <CardContent className="p-6 flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-4 self-start">
                Taste DNA Radar
              </span>
              <div className="w-full max-w-[340px]">
                <TasteDNAChart data={radarData} />
              </div>
            </CardContent>
          </Card>

          {/* Viewing Insights Grid */}
          <ViewingInsights />

        </div>

        {/* Right Side: Evolution, AI insights (4 columns) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Taste evolution sparklines */}
          <TasteEvolutionChart />

          {/* AI Insights Card */}
          <AIInsightsCard />

          {/* Influences and Genres */}
          <RecommendationEvolution />

        </div>

      </div>

    </div>
  );
};

export default TasteDNA;
export { TasteDNA };
