import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import TasteDNASection from "../../components/landing/TasteDNASection";
import CompatibilitySection from "../../components/landing/CompatibilitySection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import CTASection from "../../components/landing/CTASection";

const Landing = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <TasteDNASection />
      <CompatibilitySection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Landing;
