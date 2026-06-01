
export const BREAKPOINTS = {
  se: 375,
  mobile: 767,
  tablet: 768,
  laptop: 1280,
  desktop: 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const mediaUp = (breakpoint: Breakpoint): string =>
  `(min-width: ${BREAKPOINTS[breakpoint]}px)`;

export const mediaDown = (breakpoint: Breakpoint): string =>
  `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`;
