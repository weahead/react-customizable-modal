//https://github.com/davidtheclark/tabbable/blob/master/index.js
// https://github.com/davidtheclark/focus-trap#focustrap--createfocustrapelement-createoptions

import { useState, useEffect, useCallback, useRef } from "react";
import findTabbable from "helpers/tabbable";

const TAB_KEY = 9;

export function useTrapFocus() {
  const ref = useRef<HTMLInputElement>(null);
  const previouseFocusedElement = useRef<Element>(document.activeElement);
  const [tabbableElements, setTabbableElements] = useState<HTMLInputElement[]>(
    []
  );
  // Handle initial focus of the referenced element, and return focus to previously focused element on cleanup
  // and find all the tabbable elements in the referenced element
  useEffect(() => {
    const { current } = ref;
    if (current) {
      current.focus();
      setTabbableElements(findTabbable(current));
    }
    return () => {
      if (previouseFocusedElement.current instanceof HTMLElement) {
        previouseFocusedElement.current.focus();
      }
    };
  }, [ref, setTabbableElements]);

  const handleUserKeyPress = useCallback(
    event => {
      const { keyCode, shiftKey } = event;
      const first = tabbableElements[0];
      const last = tabbableElements[tabbableElements.length - 1];
      const currentActiveElement = document.activeElement;
      if (isWithinCurrentElementScope([...tabbableElements, ref.current])) {
        if (keyCode === TAB_KEY) {
          if (
            currentActiveElement === first ||
            currentActiveElement === ref.current
          ) {
            if (shiftKey) {
              event.preventDefault();
              last.focus();
            }
          }
          if (currentActiveElement === last) {
            if (!shiftKey) {
              event.preventDefault();
              first.focus();
            }
          }
        }
      }
    },
    [ref, tabbableElements]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  return ref;
}
function isWithinCurrentElementScope(
  elementList: (HTMLInputElement | Element | null)[]
) {
  const currentActiveElement = document.activeElement;
  return elementList.includes(currentActiveElement);
}
