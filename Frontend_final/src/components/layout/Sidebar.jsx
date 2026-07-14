import React from "react";
import { NavLink } from "react-router-dom";
import {
  Compass,
  Search,
  Dna,
  User,
  Bookmark,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "../../utils/helpers";

const Sidebar = ({ className }) => {
  const sidebarLinks = [
    { name: "Discover", path: "/discover", icon: Compass },
    { name: "Search", path: "/search", icon: Search },
    { name: "Taste DNA", path: "/taste-dna", icon: Dna },
    { name: "Watchlist", path: "/watchlist", icon: Bookmark },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const activeStyle =
    "flex items-center gap-3 px-4 py-2.5 bg-primary/5 text-primary rounded-btn font-semibold text-sm transition-all duration-150";
  const inactiveStyle =
    "flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-btn font-semibold text-sm transition-all duration-150";

  return (
    <aside
      className={cn(
        "w-64 h-[calc(100vh-4rem)] sticky top-16 bg-background border-r border-border/10 flex flex-col justify-between p-6 overflow-y-auto hidden md:flex",
        className
      )}
    >
      {/* Navigation Group */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-4 mb-2 block">
          Menu
        </span>
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout Action */}
      <button
        onClick={() => console.log("Logout triggered")}
        className="flex items-center gap-3 px-4 py-2.5 text-destructive hover:bg-destructive/5 rounded-btn font-semibold text-sm transition-all text-left focus:outline-none"
      >
        <LogOut className="w-5 h-5" strokeWidth={1.5} />
        <span>Sign Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;
export { Sidebar };
