import { useCallback, useEffect, useRef } from "react";

export function useOnChange<T>(nextValue: T, callback: (current: T, next: T) => any) {
  const stored = useRef<T | undefined>(undefined);
  const memo = useCallback(callback, []);

  useEffect(() => {
    if (stored.current !== undefined) {
      memo(stored.current, nextValue);
    }
    stored.current = nextValue;
  }, [nextValue, memo]);
}