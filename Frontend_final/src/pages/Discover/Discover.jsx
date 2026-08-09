import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import AISearchBar from "../../components/discover/AISearchBar";
import PromptSuggestions from "../../components/discover/PromptSuggestions";
import GenreExplorer from "../../components/discover/GenreExplorer";
import MoodExplorer from "../../components/discover/MoodExplorer";
import AdvancedFilters from "../../components/discover/AdvancedFilters";
import SearchResultsHeader from "../../components/discover/SearchResultsHeader";
import RecommendationGrid from "../../components/discover/RecommendationGrid";
import RecommendationDrawer from "../../components/discover/RecommendationDrawer";
import CollectionCarousel from "../../components/discover/CollectionCarousel";
import EditorsPicks from "../../components/discover/EditorsPicks";
import EmptyState from "../../components/common/EmptyState";
import { Film } from "lucide-react";

import {
  toggleGenreFilter,
  toggleMoodFilter,
  setAdvancedFilter,
  resetFilters,
  setSearchQuery,
  openDrawer,
  closeDrawer,
  fetchMovies,
  searchMovies,
} from "../../redux/discover/discoverSlice";

import { addToWatchlist } from "../../redux/watchlist/watchlistSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const discoverState = useSelector((state) => state.discover);
  const currentUser = useSelector((state) => state.auth.user);

  const {
    movies,
    selectedGenres,
    selectedMoods,
    activeFilters,
    searchQuery,
    isSearchActive,
    selectedMovieForDrawer,
  } = discoverState;

  const [sortBy, setSortBy] = useState("match");
  const [isGridView, setIsGridView] = useState(true);

  // Fetch real movies on mount
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Client-Side Film Filtering Logic
  const getFilteredMovies = () => {
    return movies.filter((movie) => {
      // 1. Search Query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = movie.title.toLowerCase().includes(q);
        const matchesSynopsis = (movie.synopsis || "").toLowerCase().includes(q);
        const matchesDirector = (movie.director || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesSynopsis && !matchesDirector) return false;
      }

      // 2. Genres check (ANY match)
      if (selectedGenres.length > 0) {
        const hasGenre = movie.genres.some((g) => selectedGenres.includes(g));
        if (!hasGenre) return false;
      }

      // 3. Moods check (ANY match)
      if (selectedMoods.length > 0) {
        const hasMood = movie.moods.some((m) => selectedMoods.includes(m));
        if (!hasMood) return false;
      }

      // 4. Advanced Filters check
      // Year Range
      if (activeFilters.releaseYear !== "All") {
        const year = movie.releaseYear;
        if (activeFilters.releaseYear === "2020s" && (year < 2020 || year > 2029)) return false;
        if (activeFilters.releaseYear === "2010s" && (year < 2010 || year > 2019)) return false;
        if (activeFilters.releaseYear === "2000s" && (year < 2000 || year > 2009)) return false;
        if (activeFilters.releaseYear === "1990s" && (year < 1990 || year > 1999)) return false;
        if (activeFilters.releaseYear === "1980s" && (year < 1980 || year > 1989)) return false;
      }

      // Language
      if (activeFilters.language !== "All") {
        if (movie.language !== activeFilters.language) return false;
      }

      // Platform
      if (activeFilters.platform !== "All") {
        if (!movie.platforms.includes(activeFilters.platform)) return false;
      }

      return true;
    });
  };

  const filteredMovies = getFilteredMovies();

  // Sorting
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "match") return b.matchScore - a.matchScore;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "releaseDate") return b.releaseYear - a.releaseYear;
    return 0;
  });

  const handlePromptSelect = (prompt) => {
    dispatch(setSearchQuery(prompt));
    if (prompt.trim()) {
      dispatch(searchMovies(prompt));
    }
  };

  const handleAddToWatchlist = (movie) => {
    if (!currentUser) {
      alert("Please sign in to save movies.");
      return;
    }
    dispatch(
      addToWatchlist({
        userId: currentUser._id,
        movieId: movie._id || movie.id,
        status: "want to watch",
      })
    );
    alert(`"${movie.title}" has been bookmarked to your watchlist.`);
  };

  return (
    <div className="space-y-12 font-sans select-none pb-12 text-left">
      
      {/* 1. Conversational AI Search Hero */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-4">
        <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-tight">
          What vibe are you <br />
          <span className="text-primary italic font-light font-heading">looking for?</span>
        </h1>
        
        <AISearchBar
          value={searchQuery}
          onChange={(val) => dispatch(setSearchQuery(val))}
          onSubmit={(val) => {
            dispatch(setSearchQuery(val));
            if (val.trim()) {
              dispatch(searchMovies(val));
            }
          }}
        />

        <PromptSuggestions onSelect={handlePromptSelect} />
      </section>

      {/* 2. Collapsible Filters, Genres & Moods */}
      <section className="space-y-8 max-w-4xl mx-auto border-t border-border/10 pt-8">
        <AdvancedFilters
          activeFilters={activeFilters}
          onChange={(filter) => dispatch(setAdvancedFilter(filter))}
          onClearAll={() => dispatch(resetFilters())}
        />
        <GenreExplorer
          selectedGenres={selectedGenres}
          onToggle={(g) => dispatch(toggleGenreFilter(g))}
        />
        <MoodExplorer
          selectedMoods={selectedMoods}
          onToggle={(m) => dispatch(toggleMoodFilter(m))}
        />
      </section>

      {/* 3. Search Results Header & Grid */}
      <section className="space-y-6 border-t border-border/10 pt-8">
        <SearchResultsHeader
          count={sortedMovies.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          isGridView={isGridView}
          onViewChange={setIsGridView}
        />

        {sortedMovies.length > 0 ? (
          <div className={isGridView ? "block" : "max-w-3xl mx-auto space-y-4"}>
            {isGridView ? (
              <RecommendationGrid
                recommendations={sortedMovies.map((m) => ({ movie: m, matchReasons: [m.aiExplanation] }))}
                onMovieClick={(m) => dispatch(openDrawer(m))}
              />
            ) : (
              // List View layout
              <div className="divide-y divide-border/10">
                {sortedMovies.map((m) => (
                  <div
                    key={m._id || m.id}
                    onClick={() => dispatch(openDrawer(m))}
                    className="flex items-center justify-between py-4 hover:bg-muted/30 px-4 rounded-btn cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-heading font-semibold text-sm block text-foreground">{m.title}</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">{m.releaseYear} &bull; {m.genres.join(", ")}</span>
                    </div>
                    <span className="text-xs font-semibold text-secondary">{m.matchScore}% Match</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            icon={Film}
            title="We couldn't find an exact match."
            description="Try broadening your search or exploring one of our curated collections."
            actionText="Reset Filters"
            onAction={() => dispatch(resetFilters())}
          />
        )}
      </section>

      {/* 4. Weekly Editor's Pick Curation */}
      <section className="border-t border-border/10 pt-8">
        <EditorsPicks
          onMovieClick={(m) => dispatch(openDrawer(m))}
          onAddToWatchlist={handleAddToWatchlist}
        />
      </section>

      {/* 5. Curated Editorial Collections */}
      <section className="space-y-10 border-t border-border/10 pt-8">
        <CollectionCarousel title="Hidden Gems" movies={movies.slice(2, 6)} />
        <CollectionCarousel title="Modern Classics" movies={movies.slice(0, 4)} />
      </section>

      {/* 6. Side Drawer overlay for film details */}
      <RecommendationDrawer
        isOpen={!!selectedMovieForDrawer}
        movie={selectedMovieForDrawer}
        onClose={() => dispatch(closeDrawer())}
        onAddToWatchlist={handleAddToWatchlist}
      />

    </div>
  );
};

export default Discover;
export { Discover };
