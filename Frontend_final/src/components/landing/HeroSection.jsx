import React from "react";
import { Link } from "react-router-dom";
import { Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import MoviePoster from "../movie/MoviePoster";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-background select-none min-h-[90vh] flex items-center">
      {/* Subtle animated background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45 dark:opacity-25">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Oversized Editorial Typography & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              CineCompass AI
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold text-foreground leading-[1.08] tracking-tight">
              AI that <br />
              understands <br />
              <span className="text-primary italic font-light font-heading">your movie taste.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed font-sans">
              Discover cinema tailored to your unique Taste DNA. No crowdsourced noise, no endless scrolling. Just hand-curated recommendation paths matching your mood.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/register"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-btn hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-elevation-1 text-sm tracking-wide"
              >
                Discover Movies
              </Link>
              <a
                href="#search-preview"
                className="px-8 py-4 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-btn transition-colors flex items-center justify-center gap-2 text-sm text-center border border-border/10"
              >
                <Play className="w-4 h-4 fill-current text-muted-foreground" />
                Watch Demo
              </a>
            </div>
          </div>

          {/* Right Column: Layered, Parallax Movie Poster Collage */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[500px] h-[480px]">
              
              {/* Back Poster: Céline Sciamma - Portrait of a Lady on Fire */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[8%] left-[2%] w-[160px] sm:w-[180px] z-10"
              >
                <MoviePoster
                  title="Portrait of a Lady on Fire"
                  className="shadow-elevation-2 transform -rotate-6 border border-white/5 bg-gradient-to-t from-emerald-950 to-zinc-900"
                />
              </motion.div>

              {/* Center Main Poster: Christopher Nolan - Interstellar */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[28%] w-[180px] sm:w-[210px] z-20"
              >
                <MoviePoster
                  title="Interstellar"
                  className="shadow-elevation-4 border border-white/10 bg-gradient-to-t from-slate-950 to-zinc-900"
                />
              </motion.div>

              {/* Front Right Poster: Wong Kar-wai - In the Mood for Love */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[5%] right-[2%] w-[150px] sm:w-[170px] z-30"
              >
                <MoviePoster
                  title="In the Mood for Love"
                  className="shadow-elevation-3 transform rotate-6 border border-white/5 bg-gradient-to-t from-red-950 to-zinc-900"
                />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
export { HeroSection };
