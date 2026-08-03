import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import MovieOfTheDay from "../../components/dashboard/MovieOfTheDay";
import QuickActions from "../../components/dashboard/QuickActions";
import ContinueWatching from "../../components/dashboard/ContinueWatching";
import RecommendationFeed from "../../components/dashboard/RecommendationFeed";
import TrendingSection from "../../components/dashboard/TrendingSection";
import WatchlistPreview from "../../components/dashboard/WatchlistPreview";
import TasteDNASummary from "../../components/dashboard/TasteDNASummary";
import CompatibilityWidget from "../../components/dashboard/CompatibilityWidget";
import RecentActivity from "../../components/dashboard/RecentActivity";

const Dashboard = () => {
  const { user, movieOfTheDay, continueWatching, compatibilitySnapshot, recentActivity } = useSelector(
    (state) => state.dashboard
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10"
    >
      {/* 1. Welcome Header */}
      <motion.div variants={itemVariants}>
        <DashboardHeader userName={user.name} recommendationCount={user.recommendationCount} />
      </motion.div>

      {/* Grid: Left Column (Main Feed) & Right Column (Meta summaries) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Feed (8 columns) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* 2. Movie of the Day */}
          <motion.div variants={itemVariants}>
            <MovieOfTheDay movie={movieOfTheDay} />
          </motion.div>

          {/* 3. Quick Actions */}
          <motion.div variants={itemVariants}>
            <QuickActions />
          </motion.div>

          {/* 4. Continue Watching */}
          <motion.div variants={itemVariants}>
            <ContinueWatching movies={continueWatching} />
          </motion.div>

          {/* 5. AI Recommendations */}
          <motion.div variants={itemVariants}>
            <RecommendationFeed />
          </motion.div>

          {/* 6. Trending Movies */}
          <motion.div variants={itemVariants}>
            <TrendingSection />
          </motion.div>

        </div>

        {/* Right Side Widgets (4 columns) */}
        <div className="lg:col-span-4 space-y-8 sticky top-20">
          
          {/* 7. Watchlist Preview */}
          <motion.div variants={itemVariants}>
            <WatchlistPreview />
          </motion.div>

          {/* 8. Taste DNA Summary */}
          <motion.div variants={itemVariants}>
            <TasteDNASummary />
          </motion.div>

          {/* 9. Compatibility Snapshot */}
          <motion.div variants={itemVariants}>
            <CompatibilityWidget snapshot={compatibilitySnapshot} />
          </motion.div>

          {/* 10. Recent Activity */}
          <motion.div variants={itemVariants}>
            <RecentActivity activities={recentActivity} />
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
export { Dashboard };
