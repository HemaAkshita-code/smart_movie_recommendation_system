import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/helpers";

const Dropdown = ({ trigger, children, align = "right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            "absolute z-30 mt-2 w-56 rounded-dropdown bg-card p-1.5 border border-border/40 shadow-elevation-2 focus:outline-none animate-in fade-in slide-in-from-top-1 duration-100",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center rounded-btn px-3 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors text-left focus:outline-none",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Dropdown;
export { Dropdown };
