import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { cn } from "../../utils/helpers";

const HelpfulVote = ({ initialCount = 0, onVote }) => {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (voted) {
      setCount((prev) => prev - 1);
      setVoted(false);
      if (onVote) onVote(false);
    } else {
      setCount((prev) => prev + 1);
      setVoted(true);
      if (onVote) onVote(true);
    }
  };

  return (
    <button
      onClick={handleVote}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border transition-all focus:outline-none",
        voted
          ? "bg-primary/10 text-primary border-primary/30"
          : "bg-transparent text-muted-foreground border-border/40 hover:bg-muted/40"
      )}
      aria-label={`${count} people found this review helpful. Vote helpful.`}
      aria-pressed={voted}
    >
      <ThumbsUp className={cn("w-3.5 h-3.5", voted && "fill-current")} />
      <span>Helpful ({count})</span>
    </button>
  );
};

export default HelpfulVote;
export { HelpfulVote };
