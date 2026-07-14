import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 focus:outline-none" aria-label="CineCompass Home">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-primary">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="font-heading font-bold text-lg tracking-tight text-foreground">
        CineCompass
      </span>
    </Link>
  );
};

export default Logo;
