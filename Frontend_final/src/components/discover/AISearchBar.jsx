import React, { useState, useEffect } from "react";
import { Search, Sparkles } from "lucide-react";
import Input from "../ui/input";
import Button from "../ui/button";

const PLACEHOLDERS = [
  "I want emotional sci-fi movies like Interstellar...",
  "Recommend dark psychological thrillers...",
  "Movies with stunning cinematography...",
  "Feel-good coming-of-age stories...",
  "Slow-burning mysteries...",
  "Films similar to Her...",
];

const AISearchBar = ({ value, onChange, onSubmit }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4 font-sans select-none">
      <div className="relative flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
            <Search className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={PLACEHOLDERS[placeholderIndex]}
            className="pl-11 h-12 w-full pr-4 text-sm rounded-full bg-card hover:bg-card border-border/40 focus:border-primary/50"
          />
        </div>
        <Button type="submit" variant="primary" className="h-12 px-6 rounded-full shrink-0 flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 fill-current" />
          <span>Curate List</span>
        </Button>
      </div>
    </form>
  );
};

export default AISearchBar;
export { AISearchBar };
