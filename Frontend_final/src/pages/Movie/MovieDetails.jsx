import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Sparkles, MessageSquare } from "lucide-react";
import Button from "../../components/ui/button";

import MovieHero from "../../components/movie/MovieHero";
import AIExplanationCard from "../../components/movie/AIExplanationCard";
import CastCarousel from "../../components/movie/CastCarousel";
import StreamingProviders from "../../components/movie/StreamingProviders";
import NotesPanel from "../../components/movie/NotesPanel";
import RatingDialog from "../../components/movie/RatingDialog";
import TrailerPlayer from "../../components/movie/TrailerPlayer";
import ReviewCard from "../../components/review/ReviewCard";
import ReviewEditor from "../../components/review/ReviewEditor";
import EmptyState from "../../components/common/EmptyState";
import MovieCarousel from "../../components/movie/MovieCarousel";

import { MOCK_DB } from "../../redux/discover/discoverSlice";
import { addToWatchlist, removeFromWatchlist } from "../../redux/watchlist/watchlistSlice";
import { saveNote, saveRating, addHistoryItem } from "../../redux/library/librarySlice";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const watchlistItems = useSelector((state) => state.watchlist.items);
  const { notes, ratings } = useSelector((state) => state.library);

  const [isRateOpen, setIsRateOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Julian G.",
      rating: 4.8,
      content: "A masterclass in contemplative, slow-paced science fiction. Denis Villeneuve crafts a gorgeous visual journey that stays with you long after the credits roll.",
      createdAt: "2 weeks ago",
    },
  ]);

  // Find film from mock database
  const filmId = parseInt(id) || 1;
  const movie = MOCK_DB.find((m) => m.id === filmId) || MOCK_DB[0];

  const isWatchlisted = watchlistItems.some((item) => item._id === movie.id);
  const isWatched = watchlistItems.some((item) => item._id === movie.id && item.status === "completed");

  const currentUser = useSelector((state) => state.auth.user);

const handleToggleWatchlist = () => {
  if (isWatchlisted) {
    dispatch(removeFromWatchlist(movie.id));
  } else {
    dispatch(addToWatchlist({ userId: currentUser?._id, movieId: movie.id, status: "want to watch" }));
    dispatch(
      addHistoryItem({
        type: "watchlist",
        movieTitle: movie.title,
        detail: "Added to Watchlist",
        genre: movie.genres[0],
      })
    );
  }
};

  const handleToggleWatched = () => {
    // Add logic or status updates
    alert(`Marked "${movie.title}" as Watched!`);
  };

  const handleSaveNote = (text) => {
    dispatch(saveNote({ movieId: movie.id, note: text }));
  };

  const handleSaveRating = (stars) => {
    dispatch(saveRating({ movieId: movie.id, rating: stars }));
    dispatch(
      addHistoryItem({
        type: "rating",
        movieTitle: movie.title,
        detail: `Rated ${stars}.0 Stars`,
        genre: movie.genres[0],
      })
    );
  };

  const handleAddReview = (reviewText) => {
    const newRev = {
      id: Date.now(),
      author: "You",
      rating: ratings[movie.id] || 4.5,
      content: reviewText,
      createdAt: "Just now",
    };
    setReviews([newRev, ...reviews]);
  };

  return (
    <div className="space-y-10 font-sans select-none pb-12 text-left">
      {/* Back button link */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground pl-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Button>
      </div>

      {/* 1. Hero Block */}
      <MovieHero
        movie={movie}
        isWatchlisted={isWatchlisted}
        isWatched={isWatched}
        onToggleWatchlist={handleToggleWatchlist}
        onToggleWatched={handleToggleWatched}
        onOpenRateDialog={() => setIsRateOpen(true)}
        onShare={() => alert("Share link copied to clipboard.")}
      />

      {/* Grid details layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side detail specs (8 columns) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* 2. AI Explanation Curator banner */}
          <AIExplanationCard
            explanation={movie.aiExplanation}
            confidenceScore={movie.matchScore}
          />

          {/* 3. Overview Synopsis text */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60">
              Synopsis
            </h3>
            <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-sans pr-2">
              {movie.synopsis}
            </p>
          </div>

          {/* 4. Horizontal scrolling cast */}
          <CastCarousel cast={movie.cast} director={movie.director} writers={["Cynthia K."]} />

          {/* 5. Trailer clip player placeholder */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60">
              Trailer
            </h3>
            <TrailerPlayer videoId="gCcx85zLyR4" title={movie.title} />
          </div>

          {/* 6. Branded streaming availability lists */}
          <StreamingProviders providers={movie.platforms} />

          {/* 7. Similar movie suggestions carousel */}
          <MovieCarousel title="Similar Curations" movies={MOCK_DB.filter((m) => m.id !== movie.id)} />

          {/* 8. User reviews & ReviewComposer */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 flex items-center gap-1.5 border-b border-border/10 pb-3">
              <MessageSquare className="w-4.5 h-4.5 text-primary" />
              Community Reviews
            </h3>

            {/* Form editor composer */}
            <ReviewEditor onSubmit={handleAddReview} buttonText="Post Review" />

            {/* List entries */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <ReviewCard
                  key={rev.id}
                  authorName={rev.author}
                  rating={rev.rating}
                  content={rev.content}
                  createdAt={rev.createdAt}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Right Side notes (4 columns) */}
        <div className="lg:col-span-4 space-y-8 sticky top-20">
          <NotesPanel
            initialNote={notes[movie.id] || ""}
            onSave={handleSaveNote}
          />
        </div>

      </div>

      {/* Star ratings modal popup overlay */}
      <RatingDialog
        isOpen={isRateOpen}
        initialRating={ratings[movie.id] || 0}
        onClose={() => setIsRateOpen(false)}
        onSave={handleSaveRating}
      />

    </div>
  );
};

export default MovieDetails;
export { MovieDetails };
