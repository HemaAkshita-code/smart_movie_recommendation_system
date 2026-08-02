import React from "react";
import Card, { CardContent } from "../ui/card";
import GenreBadge from "../movie/GenreBadge";
import MoviePoster from "../movie/MoviePoster";
import Button from "../ui/button";
import { Sparkles, Bookmark, Star } from "lucide-react";

const EditorsPicks = ({ movie, onMovieClick, onAddToWatchlist }) => {
  const defaultPick = {
    id: 2,
    title: "In the Mood for Love",
    releaseYear: 2000,
    duration: "1h 38m",
    rating: 4.8,
    genres: ["Romance", "Drama"],
    matchScore: 89,
    director: "Wong Kar-wai",
    platforms: ["MUBI", "Criterion Channel"],
    synopsis: "Two neighbors form a strong bond after suspecting their respective spouses of extramarital activities.",
    aiExplanation: "Every week our AI curates a small collection of films that perfectly align with your evolving Taste DNA. For this week, Wong Kar-wai's masterpiece In the Mood for Love has been selected due to its gorgeous color grading, restraint, and melancholic romance themes which represent 89% compatibility with your recent reviews.",
  };

  const data = movie || defaultPick;

  return (
    <div className="space-y-4 text-left font-sans select-none">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        Editor's Picks
      </h3>

      <Card className="border-border/40 hover:shadow-elevation-1 transition-shadow duration-300">
        <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Large Poster */}
          <div className="md:col-span-4 max-w-[200px] mx-auto md:mx-0 shadow-elevation-2">
            <MoviePoster title={data.title} src={data.posterPath} />
          </div>

          {/* Right Side: Editorial text copy */}
          <div className="md:col-span-8 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full">
                <Sparkles className="w-3 h-3 fill-current" />
                Featured Curation
              </span>
              <span className="text-xs font-semibold text-secondary">{data.matchScore}% Match</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                {data.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{data.director}</span>
                <span>&bull;</span>
                <span>{data.releaseYear}</span>
                <span>&bull;</span>
                <div className="flex items-center gap-0.5 text-primary">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{data.rating}</span>
                </div>
              </div>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {data.aiExplanation}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={() => onAddToWatchlist && onAddToWatchlist(data)}
                size="sm"
                className="gap-2"
              >
                <Bookmark className="w-4 h-4 fill-current" />
                Add to Watchlist
              </Button>
              <Button
                variant="outline"
                onClick={() => onMovieClick && onMovieClick(data)}
                size="sm"
                className="text-xs"
              >
                Curator details
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default EditorsPicks;
export { EditorsPicks };
