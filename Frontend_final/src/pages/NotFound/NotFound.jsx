import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="max-w-[1280px] mx-auto px-4 py-[96px] text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or is still under construction.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-btn hover:opacity-90 transition-opacity inline-block"
        >
          Return to Landing Page
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
