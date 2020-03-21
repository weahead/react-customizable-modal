import { useState, useEffect, useCallback, useRef } from 'react';
//@ts-ignore
import findTabbable from '../helpers/tabbable';
import { useHandleKeyPress } from './useHandleKeyPress';

const TAB_KEY = 9;
const optionsDefault = { focusOnRender: true, returnFocus: true };
type optionsType = {
  focusOnRender?: boolean;
  returnFocus?: boolean;
};
export function useTrapFocus(opts?: optionsType) {
  const { focusOnRender, returnFocus } = opts
    ? { ...optionsDefault, ...opts }
    : optionsDefault;
  const ref = useRef<HTMLDivElement>(null);

  const previouseFocusedElement = useRef<HTMLElement | null>(
    typeof window === `undefined`
      ? null
      : (document.activeElement as HTMLElement)
  );
  const [tabbableElements, setTabbableElements] = useState<HTMLElement[]>([]);
  // Handle initial focus of the referenced element, and return focus to previously focused element on cleanup
  // and find all the tabbable elements in the referenced element
  useEffect(() => {
    const { current } = ref;
    const { current: previouseFocused } = previouseFocusedElement;

    if (current) {
      const focusableChildNodes = findTabbable(current);
      if (focusOnRender) {
        current.focus();
      }

      setTabbableElements(focusableChildNodes);
    }
    return () => {
      if (previouseFocused instanceof HTMLElement && returnFocus) {
        previouseFocused.focus();
      }
    };
  }, [ref, setTabbableElements, focusOnRender, returnFocus]);

  const handleUserKeyPress = useCallback(
    event => {
      const { keyCode, shiftKey } = event;
      const first = tabbableElements[0];
      const last = tabbableElements[tabbableElements.length - 1];
      const currentActiveElement = document.activeElement;
      // Scope current tabs to current root element
      if (isWithinCurrentElementScope([...tabbableElements, ref.current])) {
        if (keyCode === TAB_KEY) {
          if (
            currentActiveElement === first ||
            currentActiveElement === ref.current
          ) {
            // move focus to last element if shift+tab while currently focusing the first tabbable element
            if (shiftKey) {
              event.preventDefault();
              last.focus();
            }
          }
          if (currentActiveElement === last) {
            // move focus back to first if tabbing while currently focusing the last tabbable element
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
  useHandleKeyPress(handleUserKeyPress);

  return ref;
}
function isWithinCurrentElementScope(
  elementList: (HTMLInputElement | Element | null)[]
) {
  const currentActiveElement = document.activeElement;
  return elementList.includes(currentActiveElement);
}
