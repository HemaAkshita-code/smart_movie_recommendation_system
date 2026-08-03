import React from "react";
import { cn } from "../../utils/helpers";

const Tabs = ({ children, defaultValue, className }) => {
  const [activeValue, setActiveValue] = React.useState(defaultValue);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return React.cloneElement(child, { activeValue, setActiveValue });
      })}
    </div>
  );
};

const TabsList = ({ children, activeValue, setActiveValue, className }) => {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-btn bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return React.cloneElement(child, { activeValue, setActiveValue });
      })}
    </div>
  );
};

const TabsTrigger = ({
  value,
  children,
  activeValue,
  setActiveValue,
  className,
}) => {
  const isActive = activeValue === value;
  return (
    <button
      onClick={() => setActiveValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-btn px-4 py-1.5 text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none",
        isActive
          ? "bg-card text-foreground shadow-sm"
          : "hover:text-foreground hover:bg-muted/40",
        className
      )}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, activeValue, className }) => {
  if (activeValue !== value) return null;
  return (
    <div
      className={cn(
        "focus-visible:outline-none animate-in fade-in-50 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tabs;
export { Tabs, TabsList, TabsTrigger, TabsContent };
