/**
 * Single source of truth for responsive breakpoints.
 *
 * The numeric pixel values are kept in sync with the Tailwind `@theme`
 * `--breakpoint-*` tokens declared in `src/app/styles/globals.css`, so that
 * styling (Tailwind responsive variants) and behaviour (JS media queries) never
 * drift apart. Use these constants whenever a breakpoint value is needed in
 * TypeScript instead of hardcoding the number across components.
 */

export const BREAKPOINTS = {
  /** Small phones — design QA target. */
  se: 375,
  /** Phones (upper bound for the mobile layout). */
  mobile: 767,
  /** Tablets / small laptops. */
  tablet: 768,
  /** Laptops. */
  laptop: 1280,
  /** Large desktops. */
  desktop: 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** `min-width` media query string for a breakpoint, e.g. `(min-width: 768px)`. */
export const mediaUp = (breakpoint: Breakpoint): string =>
  `(min-width: ${BREAKPOINTS[breakpoint]}px)`;

/** `max-width` media query string for a breakpoint, e.g. `(max-width: 767px)`. */
export const mediaDown = (breakpoint: Breakpoint): string =>
  `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`;
