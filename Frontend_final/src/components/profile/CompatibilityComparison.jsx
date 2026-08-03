import React from "react";
import CompatibilityMeter from "../recommendation/CompatibilityMeter";
import TasteDNAChart from "../recommendation/TasteDNAChart";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import Badge from "../ui/badge";
import Button from "../ui/button";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";

const CompatibilityComparison = ({ friend, onClose }) => {
  if (!friend) return null;

  const mockUserRadar = {
    labels: ["Drama", "Sci-Fi", "Mystery", "Romance", "Thriller", "Animation", "Fantasy"],
    values: [85, 95, 75, 60, 80, 50, 65],
  };

  const mockFriendRadar = {
    labels: ["Drama", "Sci-Fi", "Mystery", "Romance", "Thriller", "Animation", "Fantasy"],
    values: [70, 90, 85, 50, 75, 40, 55],
  };

  return (
    <div className="space-y-8 font-sans select-none text-left">
      {/* Back link */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground pl-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Friends
        </Button>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary fill-current" />
          Taste Comparison
        </h2>
        <p className="text-xs text-muted-foreground">
          Comparing your cinematic coordinates with {friend.name}'s Taste DNA.
        </p>
      </div>

      {/* Summary Row */}
      <Card className="border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between text-left">
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-lg text-foreground">
              You & {friend.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              You have a high degree of overlap, especially in speculative fiction and slower narratives. Your biggest differences lie in thrillers and character dramas.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Overall Match
              </span>
              <span className="text-xs text-primary font-bold">Excellent Pairing</span>
            </div>
            <CompatibilityMeter value={friend.compatibility} size={85} strokeWidth={5.5} />
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* User DNA */}
        <Card className="border-border/40">
          <CardContent className="p-6 flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-4 self-start">
              Your Taste DNA
            </span>
            <div className="w-full max-w-[260px]">
              <TasteDNAChart data={mockUserRadar} />
            </div>
          </CardContent>
        </Card>

        {/* Friend DNA */}
        <Card className="border-border/40">
          <CardContent className="p-6 flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-4 self-start">
              {friend.name}'s Taste DNA
            </span>
            <div className="w-full max-w-[260px]">
              <TasteDNAChart data={mockFriendRadar} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shared Favorites, Differences & Custom Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Shared favorites */}
        <Card className="border-border/40">
          <CardHeader className="border-b border-border/10 pb-4">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              Shared Favorites
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex flex-wrap gap-2">
              {friend.shared.map((f) => (
                <Badge key={f} variant="primary" className="text-[10px] px-2 py-0.5">
                  {f}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Taste Differences */}
        <Card className="border-border/40">
          <CardHeader className="border-b border-border/10 pb-4">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-secondary" />
              Taste Differences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Your Preference
              </span>
              <p className="text-xs text-foreground font-semibold">Atmospheric Psychological Thrillers</p>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                {friend.name}'s Preference
              </span>
              <p className="text-xs text-foreground font-semibold">Action Adventures & Sci-Fi Epics</p>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations to watch together */}
        <Card className="border-border/40">
          <CardHeader className="border-b border-border/10 pb-4">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              Co-Watching Picks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Blade Runner 2049</span>
                <span className="text-[9px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground font-bold">95% Match</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Interstellar</span>
                <span className="text-[9px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground font-bold">93% Match</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default CompatibilityComparison;
export { CompatibilityComparison };
