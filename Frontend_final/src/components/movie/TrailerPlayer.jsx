import React, { useState } from "react";
import { Play, Loader } from "lucide-react";
import { cn } from "../../utils/helpers";

const TrailerPlayer = ({ youtubeId, title, backdropPath }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-container overflow-hidden bg-slate-950 border border-border/40 shadow-elevation-2 flex items-center justify-center">
      {isPlaying && youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title || "Movie Trailer"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-none"
        />
      ) : (
        <>
          {/* Cover image backdrop */}
          {backdropPath && (
            <img
              src={backdropPath}
              alt={title || "Trailer Cover"}
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
          )}

          {/* Overlay Darkener */}
          <div className="absolute inset-0 bg-black/40 hover:bg-black/55 transition-colors duration-200" />

          {/* Center Play trigger */}
          <button
            onClick={() => youtubeId && setIsPlaying(true)}
            className="z-10 p-5 rounded-full bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all focus:outline-none shadow-elevation-3 flex items-center justify-center"
            aria-label="Play trailer"
            disabled={!youtubeId}
          >
            <Play className="w-6 h-6 fill-current" />
          </button>
        </>
      )}
    </div>
  );
};

export default TrailerPlayer;
export { TrailerPlayer };
