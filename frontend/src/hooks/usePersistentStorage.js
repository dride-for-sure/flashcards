import { useState } from 'react';

const getDataFromPersistentStorage = (key, defaultValue) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export default function usePersistentStorage(key, defaultValue) {
  const [value, setValue] = useState(getDataFromPersistentStorage(key, defaultValue));

  const setPersistentStorage = (updatedValue) => {
    sessionStorage.setItem(key, JSON.stringify(updatedValue));
    setValue(updatedValue);
  };

  return [value, setPersistentStorage];
}
