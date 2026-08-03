import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does the CineCompass AI work?",
      answer: "CineCompass AI evaluates films based on detailed stylistic dimensions (cinematography, dialogue weight, pacing models, and narrative tone) rather than simple stars or user counts. This maps directly to your Taste DNA coordinates.",
    },
    {
      question: "Is CineCompass free to use?",
      answer: "Yes, our core curation platform, Search, and Taste DNA tracker are completely free. We also offer a premium tier for advanced multi-user compatibility mapping and streaming platform sync features.",
    },
    {
      question: "Can I import my Letterboxd profile data?",
      answer: "Absolutely. You can upload your Letterboxd CSV exports (ratings and diary logs) in seconds. CineCompass maps your import history instantly to calculate your initial Taste DNA.",
    },
    {
      question: "Which streaming platforms are supported?",
      answer: "We support platform tracking for all major streaming services worldwide, including Netflix, Prime Video, MUBI, Criterion Channel, HBO Max, Apple TV+, and local VOD options.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-muted/20 border-t border-border/10">
      <div className="max-w-[800px] mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Frequently asked questions.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            Clear, transparent answers about our curation algorithms, accounts, and streaming integrations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-border/10 border-y border-border/10 text-left font-sans">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className="py-5">
                {/* Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground text-left focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="p-1 rounded-btn hover:bg-muted/40 transition-colors shrink-0">
                    {isOpen ? <Minus className="w-4 h-4 text-primary" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
                  </span>
                </button>

                {/* Body (Framer Motion Accordion Collapse) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-3 pr-8 whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
export { FAQSection };
