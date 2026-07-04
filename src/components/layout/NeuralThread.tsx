import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Signature element. A single glowing thread running down the viewport
 * edge, filling as the visitor scrolls through Hero → About → Skills →
 * Projects → Certificates → Contact. Represents a signal traveling a
 * neural pathway — literal for a Data Science/AI portfolio, and doubles
 * as a scroll-progress indicator so it earns its place functionally too.
 */
export function NeuralThread() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed left-3 top-0 hidden h-screen w-px md:block"
      style={{ zIndex: "var(--z-thread)" }}
    >
      <div
        className="h-full w-full"
        style={{ background: "var(--color-glass-border)" }}
      />
      <motion.div
        className="absolute left-0 top-0 w-px origin-top"
        style={{
          height: "100%",
          scaleY: smoothProgress,
          background:
            "linear-gradient(to bottom, var(--color-synapse), var(--color-signal))",
          boxShadow: "0 0 12px var(--color-signal)",
        }}
      />
    </div>
  );
}
