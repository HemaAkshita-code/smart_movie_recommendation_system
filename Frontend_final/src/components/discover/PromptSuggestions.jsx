import React from "react";

const SUGGESTIONS = [
  "Mind-bending Sci-Fi",
  "Movies Like Dune",
  "Emotional Dramas",
  "Weekend Comedy",
  "Oscar Winners",
  "Hidden Gems",
  "Psychological Thrillers",
  "Female Directors",
];

const PromptSuggestions = ({ onSelect }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-2 select-none font-sans text-left">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block pl-1">
        Suggested Prompts
      </span>
      <div className="flex flex-wrap gap-2 pt-1">
        {SUGGESTIONS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect && onSelect(item)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-border/40 text-muted-foreground bg-card hover:bg-muted/40 hover:text-foreground transition-all focus:outline-none"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
export { PromptSuggestions };
