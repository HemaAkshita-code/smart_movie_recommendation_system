import React from "react";
import { Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-btn bg-muted hover:bg-muted/80 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" strokeWidth={1.5} />
      ) : (
        <Sun className="w-5 h-5" strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;
