import { useEffect, useRef } from 'react';

export default function useMountEffect(funcForMount, funcForUnmount) {
  const funcRef = useRef();
  funcRef.current = { funcForMount, funcForUnmount };
  useEffect(() => {
    if (funcRef.current.funcForMount) {
      funcRef.current.funcForMount();
    }
    return () => funcRef.current.funcForUnmount && funcRef.current.funcForUnmount();
  }, []);
}
