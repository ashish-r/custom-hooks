import { useRef, createRef } from 'react';

export default function useArrayRef(size) {
  const arrayRef = useRef([]);

  if (arrayRef.current.length !== size) {
    arrayRef.current = Array.from(Array(size), (_, i) => arrayRef.current[i] || createRef());
  }

  return arrayRef.current;
}
