import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Fallback routing for folders-only pages, redirecting to NotFound or Login */}
      <Route path="/discover" element={<NotFound />} />
      <Route path="/search" element={<NotFound />} />
      <Route path="/taste-dna" element={<NotFound />} />
      <Route path="/movie/:id" element={<NotFound />} />
      <Route path="/recommendations" element={<NotFound />} />
      <Route path="/watchlist" element={<NotFound />} />
      <Route path="/profile" element={<NotFound />} />
      <Route path="/settings" element={<NotFound />} />
      <Route path="/admin" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
