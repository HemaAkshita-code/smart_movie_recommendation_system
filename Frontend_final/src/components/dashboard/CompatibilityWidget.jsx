import React from "react";
import { Link } from "react-router-dom";
import Card, { CardHeader, CardTitle, CardContent } from "../ui/card";
import CompatibilityMeter from "../recommendation/CompatibilityMeter";
import Avatar from "../ui/avatar";
import { Users, ArrowRight } from "lucide-react";

const CompatibilityWidget = ({ snapshot }) => {
  const defaultSnapshot = {
    friendName: "Alex",
    compatibilityScore: 96,
    sharedFavorites: ["Interstellar", "Arrival", "Her"],
    biggestDifference: {
      userPref: "psychological thrillers",
      friendPref: "action adventures",
    },
  };

  const data = snapshot || defaultSnapshot;

  return (
    <Card className="border-border/40 h-full font-sans text-left shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-primary" />
          Compatibility Snapshot
        </CardTitle>
        <Link
          to="/friends"
          className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
        >
          Compare Taste
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Avatars & CompatibilityMeter */}
        <div className="flex items-center justify-between gap-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar fallback="Y" className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary font-bold" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background flex items-center justify-center text-[8px] font-bold text-muted-foreground border border-border/45">
                Me
              </div>
            </div>
            <span className="text-xs text-muted-foreground/60">&</span>
            <div className="relative">
              <Avatar fallback="A" className="w-10 h-10 bg-secondary/10 border border-secondary/20 text-secondary font-bold" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background flex items-center justify-center text-[8px] font-bold text-muted-foreground border border-border/45">
                {data.friendName[0]}
              </div>
            </div>
            <div className="ml-1">
              <span className="text-xs font-semibold block text-foreground">You & {data.friendName}</span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">High Compatibility</span>
            </div>
          </div>

          <CompatibilityMeter value={data.compatibilityScore} size={80} strokeWidth={5} />
        </div>

        {/* Details list */}
        <div className="space-y-4 pt-2 border-t border-border/10">
          {/* Shared favorites */}
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
              Shared Favorites
            </span>
            <p className="text-xs text-foreground font-medium">
              {data.sharedFavorites.join(", ")}
            </p>
          </div>

          {/* Differences */}
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
              Taste Difference
            </span>
            <p className="text-[11px] text-muted-foreground leading-normal font-sans pt-0.5">
              You enjoy <span className="text-foreground font-semibold">{data.biggestDifference.userPref}</span>, while {data.friendName} prefers <span className="text-foreground font-semibold">{data.biggestDifference.friendPref}</span>.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default CompatibilityWidget;
export { CompatibilityWidget };
