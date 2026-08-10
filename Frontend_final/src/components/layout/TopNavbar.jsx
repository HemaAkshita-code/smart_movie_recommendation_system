import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";
import ThemeToggle from "../common/ThemeToggle";
import Input from "../ui/input";

const TopNavbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/10 h-20 px-8 flex items-center justify-between">
      
      {/* Search form bar */}
      <form onSubmit={handleSearchSubmit} className="w-full max-w-xs relative font-sans">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <Search className="w-4 h-4" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Global film search..."
          className="pl-9 h-9 w-full rounded-full bg-muted/40 hover:bg-muted/60 border-border/40 focus:border-primary/50 text-xs"
        />
      </form>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationBell />
        
        {/* Vertical divider */}
        <div className="h-5 w-[1px] bg-border/20" />

        {/* User avatar menu */}
        <UserMenu userName="Ria" />
      </div>

    </header>
  );
};

export default TopNavbar;
export { TopNavbar };
