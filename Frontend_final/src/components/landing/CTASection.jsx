import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-32 bg-background border-t border-border/10">
      <div className="max-w-[1280px] mx-auto px-6 text-center space-y-8">
        
        {/* Sora Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight max-w-2xl mx-auto">
          Ready to find your <br />next favorite film?
        </h2>
        
        {/* Description */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto font-sans leading-relaxed">
          Create your CineCompass account today, build your Taste DNA, and discovery cinema built around you.
        </p>
        
        {/* Action Button */}
        <div className="pt-4">
          <Link
            to="/register"
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-btn hover:opacity-95 transition-opacity inline-block text-sm tracking-wide"
          >
            Create Your Taste DNA
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default CTASection;
