import { useState, useEffect, useCallback, useRef } from 'react';
//@ts-ignore
import findTabbable from '../helpers/tabbable';
import { useHandleKeyPress } from './useHandleKeyPress';

const TAB_KEY = 'Tab';
const optionsDefault = { focusOnRender: true, returnFocus: true };
type optionsType = {
  focusOnRender?: boolean;
  returnFocus?: boolean;
};
export function useTrapFocus(opts?: optionsType) {
  const options = opts ? { ...optionsDefault, ...opts } : optionsDefault;
  const ref = useRef<HTMLDivElement>(null);
  const previouseFocusedElement = useRef<HTMLElement>(
    document.activeElement as HTMLElement
  );
  const [tabbableElements, setTabbableElements] = useState<HTMLElement[]>([]);
  // Handle initial focus of the referenced element, and return focus to previously focused element on cleanup
  // and find all the tabbable elements in the referenced element

  useEffect(() => {
    const { current } = ref;
    if (current) {
      const focusableChildNodes = findTabbable(current);
      if (options.focusOnRender) {
        current.focus();
      }

      setTabbableElements(focusableChildNodes);
    }
    return () => {
      const { current } = previouseFocusedElement;
      if (current instanceof HTMLElement && options.returnFocus) {
        current.focus();
      }
    };
  }, [options.focusOnRender, options.returnFocus, ref, setTabbableElements]);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { code, shiftKey } = event;
      const first = tabbableElements[0];
      const last = tabbableElements[tabbableElements.length - 1];
      const currentActiveElement = document.activeElement;
      // Scope current tabs to current root element
      if (isWithinCurrentElementScope([...tabbableElements, ref.current])) {
        if (code === TAB_KEY) {
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
