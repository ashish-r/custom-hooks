import { useRef, useCallback } from 'react';

import useMountEffect from './useMountEffect';

export default function useOnClickOutside(elRef, callback) {
  const paramRef = useRef();
  // storing in a ref so, handleOutsideClick will maintain closure over the last param passed
  paramRef.current = { elRef, callback };

  const handleOutsideClick = useCallback((e) => {
    const {
      callback: callbackFunc,
      elRef: { current: el },
    } = paramRef.current;
    if (callbackFunc && !el?.contains(e.target)) {
      callbackFunc(e);
    }
  }, []);

  const attachListener = () => document.addEventListener('click', handleOutsideClick, true);
  const removeListener = () => document.removeEventListener('click', handleOutsideClick, true);

  useMountEffect(attachListener, removeListener);
}
