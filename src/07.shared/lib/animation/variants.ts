import type { Transition, Variants } from "framer-motion";

/** Cubic-bezier control points for the shared ease-out curve. */
type CubicBezier = [number, number, number, number];

/**
 * Shared, reusable motion variants for the landing sections.
 *
 * All variants animate only `opacity` and `transform` (x / y / scale) so the
 * compositor can run them at 60fps. They are plain data objects, hoisted out of
 * JSX, and consumed across widgets to keep entrance motion consistent.
 */

/** Standard easing for entrance motion (matches the swap widget `ease-swap`). */
export const EASE_OUT: CubicBezier = [0.22, 1, 0.36, 1];

/** Fade + rise. The default building block for text and blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Fade + gentle scale. For images and media cards. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

/** Plain fade, no movement. For decorative / overlay elements. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Container that staggers its children once it enters the viewport. Pair with a
 * child variant (e.g. `fadeUp`) on each animated descendant.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/**
 * Builds a transition that respects the user's reduced-motion preference:
 * collapses to an instant change when `reduceMotion` is true.
 */
export const motionTransition = (
  reduceMotion: boolean,
  duration = 0.6,
  delay = 0,
): Transition => {
  if (reduceMotion) return { duration: 0 };
  // Only set an explicit `delay` when one is requested. Emitting `delay: 0`
  // would override the orchestration delay a parent `staggerChildren` injects,
  // silently flattening the cascade into a simultaneous fade.
  return delay > 0
    ? { duration, delay, ease: EASE_OUT }
    : { duration, ease: EASE_OUT };
};

/** Shared `whileInView` viewport config: animate once, a bit before fully visible. */
export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const;
