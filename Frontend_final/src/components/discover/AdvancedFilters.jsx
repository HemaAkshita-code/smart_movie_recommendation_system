import React, { useState } from "react";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import Card, { CardContent } from "../ui/card";
import Button from "../ui/button";

const AdvancedFilters = ({ activeFilters = {}, onChange, onClearAll }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = {
    releaseYear: ["All", "2020s", "2010s", "2000s", "1990s", "1980s"],
    runtime: ["All", "Under 90m", "90m - 120m", "Over 120m"],
    rating: ["All", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars"],
    language: ["All", "English", "French", "Cantonese", "Japanese", "Korean"],
    platform: ["All", "Netflix", "Prime Video", "MUBI", "Max", "Hulu"],
  };

  const handleSelectChange = (key, value) => {
    if (onChange) {
      onChange({ [key]: value });
    }
  };

  // Check if any filters are active
  const hasActiveFilters = Object.entries(activeFilters).some(
    ([key, val]) => val !== "All" && val !== 0 && val !== ""
  );

  return (
    <div className="space-y-4 font-sans select-none text-left">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2 text-xs font-semibold"
        >
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span>{isOpen ? "Hide Filters" : "Show Filters"}</span>
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </Button>

        {hasActiveFilters && onClearAll && (
          <button
            onClick={onClearAll}
            className="text-xs text-primary hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Collapsible Panel */}
      {isOpen && (
        <Card className="border-border/40 animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            
            {/* Year */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Release Year
              </label>
              <select
                value={activeFilters.releaseYear || "All"}
                onChange={(e) => handleSelectChange("releaseYear", e.target.value)}
                className="w-full bg-card border border-border/40 rounded-btn text-xs p-2 focus:outline-none"
              >
                {filterOptions.releaseYear.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Runtime */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Runtime
              </label>
              <select
                value={activeFilters.runtime || "All"}
                onChange={(e) => handleSelectChange("runtime", e.target.value)}
                className="w-full bg-card border border-border/40 rounded-btn text-xs p-2 focus:outline-none"
              >
                {filterOptions.runtime.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                IMDb Rating
              </label>
              <select
                value={activeFilters.rating || "All"}
                onChange={(e) => handleSelectChange("rating", e.target.value)}
                className="w-full bg-card border border-border/40 rounded-btn text-xs p-2 focus:outline-none"
              >
                {filterOptions.rating.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Language
              </label>
              <select
                value={activeFilters.language || "All"}
                onChange={(e) => handleSelectChange("language", e.target.value)}
                className="w-full bg-card border border-border/40 rounded-btn text-xs p-2 focus:outline-none"
              >
                {filterOptions.language.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Platform */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
                Platform
              </label>
              <select
                value={activeFilters.platform || "All"}
                onChange={(e) => handleSelectChange("platform", e.target.value)}
                className="w-full bg-card border border-border/40 rounded-btn text-xs p-2 focus:outline-none"
              >
                {filterOptions.platform.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

          </CardContent>
        </Card>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-1.5">
          {Object.entries(activeFilters).map(([key, val]) => {
            if (val === "All" || val === 0 || val === "") return null;
            return (
              <div
                key={key}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border/40 text-[10px] font-bold text-muted-foreground"
              >
                <span className="capitalize">{key.replace("releaseYear", "year")}: {val}</span>
                <button
                  onClick={() => handleSelectChange(key, "All")}
                  className="hover:text-destructive focus:outline-none"
                  aria-label={`Remove filter for ${key}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
export { AdvancedFilters };
