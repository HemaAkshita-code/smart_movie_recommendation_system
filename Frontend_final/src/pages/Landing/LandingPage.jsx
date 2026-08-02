import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import HeroSection from "../../components/landing/HeroSection";
import SearchPreview from "../../components/landing/SearchPreview";
import FeaturedMovies from "../../components/landing/FeaturedMovies";
import FeaturesSection from "../../components/landing/FeaturesSection";
import TasteDNASection from "../../components/landing/TasteDNASection";
import RecommendationPreview from "../../components/landing/RecommendationPreview";
import CompatibilitySection from "../../components/landing/CompatibilitySection";
import HowItWorks from "../../components/landing/HowItWorks";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import FAQSection from "../../components/landing/FAQSection";
import CTASection from "../../components/landing/CTASection";

const LandingPage = () => {
  return (
    <MainLayout>
      {/* 1. Hero Section */}
      <div id="home">
        <HeroSection />
      </div>

      {/* 2. AI Search Preview */}
      <SearchPreview />

      {/* 3. Featured Showcase Reels */}
      <FeaturedMovies />

      {/* 4. Feature Grid */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* 5. Taste DNA Preview */}
      <TasteDNASection />

      {/* 6. Recommendation Preview */}
      <RecommendationPreview />

      {/* 7. Compatibility Section */}
      <div id="about">
        <CompatibilitySection />
      </div>

      {/* 8. How It Works Timeline */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. FAQ Accordion */}
      <FAQSection />

      {/* 11. Final Call-To-Action */}
      <CTASection />
    </MainLayout>
  );
};

export default LandingPage;
export { LandingPage };
