import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const ProtectedLayout = ({ children }) => {
  // In the future, this will connect to Redux Toolkit's auth slice.
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <div className="flex flex-1 max-w-[1280px] w-full mx-auto relative">
        <Sidebar />
        <main className="flex-grow p-6 sm:p-8 flex flex-col overflow-x-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
export { ProtectedLayout };
