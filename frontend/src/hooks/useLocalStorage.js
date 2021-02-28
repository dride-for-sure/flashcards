import { useState } from 'react';

const getDataFromLocalStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(getDataFromLocalStorage(key, defaultValue));

  const setLocalStorageValue = (updatedValue) => {
    localStorage.setItem(key, JSON.stringify(updatedValue));
    setValue(updatedValue);
  };

  return [value, setLocalStorageValue];
}
