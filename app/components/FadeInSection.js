// app/components/FadeInSection.js or .tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function FadeInSection({ children, delay = 0, y = 30, animateKey, once = true, trigger = "scroll" }) {
  if (trigger === "always") {
    //for carousel / always re-animate
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={animateKey}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          //exit={{ opacity: 0, y }}
          transition={{ duration: 0.6, delay }}
        //  transition={{ duration: 0.6, delay }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
  //for scroll-triggered animation
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}
