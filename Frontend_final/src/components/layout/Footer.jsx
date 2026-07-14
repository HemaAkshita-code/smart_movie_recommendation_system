import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background/50 py-8 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand/Copyright */}
        <div className="text-sm text-muted-foreground">
          &copy; {currentYear} CineCompass. A trusted movie companion.
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
