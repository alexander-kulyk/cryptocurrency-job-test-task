import { useEffect, useMemo } from "react";
import { throttle, type IThrottled } from "@/07.shared/lib";

/**
 * Returns a throttled version of `callback` (≤1 call per `delay` ms, leading +
 * trailing). The throttler is rebuilt whenever `callback` or `delay` change, so
 * pass a memoized `callback` (e.g. `useCallback`) to keep throttling stable —
 * prefer passing per-call data as arguments rather than closing over state.
 */
export const useThrottledCallback = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay: number,
): IThrottled<TArgs> => {
  const throttled = useMemo(
    () => throttle<TArgs>(callback, delay),
    [callback, delay],
  );

  useEffect(() => () => throttled.cancel(), [throttled]);

  return throttled;
};
