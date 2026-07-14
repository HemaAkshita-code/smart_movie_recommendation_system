import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Editorial Headings & Call to Actions */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
              A Personal Curator
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.08] tracking-tight">
              The art of <br />
              discovering <br />
              <span className="text-primary italic font-light font-heading">cinema.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed font-sans">
              CineCompass maps your unique Taste DNA to guide you through film history, introducing masterpieces aligned with your sensibilities.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-btn hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-none text-sm tracking-wide"
              >
                Begin Your Journey
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link
                to="/discover"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 text-center"
              >
                Browse without an account &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Staggered Movie Poster Collage */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[500px] h-[450px] sm:h-[500px]">
              
              {/* Poster 1: Wong Kar-wai - In the Mood for Love */}
              <div className="absolute top-[5%] left-[5%] w-[180px] sm:w-[200px] aspect-[2/3] bg-gradient-to-t from-red-950/95 via-red-900/60 to-amber-900/20 rounded-poster border border-white/10 shadow-elevation-2 transform -rotate-6 hover:-rotate-3 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-end p-4">
                <span className="text-[10px] tracking-wider uppercase text-amber-200/60 font-semibold mb-1">
                  WONG KAR-WAI
                </span>
                <h3 className="font-heading font-bold text-sm sm:text-base text-white leading-tight">
                  In the Mood <br />for Love
                </h3>
                <span className="text-[10px] text-white/50 mt-1">2000 &bull; Romance</span>
              </div>

              {/* Poster 2: Denis Villeneuve - Blade Runner 2049 */}
              <div className="absolute top-[20%] right-[5%] w-[180px] sm:w-[200px] aspect-[2/3] bg-gradient-to-t from-cyan-950/95 via-slate-900/50 to-pink-950/20 rounded-poster border border-white/10 shadow-elevation-3 transform rotate-3 hover:rotate-1 hover:-translate-y-2 transition-all duration-300 z-10 flex flex-col justify-end p-4">
                <span className="text-[10px] tracking-wider uppercase text-cyan-300/60 font-semibold mb-1">
                  DENIS VILLENEUVE
                </span>
                <h3 className="font-heading font-bold text-sm sm:text-base text-white leading-tight">
                  Blade Runner <br />2049
                </h3>
                <span className="text-[10px] text-white/50 mt-1">2017 &bull; Sci-Fi</span>
              </div>

              {/* Poster 3: Céline Sciamma - Portrait of a Lady on Fire */}
              <div className="absolute bottom-[5%] left-[25%] w-[170px] sm:w-[190px] aspect-[2/3] bg-gradient-to-t from-emerald-950/95 via-teal-900/50 to-amber-950/20 rounded-poster border border-white/10 shadow-elevation-2 transform rotate-1 hover:-rotate-1 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] tracking-wider uppercase text-emerald-300/60 font-semibold mb-1">
                  C&Eacute;LINE SCIAMMA
                </span>
                <h3 className="font-heading font-bold text-sm sm:text-base text-white leading-tight">
                  Portrait of a <br />Lady on Fire
                </h3>
                <span className="text-[10px] text-white/50 mt-1">2019 &bull; Drama</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
