import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "CineCompass completely changed how I find movies. The Taste DNA is incredibly accurate and understands my specific mood preferences.",
      author: "Sophia L.",
      role: "Film Journalist",
    },
    {
      quote:
        "I love that there's no chat assistant popping up all the time. The AI is invisible, helping me choose without getting in the way.",
      author: "Marcus K.",
      role: "Software Engineer",
    },
    {
      quote:
        "The Compatibility score and detail explanations help me decide what to watch in seconds. It saves me so much endless browsing.",
      author: "Elena R.",
      role: "Creative Designer",
    },
  ];

  return (
    <section className="py-24 bg-background border-t border-border/10">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80 mb-4 block">
            Community Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            What Movie Lovers Say.
          </h2>
        </div>

        {/* Testimonials Grid (Cardless & Spacious) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between space-y-6"
            >
              {/* Quote Mark */}
              <span className="font-serif text-5xl text-primary/20 select-none leading-none -mb-3 block">
                &ldquo;
              </span>
              
              {/* Text */}
              <p className="text-foreground/90 italic leading-relaxed text-base font-sans">
                {t.quote}
              </p>
              
              {/* Author Info */}
              <div className="pt-4 border-t border-border/10">
                <div className="font-heading font-semibold text-foreground text-sm">
                  {t.author}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
