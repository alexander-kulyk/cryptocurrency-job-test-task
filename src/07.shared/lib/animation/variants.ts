import type { Transition, Variants } from "framer-motion";

type CubicBezier = [number, number, number, number];


export const EASE_OUT: CubicBezier = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const motionTransition = (
  reduceMotion: boolean,
  duration = 0.6,
  delay = 0,
): Transition => {
  if (reduceMotion) return { duration: 0 };
  return delay > 0
    ? { duration, delay, ease: EASE_OUT }
    : { duration, ease: EASE_OUT };
};

export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const;
