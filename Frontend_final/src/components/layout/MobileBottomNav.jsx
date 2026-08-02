import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Compass, Bookmark, Dna, User } from "lucide-react";

const MobileBottomNav = () => {
  const links = [
    { name: "Home", path: "/dashboard", icon: LayoutDashboard },
    { name: "Discover", path: "/discover", icon: Compass },
    { name: "Watchlist", path: "/watchlist", icon: Bookmark },
    { name: "Taste DNA", path: "/taste-dna", icon: Dna },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const activeStyle = "flex flex-col items-center justify-center flex-1 py-2 text-primary font-semibold transition-colors";
  const inactiveStyle = "flex flex-col items-center justify-center flex-1 py-2 text-muted-foreground hover:text-foreground transition-colors";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/10 flex items-center justify-around h-16 md:hidden px-2 font-sans select-none">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] mt-1 tracking-wide">{link.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
export { MobileBottomNav };
