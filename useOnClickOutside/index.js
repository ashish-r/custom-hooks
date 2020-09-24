import { useRef } from 'react';

import useMountEffect from '../useMountEffect';

export default function useOnClickOutside(elRef, callback) {
  const paramRef = useRef();
  // storing in a ref so, handleOutsideClick will maintain closure over the last param passed
  paramRef.current = { el: elRef?.current, callback };

  const handleOutsideClick = (e) => {
    const { callback: callbackFunc, el } = paramRef.current;
    if (!el?.contains(e.target) && callbackFunc) {
      callbackFunc(e);
    }
  };

  const attachListener = () => document.addEventListener('click', handleOutsideClick, true);
  const removeListener = () => document.removeEventListener('click', handleOutsideClick, true);

  useMountEffect(attachListener, removeListener);
}
