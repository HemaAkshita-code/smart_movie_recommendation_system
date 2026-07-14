import React from "react";

const FeaturesSection = () => {
  const philosophyItems = [
    {
      num: "01",
      title: "Discover Beyond Popularity",
      description:
        "CineCompass maps recommendations to your unique cinematic sensibilities, preferred directors, themes, and visual moods, instead of aggregating public star ratings.",
    },
    {
      num: "02",
      title: "Invisible Intelligence",
      description:
        "We reject flashy chatbot interfaces and futuristic dashboard widgets. Our AI assistant runs quietly in the background, keeping the focus entirely on the film art.",
    },
    {
      num: "03",
      title: "Transparent Match Explanations",
      description:
        "Understand exactly why a film is suggested. We provide clear, plain-language descriptions detailing how each recommendation connects to your Taste DNA.",
    },
    {
      num: "04",
      title: "Artwork First Experience",
      description:
        "Designed in collaboration with print design values, the interface keeps movie posters and stills as the visual heroes, using white space as structural hierarchy.",
    },
  ];

  return (
    <section id="features" className="py-32 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Sticky Section Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
              The Platform Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground leading-tight">
              A calmer, more <br />thoughtful way <br />to find films.
            </h2>
          </div>

          {/* Right Column: Spacious Numbered Editorial List */}
          <div className="lg:col-span-8 divide-y divide-border/10">
            {philosophyItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10 py-12 first:pt-0 last:pb-0"
              >
                {/* Large Sora Font Number */}
                <div className="font-heading font-bold text-5xl sm:text-6xl text-primary/20 select-none w-20 flex-shrink-0 leading-none">
                  {item.num}
                </div>
                
                {/* Feature Text */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
