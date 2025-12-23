import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function CTA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Stacky?",
      a: "Stacky helps developers choose frameworks, libraries, and tools, then instantly generates install commands, setup steps, and essential documentation so you can start building faster.",
    },
    {
      q: "How does Stacky work?",
      a: "Simply select your tech stack, generate the output, and copy the commands into your terminal. You get a clean, ready-to-use setup flow without extra friction.",
    },
    {
      q: "Do you store my selections or personal data?",
      a: "We don’t save your personal data or stack choices. Stacky is designed as a helpful setup companion, not a data collection tool.",
    },
    {
      q: "Is Stacky free to use?",
      a: "Stacky’s core features are free to use. If additional premium features are introduced in the future, they will be clearly communicated.",
    },
    {
      q: "Why should I use Stacky instead of searching everything manually?",
      a: "Because Stacky keeps you focused. It brings install commands, setup guidance, and useful documentation together in one place—reducing context switching and saving valuable development time.",
    },
    {
      q: "Is Stacky suitable for beginners and experienced developers?",
      a: "Absolutely. Beginners get clarity and structure, while experienced developers save time and avoid repetitive setup work.",
    },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm uppercase tracking-wide text-muted-foreground">
            Questions?
          </span>

          <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Everything you need to know
          </h3>

          <p className="text-lg text-muted-foreground mt-3">
            A quick overview of Stacky — how it works, why it exists, and how it
            helps you build faster.
          </p>
        </div>

        <motion.ul
          className="max-w-3xl mx-auto mt-10 space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {faqs.map((f, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              layout
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-foreground text-base md:text-lg leading-snug">
                  {f.q}
                </span>

                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{
                    type: "tween",
                    duration: 0.36,
                    ease: "easeOut",
                  }}
                  className="ml-4 text-muted-foreground"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.22, ease: "easeOut" },
                      layout: { duration: 0.38, ease: "easeOut" },
                    }}
                    style={{ overflow: "hidden" }}
                    className="px-5 pb-4 text-sm md:text-base text-muted-foreground"
                  >
                    <div className="pt-1 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default CTA;
