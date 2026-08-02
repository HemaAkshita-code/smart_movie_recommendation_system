import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, ShieldAlert, ArrowRight, Check } from "lucide-react";

import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import GenreChip from "../../components/onboarding/GenreChip";
import MovieSelector from "../../components/onboarding/MovieSelector";
import DirectorSelector from "../../components/onboarding/DirectorSelector";
import StreamingCard from "../../components/onboarding/StreamingCard";
import TasteDNALoader from "../../components/onboarding/TasteDNALoader";
import TasteDNAChart from "../../components/recommendation/TasteDNAChart";
import CompatibilityMeter from "../../components/recommendation/CompatibilityMeter";
import RecommendationCard from "../../components/recommendation/RecommendationCard";
import Button from "../../components/ui/button";
import Card, { CardContent } from "../../components/ui/card";

import {
  setGenres,
  setMovies,
  setDirectors,
  setPlatforms,
  setPreferenceAnswers,
  completeOnboarding as triggerComplete,
} from "../../redux/onboarding/onboardingSlice";

const GENRES_LIST = [
  "Drama", "Thriller", "Sci-Fi", "Romance", "Horror", "Mystery", 
  "Comedy", "Fantasy", "Crime", "Documentary", "Animation"
];

const PREFERENCE_OPTIONS = [
  "Emotional stories", "Fast-paced movies", "Plot twists", "Character-driven films",
  "Visual spectacles", "Indie cinema", "Foreign films", "Experimental filmmaking"
];

const Onboarding = () => {
  const [step, setStep] = useState(0); // 0: Welcome, 1: Genres, 2: Movies, 3: Directors, 4: Platforms, 5: AI Questions, 6: Loader, 7: Complete
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onboardingState = useSelector((state) => state.onboarding);
  const {
    selectedGenres,
    selectedMovies,
    selectedDirectors,
    selectedPlatforms,
    preferenceAnswers,
  } = onboardingState;

  // Next / Back Actions
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleSkip = () => setStep((prev) => prev + 1);

  // Genres selection trigger
  const handleGenreToggle = (genre) => {
    const isSelected = selectedGenres.includes(genre);
    const newSelection = isSelected
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    dispatch(setGenres(newSelection));
  };

  // Streaming Platform toggle
  const handlePlatformToggle = (platform) => {
    const isSelected = selectedPlatforms.includes(platform);
    const newSelection = isSelected
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform];
    dispatch(setPlatforms(newSelection));
  };

  // Preference Toggle
  const handlePreferenceToggle = (pref) => {
    const isSelected = preferenceAnswers.includes(pref);
    const newSelection = isSelected
      ? preferenceAnswers.filter((p) => p !== pref)
      : [...preferenceAnswers, pref];
    dispatch(setPreferenceAnswers(newSelection));
  };

  const handleFinish = () => {
    dispatch(triggerComplete());
    navigate("/home");
  };

  // Animation variants
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.25 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center transition-colors duration-200">
      <AnimatePresence mode="wait">
        
        {/* Step 0: Welcome screen */}
        {step === 0 && (
          <motion.div
            key="step0"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-[500px] w-full mx-auto px-6 py-12 text-center space-y-8 select-none"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">
                Welcome to CineCompass
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-md">
                Let's map your cinematic personality. Answer a few questions about your film tastes to construct your initial Taste DNA.
              </p>
            </div>

            <Button onClick={handleNext} className="w-full gap-2 h-11">
              Begin Setup
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Step 1: Genres selection */}
        {step === 1 && (
          <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <OnboardingLayout
              currentStep={1}
              totalSteps={5}
              onBack={handleBack}
              title="Select your favorite genres"
              subtitle="Choose at least 2 genres to help us structure your initial recommendation guidelines."
            >
              <div className="space-y-8">
                <div className="flex flex-wrap gap-3 justify-start max-w-xl">
                  {GENRES_LIST.map((genre) => (
                    <GenreChip
                      key={genre}
                      genre={genre}
                      isSelected={selectedGenres.includes(genre)}
                      onClick={() => handleGenreToggle(genre)}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={selectedGenres.length < 2}
                  className="w-full h-11"
                >
                  Continue
                </Button>
              </div>
            </OnboardingLayout>
          </motion.div>
        )}

        {/* Step 2: Movie selection */}
        {step === 2 && (
          <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <OnboardingLayout
              currentStep={2}
              totalSteps={5}
              onBack={handleBack}
              title="Add favorite movies"
              subtitle="Search and select films that you absolutely love. At least 1 is required to index your preferences."
            >
              <div className="space-y-8">
                <MovieSelector
                  selectedMovies={selectedMovies}
                  onChange={(movies) => dispatch(setMovies(movies))}
                />

                <Button
                  onClick={handleNext}
                  disabled={selectedMovies.length < 1}
                  className="w-full h-11"
                >
                  Continue
                </Button>
              </div>
            </OnboardingLayout>
          </motion.div>
        )}

        {/* Step 3: Director selection */}
        {step === 3 && (
          <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <OnboardingLayout
              currentStep={3}
              totalSteps={5}
              onBack={handleBack}
              title="Choose favorite directors"
              subtitle="Search and select creators whose work and stylistic choices resonate with you."
            >
              <div className="space-y-8">
                <DirectorSelector
                  selectedDirectors={selectedDirectors}
                  onChange={(directors) => dispatch(setDirectors(directors))}
                />

                <Button onClick={handleNext} className="w-full h-11">
                  Continue
                </Button>
              </div>
            </OnboardingLayout>
          </motion.div>
        )}

        {/* Step 4: Streaming platforms */}
        {step === 4 && (
          <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <OnboardingLayout
              currentStep={4}
              totalSteps={5}
              onBack={handleBack}
              showSkip
              onSkip={handleSkip}
              title="Streaming platforms"
              subtitle="Select platforms you use so we can prioritize tracking where to watch recommended films."
            >
              <div className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {["Netflix", "Prime Video", "Disney+", "Apple TV+", "Max", "Hulu"].map((plat) => (
                    <StreamingCard
                      key={plat}
                      platform={plat}
                      isSelected={selectedPlatforms.includes(plat)}
                      onClick={() => handlePlatformToggle(plat)}
                    />
                  ))}
                </div>

                <Button onClick={handleNext} className="w-full h-11">
                  Continue
                </Button>
              </div>
            </OnboardingLayout>
          </motion.div>
        )}

        {/* Step 5: Optional AI preference questions */}
        {step === 5 && (
          <motion.div key="step5" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <OnboardingLayout
              currentStep={5}
              totalSteps={5}
              onBack={handleBack}
              showSkip
              onSkip={handleSkip}
              title="Optional preferences"
              subtitle="Highlight specific screenplay elements or structures you generally prefer."
            >
              <div className="space-y-8">
                <div className="flex flex-wrap gap-3">
                  {PREFERENCE_OPTIONS.map((pref) => {
                    const isSelected = preferenceAnswers.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => handlePreferenceToggle(pref)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all focus:outline-none select-none ${
                          isSelected
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-transparent text-muted-foreground border-border/40 hover:bg-muted/40"
                        }`}
                      >
                        {pref}
                      </button>
                    );
                  })}
                </div>

                <Button onClick={handleNext} className="w-full h-11">
                  Generate Taste DNA
                </Button>
              </div>
            </OnboardingLayout>
          </motion.div>
        )}

        {/* Step 6: Generating loader screen */}
        {step === 6 && (
          <motion.div
            key="step6"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-[480px] w-full mx-auto"
          >
            <TasteDNALoader onComplete={() => setStep(7)} />
          </motion.div>
        )}

        {/* Step 7: Completed screen */}
        {step === 7 && (
          <motion.div
            key="step7"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-[800px] w-full mx-auto px-6 py-12 space-y-12 select-none"
          >
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Your Taste DNA is ready.
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto font-sans">
                We've compiled your selections into your custom Taste DNA profile. Here is a preview of your initial coordinates.
              </p>
            </div>

            {/* Visual breakdown grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              
              {/* Left: Chart Preview */}
              <div className="bg-card p-6 rounded-card border border-border/40 shadow-sm space-y-4">
                <h3 className="font-heading font-semibold text-xs tracking-widest uppercase text-muted-foreground">
                  Taste DNA Chart
                </h3>
                <TasteDNAChart />
              </div>

              {/* Right: Recommendations & Match preview */}
              <div className="space-y-6">
                
                {/* Compatibility Preview card */}
                <div className="bg-card p-5 rounded-card border border-border/40 shadow-sm flex items-center justify-between gap-6">
                  <div className="space-y-1 font-sans">
                    <h4 className="font-heading font-semibold text-sm">Onboarding Compatibility</h4>
                    <p className="text-[11px] text-muted-foreground max-w-xs leading-normal">
                      Your choices align closely with atmospheric art-house viewers and Denis Villeneuve enthusiasts.
                    </p>
                  </div>
                  <CompatibilityMeter value={84} size={90} strokeWidth={6} />
                </div>

                {/* Sample Recommendations list */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    Sample Match Recommendation
                  </h4>
                  <div className="bg-card p-5 rounded-card border border-border/40 shadow-sm space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between gap-4 border-b border-border/10 pb-2">
                      <span className="font-heading font-bold text-foreground">Arrival (2016)</span>
                      <span className="font-semibold text-secondary">94% Match</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Matches your selections of Sci-Fi genre, atmospheric tones, and director Denis Villeneuve.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Action CTA */}
            <Button onClick={handleFinish} className="w-full max-w-sm mx-auto h-11 flex items-center justify-center gap-2">
              Enter CineCompass
              <ArrowRight className="w-4 h-4" />
            </Button>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
export { Onboarding };
