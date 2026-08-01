import { useState, useEffect } from 'react';

export const usePersistedState = (key, initialState) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};
