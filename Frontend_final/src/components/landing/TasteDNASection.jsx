import React from "react";
import { motion } from "framer-motion";
import TasteDNAChart from "../recommendation/TasteDNAChart";

const TasteDNASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration blur */}
      <div className="absolute top-[35%] right-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text Copy */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
              Core Innovation
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              A living map of <br />your cinematic taste.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-sans">
              Unlike generic platforms that label you with broad genres, CineCompass analyzes the relationship between directors, screenplays, recurring themes, cinematography styles, and moods.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-sans">
              The result is your **Taste DNA**—a dynamic visualization that maps your preferences across visual intensity, dialogue weight, narrative pacing, soundtrack, and concept depth. As you watch and rate, the map evolves with you.
            </p>
          </div>

          {/* Right Column: Generous Radar Chart preview */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-card p-8 rounded-card border border-border/40 w-full max-w-[550px] shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-300"
            >
              <h3 className="font-heading font-semibold text-center text-sm tracking-wide text-foreground mb-4">
                Taste DNA Analysis
              </h3>
              <TasteDNAChart />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TasteDNASection;
export { TasteDNASection };
