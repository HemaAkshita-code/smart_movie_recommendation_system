import React from "react";
import Card, { CardContent } from "../ui/card";
import Avatar from "../ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "CineCompass completely changed how I discover films. The Taste DNA mapping is uncannily accurate and understands my specific mood preferences.",
      author: "Sophia L.",
      role: "Film Journalist",
      fallback: "SL",
    },
    {
      quote:
        "I love that there's no chat assistant popping up all the time. The AI runs invisibly, keeping the focus entirely on the film art.",
      author: "Marcus K.",
      role: "Software Architect",
      fallback: "MK",
    },
    {
      quote:
        "The Compatibility score and transparent match details help me choose what to watch in seconds. It saves so much endless browsing.",
      author: "Elena R.",
      role: "Creative Director",
      fallback: "ER",
    },
    {
      quote:
        "The design language is stunning. It feels like an online extension of a premium print magazine rather than a generic SaaS database.",
      author: "Alex P.",
      role: "Film Historian & Collector",
      fallback: "AP",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            Community Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            What cinema lovers say.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Read perspectives from critics, collectors, and filmmakers who use CineCompass to enrich their viewing lists.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border-border/40 hover:shadow-elevation-1 transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 space-y-6 flex flex-col justify-between h-full">
                
                {/* Quote Text */}
                <p className="text-foreground/90 italic leading-relaxed text-sm md:text-base font-sans text-left">
                  &ldquo;{t.quote}&rdquo;
                </p>
                
                {/* Author Metadata */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/10">
                  <Avatar fallback={t.fallback} className="w-9 h-9 bg-primary/10 border border-primary/20 text-primary font-bold text-xs" />
                  <div className="text-left">
                    <div className="font-heading font-semibold text-foreground text-sm leading-none">
                      {t.author}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      {t.role}
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
export { TestimonialsSection };
