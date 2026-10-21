
import { useCallback, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      return JSON.parse(item) as T;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);

      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // The state still updates if browser storage is unavailable.
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);

    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors and keep the UI responsive.
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
