import React, { useState } from "react";
import { cn } from "../../utils/helpers";

const MoviePoster = ({ src, alt, title, className, ...props }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-poster bg-gradient-to-tr from-muted/70 to-muted/40 border border-border/10 shadow-elevation-1 transition-all duration-300 hover:shadow-elevation-2 hover:-translate-y-1 hover:brightness-105 group select-none cursor-pointer flex flex-col justify-end p-4",
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || title || "Movie Poster"}
          onError={() => setHasError(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-primary/5 via-muted to-muted/65">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="w-10 h-10 text-muted-foreground/45 mb-2"
          >
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
          <span className="font-heading font-semibold text-xs text-foreground/80 leading-tight">
            {title || "Untitled"}
          </span>
        </div>
      )}
      
      {/* Editorial Overlay detail when image loaded */}
      {src && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
          <h4 className="font-heading font-bold text-xs text-white leading-tight">
            {title}
          </h4>
        </div>
      )}
    </div>
  );
};

export default MoviePoster;
export { MoviePoster };
