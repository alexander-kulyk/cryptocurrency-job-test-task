import { useEffect, useRef } from "react";

/**
 * Runs `abort` exactly once, when the host component unmounts, always invoking
 * the latest closure (so it can read current query args at teardown time).
 *
 * RTK Query does not cancel in-flight requests when a subscriber unmounts — by
 * design it lets them settle to populate the cache, then drops the data after
 * `keepUnusedDataFor`. Use this to explicitly abort the requests a component
 * started (via `api.util.getRunningQueryThunk(...).abort()` or a mutation
 * trigger's `.abort()`) so no fetch outlives the component.
 */
export const useAbortOnUnmount = (abort: () => void): void => {
  const abortRef = useRef(abort);

  // Keep the ref pointing at the latest closure without re-running the
  // unmount-only effect below.
  useEffect(() => {
    abortRef.current = abort;
  }, [abort]);

  useEffect(() => () => abortRef.current(), []);
};
