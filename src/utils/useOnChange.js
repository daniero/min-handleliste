import { useCallback, useEffect, useRef } from "react";

export const useOnChange = (nextValue, callback) => {
  const stored = useRef(undefined);
  const memo = useCallback(callback, []);

  useEffect(() => {
    if (stored.current !== undefined) {
      memo(stored.current, nextValue);
    }
    stored.current = nextValue;
  }, [nextValue, memo]);
};