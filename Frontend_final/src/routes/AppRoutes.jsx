import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Onboarding from "../pages/Onboarding/Onboarding";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Discover from "../pages/Discover/Discover";
import MovieDetails from "../pages/Movie/MovieDetails";
import Watchlist from "../pages/Watchlist/Watchlist";
import Library from "../pages/Library/Library";
import Collections from "../pages/Collections/Collections";
import History from "../pages/History/History";
import TasteDNA from "../pages/TasteDNA/TasteDNA";
import Profile from "../pages/Profile/Profile";
import Friends from "../pages/Friends/Friends";
import ComponentShowcase from "../pages/ComponentShowcase/ComponentShowcase";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Authenticated Dashboard Shell Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/search" element={<Discover />} />
        <Route path="/discover/trending" element={<Discover />} />
        <Route path="/discover/collections" element={<Discover />} />
        <Route path="/discover/movie/:id" element={<Discover />} />
        
        {/* Detail Pages */}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/library" element={<Library />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/history" element={<History />} />
        <Route path="/taste-dna" element={<TasteDNA />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friends/:id" element={<Friends />} />

        {/* Placeholders */}
        <Route path="/settings" element={<NotFound />} />
      </Route>

      {/* Internal Development Routes */}
      <Route 
        path="/components" 
        element={<ComponentShowcase />} 
      />

      {/* Future Pages */}
      <Route path="/search" element={<NotFound />} />
      <Route path="/recommendations" element={<NotFound />} />
      <Route path="/admin" element={<NotFound />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;