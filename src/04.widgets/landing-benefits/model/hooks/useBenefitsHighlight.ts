import { useCallback, useEffect, useState } from "react";

const AUTO_CYCLE_MS = 2600;

export interface IUseBenefitsHighlightParams {
  /** Number of rows in the benefits list. */
  count: number;
  /** When true, the idle auto-cycle is disabled (reduced-motion / no rows). */
  paused: boolean;
}

export interface IBenefitsHighlightValues {
  /** Index of the currently active (highlighted) row. */
  activeIndex: number;
}

export interface IBenefitsHighlightHandlers {
  /** Activate a row on hover / focus. */
  activate: (index: number) => void;
  /** Resume the idle auto-cycle when the pointer leaves the list. */
  release: () => void;
}

export interface IUseBenefitsHighlightResult {
  values: IBenefitsHighlightValues;
  handlers: IBenefitsHighlightHandlers;
}

/**
 * Owns which benefit row is "active" (yellow title + revealed photo).
 *
 * Behaviour mirrors the animation reference: the active state walks down the
 * list on an idle timer, and hovering / focusing a row takes over (`isHovering`
 * pauses the timer). When the pointer leaves, the auto-cycle resumes. The timer
 * is fully suppressed via `paused` to honour `useReducedMotion()`.
 */
export const useBenefitsHighlight = ({
  count,
  paused,
}: IUseBenefitsHighlightParams): IUseBenefitsHighlightResult => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const activate = useCallback((index: number): void => {
    setIsHovering(true);
    setActiveIndex(index);
  }, []);

  const release = useCallback((): void => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (paused || isHovering || count <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, AUTO_CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [paused, isHovering, count]);

  return {
    values: { activeIndex },
    handlers: { activate, release },
  };
};
