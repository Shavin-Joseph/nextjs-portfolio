export const pageVariants = {
  initial: { opacity: 0, x: "-10vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "10vw" }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};