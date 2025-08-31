import { useCallback, useEffect, useRef } from 'react';

export function useOnChange<T>(
  nextValue: T,
  callback: (current: T, next: T) => void,
) {
  const stored = useRef<T | undefined>(undefined);
  // FIXME
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memo = useCallback(callback, []);

  useEffect(() => {
    if (stored.current !== undefined) {
      memo(stored.current, nextValue);
    }
    stored.current = nextValue;
  }, [nextValue, memo]);
}
