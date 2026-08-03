import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/helpers";

const MovieCarousel = ({ title, movies, className }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollOffset = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollOffset : scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className={cn("space-y-4 relative group", className)}>
      {/* Title */}
      {title && (
        <div className="flex items-center justify-between px-1">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {title}
          </h3>
          
          {/* Slider triggers (Desktop only) */}
          <div className="hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => scroll("left")}
              className="p-1 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-all focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-all focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-2 select-none"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-[140px] sm:w-[170px] flex-shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
export { MovieCarousel };
