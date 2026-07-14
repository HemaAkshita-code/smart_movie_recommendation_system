import React from "react";
import { Sparkles } from "lucide-react";

const MatchReasons = ({ reasons }) => {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="space-y-2">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary flex items-center gap-1">
        <Sparkles className="w-3 h-3" />
        Curator Match Highlights
      </span>
      <ul className="space-y-1.5 pl-1 text-xs text-muted-foreground leading-relaxed font-sans list-none">
        {reasons.slice(0, 3).map((reason, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-primary/70 mt-1 flex-shrink-0">&bull;</span>
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchReasons;
export { MatchReasons };
