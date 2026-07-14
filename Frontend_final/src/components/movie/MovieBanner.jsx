import React from "react";
import CompatibilityScore from "./CompatibilityScore";
import RatingStars from "./RatingStars";
import GenreBadge from "./GenreBadge";
import Button from "../ui/button";
import { Play, Bookmark } from "lucide-react";

const MovieBanner = ({ movie }) => {
  const { title, backdropPath, posterPath, releaseYear, duration, matchScore, rating, genres, overview } = movie;

  return (
    <div className="relative w-full min-h-[400px] md:h-[480px] bg-gradient-to-tr from-slate-950 via-slate-900 to-zinc-950 rounded-container overflow-hidden border border-border/10 flex flex-col justify-end p-6 md:p-12 shadow-elevation-3">
      {/* Background Image Overlay */}
      {backdropPath && (
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-35"
          style={{ backgroundImage: `url(${backdropPath})` }}
        />
      )}
      
      {/* Ambient color gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent pointer-events-none" />

      {/* Banner Content Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        {/* Left Side: Small Poster (Hidden on mobile) */}
        {posterPath && (
          <div className="hidden md:block md:col-span-3 aspect-[2/3] w-full max-w-[200px] rounded-poster overflow-hidden border border-white/10 shadow-elevation-2">
            <img src={posterPath} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Right Side: Details */}
        <div className="md:col-span-9 space-y-4 text-left">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3">
            {matchScore && <CompatibilityScore score={matchScore} className="text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/35" />}
            {genres && genres.slice(0, 3).map((g) => <GenreBadge key={g} genre={g} />)}
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight leading-none">
            {title}
          </h2>

          {/* Meta specs */}
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span>{releaseYear}</span>
            <span>&bull;</span>
            <span>{duration || "N/A"}</span>
            {rating && (
              <>
                <span>&bull;</span>
                <RatingStars rating={rating} />
              </>
            )}
          </div>

          {/* Overview summary */}
          {overview && (
            <p className="text-white/80 text-sm max-w-xl leading-relaxed line-clamp-3">
              {overview}
            </p>
          )}

          {/* CTA actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" size="sm" className="gap-2">
              <Play className="w-4 h-4 fill-current" />
              Watch Trailer
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 gap-2">
              <Bookmark className="w-4 h-4" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
export { MovieBanner };
