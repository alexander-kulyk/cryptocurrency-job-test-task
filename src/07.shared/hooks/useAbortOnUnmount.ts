import { useEffect, useRef } from "react";

export const useAbortOnUnmount = (abort: () => void): void => {
  const abortRef = useRef(abort);

  useEffect(() => {
    abortRef.current = abort;
  }, [abort]);

  useEffect(() => () => abortRef.current(), []);
};
