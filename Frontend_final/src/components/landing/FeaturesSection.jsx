import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Sparkles, Dna, Smile, Users, Tv, Bookmark } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      color: "text-primary bg-primary/10 border-primary/20",
      title: "AI Recommendations",
      description: "Maps recommendations to cinematic style, pacing, and screenplays instead of simple stars or views.",
      highlight: true, // Special grid accent
    },
    {
      icon: Smile,
      color: "text-secondary bg-secondary/10 border-secondary/20",
      title: "Mood Search",
      description: "Describe the specific atmosphere you crave, from slow-burn cerebral sci-fi to melancholic romance.",
      highlight: false,
    },
    {
      icon: Dna,
      color: "text-accent bg-accent/10 border-accent/20",
      title: "Taste DNA mapping",
      description: "Graphs your personal film genome across five stylistic axes as you bookmark, rate, and explore.",
      highlight: true,
    },
    {
      icon: Users,
      color: "text-info bg-info/10 border-info/20",
      title: "Social Compatibility",
      description: "Compare profiles with friends to find matching movies that cater to everyone's tastes.",
      highlight: false,
    },
    {
      icon: Tv,
      color: "text-primary bg-primary/10 border-primary/20",
      title: "Streaming Availability",
      description: "Check watch options instantly across subscription streaming services mapped to your location.",
      highlight: false,
    },
    {
      icon: Bookmark,
      color: "text-secondary bg-secondary/10 border-secondary/20",
      title: "Watchlist Intelligence",
      description: "Organize queues intelligently, prioritizing films based on runtime, mood, or platform removals.",
      highlight: false,
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/10 border-y border-border/10">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            Product Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Built for those who love film.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            CineCompass rejects loud dashboard widgets. We build clean, distraction-free tools designed to guide you straight to cinema masterpieces.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <Card
                key={index}
                className={`transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-2 flex flex-col justify-between ${
                  feat.highlight
                    ? "border-primary/20 dark:border-primary/10 bg-gradient-to-br from-card to-primary/5"
                    : "border-border/40"
                }`}
              >
                <CardHeader className="space-y-4 text-left">
                  {/* Icon Badge */}
                  <div className={`w-10 h-10 rounded-btn flex items-center justify-center border ${feat.color}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <CardTitle className="text-base md:text-lg">
                    {feat.title}
                  </CardTitle>
                </CardHeader>
                
                {/* Content */}
                <CardContent className="text-left">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
export { FeaturesSection };
