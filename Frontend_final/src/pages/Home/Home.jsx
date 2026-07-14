import React from "react";
import MainLayout from "../../components/layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="max-w-[1280px] mx-auto px-4 py-[96px] text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Home Dashboard</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Welcome to CineCompass. This is a placeholder for your personal dashboard, which will display Continue Watching, AI Recommendations, and your Taste DNA Snapshot.
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;
