import { useEffect, useMemo } from "react";
import { throttle, type IThrottled } from "@/07.shared/lib";

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
