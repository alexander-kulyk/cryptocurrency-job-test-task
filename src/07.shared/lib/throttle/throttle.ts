export interface IThrottled<TArgs extends unknown[]> {
  (...args: TArgs): void;
  cancel: () => void;
}

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
