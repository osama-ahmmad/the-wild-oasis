import { useCallback, useEffect, useRef } from "react";

export function useOutsideClick(handler) {
  const ref = useRef();

  const handleClick = useCallback(
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    },
    [handler],
  );

  useEffect(
    function () {
      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [handleClick],
  );

  return ref;
}
