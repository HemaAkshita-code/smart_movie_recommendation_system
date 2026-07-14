import React from "react";
import { cn } from "../../utils/helpers";

const Separator = ({ className, orientation = "horizontal", ...props }) => {
  return (
    <div
      className={cn(
        "shrink-0 bg-border/40",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
};

export default Separator;
export { Separator };
