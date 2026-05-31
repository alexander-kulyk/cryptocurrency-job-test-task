export interface IThrottled<TArgs extends unknown[]> {
  (...args: TArgs): void;
  /** Cancels a pending trailing invocation. */
  cancel: () => void;
}

/**
 * Leading + trailing throttle: invokes `fn` immediately, then at most once
 * per `wait` ms, always flushing the latest arguments on the trailing edge.
 * Reusable building block for rate-limited calls (e.g. swap preview ≤1/600ms).
 */
export const throttle = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  wait: number,
): IThrottled<TArgs> => {
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let trailingArgs: TArgs | null = null;

  const invoke = (args: TArgs): void => {
    lastCall = Date.now();
    fn(...args);
  };

  const throttled = (...args: TArgs): void => {
    const remaining = wait - (Date.now() - lastCall);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke(args);
      return;
    }

    trailingArgs = args;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        if (trailingArgs) {
          const next = trailingArgs;
          trailingArgs = null;
          invoke(next);
        }
      }, remaining);
    }
  };

  throttled.cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    trailingArgs = null;
  };

  return throttled;
};
