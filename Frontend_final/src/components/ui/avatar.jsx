import React from "react";
import { cn } from "../../utils/helpers";

const Avatar = ({ src, alt, fallback, className, ...props }) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted border border-border/10 select-none items-center justify-center",
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="font-heading font-semibold text-sm text-muted-foreground uppercase">
          {fallback || "?"}
        </span>
      )}
    </div>
  );
};

export default Avatar;
export { Avatar };
