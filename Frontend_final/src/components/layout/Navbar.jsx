import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../common/Logo";
import ThemeToggle from "../common/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLanding = location.pathname === "/";

  // Dynamic Navigation Links based on page context
  const navLinks = isLanding
    ? [
        { name: "Home", path: "#home" },
        { name: "Features", path: "#features" },
        { name: "How It Works", path: "#how-it-works" },
        { name: "About", path: "#about" },
      ]
    : [
        { name: "Discover", path: "/discover" },
        { name: "Search", path: "/search" },
        { name: "Taste DNA", path: "/taste-dna" },
      ];

  const handleLinkClick = (e, path) => {
    if (isLanding && path.startsWith("#")) {
      e.preventDefault();
      setIsOpen(false);
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const activeStyle = "px-4 py-1.5 bg-primary/5 text-primary rounded-btn font-medium text-sm transition-all duration-150";
  const inactiveStyle = "px-4 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-btn font-medium text-sm transition-all duration-150";

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? "backdrop-blur-lg bg-background/80 border-border/40 shadow-elevation-1"
          : "backdrop-blur-md bg-background/35 border-border/10"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isAnchor = link.path.startsWith("#");
            return isAnchor ? (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={inactiveStyle}
              >
                {link.name}
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-btn hover:opacity-90 transition-opacity tracking-wide"
          >
            Join CineCompass
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="md:hidden border-t border-border/10 bg-background/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 space-y-3 flex flex-col">
              {navLinks.map((link) => {
                const isAnchor = link.path.startsWith("#");
                return isAnchor ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className={inactiveStyle}
                  >
                    {link.name}
                  </a>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
              <div className="pt-4 border-t border-border/10 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-muted-foreground hover:text-foreground font-medium text-sm transition-colors py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 bg-primary text-primary-foreground text-center font-semibold text-sm rounded-btn hover:opacity-90 transition-opacity"
                >
                  Join CineCompass
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
export { Navbar };
