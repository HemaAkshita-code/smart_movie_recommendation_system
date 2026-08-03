import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  Search,
  Dna,
  User,
  Bookmark,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "../../utils/helpers";
import Logo from "../common/Logo";

const Sidebar = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Discover", path: "/discover", icon: Compass },
    { name: "Watchlist", path: "/watchlist", icon: Bookmark },
    { name: "Taste DNA", path: "/taste-dna", icon: Dna },
    { name: "Friends", path: "/friends", icon: Users },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const activeStyle =
    "flex items-center gap-3 px-4 py-2.5 bg-primary/5 text-primary rounded-btn font-semibold text-sm transition-all duration-150";
  const inactiveStyle =
    "flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/45 rounded-btn font-semibold text-sm transition-all duration-150";

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn(
        "h-[calc(100vh-4rem)] sticky top-16 bg-background border-r border-border/10 flex flex-col justify-between p-4 overflow-y-auto hidden md:flex shrink-0",
        className
      )}
    >
      <div className="space-y-6">
        {/* Navigation Group */}
        <div className="space-y-1">
          {!isCollapsed && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-4 mb-3 block">
              Navigation
            </span>
          )}
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    isActive ? activeStyle : inactiveStyle,
                    isCollapsed && "justify-center px-0 py-2.5"
                  )
                }
                title={isCollapsed ? link.name : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                {!isCollapsed && <span>{link.name}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-btn hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>

        {/* Logout Action */}
        <button
          onClick={() => navigate("/")}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 text-destructive hover:bg-destructive/5 rounded-btn font-semibold text-sm transition-all text-left focus:outline-none",
            isCollapsed && "justify-center px-0"
          )}
          title={isCollapsed ? "Sign Out" : ""}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
export { Sidebar };
