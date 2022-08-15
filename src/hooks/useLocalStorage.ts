import { LOCAL_STORAGE_KEY } from "config";
import { useState } from "react";

export const getStorageData = (keyName: string, defaultValue: any) => {
  const savedItem = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedItem = JSON.parse(savedItem);
  return parsedItem?.[keyName] || defaultValue;
};

export const setStorageData = (keyName: string, value: any) => {
  const savedItem = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedItem = JSON.parse(savedItem) || {};
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...parsedItem, [keyName]: value }));
};

export const removeStorageData = (keyName: string) => {
  setStorageData(keyName, null);
};

export const useLocalStorage = (key: string, initialValue: any) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = getStorageData(key, initialValue);
      // Parse stored json or if none return initialValue
      return item ? item : initialValue;
    } catch (error: any) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        setStorageData(key, valueToStore);
      }
    } catch (error: any) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
