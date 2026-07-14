import React from "react";
import Spinner from "../ui/spinner";
import { cn } from "../../utils/helpers";

const Loader = ({ fullPage = false, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-8",
        fullPage && "fixed inset-0 z-50 bg-background/85 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner className="w-8 h-8 text-primary" strokeWidth={3} />
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Loading CineCompass
        </span>
      </div>
    </div>
  );
};

export default Loader;
export { Loader };
