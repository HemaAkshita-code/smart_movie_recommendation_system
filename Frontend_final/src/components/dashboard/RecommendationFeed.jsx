import React from "react";
import RecommendationCard from "../recommendation/RecommendationCard";

const RecommendationFeed = ({ recommendations = [] }) => {
  const defaultRecommendations = [
    {
      movie: {
        id: 11,
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
        id: 12,
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
        id: 13,
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

  const list = recommendations.length > 0 ? recommendations : defaultRecommendations;

  return (
    <div className="space-y-4 text-left font-sans select-none">
      <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-muted-foreground/60 px-1">
        AI Recommendations Feed
      </h3>
      
      {/* Grid of Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((rec) => (
          <RecommendationCard key={rec.movie.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationFeed;
export { RecommendationFeed };
