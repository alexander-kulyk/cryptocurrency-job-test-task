import { useCallback, useEffect, useState } from "react";

const AUTO_CYCLE_MS = 2600;

export interface IUseBenefitsHighlightParams {
  count: number;
  paused: boolean;
}

export interface IBenefitsHighlightValues {
  activeIndex: number;
}

export interface IBenefitsHighlightHandlers {
  activate: (index: number) => void;
  release: () => void;
}

export interface IUseBenefitsHighlightResult {
  values: IBenefitsHighlightValues;
  handlers: IBenefitsHighlightHandlers;
}

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
