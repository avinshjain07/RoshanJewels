import { useState, useEffect } from 'react';

/**
 * useDebounce — Debounces a value by a given delay.
 * Used to avoid re-filtering products on every keystroke in the search input.
 *
 * @param {any}    value - The value to debounce (e.g., search input string)
 * @param {number} delay - Debounce delay in ms (default: 300)
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
