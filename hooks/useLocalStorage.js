import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storageValue, setStoragevValue] = useState(getValue());

  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  const setValue = (value) => {
    try {
      setStoragevValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storageValue, setValue];
}
