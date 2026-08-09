import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, MessageSquare } from "lucide-react";
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
import MovieCarousel from "../../components/movie/MovieCarousel";

import { mapMovieToFrontend } from "../../redux/discover/discoverSlice";
import { addToWatchlist, removeFromWatchlist } from "../../redux/watchlist/watchlistSlice";
import { saveNote, saveRating, addHistoryItem } from "../../redux/library/librarySlice";
import { fetchReviewsForMovie, fetchAverageRating, submitReview } from "../../redux/reviews/reviewSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const discoverMovies = useSelector((state) => state.discover.movies);
  const watchlistItems = useSelector((state) => state.watchlist.items);
  const { notes, ratings } = useSelector((state) => state.library);
  const reviewsList = useSelector((state) => state.reviews.list);

  const [activeMovie, setActiveMovie] = useState(null);
  const [isRateOpen, setIsRateOpen] = useState(false);

  // Load single movie
  useEffect(() => {
    const found = discoverMovies.find((m) => m.id === id || m._id === id);
    if (found) {
      setActiveMovie(found);
    } else {
      import("../../lib/axios").then(({ default: api }) => {
        api.get(`/movies/${id}`)
          .then((res) => {
            const mapped = mapMovieToFrontend(res.data);
            setActiveMovie(mapped);
          })
          .catch((err) => {
            console.error("Failed to fetch movie from backend", err);
          });
      });
    }
  }, [id, discoverMovies]);

  // Load reviews when movie is set
  useEffect(() => {
    if (activeMovie) {
      const mid = activeMovie._id || activeMovie.id;
      dispatch(fetchReviewsForMovie(mid));
      dispatch(fetchAverageRating(mid));
    }
  }, [dispatch, activeMovie]);

  const movie = activeMovie;

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-sm text-muted-foreground font-sans">
        Loading film coordinates...
      </div>
    );
  }

  const isWatchlisted = watchlistItems.some((item) => item.movie && (item.movie._id === movie._id || item.movie.id === movie.id));
  const isWatched = watchlistItems.some((item) => item.movie && (item.movie._id === movie._id || item.movie.id === movie.id) && item.status === "completed");

  const handleToggleWatchlist = () => {
    if (!currentUser) {
      alert("Please sign in to update your watchlist.");
      return;
    }
    const mid = movie._id || movie.id;
    if (isWatchlisted) {
      const entry = watchlistItems.find((item) => item.movie && (item.movie._id === movie._id || item.movie.id === movie.id));
      if (entry) {
        dispatch(removeFromWatchlist(entry._id || entry.id));
      }
    } else {
      dispatch(
        addToWatchlist({
          userId: currentUser._id,
          movieId: mid,
          status: "want to watch",
        })
      );
      dispatch(
        addHistoryItem({
          type: "watchlist",
          movieTitle: movie.title,
          detail: "Added to Watchlist",
          genre: movie.genres ? movie.genres[0] : "",
        })
      );
    }
  };

  const handleToggleWatched = () => {
    if (!currentUser) {
      alert("Please sign in to update watch status.");
      return;
    }
    const mid = movie._id || movie.id;
    const entry = watchlistItems.find((item) => item.movie && (item.movie._id === movie._id || item.movie.id === movie.id));
    if (entry) {
      dispatch(addToWatchlist({
        userId: currentUser._id,
        movieId: mid,
        status: "completed"
      }));
    } else {
      dispatch(
        addToWatchlist({
          userId: currentUser._id,
          movieId: mid,
          status: "completed",
        })
      );
    }
    alert(`Marked "${movie.title}" as Watched!`);
  };

  const handleSaveNote = (text) => {
    const mid = movie._id || movie.id;
    dispatch(saveNote({ movieId: mid, note: text }));
  };

  const handleSaveRating = (stars) => {
    const mid = movie._id || movie.id;
    dispatch(saveRating({ movieId: mid, rating: stars }));
    dispatch(
      addHistoryItem({
        type: "rating",
        movieTitle: movie.title,
        detail: `Rated ${stars}.0 Stars`,
        genre: movie.genres ? movie.genres[0] : "",
      })
    );
  };

  const handleAddReview = (reviewText) => {
    if (!currentUser) {
      alert("Please sign in to post reviews.");
      return;
    }
    const mid = movie._id || movie.id;
    const rating = ratings[mid] || 5;
    dispatch(
      submitReview({
        userId: currentUser._id,
        movieId: mid,
        rating,
        reviewText,
        isSpoiler: false,
      })
    );
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
          <MovieCarousel title="Similar Curations" movies={discoverMovies.filter((m) => (m._id || m.id) !== (movie._id || movie.id))} />

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
              {reviewsList.map((rev) => (
                <ReviewCard
                  key={rev._id || rev.id}
                  authorName={rev.user ? (rev.user.name || rev.user.username || "User") : "Anonymous"}
                  rating={rev.rating}
                  content={rev.reviewText || rev.content}
                  createdAt={rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : "Just now"}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Right Side notes (4 columns) */}
        <div className="lg:col-span-4 space-y-8 sticky top-20">
          <NotesPanel
            initialNote={notes[movie._id || movie.id] || ""}
            onSave={handleSaveNote}
          />
        </div>

      </div>

      {/* Star ratings modal popup overlay */}
      <RatingDialog
        isOpen={isRateOpen}
        initialRating={ratings[movie._id || movie.id] || 0}
        onClose={() => setIsRateOpen(false)}
        onSave={handleSaveRating}
      />

    </div>
  );
};

export default MovieDetails;
export { MovieDetails };
