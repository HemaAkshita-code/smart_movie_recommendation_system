import React, { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { Sparkles } from "lucide-react";

const AIRecommendationBox = ({ onGenerate }) => {
  const [query, setQuery] = useState("");
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedPacing, setSelectedPacing] = useState("any");

  const moods = ["Melancholic", "Cerebral", "Atmospheric", "Intense", "Whimsical", "Pensive"];

  const toggleMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate({ query, selectedMoods, selectedPacing });
    }
  };

  return (
    <div className="p-6 bg-card rounded-card border border-border/40 space-y-6 text-left shadow-elevation-1 font-sans">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-heading font-semibold text-base text-foreground">
          What vibe are you looking for?
        </h3>
      </div>

      <div className="space-y-4">
        {/* Text Query Input */}
        <Input
          placeholder="E.g., A slow-burn sci-fi with philosophical themes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Mood Chips Selection */}
        <div className="space-y-2">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">
            Select Moods
          </span>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => {
              const isSelected = selectedMoods.includes(mood);
              return (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors focus:outline-none ${
                    isSelected
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-transparent text-muted-foreground border-border/40 hover:bg-muted/40"
                  }`}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pacing Controls */}
        <div className="space-y-2">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">
            Pacing
          </span>
          <div className="flex gap-2">
            {["any", "Slow Burn", "Fast Paced"].map((pacing) => (
              <button
                key={pacing}
                onClick={() => setSelectedPacing(pacing)}
                className={`px-4 py-1.5 rounded-btn text-xs font-semibold border transition-colors focus:outline-none ${
                  selectedPacing === pacing
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border/40 hover:bg-muted/40"
                }`}
              >
                {pacing}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Trigger */}
        <Button variant="primary" className="w-full gap-2 mt-4" onClick={handleGenerate}>
          <Sparkles className="w-4 h-4 fill-current" />
          Find Matching Films
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendationBox;
export { AIRecommendationBox };
