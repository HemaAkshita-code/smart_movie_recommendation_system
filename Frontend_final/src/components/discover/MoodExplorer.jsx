import React from "react";
import { Sparkles } from "lucide-react";

const MOODS = [
  "Feel Good", "Emotional", "Dark", "Hopeful", "Inspiring",
  "Mind-Bending", "Relaxing", "Intense", "Suspenseful"
];

const MoodExplorer = ({ selectedMoods = [], onToggle }) => {
  return (
    <div className="space-y-4 font-sans select-none text-left">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        Curate by Mood
      </h3>

      <div className="flex flex-wrap gap-2.5 pt-1">
        {MOODS.map((mood) => {
          const isSelected = selectedMoods.includes(mood);
          return (
            <button
              key={mood}
              type="button"
              onClick={() => onToggle && onToggle(mood)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-bold border transition-all duration-200 focus:outline-none flex items-center gap-1.5 ${
                isSelected
                  ? "bg-secondary text-secondary-foreground border-secondary shadow-elevation-1 scale-[1.02]"
                  : "bg-muted/30 text-muted-foreground border-border/40 hover:bg-muted/65 hover:text-foreground"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 fill-current opacity-70" />
              <span>{mood}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodExplorer;
export { MoodExplorer };
