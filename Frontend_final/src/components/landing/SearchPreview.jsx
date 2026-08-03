import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import RecommendationCard from "../recommendation/RecommendationCard";
import Input from "../ui/input";

const SearchPreview = () => {
  const fullText = "I want emotional sci-fi movies like Interstellar.";
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    let typingTimer;
    let loopTimer;

    const startTyping = () => {
      setDisplayText("");
      setIsTypingComplete(false);
      index = 0;
      
      const typeChar = () => {
        if (index < fullText.length) {
          setDisplayText((prev) => prev + fullText.charAt(index));
          index++;
          typingTimer = setTimeout(typeChar, 75);
        } else {
          setIsTypingComplete(true);
          // Stay for 6 seconds, then restart typing loop
          loopTimer = setTimeout(startTyping, 6500);
        }
      };

      typingTimer = setTimeout(typeChar, 500);
    };

    startTyping();

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  const mockRecommendations = [
    {
      movie: {
        id: 101,
        title: "Arrival",
        releaseYear: 2016,
        genres: ["Sci-Fi", "Drama"],
        matchScore: 98,
        rating: 4.8,
        posterPath: null,
      },
      matchReasons: [
        "Matches your preference for atmospheric, slow-burn narratives and Denis Villeneuve's cinematic style.",
        "Explores deep philosophical themes of linear time and human connection like Interstellar.",
      ],
    },
    {
      movie: {
        id: 102,
        title: "Contact",
        releaseYear: 1997,
        genres: ["Sci-Fi", "Drama", "Mystery"],
        matchScore: 95,
        rating: 4.5,
        posterPath: null,
      },
      matchReasons: [
        "Addresses grand ideas of cosmos exploration, space-time travel, and personal family ties.",
        "Combines scientifically grounded concepts with strong emotional core development.",
      ],
    },
    {
      movie: {
        id: 103,
        title: "Ad Astra",
        releaseYear: 2019,
        genres: ["Sci-Fi", "Drama"],
        matchScore: 91,
        rating: 4.0,
        posterPath: null,
      },
      matchReasons: [
        "Features a reflective father-child dynamic set against a magnificent space journey.",
        "Matches your taste for pensive, visually arresting sci-fi narratives.",
      ],
    },
  ];

  return (
    <section id="search-preview" className="py-24 bg-muted/20 border-y border-border/10">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            Natural Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Search with your feelings.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Forget about searching only by title. Type what you feel like watching, and our AI maps your prompt to cinema history.
          </p>
        </div>

        {/* Search Mock Container */}
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Simulated Input */}
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-muted-foreground">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="flex h-14 w-full rounded-full border border-border bg-card items-center pl-14 pr-6 text-sm text-foreground select-none">
              <span>{displayText}</span>
              {!isTypingComplete && (
                <span className="ml-0.5 w-0.5 h-4 bg-primary animate-pulse" />
              )}
            </div>
          </div>

          {/* Recommendations Render Panel */}
          <div className="min-h-[460px] relative">
            <AnimatePresence mode="wait">
              {isTypingComplete && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.12 },
                    },
                    hidden: {},
                  }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {mockRecommendations.map((rec) => (
                    <motion.div
                      key={rec.movie.id}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                      }}
                    >
                      <RecommendationCard recommendation={rec} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SearchPreview;
export { SearchPreview };
