import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/helpers";

const Sheet = ({ isOpen, onClose, children, side = "right", className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sideStyles = {
    right: "right-0 h-full w-full max-w-sm border-l animate-in slide-in-from-right",
    left: "left-0 h-full w-full max-w-sm border-r animate-in slide-in-from-left",
    bottom: "bottom-0 w-full h-[50vh] border-t animate-in slide-in-from-bottom",
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content Panel */}
      <div
        className={cn(
          "fixed bg-card p-6 border-border/40 shadow-elevation-3 transition-transform focus:outline-none flex flex-col",
          sideStyles[side],
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-btn p-1 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all focus:outline-none"
          aria-label="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex-grow overflow-y-auto mt-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Sheet;
export { Sheet };
