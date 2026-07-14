import React from "react";

const TasteDNASection = () => {
  const nodes = [
    { label: "Sci-Fi", x: "15%", y: "25%", color: "bg-primary/5 text-foreground hover:bg-primary/10" },
    { label: "Slow Burn", x: "75%", y: "20%", color: "bg-accent/5 text-foreground hover:bg-accent/10" },
    { label: "Neon-Noir", x: "20%", y: "70%", color: "bg-brand-blue/5 text-foreground hover:bg-brand-blue/10" },
    { label: "Philosophical", x: "70%", y: "75%", color: "bg-secondary/5 text-foreground hover:bg-secondary/10" },
    { label: "Denis Villeneuve", x: "45%", y: "15%", color: "bg-primary/5 text-foreground hover:bg-primary/10" },
    { label: "Melancholic", x: "80%", y: "50%", color: "bg-accent/5 text-foreground hover:bg-accent/10" },
    { label: "Atmospheric", x: "12%", y: "48%", color: "bg-secondary/5 text-foreground hover:bg-secondary/10" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text Description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
              Core Innovation
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              A Living Map of <br />Your Movie Soul.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              Unlike generic platforms that label you with broad categories, CineCompass analyzes relationships between directors, screenwriters, recurring themes, cinematography styles, and moods.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              The result is your **Taste DNA**—a dynamic visualization that grows with every rating, bookmark, and review you leave, mapping exactly what makes you love a film.
            </p>
          </div>

          {/* Right Column: Visual DNA Map (Borderless & spacious) */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-8 overflow-visible">
              
              {/* Organic Ambient Glowing Blobs (Highly diffuse, low opacity) */}
              <div className="absolute top-[15%] left-[15%] w-[280px] h-[280px] bg-primary/5 rounded-full blur-[80px]" />
              <div className="absolute bottom-[15%] right-[10%] w-[240px] h-[240px] bg-secondary/5 rounded-full blur-[70px]" />
              <div className="absolute top-[35%] right-[20%] w-[200px] h-[200px] bg-accent/5 rounded-full blur-[65px]" />

              {/* Connecting Lines (Very subtle and thin) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="currentColor" className="text-border/20" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="currentColor" className="text-border/20" strokeWidth="0.75" />
                <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="currentColor" className="text-border/20" strokeWidth="0.75" />
                <line x1="50%" y1="50%" x2="70%" y2="75%" stroke="currentColor" className="text-border/20" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="45%" y2="15%" stroke="currentColor" className="text-border/20" strokeWidth="0.75" />
                <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="currentColor" className="text-border/20" strokeWidth="0.75" />
                <line x1="50%" y1="50%" x2="12%" y2="48%" stroke="currentColor" className="text-border/20" strokeWidth="0.75" />
                <circle cx="50%" cy="50%" r="5" className="fill-primary/60" />
                <circle cx="50%" cy="50%" r="14" className="stroke-primary/20 fill-none" strokeWidth="1" />
              </svg>

              {/* Central Core Label */}
              <div className="z-10 bg-background/60 backdrop-blur-md px-4 py-2 border border-border/10 rounded-full text-[10px] tracking-widest font-semibold uppercase text-muted-foreground shadow-sm">
                Taste DNA
              </div>

              {/* Orbiting Nodes (Borderless, flat chips) */}
              {nodes.map((node, idx) => (
                <div
                  key={idx}
                  style={{ left: node.x, top: node.y }}
                  className={`absolute z-10 px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all hover:scale-105 duration-200 cursor-default shadow-sm ${node.color}`}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TasteDNASection;
