import { useEffect, type RefObject } from "react";

/**
 * Calls `handler` when a pointer event fires outside the referenced element.
 * Pass a memoized `handler` to avoid re-binding listeners every render.
 */
export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled: boolean = true,
): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent): void => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
};
