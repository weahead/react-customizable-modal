import { useState, useEffect, useCallback, useRef } from 'react';
import { tabbable } from 'tabbable';

import { useHandleKeyPress } from './useHandleKeyPress';

import type { FocusableElement } from 'tabbable'

function isWithinCurrentElementScope(
  elementList: (Element | null)[]
) {
  return elementList.includes(document.activeElement);
}

export type useTrapFocusOptions = {
  focusOnRender?: boolean;
  returnFocus?: boolean;
};

export function useTrapFocus<T extends HTMLElement>(options?: useTrapFocusOptions) {
  const {focusOnRender = true, returnFocus = true} = options || {}

  const ref = useRef<T>(null);

  const previousFocusedElement = useRef<Element | null>(
    typeof window === `undefined`
      ? null
      : (document.activeElement)
  );

  const [tabbableElements, setTabbableElements] = useState<FocusableElement[]>([]);

  // Handle initial focus of the referenced element, and return focus to previously focused element on cleanup
  // and find all the tabbable elements in the referenced element
  useEffect(() => {
    const { current } = ref;
    const { current: previousFocused } = previousFocusedElement;

    if (current) {
      const focusableChildNodes = tabbable(current, { includeContainer: true});
      if (focusOnRender && focusableChildNodes.includes(current)) {
        current.focus();
      }
      setTabbableElements(focusableChildNodes);
    }

    return () => {
      if (previousFocused instanceof HTMLElement && returnFocus) {
        previousFocused.focus();
      }
    };
  }, [ref, setTabbableElements, focusOnRender, returnFocus]);

  useHandleKeyPress(useCallback(
    event => {
      if (tabbableElements.length > 0) {
        // Scope current tabs to current root element
        if (isWithinCurrentElementScope(tabbableElements)) {
          const { key, shiftKey } = event;
          if (key === "Tab") {
            const first = tabbableElements[0];
            const last = tabbableElements[tabbableElements.length - 1];
            const activeElement = document.activeElement;

            if (activeElement === first || activeElement === ref.current) {
              // move focus to last element if shift+tab while currently focusing the first tabbable element
              if (shiftKey) {
                event.preventDefault();
                last.focus();
              }
            }
            if (activeElement === last) {
              // move focus back to first if tabbing while currently focusing the last tabbable element
              if (!shiftKey) {
                event.preventDefault();
                first.focus();
              }
            }
          }
        }
      }
    },
    [ref, tabbableElements]
  ));

  return ref;
}