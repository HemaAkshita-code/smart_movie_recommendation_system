import React from "react";
import Input from "../ui/input";
import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, onClear, placeholder = "Search movies, directors, themes..." }) => {
  return (
    <div className="relative w-full font-sans select-none">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
        <Search className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 pr-10 h-11"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Clear search input"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
export { SearchBar };
