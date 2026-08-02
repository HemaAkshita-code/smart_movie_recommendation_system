import React, { useState } from "react";
import { Search, X, Check } from "lucide-react";
import Input from "../ui/input";
import Badge from "../ui/badge";

const MOCK_DIRECTORS = [
  { id: 1, name: "Christopher Nolan", knownFor: "Sci-Fi, Mind-bending" },
  { id: 2, name: "Denis Villeneuve", knownFor: "Atmospheric, Sci-Fi" },
  { id: 3, name: "Bong Joon-ho", knownFor: "Social Satire, Thriller" },
  { id: 4, name: "Greta Gerwig", knownFor: "Coming-of-age, Drama" },
  { id: 5, name: "Martin Scorsese", knownFor: "Crime, Drama" },
  { id: 6, name: "Hayao Miyazaki", knownFor: "Animation, Fantasy" },
  { id: 7, name: "Wong Kar-wai", knownFor: "Romance, Melancholy" },
  { id: 8, name: "Quentin Tarantino", knownFor: "Stylized Crime, Dialogue" },
  { id: 9, name: "Wes Anderson", knownFor: "Symmetrical, Quirky Comedy" },
  { id: 10, name: "Stanley Kubrick", knownFor: "Philosophical Sci-Fi, Psychological" },
];

const DirectorSelector = ({ selectedDirectors = [], onChange }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredDirectors = query.trim()
    ? MOCK_DIRECTORS.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_DIRECTORS.slice(0, 5);

  const handleSelect = (director) => {
    const isAlreadySelected = selectedDirectors.some((d) => d.id === director.id);
    let newSelection;
    if (isAlreadySelected) {
      newSelection = selectedDirectors.filter((d) => d.id !== director.id);
    } else {
      newSelection = [...selectedDirectors, director];
    }
    onChange(newSelection);
    setQuery("");
  };

  const handleRemove = (directorId) => {
    const newSelection = selectedDirectors.filter((d) => d.id !== directorId);
    onChange(newSelection);
  };

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
          <Search className="w-4 h-4" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search directors..."
          className="pl-10 h-10 w-full"
        />

        {/* Dropdown */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-card border border-border/40 rounded-card shadow-elevation-3 max-h-60 overflow-y-auto divide-y divide-border/10">
            {filteredDirectors.length > 0 ? (
              filteredDirectors.map((director) => {
                const isSelected = selectedDirectors.some((d) => d.id === director.id);
                return (
                  <button
                    key={director.id}
                    type="button"
                    onClick={() => handleSelect(director)}
                    className="w-full flex items-center justify-between p-3 text-sm hover:bg-muted/40 transition-colors text-left"
                  >
                    <div>
                      <span className="font-semibold block text-foreground">
                        {director.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">
                        Known for: {director.knownFor}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-muted-foreground">
                No matching directors found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected list */}
      {selectedDirectors.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Selected Directors ({selectedDirectors.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedDirectors.map((director) => (
              <Badge
                key={director.id}
                variant="primary"
                className="px-3.5 py-1.5 flex items-center gap-1.5"
              >
                <span>{director.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(director.id)}
                  className="hover:text-destructive focus:outline-none"
                  aria-label={`Remove ${director.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorSelector;
export { DirectorSelector };
