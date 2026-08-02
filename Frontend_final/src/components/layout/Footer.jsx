import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Github, Instagram, Youtube } from "lucide-react";
import Logo from "../common/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Product",
      links: [
        { name: "Discover", path: "/discover" },
        { name: "AI Search", path: "/search" },
        { name: "Taste DNA", path: "/taste-dna" },
        { name: "Match Finder", path: "/compatibility" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Film Journal", path: "/journal" },
        { name: "Help Center", path: "/help" },
        { name: "API Reference", path: "/api-docs" },
        { name: "System Status", path: "/status" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Discussion Forums", path: "/forums" },
        { name: "Letterboxd Sync", path: "/sync" },
        { name: "Events", path: "/events" },
        { name: "Cinephile Badges", path: "/badges" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Settings", path: "/cookies" },
        { name: "Content Licensing", path: "/licensing" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background/50 py-16 mt-auto select-none">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 pb-12">
          
          {/* Logo & Social Column */}
          <div className="col-span-2 space-y-6 text-left">
            <Logo />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs font-sans">
              An intelligent, distraction-free movie companion designed to map your Taste DNA and guide you through film history.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section, index) => (
            <div key={index} className="space-y-4 text-left font-sans col-span-1">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-sans">
          <span>&copy; {currentYear} CineCompass. A premium film Discovery platform.</span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
export { Footer };
