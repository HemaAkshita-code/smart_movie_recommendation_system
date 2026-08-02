import React from "react";
import RecommendationCard from "../recommendation/RecommendationCard";

const RecommendationPreview = () => {
  const recommendations = [
    {
      movie: {
        id: 201,
        title: "Arrival",
        releaseYear: 2016,
        genres: ["Sci-Fi", "Drama"],
        matchScore: 98,
        rating: 4.8,
        posterPath: null,
      },
      matchReasons: [
        "Matches your preference for atmospheric Denis Villeneuve direction.",
        "Aligns with your preference for slow-burn screenplays and deep philosophical sci-fi.",
      ],
    },
    {
      movie: {
        id: 202,
        title: "Her",
        releaseYear: 2013,
        genres: ["Romance", "Sci-Fi"],
        matchScore: 95,
        rating: 4.6,
        posterPath: null,
      },
      matchReasons: [
        "Corresponds with your recurring interest in solitude, empathy, and technological relationships.",
        "Matches your appreciation for intimate dialogue and warm color palettes.",
      ],
    },
    {
      movie: {
        id: 203,
        title: "Blade Runner 2049",
        releaseYear: 2017,
        genres: ["Sci-Fi", "Mystery"],
        matchScore: 93,
        rating: 4.7,
        posterPath: null,
      },
      matchReasons: [
        "Highly compatible with your preference for neo-noir themes and immersive sound design.",
        "Features stunning, slow-paced cinematography by Roger Deakins.",
      ],
    },
  ];

  return (
    <section className="py-24 bg-muted/10 border-t border-border/10">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            Personal Curation
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Recommendation preview.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            See how CineCompass pairs you with movies, explaining precisely why each choice is recommended based on your tastes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.movie.id} recommendation={rec} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecommendationPreview;
export { RecommendationPreview };
