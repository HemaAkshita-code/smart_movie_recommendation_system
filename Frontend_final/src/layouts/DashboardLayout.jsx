import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TopNavbar from "../components/layout/TopNavbar";
import Sidebar from "../components/layout/Sidebar";
import MobileBottomNav from "../components/layout/MobileBottomNav";

const DashboardLayout = () => {
  const { pathname } = useLocation();

  // Scroll Restoration on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans transition-colors duration-200">
      
      {/* Sticky top navigation bar */}
      <TopNavbar />

      <div className="flex flex-1 relative max-w-[1440px] w-full mx-auto">
        
        {/* Collapsible desktop sidebar */}
        <Sidebar />

        {/* Content Panel */}
        <main className="flex-grow p-6 md:p-8 overflow-x-hidden pb-24 md:pb-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex-grow flex flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

      {/* Mobile bottom navigations */}
      <MobileBottomNav />

    </div>
  );
};

export default DashboardLayout;
export { DashboardLayout };
