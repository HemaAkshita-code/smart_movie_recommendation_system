import React from "react";
import { Play } from "lucide-react";
import MoviePoster from "../movie/MoviePoster";
import Button from "../ui/button";

const ContinueWatching = ({ movies = [] }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-4 text-left font-sans select-none">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        Continue Watching
      </h3>
      
      {/* Horizontal Carousel */}
      <div className="flex gap-6 overflow-x-auto scrollbar-none pb-2 select-none">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[140px] sm:w-[170px] flex-shrink-0 space-y-3 group relative">
            
            {/* Poster cover */}
            <div className="relative">
              <MoviePoster title={movie.title} src={movie.posterPath} />
              
              {/* Play overlay button on poster hover */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-poster">
                <Button variant="primary" size="sm" className="rounded-full p-2 h-9 w-9 flex items-center justify-center">
                  <Play className="w-4.5 h-4.5 fill-current" />
                </Button>
              </div>
            </div>

            {/* Title & Info */}
            <div className="space-y-1 px-1">
              <h4 className="font-semibold text-xs text-foreground truncate block">
                {movie.title}
              </h4>
              
              {/* Remaining runtime */}
              <span className="text-[10px] text-muted-foreground block">
                {movie.remainingTime}
              </span>

              {/* Progress bar */}
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1.5">
                <div
                  style={{ width: `${movie.progress}%` }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
export { ContinueWatching };
