import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/helpers";

const SpoilerTag = ({ children, className }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={cn("relative rounded-btn overflow-hidden font-sans", className)}>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-muted/40 hover:bg-muted/65 border border-border/40 text-muted-foreground hover:text-foreground text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none"
          aria-label="Reveal spoiler content"
        >
          <EyeOff className="w-4 h-4" />
          Review contains spoilers. Click to reveal.
        </button>
      ) : (
        <div className="relative border border-destructive/20 bg-destructive/5 p-4 rounded-btn animate-in fade-in duration-200">
          <button
            onClick={() => setRevealed(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-1 rounded-btn hover:bg-muted/40 transition-colors focus:outline-none"
            aria-label="Hide spoiler content"
          >
            <Eye className="w-4 h-4" />
          </button>
          <div className="pr-6 text-sm">{children}</div>
        </div>
      )}
    </div>
  );
};

export default SpoilerTag;
export { SpoilerTag };
