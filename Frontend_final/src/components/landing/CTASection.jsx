import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-28 bg-background border-t border-border/10">
      <div className="max-w-[1280px] mx-auto px-6 text-center space-y-8">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight max-w-2xl mx-auto">
          Find your next favorite movie.
        </h2>
        
        {/* Subtext */}
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto font-sans leading-relaxed">
          Experience AI recommendations that truly understand your taste.
        </p>
        
        {/* Start Exploring Button */}
        <div className="pt-2">
          <Link
            to="/register"
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-btn hover:opacity-90 transition-opacity inline-block text-sm tracking-wide shadow-elevation-1"
          >
            Start Exploring
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default CTASection;
export { CTASection };
