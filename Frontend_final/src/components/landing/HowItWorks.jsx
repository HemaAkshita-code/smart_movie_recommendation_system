import React from "react";
import { motion } from "framer-motion";
import { Search, Compass, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      num: "01",
      title: "Express Your Vibe",
      description: "Describe the specific atmosphere, pacing, or recurring theme you crave in simple natural language.",
    },
    {
      icon: Compass,
      num: "02",
      title: "Map Your Taste DNA",
      description: "Our curator algorithms evaluate relationships between directors, lighting, sound design, and narrative depth.",
    },
    {
      icon: Sparkles,
      num: "03",
      title: "Unveil Curation",
      description: "Get bespoke movie recommendation cards featuring transparent explanations outlining why they fit your soul.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/20 border-y border-border/10">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            A simple curated journey.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            CineCompass is built around the belief that finding great cinema should be as smooth as reading a luxury coffee table book.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
            hidden: {},
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="relative flex flex-col items-center text-center space-y-6 group z-10"
              >
                {/* Connector Line (Desktop Only) */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-[40px] left-[60%] right-[-40%] h-[1px] border-t border-dashed border-border/40 pointer-events-none" />
                )}

                {/* Number Indicator */}
                <div className="font-heading font-bold text-6xl text-primary/10 select-none absolute -top-8 -left-4 pointer-events-none">
                  {step.num}
                </div>

                {/* Icon Wrapper */}
                <div className="w-16 h-16 rounded-full bg-card border border-border/40 flex items-center justify-center shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>

                {/* Copy */}
                <div className="space-y-2 max-w-xs">
                  <h3 className="font-heading font-semibold text-base md:text-lg text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
export { HowItWorks };
