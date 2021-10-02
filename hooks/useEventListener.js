import { useRef, useEffect } from "react";

/*
  Hook for using event listeners

  Example:
  const handler = useCallback((e) => console.log(`X: ${e.clientX} Y: ${e.clientY}`), []);

  useEventListener('click', handler);

  NOTE! If you dont use 'useCallback' hook, the handler will change every render
*/

const useEventListener = (eventName, handler) => {
  const handlerRef = useRef();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]); // if the handler function changes get new reference

  useEffect(
    () => {
      const currentHandler = (event) => handlerRef.current(event);
      document.addEventListener(eventName, currentHandler);

      return () => {
        document.removeEventListener(eventName, currentHandler);
      };
    },
    [eventName] // Re-run if eventName changes
  );
};

export default useEventListener;
