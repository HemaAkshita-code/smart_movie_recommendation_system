import React, { useState } from "react";
import { cn } from "../../utils/helpers";

const Tooltip = ({ content, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-40 px-3 py-1.5 text-xs bg-popover text-popover-foreground rounded-btn shadow-elevation-4 border border-border/40 bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap animate-in fade-in zoom-in-95 duration-100",
            className
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
export { Tooltip };
